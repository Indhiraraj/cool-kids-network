import React from 'react';
import { motion } from 'framer-motion';
import {
    UserCircleIcon,
    EnvelopeIcon,
    GlobeAltIcon,
    CheckBadgeIcon,
    UserIcon,
    FireIcon,
    SparklesIcon
} from '@heroicons/react/24/solid';

const UsersGrid = ({ users }) => {
    const roles = [
        {
            value: "Cool Kid",
            icon: <UserIcon className="h-6 w-6 text-purple-500" />,
        },
        {
            value: "Cooler Kid",
            icon: <FireIcon className="h-6 w-6 text-purple-500" />,
        },
        {
            value: "Coolest Kid",
            icon: <SparklesIcon className="h-6 w-6 text-purple-500" />,
        }
    ];

    const getRoleConfig = (role) => {
        return roles.find(r => r.value === role) || roles[0];
    };

    return (
        <motion.div
            className="container mx-auto py-8 px-4 min-h-screen"
        >
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-900 mb-8 text-center">
                Community Members
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {users.map((user, index) => {
                    const roleConfig = getRoleConfig(user.role);

                    return (
                        <motion.div
                            key={user.email || index}
                            initial={{ opacity: 0, x: -20, y: -20 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="w-full relative"
                        >
                            <motion.div
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                className={`
                                    relative bg-white rounded-2xl
                                    border-2 border-purple-200
                                    shadow-lg hover:shadow-xl
                                    transition-all duration-300
                                    overflow-hidden
                                `}
                            >
                                <div className="p-6">
                                    {/* User Icon */}
                                    <div className="flex justify-center mb-6 relative">
                                        <div className="p-3 rounded-full border-2 border-purple-200">
                                            {roleConfig.icon}
                                        </div>
                                    </div>

                                    {/* User Info */}
                                    <div className="text-center space-y-4">
                                        <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center">
                                            {user.first_name} {user.last_name}
                                            <CheckBadgeIcon className="h-5 w-5 ml-2 text-purple-500" />
                                        </h2>

                                        <div className="space-y-2">
                                            {user.email && (
                                                <div className="p-3 rounded-lg border-2 border-purple-200 bg-gray-50">
                                                    <div className="flex items-center justify-center text-gray-600">
                                                        <EnvelopeIcon className="h-5 w-5 mr-2" />
                                                        <span className="text-sm">{user.email}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {user.country && (
                                                <div className="p-3 rounded-lg border-2 border-purple-200 bg-gray-50">
                                                    <div className="flex items-center justify-center text-gray-600">
                                                        <GlobeAltIcon className="h-5 w-5 mr-2" />
                                                        <span className="text-sm">{user.country}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {user.role && (
                                            <div className="pt-4 border-t border-gray-100">
                                                <span className="inline-flex items-center px-4 py-2 rounded-full
                                                             border-2 border-purple-200 text-purple-500
                                                             text-sm font-medium">
                                                    {roleConfig.icon}
                                                    <span className="ml-2">{user.role}</span>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div >
        </motion.div >
    );
};

export default UsersGrid;