import { useEvents } from "@/hooks/useEvents";
import { EventItem } from "@/types/event";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { events } = useEvents();

  const ViewEvent = events.find((e: EventItem) => e.id === id);

  if (ViewEvent === undefined || ViewEvent === null) {
    return <h2 className="text-center">Event not found</h2>;
  }
  const range = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const when = `${range.format(
    new Date(ViewEvent?.startDateTime || "")
  )} – ${range.format(new Date(ViewEvent?.endDateTime || ""))}`;

  return (
    <div className="container view-details">
      <ArrowLeft
        onClick={() => {
          window.history.back();
        }}
      />
      <h1 className="event-heading">{ViewEvent?.title}</h1>
      <p>{ViewEvent?.description}</p>
      <p>
        Organizer Name: <span className="details">{ViewEvent?.organizerName}</span>
      </p>
      <p>
        Category: <span className="details">{ViewEvent?.category}</span>
      </p>
      <p>
        Event Type: <span className="details">{ViewEvent?.eventType}</span>
      </p>
      {ViewEvent?.eventType === "Online" ? (
        <p>
          Link:{" "}
          <a href={ViewEvent?.eventLink} target="_blank">
            {ViewEvent?.eventLink}
          </a>
        </p>
      ) : (
        <p>
          Location: <span className="details">{ViewEvent?.location}</span>
        </p>
      )}
      <p>
        Time: <span className="details">{when}</span>
      </p>
    </div>
  );
};

export default EventDetails;
