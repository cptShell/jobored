import { FC, useState } from 'react';
import { Pagination } from '@mantine/core';
import { VacancyItem } from '../components';
import { Vacancy } from '../../../../common/types/types';

type Props = {
  items: Array<Vacancy>;
};

export const VacancyList: FC<Props> = ({ items }) => {
  const [activePage, setPage] = useState(1);
  const vacanciesPerPage = 4;
  const startIndex = (activePage - 1) * vacanciesPerPage;
  const endIndex = Math.min(startIndex + vacanciesPerPage, items.length);
  const onPageVacancies = items.slice(startIndex, endIndex);
  const totalPages = Math.floor(items.length / vacanciesPerPage);

  return (
    <>
      {...onPageVacancies.map((data) => {
        return <VacancyItem data={data} />;
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
