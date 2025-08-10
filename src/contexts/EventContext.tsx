import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { EventItem } from "@/types/event";
import LS, { load, save } from "@/utils/storage";
import { uid } from "@/utils/id";
import { isOverlapping } from "@/utils/overlap";
import { useAuthCtx } from "./AuthContext";

type EventCtx = {
  events: EventItem[];
  createEvent: (
    payload: Omit<
      EventItem,
      "id" | "createdAt" | "updatedAt" | "organizerId" | "organizerName"
    >
  ) => Promise<void>;

};

const EventContext = createContext<EventCtx | undefined>(undefined);


export function EventProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthCtx();
  const [events, setEvents] = useState<EventItem[]>(() => {
    const u = load(LS.SESSION, null) as any as { id?: string } | null;
    return u?.id ? load<EventItem[]>(LS.EVENTS(u.id), []) : [];
  });
  const [hydratedUserId, setHydratedUserId] = useState<string | null>(null);

  // Persist per-user
  useEffect(() => {
    if (!user) return;
    if (hydratedUserId !== user.id) return; // skip the first render after login
    save(LS.EVENTS(user.id), events);
  }, [events, user, hydratedUserId]);

  // When user switches, load that user's events
  useEffect(() => {
    if (!user) {
      setEvents([]);
      setHydratedUserId(null);
      return;
    }
    const next = load<EventItem[]>(LS.EVENTS(user.id), []);
    setEvents(next);
    setHydratedUserId(user.id); // mark hydrated
  }, [user?.id]);

  const createEvent: EventCtx["createEvent"] = async (payload) => {
    if (!user) throw new Error("Not authenticated");
    const now = new Date().toISOString();
    const e: EventItem = {
      ...payload,
      id: uid(),
      organizerId: user.id,
      organizerName: user.name || user.email,
      createdAt: now,
      updatedAt: now,
    };
    if (isOverlapping(e, events))
      throw new Error("Time conflict with another event");
    setEvents((prev) =>
      [...prev, e].sort(
        (a, b) =>
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime()
      )
    );
  };


  const value = useMemo(
    () => ({ events, createEvent }),
    [events]
  );
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}

export const useEventCtx = () => {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEventCtx must be used within EventProvider");
  return ctx;
};
