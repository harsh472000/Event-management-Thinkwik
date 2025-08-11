import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "@/hooks/useEvents";
import EventForm from "@/components/EventForm";
import { ArrowLeft } from "lucide-react";

const Event = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { events, createEvent, updateEvent } = useEvents();

  const existing =
    id && id !== "new" ? events.find((e) => e.id === id) : undefined;

  const handleSave = async (values: any) => {
    try {
      if (existing) {
        await updateEvent(existing.id, values);
      } else {
        await createEvent(values);
      }
      nav("/");
    } catch (e: any) {
      alert(e.message || "Error saving event");
    }
  };
  return (
    <div className="container">
      <div className="flex items-center gap-2 mb-4">
        <span className="cursor-pointer">
          <ArrowLeft
            onClick={() => {
              nav("/");
            }}
          />
        </span>
        <h2 className="event-heading">
          {existing ? "Edit Event" : "New Event"}
        </h2>
      </div>
      <EventForm initial={existing} onSubmit={handleSave} />
    </div>
  );
};

export default Event;
