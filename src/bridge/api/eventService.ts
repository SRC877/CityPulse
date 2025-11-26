import axios from "axios";
import type { EventItem, SearchEventsPayload } from "../types/events";

const API_KEY = process.env.EXPO_PUBLIC_TICKETMASTER_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function fetchEventsApi(
  payload: SearchEventsPayload
): Promise<EventItem[]> {
  const { keyword, city } = payload;
  const res = await axios.get(`${BASE_URL}/events.json`, {
    params: {
      apikey: API_KEY,
      keyword: keyword || "",
      city: city || "",
    },
  });

  const events = res.data?._embedded?.events ?? [];

  return events.map((e: any): EventItem => ({
    id: e.id,
    name: e.name,
    image: e.images?.[0]?.url,
    date: e.dates?.start?.localDate,
    time: e.dates?.start?.localTime,
    venue: e._embedded?.venues?.[0]?.name,
    city: e._embedded?.venues?.[0]?.city?.name,
    country: e._embedded?.venues?.[0]?.country?.name,
    lat: e._embedded?.venues?.[0]?.location?.latitude,
    lng: e._embedded?.venues?.[0]?.location?.longitude,
    raw: e,
  }));
}
