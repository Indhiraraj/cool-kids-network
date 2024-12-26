import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ProtectedRoute from './components/ProtectedRoute';
import MaintainerPage from './pages/MaintainerPage';
import Footer from './components/Footer';
import useSystemTheme from './hooks/useSystemTheme';
import UserUpdatePage from './pages/UserUpdatePage';

function App() {
  useSystemTheme();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/sign-up" Component={SignUpPage} />
          <Route path="/sign-in" Component={SignInPage} />
          <Route
            path="/maintainer"
            element={
              <ProtectedRoute>
                <MaintainerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-role"
            element={
              <ProtectedRoute>
                <UserUpdatePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
