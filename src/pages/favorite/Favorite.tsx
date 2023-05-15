import { FC, useEffect, useState } from 'react';
import { Container, Flex, Loader } from '@mantine/core';
import { useAppSelector } from '../../store/hook';
import { VacancyList } from '../search/components/components';
import { NothingPlaceholder } from '../../components/components';
import { Vacancy } from '../../common/types/types';
import { storage, vacancyApi } from '../../services/services';
import { StorageKey } from '../../common/enums/enums';
import { useMediaQuery } from '@mantine/hooks';

export const FavoritePage: FC = () => {
  const matchesMobile = useMediaQuery('(max-width: 420px)');
  const matchesTablet = useMediaQuery('(max-width: 800px)');
  const { favorites } = useAppSelector((state) => state.favorites);
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const loadFavors = async () => {
      setLoading(true);
      const storageData = storage.getItem(StorageKey.FAVORITES);
      if (!storageData) {
        storage.setItem(StorageKey.FAVORITES, JSON.stringify([]));
        loadFavors();
        return;
      }

      const ids = JSON.parse(storageData) as Array<number>;

      if (!ids.length) {
        setLoading(false);
        setVacancies([]);
        return;
      }

      const { data } = await vacancyApi.getVacancies({ ids });

      setVacancies(data || []);
      setLoading(false);
    };
    loadFavors();
  }, [favorites]);

  return (
    <Container
      p={matchesMobile ? 10 : matchesTablet ? 20 : 40}
      m={0}
      w={'100%'}
      maw={'100%'}
    >
      <Flex direction={'column'} align={'center'} gap={matchesTablet ? 8 : 16}>
        {isLoading ? (
          <Flex justify={'center'} direction={'column'} mt={200} h={'100%'}>
            <Loader size="120" />
          </Flex>
        ) : !favorites.length ? (
          <NothingPlaceholder
            message="Упс, здесь еще ничего нет!"
            withRedirect={true}
          />
        ) : (
          <VacancyList items={vacancies} />
        )}
      </Flex>
    </Container>
  );
};
