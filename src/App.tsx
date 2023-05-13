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
    maxWidth: '100%',
    color: colors.mainBlack[0],
  },
}));

export const App: FC = () => {
  const { classes } = useStyles();
  return (
    <>
      <AppHeader
        links={[
          { link: '/search', label: 'Поиск Вакансий' },
          { link: '/favorite', label: 'Избранное' },
        ]}
      />
      <Container m={0} p={0} className={classes.main}>
        <Outlet />
      </Container>
    </>
  );
};
