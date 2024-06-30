import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-100 p-4">
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">Header</div>
    </header>
    <main className="flex-1">
      <div className="container mx-auto px-4 h-full">
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </main>
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">Footer</div>
    </footer>
  </div>
  );
};

export default Layout;
