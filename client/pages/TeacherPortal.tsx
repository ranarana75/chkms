import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Mosque,
  Plus,
  Edit,
  Eye
} from "lucide-react";

export default function TeacherPortal() {
  const teacherData = {
    name: "উস্তাদ আবদুর রহমান",
    id: "TCH001",
    subjects: ["আরবি সাহিত্য", "তাফসীর"],
    classes: ["আলিম প্��থম", "আলিম দ্বিতীয়"],
    photo: "/placeholder.svg"
  };

  const todayClasses = [
    { subject: "আরবি সাহিত্য", class: "আলিম প্রথম", time: "৯:০০ - ১০:০০", room: "১০১", status: "সম্পন্ন" },
    { subject: "তাফসীর", class: "আলিম দ্বিতীয়", time: "১১:০০ - ১২:০০", room: "২০৫", status: "চলমান" },
    { subject: "আরবি সাহিত্য", class: "আলিম প্রথম", time: "২:০০ - ৩:০০", room: "১০১", status: "আসন্ন" }
  ];

  const recentActivities = [
    { type: "marks", description: "আলিম প্রথম বর্ষের আরবি সাহিত্যের মার্কস এন্ট্রি", time: "২ ঘন্টা আগে" },
    { type: "attendance", description: "তাফসীর ক্লাসের উপস্থিতি নিয়েছেন", time: "৪ ঘন্টা আগে" },
    { type: "homework", description: "নতুন হোমওয়ার্ক দিয়েছেন", time: "১ দিন আগে" }
  ];

  const pendingTasks = [
    { task: "আলিম দ্বিতী���় বর্ষের মাসিক পরীক্ষার প্রশ্নপত্র তৈরি", priority: "উচ্চ", deadline: "১৮ ডিসেম্বর" },
    { task: "উপস্থিতি রিপোর্ট জমা দিন", priority: "মধ্যম", deadline: "২০ ডিসেম্বর" },
    { task: "ছাত্রদের পারফরম্যান্স রিভিউ", priority: "নিম্ন", deadline: "২৫ ডিসেম্বর" }
  ];

  const classStatistics = [
    { class: "আলিম প্রথম", students: 35, attendance: 85, avgMarks: 78 },
    { class: "আলিম দ্বিতীয়", students: 28, attendance: 90, avgMarks: 82 }
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
                  <Mosque className="h-6 w-6 text-white" />
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
              <Link to="#students" className="text-gray-600 hover:text-islamic-green transition-colors">শিক্ষার্থী</Link>
              <Link to="#marks" className="text-gray-600 hover:text-islamic-green transition-colors">মার্কস</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
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
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button className="h-20 flex flex-col space-y-2 bg-islamic-green hover:bg-islamic-green-dark">
            <ClipboardList className="h-6 w-6" />
            <span className="text-sm">উপস্থিতি নিন</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 bg-islamic-blue hover:bg-islamic-blue-dark">
            <Edit className="h-6 w-6" />
            <span className="text-sm">মার্কস এন্ট্রি</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 bg-islamic-gold hover:bg-islamic-gold/80">
            <Plus className="h-6 w-6" />
            <span className="text-sm">হোমওয়ার্ক দিন</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 bg-purple-600 hover:bg-purple-700">
            <FileText className="h-6 w-6" />
            <span className="text-sm">রিপোর্ট দেখুন</span>
          </Button>
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
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-300">উপস্থিতির হার</p>
                          <p className="text-lg font-bold text-islamic-green">{stat.attendance}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-300">গড় নম্বর</p>
                          <p className="text-lg font-bold text-islamic-blue">{stat.avgMarks}</p>
                        </div>
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
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        {task.task}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        শেষ তারিখ: {task.deadline}
                      </p>
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
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'marks' ? 'bg-islamic-blue/10 text-islamic-blue' :
                        activity.type === 'attendance' ? 'bg-islamic-green/10 text-islamic-green' :
                        'bg-islamic-gold/10 text-islamic-gold'
                      }`}>
                        {activity.type === 'marks' ? <FileText className="h-4 w-4" /> :
                         activity.type === 'attendance' ? <Users className="h-4 w-4" /> :
                         <BookOpen className="h-4 w-4" />}
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
                  <Mosque className="h-5 w-5 text-islamic-green" />
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
