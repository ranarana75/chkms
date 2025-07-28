import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleLogin, handleLogout, handleVerifyToken } from "./routes/auth";
import { getStudentDashboard, getStudentProfile, getStudentAttendance, getStudentMarks, getStudentFees } from "./routes/student";
import { getTeacherDashboard, getTeacherProfile, getTeacherClasses, markAttendance, enterMarks, getStudentsByClass, createAssignment } from "./routes/teacher";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/logout", handleLogout);
  app.get("/api/auth/verify", handleVerifyToken);

  // Student routes
  app.get("/api/student/:studentId/dashboard", getStudentDashboard);
  app.get("/api/student/:studentId/profile", getStudentProfile);
  app.get("/api/student/:studentId/attendance", getStudentAttendance);
  app.get("/api/student/:studentId/marks", getStudentMarks);
  app.get("/api/student/:studentId/fees", getStudentFees);

  return app;
}
