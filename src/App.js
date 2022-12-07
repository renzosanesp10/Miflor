import React, {useState} from 'react';
import User from './pages/admin/User';
import Login from './pages/Login';
import Dashboard from './pages/sales/Dashboard';
import Dashboardprod from './pages/products/Dashboardprod';
import NewProd from './pages/products/NewProd';
import NewSale from './pages/sales/NewSale';
import NewUser from './pages/admin/NewUser';
import { Home } from './pages/Home';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";



export default function  App () {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/login",
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
        {
            path: "/admin-users",
            element: <User/>,
        },
        {
            path: "/new-user",
            element: <NewUser/>,
        },
    ]);
    return (
        <RouterProvider router={router} />
    )
}

