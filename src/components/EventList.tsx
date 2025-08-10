import { useEvents } from "@/hooks/useEvents";
import React from "react";
import EventCard from "./EventCard";

const EventList = () => {
  const { events } = useEvents();
  return (
    <div className="grid cards">
      {events.map((e) => (
        <EventCard key={e.id} e={e}  />
      ))}
    </div>
  );
};

export default EventList;
