import React from 'react'
import { motion } from 'framer-motion'
import { 
    EnvelopeIcon, 
    LockClosedIcon, 
    UserIcon 
} from '@heroicons/react/24/solid'

const Form = ({ title, handleSubmit, email, setEmail, password, setPassword, isMaintainer, setIsMaintainer }) => {
    const inputVariants = {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.3 }
    }

    const buttonVariants = {
        hover: { 
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        tap: { 
            scale: 0.95,
            transition: { duration: 0.2 }
        }
    }

    return (
        <motion.form
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-xl px-8 pt-6 pb-8 mb-4 w-96 border border-purple-100"
        >
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl font-bold mb-6 text-center text-purple-700"
            >
                {title}
            </motion.h2>
            
            <motion.div 
                {...inputVariants}
                className="mb-4"
            >
                <label className=" text-gray-700 text-sm font-bold mb-2 flex items-center" htmlFor="email">
                    <EnvelopeIcon className="h-5 w-5 mr-2 text-purple-500" />
                    Email
                </label>
                <div className="flex items-center">
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>
            </motion.div>
            
            <motion.div 
                {...inputVariants}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="mb-6"
            >
                <label className=" text-gray-700 text-sm font-bold mb-2 flex items-center" htmlFor="password">
                    <LockClosedIcon className="h-5 w-5 mr-2 text-purple-500" />
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-purple-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />
            </motion.div>
            
            {setIsMaintainer && (
                <motion.div 
                    {...inputVariants}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="flex items-center mb-4"
                >
                    <input
                        id="maintainer"
                        type="checkbox"
                        checked={isMaintainer}
                        onChange={() => setIsMaintainer(!isMaintainer)}
                        className="mr-2 text-purple-600 focus:ring-purple-500 rounded"
                    />
                    <label htmlFor="maintainer" className="text-gray-700 text-sm flex items-center">
                        <UserIcon className="h-4 w-4 mr-1 text-purple-500" />
                        Login as Maintainer
                    </label>
                </motion.div>
            )}

            <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-purple-700 
                hover:from-purple-700 hover:to-purple-800 
                text-white font-bold py-2.5 px-4 rounded-full 
                focus:outline-none focus:shadow-outline 
                w-full transition-all duration-300 
                flex items-center justify-center space-x-2 
                group"
            >
                <span>{title}</span>
            </motion.button>
        </motion.form>
    )
}

export default Form