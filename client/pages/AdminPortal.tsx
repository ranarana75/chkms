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
  Users, 
  GraduationCap, 
  Building2, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Bell,
  LogOut,
  Settings,
  BarChart3,
  UserPlus,
  FileText,
  Calendar,
  School,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  RefreshCw,
  Activity,
  Plus
} from "lucide-react";
import { useRealtimeStats, useNotifications, useLocalData } from "@/hooks/useLocalData";
import { studentsDB, teachersDB, noticesDB, eventsDB } from "@shared/localDatabase";
import { useState, useEffect } from "react";

export default function AdminPortal() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isCreateNoticeOpen, setIsCreateNoticeOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    type: "",
    priority: "",
    targetAudience: "",
  });
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    location: "",
    type: "",
    category: "",
  });

  const { stats, refresh: refreshStats } = useRealtimeStats();
  const { notifications, addNotification } = useNotifications();
  const { data: students, loading: studentsLoading } = useLocalData(studentsDB as any);
  const { data: teachers, loading: teachersLoading } = useLocalData(teachersDB as any);
  const { data: notices, addItem: addNotice } = useLocalData(noticesDB as any);
  const { data: events, addItem: addEvent } = useLocalData(eventsDB as any);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshStats();
    }, 30000);
    return () => clearInterval(interval);
  }, [refreshStats]);

  const adminData = {
    name: "ড. আবুল কালাম আজাদ",
    role: "প্রধান প্রশাসক",
    id: "ADM001",
    photo: "/placeholder.svg"
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshStats();
    addNotification("success", "ডেটা আপডেট", "সমস্ত তথ্য সফলভাবে আপডেট হয়েছে");
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleCreateNotice = async () => {
    try {
      const notice = {
        id: Date.now().toString(),
        title: newNotice.title,
        content: newNotice.content,
        type: newNotice.type,
        priority: newNotice.priority,
        targetAudience: newNotice.targetAudience,
        publishDate: new Date().toISOString(),
        publishedBy: adminData.id,
        isActive: true,
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const success = await addNotice(notice);
      if (success) {
        setIsCreateNoticeOpen(false);
        setNewNotice({
          title: "",
          content: "",
          type: "",
          priority: "",
          targetAudience: "",
        });
        addNotification("success", "নোটিশ প্রকাশিত", "নতুন নোটিশ সফলভাবে প্রকাশিত হয়েছে");
      }
    } catch (error) {
      addNotification("error", "ত্রুটি", "নোটিশ প্রকাশে সমস্যা হয়েছে");
    }
  };

  const handleCreateEvent = async () => {
    try {
      const event = {
        id: Date.now().toString(),
        title: newEvent.title,
        description: newEvent.description,
        startDate: newEvent.startDate,
        startTime: newEvent.startTime,
        location: newEvent.location,
        type: newEvent.type,
        category: newEvent.category,
        status: "scheduled",
        organizer: adminData.name,
        targetAudience: "all",
        isPublic: true,
        attendees: [],
        createdBy: adminData.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const success = await addEvent(event);
      if (success) {
        setIsCreateEventOpen(false);
        setNewEvent({
          title: "",
          description: "",
          startDate: "",
          startTime: "",
          location: "",
          type: "",
          category: "",
        });
        addNotification("success", "ইভেন্ট তৈরি", "নতুন ইভেন্ট সফলভাবে তৈরি হয়েছে");
      }
    } catch (error) {
      addNotification("error", "ত্রুটি", "ইভেন্ট তৈরিতে সমস্যা হয়েছে");
    }
  };

  const dashboardStats = [
    { 
      title: "মোট শিক্ষার্থী", 
      value: stats.totalStudents.toString(),
      change: "+৫ এই মাসে", 
      changeType: "increase",
      icon: <Users className="h-6 w-6" />
    },
    { 
      title: "শিক্ষক সংখ্যা", 
      value: stats.totalTeachers.toString(),
      change: "+২ নতু�� যোগদান", 
      changeType: "increase",
      icon: <GraduationCap className="h-6 w-6" />
    },
    { 
      title: "সক্রিয় নোটিশ", 
      value: stats.activeNotices.toString(),
      change: "আজ প্রকাশিত", 
      changeType: "increase",
      icon: <FileText className="h-6 w-6" />
    },
    { 
      title: "আসন্ন ইভেন্ট", 
      value: stats.upcomingEvents.toString(),
      change: `↗ ${Math.floor(Math.random() * 5) + 1}% বৃদ্ধি`, 
      changeType: "increase",
      icon: <Calendar className="h-6 w-6" />
    }
  ];

  const recentActivities = [
    { 
      type: "admission", 
      description: `${Math.floor(Math.random() * 15) + 10} জন নতুন শিক্ষার্থী ভর্তি হয়েছে`, 
      time: "২ ঘন্টা আগে",
      icon: <UserPlus className="h-4 w-4" />
    },
    { 
      type: "notice", 
      description: "নতুন পরীক্ষার সময়সূচি প্রকাশিত হয়েছে", 
      time: "৪ ঘন্টা আগে",
      icon: <FileText className="h-4 w-4" />
    },
    { 
      type: "staff", 
      description: "নতুন আরবি শিক্ষক নিয়োগ দেওয়া হয়েছে", 
      time: "১ দিন আগে",
      icon: <GraduationCap className="h-4 w-4" />
    },
    { 
      type: "event", 
      description: "বার্ষিক ক্রীড়া প্রতিযোগিতার আয়োজন সম্পন্ন", 
      time: "২ দিন আগে",
      icon: <Calendar className="h-4 w-4" />
    }
  ];

  const pendingApprovals = [
    { type: "leave", description: "৫ জন শিক্ষকের ছুটির আবেদন", priority: "মধ্যম", count: 5 },
    { type: "expense", description: "লাইব্রেরি সংস্কারের বাজেট অনুমোদন", priority: "উচ্চ", count: 1 },
    { type: "admission", description: `${stats.pendingApplications} জন শিক্ষার্থীর ভর্তি আবেদন`, priority: "উচ্চ", count: stats.pendingApplications },
    { type: "transport", description: "নতুন বাস ক্রয়ের প্রস্তাব", priority: "নিম্ন", count: 1 }
  ];

  const departmentOverview = [
    { name: "আলিম বিভাগ", students: Math.floor(stats.totalStudents * 0.4), teachers: Math.floor(stats.totalTeachers * 0.35), performance: 92 },
    { name: "ফাজিল বিভাগ", students: Math.floor(stats.totalStudents * 0.25), teachers: Math.floor(stats.totalTeachers * 0.25), performance: 89 },
    { name: "কামিল বিভাগ", students: Math.floor(stats.totalStudents * 0.15), teachers: Math.floor(stats.totalTeachers * 0.20), performance: 95 },
    { name: "হিফজ বিভাগ", students: Math.floor(stats.totalStudents * 0.20), teachers: Math.floor(stats.totalTeachers * 0.20), performance: 88 }
  ];

  const alerts = [
    { type: "info", message: "সিস্টেম ব্যাকআপ আজ রাত ১২টায় সম্পন্ন হবে", priority: "মধ্যম" },
    { type: "success", message: `গত ৭ দিনে ${stats.totalStudents} জন নতুন শিক্ষার্থী নিবন্ধিত হয়েছে`, priority: "নিম্ন" },
    { type: "warning", message: "পরীক্ষার ফলাফল প্রকাশের সময় ঘনিয়ে এসেছে", priority: "উচ্চ" }
  ];

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
                  <p className="text-xs text-muted-foreground">প্রশাসনিক প্যানেল</p>
                </div>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="#dashboard" className="text-gray-600 hover:text-islamic-green transition-colors">ড্যাশবোর্ড</Link>
              <Link to="/student-portal" className="text-gray-600 hover:text-islamic-green transition-colors">শিক্ষার্থী</Link>
              <Link to="/teacher-portal" className="text-gray-600 hover:text-islamic-green transition-colors">শিক্ষক</Link>
              <Link to="/finance" className="text-gray-600 hover:text-islamic-green transition-colors">অর্থ</Link>
              <Link to="#reports" className="text-gray-600 hover:text-islamic-green transition-colors">রিপোর্ট</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
                <Badge className="ml-1 bg-red-500 text-white px-1">{notifications.length}</Badge>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={adminData.photo} alt={adminData.name} />
                <AvatarFallback className="bg-islamic-gold text-white">
                  {adminData.name.split(' ')[1]?.charAt(0) || 'আ'}
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
                <AvatarImage src={adminData.photo} alt={adminData.name} />
                <AvatarFallback className="bg-islamic-gold text-white text-xl">
                  {adminData.name.split(' ')[1]?.charAt(0) || 'আ'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  আসসালামু আলাইকুম, {adminData.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {adminData.role} • আইডি: {adminData.id}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-300">বর্তমা�� সময়</p>
              <p className="text-lg font-bold text-islamic-green">
                {currentDateTime.toLocaleDateString('bn-BD')} • {currentDateTime.toLocaleTimeString('bn-BD')}
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {(studentsLoading || teachersLoading) ? (
                        <Activity className="h-8 w-8 animate-spin text-islamic-green" />
                      ) : (
                        stat.value
                      )}
                    </p>
                    <div className="flex items-center mt-2">
                      {stat.changeType === 'increase' ? (
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-islamic-green/10 rounded-full text-islamic-green">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Link to="/admission" className="h-20 flex flex-col space-y-2 bg-islamic-green hover:bg-islamic-green-dark text-white rounded-lg items-center justify-center transition-colors">
            <UserPlus className="h-6 w-6" />
            <span className="text-sm">নতুন ভর্তি</span>
          </Link>
          <Link to="/teacher-portal" className="h-20 flex flex-col space-y-2 bg-islamic-blue hover:bg-islamic-blue-dark text-white rounded-lg items-center justify-center transition-colors">
            <GraduationCap className="h-6 w-6" />
            <span className="text-sm">শিক্ষক যোগ</span>
          </Link>
          <Link to="/finance" className="h-20 flex flex-col space-y-2 bg-islamic-gold hover:bg-islamic-gold/80 text-white rounded-lg items-center justify-center transition-colors">
            <BarChart3 className="h-6 w-6" />
            <span className="text-sm">রিপোর্ট</span>
          </Link>
          <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
            <DialogTrigger asChild>
              <Button className="h-20 flex flex-col space-y-2 bg-purple-600 hover:bg-purple-700">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">ইভেন্ট</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>নতুন ইভেন্ট তৈরি করুন</DialogTitle>
                <DialogDescription>
                  ইভেন্টের বিস্তারিত তথ্য প্রদান করুন
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="eventTitle">ইভেন্টের নাম</Label>
                  <Input
                    id="eventTitle"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="ইভেন্টের নাম"
                  />
                </div>
                <div>
                  <Label htmlFor="eventDescription">বিবরণ</Label>
                  <Textarea
                    id="eventDescription"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="ইভেন্টের বিবরণ"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventDate">তারিখ</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={newEvent.startDate}
                      onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventTime">সময়</Label>
                    <Input
                      id="eventTime"
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="eventLocation">স্থান</Label>
                  <Input
                    id="eventLocation"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="ইভেন্টের স্থান"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventType">ধরন</Label>
                    <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="ধরন নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">সভা</SelectItem>
                        <SelectItem value="competition">প্রতিযোগিতা</SelectItem>
                        <SelectItem value="cultural">���াংস্কৃতিক</SelectItem>
                        <SelectItem value="sports">ক্রীড়া</SelectItem>
                        <SelectItem value="academic">একাডেমিক</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="eventCategory">বিভাগ</Label>
                    <Select value={newEvent.category} onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">শিক্ষা</SelectItem>
                        <SelectItem value="administrative">প্রশাসনিক</SelectItem>
                        <SelectItem value="islamic">ইসলামিক</SelectItem>
                        <SelectItem value="entertainment">বিনোদন</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleCreateEvent} className="w-full bg-purple-600 hover:bg-purple-700">
                  ইভেন্ট তৈরি করুন
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isCreateNoticeOpen} onOpenChange={setIsCreateNoticeOpen}>
            <DialogTrigger asChild>
              <Button className="h-20 flex flex-col space-y-2 bg-orange-600 hover:bg-orange-700">
                <FileText className="h-6 w-6" />
                <span className="text-sm">নোটিশ</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>নতুন নোটিশ প্রকাশ করুন</DialogTitle>
                <DialogDescription>
                  নোটিশের বিস্তারিত তথ্য প্রদান করুন
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="noticeTitle">নোটিশের শিরোনাম</Label>
                  <Input
                    id="noticeTitle"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    placeholder="নোটিশের শিরোনাম"
                  />
                </div>
                <div>
                  <Label htmlFor="noticeContent">বিবরণ</Label>
                  <Textarea
                    id="noticeContent"
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                    placeholder="নোটিশের বিস্তারিত বিবরণ"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="noticeType">ধরন</Label>
                    <Select value={newNotice.type} onValueChange={(value) => setNewNotice({ ...newNotice, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="ধরন নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">সাধারণ</SelectItem>
                        <SelectItem value="academic">একাডেমিক</SelectItem>
                        <SelectItem value="administrative">প্রশাসনিক</SelectItem>
                        <SelectItem value="urgent">জরুরি</SelectItem>
                        <SelectItem value="holiday">ছুটির দিন</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="noticePriority">অগ্রাধিকার</Label>
                    <Select value={newNotice.priority} onValueChange={(value) => setNewNotice({ ...newNotice, priority: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="অগ্রাধিকার নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">কম</SelectItem>
                        <SelectItem value="medium">মধ্যম</SelectItem>
                        <SelectItem value="high">উচ্চ</SelectItem>
                        <SelectItem value="urgent">জরুরি</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="noticeAudience">লক্ষ্য দর্শক</Label>
                  <Select value={newNotice.targetAudience} onValueChange={(value) => setNewNotice({ ...newNotice, targetAudience: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="দর্শক নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সকলে</SelectItem>
                      <SelectItem value="students">শিক্ষার্থী</SelectItem>
                      <SelectItem value="teachers">শিক্ষক</SelectItem>
                      <SelectItem value="parents">অভিভাবক</SelectItem>
                      <SelectItem value="staff">কর্মচারী</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreateNotice} className="w-full bg-orange-600 hover:bg-orange-700">
                  নোটিশ প্রকাশ করুন
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Link to="#settings" className="h-20 flex flex-col space-y-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg items-center justify-center transition-colors">
            <Settings className="h-6 w-6" />
            <span className="text-sm">সেটিংস</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Department Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-islamic-green" />
                  <span>বিভাগীয় পর্যালোচনা</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentOverview.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-gray-50 dark:bg-gray-800">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{dept.name}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-300">
                          <span>{dept.students} শিক্ষার্থী</span>
                          <span>{dept.teachers} শিক্ষক</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={dept.performance >= 90 ? "default" : "secondary"}
                          className={dept.performance >= 90 ? "bg-islamic-green hover:bg-islamic-green-dark" : ""}
                        >
                          {dept.performance}% পারফরম্যান্স
                        </Badge>
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
                  <span>সাম্প্রতিক কার্যক্রম</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'admission' ? 'bg-islamic-green/10 text-islamic-green' :
                        activity.type === 'notice' ? 'bg-islamic-gold/10 text-islamic-gold' :
                        activity.type === 'staff' ? 'bg-islamic-blue/10 text-islamic-blue' :
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
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* System Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span>সিস্টেম সতর্কতা</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-start space-x-2">
                        <div className={`p-1 rounded-full mt-0.5 ${
                          alert.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                          alert.type === 'info' ? 'bg-blue-100 text-blue-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {alert.type === 'warning' ? <AlertTriangle className="h-3 w-3" /> :
                           alert.type === 'info' ? <Clock className="h-3 w-3" /> :
                           <CheckCircle className="h-3 w-3" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {alert.message}
                          </p>
                          <Badge 
                            variant="outline" 
                            className={`mt-1 text-xs ${
                              alert.priority === 'উচ্চ' ? 'border-red-500 text-red-500' :
                              alert.priority === 'মধ্যম' ? 'border-orange-500 text-orange-500' :
                              'border-gray-500 text-gray-500'
                            }`}
                          >
                            {alert.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Approvals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-islamic-gold" />
                  <span>অনুমোদনের অপেক্ষায়</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingApprovals.map((approval, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <Badge 
                          variant={
                            approval.priority === 'উচ্চ' ? 'destructive' :
                            approval.priority === 'মধ্যম' ? 'default' : 'secondary'
                          }
                          className={
                            approval.priority === 'মধ্যম' ? 'bg-islamic-gold hover:bg-islamic-gold/80' : ''
                          }
                        >
                          {approval.priority}
                        </Badge>
                        <Badge variant="outline">{approval.count}</Badge>
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        {approval.description}
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-islamic-green hover:bg-islamic-green-dark text-xs">
                          অনুমোদন
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          বিস্তারিত
                        </Button>
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
