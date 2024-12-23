import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { getUsersData } from "../services/userApiService";
import { motion } from "framer-motion";
import { 
    UserCircleIcon, 
    EnvelopeIcon, 
    GlobeAltIcon, 
    CheckBadgeIcon, 
    UserIcon,
    FireIcon,
    SparklesIcon
} from '@heroicons/react/24/solid';
import UsersGrid from "../components/UsersGrid";
import Footer from "../components/Footer";

const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
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
    useEffect(() => {
        if (location.state?.toastMessage) {
            toast(location.state.toastMessage, { type: location.state.type, position: 'bottom-right', autoClose: 2000 });
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, navigate]);

    useEffect(() => {
        const fetchUsersData = async (id) => {
            try {
                const usersData = await getUsersData({ id });
                const users = usersData.users.filter((user) => user.email !== currentUser.email);
                console.log(users);

                setUsers(users);
            } catch (error) {
                toast(error.message || "Failed to fetch users.", { type: "error", position: 'bottom-right', autoClose: 2000 });
            }
        };

        if (currentUser) {
            fetchUsersData(currentUser.id);
        }
    }, [currentUser]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("maintainer");
        setCurrentUser(null);
        setUsers([]);
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
            <Header handleLogout={handleLogout} />

            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-700 mb-4">
                        Welcome to Cool Kids Network
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Connect, Collaborate, and Grow Together
                    </p>
                </motion.div>

                {currentUser && (
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
                            className="relative bg-white rounded-2xl
                border-2 border-purple-200
                shadow-lg hover:shadow-xl
                transition-all duration-300
                overflow-hidden p-6"
                        >
                            <div className="flex items-start space-x-6">
                                {/* User Icon */}
                                <div className="flex-shrink-0">
                                    <div className="p-3 rounded-full border-2 border-purple-200">
                                        {roles.find(r => r.value === currentUser.role)?.icon ||
                                            <UserCircleIcon className="h-16 w-16 text-purple-500" />}
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="flex-grow space-y-4">
                                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                        {currentUser.first_name} {currentUser.last_name}
                                        <CheckBadgeIcon className="h-5 w-5 ml-2 text-purple-500" />
                                    </h2>

                                    <div className="space-y-2">
                                        <div className="p-3 rounded-lg border-2 border-purple-200 bg-gray-50">
                                            <div className="flex items-center text-gray-600">
                                                <EnvelopeIcon className="h-5 w-5 mr-2" />
                                                <span className="text-sm">{currentUser.email}</span>
                                            </div>
                                        </div>

                                        {currentUser.country && (
                                            <div className="p-3 rounded-lg border-2 border-purple-200 bg-gray-50">
                                                <div className="flex items-center text-gray-600">
                                                    <GlobeAltIcon className="h-5 w-5 mr-2" />
                                                    <span className="text-sm">{currentUser.country}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {currentUser.role && (
                                        <div className="inline-flex items-center px-4 py-2 rounded-full
                                    border-2 border-purple-200 text-purple-500
                                    text-sm font-medium">
                                            {roles.find(r => r.value === currentUser.role)?.icon}
                                            <span className="ml-2">{currentUser.role}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {users.length > 0 ? (
                    <UsersGrid users={users} />
                ) : (
                    <div className="text-center text-gray-500 mt-12">
                        No users to display.
                    </div>
                )}
            </div>

            <ToastContainer />
            {/* <Footer /> */}
        </div>
    );
};

export default HomePage;