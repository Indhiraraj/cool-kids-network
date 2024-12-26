import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlusIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/solid';
import useSystemTheme from '../hooks/useSystemTheme';

function Header({ handleLogout }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useSystemTheme();

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const maintainer = JSON.parse(localStorage.getItem('maintainer') || 'null');

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  if (!handleLogout) {
    /* eslint-disable no-param-reassign */
    handleLogout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('maintainer');
      navigate('/');
    };
    /* eslint-disable no-param-reassign */
  }

  const renderAuthButtons = (isMobile = false) => (
    <div
      className={`${isMobile ? 'flex-col space-y-4' : 'space-x-4 flex items-center'}`}
    >
      {!user && !maintainer ? (
        <>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`
                            ${isMobile ? 'w-full' : ''}
                            bg-gradient-to-r from-purple-500 to-purple-600 
                            text-white px-6 py-2.5 rounded-full 
                            shadow-md hover:shadow-lg 
                            flex items-center justify-center space-x-2 
                            transition-all duration-300 
                            group
                        `}
            onClick={() => {
              navigate('/sign-up');
              setIsMenuOpen(false);
            }}
          >
            <UserPlusIcon className="h-5 w-5 group-hover:rotate-6 transition-transform" />
            <span>Register</span>
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`
                            ${isMobile ? 'w-full' : ''}
                            bg-white border border-purple-200 
                            text-purple-700 px-6 py-2.5 rounded-full 
                            shadow-md hover:shadow-lg 
                            flex items-center justify-center space-x-2 
                            transition-all duration-300 
                            group
                        `}
            onClick={() => {
              navigate('/sign-in');
              setIsMenuOpen(false);
            }}
          >
            <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            <span>Login</span>
          </motion.button>
        </>
      ) : (
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className={`
                        ${isMobile ? 'w-full' : ''}
                        bg-gradient-to-r from-red-500 to-red-600 
                        text-white px-6 py-2.5 rounded-full 
                        shadow-md hover:shadow-lg 
                        flex items-center justify-center space-x-2 
                        transition-all duration-300 
                        group
                    `}
          onClick={() => {
            handleLogout();
            setIsMenuOpen(false);
          }}
        >
          <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Logout</span>
        </motion.button>
      )}
    </div>
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-indigo-50/60 dark:bg-gray-900/60 backdrop-blur-md text-gray-800 dark:text-gray-200 p-4 shadow-sm sticky top-0 z-50 "
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Home */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
        >
          <HomeIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          <h1 className="text-2xl font-bold text-purple-700 dark:text-purple-400">
            Cool Kids Network
          </h1>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="text-purple-600 dark:text-purple-500"
          >
            {isDarkMode ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </motion.button>
          {renderAuthButtons()}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="text-purple-600 dark:text-purple-500"
          >
            {isDarkMode ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-purple-600 dark:text-purple-500"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden p-6"
          >
            {renderAuthButtons(true)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
