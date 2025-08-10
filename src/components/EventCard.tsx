import { EventItem } from "@/types/event";
import { Link } from "react-router-dom";
import { Calendar, Link2, MapPin } from "lucide-react";

const EventCard = ({ e }: { e: EventItem }) => {
  const range = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const when = `${range.format(new Date(e.startDateTime))} – ${range.format(
    new Date(e.endDateTime)
  )}`;

  return (
    <article className="event-card">
      {/* Header */}
      <header className="event-card__header">
        <h3 className="event-card__title">{e.title}</h3>
        <Link className="btn btn--ghost btn--sm" to={`/events/${e.id}`}>
          Edit
        </Link>
      </header>

      {/* Description */}
      <p className="event-card__desc">{e.description}</p>

      {/* Details */}
      <dl className="event-card__details">
        <div className="event-card__row">
          <dt>Event Type:</dt>
          <dd>{e.eventType}</dd>
        </div>
        <div className="event-card__row">
          <dt>Category:</dt>
          <dd>{e.category}</dd>
        </div>
        <div className="event-card__row">
          <dt>Organizer:</dt>
          <dd>{e.organizerName}</dd>
        </div>
        <div className="event-card__row">
          <dt>Date & Time:</dt>
          <dd>
            <Calendar size={16} /> {when}
          </dd>
        </div>

        {e.eventType === "Online" && e.eventLink && (
          <div className="event-card__row">
            <dt>Event Link:</dt>
            <dd>
              <a href={e.eventLink} target="_blank" rel="noreferrer">
                <Link2 size={16} /> Join
              </a>
            </dd>
          </div>
        )}

        {e.eventType === "In-Person" && e.location && (
          <div className="event-card__row">
            <dt>Location:</dt>
            <dd>
              <MapPin size={16} /> {e.location}
            </dd>
          </div>
        )}
      </dl>
    </article>
  );
};

export default EventCard;
