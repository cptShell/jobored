import { FC, MouseEventHandler } from 'react';
import { Title, Text, Flex, createStyles, em, ActionIcon } from '@mantine/core';
import { IconMapPin, IconStar } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import { addFavorite, removeFavorite } from '../../../../store/favoriteSlice';
import { IconStarFilled } from '../../../../assets/icon-star';
import { Vacancy } from '../../../../common/types/types';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';

type StyleProps = {
  isFull: boolean;
  matchesMobile: boolean;
};

const useStyles = createStyles(
  ({ colors }, { isFull, matchesMobile }: StyleProps) => ({
    vacancy: {
      border: `1px solid ${colors.grey200[0]}`,
      borderRadius: '0.5em',
      backgroundColor: 'white',
      width: '100%',
      maxWidth: em('800px'),
      fontSize: `${matchesMobile ? 0.7 : 1}em`,
    },

    title: {
      color: !isFull ? '#5E96FC' : 'inherit',
      lineHeight: '1.2em',
      fontSize: em(`${isFull ? 24 : 20}px`),
      fontWeight: isFull ? 700 : 600,
    },

    description: {
      fontSize: em(`${isFull ? 20 : 16}px`),
      lineHeight: '20px',
    },
  })
);

type Props = {
  data: Vacancy;
  isFull: boolean;
};

export const VacancyItem: FC<Props> = ({ data, isFull }) => {
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
  const matchesMobile = useMediaQuery('(max-width: 520px)');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);
  const { classes } = useStyles({ isFull, matchesMobile });

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
  const blockBubbling: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.stopPropagation();
  };
  const handleNavigate = () => {
    navigate(`/vacancy/${id}`);
  };

  const paddingValue = matchesMobile ? '0.75em' : '1.5em';

  return (
    <Flex
      p={paddingValue}
      direction={'column'}
      gap={'0.75em'}
      className={classes.vacancy}
      pos={'relative'}
      onClick={handleNavigate}
    >
      <ActionIcon
        onClick={blockBubbling}
        pos={'absolute'}
        top={paddingValue}
        right={paddingValue}
      >
        <div onClick={handleFavoriteChange}>
          {isFavorite ? <IconStarFilled /> : <IconStar color="#ACADB9" />}
        </div>
      </ActionIcon>

      <Title className={classes.title} pr={em('20px')}>
        {titleText}
      </Title>
      <Flex
        gap={'0.75em'}
        justify={!matchesMobile ? 'flex-start' : 'space-between'}
        wrap={'wrap'}
      >
        {salary && (
          <>
            <Text fw={isFull ? 700 : 600} className={classes.description}>
              {`${salary} ${currency}`}
            </Text>
            <Text
              display={matchesMobile ? 'none' : 'block'}
              lh={em('20px')}
              color="#7B7C88"
            >
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
