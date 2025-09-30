// src/context/AuthContext.tsx
import { createContext, useState, useContext, useEffect} from "react";
import type { ReactNode } from "react";
type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // ✅ Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ✅ Save user to localStorage
  const saveUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ Fake Login (for demo; replace with API call later)
  const login = async (email: string, _password: string) => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      if (parsedUser.email === email) {
        setUser(parsedUser);
        return true;
      }
    }

    return false;
  };

  // ✅ Fake Register (for demo; replace with API call later)
  const register = async (name: string, email: string, _password: string) => {
    const newUser: User = {
      id: Date.now(),
      name,
      email,
    };

    saveUser(newUser); // Save user and log in
    return true;
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
