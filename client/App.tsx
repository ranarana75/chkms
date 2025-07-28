import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/Login";
import StudentPortal from "./pages/StudentPortal";
import TeacherPortal from "./pages/TeacherPortal";
import AdminPortal from "./pages/AdminPortal";
import ExaminationDashboard from "./pages/ExaminationDashboard";
import AdmissionDashboard from "./pages/AdmissionDashboard";
import NoticeDashboard from "./pages/NoticeDashboard";
import CalendarDashboard from "./pages/CalendarDashboard";
import SystemDashboard from "./pages/SystemDashboard";
import ReportsDashboard from "./pages/ReportsDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import LibraryDashboard from "./pages/LibraryDashboard";
import HostelDashboard from "./pages/HostelDashboard";
import TransportDashboard from "./pages/TransportDashboard";
import IslamicDashboard from "./pages/IslamicDashboard";
import FeePayment from "./pages/FeePayment";
import StudentProfile from "./pages/StudentProfile";
import PlaceholderPage from "./pages/PlaceholderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student" element={<StudentPortal />} />
        <Route path="/teacher" element={<TeacherPortal />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/examination" element={<ExaminationDashboard />} />
        <Route path="/admission" element={<AdmissionDashboard />} />
        <Route path="/notice" element={<NoticeDashboard />} />
        <Route path="/calendar" element={<CalendarDashboard />} />
        <Route path="/system" element={<SystemDashboard />} />
        <Route path="/reports" element={<SystemDashboard />} />
        <Route path="/finance" element={<FinanceDashboard />} />
        <Route path="/library" element={<LibraryDashboard />} />
        <Route path="/hostel" element={<HostelDashboard />} />
        <Route path="/transport" element={<TransportDashboard />} />
        <Route path="/islamic" element={<IslamicDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
