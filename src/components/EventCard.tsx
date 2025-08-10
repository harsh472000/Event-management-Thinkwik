import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Link2, MapPin } from "lucide-react";
import { EventItem } from "@/types/event";
import CommonButton from "@/components/common/CommonButton";
import Dialog from "@/components/common/Dialog";


const EventCard = ({
  e,
  onDelete,
}: {
  e: EventItem;
  onDelete: (id: string) => void;
}) => {
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const range = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const when = `${range.format(new Date(e.startDateTime))} – ${range.format(
    new Date(e.endDateTime)
  )}`;

  return (
    <>
    <article className="event-card">
      {/* Header */}
      <header className="event-card__header">
        <h3 className="event-card__title">{e.title}</h3>
        <div className="event-card__actions">
          {/* <Link className="btn btn--ghost btn--sm" to={`/events/${e.id}`}>
            Edit
          </Link> */}
          <CommonButton
            size="sm" 
            onClick={() => navigate(`/events/${e.id}`)}
          >
            Edit
          </CommonButton>
          <CommonButton
            variant="danger"
            size="sm"
            onClick={() => setDialogOpen(true)}
          >
            Delete
          </CommonButton>
        </div>
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
    <Dialog
        isOpen={isDialogOpen}
        title="Delete Event"
        message="Are you sure you want to delete this event?"
        onCancel={() => setDialogOpen(false)}
        onConfirm={() => {
          onDelete(e.id);
          setDialogOpen(false);
        }}
      />
    </>
  );
};

export default EventCard;
