import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Target
} from "lucide-react";

export default function AdminPortal() {
  const adminData = {
    name: "ড. আবুল কালাম আজাদ",
    role: "প্রধান প্রশাসক",
    id: "ADM001",
    photo: "/placeholder.svg"
  };

  const dashboardStats = [
    { 
      title: "মোট শিক্ষার্থী", 
      value: "1,247", 
      change: "+12", 
      changeType: "increase",
      icon: <Users className="h-6 w-6" />
    },
    { 
      title: "শিক্ষক সংখ্যা", 
      value: "87", 
      change: "+3", 
      changeType: "increase",
      icon: <GraduationCap className="h-6 w-6" />
    },
    { 
      title: "মাসিক আয়", 
      value: "৳12,45,000", 
      change: "+8.5%", 
      changeType: "increase",
      icon: <DollarSign className="h-6 w-6" />
    },
    { 
      title: "বকেয়া ফি", 
      value: "৳2,35,000", 
      change: "-15%", 
      changeType: "decrease",
      icon: <AlertTriangle className="h-6 w-6" />
    }
  ];

  const recentActivities = [
    { type: "admission", description: "২৫ জন নতুন শিক্ষার্থী ভর্তি হয়েছে", time: "২ ঘন্টা আগে" },
    { type: "payment", description: "আজ ৳৫৪,০০০ ফি সংগ্রহ হয়েছে", time: "৪ ঘন্টা আগে" },
    { type: "staff", description: "নতুন আরবি শিক্ষক নিয়োগ দেওয়া হয়েছে", time: "১ দিন আগে" },
    { type: "event", description: "বার্ষিক ক্রীড়া প্রতিযোগিতার আয়োজন সম্পন্ন", time: "২ দিন আগে" }
  ];

  const pendingApprovals = [
    { type: "leave", description: "৫ জন শিক্ষকের ছুটির আবেদন", priority: "মধ্যম" },
    { type: "expense", description: "লাইব্রেরি সংস্কারের বাজেট অনুমোদন", priority: "উচ্চ" },
    { type: "admission", description: "১২ জন শিক্ষার্থীর ভর্তি আবেদন", priority: "উচ্চ" },
    { type: "transport", description: "নতুন বাস ক্রয়ের প্রস্তাব", priority: "নিম্ন" }
  ];

  const departmentOverview = [
    { name: "আলিম বিভাগ", students: 456, teachers: 25, performance: 92 },
    { name: "ফাজিল বিভাগ", students: 298, teachers: 18, performance: 89 },
    { name: "কামিল বিভাগ", students: 187, teachers: 15, performance: 95 },
    { name: "হিফজ বিভাগ", students: 306, teachers: 12, performance: 88 }
  ];

  const alerts = [
    { type: "warning", message: "সার্ভার রক্ষণাবেক্ষণ আগামীকাল রাত ১২টায়", priority: "মধ্যম" },
    { type: "success", message: "মাসিক ব্যাকআপ সফলভাবে সম্পন্ন হয়েছে", priority: "নিম্ন" },
    { type: "error", message: "লাইব্রেরি সিস্টেমে সাময়িক সমস্যা", priority: "উচ্চ" }
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
                  <p className="text-xs text-muted-foreground">প্রশাসনিক প্যানেল</p>
                </div>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="#dashboard" className="text-gray-600 hover:text-islamic-green transition-colors">ড্যাশবোর্ড</Link>
              <Link to="#students" className="text-gray-600 hover:text-islamic-green transition-colors">শিক্ষার্থী</Link>
              <Link to="#teachers" className="text-gray-600 hover:text-islamic-green transition-colors">শিক্ষক</Link>
              <Link to="#finance" className="text-gray-600 hover:text-islamic-green transition-colors">অর্থ</Link>
              <Link to="#reports" className="text-gray-600 hover:text-islamic-green transition-colors">রিপোর্ট</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
                <Badge className="ml-1 bg-red-500 text-white px-1">3</Badge>
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
              <p className="text-sm text-gray-600 dark:text-gray-300">আজকের তারিখ</p>
              <p className="text-lg font-bold text-islamic-green">১৫ ডিসেম্বর, ২০২৪</p>
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
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
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
          <Button className="h-20 flex flex-col space-y-2 bg-islamic-green hover:bg-islamic-green-dark">
            <UserPlus className="h-6 w-6" />
            <span className="text-sm">নতুন ভর্তি</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 bg-islamic-blue hover:bg-islamic-blue-dark">
            <GraduationCap className="h-6 w-6" />
            <span className="text-sm">শিক্ষক যোগ</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 bg-islamic-gold hover:bg-islamic-gold/80">
            <BarChart3 className="h-6 w-6" />
            <span className="text-sm">রিপোর্ট</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 bg-purple-600 hover:bg-purple-700">
            <Calendar className="h-6 w-6" />
            <span className="text-sm">ইভেন্ট</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 bg-orange-600 hover:bg-orange-700">
            <FileText className="h-6 w-6" />
            <span className="text-sm">নোটিশ</span>
          </Button>
          <Button className="h-20 flex flex-col space-y-2 bg-indigo-600 hover:bg-indigo-700">
            <Settings className="h-6 w-6" />
            <span className="text-sm">সেটিংস</span>
          </Button>
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
                        activity.type === 'payment' ? 'bg-islamic-gold/10 text-islamic-gold' :
                        activity.type === 'staff' ? 'bg-islamic-blue/10 text-islamic-blue' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {activity.type === 'admission' ? <UserPlus className="h-4 w-4" /> :
                         activity.type === 'payment' ? <DollarSign className="h-4 w-4" /> :
                         activity.type === 'staff' ? <Users className="h-4 w-4" /> :
                         <Calendar className="h-4 w-4" />}
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
                          alert.type === 'error' ? 'bg-red-100 text-red-600' :
                          alert.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {alert.type === 'error' ? <AlertTriangle className="h-3 w-3" /> :
                           alert.type === 'warning' ? <Clock className="h-3 w-3" /> :
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
                    <span>���াগরিব</span>
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
