import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login';
import Dashboard from './pages/sales/Dashboard';
import Dashboardprod from './pages/products/Dashboardprod';
import NewProd from './pages/products/NewProd';
import NewSale from './pages/sales/NewSale';
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
        path: "/new-sale",
        element: <NewSale/>,
    },
    {
        path: "/dashboard-products",
        element: <Dashboardprod/>,
    },
    {
        path: "/new-products",
        element: <NewProd/>,
    },
]);

const  root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />);


