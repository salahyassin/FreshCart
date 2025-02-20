import React from 'react';
import Navbar from './../components/Navbar/Navbar';
import Footer from './../components/Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container py-10 flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
