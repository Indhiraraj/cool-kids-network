import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    UserPlusIcon,
    UserGroupIcon,
    SparklesIcon,
    ArrowRightIcon
} from '@heroicons/react/24/solid';

const WelcomeSection = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <UserGroupIcon className="h-12 w-12 text-purple-500" />,
            title: "Connect with Cool Kids",
            description: "Discover and network with amazing people from around the world."
        },
        {
            icon: <SparklesIcon className="h-12 w-12 text-purple-500" />,
            title: "Unlock Exciting Features",
            description: "Gain access to exclusive community features as you level up."
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 pt-5 pb-10"
        >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-fit mx-auto">
                <div className="p-6 text-center">
                   

                    <motion.p initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto text-justify sm:text-center">
                        Join our vibrant community and start your journey of connection and growth
                        Discover new friends, level up, and become part of something amazing.
                    </motion.p>

                    <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2
                                }}
                                className="bg-purple-50 p-6 rounded-xl text-center w-full md:max-w-xs"
                            >
                                <div className="flex justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-semibold text-purple-800 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm md:text-base text-gray-600">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/sign-up')}
                            className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 
                            text-white font-bold py-3 px-6 rounded-full 
                            flex items-center justify-center space-x-2 
                            hover:from-purple-700 hover:to-indigo-700 
                            transition-all duration-300 group"
                        >
                            <UserPlusIcon className="h-6 w-6 mr-2 group-hover:rotate-6 transition-transform" />
                            <span>Join Now</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/sign-in')}
                            className="w-full md:w-auto bg-white border-2 border-purple-500 
                            text-purple-700 font-bold py-3 px-6 rounded-full 
                            flex items-center justify-center space-x-2 
                            hover:bg-purple-50 
                            transition-all duration-300 group"
                        >
                            <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            <span>Login</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default WelcomeSection;