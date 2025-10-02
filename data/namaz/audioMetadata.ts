/**
 * Audio metadata mapping that connects audio files to their localization keys
 * This provides text (Arabic), transliteration (wxyz), and translation (tr) for each audio file
 */

export interface AudioMetadata {
  id: string;
  filename: string;
  category: 'prayer' | 'azan' | 'iqamah' | 'dhikr';
  school?: 'hanafi' | 'shafi';
  localeKeys: Array<{
    arabic: string;           // Key for Arabic text
    transliteration: string;  // Key for transliteration (wxyz)
    translation: string;      // Key for translation (tr)
  }>;
}

export const audioMetadata: AudioMetadata[] = [
  // Common prayers (both schools)
  {
    id: 'allahu-ekber',
    filename: 'allahu-ekber.mp3',
    category: 'prayer',
    localeKeys: [{
      arabic: 'allahu_ekber',
      transliteration: 'allahu_ekber_wxyz',
      translation: 'allahu_ekber_tr'
    }]
  },
  {
    id: 'euza',
    filename: 'euza.mp3',
    category: 'prayer',
    localeKeys: [{
      arabic: 'euza',
      transliteration: 'euza_wxyz',
      translation: 'euza_tr'
    }]
  },
  {
    id: 'fatiha',
    filename: 'fatiha.mp3',
    category: 'prayer',
    localeKeys: [
      {
        arabic: 'fatiha_1',
        transliteration: 'fatiha_1_wxyz',
        translation: 'fatiha_1_tr'
      },
      {
        arabic: 'fatiha_2',
        transliteration: 'fatiha_2_wxyz',
        translation: 'fatiha_2_tr'
      },
      {
        arabic: 'fatiha_3',
        transliteration: 'fatiha_3_wxyz',
        translation: 'fatiha_3_tr'
      },
      {
        arabic: 'fatiha_4',
        transliteration: 'fatiha_4_wxyz',
        translation: 'fatiha_4_tr'
      },
      {
        arabic: 'fatiha_5',
        transliteration: 'fatiha_5_wxyz',
        translation: 'fatiha_5_tr'
      },
      {
        arabic: 'fatiha_6',
        transliteration: 'fatiha_6_wxyz',
        translation: 'fatiha_6_tr'
      },
      {
        arabic: 'fatiha_7',
        transliteration: 'fatiha_7_wxyz',
        translation: 'fatiha_7_tr'
      }
    ]
  },
  {
    id: 'ihlas',
    filename: 'ihlas.mp3',
    category: 'prayer',
    localeKeys: [
      {
        arabic: 'ihlas_1',
        transliteration: 'ihlas_1_wxyz',
        translation: 'ihlas_1_tr'
      },
      {
        arabic: 'ihlas_2',
        transliteration: 'ihlas_2_wxyz',
        translation: 'ihlas_2_tr'
      },
      {
        arabic: 'ihlas_3',
        transliteration: 'ihlas_3_wxyz',
        translation: 'ihlas_3_tr'
      },
      {
        arabic: 'ihlas_4',
        transliteration: 'ihlas_4_wxyz',
        translation: 'ihlas_4_tr'
      }
    ]
  },
  {
    id: 'kevser',
    filename: 'kevser.mp3',
    category: 'prayer',
    localeKeys: [
      {
        arabic: 'kevser_1',
        transliteration: 'kevser_1_wxyz',
        translation: 'kevser_1_tr'
      },
      {
        arabic: 'kevser_2',
        transliteration: 'kevser_2_wxyz',
        translation: 'kevser_2_tr'
      },
      {
        arabic: 'kevser_3',
        transliteration: 'kevser_3_wxyz',
        translation: 'kevser_3_tr'
      }
    ]
  },
  {
    id: 'subhaneke',
    filename: 'subhaneke.mp3',
    category: 'prayer',
    school: 'hanafi',
    localeKeys: [
      {
        arabic: 'subhaneke_1',
        transliteration: 'subhaneke_1_wxyz',
        translation: 'subhaneke_1_tr'
      },
      {
        arabic: 'subhaneke_2',
        transliteration: 'subhaneke_2_wxyz',
        translation: 'subhaneke_2_tr'
      },
      {
        arabic: 'subhaneke_3',
        transliteration: 'subhaneke_3_wxyz',
        translation: 'subhaneke_3_tr'
      },
      {
        arabic: 'subhaneke_4',
        transliteration: 'subhaneke_4_wxyz',
        translation: 'subhaneke_4_tr'
      }
    ]
  },
  {
    id: 'ettehijjatu',
    filename: 'ettehijjatu.mp3',
    category: 'prayer',
    school: 'hanafi',
    localeKeys: [
      {
        arabic: 'ettehijjatu_1',
        transliteration: 'ettehijjatu_1_wxyz',
        translation: 'ettehijjatu_1_tr'
      },
      {
        arabic: 'ettehijjatu_2',
        transliteration: 'ettehijjatu_2_wxyz',
        translation: 'ettehijjatu_2_tr'
      },
      {
        arabic: 'ettehijjatu_3',
        transliteration: 'ettehijjatu_3_wxyz',
        translation: 'ettehijjatu_3_tr'
      },
      {
        arabic: 'ettehijjatu_4',
        transliteration: 'ettehijjatu_4_wxyz',
        translation: 'ettehijjatu_4_tr'
      },
      {
        arabic: 'ettehijjatu_5',
        transliteration: 'ettehijjatu_5_wxyz',
        translation: 'ettehijjatu_5_tr'
      }
    ]
  },
  {
    id: 'salavati',
    filename: 'salavati.mp3',
    category: 'prayer',
    school: 'hanafi',
    localeKeys: [
      {
        arabic: 'salavati_1',
        transliteration: 'salavati_1_wxyz',
        translation: 'salavati_1_tr'
      },
      {
        arabic: 'salavati_2',
        transliteration: 'salavati_2_wxyz',
        translation: 'salavati_2_tr'
      },
      {
        arabic: 'salavati_3',
        transliteration: 'salavati_3_wxyz',
        translation: 'salavati_3_tr'
      },
      {
        arabic: 'salavati_4',
        transliteration: 'salavati_4_wxyz',
        translation: 'salavati_4_tr'
      }
    ]
  },
  {
    id: 'subhane-rabijel-azim',
    filename: 'subhane-rabijel-azim.mp3',
    category: 'prayer',
    school: 'hanafi',
    localeKeys: [{
      arabic: 'subhane_rabijel_azim',
      transliteration: 'subhane_rabijel_azim_wxyz',
      translation: 'subhane_rabijel_azim_tr'
    }]
  },
  {
    id: 'subhane-rabijel-eala',
    filename: 'subhane-rabijel-eala.mp3',
    category: 'prayer',
    school: 'hanafi',
    localeKeys: [{
      arabic: 'subhane_rabijel_eala',
      transliteration: 'subhane_rabijel_eala_wxyz',
      translation: 'subhane_rabijel_eala_tr'
    }]
  },
  {
    id: 'semiallahu-limen-hamideh',
    filename: 'semiallahu-limen-hamideh.mp3',
    category: 'prayer',
    localeKeys: [{
      arabic: 'semiallahu_limen_hamideh',
      transliteration: 'semiallahu_limen_hamideh_wxyz',
      translation: 'semiallahu_limen_hamideh_tr'
    }]
  },
  {
    id: 'rabbena-ve-lekel-hamd',
    filename: 'rabbena-ve-lekel-hamd.mp3',
    category: 'prayer',
    school: 'hanafi',
    localeKeys: [{
      arabic: 'rabbena_lekel_hamd',
      transliteration: 'rabbena_lekel_hamd_wxyz',
      translation: 'rabbena_lekel_hamd_tr'
    }]
  },
  {
    id: 'rabbigfirli',
    filename: 'rabbigfirli.mp3',
    category: 'prayer',
    school: 'hanafi',
    localeKeys: [{
      arabic: 'rabigfirli',
      transliteration: 'rabigfirli_wxyz',
      translation: 'rabigfirli_tr'
    }]
  },
  {
    id: 'esselamu-alejkum-ve-rahmetullah',
    filename: 'esselamu-alejkum-ve-rahmetullah.mp3',
    category: 'prayer',
    localeKeys: [{
      arabic: 'esselamu_alejkum_ve_rahmetullah',
      transliteration: 'esselamu_alejkum_ve_rahmetullah_wxyz',
      translation: 'esselamu_alejkum_ve_rahmetullah_tr'
    }]
  },
  // Shafi-specific prayers
  {
    id: 'allahu-ekberu-kebira',
    filename: 'allahu-ekberu-kebira.mp3',
    category: 'prayer',
    school: 'shafi',
    localeKeys: [{
      arabic: 'pocetna_dova_1',
      transliteration: 'pocetna_dova_1_wxyz',
      translation: 'pocetna_dova_1_tr'
    }]
  },
  {
    id: 'ettehijjatu-shafi',
    filename: 'ettehijjatu-shafi.mp3',
    category: 'prayer',
    school: 'shafi',
    localeKeys: [
      {
        arabic: 'ettehijjatu_1',
        transliteration: 'ettehijjatu_1_wxyz',
        translation: 'ettehijjatu_1_tr'
      },
      {
        arabic: 'ettehijjatu_2',
        transliteration: 'ettehijjatu_2_wxyz',
        translation: 'ettehijjatu_2_tr'
      },
      {
        arabic: 'ettehijjatu_3',
        transliteration: 'ettehijjatu_3_wxyz',
        translation: 'ettehijjatu_3_tr'
      },
      {
        arabic: 'ettehijjatu_4',
        transliteration: 'ettehijjatu_4_wxyz',
        translation: 'ettehijjatu_4_tr'
      },
      {
        arabic: 'ettehijjatu_5',
        transliteration: 'ettehijjatu_5_wxyz',
        translation: 'ettehijjatu_5_tr'
      }
    ]
  },
  {
    id: 'salavati-shafi',
    filename: 'salavati-shafi.mp3',
    category: 'prayer',
    school: 'shafi',
    localeKeys: [
      {
        arabic: 'salavati_1',
        transliteration: 'salavati_1_wxyz',
        translation: 'salavati_1_tr'
      },
      {
        arabic: 'salavati_2',
        transliteration: 'salavati_2_wxyz',
        translation: 'salavati_2_tr'
      },
      {
        arabic: 'salavati_3',
        transliteration: 'salavati_3_wxyz',
        translation: 'salavati_3_tr'
      },
      {
        arabic: 'salavati_4',
        transliteration: 'salavati_4_wxyz',
        translation: 'salavati_4_tr'
      }
    ]
  },
  {
    id: 'subhane-rabijel-azim-ve-bi-hamdihi',
    filename: 'subhane-rabijel-azim-ve-bi-hamdihi.mp3',
    category: 'prayer',
    school: 'shafi',
    localeKeys: [{
      arabic: 'subhane_rabijel_azim',
      transliteration: 'subhane_rabijel_azim_wxyz',
      translation: 'subhane_rabijel_azim_tr'
    }]
  },
  {
    id: 'subhane-rabijel-eala-ve-bi-hamdihi',
    filename: 'subhane-rabijel-eala-ve-bi-hamdihi.mp3',
    category: 'prayer',
    school: 'shafi',
    localeKeys: [{
      arabic: 'subhane_rabijel_eala',
      transliteration: 'subhane_rabijel_eala_wxyz',
      translation: 'subhane_rabijel_eala_tr'
    }]
  },
  {
    id: 'nakon-povratka-sa-rukua-shafi',
    filename: 'nakon-povratka-sa-rukua-shafi.mp3',
    category: 'prayer',
    school: 'shafi',
    localeKeys: [{
      arabic: 'rabbena_lekel_hamd',
      transliteration: 'rabbena_lekel_hamd_wxyz',
      translation: 'rabbena_lekel_hamd_tr'
    }]
  },
  {
    id: 'izmedju-dvije-sedzde-shafi',
    filename: 'izmedju-dvije-sedzde-shafi.mp3',
    category: 'prayer',
    school: 'shafi',
    localeKeys: [{
      arabic: 'rabigfirli',
      transliteration: 'rabigfirli_wxyz',
      translation: 'rabigfirli_tr'
    }]
  },
  // Azan and Iqamah
  {
    id: 'azan',
    filename: 'azan.mp3',
    category: 'azan',
    localeKeys: [{
      arabic: 'azan',
      transliteration: 'azan_wxyz',
      translation: 'azan_tr'
    }]
  },
  {
    id: 'iqamah',
    filename: 'iqamah.mp3',
    category: 'iqamah',
    localeKeys: [{
      arabic: 'iqamah',
      transliteration: 'iqamah_wxyz',
      translation: 'iqamah_tr'
    }]
  }
];
