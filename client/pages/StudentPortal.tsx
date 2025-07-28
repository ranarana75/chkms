import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocalData } from "@/hooks/useLocalData";
import { studentsDB } from "@shared/localDatabase";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  Home,
  Bell,
  LogOut,
  User,
  CreditCard,
  FileText,
  Award,
  School,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Activity,
} from "lucide-react";

export default function StudentPortal() {
  const { data: students, loading: studentsLoading, refresh } = useLocalData(studentsDB);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Get current student (in real app, this would come from auth)
  const currentStudent = students.find(s => s.studentId === "STD001");

  const studentData = {
    name: currentStudent?.name || "মোহাম্মদ আবদুল্লাহ",
    id: currentStudent?.studentId || "STD001",
    class: currentStudent?.class || "আলিম প্রথম বর্ষ",
    section: currentStudent?.section || "ক",
    roll: currentStudent?.roll || "০৫",
    photo: currentStudent?.photo || "/placeholder.svg",
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Dynamic attendance calculation
  const [attendance, setAttendance] = useState({
    present: 85,
    total: 90,
    percentage: 94.4,
  });

  // Dynamic marks with real-time updates
  const [recentMarks, setRecentMarks] = useState([
    { subject: "আরবি সাহিত্য", marks: 85, total: 100, trend: "+৩" },
    { subject: "ইসলামিক স্টাডিজ", marks: 92, total: 100, trend: "+৫" },
    { subject: "বাংলা", marks: 78, total: 100, trend: "-২" },
    { subject: "গণিত", marks: 88, total: 100, trend: "+৭" },
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update attendance
      const present = Math.floor(Math.random() * 5) + 83;
      const total = Math.floor(Math.random() * 3) + 88;
      setAttendance({
        present,
        total,
        percentage: Math.round((present / total) * 100 * 10) / 10
      });

      // Occasionally update marks
      if (Math.random() > 0.7) {
        setRecentMarks(prev => prev.map(mark => ({
          ...mark,
          marks: Math.max(70, Math.min(100, mark.marks + (Math.random() > 0.5 ? 1 : -1))),
        })));
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const hifzProgress = {
    completed: 15,
    total: 30,
    currentSurah: "সূরা আল-বাকারা",
  };

  const upcomingEvents = [
    { title: "মাসিক পরীক্ষা", date: "১৫ ডিসেম্বর", type: "পরীক্ষা" },
    { title: "জুমার খুতবা", date: "১৮ ডিসেম্বর", type: "ইবাদত" },
    {
      title: "বার্ষিক ক্রীড়া প্রতিযোগিতা",
      date: "২২ ডিসেম্বর",
      type: "অনুষ্ঠান",
    },
  ];

  const feeStatus = {
    paid: 8500,
    due: 1500,
    total: 10000,
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
                  <h1 className="text-lg font-bold text-islamic-green-dark">
                    CHKMS
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    শিক্ষার্থী পোর্টাল
                  </p>
                </div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="#dashboard"
                className="text-gray-600 hover:text-islamic-green transition-colors"
              >
                ড্যাশবোর্ড
              </Link>
              <Link
                to="#marks"
                className="text-gray-600 hover:text-islamic-green transition-colors"
              >
                ফলাফল
              </Link>
              <Link
                to="#attendance"
                className="text-gray-600 hover:text-islamic-green transition-colors"
              >
                উপ��্থিতি
              </Link>
              <Link
                to="#fees"
                className="text-gray-600 hover:text-islamic-green transition-colors"
              >
                ফি
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={studentData.photo} alt={studentData.name} />
                <AvatarFallback className="bg-islamic-green text-white">
                  {studentData.name.charAt(0)}
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
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={studentData.photo} alt={studentData.name} />
              <AvatarFallback className="bg-islamic-green text-white text-xl">
                {studentData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-bengali-heading">
                আসসালামু আলাইকুম, {studentData.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 font-bengali-body">
                {studentData.class} • রোল: {studentData.roll} • আইডি:{" "}
                {studentData.id}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50 dark:bg-green-950">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-islamic-green" />
                <div>
                  <p className="text-2xl font-bold text-islamic-green">
                    {attendance.percentage}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    উপস্থিতি
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Award className="h-8 w-8 text-islamic-blue" />
                <div>
                  <p className="text-2xl font-bold text-islamic-blue">৮৫.৫</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    গড় নম্বর
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-islamic-gold" />
                <div>
                  <p className="text-2xl font-bold text-islamic-gold">
                    {hifzProgress.completed}/{hifzProgress.total}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    হিফজ পারা
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50 dark:bg-red-950">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    ৳{feeStatus.due}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    বকেয়া ফি
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Marks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-islamic-blue" />
                  <span>সাম্প্রতিক ফলাফল</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMarks.map((subject, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {subject.subject}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {subject.marks}/{subject.total}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            subject.marks >= 80
                              ? "default"
                              : subject.marks >= 60
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            subject.marks >= 80
                              ? "bg-islamic-green hover:bg-islamic-green-dark"
                              : subject.marks >= 60
                                ? "bg-islamic-gold hover:bg-islamic-gold"
                                : ""
                          }
                        >
                          {Math.round((subject.marks / subject.total) * 100)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hifz Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-islamic-green" />
                  <span>হিফজ অগ্রগতি</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <span>সম্পন্ন পারা</span>
                      <span>
                        {hifzProgress.completed}/{hifzProgress.total}
                      </span>
                    </div>
                    <Progress
                      value={
                        (hifzProgress.completed / hifzProgress.total) * 100
                      }
                      className="h-3"
                    />
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <p className="text-sm font-medium text-islamic-green">
                      বর্তমান অধ্যয়ন:
                    </p>
                    <p className="text-lg font-bold text-islamic-green-dark dark:text-islamic-green">
                      {hifzProgress.currentSurah}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-islamic-blue" />
                  <span>আসন্ন ইভেন্ট</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {event.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {event.date}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fee Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-islamic-gold" />
                  <span>ফি পরিস্থিতি</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-300">
                        পরিশোধিত
                      </span>
                      <span className="font-medium text-islamic-green">
                        ৳{feeStatus.paid}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-300">
                        বকেয়া
                      </span>
                      <span className="font-medium text-red-600">
                        ৳{feeStatus.due}
                      </span>
                    </div>
                    <Progress
                      value={(feeStatus.paid / feeStatus.total) * 100}
                      className="h-2"
                    />
                  </div>
                  {feeStatus.due > 0 && (
                    <Button className="w-full bg-islamic-gold hover:bg-islamic-gold/80 text-white">
                      ফি পরিশোধ করুন
                    </Button>
                  )}
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
