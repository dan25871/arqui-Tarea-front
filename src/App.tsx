import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TutorialList from './pages/TutorList';
import TutorialDetail from './pages/TutorDetail';
import CreateBooking from './pages/CreateBooking';
import MyBookings from './pages/MyBookings';
import TutorialPanel from './pages/TutorPanel';
import Navbar from './components/Navbar';

// Corrección de tipos y desestructuración de useAuth
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/dashboard" /> : <>{children}</>;
};

const AppRoutes: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated && <Navbar />}
            <div className="container">
                <Routes>
                    {/* Agregado Login dentro de PublicRoute */}
                    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                    
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/tutorials" element={<PrivateRoute><TutorialList /></PrivateRoute>} />
                    <Route path="/tutorials/:id" element={<PrivateRoute><TutorialDetail /></PrivateRoute>} />
                    <Route path="/reservar/tutorial" element={<PrivateRoute><CreateBooking /></PrivateRoute>} />
                    <Route path="/api/reservas" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
                    <Route path="/api/tutor-panel" element={<PrivateRoute><TutorialPanel /></PrivateRoute>} />
                    
                    {/* Redirección por defecto */}
                    <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
                </Routes>
            </div>
        </>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
};

export default App;