import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { AppHeader } from './components/components';

export const App: FC = () => {
  const [count, setCount] = useState(0);

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
