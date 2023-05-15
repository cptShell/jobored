import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { vacancyApi } from '../../services/services';
import { Vacancy } from '../../common/types/types';
import { Flex, createStyles, em } from '@mantine/core';
import { VacancyItem } from '../search/components/components';

const useStyles = createStyles(({ colors }) => ({
  description_container: {
    ['&:first-of-type']: {
      marginBottom: '1em',
    },
    ['& p']: {
      margin: 0,
      padding: 0,
      lineHeight: '130%',
    },
    ['& br']: {
      display: 'none',
    },
    ['& ul']: {
      marginTop: '1em',
      marginBottom: '1.25em',
    },
    ['& li']: {
      fontSize: '1em',
      lineHeight: '140%',
    },
    ['& > p']: {
      fontWeight: 600,
    },
    width: '100%',
    maxWidth: '800px',
    border: `1px solid ${colors.grey200[0]}`,
    borderRadius: '12px',
    background: 'white',
    padding: '1.5em',
  },
}));

export const VacancyPage: FC = () => {
  const { classes } = useStyles();
  const { pathname } = useLocation();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);

  useEffect(() => {
    const load = async () => {
      const ids = [Number(pathname.split('/').pop())];
      const { data } = await vacancyApi.getVacancies({ ids });
      if (data) {
        setVacancy(data[0]);
      }
    };
    load();
  }, []);

  return (
    <Flex
      justify={'center'}
      mt={40}
      w={'100%'}
      gap={em('20px')}
      direction={'column'}
    >
      {vacancy && (
        <>
          <VacancyItem isFull={true} data={vacancy} />
          <Flex
            direction={'column'}
            className={classes.description_container}
            dangerouslySetInnerHTML={{
              __html: vacancy.vacancyRichText.replaceAll('<br>', ''),
            }}
          />
        </>
      )}
    </Flex>
  );
};
