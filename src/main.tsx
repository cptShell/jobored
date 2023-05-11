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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'search', element: <SearchPage /> },
      { path: 'vacancy', element: <VacancyPage /> },
      { path: 'favorite', element: <FavoritePage /> },
      { path: '*', element: <h1>Unindentifed Page</h1> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router}></RouterProvider>
    </MantineProvider>
  </React.StrictMode>
);
