import React, { useState } from 'react';
import Form from '../components/Form';
import { toast, ToastContainer } from 'react-toastify';
import { loginMainatiner, loginUser } from '../services/authApiService';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isMaintainer, setIsMaintainer] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (isMaintainer) {
                const maintainer = await loginMainatiner({ email, password });
                localStorage.setItem('maintainer', JSON.stringify(maintainer));
                let message = `Login successful: ${email}`
                navigate("/maintainer", { state: { toastMessage: message, type: 'success' } });
                return;
            } else {
                const user = await loginUser({ email, password });
                localStorage.setItem('user', JSON.stringify(user));
            }
            let message = `Login successful: ${email}`
            navigate("/", { state: { toastMessage: message, type: 'success' } });

        } catch (error) {
            let message = `Login failed: ${error.message}`
            toast(message, { type: "error", position: 'bottom-right', autoClose: 2000 })
        }

        // Add your login logic here
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Form title={"Sign In"} handleSubmit={handleLogin} email={email} setEmail={setEmail} password={password} setPassword={setPassword} isMaintainer={isMaintainer} setIsMaintainer={setIsMaintainer} />
            <ToastContainer />
        </div>
    );
};

export default SignInPage;
