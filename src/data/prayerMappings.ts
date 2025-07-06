/**
 * Direct prayer mappings for use in controllers
 * This bypasses the complex namazDetails.ts parsing and provides
 * a direct mapping of prayer types to their configurations
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

// Create mock prayer data with the expected structure
export function createMockPrayerData(): any[] {
  return [
    {
      type: "fajr",
      rakats: 2,
      name: "Fajr",
      localName: "sabah",
      steps: [], // Will be populated from namazDetails if available
    },
    {
      type: "dhuhr",
      rakats: 4,
      name: "Dhuhr",
      localName: "podne",
      steps: [],
    },
    {
      type: "asr",
      rakats: 4,
      name: "Asr",
      localName: "ikindija",
      steps: [],
    },
    {
      type: "maghrib",
      rakats: 3,
      name: "Maghrib",
      localName: "aksam",
      steps: [],
    },
    {
      type: "isha",
      rakats: 4,
      name: "Isha",
      localName: "jacija",
      steps: [],
    },
  ];
}

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
