import React, { useState } from "react";
import { IoClose } from "react-icons/io5"; // For close icon; install with `npm install react-icons`
import { IonIcon } from '@ionic/react'; // Optional: If you want to use ionicons, ensure proper setup

const AuthModal = ({
  isOpen,
  onClose,
  onLogin,          // Callback to handle login: receives { email, password, remember }
  onRegister        // Callback to handle registration: receives { name, email, password }
}) => {
  // mode: "login" or "register"
  const [mode, setMode] = useState("login");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRemember, setLoginRemember] = useState(false);

  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin({ email: loginEmail, password: loginPassword, remember: loginRemember });
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (onRegister) {
      onRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[400px] max-h-[520px] bg-white border border-white/50 rounded-2xl backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] p-8">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-0 right-0 w-11 h-11 bg-[#162938] text-white text-2xl flex items-center justify-center rounded-bl-2xl cursor-pointer"
        >
          <IoClose />
        </button>
        {/* Form Heading */}
        <h2 className="text-2xl font-bold text-[#162938] text-center mb-8">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        {/* Login Form */}
        {mode === "login" && (
          <form onSubmit={handleLoginSubmit}>
            <div className="relative w-full h-12 border-b-2 border-[#162938] my-7">
              <input 
                type="email" 
                required 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Email"
                className="w-full h-full bg-transparent border-none outline-none text-base text-[#162938] font-semibold px-2 pr-8"
              />
            </div>
            <div className="relative w-full h-12 border-b-2 border-[#162938] my-7">
              <input 
                type="password" 
                required 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-full bg-transparent border-none outline-none text-base text-[#162938] font-semibold px-2 pr-8"
              />
            </div>
            <div className="flex justify-between items-center text-sm text-[#162938] font-medium mb-7">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={loginRemember} 
                  onChange={(e) => setLoginRemember(e.target.checked)}
                  className="mr-1 accent-[#162938]"
                />
                Remember Me
              </label>
              <a href="#" className="hover:underline">Forgot Password?</a>
            </div>
            <button 
              type="submit"
              className="w-full h-11 bg-[#162938] rounded-lg text-white font-medium"
            >
              Login
            </button>
            <div className="text-center mt-5 text-sm text-[#162938]">
              Don't have an account?{" "}
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); setMode("register"); }}
                className="font-semibold hover:underline"
              >
                Register
              </a>
            </div>
          </form>
        )}

        {/* Registration Form */}
        {mode === "register" && (
          <form onSubmit={handleRegisterSubmit}>
            <div className="relative w-full h-12 border-b-2 border-[#162938] my-7">
              <input 
                type="text" 
                required 
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="Username"
                className="w-full h-full bg-transparent border-none outline-none text-base text-[#162938] font-semibold px-2 pr-8"
              />
            </div>
            <div className="relative w-full h-12 border-b-2 border-[#162938] my-7">
              <input 
                type="email" 
                required 
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="Email"
                className="w-full h-full bg-transparent border-none outline-none text-base text-[#162938] font-semibold px-2 pr-8"
              />
            </div>
            <div className="relative w-full h-12 border-b-2 border-[#162938] my-7">
              <input 
                type="password" 
                required 
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-full bg-transparent border-none outline-none text-base text-[#162938] font-semibold px-2 pr-8"
              />
            </div>
            <div className="flex justify-between items-center text-sm text-[#162938] font-medium mb-7">
              <label className="flex items-center">
                <input type="checkbox" className="mr-1 accent-[#162938]" />
                I agree to the terms & conditions
              </label>
            </div>
            <button 
              type="submit"
              className="w-full h-11 bg-[#162938] rounded-lg text-white font-medium"
            >
              Register
            </button>
            <div className="text-center mt-5 text-sm text-[#162938]">
              Already have an account?{" "}
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); setMode("login"); }}
                className="font-semibold hover:underline"
              >
                Login
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
