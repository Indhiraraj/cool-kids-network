import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import {
    UserIcon,
    IdentificationIcon,
    UserPlusIcon,
    AcademicCapIcon,
} from '@heroicons/react/24/solid';
import { updateUser } from '../services/userApiService';
import Header from '../components/Header';
import { roles } from '../data/roles';

const UserUpdatePage = () => {
    const [emailOrName, setEmailOrName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newRole, setNewRole] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.toastMessage) {
            toast(location.state.toastMessage, { type: location.state.type });
        }
        navigate(location.pathname, { replace: true });
    }, [location.state]);



    const handleUpdate = async (e) => {
        e.preventDefault();
        const requestData = {
            email: (!firstName && !lastName) ? emailOrName : undefined,
            firstName: !emailOrName ? firstName : undefined,
            lastName: !emailOrName ? lastName : undefined,
            role: newRole,
        };

        const maintainer = JSON.parse(localStorage.getItem('maintainer'));

        try {
            await updateUser({ ...requestData, maintainerEmail: maintainer.email });
            const message = `user updation success: ${requestData.email} as ${requestData.role}`;
            setEmailOrName('');
            setFirstName('');
            setLastName('');
            setNewRole('');
            navigate("/update-user", { state: { toastMessage: message, type: 'success' } });
        } catch (error) {
            console.log(error);
            const message = `error user updation: ${error.message}`;
            navigate("/update-user", { state: { toastMessage: message, type: 'error' } });
        }
    };

    const inputVariants = {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
        transition: { duration: 0.3 }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.95,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />
            <div className="flex items-center justify-center mt-8 p-4">
                <motion.form
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleUpdate}
                    className="bg-white dark:bg-gray-800 shadow-xl rounded-xl px-8 pt-6 pb-8 mb-4 w-96 
                    border border-purple-100 dark:border-purple-700"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-3xl font-bold mb-6 text-center text-purple-700 dark:text-purple-400 
                        flex items-center justify-center"
                    >
                        <AcademicCapIcon className="h-8 w-8 mr-2 text-purple-500 dark:text-purple-400" />
                        Update User
                    </motion.h2>

                    <AnimatePresence>
                        {(!firstName && !lastName) && (
                            <motion.div
                                key="email-input"
                                {...inputVariants}
                                className="mb-4"
                            >
                                <label className="text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 flex items-center"
                                    htmlFor="emailOrName">
                                    <UserIcon className="h-5 w-5 mr-2 text-purple-500 dark:text-purple-400" />
                                    Enter Email or First & Last Name
                                </label>
                                <input
                                    id="emailOrName"
                                    type="text"
                                    value={emailOrName}
                                    onChange={(e) => setEmailOrName(e.target.value)}
                                    placeholder="Email or First Name and Last Name"
                                    className="shadow appearance-none border dark:border-gray-600 rounded-lg w-full 
                                    py-2 px-3 text-purple-700 dark:text-purple-300 leading-tight 
                                    focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                                    dark:bg-gray-700 dark:placeholder-gray-400"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {emailOrName ? null : (
                            <>
                                <motion.div
                                    key="first-name"
                                    {...inputVariants}
                                    transition={{ delay: 0.1, duration: 0.3 }}
                                    className="mb-4"
                                >
                                    <label className="text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 flex items-center"
                                        htmlFor="firstName">
                                        <IdentificationIcon className="h-5 w-5 mr-2 text-purple-500 dark:text-purple-400" />
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="shadow appearance-none border dark:border-gray-600 rounded-lg w-full 
                                        py-2 px-3 text-purple-700 dark:text-purple-300 leading-tight 
                                        focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                                        dark:bg-gray-700"
                                    />
                                </motion.div>

                                <motion.div
                                    key="last-name"
                                    {...inputVariants}
                                    transition={{ delay: 0.2, duration: 0.3 }}
                                    className="mb-4"
                                >
                                    <label className="text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 flex items-center"
                                        htmlFor="lastName">
                                        <IdentificationIcon className="h-5 w-5 mr-2 text-purple-500 dark:text-purple-400" />
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="shadow appearance-none border dark:border-gray-600 rounded-lg w-full 
                                        py-2 px-3 text-purple-700 dark:text-purple-300 leading-tight 
                                        focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                                        dark:bg-gray-700"
                                    />
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    <motion.div
                        {...inputVariants}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        className="mb-4"
                    >
                        <label className="text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 flex items-center"
                            htmlFor="role">
                            <UserPlusIcon className="h-5 w-5 mr-2 text-purple-500 dark:text-purple-400" />
                            New Role
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {roles.map((role) => (
                                <motion.div
                                    key={role.value}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                                    cursor-pointer rounded-lg p-2 text-center ${newRole === role.value ? 'bg-purple-500 dark:bg-purple-600 text-white' : 'bg-purple-50 dark:bg-gray-700 text-purple-700 dark:text-purple-400  hover:bg-purple-100 dark:hover:bg-gray-600'
                                        }
                                    transition-all duration-300 flex flex-col items-center
                                `}
                                    onClick={() => setNewRole(role.value)}
                                >
                                    <div className={`mb-1 ${newRole === role.value ? 'text-white' : role.color}`}>
                                        {role.icon}
                                    </div>
                                    <span className="text-xs font-medium">{role.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        type="submit"
                        disabled={!newRole}
                        className={`
                        bg-gradient-to-r from-purple-600 to-purple-700 
                        dark:from-purple-500 dark:to-purple-600
                        text-white font-bold py-2.5 px-4 rounded-full 
                        focus:outline-none focus:shadow-outline 
                        w-full transition-all duration-300 
                        flex items-center justify-center space-x-2 
                        group
                        ${!newRole
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:from-purple-700 hover:to-purple-800 dark:hover:from-purple-600 dark:hover:to-purple-700'
                            }
                    `}
                    >
                        <UserPlusIcon className="h-5 w-5 group-hover:rotate-6 transition-transform" />
                        <span>Update User</span>
                    </motion.button>
                </motion.form>
                <ToastContainer
                    position="bottom-right"
                    autoClose={1500}
                    hideProgressBar={false}
                    closeOnClick
                    pauseOnHover={false}
                    draggable
                    className="!fixed !bottom-4 !right-2 !left-auto !top-auto !w-auto !max-w-[90vw] md:!max-w-sm"
                />
            </div>
        </div>
    );
};

export default UserUpdatePage;