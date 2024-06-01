"use client";
import { UserType } from "@/types/auth";
import React, { createContext, useContext, useState } from "react";

const DefaultProps = { user: null, accessToken: null };

export interface AuthContextType {
  user: UserType | null;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType>(DefaultProps);

export const AuthProvider: React.FC<{ children: React.ReactNode, user: UserType | null, accessToken: string | null }> = ({ children, user, accessToken }) => {
  return (
    <AuthContext.Provider value={{ user, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};