import { FC, useEffect, useState } from 'react';
import { Pagination } from '@mantine/core';
import { VacancyItem } from '../components';

type Vacancy = {
  id: string;
  profession: string;
  firmName: string;
  town: string;
  workType: string;
  paymentTo: string;
  paymentFrom: string;
  currency: string;
};

type Props = {
  items: Array<Vacancy>;
};

export const VacancyList: FC<Props> = ({ items }) => {
  const storageItems =
    (localStorage.getItem('user-favorites') as unknown as Array<string>) || [];
  const [favorites, setFavorites] = useState(new Set(storageItems));
  const [activePage, setPage] = useState(1);
  const vacanciesPerPage = 4;
  const startIndex = activePage * vacanciesPerPage;
  const endIndex = Math.min(startIndex + vacanciesPerPage, items.length);
  const onPageVacancies = items.slice(startIndex, endIndex);
  const totalPages = Math.floor(items.length / vacanciesPerPage);

  return (
    <>
      {...onPageVacancies.map((data) => {
        const { id } = data;
        const newFavorites = new Set(Array.from(favorites));
        const isFavorite = favorites.has(id);
        const handleFavoriteChange = (id: string) => {
          isFavorite ? newFavorites.delete(id) : newFavorites.add(id);
          const filteredFavourites = Array.from(newFavorites);
          localStorage.setItem(
            'user-favorites',
            JSON.stringify(filteredFavourites)
          );
          setFavorites(newFavorites);
        };
        return (
          <VacancyItem
            isFavorite={isFavorite}
            handleChange={() => handleFavoriteChange(id)}
            data={data}
          />
        );
      })}
      <Pagination
        mt={'1.5em'}
        total={totalPages}
        onChange={setPage}
        defaultValue={activePage}
      />
    </>
  );
};
