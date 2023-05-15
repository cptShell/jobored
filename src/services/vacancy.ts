import axios, { Axios } from 'axios';
import { storage } from './services';
import { StorageKey, VacancyApiPath } from '../common/enums/enums';
import { ApiError, ApiResponse } from '../common/types/api';
import { Catalogue, Vacancy } from '../common/types/types';
import { authParams, secretKey, xAppId } from '../common/constants/constants';
import { GetVacanciesDTO, VacancyRes } from '../common/types/vacancy';

type AuthRes = {
  access_token: string;
  refresh_token: string;
};

type ObjectRes = {
  objects: Array<VacancyRes>;
};

const headers = {
  'x-api-app-id': xAppId,
  'x-secret-key': secretKey,
};

export class VacancyApi {
  #axiosInstance: Axios;

  constructor(apiPrefix: string) {
    this.#axiosInstance = axios.create({
      baseURL: apiPrefix,
    });
  }

  async getCatalogues(): Promise<ApiResponse<Array<Catalogue> | null>> {
    try {
      let token = storage.getItem(StorageKey.TOKEN);

      if (!token) {
        const { data } = await this.#axiosInstance.get<AuthRes>(
          VacancyApiPath.AUTH,
          { headers, params: authParams }
        );
        localStorage.setItem(StorageKey.TOKEN, data.access_token);
        token = data.access_token;
      }

      const { data } = await this.#axiosInstance.get<Array<Catalogue>>(
        VacancyApiPath.CATALOGUES,
        {
          headers: { ...headers, Authorization: `Bearer ${token}` },
        }
      );
      const result = data.map(({ title_rus, title_trimmed, key }) => ({
        title_rus,
        title_trimmed,
        key,
      }));
      return { data: result, message: 'ok' };
    } catch (error) {
      let message: string;

      if (axios.isAxiosError(error)) {
        message = (error.response?.data as ApiError).error;
      } else {
        message = error as string;
      }

      return { data: null, message };
    }
  }

  async getVacancies(
    payload: Partial<GetVacanciesDTO>
  ): Promise<ApiResponse<Array<Vacancy> | null>> {
    try {
      let token = storage.getItem(StorageKey.TOKEN);

      if (!token) {
        const { data } = await this.#axiosInstance.get<AuthRes>(
          VacancyApiPath.AUTH,
          { headers, params: authParams }
        );
        localStorage.setItem(StorageKey.TOKEN, data.access_token);
        token = data.access_token;
      }

      const { data } = await this.#axiosInstance.get<ObjectRes>(
        VacancyApiPath.VACANCIES,
        {
          headers: { ...headers, Authorization: `Bearer ${token}` },
          params: payload,
        }
      );

      const mappedData: Array<Vacancy> = data.objects.map(
        ({
          id,
          profession,
          payment_from,
          payment_to,
          firm_name,
          town,
          currency,
          type_of_work,
          vacancyRichText,
        }) => {
          return {
            id,
            profession,
            paymentTo: payment_to,
            paymentFrom: payment_from,
            firmName: firm_name,
            town: town.title,
            currency,
            workType: type_of_work.title,
            vacancyRichText,
          };
        }
      );

      return { data: mappedData, message: 'ok' };
    } catch (error) {
      let message: string;

      if (axios.isAxiosError(error)) {
        message = (error.response?.data as ApiError).error;
      } else {
        message = error as string;
      }

      return { data: null, message };
    }
  }
}
