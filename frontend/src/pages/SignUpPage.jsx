import React, { useState } from 'react';
import Form from '../components/Form';
import { registerUser } from '../services/authApiService';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser({email, password});
            let message = `Sign up successful, ${email}`;
            navigate("/", { state: { toastMessage: message, type: 'success' } });
        } catch (error) {
            let message = `Sign up failed, ${error.message}`;
            toast(message, {type: 'error'});
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Form title={"Sign Up"} email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleSubmit={handleRegister} />
            {/* <ToastContainer /> */}
        </div>
    );
};

export default SignUpPage;
