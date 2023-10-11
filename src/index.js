import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Movies from './components/Movies';
import Movie from './components/Movie';
import Genres from './components/Genres';
import EditMovie from './components/EditMovie';
import ManageCatalouge from './components/ManageCatalouge';
import GraphQL from './components/GraphQL';
import Login from './components/Login';
import OneGenre from './components/OneGenre';

const router = createBrowserRouter({
  basename: '/my-react-app', // Replace '/my-react-app' with your actual base URL
  routes: [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: '/movies', element: <Movies /> },
        { path: '/movies/:id', element: <Movie /> },
        { path: '/genres', element: <Genres /> },
        { path: '/genres/:id', element: <OneGenre /> },
        { path: '/admin/movie/0', element: <EditMovie /> },
        { path: '/admin/movie/:id', element: <EditMovie /> },
        { path: '/manage-catalogue', element: <ManageCatalouge /> }, // Corrected typo in component name
        { path: '/graphql', element: <GraphQL /> },
        { path: '/login', element: <Login /> },
      ],
    },
    // Define your error route here (if needed)
    {
      path: '*', // This will match any route not matched by the previous routes
      element: <ErrorPage />,
    },
  ],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
); 
