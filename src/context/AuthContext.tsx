import React, { createContext, useContext, useState, useEffect } from "react";
import { products } from "../data/products"; // ✅ Needed for recommendations

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  wallet: number;
  phone?: string;
  countryCode?: string;
  address?: string;

  // ✅ New fields
  myReviews?: {
    productId: number;
    rating: number;
    comment: string;
    date: string;
  }[];

  orders?: {
    id: number; // productId
    name: string;
    price: number;
    quantity: number;
  }[];

  history?: {
    productId: number;
    viewedAt: string;
  }[];

  recommendations?: {
    productId: number;
    reason?: string;
  }[];
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string,
    phone: string,
    countryCode: string,
    address: string
  ) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  addToHistory: (productId: number) => void; // ✅ New function
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Login
  const login = async (email: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  // ✅ Register
  const register = async (
    name: string,
    email: string,
    password: string,
    phone: string,
    countryCode: string,
    address: string
  ) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password,
      wallet: 0,
      phone,
      countryCode,
      address,
      myReviews: [],
      orders: [],
      history: [],
      recommendations: [],
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);

    return true;
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  // ✅ Update user (profile edits, wallet updates, etc.)
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const newUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  // ✅ Add to browsing history + auto-generate recommendations
  const addToHistory = (productId: number) => {
    if (!user) return;

    const newHistory = [
      { productId, viewedAt: new Date().toISOString() },
      ...(user.history || []),
    ].slice(0, 10); // keep last 10 viewed

    // ✅ Generate recommendations (other products in same category)
    const viewedProduct = products.find((p) => p.id === productId);
    let newRecommendations = user.recommendations || [];

    if (viewedProduct) {
      newRecommendations = products
        .filter(
          (p) => p.category === viewedProduct.category && p.id !== productId
        )
        .slice(0, 4) // max 4 recommendations
        .map((p) => ({
          productId: p.id,
          reason: `Because you viewed ${viewedProduct.name}`,
        }));
    }

    const updatedUser: User = {
      ...user,
      history: newHistory,
      recommendations: newRecommendations,
    };

    updateUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
        addToHistory, // ✅ Expose
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
