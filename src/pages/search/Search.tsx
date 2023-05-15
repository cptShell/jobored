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
import { FilterBar, VacancyList } from './components/components';
import { IconSearch } from '@tabler/icons-react';
import { NothingPlaceholder } from '../../components/components';
import { Filter, GetVacanciesDTO, Vacancy } from '../../common/types/types';
import { vacancyApi } from '../../services/services';
import { useInputState, useMediaQuery } from '@mantine/hooks';
import { initialFilter } from '../../common/constants/constants';

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
  const matchesTablet = useMediaQuery('(max-width: 800px)');
  const { classes } = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [query, setQuery] = useInputState('');

  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };
  const handleQuery = () => {
    setFilter({ ...filter });
  };

  useEffect(() => {
    const loadVacancies = async () => {
      setLoading(true);
      const payload = { ...filter, keyword: query } as Partial<GetVacanciesDTO>;
      const { data } = await vacancyApi.getVacancies(payload);
      setLoading(false);
      setVacancies(data || []);
    };
    loadVacancies();
  }, [filter]);

  return (
    <Container w={'100%'} p={0} className={classes.search_wrapper}>
      <Flex
        py={matchesTablet ? 10 : 40}
        px={10}
        gap={em(matchesTablet ? '10px' : '28px')}
        className={classes.search_container}
        direction={matchesTablet ? 'column' : 'row'}
      >
        <FilterBar handleChange={handleFilter} filter={filter} />
        <Container p={0} m={0} w={'100%'}>
          <Flex align={'center'} direction={'column'} gap={'0.5em'} h={'100%'}>
            <TextInput
              pos={'sticky'}
              top={0}
              size="md"
              w={'100%'}
              icon={<IconSearch size="1.1rem" stroke={1.5} />}
              radius={'0.5em'}
              placeholder="Введите название вакансии"
              onChange={setQuery}
              rightSection={
                <Button onClick={handleQuery} size="xs" radius={'0.5em'}>
                  Поиск
                </Button>
              }
              value={query}
              rightSectionWidth={85}
            />
            {isLoading ? (
              <Flex justify={'center'} direction={'column'} h={'100%'}>
                <Loader size={120} />
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
