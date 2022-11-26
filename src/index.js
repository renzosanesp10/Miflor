import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login';
import Dashboard from './pages/ventas/Dashboard';
import Dashboardprod from './pages/products/Dashboardprod';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
    },
    {
        path: "/dashboard-products",
        element: <Dashboardprod/>,
    },
  ]);

const  root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />);


