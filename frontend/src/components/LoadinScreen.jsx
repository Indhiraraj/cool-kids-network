import React from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

const LoadingScreen = () => {
    const iconVariants = {
        initial: { 
            scale: 0.8,
            opacity: 0.5,
            rotate: 0
        },
        animate: {
            scale: [0.8, 1.1, 0.9],
            opacity: [0.5, 1, 0.8],
            rotate: 360,
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const textVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: [0, 1, 0],
            y: 0,
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50"
        >
            <div className="relative">
                {/* Background glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-purple-300 rounded-full blur-xl"
                />

                {/* Icon */}
                <motion.div
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    className="relative"
                >
                    <CodeBracketIcon className="w-16 h-16 text-purple-600" />
                </motion.div>
            </div>

            {/* Loading text */}
            <motion.p
                variants={textVariants}
                initial="initial"
                animate="animate"
                className="mt-6 text-lg font-medium text-purple-600"
            >
                Loading...
            </motion.p>
        </motion.div>
    );
};

export default LoadingScreen;