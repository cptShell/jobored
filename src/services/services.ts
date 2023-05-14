import { apiPrefix } from '../common/constants/constants';
import { Storage } from './storage';
import { VacancyApi } from './vacancy';

export const storage = new Storage({ storage: localStorage });
export const vacancyApi = new VacancyApi(apiPrefix);
