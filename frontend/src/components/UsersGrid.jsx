import React from 'react';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  GlobeAltIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/solid';
import { getRoleConfig } from '../data/roles';

function UsersGrid({ users }) {
  const truncateText = (text, maxLength = 20) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <motion.div className="container mx-auto py-8 px-4 min-h-screen">
      <h1
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r 
                from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 
                mb-8 text-center"
      >
        Community Members
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {users.map((user, index) => {
          const roleConfig = getRoleConfig(user.role);

          return (
            <motion.div
              key={user.email || index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full relative"
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
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
                      className={`p-3 rounded-full border-2 border-gray-200 dark:border-gray-700
                        ${roleConfig.color}`}
                    >
                      {roleConfig.icon}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="text-center space-y-4">
                    <h2
                      className="text-xl font-bold text-gray-800 dark:text-gray-200 
                                            flex items-center justify-center"
                    >
                      <span className="truncate max-w-[200px]">
                        {truncateText(
                          `${user.first_name} ${user.last_name}`,
                          25
                        )}
                      </span>
                      <CheckBadgeIcon
                        className="h-5 w-5 ml-2 flex-shrink-0 
                                                text-purple-500 dark:text-purple-400"
                      />
                    </h2>

                    <div className="space-y-2">
                      {user.email && (
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
                      )}

                      {user.country && (
                        <div
                          className="p-3 rounded-lg border-2 text-gray-600 
                                                    dark:text-gray-300 border-gray-200 dark:border-gray-700 
                                                    bg-gray-50 dark:bg-gray-700 
                                                    flex items-center justify-center"
                        >
                          <GlobeAltIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                          <span className="text-sm truncate max-w-[200px]">
                            {truncateText(user.country)}
                          </span>
                        </div>
                      )}
                    </div>

                    {user.role && (
                      <div
                        className="pt-4 border-t border-gray-100 dark:border-gray-700 
                                                flex justify-center"
                      >
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
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default UsersGrid;
