import './App.css';
import Nav from "./components/navBar.jsx";
import Login from "./components/person_login";
import Home from './components/home';
import SignUp from './components/person_signUp';
import SlotBook from './components/book_the_slot';
import User_acc from './components/User_Account';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { auth } from './Backend/firebaseconfig'; 
import { useState, useEffect } from 'react';
import Landing from './components/landing.jsx';
import Person_or_Agent from './components/Person_or_Agent.login.jsx';
import LoadingScreen from './components/loading_screen.jsx';
import { Agents } from './components/Agents.jsx';
import CurrentLocation from './components/location.jsx';

// Create a wrapper component for route transitions
function RouteTransition({ children }) {
    const [isTransitioning, setIsTransitioning] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setIsTransitioning(true);
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [location]);

    if (isTransitioning) {
        return <LoadingScreen />;
    }

    return children;
}

function App() {
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
                const unsubscribe = auth.onAuthStateChanged(user => {
                    setIsLoggedIn(!!user);  // Immediately update state
                    setIsLoading(false);
                });
            
                return () => unsubscribe();
            }, []);
            


        return (
                
                <BrowserRouter>
                        {isLoggedIn && <Nav />}
                        <RouteTransition>
                                <Routes>
                                        <Route path="/" element={<Landing />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/signup" element={<SignUp />} />
                                        <Route path="/user_agent" element={<Person_or_Agent />} />
                                        <Route path="/agents" element={<Agents />} />
                                        <Route path="/loading" element={<LoadingScreen />} />
                                        <Route path="/location" element={<CurrentLocation />} />
                                        {isLoggedIn ? (
                                                <>
                                                        <Route path="/home" element={<Home />} />
                                                        <Route path="/bys" element={<SlotBook />} />
                                                        <Route path="/user-acc" element={<User_acc />} />
                                                </>
                                        ) : (
                                                <Route path="*" element={<Navigate to='/login' replace />} /> 
                                        )}
                                </Routes>
                        </RouteTransition>
                </BrowserRouter>
        );
}

export default App;