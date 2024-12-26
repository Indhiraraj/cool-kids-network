import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900"
        >
            <div className="relative w-24 h-24">
                <motion.div
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0"
                >
                    <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
                </motion.div>
                <motion.div
                    animate={{
                        rotate: -360
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0 border-4 border-purple-200 dark:border-purple-800 rounded-full"
                />
            </div>
            <motion.div
                animate={{
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="mt-6 text-purple-600 dark:text-purple-400 font-medium"
            >
                Loading...
            </motion.div>
        </motion.div>
    );
};
export default LoadingScreen;