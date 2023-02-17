import React from 'react'
import { Outlet } from 'react-router-dom';
import UserContextProvider from '../context/userContext';

export const RootLayout = () => {
    return (
        <UserContextProvider>
            <Outlet />
        </UserContextProvider>
    );
}
