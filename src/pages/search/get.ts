import axios from 'axios';
import { vacancyApi } from '../../services/services';

export const get = async () => {
  // const res = await vacancyApi.getVacancies({ payment_from: 50000 });
  const res = await vacancyApi.getCatalogues();
  console.log(res);
};
