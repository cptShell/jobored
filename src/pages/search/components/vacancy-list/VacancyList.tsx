import { FC, useState } from 'react';
import { Pagination } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { VacancyItem } from '../components';
import { Vacancy } from '../../../../common/types/types';

type Props = {
  items: Array<Vacancy>;
};

export const VacancyList: FC<Props> = ({ items }) => {
  const matchesTablet = useMediaQuery('(max-width: 800px)');
  const [activePage, setPage] = useState(1);
  const vacanciesPerPage = 4;
  const startIndex = (activePage - 1) * vacanciesPerPage;
  const endIndex = Math.min(startIndex + vacanciesPerPage, items.length);
  const onPageVacancies = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / vacanciesPerPage);

  return (
    <>
      {...onPageVacancies.map((data) => {
        return <VacancyItem isFull={false} data={data} />;
      })}
      <Pagination
        mt={`${matchesTablet ? 0.3 : 1.5}em`}
        total={totalPages}
        onChange={setPage}
        defaultValue={activePage}
      />
    </>
  );
};
