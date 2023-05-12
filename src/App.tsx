import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './components/components';
import './App.css';
import { Container, createStyles } from '@mantine/core';

const useStyles = createStyles(({ colors }) => ({
  main: {
    display: 'flex',
    backgroundColor: colors.mainBg[0],
    width: '100%',
    height: '100%',
  },
}));

export const App: FC = () => {
  const { classes } = useStyles();
  return (
    <>
      <AppHeader
        links={[
          { link: '/search', label: 'Поиск Вакансий' },
          { link: '/vacancy', label: 'Избранное' },
        ]}
      />
      <Container className={classes.main}>
        <Outlet />
      </Container>
    </>
  );
};
