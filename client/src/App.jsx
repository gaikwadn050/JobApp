import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  DashboardLayout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Register,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
} from './pages'
import { action as registerAction } from './pages/Register'

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme;
}

checkDefaultTheme()

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />
        },
        {
          path: 'register',
          element: <Register />,
          action: registerAction,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'dashboard',
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <AddJob />
            },
            {
              path: 'all-jobs',
              element: <AllJobs />
            },
            {
              path: 'profile',
              element: <Profile />
            },
            {
              path: 'admin',
              element: <Admin />
            }, {
              path: 'stats',
              element: <Stats />
            }
          ]
        },
      ]
    },

  ]
)
const App = () => {


  return <RouterProvider router={router} />
}

export default App
