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

const salavatiShafiAudio = require('./audio/salavati-shafi.mp3');
const rukuShafiAudio = require('./audio/subhane-rabijel-azim-ve-bi-hamdihi.mp3');
const sedzdaShafiAudio = require('./audio/subhane-rabijel-eala-ve-bi-hamdihi.mp3');
const allahuEkberuKebiraAudio = require('./audio/allahu-ekberu-kebira.mp3');
const ettehijjatuShafiAudio = require('./audio/ettehijjatu-shafi.mp3');
const zikrIzmedjuSedzdiShafiAudio = require('./audio/izmedju-dvije-sedzde-shafi.mp3');
const nakonRukuaShafiAudio = require('./audio/nakon-povratka-sa-rukua-shafi.mp3');

export const audios = [
    {
        title: 'ucenje_pocetne_dove',
        text: [
            { localeKey: 'subhaneke_1_wxyz' },
            { localeKey: 'subhaneke_2_wxyz' },
            { localeKey: 'subhaneke_3_wxyz' },
            { localeKey: 'subhaneke_4_wxyz' },
        ],
        audio: subhanekeAudio,
    },
    {
        title: 'ucenje_sure_elfatiha',
        text: [{ localeKey: 'euza_wxyz' }],
        audio: euzaAudio,
    },
    {
        title: 'ucenje_sure_elfatiha',
        text: [
            { localeKey: 'bismillah_wxyz' },
            { localeKey: 'fatiha_1_wxyz' },
            { localeKey: 'fatiha_2_wxyz' },
            { localeKey: 'fatiha_3_wxyz' },
            { localeKey: 'fatiha_4_wxyz' },
            { localeKey: 'fatiha_5_wxyz' },
            { localeKey: 'fatiha_6_wxyz' },
            { localeKey: 'fatiha_7_wxyz' },
        ],
        audio: fatihaAudio,
    },
    {
        title: 'ucenje_sure_iz_kurana',
        text: [
            { localeKey: 'ihlas_1_wxyz' },
            { localeKey: 'ihlas_2_wxyz' },
            { localeKey: 'ihlas_3_wxyz' },
            { localeKey: 'ihlas_4_wxyz' },
        ],
        audio: ihlasAudio,
    },
    {
        title: 'ucenje_sure_iz_kurana',
        text: [
            { localeKey: 'kevser_1_wxyz' },
            { localeKey: 'kevser_2_wxyz' },
            { localeKey: 'kevser_3_wxyz' },
        ],
        audio: kevserAudio,
    },
    {
        title: 'tesehud_title',
        text: [
            { localeKey: 'ettehijjatu_1_wxyz' },
            { localeKey: 'ettehijjatu_2_wxyz' },
            { localeKey: 'ettehijjatu_3_wxyz' },
            { localeKey: 'ettehijjatu_4_wxyz' },
            { localeKey: 'ettehijjatu_5_wxyz' },
        ],
        audio: ettehijjatuAudio,
    },
    {
        title: 'ucenje_salavata_i_dove',
        text: [
            { localeKey: 'salavati_1_wxyz' },
            { localeKey: 'salavati_2_wxyz' },
            { localeKey: 'salavati_3_wxyz' },
            { localeKey: 'salavati_4_wxyz' },
        ],
        audio: salavatiAudio,
    },
    {
        title: 'zikr_na_rukuu',
        text: [{ localeKey: 'subhane_rabijel_azim_wxyz' }],
        audio: subhaneRabijelAzimAudio,
    },
    {
        title: 'vracanje_sa_rukua',
        text: [{ localeKey: 'semiallahu_limen_hamideh_wxyz' }],
        audio: semiallahulimenhamidehAudio,
    },
    {
        title: 'vracanje_sa_rukua',
        text: [{ localeKey: 'rabbena_lekel_hamd_wxyz' }],
        audio: rabbenavelekelhamdAudio,
    },
    {
        title: 'zikr_na_sedzdi',
        text: [{ localeKey: 'subhane_rabijel_eala_wxyz' }],
        audio: subhaneRabijelEalaAudio,
    },
    {
        title: 'ustajanje_sa_sedzde_i_sjedenje',
        text: [{ localeKey: 'rabigfirli_wxyz' }],
        audio: rabbigfirliAudio,
    },
    {
        title: 'predavanje_selama_title',
        text: [{ localeKey: 'esselamu_alejkum_ve_rahmetullah_wxyz' }],
        audio: esselamualejkumverahmetullahAudio,
    },
];

export const audiosShafi = [
    {
        title: 'ucenje_pocetne_dove',
        text: [{ localeKey: 'pocetna_dova_1_wxyz' }],
        audio: allahuEkberuKebiraAudio,
    },
    {
        title: 'ucenje_sure_elfatiha',
        text: [{ localeKey: 'euza_wxyz' }],
        audio: euzaAudio,
    },
    {
        title: 'ucenje_sure_elfatiha',
        text: [
            { localeKey: 'bismillah_wxyz' },
            { localeKey: 'fatiha_1_wxyz' },
            { localeKey: 'fatiha_2_wxyz' },
            { localeKey: 'fatiha_3_wxyz' },
            { localeKey: 'fatiha_4_wxyz' },
            { localeKey: 'fatiha_5_wxyz' },
            { localeKey: 'fatiha_6_wxyz' },
            { localeKey: 'fatiha_7_wxyz' },
        ],
        audio: fatihaAudio,
    },
    {
        title: 'ucenje_sure_iz_kurana',
        text: [
            { localeKey: 'ihlas_1_wxyz' },
            { localeKey: 'ihlas_2_wxyz' },
            { localeKey: 'ihlas_3_wxyz' },
            { localeKey: 'ihlas_4_wxyz' },
        ],
        audio: ihlasAudio,
    },
    {
        title: 'ucenje_sure_iz_kurana',
        text: [
            { localeKey: 'kevser_1_wxyz' },
            { localeKey: 'kevser_2_wxyz' },
            { localeKey: 'kevser_3_wxyz' },
        ],
        audio: kevserAudio,
    },
    {
        title: 'tesehud_title',
        text: [
            { localeKey: 'ettehijjatu_1_wxyz' },
            { localeKey: 'ettehijjatu_2_wxyz' },
            { localeKey: 'ettehijjatu_3_wxyz' },
            { localeKey: 'ettehijjatu_4_wxyz' },
            { localeKey: 'ettehijjatu_5_wxyz' },
        ],
        audio: ettehijjatuShafiAudio,
    },
    {
        title: 'ucenje_salavata_i_dove',
        text: [
            { localeKey: 'salavati_1_wxyz' },
            { localeKey: 'salavati_2_wxyz' },
            { localeKey: 'salavati_3_wxyz' },
            { localeKey: 'salavati_4_wxyz' },
        ],
        audio: salavatiShafiAudio,
    },
    {
        title: 'zikr_na_rukuu',
        text: [{ localeKey: 'subhane_rabijel_azim_wxyz' }],
        audio: rukuShafiAudio,
    },
    {
        title: 'vracanje_sa_rukua',
        text: [{ localeKey: 'semiallahu_limen_hamideh_wxyz' }],
        audio: semiallahulimenhamidehAudio,
    },
    {
        title: 'vracanje_sa_rukua',
        text: [{ localeKey: 'rabbena_lekel_hamd_wxyz' }],
        audio: nakonRukuaShafiAudio,
    },
    {
        title: 'zikr_na_sedzdi',
        text: [{ localeKey: 'subhane_rabijel_eala_wxyz' }],
        audio: sedzdaShafiAudio,
    },
    {
        title: 'ustajanje_sa_sedzde_i_sjedenje',
        text: [{ localeKey: 'rabigfirli_wxyz' }],
        audio: zikrIzmedjuSedzdiShafiAudio,
    },
    {
        title: 'predavanje_selama_title',
        text: [{ localeKey: 'esselamu_alejkum_ve_rahmetullah_wxyz' }],
        audio: esselamualejkumverahmetullahAudio,
    },
];

export const getAudios = (lang) => {
    if (lang === 'id') {
        return audiosShafi;
    } else {
        return audios;
    }
};
