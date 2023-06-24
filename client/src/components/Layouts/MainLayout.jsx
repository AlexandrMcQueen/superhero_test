import React from 'react';
import Header from "../Header";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <main className='container'>
            <Header/>
            <Outlet/>
        </main>
    );
};

export default MainLayout;