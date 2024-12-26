import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  CheckBadgeIcon,
  PencilIcon
} from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { updateUser } from '../services/userApiService';
import LoadingScreen from './LoadinScreen';
import { roles, getRoleConfig } from '../data/roles';

function MaintainerUsersGrid({ users, onUserUpdate }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRoleUpdate = async (user, newRole) => {
    try {
      setLoading(true);
      const maintainer = JSON.parse(localStorage.getItem('maintainer'));
      await updateUser({
        email: user.email,
        role: newRole,
        maintainerEmail: maintainer.email
      });
      const message = `Updated ${user.first_name}'s role to ${newRole}`;
      toast(message, {
        type: 'success',
        position: 'bottom-right',
        autoClose: 2000
      });
      onUserUpdate(user.email, newRole);
      setSelectedUser(null);
    } catch (error) {
      const message = `Failed to update role: ${error.message}`;
      toast(message, {
        type: 'error',
        position: 'bottom-right',
        autoClose: 2000
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="container mx-auto py-8 px-4 min-h-screen"
    >
      <h1
        className="text-4xl font-extrabold text-transparent bg-clip-text 
                bg-gradient-to-r from-purple-600 to-purple-900 
                dark:from-purple-400 dark:to-purple-600 mb-8 text-center"
      >
        Community Members Management
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {users.map((user, index) => {
          const roleConfig = getRoleConfig(user.role);
          const isSelected = selectedUser?.email === user.email;

          return (
            <motion.div
              key={user.email}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full relative"
            >
              <motion.div
                whileHover={
                  !isSelected
                    ? {
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }
                    : {}
                }
                className={`
                                    relative bg-white dark:bg-gray-800 rounded-2xl
                                    border-2 border-none dark:border-none
                                    shadow-lg hover:shadow-xl
                                    transition-all duration-300
                                    overflow-hidden
                                `}
              >
                <div className="p-6">
                  {/* User Icon */}
                  <div className="flex justify-center mb-6 relative">
                    <div
                      className={`p-3 rounded-full border-2 border-gray-200 dark:border-gray-700 ${roleConfig.color}`}
                    >
                      {roleConfig.icon}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute -top-2 -right-2 p-2 rounded-full 
                                                bg-white dark:bg-gray-700
                                                border-2 border-gray-200 dark:border-gray-700
                                                hover:shadow-lg
                                                transition-all duration-300"
                      onClick={() =>
                        setSelectedUser(
                          selectedUser?.email === user.email ? null : user
                        )
                      }
                    >
                      <PencilIcon className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                    </motion.button>
                  </div>

                  {/* User Info */}
                  <div className="text-center space-y-4">
                    <h2
                      className="text-xl font-bold text-gray-800 dark:text-gray-200 
                                            flex items-center justify-center"
                    >
                      {user.first_name} {user.last_name}
                      <CheckBadgeIcon className="h-5 w-5 ml-2 text-purple-500 dark:text-purple-400" />
                    </h2>

                    <div
                      className="p-3 rounded-lg border-2 border-gray-200 
                                                    dark:border-gray-700 text-gray-600 dark:text-gray-300 
                                                    bg-gray-50 dark:bg-gray-700 
                                                    flex items-center justify-center"
                    >
                      <EnvelopeIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span
                        className="text-sm truncate max-w-[200px]"
                        title={user.email}
                      >
                        {user.email}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-full
                                                border-2 border-gray-200 dark:border-gray-700
                                                
                                                text-sm font-medium ${roleConfig.color}`}
                      >
                        {roleConfig.icon}
                        <span className="ml-2 text-purple-500 dark:text-purple-400">
                          {user.role}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Role Update Modal */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl p-6 
                                        shadow-xl border-2 border-gray-200 dark:border-gray-700 z-10"
                >
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
                    Update Role
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {roles.map((role) => (
                      <motion.button
                        key={role.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRoleUpdate(user, role.value)}
                        className={`
                                                    p-4 rounded-xl text-center flex flex-col items-center
                                                    border-2 border-gray-200 dark:border-gray-700
                                                    transition-all duration-300
                                                    ${role.color}
                                                    ${
                                                      user.role === role.value
                                                        ? 'bg-purple-50 dark:bg-purple-900/30'
                                                        : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                                                    }
                                                `}
                      >
                        {role.icon}
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-2">
                          {role.value}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedUser(null)}
                    className="mt-6 w-full py-3 rounded-xl 
                                            bg-red-50 dark:bg-red-900/20 
                                            text-red-600 dark:text-red-400
                                            border-2 border-red-200 dark:border-red-800 
                                            hover:bg-red-100 dark:hover:bg-red-900/30
                                            transition-all duration-200"
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default MaintainerUsersGrid;
