export interface LocaleContent {
  type: 'title' | 'text' | 'arabic' | 'transliteration' | 'translation' | 'audio';
  localeKey: string;
  style?: any;
}

export interface AbdestStep {
  id: number;
  image: string;
  localeDict: string;
  data: LocaleContent[];
}

export interface PrayerStep {
  title?: string;
  type?: 'stand' | 'bow' | 'prostrate' | 'sit';
  data: LocaleContent[];
  images?: string[];
  audio?: string | string[];
  sunneti?: LocaleContent[];
  isOptional?: boolean;
}

export interface PrayerComponent {
  [key: string]: PrayerStep[];
}

export interface PrayerData {
  id: string;
  name: string;
  rakats: number;
  school: 'hanafi' | 'shafi';
  steps: PrayerStep[];
  type: 'farz' | 'sunnah' | 'witr' | 'special';
}

export interface Lesson {
  id: number;
  title: string;
  sentences: LocaleContent[];
  image?: string;
}

export interface NonMandatoryPrayer {
  id: string;
  type: 'bajram' | 'dzenaza' | 'istihara' | 'duha';
  steps: PrayerStep[];
}

export interface Dhikr {
  id: string;
  title: string;
  arabic: string;
  transliteration?: string;
  translation?: string;
  audio: string;
  count?: number;
}

export interface AudioResource {
  id: string;
  filename: string;
  path: string;
  category: 'prayer' | 'dhikr' | 'azan' | 'iqamah';
  school?: 'hanafi' | 'shafi';
  localeKeys?: Array<{
    arabic: string;
    transliteration: string;
    translation: string;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    language: string;
    version: string;
  };
}