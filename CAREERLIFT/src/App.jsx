import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Startpage/Navbarhome";
import Home from "./components/Startpage/Home";
import About from "./components/Startpage/About";
import Services from "./components/Startpage/Services";
import FAQ from "./components/Startpage/FAQ";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/SignUp";
import TestLogin from "./components/Authentication/Testlogin";
import Auth from "./components/Authentication/Auth"; // Import the new Auth component
import { jwtDecode } from "jwt-decode";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [authChecked, setAuthChecked] = useState(false); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUserType(decoded.userType);
          localStorage.setItem("userType", decoded.userType);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("userType");
        }
      } catch (error) {
        console.error("Token decoding failed:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
      }
    }
    setAuthChecked(true); // Mark auth check as complete
  }, []);

  const handleLogin = (token, userType) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userType", userType);
    setIsAuthenticated(true);
    setUserType(userType);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setIsAuthenticated(false);
    setUserType(null);
  };

  // Show loading state while checking auth
  if (!authChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Start page with all sections - unchanged */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <About />
              <Services />
              <FAQ />
            </>
          }
        />

        {/* Authentication pages - separate from start page */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        <Route path="/signup" element={<Signup />} />

        {/* New auth route that checks for existing session */}
        <Route
          path="/auth"
          element={
            <Auth
              onLogin={handleLogin}
              onLogout={handleLogout}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        {/* Protected dashboard - completely separate from start page */}
        <Route
          path="/test-login"
          element={
            isAuthenticated ? (
              <TestLogin onLogout={handleLogout} userType={userType} />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        {/* Redirect any unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
