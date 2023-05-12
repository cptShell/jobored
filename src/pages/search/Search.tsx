import { FC } from 'react';
import {
  Button,
  Input,
  Container,
  Text,
  Select,
  Title,
  createStyles,
  em,
  TextInput,
  Flex,
} from '@mantine/core';
import axios from 'axios';
import { FilterBar, VacancyItem } from './components/components';
import { IconSearch } from '@tabler/icons-react';

const useStyles = createStyles(({ colors }) => ({
  search_wrapper: {
    width: '100%',
    maxWidth: em('1115px'),
    margin: '0 auto',
  },
  bordered: {
    borderRadius: '0.5em',
  },
  transparent: {
    border: 'none',
  },
}));

export const SearchPage: FC = () => {
  const { cx, classes } = useStyles();
  const get = async () => {
    // const base = 'https://startup-summer-2023-proxy.onrender.com/2.0/';
    // const passUrl = 'oauth2/password/';
    // const vacanciesUrl = 'vacancies/';
    // const headers = { 'x-secret-key': 'GEU4nvd3rej*jeh.eqp' };
    // const res = await axios.get(base + passUrl, {
    //   headers,
    //   params: {
    //     login: 'sergei.stralenia@gmail.com',
    //     password: 'paralect123',
    //     client_id: '2356',
    //     client_secret:
    //       'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
    //     hr: '0',
    //   },
    // });
    // const token = res.data.access_token;
    // const token =
    //   '137440105.61a72849cdf0775799f630340de6e6d4ff2a4354.2dfa6e1060c3b9c62407788f5521682b6632d469';
    // console.log(token);
    // const response = await axios.get(base + vacanciesUrl, {
    //   headers: { ...headers, Authorization: `Bearer ${token}` },
    // });
    // console.log(response.data);
  };
  get();

  type Data = {
    profession: string;
    firmName: string;
    town: string;
    workType: string;
    paymentTo: string;
    paymentFrom: string;
    currency: string;
  };

  const mockVacancies: Array<Data> = new Array(5).fill(null).map(() => {
    return {
      profession: 'Мастер по металлу',
      firmName: 'Мастерская по металлу',
      town: 'Minsk',
      workType: 'Полный рабочий день',
      paymentFrom: '',
      paymentTo: '',
      currency: String(Math.round(Math.random() * 100000)),
    };
  });

  return (
    <Container w={'100%'} p={0} className={classes.search_wrapper}>
      <Flex py={40} gap={em('28px')}>
        <FilterBar />
        <Container p={0} m={0} w={'100%'}>
          <Flex align={'center'} direction={'column'} gap={'0.5em'}>
            <TextInput
              size="md"
              w={'100%'}
              pr={'1.5em'}
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
            {...mockVacancies.map((data) => <VacancyItem {...data} />)}
          </Flex>
        </Container>
      </Flex>
    </Container>
  );
};
