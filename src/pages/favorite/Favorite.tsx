import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hook';
import { Vacancy, vacancies as mockVacancies } from '../../common/common';
import { VacancyList } from '../search/components/components';
import { Container, Flex, Loader } from '@mantine/core';

export const FavoritePage: FC = () => {
  const { favorites } = useAppSelector((state) => state.favorites);
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!favorites.length) return;
    setLoading(true);
    setTimeout(() => {
      console.log('loaded');
      const favoriteVacancies = mockVacancies.filter(({ id }) => {
        return favorites.includes(id);
      });
      setLoading(false);
      setVacancies(favoriteVacancies);
    }, 3000);
  }, [favorites]);
  console.log(vacancies);

  return (
    <Container p={40} m={0} w={'100%'} maw={'100%'}>
      <Flex direction={'column'} align={'center'} gap={16}>
        {isLoading ? (
          <Flex justify={'center'} direction={'column'} h={'100%'}>
            <Loader size="120" />
          </Flex>
        ) : !favorites.length ? (
          <div>None</div>
        ) : (
          <VacancyList items={vacancies} />
        )}
      </Flex>
    </Container>
  );
};
