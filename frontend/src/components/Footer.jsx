import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 border-t border-purple-100 dark:border-purple-900 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Brand Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              <CodeBracketIcon className="h-8 w-8 text-purple-500 dark:text-purple-400" />
            </motion.div>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400 cursor-default">
              Cool Kids Network
            </span>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Made with
            </span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              <HeartIcon className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            </motion.div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              by the Cool Kids Network Team
            </span>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
