import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // DEMO USER
  const DEMO_USERS = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@demo.com',
      password: 'demo123',
      role: 'admin',
      avatar: 'JD'
    }
  ];

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  //  Get all registered users from localStorage
  const getRegisteredUsers = () => {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  };

  //  Save users to localStorage
  const saveRegisteredUsers = (users) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  //  Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      //  Check demo user first
      let foundUser = DEMO_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      //  If not found, check registered users
      if (!foundUser) {
        const registeredUsers = getRegisteredUsers();
        const registeredUser = registeredUsers.find(
          u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (registeredUser) {
          foundUser = registeredUser;
        }
      }

      if (!foundUser) {
        throw new Error('Invalid email or password. Please try again.');
      }

      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role || 'user',
        avatar: foundUser.avatar || foundUser.name.charAt(0).toUpperCase()
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  //  Register function
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (!name || !email || !password) {
        throw new Error('Please fill in all fields');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const registeredUsers = getRegisteredUsers();
      const existingUser = registeredUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        throw new Error('This email is already registered. Please login.');
      }

      const newUser = {
        id: 'user_' + Date.now(),
        name: name,
        email: email.toLowerCase(),
        password: password,
        role: 'user',
        avatar: name.charAt(0).toUpperCase(),
        createdAt: new Date().toISOString()
      };

      registeredUsers.push(newUser);
      saveRegisteredUsers(registeredUsers);

      const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message || 'Registration failed');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  //  Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setError(null);
  };

  //  Clear error
  const clearError = () => {
    setError(null);
  };

  //  Get user by email
  const getUserByEmail = (email) => {
    const allUsers = [...DEMO_USERS, ...getRegisteredUsers()];
    return allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  };

  //  Reset password
  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user = getUserByEmail(email);
      if (!user) {
        throw new Error('No account found with this email');
      }

      return { success: true, message: 'Password reset link sent to your email' };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Value object
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    resetPassword,
    getUserByEmail,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
