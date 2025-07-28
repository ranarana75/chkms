import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Users, 
  Bell,
  LogOut,
  ClipboardList,
  GraduationCap,
  FileText,
  School,
  Plus,
  Edit,
  Eye,
  RefreshCw,
  Activity,
  CheckCircle,
  Target,
  TrendingUp
} from "lucide-react";
import { useLocalData, useNotifications } from "@/hooks/useLocalData";
import { studentsDB, teachersDB } from "@shared/localDatabase";
import { useState, useEffect } from "react";

export default function TeacherPortal() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isMarkAttendanceOpen, setIsMarkAttendanceOpen] = useState(false);
  const [isAddMarksOpen, setIsAddMarksOpen] = useState(false);
  const [isAddHomeworkOpen, setIsAddHomeworkOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState({
    class: "",
    subject: "",
    date: new Date().toISOString().split('T')[0],
    students: [],
  });
  const [marksData, setMarksData] = useState({
    class: "",
    subject: "",
    examType: "",
    totalMarks: "",
    studentMarks: [],
  });
  const [homeworkData, setHomeworkData] = useState({
    class: "",
    subject: "",
    title: "",
    description: "",
    dueDate: "",
    instructions: "",
  });

  const { notifications, addNotification } = useNotifications();
  const { data: students, loading: studentsLoading, refresh: refreshStudents } = useLocalData(studentsDB as any);
  const { data: teachers, loading: teachersLoading } = useLocalData(teachersDB as any);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const teacherData = {
    name: "উস্তাদ আবদুর রহমান",
    id: "TCH001",
    subjects: ["আরবি সাহিত্য", "তাফসীর", "হাদিস"],
    classes: ["আলিম প্রথম", "আলিম দ্বিতীয়", "ফাজিল প্রথম"],
    photo: "/placeholder.svg"
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshStudents();
    addNotification("success", "ডেটা আপডেট", "ক্লাস ও শিক্ষার্থীর তথ্য আপডেট হয়েছে");
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const todayClasses = [
    { 
      subject: "আরবি সাহিত্য", 
      class: "আলিম প্রথম", 
      time: "৯:০০ - ১০:০০", 
      room: "১০১", 
      status: "সম্পন্ন",
      attendance: "৩২/৩৫",
      progress: 91
    },
    { 
      subject: "তাফসীর", 
      class: "আলিম দ্বিতীয়", 
      time: "১১:০০ - ১২:০০", 
      room: "২০৫", 
      status: "চলমান",
      attendance: "২৮/৩০",
      progress: 93
    },
    { 
      subject: "হাদিস", 
      class: "ফাজিল প্রথম", 
      time: "২:০০ - ৩:০০", 
      room: "৩০২", 
      status: "আসন্ন",
      attendance: "২৫/২৭",
      progress: 89
    }
  ];

  const recentActivities = [
    { 
      type: "marks", 
      description: "আলিম প্রথম বর্ষের আরবি সাহিত্যের মাসিক পরীক্ষার নম্বর এন্ট্রি সম্পন্ন", 
      time: "২ ঘন্টা আগে",
      icon: <FileText className="h-4 w-4" />
    },
    { 
      type: "attendance", 
      description: "তাফসীর ক্লাসের উপস্থিতি নিয়েছেন - ৯৩% উপস্থিতি", 
      time: "৪ ঘন্টা আগে",
      icon: <Users className="h-4 w-4" />
    },
    { 
      type: "homework", 
      description: "আলিম দ্বিতীয় বর্ষের জন্য নতুন হোমওয়ার্ক দিয়েছেন", 
      time: "১ দিন আগে",
      icon: <BookOpen className="h-4 w-4" />
    },
    { 
      type: "lesson", 
      description: "হাদিস শরীফের নতুন পাঠ পরিকল্পনা তৈরি করেছেন", 
      time: "২ দিন আগে",
      icon: <GraduationCap className="h-4 w-4" />
    }
  ];

  const pendingTasks = [
    { 
      task: "আলিম দ্বিতীয় বর্ষের মাসিক পরীক্ষার প্রশ্নপত্র তৈরি", 
      priority: "উচ্চ", 
      deadline: "১৮ ডিসেম্বর",
      progress: 60
    },
    { 
      task: "উপস্থিতি রিপোর্ট জমা দিন", 
      priority: "মধ্যম", 
      deadline: "২০ ডিসেম্বর",
      progress: 80
    },
    { 
      task: "ছাত্রদের পারফরম্যান্স রিভিউ সম্পন্ন করুন", 
      priority: "নিম্ন", 
      deadline: "২৫ ড���সেম্বর",
      progress: 25
    },
    { 
      task: "পরবর্তী সেমিস্টারের সিলেবাস প্রস্তুত করুন", 
      priority: "মধ্যম", 
      deadline: "৩০ ডিসেম্বর",
      progress: 40
    }
  ];

  const classStatistics = [
    { 
      class: "আলিম প্রথম", 
      students: students.filter((s: any) => s.class === "আলিম প্রথম বর্ষ").length || 35, 
      attendance: 85, 
      avgMarks: 78,
      assignments: 12,
      completed: 10
    },
    { 
      class: "আলিম দ্বিতীয়", 
      students: students.filter((s: any) => s.class === "আলিম দ্বিতীয় বর্ষ").length || 28, 
      attendance: 90, 
      avgMarks: 82,
      assignments: 15,
      completed: 13
    },
    { 
      class: "ফাজিল প্রথম", 
      students: students.filter((s: any) => s.class === "ফাজিল প্রথম বর্ষ").length || 27, 
      attendance: 88, 
      avgMarks: 85,
      assignments: 8,
      completed: 8
    }
  ];

  const handleMarkAttendance = () => {
    // Logic to mark attendance
    addNotification("success", "উপস্থিতি সংরক্ষিত", "আজকের ক্লাসের উপস্থিতি সফলভাবে সংরক্ষিত হয়েছে");
    setIsMarkAttendanceOpen(false);
  };

  const handleAddMarks = () => {
    // Logic to add marks
    addNotification("success", "নম্বর সংরক্ষিত", "পরীক্ষার নম্বর সফলভাবে সংরক্ষিত হয়েছে");
    setIsAddMarksOpen(false);
  };

  const handleAddHomework = () => {
    // Logic to add homework
    addNotification("success", "হোমওয়ার্ক প্রদান", "নতুন হোমওয়ার্ক সফলভাবে প্রদান করা হয়েছে");
    setIsAddHomeworkOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-green-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="p-2 bg-islamic-green rounded-lg">
                  <School className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-islamic-green-dark">CHKMS</h1>
                  <p className="text-xs text-muted-foreground">শিক্ষক পোর্টাল</p>
                </div>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="#dashboard" className="text-gray-600 hover:text-islamic-green transition-colors">ড্যাশবোর্ড</Link>
              <Link to="#classes" className="text-gray-600 hover:text-islamic-green transition-colors">ক্লাস</Link>
              <Link to="/student-portal" className="text-gray-600 hover:text-islamic-green transition-colors">শিক্ষার্থী</Link>
              <Link to="#marks" className="text-gray-600 hover:text-islamic-green transition-colors">মার্কস</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
                <Badge className="ml-1 bg-red-500 text-white px-1">{notifications.length}</Badge>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={teacherData.photo} alt={teacherData.name} />
                <AvatarFallback className="bg-islamic-blue text-white">
                  {teacherData.name.split(' ')[1]?.charAt(0) || 'উ'}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">
                  <LogOut className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={teacherData.photo} alt={teacherData.name} />
                <AvatarFallback className="bg-islamic-blue text-white text-xl">
                  {teacherData.name.split(' ')[1]?.charAt(0) || 'উ'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  আসসালামু আলাইকুম, {teacherData.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  বিষয়: {teacherData.subjects.join(", ")} • আইডি: {teacherData.id}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-300">বর্তমান সময়</p>
              <p className="text-lg font-bold text-islamic-green">
                {currentDateTime.toLocaleDateString('bn-BD')} • {currentDateTime.toLocaleTimeString('bn-BD')}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Dialog open={isMarkAttendanceOpen} onOpenChange={setIsMarkAttendanceOpen}>
            <DialogTrigger asChild>
              <Button className="h-20 flex flex-col space-y-2 bg-islamic-green hover:bg-islamic-green-dark">
                <ClipboardList className="h-6 w-6" />
                <span className="text-sm">উপস্থিতি নিন</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>উপস্থিতি নিন</DialogTitle>
                <DialogDescription>
                  ক্লাসের উপস্থিতি রেকর্ড করুন
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="attendanceClass">ক্লাস</Label>
                  <Select value={attendanceData.class} onValueChange={(value) => setAttendanceData({ ...attendanceData, class: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="ক্লাস নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherData.classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="attendanceSubject">বিষয়</Label>
                  <Select value={attendanceData.subject} onValueChange={(value) => setAttendanceData({ ...attendanceData, subject: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherData.subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="attendanceDate">তারিখ</Label>
                  <Input
                    id="attendanceDate"
                    type="date"
                    value={attendanceData.date}
                    onChange={(e) => setAttendanceData({ ...attendanceData, date: e.target.value })}
                  />
                </div>
                <Button onClick={handleMarkAttendance} className="w-full bg-islamic-green hover:bg-islamic-green-dark">
                  উপস্থিতি সংরক্ষণ ���রুন
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddMarksOpen} onOpenChange={setIsAddMarksOpen}>
            <DialogTrigger asChild>
              <Button className="h-20 flex flex-col space-y-2 bg-islamic-blue hover:bg-islamic-blue-dark">
                <Edit className="h-6 w-6" />
                <span className="text-sm">মার্কস এন্ট্রি</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>পরীক্ষার নম্বর এন্ট্রি</DialogTitle>
                <DialogDescription>
                  পরীক্ষার নম্বর প্রদান করুন
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="marksClass">ক্লাস</Label>
                  <Select value={marksData.class} onValueChange={(value) => setMarksData({ ...marksData, class: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="ক্লাস নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherData.classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="marksSubject">বিষয়</Label>
                  <Select value={marksData.subject} onValueChange={(value) => setMarksData({ ...marksData, subject: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherData.subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="examType">পরীক্ষার ধরন</Label>
                  <Select value={marksData.examType} onValueChange={(value) => setMarksData({ ...marksData, examType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="পরীক্ষার ধরন নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">মাসিক পরীক্ষা</SelectItem>
                      <SelectItem value="quarterly">ত্রৈমাসিক পরীক্ষা</SelectItem>
                      <SelectItem value="half-yearly">ষাণ্মাসিক পরীক্ষা</SelectItem>
                      <SelectItem value="annual">বার্ষিক পরীক্ষা</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="totalMarks">পূর্ণ নম্বর</Label>
                  <Input
                    id="totalMarks"
                    type="number"
                    value={marksData.totalMarks}
                    onChange={(e) => setMarksData({ ...marksData, totalMarks: e.target.value })}
                    placeholder="১০০"
                  />
                </div>
                <Button onClick={handleAddMarks} className="w-full bg-islamic-blue hover:bg-islamic-blue-dark">
                  নম্বর সংরক্ষণ করুন
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddHomeworkOpen} onOpenChange={setIsAddHomeworkOpen}>
            <DialogTrigger asChild>
              <Button className="h-20 flex flex-col space-y-2 bg-islamic-gold hover:bg-islamic-gold/80">
                <Plus className="h-6 w-6" />
                <span className="text-sm">হোমওয়ার্ক দিন</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>নতুন হোমওয়ার্ক প্রদান</DialogTitle>
                <DialogDescription>
                  হোমওয়ার্কের বিস্তারিত তথ্য প্রদান করুন
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="homeworkClass">ক্লাস</Label>
                  <Select value={homeworkData.class} onValueChange={(value) => setHomeworkData({ ...homeworkData, class: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="ক্লাস নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherData.classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="homeworkSubject">বিষয়</Label>
                  <Select value={homeworkData.subject} onValueChange={(value) => setHomeworkData({ ...homeworkData, subject: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherData.subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="homeworkTitle">হোমওয়ার্কের শিরোনাম</Label>
                  <Input
                    id="homeworkTitle"
                    value={homeworkData.title}
                    onChange={(e) => setHomeworkData({ ...homeworkData, title: e.target.value })}
                    placeholder="হোমওয়ার্কের শিরোনাম"
                  />
                </div>
                <div>
                  <Label htmlFor="homeworkDescription">বিবরণ</Label>
                  <Textarea
                    id="homeworkDescription"
                    value={homeworkData.description}
                    onChange={(e) => setHomeworkData({ ...homeworkData, description: e.target.value })}
                    placeholder="হোমওয়ার্কের বিস্তারিত বিবরণ"
                  />
                </div>
                <div>
                  <Label htmlFor="homeworkDueDate">জমার তারিখ</Label>
                  <Input
                    id="homeworkDueDate"
                    type="date"
                    value={homeworkData.dueDate}
                    onChange={(e) => setHomeworkData({ ...homeworkData, dueDate: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddHomework} className="w-full bg-islamic-gold hover:bg-islamic-gold/80">
                  হোমওয়ার্ক প্রদান করুন
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Link to="#reports" className="h-20 flex flex-col space-y-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg items-center justify-center transition-colors">
            <FileText className="h-6 w-6" />
            <span className="text-sm">রিপোর্ট দেখুন</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Classes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-islamic-blue" />
                    <span>আজকের ক্লাস</span>
                  </div>
                  <Badge variant="outline">{todayClasses.length} টি ক্লাস</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayClasses.map((classItem, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-gray-50 dark:bg-gray-800">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">{classItem.subject}</h3>
                          <Badge variant="outline" className="text-xs">{classItem.class}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {classItem.time} • রুম {classItem.room}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>উপস্থিতি: {classItem.attendance}</span>
                          <span>অগ্রগতি: {classItem.progress}%</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            classItem.status === 'সম্পন্ন' ? 'default' :
                            classItem.status === 'চলমান' ? 'destructive' : 'secondary'
                          }
                          className={
                            classItem.status === 'সম্পন্ন' ? 'bg-islamic-green hover:bg-islamic-green-dark' :
                            classItem.status === 'চলমান' ? 'bg-orange-600 hover:bg-orange-700' : ''
                          }
                        >
                          {classItem.status}
                        </Badge>
                        {classItem.status === 'চলমান' && (
                          <Button size="sm" className="bg-islamic-blue hover:bg-islamic-blue-dark">
                            যোগ দিন
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Class Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-islamic-green" />
                  <span>ক্লাসের পরিসংখ্যান</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classStatistics.map((stat, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-900 dark:text-white">{stat.class}</h3>
                        <Badge variant="outline">{stat.students} জন ছাত্র</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-gray-600 dark:text-gray-300">উপস্থিতির হার</p>
                          <p className="text-lg font-bold text-islamic-green">{stat.attendance}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-300">গড় নম্বর</p>
                          <p className="text-lg font-bold text-islamic-blue">{stat.avgMarks}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>অ্যাসাইনমেন্ট: {stat.completed}/{stat.assignments}</span>
                        <span className="flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3 text-green-600" />
                          <span>৯২% সম্পন্ন</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Pending Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ClipboardList className="h-5 w-5 text-islamic-gold" />
                  <span>অসম্পন্ন কাজ</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingTasks.map((task, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <Badge 
                          variant={
                            task.priority === 'উচ্চ' ? 'destructive' :
                            task.priority === 'মধ্যম' ? 'default' : 'secondary'
                          }
                          className={
                            task.priority === 'মধ্যম' ? 'bg-islamic-gold hover:bg-islamic-gold/80' : ''
                          }
                        >
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-gray-500">{task.progress}%</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        {task.task}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                        শেষ তারিখ: {task.deadline}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-islamic-blue h-1.5 rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-islamic-blue" />
                  <span>সাম্প্রতিক কার্যক্���ম</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'marks' ? 'bg-islamic-blue/10 text-islamic-blue' :
                        activity.type === 'attendance' ? 'bg-islamic-green/10 text-islamic-green' :
                        activity.type === 'homework' ? 'bg-islamic-gold/10 text-islamic-gold' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prayer Times */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <School className="h-5 w-5 text-islamic-green" />
                  <span>নামাজের সময়</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ফজর</span>
                    <span className="font-medium">৫:১৫</span>
                  </div>
                  <div className="flex justify-between">
                    <span>যোহর</span>
                    <span className="font-medium">১১:৫৫</span>
                  </div>
                  <div className="flex justify-between">
                    <span>আসর</span>
                    <span className="font-medium">৩:৩০</span>
                  </div>
                  <div className="flex justify-between">
                    <span>মাগরিব</span>
                    <span className="font-medium">৫:১০</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ইশা</span>
                    <span className="font-medium">৬:৩৫</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
