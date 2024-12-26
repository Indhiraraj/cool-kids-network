import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import { loginMainatiner, loginUser } from '../services/authApiService';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadinScreen';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMaintainer, setIsMaintainer] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isMaintainer) {
        const maintainer = await loginMainatiner({ email, password });
        localStorage.setItem('maintainer', JSON.stringify(maintainer));
        const message = `Login successful: ${email}`;
        navigate('/maintainer', {
          state: { toastMessage: message, type: 'success' }
        });
        return;
      }
      const user = await loginUser({ email, password });
      localStorage.setItem('user', JSON.stringify(user));

      const message = `Login successful: ${email}`;
      navigate('/', { state: { toastMessage: message, type: 'success' } });
    } catch (error) {
      setLoading(false);
      toast.error(`Login failed: ${error.message}`, {
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        className:
          '!bg-white !rounded-xl !border !border-red-100 !shadow-lg !p-4',
        bodyClassName: '!text-gray-800 !font-medium !text-sm',
        progressClassName: '!bg-red-500'
      });
    }

    // Add your login logic here
  };

  return (
    <div className="min-h-[85vh] bg-gray-100 dark:bg-gray-900">
      <Header />
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="flex items-center justify-center mt-14 p-4">
          <Form
            title="Sign In"
            handleSubmit={handleLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isMaintainer={isMaintainer}
            setIsMaintainer={setIsMaintainer}
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

export default SignInPage;
