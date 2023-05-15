import { FC } from 'react';
import {
  Button,
  Container,
  Text,
  Select,
  Title,
  createStyles,
  em,
  Flex,
  Box,
} from '@mantine/core';
import { IconChevronDown, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import {
  catalogues,
  initialFilter,
} from '../../../../common/constants/constants';
import { Filter } from '../../../../common/types/filter';
import { Catalogue } from '../../../../common/types/catalogue';
import { useMediaQuery } from '@mantine/hooks';

type MatchProps = {
  matchesTablet: boolean;
  matchesMobile: boolean;
};

const useStyles = createStyles(
  ({ colors }, { matchesTablet, matchesMobile }: MatchProps) => ({
    filter_wrapper: {
      display: 'flex',
      gap: em('28px'),
    },

    filter_container: {
      display: 'flex',
      flexDirection: 'column',
      gap: matchesTablet ? '0.5em' : '2em',
      minWidth: em('315px'),
      height: '100%',
      padding: em(`${matchesMobile ? 12 : 20}px`),
      backgroundColor: colors.mainWhite[0],
      border: `1px solid ${colors.grey200[0]}`,
      borderRadius: em('12px'),
      fontSize: matchesMobile ? '0.7em' : '1em',
    },

    filter_heading: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    filter_content: {
      display: 'flex',
      flexDirection: 'column',
      gap: em('20px'),
    },

    filter_section: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5em',
    },

    bordered: {
      borderRadius: '0.5em',
    },

    filter_accept: {},
  })
);

type Props = {
  handleChange: (filter: Filter) => void;
  filter: Filter;
};

export const FilterBar: FC<Props> = ({ handleChange, filter }) => {
  const matchesMobile = useMediaQuery('(max-width: 420px)');
  const matchesTablet = useMediaQuery('(max-width: 800px)');
  const { classes } = useStyles({ matchesTablet, matchesMobile });
  const form = useForm({
    initialValues: filter,
  });

  const salaryData = new Array(20).fill(null).map((_, index) => {
    const value = String((index + 3) * 10000);
    return { label: value, value };
  });

  const handleReset = () => {
    form.reset();
    handleChange(initialFilter);
  };
  const handleSubmit = (values: Filter) => {
    const parsedData = JSON.parse(String(values.catalogues)) as Catalogue;
    const resultFilter = { ...values, catalogues: parsedData.key };
    handleChange(resultFilter);
  };
  return (
    <Box
      component="form"
      className={classes.filter_container}
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <Container p={0} m={0} className={classes.filter_heading}>
        <Title fz={20} lh={'20px'}>
          Фильтры
        </Title>
        <Button onClick={handleReset} p={0} h={20} variant="subtle">
          <Text color="#ACADB9">Сбросить все</Text>
          <IconX color="#ACADB9" height={em('16px')} width={em('20px')} />
        </Button>
      </Container>
      <Flex p={0} m={0} className={classes.filter_content} gap={10}>
        <Select
          radius={em('8px')}
          label={'Отрасль'}
          placeholder={'Выберите отрасль'}
          data={catalogues.map((catalogue) => {
            const { title_trimmed } = catalogue;
            return { label: title_trimmed, value: JSON.stringify(catalogue) };
          })}
          rightSection={<IconChevronDown size="1.6rem" color="grey" />}
          rightSectionWidth={40}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          {...form.getInputProps('catalogues')}
        />
        <Flex
          p={0}
          m={0}
          direction={matchesTablet ? 'row' : 'column'}
          align={matchesTablet ? 'end' : 'normal'}
          gap={matchesTablet ? em('10px') : 0}
        >
          <Select
            radius={em('8px')}
            label={'Оклад'}
            placeholder={'От'}
            data={salaryData}
            mb={matchesTablet ? 0 : '10px'}
            w={matchesTablet ? '50%' : '100'}
            {...form.getInputProps('payment_from')}
          />
          <Select
            radius={em('8px')}
            placeholder={'До'}
            data={salaryData}
            w={matchesTablet ? '50%' : '100'}
            {...form.getInputProps('payment_to')}
          />
        </Flex>
        <Button type="submit" className={classes.bordered}>
          Применить
        </Button>
      </Flex>
    </Box>
  );
};
