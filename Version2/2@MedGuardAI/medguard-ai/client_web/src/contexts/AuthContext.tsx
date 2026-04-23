import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiService } from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean; // ✅ ADDED (IMPORTANT)
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: {
    name?: string;
    email?: string;
    password?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true); // ✅ ADDED

  // ✅ UPDATED useEffect (IMPORTANT FIX)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("access");
    const storedRefreshToken = localStorage.getItem("refresh");

    if (storedUser && storedAccessToken && storedRefreshToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }

    setIsLoading(false); // ✅ VERY IMPORTANT
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login({ email, password });

      setUser(response.data.user);
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await apiService.register({ name, email, password });
      await login(email, password);
    } catch (error: any) {
      throw new Error(error.message || "Registration failed");
    }
  };

  const logout = async () => {
    try {
      if (accessToken) {
        await apiService.logout(accessToken);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.clear();
    }
  };

  const updateUserProfile = async (data: {
    name?: string;
    email?: string;
    password?: string;
  }) => {
    const token = localStorage.getItem("access");
    if (!token) {
      throw new Error("Not authenticated");
    }

    try {
      const response = await apiService.updateProfile(token, data);

      if (user) {
        const { password, ...safeData } = data;

        const filteredData = Object.fromEntries(
          Object.entries(safeData).filter(
            ([_, v]) => v !== undefined && v !== ""
          )
        );

        const updatedUser = {
          ...user,
          ...filteredData,
          updated_at: response?.updated_at || new Date().toISOString(),
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error: any) {
      throw new Error(error.message || "Profile update failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated: !!accessToken,
        isLoading, // ✅ ADDED HERE
        login,
        register,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}