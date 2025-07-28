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
        <Route path="/finance" element={<PlaceholderPage title="আর্থিক ব্যবস্��াপনা" description="ফাইনান্স মডিউল শীঘ্রই আসছে" />} />
        <Route path="/library" element={<PlaceholderPage title="লাইব্রেরি সিস্টেম" description="লাইব্রেরি মডিউল শীঘ্রই আসছে" />} />
        <Route path="/hostel" element={<PlaceholderPage title="হোস্টেল ব্যবস্থাপনা" description="হোস্টেল মডিউল শীঘ্রই আসছে" />} />
        <Route path="/transport" element={<PlaceholderPage title="ট্রান্সপোর্ট সিস্টেম" description="ট্রান্সপোর্ট মডিউল শীঘ্রই আসছে" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
