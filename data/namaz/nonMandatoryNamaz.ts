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
const minberAudio = require('../../assets/namaz/minber.png');
const duaImg = require('../../assets/namaz/namaz-intro-1.png');
const dzenaza1 = require('../../assets/namaz/prayer/dzenaza_1.png');
const dzenaza2 = require('../../assets/namaz/prayer/dzenaza_2.png');
const dzenaza3 = require('../../assets/namaz/prayer/dzenaza_3.png');
const dzenaza4 = require('../../assets/namaz/prayer/dzenaza_4.png');
const dzenaza5 = require('../../assets/namaz/prayer/dzenaza_5.png');

import {
    prviRekat,
    drugiRekat,
    rukuuISedzda,
    tesehud,
    predavanjeSelama,
    ustajanjeNaTreciRekat,
    treciRekat,
    ustajanjeNaSledeciRekat,
} from './namazComponents';

const bajramNamaz = [
    {
        num: 2,
        steps: [
            {
                title: 'bajram_namaz_prije_pocetka_title',
                data: [
                    { localeKey: 'bajram_namaz_opis_title', bold: true },
                    { localeKey: 'bajram_namaz_opis' },
                    { localeKey: 'bajram_namaz_opis_1' },
                    { localeKey: 'bajram_namaz_opis_2' },
                    { localeKey: 'bajram_namaz_vrijeme', bold: true },
                    { localeKey: 'bajram_namaz_vrijeme_1' },
                    { localeKey: 'bajram_namaz_mjesto', bold: true },
                    { localeKey: 'bajram_namaz_mjesto_1' },
                    { localeKey: 'bajram_namaz_priprema', bold: true },
                    { localeKey: 'bajram_namaz_priprema_1' },
                    { localeKey: 'bajram_namaz_priprema_2' },
                    { localeKey: 'bajram_namaz_priprema_3' },
                    { localeKey: 'bajram_namaz_priprema_4' },
                    { localeKey: 'bajram_namaz_priprema_5' },
                    { localeKey: 'bajram_namaz_priprema_6' },
                ],
                audio: [],
                images: [slikaNijjet],
            },
            {
                title: 'pocetak_namaza_title',
                data: [
                    { localeKey: 'bajram_namaz_dzematski_title', bold: true },
                    { localeKey: 'bajram_namaz_dzematski_1' },
                    { localeKey: 'bajram_namaz_dzematski_2' },
                    { localeKey: 'bajram_namaz_dzematski_3' },
                    { localeKey: 'bajram_namaz_dzematski_4' },
                    { localeKey: 'pocetak_bajram_namaza' },
                ],
                beginningOfRekah: 1,
                audio: [],
                images: [slikaNijjet],
            },
            {
                title: 'pocetni_tekbir_title',
                data: [
                    { localeKey: 'slijedeci_imama_ponavljamo_za_njim' },
                    {
                        card: true,
                        title: 'allahu_ekber',
                        arabic: [
                            { localeKey: 'allahu_ekber_wxyz', bold: true },
                        ],
                        translation: [
                            { localeKey: 'allahu_ekber_tr', bold: true },
                        ],
                        audio: allahuEkber,
                    },
                ],
                audio: [{ id: 1, audio: allahuEkber }],
                images: [slikaDizanjeRuku],
            },
            {
                title: 'ucenje_pocetne_dove',
                data: [
                    {
                        localeKey: 'uci_svako_za_sebe_tiho',
                        bold: true,
                    },
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
                    },
                ],
                audio: [],
                images: [slikaStajanje],
            },
            {
                title: 'bajram_namaz_dodatni_takbiri_prvi_rekat_title',
                data: [
                    { localeKey: 'bajram_namaz_sedam_dodatnih_takbira' },
                    {
                        note: true,
                        localeKey: 'bajram_namaz_takbiri_posle_subhaneke', // <-- Dodata napomena
                    },
                    { localeKey: 'bajram_namaz_takbir_objasnjenje' },
                    {
                        card: true,
                        title: 'allahu_ekber_sedam_puta',
                        arabic: [
                            { localeKey: 'allahu_ekber_wxyz', bold: true },
                        ],
                        translation: [
                            { localeKey: 'allahu_ekber_tr', bold: true },
                        ],
                        audio: allahuEkber,
                    },
                ],
                audio: [],
                images: [slikaDizanjeRuku, slikaStajanje],
            },
            {
                title: 'ucenje_sure_elfatiha',
                data: [
                    { localeKey: 'uci_imam_mi_slusamo', bold: true },
                    { localeKey: 'euza_bismilla_fatiha' },
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
                        ],
                    },
                ],
                audio: [],
                images: [slikaStajanje],
            },
            {
                title: 'ucenje_sure_iz_kurana',
                data: [
                    { localeKey: 'uci_imam_mi_slusamo', bold: true },
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
            {
                title: 'odlazak_na_rukuu',
                data: [
                    {
                        localeKey: 'slijedimo_imama',
                        bold: true,
                    },
                    {
                        localeKey: 'sunnet_dizanje_ruku_1',
                        zikr: 'allahu_ekber_wxyz',
                        zikrTr: 'allahu_ekber_tr',
                    },
                ],
                images: [slikaRukuu],
                audio: [{ id: 1, audio: allahuEkber }],
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
                        localeKey: 'uci_svako_za_sebe_tiho',
                        bold: true,
                    },
                    {
                        localeKey: 'na_rukuu',
                    },
                    {
                        card: true,
                        title: 'ruku',
                        arabic: [
                            {
                                localeKey: 'subhane_rabijel_azim_wxyz',
                                bold: true,
                            },
                        ],
                        translation: [{ localeKey: 'subhane_rabijel_azim_tr' }],
                        audio: subhaneRabijelAzimAudio,
                    },
                ],
                images: [slikaRukuu],
                audio: [],
            },
            {
                title: 'vracanje_sa_rukua',
                data: [
                    {
                        localeKey: 'slijedimo_imama',
                        bold: true,
                    },
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
                        arabic: [
                            {
                                localeKey: 'rabbena_lekel_hamd_wxyz',
                                bold: true,
                            },
                        ],
                        translation: [{ localeKey: 'rabbena_lekel_hamd_tr' }],
                        audio: rabbenavelekelhamdAudio,
                    },
                ],
                images: [slikaStajanjeNakonRukua],
                audio: [],
            },
            {
                title: 'padanje_na_sedzdu_title',
                data: [
                    {
                        localeKey: 'slijedimo_imama',
                        bold: true,
                    },
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
            },
            {
                title: 'zikr_na_sedzdi',
                data: [
                    {
                        localeKey: 'uci_svako_za_sebe_tiho',
                        bold: true,
                    },
                    {
                        localeKey: 'na_sedzdi',
                    },
                    {
                        card: true,
                        title: 'sedzda',
                        arabic: [
                            {
                                localeKey: 'subhane_rabijel_eala_wxyz',
                                bold: true,
                            },
                        ],
                        translation: [{ localeKey: 'subhane_rabijel_eala_tr' }],
                        audio: subhaneRabijelEalaAudio,
                    },
                ],
                images: [slikaSedzde],
                audio: [],
            },
            {
                title: 'ustajanje_sa_sedzde_i_sjedenje',
                data: [
                    {
                        localeKey: 'slijedimo_imama',
                        bold: true,
                    },
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
            },
            {
                title: 'ponovni_odlazak_na_sedzdu_title',
                data: [
                    {
                        localeKey: 'slijedimo_imama',
                        bold: true,
                    },
                    {
                        localeKey: 'ponovni_odlazak_na_sedzdu',
                        zikr: 'allahu_ekber_wxyz',
                        zikrTr: 'allahu_ekber_tr',
                    },
                    {
                        localeKey: 'uci_svako_za_sebe_tiho',
                        bold: true,
                    },
                    {
                        card: true,
                        title: 'subhane_rabijel_eala',
                        arabic: [
                            {
                                localeKey: 'subhane_rabijel_eala_wxyz',
                                bold: true,
                            },
                        ],
                        translation: [{ localeKey: 'subhane_rabijel_eala_tr' }],
                        audio: subhaneRabijelEalaAudio,
                    },
                ],
                images: [slikaSedzde],
                audio: [],
            },
            {
                title: 'ustajanje_na_sljedeci_rekat',
                data: [
                    {
                        localeKey: 'slijedimo_imama',
                        bold: true,
                    },
                    {
                        localeKey: 'poslije_druge_sedzde',
                        zikr: 'allahu_ekber_wxyz',
                        zikrTr: 'allahu_ekber_tr',
                    },
                ],
                images: [slikaStajanje],
                audio: [{ id: 1, audio: allahuEkber }],
            },
            {
                title: 'ucenje_sure_elfatiha',
                data: [
                    {
                        localeKey: 'uci_imam_mi_slusamo',
                        bold: true,
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
                beginningOfRekah: 2,
            },
            {
                title: 'ucenje_sure_iz_kurana',
                data: [
                    {
                        localeKey: 'uci_imam_mi_slusamo',
                        bold: true,
                    },
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
            {
                title: 'bajram_namaz_dodatni_takbiri_drugi_rekat_title',
                data: [
                    {
                        localeKey: 'slijedimo_imama',
                        bold: true,
                    },
                    { localeKey: 'bajram_namaz_pet_dodatnih_takbira' },
                    {
                        card: true,
                        title: 'allahu_ekber_pet_puta',
                        arabic: [
                            { localeKey: 'allahu_ekber_wxyz', bold: true },
                        ],
                        translation: [
                            { localeKey: 'allahu_ekber_tr', bold: true },
                        ],
                        audio: allahuEkber,
                    },
                ],
                audio: [],
                images: [slikaDizanjeRuku, slikaStajanje],
            },
            {
                title: 'odlazak_na_rukuu',
                data: [
                    {
                        localeKey: 'slijedimo_imama',
                        bold: true,
                    },
                    {
                        localeKey: 'sunnet_dizanje_ruku_1',
                        zikr: 'allahu_ekber_wxyz',
                        zikrTr: 'allahu_ekber_tr',
                    },
                ],
                images: [slikaRukuu],
                audio: [{ id: 1, audio: allahuEkber }],
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
                        localeKey: 'uci_svako_za_sebe_tiho',
                        bold: true,
                    },
                    {
                        localeKey: 'na_rukuu',
                    },
                    {
                        card: true,
                        title: 'ruku',
                        arabic: [
                            {
                                localeKey: 'subhane_rabijel_azim_wxyz',
                                bold: true,
                            },
                        ],
                        translation: [{ localeKey: 'subhane_rabijel_azim_tr' }],
                        audio: subhaneRabijelAzimAudio,
                    },
                ],
                images: [slikaRukuu],
                audio: [],
            },
            {
                title: 'vracanje_sa_rukua',
                data: [
                    {
                        localeKey: 'slijedimo_imama',
                        bold: true,
                    },
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
                        arabic: [
                            {
                                localeKey: 'rabbena_lekel_hamd_wxyz',
                                bold: true,
                            },
                        ],
                        translation: [{ localeKey: 'rabbena_lekel_hamd_tr' }],
                        audio: rabbenavelekelhamdAudio,
                    },
                ],
                images: [slikaStajanjeNakonRukua],
                audio: [],
            },
            {
                title: 'padanje_na_sedzdu_title',
                data: [
                    {
                        localeKey: 'slijedimo_imama',
                        bold: true,
                    },
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
            },
            {
                title: 'zikr_na_sedzdi',
                data: [
                    {
                        localeKey: 'uci_svako_za_sebe_tiho',
                        bold: true,
                    },
                    {
                        localeKey: 'na_sedzdi',
                    },
                    {
                        card: true,
                        title: 'sedzda',
                        arabic: [
                            {
                                localeKey: 'subhane_rabijel_eala_wxyz',
                                bold: true,
                            },
                        ],
                        translation: [{ localeKey: 'subhane_rabijel_eala_tr' }],
                        audio: subhaneRabijelEalaAudio,
                    },
                ],
                images: [slikaSedzde],
                audio: [],
            },
            {
                title: 'ustajanje_sa_sedzde_i_sjedenje',
                data: [
                    {
                        localeKey: 'slijedimo_imama',
                        bold: true,
                    },
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
            },
            {
                title: 'ponovni_odlazak_na_sedzdu_title',
                data: [
                    {
                        localeKey: 'slijedimo_imama',
                        bold: true,
                    },
                    {
                        localeKey: 'ponovni_odlazak_na_sedzdu',
                        zikr: 'allahu_ekber_wxyz',
                        zikrTr: 'allahu_ekber_tr',
                    },
                    {
                        localeKey: 'uci_svako_za_sebe_tiho',
                        bold: true,
                    },
                    {
                        card: true,
                        title: 'subhane_rabijel_eala',
                        arabic: [
                            {
                                localeKey: 'subhane_rabijel_eala_wxyz',
                                bold: true,
                            },
                        ],
                        translation: [{ localeKey: 'subhane_rabijel_eala_tr' }],
                        audio: subhaneRabijelEalaAudio,
                    },
                ],
                images: [slikaSedzde],
                audio: [],
            },
            {
                title: 'tesehud_title',
                data: [
                    {
                        localeKey: 'uci_svako_za_sebe_tiho',
                        bold: true,
                    },
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
            {
                title: 'ucenje_salavata_i_dove',
                data: [
                    {
                        localeKey: 'uci_svako_za_sebe_tiho',
                        bold: true,
                    },
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
                    {
                        localeKey: 'slijedimo_imama',
                        bold: true,
                    },
                    { localeKey: 'predavanje_selama' },
                    {
                        card: true,
                        title: 'selam',
                        arabic: [
                            {
                                localeKey:
                                    'esselamu_alejkum_ve_rahmetullah_wxyz',
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
            {
                title: 'bajram_namaz_posle_namaza_title',
                data: [
                    { localeKey: 'bajram_namaz_hutba_posle' },
                    {
                        note: true,
                        localeKey: 'bajram_namaz_hutba_nakon_klanjanja', // NOVO
                    },
                    { localeKey: 'bajram_namaz_hutba_sunnet' },
                    { localeKey: 'bajram_namaz_hutba_cutanje' },
                    { localeKey: 'bajram_namaz_cestitanje_posle' },
                    { localeKey: 'bajram_namaz_cestitke_primjeri' },
                ],
                audio: [],
                images: [minberAudio],
            },
        ],
    },
];

export const dzenazaNamaz = [
    {
        num: 1,
        steps: [
            {
                title: 'dzenaza_namaz_prije_pocetka_title',
                data: [
                    { localeKey: 'dzenaza_namaz_prije_pocetka_1' },
                    { localeKey: 'dzenaza_namaz_prije_pocetka_2' },
                    { localeKey: 'dzenaza_namaz_prije_pocetka_3' },
                    { localeKey: 'dzenaza_namaz_prije_pocetka_4' },
                    { localeKey: 'dzenaza_namaz_prije_pocetka_5' },
                    { localeKey: 'dzenaza_namaz_prije_pocetka_7' },
                    { localeKey: 'dzenaza_namaz_prije_pocetka_8' },
                    { localeKey: 'dzenaza_namaz_prije_pocetka_9' },
                    { localeKey: 'dzenaza_namaz_prije_pocetka_10' },
                ],
                audio: [],
                images: [dzenaza1],
            },
            {
                title: 'dzenaza_namaz_prvi_tekbir_title',
                data: [
                    { localeKey: 'dzenaza_namaz_prvi_tekbir' },
                    {
                        card: true,
                        title: 'allahu_ekber',
                        arabic: [
                            { localeKey: 'allahu_ekber_wxyz', bold: true },
                        ],
                        translation: [
                            { localeKey: 'allahu_ekber_tr', bold: true },
                        ],
                        audio: allahuEkber,
                    },
                ],
                audio: [],
                images: [dzenaza2],
            },
            {
                title: 'dzenaza_namaz_pocetna_dova',
                data: [
                    { localeKey: 'dzenaza_namaz_pocetna_dova_1' },
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
                audio: [],
                images: [dzenaza3],
            },
            {
                title: 'dzenaza_namaz_drugi_tekbir_title',
                data: [
                    { localeKey: 'dzenaza_namaz_prvi_tekbir' },
                    {
                        card: true,
                        title: 'allahu_ekber',
                        arabic: [
                            { localeKey: 'allahu_ekber_wxyz', bold: true },
                        ],
                        translation: [
                            { localeKey: 'allahu_ekber_tr', bold: true },
                        ],
                        audio: allahuEkber,
                    },
                ],
                audio: [],
                images: [dzenaza2],
            },
            {
                title: 'dzenaza_namaz_drugi_tekbir',
                data: [
                    { localeKey: 'dzenaza_namaz_drugi_tekbir_1' },
                    {
                        card: true,
                        title: 'salavati',
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
                audio: [],
                images: [dzenaza3],
            },
            {
                title: 'dzenaza_namaz_treci_tekbir_title',
                data: [
                    { localeKey: 'dzenaza_namaz_prvi_tekbir' },
                    {
                        card: true,
                        title: 'allahu_ekber',
                        arabic: [
                            { localeKey: 'allahu_ekber_wxyz', bold: true },
                        ],
                        translation: [
                            { localeKey: 'allahu_ekber_tr', bold: true },
                        ],
                        audio: allahuEkber,
                    },
                ],
                audio: [],
                images: [dzenaza2],
            },
            {
                title: 'dzenaza_namaz_treci_tekbir',
                data: [
                    { localeKey: 'dzenaza_namaz_treci_tekbir_1' },
                    {
                        card: true,
                        title: 'dzenaza_namaz_dova_za_pokojnika',
                        arabic: [
                            {
                                localeKey:
                                    'dzenaza_namaz_dova_za_pokojnika_wxyz',
                                bold: true,
                            },
                        ],
                        translation: [
                            { localeKey: 'dzenaza_namaz_dova_za_pokojnika_tr' },
                        ],
                    },
                ],
                audio: [],
                images: [dzenaza3],
            },
            {
                title: 'dzenaza_namaz_cetvrti_tekbir_title',
                data: [
                    { localeKey: 'dzenaza_namaz_prvi_tekbir' },
                    {
                        card: true,
                        title: 'allahu_ekber',
                        arabic: [
                            { localeKey: 'allahu_ekber_wxyz', bold: true },
                        ],
                        translation: [
                            { localeKey: 'allahu_ekber_tr', bold: true },
                        ],
                        audio: allahuEkber,
                    },
                ],
                audio: [],
                images: [dzenaza2],
            },
            {
                title: 'dzenaza_namaz_cetvrti_tekbir_selam_title',
                data: [
                    { localeKey: 'dzenaza_namaz_cetvrti_tekbir_1' },
                    {
                        card: true,
                        title: 'esselamu_alejkum_ve_rahmetullah',
                        arabic: [
                            {
                                localeKey:
                                    'esselamu_alejkum_ve_rahmetullah_wxyz',
                                bold: true,
                            },
                        ],
                        translation: [
                            { localeKey: 'esselamu_alejkum_ve_rahmetullah_tr' },
                        ],
                        audio: esselamualejkumverahmetullahAudio,
                    },
                    {
                        localeKey: 'dzenaza_predaja_selama_note',
                    },
                ],
                audio: [],
                images: [dzenaza4],
            },
        ],
    },
];

const istiharaNamaz = [
    {
        num: 2,
        steps: [
            {
                title: 'istihara_namaz_obavijest_title_1',
                data: [
                    { localeKey: 'istihara_namaz_detaljno_objasnjenje_1' },
                    { localeKey: 'istihara_namaz_detaljno_objasnjenje_2' },
                    { localeKey: 'istihara_namaz_detaljno_objasnjenje_3' },
                    { localeKey: 'istihara_namaz_detaljno_objasnjenje_4' },
                ],
                audio: [],
                images: [duaImg],
            },
            {
                title: 'istihara_namaz_obavijest_title_2',
                data: [
                    { localeKey: 'istihara_namaz_obavijest_1' },
                    { localeKey: 'istihara_namaz_obavijest_2' },
                    { localeKey: 'istihara_namaz_obavijest_3' },
                    { localeKey: 'istihara_namaz_obavijest_4' },
                    {
                        card: true,
                        title: 'istihara_dova',
                        arabic: [
                            { localeKey: 'istihara_dova_wxyz', bold: true },
                        ],
                        translation: [{ localeKey: 'istihara_dova_tr' }],
                    },
                ],
                audio: [],
                images: [duaImg],
            },
        ],
    },
];

const duhaNamaz = [
    {
        num: 2,
        steps: [
            {
                title: 'pocetak_namaza_title',
                data: [{ localeKey: 'pocetak_namaza' }],
                beginningOfRekah: 1,
                audio: [],
                images: [],
            },
            {
                title: 'pocetni_tekbir_title',
                data: [
                    { localeKey: 'pocetni_tekbir' },
                    {
                        card: true,
                        title: 'allahu_ekber',
                        arabic: [
                            { localeKey: 'allahu_ekber_wxyz', bold: true },
                        ],
                        translation: [
                            { localeKey: 'allahu_ekber_tr', bold: true },
                        ],
                    },
                ],
                audio: [],
                images: [],
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
                    },
                ],
                audio: [],
                images: [],
            },
            {
                title: 'ucenje_sure_elfatiha',
                data: [
                    { localeKey: 'euza_bismilla_fatiha' },
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
                        ],
                    },
                ],
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
                    },
                ],
                audio: [],
                images: [],
            },
            ...rukuuISedzda,
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
                        ],
                    },
                ],
                beginningOfRekah: 2,
                audio: [],
                images: [],
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
                    },
                ],
                audio: [],
                images: [],
            },
            ...rukuuISedzda,
            ...tesehud,
            {
                title: 'ucenje_salavata',
                data: [
                    {
                        card: true,
                        title: 'salavati',
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
                    },
                ],
                audio: [],
                images: [],
            },
            ...predavanjeSelama,
        ],
    },
];

export const nonMandatoryNamaz = {
    bajram: {
        title: 'bajram_namaz_title',
        description: 'bajram_namaz_description',
        rekati: 2,
        steps: bajramNamaz[0].steps,
        stepDetails: {
            step1: {
                title: 'bajram_namaz_step_1_title',
                description: 'bajram_namaz_step_1_description',
            },
            step2: {
                title: 'bajram_namaz_step_2_title',
                description: 'bajram_namaz_step_2_description',
            },
        },
    },
    dzenaza: {
        title: 'dzenaza_namaz_title',
        description: 'dzenaza_namaz_description',
        rekati: 1,
        steps: dzenazaNamaz[0].steps,
        stepDetails: {
            step1: {
                title: 'dzenaza_namaz_step_1_title',
                description: 'dzenaza_namaz_step_1_description',
            },
            step2: {
                title: 'dzenaza_namaz_step_2_title',
                description: 'dzenaza_namaz_step_2_description',
            },
            step3: {
                title: 'dzenaza_namaz_step_3_title',
                description: 'dzenaza_namaz_step_3_description',
            },
            step4: {
                title: 'dzenaza_namaz_step_4_title',
                description: 'dzenaza_namaz_step_4_description',
            },
        },
    },
    istihara: {
        title: 'istihara_namaz_title',
        description: 'istihara_namaz_description',
        rekati: 2,
        steps: istiharaNamaz[0].steps,
    },
};

export const getNonMandatoryNamazData = (prayerType: string) => {
    return nonMandatoryNamaz[prayerType];
};
