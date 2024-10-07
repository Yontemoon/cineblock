// src/contexts/SupabaseContext.tsx
import React, { createContext, useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { User } from "@supabase/supabase-js";

export type SupabaseContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const SupabaseContext = createContext<SupabaseContextType | null>(null);

const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("supabase.auth.token");
    return storedUser ? JSON.parse(storedUser).user : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
      setUser(user);
      setIsLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const newUser = session?.user ?? null;
        setUser(newUser);
        if (newUser) {
          localStorage.setItem(
            "supabase.auth.token",
            JSON.stringify({ user: newUser })
          );
        } else {
          localStorage.removeItem("supabase.auth.token");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Error signing in:", error);
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error);
    setUser(null);
    localStorage.removeItem("supabase.auth.token");
    setIsLoading(false);
  };

  const value = {
    user,
    isLoading,
    signIn,
    signOut,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

export default SessionProvider;
