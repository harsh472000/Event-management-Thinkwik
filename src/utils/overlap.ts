import { EventItem } from '@/types/event';

export function isOverlapping(candidate: Pick<EventItem,'startDateTime'|'endDateTime'|'id'>, events: EventItem[]): boolean {
  const start = new Date(candidate.startDateTime).getTime();
  const end = new Date(candidate.endDateTime).getTime();
  if (isNaN(start) || isNaN(end) || start >= end) return true; // invalid or zero-width

  return events.some(e => {
    if (e.id === candidate.id) return false; // ignore self on update
    const s = new Date(e.startDateTime).getTime();
    const t = new Date(e.endDateTime).getTime();
    return Math.max(s, start) < Math.min(t, end); // true if intervals intersect
  });
}