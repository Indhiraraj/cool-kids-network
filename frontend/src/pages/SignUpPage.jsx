import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import { registerUser } from '../services/authApiService';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadinScreen';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser({ email, password });
      const message = `Sign up successful, ${email}`;
      navigate('/', { state: { toastMessage: message, type: 'success' } });
    } catch (error) {
      setLoading(false);
      const message = `Sign up failed, ${error.message}`;
      toast(message, {
        type: 'error',
        position: 'bottom-right',
        autoClose: 2000
      });
    }
  };

  return (
    <div className="min-h-[85vh] bg-gray-100 dark:bg-gray-900">
      <Header />
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="flex items-center justify-center p-4 mt-16">
          <Form
            title="Sign Up"
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleRegister}
          />
        </div>
      )}
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
  );
}

export default SignUpPage;
