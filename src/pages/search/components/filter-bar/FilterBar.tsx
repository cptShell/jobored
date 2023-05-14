import { FC } from 'react';
import {
  Button,
  Container,
  Text,
  Select,
  Title,
  createStyles,
  em,
} from '@mantine/core';
import { IconChevronDown, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import {
  catalogues,
  initialFilter,
} from '../../../../common/constants/constants';
import { Filter } from '../../../../common/types/filter';
import { Catalogue } from '../../../../common/types/catalogue';

const useStyles = createStyles(({ colors }) => ({
  filter_wrapper: {
    display: 'flex',
    gap: em('28px'),
  },

  filter_container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2em',
    minWidth: em('315px'),
    height: '100%',
    padding: em('20px'),
    backgroundColor: colors.mainWhite[0],
    border: `1px solid ${colors.grey200[0]}`,
    borderRadius: em('12px'),
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
}));

type Props = {
  handleChange: (filter: Filter) => void;
  filter: Filter;
};

export const FilterBar: FC<Props> = ({ handleChange, filter }) => {
  const { classes } = useStyles();
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
    <form
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
      <Container p={0} m={0} className={classes.filter_content}>
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
        <Container p={0} m={0}>
          <Select
            radius={em('8px')}
            label={'Оклад'}
            placeholder={'От'}
            data={salaryData}
            mb={'10px'}
            {...form.getInputProps('payment_from')}
          />
          <Select
            radius={em('8px')}
            className={classes.bordered}
            placeholder={'До'}
            data={salaryData}
            {...form.getInputProps('payment_to')}
          />
        </Container>
        <Button type="submit" className={classes.bordered}>
          Применить
        </Button>
      </Container>
    </form>
  );
};
