const LS = {
  USERS: "evt.users",
  SESSION: "evt.session",
  EVENTS: (userId: string) => `evt.events.${userId}`,
};

export const load = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const save = (key: string, value: unknown) => {
  console.log(`Saving to ${key}:`, value);
  localStorage.setItem(key, JSON.stringify(value));
};

export default LS;
