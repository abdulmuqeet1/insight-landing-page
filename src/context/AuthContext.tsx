import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { supabase } from "@/integrations/supabase/client";

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  google_id?: string;
}

interface AuthContextType {
  user: User | null;
  loginWithGoogle: (accessToken: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem("custom_auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("custom_auth_user");
      }
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = async (accessToken: string) => {
    setLoading(true);
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user info from Google");
      }
      const userInfo = await response.json();
      const { email, name, picture, sub } = userInfo;

      // Upsert into Supabase `users` table
      const { data, error } = await supabase
        .from('users')
        .upsert({
          email: email,
          name: name,
          avatar_url: picture,
          google_id: sub
        }, { onConflict: 'email' })
        .select()
        .single();

      if (error) throw error;

      const userData: User = {
        id: data.id,
        email: data.email,
        name: data.name,
        avatar_url: data.avatar_url,
        google_id: data.google_id
      };

      setUser(userData);
      localStorage.setItem("custom_auth_user", JSON.stringify(userData));
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("custom_auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
