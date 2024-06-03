import { createBrowserRouter } from 'react-router-dom';

import LandingPage from '../components/LandingPage';
import ProfilePage from '../components/ProfilePage';
import SitterPage from '../components/SitterPage';
import PetPage from '../components/PetPage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage/>,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/sitter/:sitterId",
        element: <SitterPage />,
      },
      {
        path: "/pet/:petId",
        element: <PetPage />,
      },
    ],
  },
]);
