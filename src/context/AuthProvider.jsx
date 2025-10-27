import { useState, useEffect } from "react"
import { AuthContext } from "./AuthContext";
import axios from "axios";
const VITE_API_BASE_URL = 'http://192.168.68.58:3000';



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('hrms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {

    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const response = await axios.post(`${VITE_API_BASE_URL}/api/user/login`, { email, password });
      const result = response.data;

      if (response.status === 200) {
        const userInfo = {
          email: result.email,
          role: result.role,
          totpEnabled: result.validationType  // "otp" or "totp"
        };
        return { success: true, user: userInfo };
      }
      return { success: false, error: 'Invalid credentials' };
    }
    catch (error) {
      console.error('Login error:', error.message);
      return {
        success: false,
        error: error.response?.data?.error || 'An error occurred during login'
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hrms_user');
  };

  const verifyOTP = async (otp, userInfo) => {

    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      if (otp.length === 6 && /^\d+$/.test(otp)) {
        let response;
        if (userInfo.totpEnabled === "totp") {
            response = await axios.post(`${VITE_API_BASE_URL}/api/user/validatetotplogin`, { token: otp, email: userInfo.email });
        }
        else {
          response = await axios.post(`${VITE_API_BASE_URL}/api/user/validateotplogin`, { otp_received: otp, email: userInfo.email });
        }
        const result = response.data;
        const sessionToken = result.token;
        const payload = {
          ...userInfo,
          sessionToken
        }
        setUser(userInfo);
        localStorage.setItem('hrms_user', JSON.stringify(payload));
        return { success: true, user: payload };
      }
      return { success: false, error: 'Invalid OTP format' };
    }

    catch (error) {
      console.error('OTP Verification error:', error.message);
      return {
        success: false,
        error: error.response?.data?.error || 'An error occurred during OTP verification'
      }
    }
  };

  // const signup = async(firstName, lastName, email, password, confirmPassword) => {
  //   try{ 

  //   }
  //   catch(error){
  //     console.error('Signup error:', error.message);
  //     return {
  //       success: false,
  //       error: error.response?.data?.error || 'An error occurred during signup'
  //   }
  // }
  // }



  const value = {
    user,
    loading,
    login,
    logout,
    verifyOTP,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};