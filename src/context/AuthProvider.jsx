import {useState, useEffect} from "react"
import {AuthContext} from "./AuthContext";

const MOCK_USERS = {
  'superadmin@hrms.com': {
    email: 'superadmin@hrms.com',
    password: 'admin123',
    name: 'Super Admin',
    role: 'super-admin',
    mfaEnabled: true
  },
  'siteadmin@hrms.com': {
    email: 'siteadmin@hrms.com',
    password: 'admin123',
    name: 'Site Admin',
    role: 'site-admin',
    mfaEnabled: true
  },
  'operator@hrms.com': {
    email: 'operator@hrms.com',
    password: 'admin123',
    name: 'Operator',
    role: 'operator',
    mfaEnabled: false
  },
  'clientadmin@hrms.com': {
    email: 'clientadmin@hrms.com',
    password: 'admin123',
    name: 'Client Admin',
    role: 'client-admin',
    mfaEnabled: false
  },
  'clientuser@hrms.com': {
    email: 'clientuser@hrms.com',
    password: 'admin123',
    name: 'Client User',
    role: 'client-user',
    mfaEnabled: false
  }
};

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
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = MOCK_USERS[email.toLowerCase()];
    
    if (userData && userData.password === password) {
      const userInfo = {
        email: userData.email,
        name: userData.name,
        role: userData.role,
        mfaEnabled: userData.mfaEnabled
      };
      
      setUser(userInfo);
      localStorage.setItem('hrms_user', JSON.stringify(userInfo));
      setLoading(false);
      return { success: true, user: userInfo };
    }
    
    setLoading(false);
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hrms_user');
  };

  const verifyOTP = async (otp) => {
    setLoading(true);
    
    // Simulate OTP verification delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock OTP verification - accept any 6-digit code
    if (otp && otp.length === 6 && /^\d+$/.test(otp)) {
      setLoading(false);
      return { success: true };
    }
    
    setLoading(false);
    return { success: false, error: 'Invalid OTP' };
  };



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