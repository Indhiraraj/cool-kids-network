import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllUsers, getUsersData } from "../services/userApiService";
import { motion } from "framer-motion";
import UsersGrid from "../components/UsersGrid";
import MaintainerUsersGrid from "../components/MaintainerUsersGrid";

const MaintainerPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [currentMaintainer, setCurrentMaintainer] = useState(JSON.parse(localStorage.getItem("maintainer")) || null);

    useEffect(() => {
        if (location.state?.toastMessage) {
            toast(location.state.toastMessage, { type: location.state.type });
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, navigate]);

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const usersData = await getAllUsers();
                setUsers(usersData);
            } catch (error) {
                toast(error.message || "Failed to fetch users.", { type: "error" });
            }
        };

        if (currentMaintainer) {
            fetchUsersData();
        }
    }, [currentMaintainer]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("maintainer");
        setCurrentMaintainer(null);
        setUsers([]);
        toast("Logout successful", { type: "success" });
        navigate("/");
    };

    const handleUserUpdate = (email, role) => {
        setUsers(prevUsers => 
            prevUsers.map(user => 
                user.email === email ? {...user,role} : user
            )
        );
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


                {users.length > 0 ? (
                    <MaintainerUsersGrid users={users} onUserUpdate={handleUserUpdate} />
                ) : (
                    <div className="text-center text-gray-500 mt-12">
                        No users to display.
                    </div>
                )}
            </div>

            {/* <ToastContainer /> */}
        </div>
    );
};

export default MaintainerPage;