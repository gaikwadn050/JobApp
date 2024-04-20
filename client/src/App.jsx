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
  EditJob,
} from './pages'
import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import { action as AddJobAction } from './pages/AddJob'
import { loader as dashboardLoader } from './pages/DashboardLayout'
import { loader as AllJobLoader } from "./pages/AllJobs"
import { loader as EditLoader } from "./pages/EditJob"
import { action as EditAction } from "./pages/EditJob"
import { action as deleteAction } from "./pages/DeleteJob"
import { loader as adminAction } from "./pages/Admin"
import { action as profileAction } from "./pages/Profile"
import { loader as statsLoader } from "./pages/Stats"

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
          action: loginAction,
        },
        {
          path: 'dashboard',
          element: <DashboardLayout />,
          loader: dashboardLoader,
          children: [
            {
              index: true,
              element: <AddJob />,
              action: AddJobAction
            },
            {
              path: 'all-jobs',
              element: <AllJobs />,
              loader: AllJobLoader
            },
            {
              path: 'edit-job/:id',
              element: <EditJob />,
              loader: EditLoader,
              action: EditAction
            },
            {
              path: 'delete-job/:id',
              action: deleteAction
            },
            {
              path: 'profile',
              element: <Profile />,
              action: profileAction
            },
            {
              path: 'admin',
              element: <Admin />,
              loader: adminAction
            }, {
              path: 'stats',
              element: <Stats />,
              loader: statsLoader
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
