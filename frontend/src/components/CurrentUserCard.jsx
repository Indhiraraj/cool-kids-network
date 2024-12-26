import React from 'react'
import { motion } from 'framer-motion'
import {
    UserCircleIcon,
    EnvelopeIcon,
    GlobeAltIcon,
    CheckBadgeIcon,
} from '@heroicons/react/24/solid';

const CurrentUserCard = ({ roles, currentUser }) => {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto mb-12"
        >
            <motion.div
                whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl
                            border-2 border-none dark:border-none
                            shadow-lg hover:shadow-xl
                            transition-all duration-300
                            overflow-hidden p-6"
            >
                <div className="flex items-start sm:space-x-6">
                    <div className="flex-shrink-0 hidden sm:block">
                        <div className="p-3 rounded-full border-2 border-gray-200 dark:border-gray-700">
                            {roles.find(r => r.value === currentUser.role)?.icon ||
                                <UserCircleIcon className="h-16 w-16 text-purple-500 dark:text-purple-400" />}
                        </div>
                    </div>

                    <div className="flex-grow space-y-4">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                            {currentUser.first_name} {currentUser.last_name}
                            <CheckBadgeIcon className="h-5 w-5 ml-2 text-purple-500 dark:text-purple-400" />
                        </h2>

                        <div className="space-y-2">
                            <div className="p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                                <div className="flex items-center text-gray-600 dark:text-gray-300">
                                    <EnvelopeIcon className="h-5 w-5 mr-2" />
                                    <span className="text-sm">{currentUser.email}</span>
                                </div>
                            </div>

                            {currentUser.country && (
                                <div className="p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <GlobeAltIcon className="h-5 w-5 mr-2" />
                                        <span className="text-sm">{currentUser.country}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {currentUser.role && (
                            <div className="inline-flex items-center px-4 py-2 rounded-full
                                        border-2 border-gray-200 dark:border-gray-700 text-purple-500 dark:text-purple-400
                                        text-sm font-medium">
                                {roles.find(r => r.value === currentUser.role)?.icon}
                                <span className="ml-2">{currentUser.role}</span>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default CurrentUserCard