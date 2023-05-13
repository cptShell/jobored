export const vacancies = new Array(50).fill(null).map((_, index) => ({
  id: String(index),
  profession: 'Мастер по металлу ' + index,
  firmName: 'Мастерская по металлу',
  town: 'Minsk',
  workType: 'Полный рабочий день',
  paymentFrom: '',
  paymentTo: '',
  currency: String(Math.round(Math.random() * 100000)),
}));
