import { useEvents } from "@/hooks/useEvents";
import React, { useMemo } from "react";
import EventCard from "./EventCard";
import { useFilters } from "@/hooks/useFilter";
import "@/styles/events.css";

const EventList = () => {
  const { events, deleteEvent } = useEvents();
  const { filters } = useFilters();

  const filtered = useMemo(() => {
    const q = filters.q.toLowerCase();
    const fromMs = filters.from ? new Date(filters.from).getTime() : -Infinity;
    const toMs = filters.to
      ? new Date(filters.to).getTime() + 24 * 3600 * 1000 - 1
      : Infinity;

    let list = events.filter(
      (e) =>
        (!q ||
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)) &&
        (filters.eventType === "All" || e.eventType === filters.eventType) &&
        (filters.category === "All" || e.category === filters.category) &&
        new Date(e.startDateTime).getTime() >= fromMs &&
        new Date(e.endDateTime).getTime() <= toMs
    );

    list = list.sort((a, b) =>
      filters.sortBy === "title"
        ? a.title.localeCompare(b.title)
        : new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime()
    );

    return list;
  }, [events, filters]);

  if (!filtered.length)
    return <p className="muted">No events match your filters.</p>;

  return (
    <div className="grid cards">
      {filtered.map((e) => (
        <EventCard key={e.id} e={e} onDelete={deleteEvent} />
      ))}
    </div>
  );
};

export default EventList;
