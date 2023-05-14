import { Catalogue } from '../types/catalogue';
import { Filter } from '../types/types';

export const authParams = {
  login: 'sergei.stralenia@gmail.com',
  password: 'paralect123',
  client_id: '2356',
  client_secret:
    'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
  hr: '0',
};

export const secretKey = 'GEU4nvd3rej*jeh.eqp';
export const xAppId = authParams.client_secret;
export const apiPrefix = 'https://startup-summer-2023-proxy.onrender.com/2.0/';
export const initialFilter: Filter = {
  payment_from: 30000,
  payment_to: 70000,
  catalogues: Infinity,
};
export const catalogues: Array<Catalogue> = [
  {
    title_rus: 'IT, Интернет, связь, телеком',
    title_trimmed: 'IT, Интернет, связь,...',
    key: 33,
  },
  {
    title_rus: 'Административная работа, секретариат, АХО',
    title_trimmed: 'Административная работа,...',
    key: 1,
  },
  {
    title_rus: 'Банки, инвестиции, лизинг',
    title_trimmed: 'Банки, инвестиции, лизинг',
    key: 381,
  },
  {
    title_rus: 'Безопасность, службы охраны',
    title_trimmed: 'Безопасность, службы...',
    key: 182,
  },
  {
    title_rus: 'Бухгалтерия, финансы, аудит',
    title_trimmed: 'Бухгалтерия, финансы,...',
    key: 11,
  },
  {
    title_rus: 'Государственная служба',
    title_trimmed: 'Государственная служба',
    key: 151,
  },
  {
    title_rus: 'Дизайн',
    title_trimmed: 'Дизайн',
    key: 62,
  },
  {
    title_rus: 'Домашний персонал',
    title_trimmed: 'Домашний персонал',
    key: 471,
  },
  {
    title_rus: 'Закупки, снабжение',
    title_trimmed: 'Закупки, снабжение',
    key: 512,
  },
  {
    title_rus: 'Искусство, культура, развлечения',
    title_trimmed: 'Искусство, культура,...',
    key: 205,
  },
  {
    title_rus: 'Кадры, управление персоналом',
    title_trimmed: 'Кадры, управление...',
    key: 76,
  },
  {
    title_rus: 'Консалтинг, стратегическое развитие',
    title_trimmed: 'Консалтинг,...',
    key: 426,
  },
  {
    title_rus: 'Маркетинг, реклама, PR',
    title_trimmed: 'Маркетинг, реклама, PR',
    key: 234,
  },
  {
    title_rus: 'Медицина, фармацевтика, ветеринария',
    title_trimmed: 'Медицина, фармацевтика,...',
    key: 136,
  },
  {
    title_rus: 'Наука, образование, повышение квалификации',
    title_trimmed: 'Наука, образование,...',
    key: 270,
  },
  {
    title_rus: 'Некоммерческие организации, волонтерство',
    title_trimmed: 'Некоммерческие...',
    key: 175,
  },
  {
    title_rus: 'Обмен персоналом',
    title_trimmed: 'Обмен персоналом',
    key: 625,
  },
  {
    title_rus: 'Продажи',
    title_trimmed: 'Продажи',
    key: 438,
  },
  {
    title_rus: 'Промышленность, производство',
    title_trimmed: 'Промышленность,...',
    key: 327,
  },
  {
    title_rus: 'Рабочий персонал',
    title_trimmed: 'Рабочий персонал',
    key: 505,
  },
  {
    title_rus: 'Сельское хозяйство',
    title_trimmed: 'Сельское хозяйство',
    key: 548,
  },
  {
    title_rus: 'Службы доставки',
    title_trimmed: 'Службы доставки',
    key: 622,
  },
  {
    title_rus: 'СМИ, издательства',
    title_trimmed: 'СМИ, издательства',
    key: 222,
  },
  {
    title_rus: 'Спорт, фитнес, салоны красоты, SPA',
    title_trimmed: 'Спорт, фитнес, салоны...',
    key: 260,
  },
  {
    title_rus: 'Страхование',
    title_trimmed: 'Страхование',
    key: 284,
  },
  {
    title_rus: 'Строительство, проектирование, недвижимость',
    title_trimmed: 'Строительство,...',
    key: 306,
  },
  {
    title_rus: 'Сырье',
    title_trimmed: 'Сырье',
    key: 414,
  },
  {
    title_rus: 'Топ-персонал',
    title_trimmed: 'Топ-персонал',
    key: 478,
  },
  {
    title_rus: 'Транспорт, логистика, ВЭД',
    title_trimmed: 'Транспорт, логистика, ВЭД',
    key: 86,
  },
  {
    title_rus: 'Туризм, гостиницы, общественное питание',
    title_trimmed: 'Туризм, гостиницы,...',
    key: 197,
  },
  {
    title_rus: 'Услуги, ремонт, сервисное обслуживание',
    title_trimmed: 'Услуги, ремонт,...',
    key: 362,
  },
  {
    title_rus: 'Юриспруденция',
    title_trimmed: 'Юриспруденция',
    key: 100,
  },
];
