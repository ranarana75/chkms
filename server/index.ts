import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleLogin, handleLogout, handleVerifyToken } from "./routes/auth";
import { getStudentDashboard, getStudentProfile, getStudentAttendance, getStudentMarks, getStudentFees } from "./routes/student";
import { getTeacherDashboard, getTeacherProfile, getTeacherClasses, markAttendance, enterMarks, getStudentsByClass, createAssignment } from "./routes/teacher";
import { getFinancialOverview, getFinancialTransactions, createTransaction, getStudentFeeStatus, processFeePayment, getExpenseCategories, generateFinancialReport, getDashboardStats } from "./routes/finance";
import { getLibraryDashboard, getBooks, getBookDetails, issueBook, returnBook, getIssuedBooks, addNewBook, getOverdueBooks, getLibraryReports } from "./routes/library";
import { getPrayerTimes, getHifzProgress, addHifzProgress, getAkhlaqPoints, addAkhlaqPoints, getIslamicEvents, getIslamicCalendar, getTajweedLessons } from "./routes/islamic";
import { getHostelDashboard, getHostelReports } from "./routes/hostel";
import { getTransportDashboard, getTransportUsers, addTransportUser, removeTransportUser, getTransportReports } from "./routes/transport";
import examinationRoutes from "./routes/examination";

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

  // Teacher routes
  app.get("/api/teacher/:teacherId/dashboard", getTeacherDashboard);
  app.get("/api/teacher/:teacherId/profile", getTeacherProfile);
  app.get("/api/teacher/:teacherId/classes", getTeacherClasses);
  app.get("/api/teacher/:teacherId/students/:classId", getStudentsByClass);
  app.post("/api/teacher/attendance", markAttendance);
  app.post("/api/teacher/marks", enterMarks);
  app.post("/api/teacher/assignment", createAssignment);

  // Finance routes
  app.get("/api/finance/overview", getFinancialOverview);
  app.get("/api/finance/transactions", getFinancialTransactions);
  app.post("/api/finance/transaction", createTransaction);
  app.get("/api/finance/student/:studentId/fees", getStudentFeeStatus);
  app.post("/api/finance/payment", processFeePayment);
  app.get("/api/finance/expenses", getExpenseCategories);
  app.get("/api/finance/report", generateFinancialReport);
  app.get("/api/finance/dashboard", getDashboardStats);

  // Library routes
  app.get("/api/library/dashboard", getLibraryDashboard);
  app.get("/api/library/books", getBooks);
  app.get("/api/library/books/:bookId", getBookDetails);
  app.post("/api/library/issue", issueBook);
  app.post("/api/library/return", returnBook);
  app.get("/api/library/issues", getIssuedBooks);
  app.post("/api/library/books", addNewBook);
  app.get("/api/library/overdue", getOverdueBooks);
  app.get("/api/library/reports", getLibraryReports);

  // Islamic routes
  app.get("/api/islamic/prayer-times", getPrayerTimes);
  app.get("/api/islamic/hifz/:studentId", getHifzProgress);
  app.post("/api/islamic/hifz", addHifzProgress);
  app.get("/api/islamic/akhlaq/:studentId", getAkhlaqPoints);
  app.post("/api/islamic/akhlaq", addAkhlaqPoints);
  app.get("/api/islamic/events", getIslamicEvents);
  app.get("/api/islamic/calendar", getIslamicCalendar);
  app.get("/api/islamic/tajweed", getTajweedLessons);

  // Hostel routes
  app.get("/api/hostel/dashboard", getHostelDashboard);
  app.get("/api/hostel/reports", getHostelReports);

  // Transport routes
  app.get("/api/transport/dashboard", getTransportDashboard);
  app.get("/api/transport/users", getTransportUsers);
  app.post("/api/transport/users", addTransportUser);
  app.delete("/api/transport/users", removeTransportUser);
  app.get("/api/transport/reports", getTransportReports);

  // Examination routes
  app.use("/api/examination", examinationRoutes);

  return app;
}
