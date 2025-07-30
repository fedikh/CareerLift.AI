import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Auth({ onLogin, onLogout, isAuthenticated }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let existingUser = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      existingUser = {
        email: decoded.email,
        userType: decoded.userType,
      };
    } catch (error) {
      console.error("Invalid token", error);
      onLogout();
    }
  }

  const handleContinue = () => {
    if (token) {
      navigate("/test-login");
    }
  };

  const handleLoginAsDifferentUser = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

      {isAuthenticated && existingUser ? (
        <>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-lg mb-2">You're currently logged in as:</p>
            <p className="font-semibold">{existingUser.email}</p>
            <p className="text-sm text-gray-600 capitalize">
              ({existingUser.userType})
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleContinue}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Continue as {existingUser.email}
            </button>

            <button
              onClick={handleLoginAsDifferentUser}
              className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Login as different user
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="mb-6">No active session found.</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Go to Login Page
          </button>
        </div>
      )}

      <div className="mt-4 text-center">
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Auth;
