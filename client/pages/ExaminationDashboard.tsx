import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Navigation from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Calendar,
  Clock,
  FileText,
  Users,
  Award,
  BarChart3,
  Plus,
  Eye,
  Download,
  RefreshCw,
  Activity,
  GraduationCap,
  Target,
  BookOpen,
  CheckCircle
} from "lucide-react";
import { useLocalData, useNotifications } from "@/hooks/useLocalData";
import { LocalDB, STORAGE_KEYS } from "@shared/localDatabase";

interface Examination {
  id: string;
  name: string;
  type: "annual" | "half_yearly" | "quarterly" | "monthly";
  class: string;
  startDate: string;
  endDate: string;
  totalMarks: number;
  passingMarks: number;
  status: "upcoming" | "ongoing" | "completed";
  subjects: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface ExamSchedule {
  id: string;
  examId: string;
  examName: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  marks: number;
  invigilator: string;
  status: "scheduled" | "ongoing" | "completed";
}

interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  class: string;
  subjectMarks: Record<string, number>;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  status: "pass" | "fail";
  position: number;
}

interface ExaminationStats {
  totalExams: number;
  upcomingExams: number;
  completedExams: number;
  totalResults: number;
  passedStudents: number;
  averageMarks: number;
  lastUpdated: Date;
}

// Create databases
const examinationsDB = new LocalDB<Examination>('chkms_examinations');
const examSchedulesDB = new LocalDB<ExamSchedule>('chkms_exam_schedules');
const examResultsDB = new LocalDB<ExamResult>(STORAGE_KEYS.EXAM_RESULTS);

const ExaminationDashboard: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState<ExaminationStats>({
    totalExams: 0,
    upcomingExams: 0,
    completedExams: 0,
    totalResults: 0,
    passedStudents: 0,
    averageMarks: 0,
    lastUpdated: new Date(),
  });
  const [isCreateExamOpen, setIsCreateExamOpen] = useState(false);
  const [isCreateScheduleOpen, setIsCreateScheduleOpen] = useState(false);
  const [isAddResultOpen, setIsAddResultOpen] = useState(false);
  const [newExam, setNewExam] = useState({
    name: "",
    type: "",
    class: "",
    startDate: "",
    endDate: "",
    totalMarks: "",
    passingMarks: "",
    subjects: [] as string[],
  });
  const [newSchedule, setNewSchedule] = useState({
    examId: "",
    subject: "",
    date: "",
    startTime: "",
    endTime: "",
    room: "",
    marks: "",
    invigilator: "",
  });
  const [newResult, setNewResult] = useState({
    examId: "",
    studentId: "",
    studentName: "",
    class: "",
    subjectMarks: {} as Record<string, number>,
    totalMarks: 0,
    obtainedMarks: 0,
  });

  const { data: examinations, loading: examsLoading, addItem: addExam, refresh: refreshExams } = useLocalData(examinationsDB);
  const { data: schedules, loading: schedulesLoading, addItem: addSchedule, refresh: refreshSchedules } = useLocalData(examSchedulesDB);
  const { data: results, loading: resultsLoading, addItem: addResult, refresh: refreshResults } = useLocalData(examResultsDB);
  const { addNotification } = useNotifications();

  useEffect(() => {
    initializeSampleData();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [examinations, schedules, results]);

  const initializeSampleData = () => {
    // Initialize sample examinations
    if (examinations.length === 0) {
      const sampleExams: Examination[] = [
        {
          id: "1",
          name: "মাসিক পরীক্ষা - ডিসেম্বর ২০২৪",
          type: "monthly",
          class: "আলিম প্রথম বর্ষ",
          startDate: "2024-12-20",
          endDate: "2024-12-25",
          totalMarks: 500,
          passingMarks: 250,
          status: "upcoming",
          subjects: ["আরবি সাহিত্য", "তাফসীর", "হাদিস", "ফিকহ", "আকাইদ"],
          createdBy: "admin-001",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "ষাণ্মাসিক পরীক্ষা - ২০২৪",
          type: "half_yearly",
          class: "আলিম দ্বিতীয় বর্ষ",
          startDate: "2024-11-15",
          endDate: "2024-11-20",
          totalMarks: 600,
          passingMarks: 300,
          status: "completed",
          subjects: ["আরবি সাহিত্য", "তাফসীর", "হাদিস", "ফিকহ", "আকাইদ", "ইংরেজি"],
          createdBy: "admin-001",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];

      sampleExams.forEach(exam => examinationsDB.add(exam));
    }

    // Initialize sample schedules
    if (schedules.length === 0) {
      const sampleSchedules: ExamSchedule[] = [
        {
          id: "1",
          examId: "1",
          examName: "মাসি��� পরী���্ষা - ডিসেম্বর ২০২৪",
          subject: "আরবি সাহিত্য",
          date: "2024-12-20",
          startTime: "09:00",
          endTime: "12:00",
          room: "১০১",
          marks: 100,
          invigilator: "উস্তাদ আবদুর রহমান",
          status: "scheduled",
        },
        {
          id: "2",
          examId: "1",
          examName: "মাসিক পরীক্ষা - ডিসেম্বর ২০২৪",
          subject: "তাফসীর",
          date: "2024-12-21",
          startTime: "09:00",
          endTime: "12:00",
          room: "১০২",
          marks: 100,
          invigilator: "উস্তাদ মোহাম্মদ আলী",
          status: "scheduled",
        }
      ];

      sampleSchedules.forEach(schedule => examSchedulesDB.add(schedule));
    }

    // Initialize sample results
    if (results.length === 0) {
      const sampleResults: ExamResult[] = [
        {
          id: "1",
          examId: "2",
          studentId: "STD001",
          studentName: "মোহাম্মদ আবদুল্লাহ",
          class: "আলিম দ্বিতীয় বর্ষ",
          subjectMarks: {
            "আরবি সাহিত্য": 85,
            "তাফসীর": 78,
            "হাদিস": 82,
            "ফিকহ": 75,
            "আকাইদ": 80,
            "ইংরেজি": 70
          },
          totalMarks: 600,
          obtainedMarks: 470,
          percentage: 78.33,
          grade: "A",
          status: "pass",
          position: 5,
        }
      ];

      sampleResults.forEach(result => examResultsDB.add(result));
    }
  };

  const calculateStats = () => {
    const totalExams = examinations.length;
    const upcomingExams = examinations.filter((exam: Examination) => exam.status === "upcoming").length;
    const completedExams = examinations.filter((exam: Examination) => exam.status === "completed").length;
    const totalResults = results.length;
    const passedStudents = results.filter((result: ExamResult) => result.status === "pass").length;
    const averageMarks = results.length > 0 
      ? results.reduce((sum: number, result: ExamResult) => sum + result.percentage, 0) / results.length 
      : 0;

    setStats({
      totalExams,
      upcomingExams,
      completedExams,
      totalResults,
      passedStudents,
      averageMarks: Math.round(averageMarks * 10) / 10,
      lastUpdated: new Date(),
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refreshExams(), refreshSchedules(), refreshResults()]);
    calculateStats();
    addNotification("success", "ডেটা আপডেট", "পরীক্ষার তথ্য সফলভাবে আপডেট হয়েছে");
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleCreateExam = async () => {
    if (!newExam.name || !newExam.type || !newExam.class || !newExam.startDate || !newExam.endDate) {
      addNotification("error", "ত্রুটি", "সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন");
      return;
    }

    try {
      const exam: Examination = {
        id: Date.now().toString(),
        name: newExam.name,
        type: newExam.type as any,
        class: newExam.class,
        startDate: newExam.startDate,
        endDate: newExam.endDate,
        totalMarks: parseInt(newExam.totalMarks) || 500,
        passingMarks: parseInt(newExam.passingMarks) || 250,
        status: "upcoming",
        subjects: newExam.subjects,
        createdBy: "admin-001",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const success = await addExam(exam);
      if (success) {
        setIsCreateExamOpen(false);
        setNewExam({
          name: "",
          type: "",
          class: "",
          startDate: "",
          endDate: "",
          totalMarks: "",
          passingMarks: "",
          subjects: [],
        });
        addNotification("success", "পরীক্ষা তৈরি", "নতুন পরীক্ষা সফলভাবে তৈরি হয়েছে");
      }
    } catch (error) {
      addNotification("error", "ত্রুটি", "পরীক্ষা তৈরিতে সমস্যা হয়েছে");
    }
  };

  const handleCreateSchedule = async () => {
    if (!newSchedule.examId || !newSchedule.subject || !newSchedule.date || !newSchedule.startTime) {
      addNotification("error", "ত্রুটি", "সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন");
      return;
    }

    try {
      const exam = examinations.find((e: Examination) => e.id === newSchedule.examId);
      const schedule: ExamSchedule = {
        id: Date.now().toString(),
        examId: newSchedule.examId,
        examName: exam?.name || "",
        subject: newSchedule.subject,
        date: newSchedule.date,
        startTime: newSchedule.startTime,
        endTime: newSchedule.endTime,
        room: newSchedule.room,
        marks: parseInt(newSchedule.marks) || 100,
        invigilator: newSchedule.invigilator,
        status: "scheduled",
      };

      const success = await addSchedule(schedule);
      if (success) {
        setIsCreateScheduleOpen(false);
        setNewSchedule({
          examId: "",
          subject: "",
          date: "",
          startTime: "",
          endTime: "",
          room: "",
          marks: "",
          invigilator: "",
        });
        addNotification("success", "সময়সূচি যোগ", "নতুন পরীক্ষার সময়সূচি যোগ করা হয়েছে");
      }
    } catch (error) {
      addNotification("error", "ত্রুটি", "সময়সূচি যোগ করতে সমস্যা হয়েছে");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getExamTypeText = (type: string) => {
    switch (type) {
      case "annual":
        return "বার্ষিক";
      case "half_yearly":
        return "ষাণ্মাসিক";
      case "quarterly":
        return "ত্রৈমাসিক";
      case "monthly":
        return "মাসিক";
      default:
        return type;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "আসন্ন";
      case "ongoing":
        return "চলমান";
      case "completed":
        return "সম্পন্ন";
      case "scheduled":
        return "নির্ধারিত";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              পরীক্ষা ব্যবস্থাপনা
            </h1>
            <p className="text-gray-600 mt-1">
              পরীক্ষার সময়সূচি এবং ফলাফল ব্যবস্থাপনা
            </p>
            <p className="text-sm text-gray-500 mt-1">
              শেষ আপডেট: {stats.lastUpdated.toLocaleString('bn-BD')}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              রিফ্রেশ
            </Button>
            <Dialog
              open={isCreateScheduleOpen}
              onOpenChange={setIsCreateScheduleOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  সময়সূচি যোগ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>নতুন পরীক্ষার সময়সূচি</DialogTitle>
                  <DialogDescription>
                    পরীক্ষার ���ময়সূচির বিস্তারিত তথ্য প্রদান করুন
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="scheduleExam">পরীক্ষা নির্বাচন</Label>
                    <Select
                      value={newSchedule.examId}
                      onValueChange={(value) => setNewSchedule({ ...newSchedule, examId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="পরীক্ষা নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {examinations.map((exam: Examination, index: number) => (
                          <SelectItem key={`exam-select-${exam.id}-${index}`} value={exam.id}>
                            {exam.name} - {exam.class}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="scheduleSubject">বিষয়</Label>
                    <Input
                      id="scheduleSubject"
                      value={newSchedule.subject}
                      onChange={(e) => setNewSchedule({ ...newSchedule, subject: e.target.value })}
                      placeholder="বিষয়ের না��"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="scheduleDate">তারিখ</Label>
                      <Input
                        id="scheduleDate"
                        type="date"
                        value={newSchedule.date}
                        onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scheduleRoom">কক্ষ</Label>
                      <Input
                        id="scheduleRoom"
                        value={newSchedule.room}
                        onChange={(e) => setNewSchedule({ ...newSchedule, room: e.target.value })}
                        placeholder="১০১"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="scheduleStartTime">শুরুর সময়</Label>
                      <Input
                        id="scheduleStartTime"
                        type="time"
                        value={newSchedule.startTime}
                        onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scheduleEndTime">শেষের সময়</Label>
                      <Input
                        id="scheduleEndTime"
                        type="time"
                        value={newSchedule.endTime}
                        onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="scheduleMarks">নম্বর</Label>
                      <Input
                        id="scheduleMarks"
                        type="number"
                        value={newSchedule.marks}
                        onChange={(e) => setNewSchedule({ ...newSchedule, marks: e.target.value })}
                        placeholder="১০০"
                      />
                    </div>
                    <div>
                      <Label htmlFor="scheduleInvigilator">পরীক্ষক</Label>
                      <Input
                        id="scheduleInvigilator"
                        value={newSchedule.invigilator}
                        onChange={(e) => setNewSchedule({ ...newSchedule, invigilator: e.target.value })}
                        placeholder="উস্তাদের নাম"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleCreateSchedule}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    সময়সূচি যোগ করুন
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isCreateExamOpen} onOpenChange={setIsCreateExamOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  নতুন পরীক্ষা
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>নতুন পরীক্ষা তৈরি করুন</DialogTitle>
                  <DialogDescription>
                    পরীক্ষ���র বিস্তারিত তথ্য প্রদান করুন
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="examName">পরীক্ষার নাম</Label>
                    <Input
                      id="examName"
                      value={newExam.name}
                      onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
                      placeholder="পরীক্ষার নাম লিখুন"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="examType">পরীক্ষার ধরন</Label>
                      <Select
                        value={newExam.type}
                        onValueChange={(value) => setNewExam({ ...newExam, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="ধরন নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="annual">বার্ষিক</SelectItem>
                          <SelectItem value="half_yearly">ষাণ্মাসিক</SelectItem>
                          <SelectItem value="quarterly">ত্রৈমাসিক</SelectItem>
                          <SelectItem value="monthly">মাসিক</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="examClass">শ্রেণী</Label>
                      <Select
                        value={newExam.class}
                        onValueChange={(value) => setNewExam({ ...newExam, class: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="শ্রেণী নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="আলিম প্রথম বর্ষ">আলিম প্রথম বর্ষ</SelectItem>
                          <SelectItem value="আলিম দ্বিতীয় বর্ষ">আলিম দ্বিতীয় বর্ষ</SelectItem>
                          <SelectItem value="ফাজিল প্রথম বর্ষ">ফাজিল প্রথম বর্ষ</SelectItem>
                          <SelectItem value="ফাজিল দ্বিতীয় বর্ষ">ফাজিল দ্বিতীয় বর্ষ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">শুরুর তারিখ</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newExam.startDate}
                        onChange={(e) => setNewExam({ ...newExam, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">শেষের তারিখ</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newExam.endDate}
                        onChange={(e) => setNewExam({ ...newExam, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="totalMarks">পূর্ণ নম্বর</Label>
                      <Input
                        id="totalMarks"
                        type="number"
                        value={newExam.totalMarks}
                        onChange={(e) => setNewExam({ ...newExam, totalMarks: e.target.value })}
                        placeholder="৫০০"
                      />
                    </div>
                    <div>
                      <Label htmlFor="passingMarks">পাশের নম্বর</Label>
                      <Input
                        id="passingMarks"
                        type="number"
                        value={newExam.passingMarks}
                        onChange={(e) => setNewExam({ ...newExam, passingMarks: e.target.value })}
                        placeholder="২৫০"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleCreateExam}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    পরীক্ষা তৈরি করুন
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    মোট পরীক্ষা
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {examsLoading ? (
                      <Activity className="h-6 w-6 animate-spin" />
                    ) : (
                      stats.totalExams
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    আসন্ন পরীক্ষা
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.upcomingExams}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    সম্পন্ন পরীক্ষা
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.completedExams}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট ফলাফল</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalResults}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    পাস শিক্ষার্থী
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.passedStudents}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-8 h-8 text-indigo-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">গড় নম্বর</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.averageMarks}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Examinations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>সাম্প্রতিক পরীক্ষাসমূহ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {examsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Activity className="h-8 w-8 animate-spin text-islamic-green" />
                  <span className="ml-2">লোড হচ্ছে...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {examinations.slice(0, 5).map((exam: Examination, index: number) => (
                    <div key={`recent-exam-${exam.id}-${index}`} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {exam.name}
                        </h3>
                        <Badge className={getStatusColor(exam.status)}>
                          {getStatusText(exam.status)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">ধরন:</span>{" "}
                          {getExamTypeText(exam.type)}
                        </div>
                        <div>
                          <span className="font-medium">শ্��েণী:</span>{" "}
                          {exam.class}
                        </div>
                        <div>
                          <span className="font-medium">শুরু:</span>{" "}
                          {new Date(exam.startDate).toLocaleDateString("bn-BD")}
                        </div>
                        <div>
                          <span className="font-medium">শেষ:</span>{" "}
                          {new Date(exam.endDate).toLocaleDateString("bn-BD")}
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          বিস্তারিত
                        </Button>
                        {exam.status === "completed" && (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            ফলাফল
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Schedules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                <span>আসন্ন পরীক্ষার সময়সূচি</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {schedulesLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Activity className="h-8 w-8 animate-spin text-islamic-green" />
                  <span className="ml-2">লোড হচ্ছে...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {schedules.slice(0, 5).map((schedule: ExamSchedule, index: number) => (
                    <div key={`schedule-${schedule.id}-${index}`} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {schedule.subject}
                        </h3>
                        <Badge variant="outline">{schedule.marks} নম্বর</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">তারিখ:</span>{" "}
                          {new Date(schedule.date).toLocaleDateString("bn-BD")}
                        </div>
                        <div>
                          <span className="font-medium">সময়:</span>{" "}
                          {schedule.startTime} - {schedule.endTime}
                        </div>
                        <div>
                          <span className="font-medium">কক্ষ:</span>{" "}
                          {schedule.room}
                        </div>
                        <div>
                          <span className="font-medium">পরীক্ষক:</span>{" "}
                          {schedule.invigilator}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* All Examinations */}
        <Card>
          <CardHeader>
            <CardTitle>সমস্ত পরীক্ষা</CardTitle>
            <CardDescription>
              সকল পরীক্ষার তালিকা এবং বিস্তারিত তথ্য
            </CardDescription>
          </CardHeader>
          <CardContent>
            {examsLoading ? (
              <div className="flex justify-center items-center py-8">
                <Activity className="h-8 w-8 animate-spin text-islamic-green" />
                <span className="ml-2">লোড হচ্ছে...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">পরীক্ষার নাম</th>
                      <th className="text-left p-2">ধরন</th>
                      <th className="text-left p-2">শ্রেণী</th>
                      <th className="text-left p-2">শুরুর তারিখ</th>
                      <th className="text-left p-2">শেষের তারিখ</th>
                      <th className="text-left p-2">অবস্থা</th>
                      <th className="text-left p-2">কার্যক্রম</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examinations.map((exam: Examination, index: number) => (
                      <tr key={`exam-table-${exam.id}-${index}`} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{exam.name}</td>
                        <td className="p-2">{getExamTypeText(exam.type)}</td>
                        <td className="p-2">{exam.class}</td>
                        <td className="p-2">
                          {new Date(exam.startDate).toLocaleDateString("bn-BD")}
                        </td>
                        <td className="p-2">
                          {new Date(exam.endDate).toLocaleDateString("bn-BD")}
                        </td>
                        <td className="p-2">
                          <Badge className={getStatusColor(exam.status)}>
                            {getStatusText(exam.status)}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {exam.status === "completed" && (
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExaminationDashboard;
