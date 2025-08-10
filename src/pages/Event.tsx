import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "@/hooks/useEvents";
import EventForm from "@/components/EventForm";

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
    <div className="container narrow">
      <h2>{existing ? "Edit Event" : "New Event"}</h2>
      <EventForm initial={existing} onSubmit={handleSave} />
    </div>
  );
};

export default Event;
