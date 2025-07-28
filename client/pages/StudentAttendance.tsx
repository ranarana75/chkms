import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  CheckCircle, 
  XCircle,
  Clock,
  TrendingUp,
  School
} from "lucide-react";

export default function StudentAttendance() {
  const [selectedMonth, setSelectedMonth] = useState("2024-12");
  const [attendanceData, setAttendanceData] = useState([]);
  const [summary, setSummary] = useState({ totalDays: 0, presentDays: 0, absentDays: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendanceData();
  }, [selectedMonth]);

  const loadAttendanceData = () => {
    setLoading(true);
    // Mock data load
    setTimeout(() => {
      const daysInMonth = 30;
      const mockData = [];
      let presentCount = 0;
      
      for (let day = 1; day <= daysInMonth; day++) {
        const isPresent = Math.random() > 0.1; // 90% attendance rate
        if (isPresent) presentCount++;
        
        mockData.push({
          date: `${selectedMonth}-${day.toString().padStart(2, '0')}`,
          status: isPresent ? 'present' : 'absent',
          subjects: [
            { name: "আরবি সাহিত্য", status: isPresent ? 'present' : 'absent', time: "৮:০০-৯:০০" },
            { name: "ইসলামিক স্টাডিজ", status: isPresent ? 'present' : 'absent', time: "৯:০০-১০:০০" },
            { name: "বাংলা", status: isPresent ? 'present' : 'absent', time: "১০:০০-১১:০০" },
            { name: "গণিত", status: isPresent ? 'present' : 'absent', time: "১১:০০-১২:০০" }
          ]
        });
      }
      
      setAttendanceData(mockData);
      setSummary({
        totalDays: daysInMonth,
        presentDays: presentCount,
        absentDays: daysInMonth - presentCount
      });
      setLoading(false);
    }, 1000);
  };

  const getAttendanceColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-50';
      case 'absent': return 'text-red-600 bg-red-50';
      case 'late': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const attendancePercentage = summary.totalDays > 0 
    ? ((summary.presentDays / summary.totalDays) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-green-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/student" className="inline-flex items-center text-islamic-green hover:text-islamic-green-dark transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              ড্যাশবোর্ডে ফিরে যান
            </Link>
            <div className="flex items-center space-x-2">
              <School className="h-6 w-6 text-islamic-green" />
              <span className="font-bold text-islamic-green">CHKMS</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">উপস্থিতির বিবরণ</h1>
          <p className="text-gray-600">মাসিক উপস্থিতি এবং ক্লাসের রেকর্ড</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-islamic-green" />
                <div>
                  <p className="text-2xl font-bold text-islamic-green">{attendancePercentage}%</p>
                  <p className="text-sm text-gray-600">উপস্থিতির হার</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-islamic-blue" />
                <div>
                  <p className="text-2xl font-bold text-islamic-blue">{summary.presentDays}</p>
                  <p className="text-sm text-gray-600">উপস্থিত দিন</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <XCircle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-600">{summary.absentDays}</p>
                  <p className="text-sm text-gray-600">অনুপস্থিত দিন</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-gray-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-8 w-8 text-gray-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-600">{summary.totalDays}</p>
                  <p className="text-sm text-gray-600">মোট ক্লাস দ���ন</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Month Selection */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>মাস নির্বাচন করুন</CardTitle>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-12">ডিসেম্বর ২০২৪</SelectItem>
                    <SelectItem value="2024-11">নভেম্বর ২০২৪</SelectItem>
                    <SelectItem value="2024-10">অক্টোবর ২০২৪</SelectItem>
                    <SelectItem value="2024-09">সেপ্টেম্বর ২০২৪</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Attendance Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Attendance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-islamic-blue" />
                <span>দৈনিক উপস্থিতি</span>
              </CardTitle>
              <CardDescription>
                {selectedMonth} মাসের দৈনিক উপস্থিতির বিস্তারিত
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-islamic-green mx-auto"></div>
                  <p className="mt-2 text-gray-600">লোড হচ্ছে...</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {attendanceData.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${getAttendanceColor(day.status)}`}>
                          {day.status === 'present' ? 
                            <CheckCircle className="h-4 w-4" /> : 
                            <XCircle className="h-4 w-4" />
                          }
                        </div>
                        <div>
                          <p className="font-medium">{day.date}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(day.date).toLocaleDateString('bn-BD', { weekday: 'long' })}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={day.status === 'present' ? 'default' : 'destructive'}
                        className={day.status === 'present' ? 'bg-islamic-green hover:bg-islamic-green-dark' : ''}
                      >
                        {day.status === 'present' ? 'উপস্থিত' : 'অনুপস্থিত'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Subject-wise Attendance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-islamic-gold" />
                <span>বিষয়ভিত্তিক উ���স্থিতি</span>
              </CardTitle>
              <CardDescription>
                প্রতিটি বিষয়ে আলাদা উপস্থিতির হিসাব
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "আরবি সাহিত্য", present: 28, total: 30, time: "৮:০০-৯:০০" },
                  { name: "ইসলামিক স্টাডিজ", present: 29, total: 30, time: "৯:০০-১০:০০" },
                  { name: "বাংলা", present: 27, total: 30, time: "১০:০০-১১:০০" },
                  { name: "গণিত", present: 26, total: 30, time: "১১:০০-১২:০০" }
                ].map((subject, index) => {
                  const percentage = ((subject.present / subject.total) * 100).toFixed(1);
                  return (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{subject.name}</h3>
                          <p className="text-sm text-gray-600">{subject.time}</p>
                        </div>
                        <Badge className="bg-islamic-blue text-white">
                          {percentage}%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>উপস্থিত: {subject.present}/{subject.total}</span>
                        <span>অনুপস্থিত: {subject.total - subject.present}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-islamic-blue h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Download Report */}
        <div className="mt-8 text-center">
          <Button className="bg-islamic-green hover:bg-islamic-green-dark">
            <CalendarIcon className="h-4 w-4 mr-2" />
            উপস্থিতির রিপোর্ট ডাউনলোড করুন
          </Button>
        </div>
      </div>
    </div>
  );
}
