import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error/Error";
import Dashborad from "../pages/Dashboard/Dashborad";
import Login from "../pages/Auth/Login";
import Brand from "../pages/Brands/Brand";
import Cities from "../pages/Cities/Cities";
import Locations from "./../pages/Locations/Locations";
import Cars from "./../pages/Cars/Cars";
import Models from "../pages/Models/Model";
import Settings from "../pages/Settings/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashborad />,
      },
      {
        path: "/brands",
        element: <Brand />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/models",
        element: <Models />,
      },
      {
        path: "/locations",
        element: <Locations />,
      },
      {
        path: "/cities",
        element: <Cities />,
      },
      {
        path: "/cars",
        element: <Cars />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
