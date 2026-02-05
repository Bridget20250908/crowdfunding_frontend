import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setIsLoggedIn(false);
  };

  const markLogin = (loggedInUser) => {
      localStorage.setItem("loggedInUser",JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, setUser, setIsLoggedIn, markLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}