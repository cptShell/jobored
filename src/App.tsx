import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './components/components';
import './App.css';

export const App: FC = () => {
  return (
    <>
      <AppHeader
        links={[
          { link: '/search', label: 'Поиск Вакансий' },
          { link: '/vacancy', label: 'Избранное' },
        ]}
      />
      <div>
        <Outlet />
      </div>
    </>
  );
};
