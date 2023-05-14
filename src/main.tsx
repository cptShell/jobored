import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import {
  VacancyPage,
  SearchPage,
  ErrorPage,
  FavoritePage,
} from './pages/pages.tsx';
import './index.css';
import { App } from './App.tsx';
import { Provider } from 'react-redux';
import store from './store/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'search', element: <SearchPage /> },
      { path: 'vacancy', element: <VacancyPage /> },
      { path: 'favorite', element: <FavoritePage /> },
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colors: {
            mainBg: ['#F7F7F8'],
            mainBlack: ['#232134'],
            mainBlue: ['#5E96FC'],
            mainWhite: ['#FFFFFF'],
            grey100: ['#F7F7F8'],
            grey200: ['#EAEBED'],
            grey500: ['#ACADB9'],
          },
        }}
      >
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
