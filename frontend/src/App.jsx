import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import UserUpdatePage from './pages/UserUpdatePage';
import ProtectedRoute from './components/ProtectedRoute';
import MaintainerPage from './pages/MaintainerPage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/sign-up" Component={SignUpPage} />
          <Route path="/sign-in" Component={SignInPage} />
          <Route
            path="/update-user"
            element={
              <ProtectedRoute role='role'>
                <UserUpdatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/maintainer"
            element={
              <ProtectedRoute role='role'>
                <MaintainerPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
