import {
  Title,
  Text,
  Flex,
  createStyles,
  Divider,
  em,
  ActionIcon,
  Container,
} from '@mantine/core';
import { FC } from 'react';
import { IconMapPin, IconStar } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import { addFavorite, removeFavorite } from '../../../../store/favoriteSlice';
import { IconStarFilled } from '../../../../assets/icon-star';
import { Vacancy } from '../../../../common/types/types';
import { PointFilled } from '../../../../assets/point-filled';

const useStyles = createStyles(({ colors }) => ({
  vacancy: {
    border: `1px solid ${colors.grey200[0]}`,
    borderRadius: '0.5em',
    backgroundColor: 'white',
    width: '100%',
    maxWidth: em('800px'),
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

type Props = {
  data: Vacancy;
};

export const VacancyItem: FC<Props> = ({ data }) => {
  const {
    profession,
    firmName,
    town,
    workType,
    currency,
    id,
    paymentTo,
    paymentFrom,
  } = data;
  const { favorites } = useAppSelector((state) => state.favorites);
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  const isFavorite = favorites.includes(id);
  const titleText = profession + (firmName ? ` (${firmName})` : '');
  let salary: string | null;

  if (paymentTo && paymentFrom) {
    salary = `з/п ${paymentFrom}-${paymentTo}`;
  } else if (paymentFrom && !paymentFrom) {
    salary = `з/п от ${paymentFrom}`;
  } else if (!paymentFrom && paymentTo) {
    salary = `з/п до ${paymentTo}`;
  } else {
    salary = null;
  }

  const handleFavoriteChange = () => {
    dispatch(isFavorite ? removeFavorite(id) : addFavorite(id));
  };

  return (
    <Flex
      p={'1.5em'}
      direction={'column'}
      gap={'0.75em'}
      className={classes.vacancy}
      pos={'relative'}
    >
      <ActionIcon
        onClick={handleFavoriteChange}
        pos={'absolute'}
        top={'1.5em'}
        right={'1.5em'}
      >
        {isFavorite ? <IconStarFilled /> : <IconStar color="#ACADB9" />}
      </ActionIcon>

      <Title fw={600} className={classes.title} pr={em('20px')}>
        {titleText}
      </Title>
      <Flex gap={'0.75em'}>
        {salary && (
          <>
            <Text fw={600} className={classes.description}>
              {salary}
            </Text>
            <Text lh={em('20px')} color="#7B7C88">
              •
            </Text>
          </>
        )}

        <Text className={classes.description}>{workType}</Text>
      </Flex>
      <Flex className={classes.description} gap={'0.5em'}>
        <IconMapPin color={'#ACADB9'} size={20} />
        <Text className={classes.description}>{town}</Text>
      </Flex>
    </Flex>
  );
};
