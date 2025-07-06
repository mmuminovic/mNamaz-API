const slikaNijjet = require('../../assets/namaz/prayer/standing.png');
const slikaDizanjeRuku = require('../../assets/namaz/prayer/takbir.png');
const slikaStajanje = require('../../assets/namaz/prayer/standing-with-arms-overlap.png');
const slikaRukuu = require('../../assets/namaz/prayer/bowing.png');
const slikaStajanjeNakonRukua = require('../../assets/namaz/prayer/standing.png');
const slikaSedzde = require('../../assets/namaz/prayer/sejda.png');
const slikaTesehud = require('../../assets/namaz/prayer/teshehud.png');
const slikaPredajaSelama = require('../../assets/namaz/prayer/selam-1.png');
const slikaPredajaSelama2 = require('../../assets/namaz/prayer/selam-2.png');
const slikaSjedenjeIzmedjuSedzdi = require('../../assets/namaz/prayer/between-two-sejdas.png');
const slikaPrvoSjedenje = require('../../assets/namaz/prayer/teshehud.png');
const slikaKaziprst = require('../../assets/namaz/prayer/teshehud.png');
const allahuEkber = require('./audio/allahu-ekber.mp3');
const subhanekeAudio = require('./audio/subhaneke.mp3');
const euzaAudio = require('./audio/euza.mp3');
const fatihaAudio = require('./audio/fatiha.mp3');
const ihlasAudio = require('./audio/ihlas.mp3');
const kevserAudio = require('./audio/kevser.mp3');
const subhaneRabijelAzimAudio = require('./audio/subhane-rabijel-azim.mp3');
const subhaneRabijelEalaAudio = require('./audio/subhane-rabijel-eala.mp3');
const rabbigfirliAudio = require('./audio/rabbigfirli.mp3');
const rabbenavelekelhamdAudio = require('./audio/rabbena-ve-lekel-hamd.mp3');
const ettehijjatuAudio = require('./audio/ettehijjatu.mp3');
const salavatiAudio = require('./audio/salavati.mp3');
const esselamualejkumverahmetullahAudio = require('./audio/esselamu-alejkum-ve-rahmetullah.mp3');
const semiallahulimenhamidehAudio = require('./audio/semiallahu-limen-hamideh.mp3');
const rukuShafiAudio = require('./audio/subhane-rabijel-azim-ve-bi-hamdihi.mp3');
const sedzdaShafiAudio = require('./audio/subhane-rabijel-eala-ve-bi-hamdihi.mp3');
const allahuEkberuKebiraAudio = require('./audio/allahu-ekberu-kebira.mp3');
const ettehijjatuShafiAudio = require('./audio/ettehijjatu-shafi.mp3');
const zikrIzmedjuSedzdiShafiAudio = require('./audio/izmedju-dvije-sedzde-shafi.mp3');
const nakonRukuaShafiAudio = require('./audio/nakon-povratka-sa-rukua-shafi.mp3');

const rukuuISedzda = [
    {
        title: 'odlazak_na_rukuu',
        data: [
            {
                localeKey: 'sunnet_dizanje_ruku_1',
                zikr: 'allahu_ekber_wxyz',
                zikrTr: 'allahu_ekber_tr',
            },
        ],
        images: [slikaRukuu],
        audio: [{ id: 0, audio: allahuEkber }],
        sunneti: {
            title: 'sunneti_odlazak_na_rukuu',
            list: [
                {
                    localeKeys: [
                        'dizanje_ruku',
                        '',
                        'sunnet_povratak_sa_rukua_hadis',
                        'sunnet_povratak_sa_rukua_biljezi',
                    ],
                    image: slikaDizanjeRuku,
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
    },
    {
        title: 'zikr_na_rukuu',
        data: [
            {
                localeKey: 'na_rukuu',
            },
            {
                card: true,
                title: 'ruku',
                arabic: [
                    { localeKey: 'subhane_rabijel_azim_wxyz', bold: true },
                ],
                translation: [{ localeKey: 'subhane_rabijel_azim_tr' }],
                audio: subhaneRabijelAzimAudio,
            },
        ],
        images: [slikaRukuu],
        audio: [{ id: 1, audio: subhaneRabijelAzimAudio }],
        sunneti: {
            title: 'pocetna_dova_sunnet_title',
            list: [
                {
                    localeKeys: [
                        'zikr',
                        'sunnet_zikr_rukuu_sedzda_2_wxyz',
                        '',
                        'sunnet_zikr_rukuu_sedzda_2_tr',
                    ],
                },
                {
                    localeKeys: [
                        'zikr',
                        'sunnet_zikr_rukuu_sedzda_1_wxyz',
                        '',
                        'sunnet_zikr_rukuu_sedzda_1_tr',
                    ],
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
    },
    {
        title: 'vracanje_sa_rukua',
        data: [
            {
                localeKey: 'sunnet_dizanje_ruku_2',
            },

            {
                card: true,
                title: 'semiallahu_limen_hamideh',
                arabic: [
                    {
                        localeKey: 'semiallahu_limen_hamideh_wxyz',
                        borderTop: true,
                        bold: true,
                    },
                ],
                translation: [
                    {
                        localeKey: 'semiallahu_limen_hamideh_tr',
                    },
                ],
                audio: semiallahulimenhamidehAudio,
            },
            {
                localeKey: 'zikr_na_povratku_sa_rukua',
            },
            {
                card: true,
                title: 'rabbena_lekel_hamd',
                arabic: [{ localeKey: 'rabbena_lekel_hamd_wxyz', bold: true }],
                translation: [{ localeKey: 'rabbena_lekel_hamd_tr' }],
                audio: rabbenavelekelhamdAudio,
            },
        ],
        images: [slikaStajanjeNakonRukua],
        audio: [],
        sunneti: {
            title: 'sunneti_povratak_sa_rukua',
            list: [
                {
                    localeKeys: [
                        'dizanje_ruku',
                        '',
                        'sunnet_povratak_sa_rukua_hadis',
                        'sunnet_povratak_sa_rukua_biljezi',
                    ],
                    image: slikaDizanjeRuku,
                },
                {
                    localeKeys: [
                        'zikr',
                        'sunnet_ruku_zikr_1_wxyz',
                        '',
                        'sunnet_ruku_zikr_1_tr',
                    ],
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
    },
    {
        title: 'padanje_na_sedzdu_title',
        data: [
            {
                localeKey: 'padanje_na_sedzdu',
                zikr: 'allahu_ekber_wxyz',
                zikrTr: 'allahu_ekber_tr',
            },
            {
                localeKey: 'tijelo_na_sedzdi',
            },
        ],
        images: [slikaSedzde],
        audio: [{ id: 0, audio: allahuEkber }],
        sunneti: {
            title: 'sunneti_pri_padanju_na_sedzdu',
            list: [
                {
                    localeKeys: ['odlazak_na_sedzdu_prvo_rukama'],
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
    },
    {
        title: 'zikr_na_sedzdi',
        data: [
            {
                localeKey: 'na_sedzdi',
            },
            {
                card: true,
                title: 'sedzda',
                arabic: [
                    { localeKey: 'subhane_rabijel_eala_wxyz', bold: true },
                ],
                translation: [{ localeKey: 'subhane_rabijel_eala_tr' }],
                audio: subhaneRabijelEalaAudio,
            },
        ],
        images: [slikaSedzde],
        audio: [{ id: 1, audio: subhaneRabijelEalaAudio }],
        sunneti: {
            title: 'zikr_na_sedzdi',
            list: [
                {
                    localeKeys: [
                        'zikr',
                        'sunnet_zikr_rukuu_sedzda_1_wxyz',
                        '',
                        'sunnet_zikr_rukuu_sedzda_1_tr',
                    ],
                },
                {
                    localeKeys: [
                        'zikr',
                        'sunnet_zikr_rukuu_sedzda_2_wxyz',
                        '',
                        'sunnet_zikr_rukuu_sedzda_2_tr',
                    ],
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
    },
    {
        title: 'ustajanje_sa_sedzde_i_sjedenje',
        data: [
            {
                localeKey: 'dizanje_sa_sedzde',
                zikr: 'allahu_ekber_wxyz',
                zikrTr: 'allahu_ekber_tr',
            },
            {
                card: true,
                title: 'rabigfirli',
                arabic: [{ localeKey: 'rabigfirli_wxyz', bold: true }],
                translation: [{ localeKey: 'rabigfirli_tr' }],
                audio: rabbigfirliAudio,
            },
        ],
        images: [slikaSjedenjeIzmedjuSedzdi],
        audio: [],
        sunneti: {
            title: 'sunneti_na_sjedenju_izmedju_sedzdi',
            list: [
                {
                    localeKeys: [
                        'sunnet_zikr_na_sjedenju_title',
                        'sunnet_zikr_na_sjedenju_wxyz',
                        'sunnet_zikr_na_sjedenju_tr',
                    ],
                    image: slikaSjedenjeIzmedjuSedzdi,
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
    },
    {
        title: 'ponovni_odlazak_na_sedzdu_title',
        data: [
            {
                localeKey: 'ponovni_odlazak_na_sedzdu',
                zikr: 'allahu_ekber_wxyz',
                zikrTr: 'allahu_ekber_tr',
            },
            {
                card: true,
                title: 'subhane_rabijel_eala',
                arabic: [
                    { localeKey: 'subhane_rabijel_eala_wxyz', bold: true },
                ],
                translation: [{ localeKey: 'subhane_rabijel_eala_tr' }],
                audio: subhaneRabijelEalaAudio,
            },
        ],
        images: [slikaSedzde],
        audio: [],
    },
];

const rukuuISedzdaShafi = [
    {
        title: 'odlazak_na_rukuu',
        data: [
            {
                localeKey: 'sunnet_dizanje_ruku_1',
                zikr: 'allahu_ekber_wxyz',
                zikrTr: 'allahu_ekber_tr',
            },
        ],
        images: [slikaDizanjeRuku, slikaRukuu],
        audio: [{ id: 0, audio: allahuEkber }],
        sunneti: {
            title: 'sunneti_odlazak_na_rukuu',
            list: [
                {
                    localeKeys: [
                        'dizanje_ruku',
                        '',
                        'sunnet_povratak_sa_rukua_hadis',
                        'sunnet_povratak_sa_rukua_biljezi',
                    ],
                    image: slikaDizanjeRuku,
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
    },
    {
        title: 'zikr_na_rukuu',
        data: [
            {
                localeKey: 'na_rukuu',
            },
            {
                card: true,
                title: 'ruku',
                arabic: [
                    { localeKey: 'subhane_rabijel_azim_wxyz', bold: true },
                ],
                translation: [{ localeKey: 'subhane_rabijel_azim_tr' }],
                audio: subhaneRabijelAzimAudio,
            },
        ],
        images: [slikaRukuu],
        audio: [{ id: 1, audio: rukuShafiAudio }],
    },
    {
        title: 'vracanje_sa_rukua',
        data: [
            {
                localeKey: 'sunnet_dizanje_ruku_2',
            },
            {
                card: true,
                title: 'semiallahu_limen_hamideh',
                arabic: [
                    { localeKey: 'semiallahu_limen_hamideh_wxyz', bold: true },
                ],
                translation: [{ localeKey: 'semiallahu_limen_hamideh_tr' }],
                audio: semiallahulimenhamidehAudio,
            },
            {
                localeKey: 'zikr_na_povratku_sa_rukua',
            },
            {
                card: true,
                title: 'rabbena_lekel_hamd',
                arabic: [{ localeKey: 'rabbena_lekel_hamd_wxyz', bold: true }],
                translation: [{ localeKey: 'rabbena_lekel_hamd_tr' }],
                audio: nakonRukuaShafiAudio,
            },
        ],
        images: [slikaDizanjeRuku, slikaStajanjeNakonRukua],
        sunneti: {
            title: 'sunneti_povratak_sa_rukua',
            list: [
                {
                    localeKeys: [
                        'dizanje_ruku',
                        '',
                        'sunnet_povratak_sa_rukua_hadis',
                        'sunnet_povratak_sa_rukua_biljezi',
                    ],
                    image: slikaDizanjeRuku,
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
    },
    {
        title: 'padanje_na_sedzdu_title',
        data: [
            {
                localeKey: 'padanje_na_sedzdu',
                zikr: 'allahu_ekber_wxyz',
                zikrTr: 'allahu_ekber_tr',
            },
            {
                localeKey: 'tijelo_na_sedzdi',
            },
        ],
        images: [slikaSedzde],
        audio: [{ id: 0, audio: allahuEkber }],
        sunneti: {
            title: 'sunneti_pri_padanju_na_sedzdu',
            list: [
                {
                    localeKeys: ['odlazak_na_sedzdu_prvo_rukama'],
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
    },
    {
        title: 'zikr_na_sedzdi',
        data: [
            {
                localeKey: 'na_sedzdi',
            },
            {
                card: true,
                title: 'sedzda',
                arabic: [
                    { localeKey: 'subhane_rabijel_eala_wxyz', bold: true },
                ],
                translation: [{ localeKey: 'subhane_rabijel_eala_tr' }],
                audio: sedzdaShafiAudio,
            },
        ],
        images: [slikaSedzde],
        audio: [{ id: 1, audio: sedzdaShafiAudio }],
    },
    {
        title: 'ustajanje_sa_sedzde_i_sjedenje',
        data: [
            {
                localeKey: 'dizanje_sa_sedzde',
                zikr: 'allahu_ekber_wxyz',
                zikrTr: 'allahu_ekber_tr',
            },
            {
                card: true,
                title: 'rabigfirli',
                arabic: [
                    {
                        localeKey: 'rabigfirli_wxyz',
                        bold: true,
                        borderTop: true,
                    },
                ],
                translation: [{ localeKey: 'rabigfirli_tr' }],
                audio: zikrIzmedjuSedzdiShafiAudio,
            },
        ],
        images: [slikaSjedenjeIzmedjuSedzdi],
        audio: [],
    },
    {
        title: 'ponovni_odlazak_na_sedzdu_title',
        data: [
            {
                localeKey: 'ponovni_odlazak_na_sedzdu',
                zikr: 'allahu_ekber_wxyz',
                zikrTr: 'allahu_ekber_tr',
            },
            {
                card: true,
                title: 'subhane_rabijel_eala',
                arabic: [
                    { localeKey: 'subhane_rabijel_eala_wxyz', bold: true },
                ],
                translation: [{ localeKey: 'subhane_rabijel_eala_tr' }],
                audio: subhaneRabijelEalaAudio,
            },
        ],
        images: [slikaSedzde],
        audio: [],
    },
];

const ustajanjeNaSledeciRekat = [
    {
        title: 'ustajanje_na_sljedeci_rekat',
        data: [
            {
                localeKey: 'poslije_druge_sedzde',
                zikr: 'allahu_ekber_wxyz',
                zikrTr: 'allahu_ekber_tr',
            },
        ],
        images: [slikaStajanje],
        audio: [{ id: 0, audio: allahuEkber }],
    },
];

const ustajanjeNaTreciRekat = [
    {
        title: 'ustajanje_na_sljedeci_rekat',
        data: [
            {
                localeKey: 'poslije_druge_sedzde',
                zikr: 'allahu_ekber_wxyz',
                zikrTr: 'allahu_ekber_tr',
            },
        ],
        images: [slikaStajanje],
        audio: [{ id: 0, audio: allahuEkber }],
        sunneti: {
            title: 'Sunneti pri ustajanju na treći rekat',
            list: [
                {
                    localeKeys: [
                        'dizanje_ruku',
                        'sunnet_treci_rekat_hadis',
                        'sunnet_treci_rekat_hadis_biljezi',
                    ],
                    image: slikaDizanjeRuku,
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
    },
];

const ustajanjeNaTreciRekatShafi = [
    {
        title: 'ustajanje_na_sljedeci_rekat',
        data: [
            {
                localeKey: 'poslije_druge_sedzde',
                zikr: 'allahu_ekber_wxyz',
                zikrTr: 'allahu_ekber_tr',
            },
        ],
        images: [slikaDizanjeRuku, slikaStajanje],
        audio: [{ id: 0, audio: allahuEkber }],
        sunneti: {
            title: 'Sunneti pri ustajanju na treći rekat',
            list: [
                {
                    localeKeys: [
                        'dizanje_ruku',
                        'sunnet_treci_rekat_hadis',
                        'sunnet_treci_rekat_hadis_biljezi',
                    ],
                    image: slikaDizanjeRuku,
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
    },
];

const predavanjeSelama = [
    {
        title: 'ucenje_salavata_i_dove',
        data: [
            {
                card: true,
                title: 'salavat',
                arabic: [
                    { localeKey: 'salavati_1_wxyz', bold: true },
                    { localeKey: 'salavati_2_wxyz', bold: true },
                    { localeKey: 'salavati_3_wxyz', bold: true },
                    { localeKey: 'salavati_4_wxyz', bold: true },
                ],
                translation: [
                    { localeKey: 'salavati_1_tr' },
                    { localeKey: 'salavati_2_tr' },
                    { localeKey: 'salavati_3_tr' },
                    { localeKey: 'salavati_4_tr' },
                ],
                audio: salavatiAudio,
            },
        ],
        images: [slikaTesehud],
        audio: [{ id: 3, audio: salavatiAudio }],
        sunneti: {
            title: 'sunneti_pri_predaji_selama',
            list: [
                {
                    localeKeys: [
                        'dua',
                        'allahumme_rabbena_1_wxyz',
                        'allahumme_rabbena_2_wxyz',
                        'allahumme_rabbena_3_wxyz',
                        '',
                        'allahumme_rabbena_1_tr',
                        'allahumme_rabbena_2_tr',
                        'allahumme_rabbena_3_tr',
                    ],
                },
                {
                    localeKeys: [
                        'dua',
                        'predaja_selama_sunnet_2_wxyz',
                        '',
                        'predaja_selama_sunnet_2_tr',
                    ],
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
    },
    {
        title: 'predavanje_selama_title',
        data: [
            { localeKey: 'predavanje_selama' },
            {
                card: true,
                title: 'selam',
                arabic: [
                    {
                        localeKey: 'esselamu_alejkum_ve_rahmetullah_wxyz',
                        bold: true,
                    },
                ],
                translation: [
                    { localeKey: 'esselamu_alejkum_ve_rahmetullah_tr' },
                ],
                audio: esselamualejkumverahmetullahAudio,
            },
            {
                localeKey: 'predavanje_selama_2',
            },
        ],
        images: [slikaPredajaSelama, slikaPredajaSelama2],
        audio: [],
        sunneti: {
            title: 'sunneti_pri_predaji_selama',
            list: [
                {
                    localeKeys: [
                        'zikr',
                        'predaja_selama_sunnet_1_wxyz',
                        'predaja_selama_sunnet_1_tr',
                    ],
                },
                {
                    localeKeys: [
                        'zikr',
                        'predaja_selama_sunnet_2_wxyz',
                        'predaja_selama_sunnet_2_tr',
                    ],
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
    },
];

// const predavanjeSelamaShafi = [
//     {
//         title: 'ucenje_salavata_i_dove',
//         data: [
//             { localeKey: 'salavati_1_wxyz', bold: true },
//             { localeKey: 'salavati_2_wxyz', bold: true },
//             { localeKey: 'salavati_3_wxyz', bold: true },
//             { localeKey: 'salavati_4_wxyz', bold: true },
//             { localeKey: 'translation', bold: true },
//             { localeKey: 'salavati_1_tr' },
//             { localeKey: 'salavati_2_tr' },
//             { localeKey: 'salavati_3_tr' },
//             { localeKey: 'salavati_4_tr' },
//         ],
//         images: [slikaTesehud],
//         audio: [{ id: 3, audio: salavatiShafiAudio }],
//     },
//     {
//         title: 'predavanje_selama_title',
//         data: [
//             { localeKey: 'predavanje_selama' },
//             {
//                 localeKey: 'esselamu_alejkum_ve_rahmetullah_wxyz',
//                 bold: true,
//                 borderTop: true,
//             },
//             { localeKey: 'translation', bold: true },
//             { localeKey: 'esselamu_alejkum_ve_rahmetullah_tr' },
//             { localeKey: 'predavanje_selama_2' },
//         ],
//         images: [slikaPredajaSelama],
//         audio: [{ id: 1, audio: esselamualejkumverahmetullahAudio }],
//     },
// ];

const tesehud = [
    {
        title: 'tesehud_title',
        data: [
            {
                localeKey: 'tesehud',
                zikr: 'allahu_ekber_wxyz',
                zikrTr: 'allahu_ekber_tr',
            },
            {
                card: true,
                title: 'tesehud',
                arabic: [
                    { localeKey: 'ettehijjatu_1_wxyz', bold: true },
                    { localeKey: 'ettehijjatu_2_wxyz', bold: true },
                    { localeKey: 'ettehijjatu_3_wxyz', bold: true },
                    { localeKey: 'ettehijjatu_4_wxyz', bold: true },
                    { localeKey: 'ettehijjatu_5_wxyz', bold: true },
                ],
                translation: [
                    { localeKey: 'ettehijjatu_1_tr' },
                    { localeKey: 'ettehijjatu_2_tr' },
                    { localeKey: 'ettehijjatu_3_tr' },
                    { localeKey: 'ettehijjatu_4_tr' },
                    { localeKey: 'ettehijjatu_5_tr' },
                ],
                audio: ettehijjatuAudio,
            },
        ],
        images: [slikaTesehud],
        audio: [{ id: 5, audio: ettehijjatuAudio }],
        sunneti: {
            title: 'sunneti_na_sjedenju',
            list: [
                {
                    localeKeys: ['sunnet_kaziprst'],
                    image: slikaKaziprst,
                },
                {
                    localeKeys: ['sunnet_prvo_sjedenje'],
                    image: slikaPrvoSjedenje,
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
    },
];

const tesehudShafi = [
    {
        title: 'tesehud_title',
        data: [
            {
                localeKey: 'tesehud',
                zikr: 'allahu_ekber_wxyz',
                zikrTr: 'allahu_ekber_tr',
            },
            {
                card: true,
                title: 'tesehud',
                arabic: [
                    { localeKey: 'ettehijjatu_1_wxyz', bold: true },
                    { localeKey: 'ettehijjatu_2_wxyz', bold: true },
                    { localeKey: 'ettehijjatu_3_wxyz', bold: true },
                    { localeKey: 'ettehijjatu_4_wxyz', bold: true },
                    { localeKey: 'ettehijjatu_5_wxyz', bold: true },
                ],
                translation: [
                    { localeKey: 'ettehijjatu_1_tr' },
                    { localeKey: 'ettehijjatu_2_tr' },
                    { localeKey: 'ettehijjatu_3_tr' },
                    { localeKey: 'ettehijjatu_4_tr' },
                    { localeKey: 'ettehijjatu_5_tr' },
                ],
                audio: ettehijjatuShafiAudio,
            },
        ],
        images: [slikaTesehud],
        audio: [{ id: 5, audio: ettehijjatuShafiAudio }],
    },
];

const prviRekat = [
    {
        title: 'pocetak_namaza_title',
        data: [{ localeKey: 'pocetak_namaza' }],
        images: [slikaNijjet],
        audio: [],
        sunneti: {
            title: 'sunnet_prije_stupanja_na_namaz',
            list: [
                {
                    localeKeys: [
                        'postavljanje_sutre_title',
                        'postavljanje_sutre',
                    ],
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
        beginningOfRekah: 1,
    },
    {
        title: 'pocetni_tekbir_title',
        data: [
            { localeKey: 'pocetni_tekbir' },
            {
                card: true,
                title: 'allahu_ekber',
                arabic: [{ localeKey: 'allahu_ekber_wxyz', bold: true }],
                translation: [{ localeKey: 'allahu_ekber_tr', bold: true }],
                audio: allahuEkber,
            },
        ],
        images: [slikaDizanjeRuku],
        audio: [],
    },
    {
        title: 'ucenje_pocetne_dove',
        data: [
            { localeKey: 'vezanje_ruku' },
            {
                card: true,
                title: 'subhaneke',
                arabic: [
                    { localeKey: 'subhaneke_1_wxyz', bold: true },
                    { localeKey: 'subhaneke_2_wxyz', bold: true },
                    { localeKey: 'subhaneke_3_wxyz', bold: true },
                    { localeKey: 'subhaneke_4_wxyz', bold: true },
                ],
                translation: [
                    { localeKey: 'subhaneke_1_tr' },
                    { localeKey: 'subhaneke_2_tr' },
                    { localeKey: 'subhaneke_3_tr' },
                    { localeKey: 'subhaneke_4_tr' },
                ],
                audio: subhanekeAudio,
            },
        ],
        images: [slikaStajanje],
        audio: [],
        sunneti: {
            title: 'pocetna_dova_sunnet_title',
            list: [
                {
                    localeKeys: [
                        'dua',
                        'pocetna_dova_1_wxyz',
                        '',
                        'pocetna_dova_1_tr',
                    ],
                },
            ],
            supportedLanguages: ['en', 'bs', 'tr', 'sq', 'de', 'ru'],
        },
    },
    {
        title: 'ucenje_sure_elfatiha',
        data: [
            { localeKey: 'euza_bismilla_fatiha' },
            {
                card: true,
                title: 'euza',
                arabic: [{ localeKey: 'euza_wxyz', bold: true }],
                translation: [{ localeKey: 'euza_tr' }],
                audio: euzaAudio,
            },
            {
                card: true,
                title: 'fatiha',
                arabic: [
                    { localeKey: 'bismillah_wxyz', bold: true },
                    { localeKey: 'fatiha_1_wxyz', bold: true },
                    { localeKey: 'fatiha_2_wxyz', bold: true },
                    { localeKey: 'fatiha_3_wxyz', bold: true },
                    { localeKey: 'fatiha_4_wxyz', bold: true },
                    { localeKey: 'fatiha_5_wxyz', bold: true },
                    { localeKey: 'fatiha_6_wxyz', bold: true },
                    { localeKey: 'fatiha_7_wxyz', bold: true },
                    { localeKey: 'amin_wxyz', bold: true },
                ],
                translation: [
                    { localeKey: 'bismillah_tr' },
                    { localeKey: 'fatiha_1_tr' },
                    { localeKey: 'fatiha_2_tr' },
                    { localeKey: 'fatiha_3_tr' },
                    { localeKey: 'fatiha_4_tr' },
                    { localeKey: 'fatiha_5_tr' },
                    { localeKey: 'fatiha_6_tr' },
                    { localeKey: 'fatiha_7_tr' },
                    { localeKey: 'amin_tr' },
                ],
                audio: fatihaAudio,
            },
        ],
        images: [slikaStajanje],
        audio: [],
    },
    {
        title: 'ucenje_sure_iz_kurana',
        data: [
            { localeKey: 'nesto_iz_kurana' },
            {
                card: true,
                title: 'ihlas',
                arabic: [
                    { localeKey: 'ihlas_1_wxyz', bold: true },
                    { localeKey: 'ihlas_2_wxyz', bold: true },
                    { localeKey: 'ihlas_3_wxyz', bold: true },
                    { localeKey: 'ihlas_4_wxyz', bold: true },
                ],
                translation: [
                    { localeKey: 'ihlas_1_tr' },
                    { localeKey: 'ihlas_2_tr' },
                    { localeKey: 'ihlas_3_tr' },
                    { localeKey: 'ihlas_4_tr' },
                ],
                audio: ihlasAudio,
            },
        ],
        images: [slikaStajanje],
        audio: [],
    },
    ...rukuuISedzda,
    ...ustajanjeNaSledeciRekat,
];

const prviRekatShafi = [
    {
        title: 'pocetak_namaza_title',
        data: [{ localeKey: 'pocetak_namaza' }],
        images: [slikaNijjet],
        audio: [],
        beginningOfRekah: 1,
    },
    {
        title: 'pocetni_tekbir_title',
        data: [
            { localeKey: 'pocetni_tekbir' },
            {
                card: true,
                title: 'allahu_ekber',
                arabic: [{ localeKey: 'allahu_ekber_wxyz', bold: true }],
                translation: [{ localeKey: 'allahu_ekber_tr', bold: true }],
                audio: allahuEkber,
            },
        ],
        images: [slikaDizanjeRuku],
        audio: [],
    },
    {
        title: 'ucenje_pocetne_dove',
        data: [
            { localeKey: 'vezanje_ruku' },
            {
                card: true,
                title: 'pocetna_dova',
                arabic: [
                    {
                        localeKey: 'pocetna_dova_1_wxyz',
                        bold: true,
                        borderTop: true,
                    },
                ],
                translation: [{ localeKey: 'pocetna_dova_1_tr' }],
                audio: allahuEkberuKebiraAudio,
            },
        ],
        images: [slikaStajanje],
        audio: [],
    },
    {
        title: 'ucenje_sure_elfatiha',
        data: [
            { localeKey: 'euza_bismilla_fatiha' },
            {
                card: true,
                title: 'euza',
                arabic: [{ localeKey: 'euza_wxyz', bold: true }],
                translation: [{ localeKey: 'euza_tr' }],
                audio: euzaAudio,
            },
            {
                card: true,
                title: 'fatiha',
                arabic: [
                    { localeKey: 'bismillah_wxyz', bold: true },
                    { localeKey: 'fatiha_1_wxyz', bold: true },
                    { localeKey: 'fatiha_2_wxyz', bold: true },
                    { localeKey: 'fatiha_3_wxyz', bold: true },
                    { localeKey: 'fatiha_4_wxyz', bold: true },
                    { localeKey: 'fatiha_5_wxyz', bold: true },
                    { localeKey: 'fatiha_6_wxyz', bold: true },
                    { localeKey: 'fatiha_7_wxyz', bold: true },
                    { localeKey: 'amin_wxyz', bold: true },
                ],
                translation: [
                    { localeKey: 'bismillah_tr' },
                    { localeKey: 'fatiha_1_tr' },
                    { localeKey: 'fatiha_2_tr' },
                    { localeKey: 'fatiha_3_tr' },
                    { localeKey: 'fatiha_4_tr' },
                    { localeKey: 'fatiha_5_tr' },
                    { localeKey: 'fatiha_6_tr' },
                    { localeKey: 'fatiha_7_tr' },
                    { localeKey: 'amin_tr' },
                ],
                audio: fatihaAudio,
            },
        ],
        images: [slikaStajanje],
        audio: [],
    },
    {
        title: 'ucenje_sure_iz_kurana',
        data: [
            { localeKey: 'nesto_iz_kurana' },
            {
                card: true,
                title: 'ihlas',
                arabic: [
                    { localeKey: 'ihlas_1_wxyz', bold: true },
                    { localeKey: 'ihlas_2_wxyz', bold: true },
                    { localeKey: 'ihlas_3_wxyz', bold: true },
                    { localeKey: 'ihlas_4_wxyz', bold: true },
                ],
                translation: [
                    { localeKey: 'ihlas_1_tr' },
                    { localeKey: 'ihlas_2_tr' },
                    { localeKey: 'ihlas_3_tr' },
                    { localeKey: 'ihlas_4_tr' },
                ],
                audio: ihlasAudio,
            },
        ],
        images: [slikaStajanje],
        audio: [],
    },
    ...rukuuISedzdaShafi,
    ...ustajanjeNaSledeciRekat,
];

const drugiRekat = [
    {
        title: 'ucenje_sure_elfatiha',
        data: [
            {
                card: true,
                title: 'fatiha',
                arabic: [
                    { localeKey: 'bismillah_wxyz', bold: true },
                    { localeKey: 'fatiha_1_wxyz', bold: true },
                    { localeKey: 'fatiha_2_wxyz', bold: true },
                    { localeKey: 'fatiha_3_wxyz', bold: true },
                    { localeKey: 'fatiha_4_wxyz', bold: true },
                    { localeKey: 'fatiha_5_wxyz', bold: true },
                    { localeKey: 'fatiha_6_wxyz', bold: true },
                    { localeKey: 'fatiha_7_wxyz', bold: true },
                    { localeKey: 'amin_wxyz', bold: true },
                ],
                translation: [
                    { localeKey: 'bismillah_tr' },
                    { localeKey: 'fatiha_1_tr' },
                    { localeKey: 'fatiha_2_tr' },
                    { localeKey: 'fatiha_3_tr' },
                    { localeKey: 'fatiha_4_tr' },
                    { localeKey: 'fatiha_5_tr' },
                    { localeKey: 'fatiha_6_tr' },
                    { localeKey: 'fatiha_7_tr' },
                    { localeKey: 'amin_tr' },
                ],
                audio: fatihaAudio,
            },
        ],
        images: [slikaStajanje],
        audio: [],
        beginningOfRekah: 2,
    },
    {
        title: 'ucenje_sure_iz_kurana',
        data: [
            {
                card: true,
                title: 'kevser',
                arabic: [
                    { localeKey: 'kevser_1_wxyz', bold: true },
                    { localeKey: 'kevser_2_wxyz', bold: true },
                    { localeKey: 'kevser_3_wxyz', bold: true },
                ],
                translation: [
                    { localeKey: 'kevser_1_tr' },
                    { localeKey: 'kevser_2_tr' },
                    { localeKey: 'kevser_3_tr' },
                ],
                audio: kevserAudio,
            },
        ],
        images: [slikaStajanje],
        audio: [],
    },
];

const treciRekat = [
    {
        title: 'ucenje_sure_elfatiha',
        data: [
            {
                card: true,
                title: 'fatiha',
                arabic: [
                    { localeKey: 'bismillah_wxyz', bold: true },
                    { localeKey: 'fatiha_1_wxyz', bold: true },
                    { localeKey: 'fatiha_2_wxyz', bold: true },
                    { localeKey: 'fatiha_3_wxyz', bold: true },
                    { localeKey: 'fatiha_4_wxyz', bold: true },
                    { localeKey: 'fatiha_5_wxyz', bold: true },
                    { localeKey: 'fatiha_6_wxyz', bold: true },
                    { localeKey: 'fatiha_7_wxyz', bold: true },
                    { localeKey: 'amin_wxyz', bold: true },
                ],
                translation: [
                    { localeKey: 'bismillah_tr' },
                    { localeKey: 'fatiha_1_tr' },
                    { localeKey: 'fatiha_2_tr' },
                    { localeKey: 'fatiha_3_tr' },
                    { localeKey: 'fatiha_4_tr' },
                    { localeKey: 'fatiha_5_tr' },
                    { localeKey: 'fatiha_6_tr' },
                    { localeKey: 'fatiha_7_tr' },
                    { localeKey: 'amin_tr' },
                ],
                audio: fatihaAudio,
            },
        ],
        images: [slikaStajanje],
        audio: [],
        beginningOfRekah: 3,
    },
];

const namazDataHanefi = [
    {
        num: 2,
        steps: [
            ...prviRekat,
            ...drugiRekat,
            ...rukuuISedzda,
            ...tesehud,
            ...predavanjeSelama,
        ],
    },
    {
        num: 3,
        steps: [
            ...prviRekat,
            ...drugiRekat,
            ...rukuuISedzda,
            ...tesehud,
            ...ustajanjeNaTreciRekat,
            ...treciRekat,
            ...rukuuISedzda,
            ...tesehud,
            ...predavanjeSelama,
        ],
    },
    {
        num: 4,
        steps: [
            ...prviRekat,
            ...drugiRekat,
            ...rukuuISedzda,
            ...tesehud,
            ...ustajanjeNaTreciRekat,
            ...treciRekat,
            ...rukuuISedzda,
            ...ustajanjeNaSledeciRekat,
            ...treciRekat.map((el, i) => {
                if (i === 0) {
                    return { ...el, beginningOfRekah: 4 };
                } else {
                    return el;
                }
            }),
            ...rukuuISedzda,
            ...tesehud,
            ...predavanjeSelama,
        ],
    },
];

const namazDataShafi = [
    {
        num: 2,
        steps: [
            ...prviRekatShafi,
            ...drugiRekat,
            ...rukuuISedzdaShafi,
            ...tesehudShafi,
            ...predavanjeSelama,
        ],
    },
    {
        num: 3,
        steps: [
            ...prviRekatShafi,
            ...drugiRekat,
            ...rukuuISedzdaShafi,
            ...tesehudShafi,
            ...ustajanjeNaTreciRekatShafi,
            ...treciRekat,
            ...rukuuISedzdaShafi,
            ...tesehudShafi,
            ...predavanjeSelama,
        ],
    },
    {
        num: 4,
        steps: [
            ...prviRekatShafi,
            ...drugiRekat,
            ...rukuuISedzdaShafi,
            ...tesehudShafi,
            ...ustajanjeNaTreciRekatShafi,
            ...treciRekat,
            ...rukuuISedzdaShafi,
            ...ustajanjeNaSledeciRekat,
            ...treciRekat.map((el, i) => {
                if (i === 0) {
                    return { ...el, beginningOfRekah: 4 };
                } else {
                    return el;
                }
            }),
            ...rukuuISedzdaShafi,
            ...tesehudShafi,
            ...predavanjeSelama,
        ],
    },
];

export const namazData = (lang) => {
    if (lang === 'id') {
        return namazDataShafi;
    }
    return namazDataHanefi;
};
