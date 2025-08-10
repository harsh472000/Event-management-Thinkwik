export type EventType = 'Online' | 'In-Person';

export type EventItem = {
  id: string;
  title: string;
  description: string;
  eventType: EventType;
  location?: string;
  eventLink?: string;
  startDateTime: string;
  endDateTime: string;
  category: string;
  organizerId: string;   
  organizerName: string; 
  createdAt: string;
  updatedAt: string;     
};

export type SortKey = 'start' | 'title';

export type FilterState = {
  q: string;
  eventType: EventType | 'All';
  category: string | 'All';
  from?: string; // ISO date (yyyy-mm-dd)
  to?: string;   // ISO date (yyyy-mm-dd)
  sortBy: SortKey;
};