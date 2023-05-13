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
import axios from 'axios';
import { IconChevronDown, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

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

export const FilterBar = () => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      job: '',
      from: '',
      to: '',
    },
  });

  const salaryData = new Array(20).fill(null).map((_, index) => {
    const value = String((index + 3) * 10000);
    return { label: value, value };
  });

  const handleReset = () => form.reset();

  return (
    <form
      className={classes.filter_container}
      onSubmit={form.onSubmit((values) => console.log(values))}
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
          data={[
            { label: 'Электроэнергетика', value: 'Электроэнергетика' },
            {
              label: 'Топливная промышленность',
              value: 'Топливная промышленность',
            },
            { label: 'Чёрная металлургия', value: 'Чёрная металлургия' },
            { label: 'Цветная металлургия', value: 'Цветная металлургия' },
          ]}
          rightSection={<IconChevronDown size="1.6rem" color="grey" />}
          rightSectionWidth={40}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          {...form.getInputProps('job')}
        />
        <Container p={0} m={0}>
          <Select
            radius={em('8px')}
            label={'Оклад'}
            placeholder={'От'}
            data={salaryData}
            mb={'10px'}
            {...form.getInputProps('from')}
          />
          <Select
            radius={em('8px')}
            className={classes.bordered}
            placeholder={'До'}
            data={salaryData}
            {...form.getInputProps('to')}
          />
        </Container>
        <Button type="submit" className={classes.bordered}>
          Применить
        </Button>
      </Container>
    </form>
  );
};
