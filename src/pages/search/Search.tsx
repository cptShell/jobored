import { FC, useState, useEffect } from 'react';
import {
  Button,
  Container,
  createStyles,
  em,
  TextInput,
  Flex,
  Loader,
} from '@mantine/core';
import { Vacancy, vacancies as mockVacancies } from '../../common/common';
import { FilterBar, VacancyList } from './components/components';
import { IconSearch } from '@tabler/icons-react';
import { get } from './get';
import { NothingPlaceholder } from '../../components/components';

const useStyles = createStyles(({ colors }) => ({
  search_wrapper: {
    width: '100%',
    maxWidth: em('1115px'),
    margin: '0 auto',
    height: '100%',
  },
  search_container: {
    background: colors.grey100[0],
  },
  bordered: {
    borderRadius: '0.5em',
  },
  transparent: {
    border: 'none',
  },
}));

export const SearchPage: FC = () => {
  const { classes } = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setVacancies(mockVacancies);
      setLoading(false);
    }, 3000);
  }, []);

  get();

  return (
    <Container w={'100%'} p={0} className={classes.search_wrapper}>
      <Flex
        py={40}
        px={10}
        gap={em('28px')}
        className={classes.search_container}
      >
        <FilterBar />
        <Container p={0} m={0} w={'100%'}>
          <Flex align={'center'} direction={'column'} gap={'0.5em'} h={'100%'}>
            <TextInput
              size="md"
              w={'100%'}
              icon={<IconSearch size="1.1rem" stroke={1.5} />}
              radius={'0.5em'}
              placeholder="Введите название вакансии"
              rightSection={
                <Button size="xs" radius={'0.5em'}>
                  Поиск
                </Button>
              }
              rightSectionWidth={85}
            />
            {isLoading ? (
              <Flex justify={'center'} direction={'column'} h={'100%'}>
                <Loader size="120" />
              </Flex>
            ) : vacancies.length ? (
              <VacancyList items={vacancies} />
            ) : (
              <NothingPlaceholder
                message="Совпадений не найдено"
                withRedirect={false}
              />
            )}
          </Flex>
        </Container>
      </Flex>
    </Container>
  );
};
