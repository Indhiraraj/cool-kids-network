import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="container mx-auto py-8 px-4 min-h-screen"
        >
            <motion.div
                animate={{
                    opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="mb-8 flex justify-center"
            >
                <div className="h-10 bg-gray-200 rounded-lg w-64 sm:w-[500px]" />
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
            >
                {[...Array(8)].map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1
                        }}
                        className="w-full"
                    >
                        <motion.div
                            animate={{
                                opacity: [0.5, 0.7, 0.5],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="bg-white rounded-2xl border-2 border-purple-100 overflow-hidden h-[250px]"
                        >
                            <div className="p-6 flex flex-col h-full space-y-4">
                                {/* Avatar placeholder */}
                                <div className="flex justify-center">
                                    <div className="w-16 h-16 rounded-full bg-purple-100" />
                                </div>

                                {/* Content placeholders */}
                                <div className="space-y-4">
                                    <div className="h-6 bg-purple-100 rounded-full w-3/4 mx-auto" />
                                    <div className="h-4 bg-purple-100 rounded-full w-full" />
                                    <div className="h-4 bg-purple-100 rounded-full w-5/6 mx-auto" />
                                </div>

                                {/* Role badge placeholder */}
                                <div className="flex justify-center mt-auto">
                                    <div className="h-6 bg-purple-100 rounded-full w-1/2" />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Loading;