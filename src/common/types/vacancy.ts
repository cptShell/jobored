export type Vacancy = {
  id: number;
  profession: string;
  firmName: string;
  town: string;
  workType: string;
  paymentTo: number;
  paymentFrom: number;
  currency: string;
};

export type VacancyRes = {
  id: number;
  profession: string;
  firm_name: string;
  town: {
    title: string;
  };
  type_of_work: {
    title: string;
  };
  payment_to: number;
  payment_from: number;
  currency: string;
};

export type GetVacanciesDTO = {
  key: number;
  catalogue: number;
  published: number;
  keyword: string;
  payment_from: number;
  payment_to: number;
  ids: Array<number>;
};
