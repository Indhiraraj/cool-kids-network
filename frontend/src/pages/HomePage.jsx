import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  CheckBadgeIcon,
  UserIcon,
  FireIcon,
  SparklesIcon,
  LockClosedIcon
} from '@heroicons/react/24/solid';
import { getUsersData } from '../services/userApiService';
import Header from '../components/Header';
import UsersGrid from '../components/UsersGrid';
import WelcomeSection from '../components/WelcomeSection';
import Loading from '../components/Loading';
import CurrentUserCard from '../components/CurrentUserCard';

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const roles = [
    {
      value: 'Cool Kid',
      icon: <UserIcon className="h-6 w-6 text-purple-500" />
    },
    {
      value: 'Cooler Kid',
      icon: <FireIcon className="h-6 w-6 text-purple-500" />
    },
    {
      value: 'Coolest Kid',
      icon: <SparklesIcon className="h-6 w-6 text-purple-500" />
    }
  ];

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast(location.state.toastMessage, {
        type: location.state.type,
        position: 'bottom-right',
        autoClose: 2000
      });
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    const fetchUsersData = async (id) => {
      try {
        // Check if user is Cool Kid
        if (currentUser.role === 'Cool Kid') {
          setAccessDenied(true);
          return;
        }

        const usersData = await getUsersData({ id });
        const usersInfo = usersData.users.filter(
          (user) => user.email !== currentUser.email
        );
        setUsers(usersInfo);
        setLoading(false);
      } catch (error) {
        toast(error.message || 'Failed to fetch users.', {
          type: 'error',
          position: 'bottom-right',
          autoClose: 2000
        });
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUsersData(currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('maintainer'))) {
      navigate('/maintainer');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('maintainer');
    setCurrentUser(null);
    setUsers([]);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header handleLogout={handleLogout} />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 mb-4">
            Welcome to Cool Kids Network!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect, Collaborate, and Grow Together
          </p>
        </motion.div>

        {currentUser ? (
          <CurrentUserCard currentUser={currentUser} />
        ) : (
          <WelcomeSection />
        )}

        {currentUser && accessDenied ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center"
          >
            <div className="flex justify-center mb-4">
              <LockClosedIcon className="h-16 w-16 text-purple-500 dark:text-purple-400 opacity-70" />
            </div>
            <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-4">
              Access Restricted
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              As a Cool Kid, you do not have permission to view other
              users`&apos;` details. Upgrade your status to access more
              features.
            </p>
            <div className="flex justify-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Current Role: Cool Kid
              </span>
            </div>
          </motion.div>
        ) : (
          currentUser &&
          /* eslint-disable no-nested-ternary */

          (users.length > 0 ? (
            <UsersGrid users={users} />
          ) : loading ? (
            <Loading />
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
              No users to display.
            </div>
          ))
        )}
        {/* eslint-disable no-nested-ternary */}
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        draggable
        className="!fixed !bottom-4 !right-2 !left-auto !top-auto !w-auto !max-w-[90vw] md:!max-w-sm dark:bg-gray-700 text-green-600"
      />
    </div>
  );
}

export default HomePage;
