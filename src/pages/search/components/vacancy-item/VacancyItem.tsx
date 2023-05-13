import {
  Container,
  Title,
  Text,
  Flex,
  createStyles,
  Divider,
  em,
  ActionIcon,
} from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { IconMapPin, IconStar, IconStarFilled } from '@tabler/icons-react';
import { useTheme } from '@emotion/react';

const useStyles = createStyles(({ colors }) => ({
  vacancy: {
    border: `1px solid ${colors.grey200[0]}`,
    borderRadius: '0.5em',
    backgroundColor: 'white',
    width: '100%',
  },

  title: {
    color: '#5E96FC',
    lineHeight: '1.2em',
    fontSize: em('20px'),
  },

  description: {
    fontSize: '16px',
    lineHeight: '20px',
  },
}));

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
  data: Vacancy;
  isFavorite: boolean;
  handleChange: () => void;
};

export const VacancyItem: FC<Props> = ({ data, isFavorite, handleChange }) => {
  const { profession, firmName, town, workType, currency } = data;
  const { classes } = useStyles();
  const titleText = profession + (firmName ? ` (${firmName})` : '');
  const salary = `з/п ${currency} rub`;

  return (
    <Flex
      p={'1.5em'}
      direction={'column'}
      gap={'0.75em'}
      className={classes.vacancy}
    >
      <ActionIcon onClick={handleChange}>
        {isFavorite ? <IconStarFilled /> : <IconStar />}
      </ActionIcon>
      <Title fw={600} className={classes.title}>
        {titleText}
      </Title>
      <Flex>
        <Text fw={600} className={classes.description}>
          {salary}
        </Text>
        <Divider w={10} />
        <Text className={classes.description}>{workType}</Text>
      </Flex>
      <Flex className={classes.description} gap={'0.5em'}>
        <IconMapPin color={'#ACADB9'} size={20} />
        <Text className={classes.description}>{town}</Text>
      </Flex>
    </Flex>
  );
};
