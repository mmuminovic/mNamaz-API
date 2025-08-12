/**
 * Prayer type mappings for use in controllers
 * Provides a direct mapping of prayer types to their configurations
 */

export interface PrayerMapping {
  type: string;
  rakats: number;
  name: string;
  localName: string;
}

export const PRAYER_TYPES: Record<string, PrayerMapping> = {
  fajr: {
    type: "fajr",
    rakats: 2,
    name: "Fajr",
    localName: "sabah",
  },
  dhuhr: {
    type: "dhuhr",
    rakats: 4,
    name: "Dhuhr",
    localName: "podne",
  },
  asr: {
    type: "asr",
    rakats: 4,
    name: "Asr",
    localName: "ikindija",
  },
  maghrib: {
    type: "maghrib",
    rakats: 3,
    name: "Maghrib",
    localName: "aksam",
  },
  isha: {
    type: "isha",
    rakats: 4,
    name: "Isha",
    localName: "jacija",
  },
};

export function getPrayerMapping(
  prayerType: string
): PrayerMapping | undefined {
  return PRAYER_TYPES[prayerType.toLowerCase()];
}

export function getAllPrayerTypes(): string[] {
  return Object.keys(PRAYER_TYPES);
}

export function getAllPrayerMappings(): PrayerMapping[] {
  return Object.values(PRAYER_TYPES);
}
