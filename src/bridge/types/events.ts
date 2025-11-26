export interface EventItem {
  id: string;
  name: string;
  image?: string;
  date?: string;
  time?: string;
  venue?: string;
  city?: string;
  country?: string;
  lat?: string;
  lng?: string;
  raw?: unknown;
}

export interface SearchEventsPayload {
  keyword: string;
  city: string;
}
