import { RequestHandler } from "express";
import { LoginRequest, LoginResponse } from "@shared/api";

// Mock user data for demonstration
const mockUsers = [
  {
    id: "STD001",
    name: "মোহাম্মদ আবদুল্লাহ",
    role: "student",
    username: "STD001",
    password: "123456",
    permissions: ["view_profile", "view_marks", "view_attendance"]
  },
  {
    id: "TCH001", 
    name: "উস্তাদ আবদুর রহমান",
    role: "teacher",
    username: "TCH001",
    password: "123456",
    permissions: ["view_profile", "mark_attendance", "enter_marks", "view_students"]
  },
  {
    id: "ADM001",
    name: "ড. আবুল কালাম আজাদ", 
    role: "admin",
    username: "ADM001",
    password: "123456",
    permissions: ["full_access"]
  }
];

export const handleLogin: RequestHandler = (req, res) => {
  const { username, password, userType }: LoginRequest = req.body;

  // Find user
  const user = mockUsers.find(u => 
    u.username === username && 
    u.password === password && 
    u.role === userType
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }

  // Generate mock token
  const token = `mock_token_${user.id}_${Date.now()}`;

  const response: LoginResponse = {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
      permissions: user.permissions
    },
    token
  };

  res.json(response);
};

export const handleLogout: RequestHandler = (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully"
  });
};

export const handleVerifyToken: RequestHandler = (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token || !token.startsWith('mock_token_')) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }

  res.json({
    success: true,
    message: "Token is valid"
  });
};
