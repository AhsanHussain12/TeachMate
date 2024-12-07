import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LoginModal from './LoginModal';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo on the far left */}
        <div className="flex-shrink-0">
        <Link to="/" className="absolute left-5 top-1/2 transform -translate-y-1/2 flex items-center">
            <img
              src="/assets/logo2.webp"
              alt="Logo"
              className="h-10"
            />
          </Link>
        </div>

        {/* Navigation Links in the center */}
        <div className="hidden lg:flex space-x-8 justify-center flex-grow">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? 'text-orange-700' : 'text-gray-600'} py-2 px-3 font-medium transition duration-200 hover:text-orange-700`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${isActive ? 'text-orange-700' : 'text-gray-600'} py-2 px-3 font-medium transition duration-200 hover:text-orange-700`
            }
          >
            About
          </NavLink>
        </div>

        {/* Log In and Get Started buttons on the far right */}
        <div className="flex items-center space-x-4">
        <button
            onClick={() => setIsModalOpen(true)}
            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none"
        >
            Log in
        </button>
        <Link
            to="/sign-up"
            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2.5"
        >
            Get started
        </Link>
        </div>

      </nav>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}
