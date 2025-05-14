import React from 'react';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-700 to-purple-600 text-white py-4 px-6 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Zap size={32} className="text-yellow-400 animate-pulse" />
          <h1 className="text-xl font-extrabold sm:text-2xl tracking-tight">MemeX Token Creator</h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><a href="#features" className="hover:text-yellow-400 transition-colors duration-300 text-lg font-medium">Features</a></li>
            <li><a href="#create" className="hover:text-yellow-400 transition-colors duration-300 text-lg font-medium">Create Token</a></li>
            <li><a href="#faq" className="hover:text-yellow-400 transition-colors duration-300 text-lg font-medium">FAQ</a></li>
          </ul>
        </nav>
        {/* Removed Connect Wallet button */}
      </div>
    </header>
  );
};

export default Header;
