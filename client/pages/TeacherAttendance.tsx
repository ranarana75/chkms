import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Check, 
  X, 
  Clock,
  Users,
  Calendar,
  Save,
  Search,
  School
} from "lucide-react";

export default function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const classes = [
    { id: "CLS001", name: "আলিম প্রথম - ক", subject: "আরবি সাহিত্য" },
    { id: "CLS002", name: "আলিম দ্বিতীয় - খ", subject: "তাফসীর" },
    { id: "CLS003", name: "আলিম প্রথম - খ", subject: "আরবি সাহিত্য" }
  ];

  const subjects = ["আরবি সাহিত্য", "তাফসীর", "হাদিস", "ফিকহ"];

  useEffect(() => {
    if (selectedClass) {
      loadStudents();
    }
  }, [selectedClass]);

  const loadStudents = () => {
    setLoading(true);
    // Mock data load
    setTimeout(() => {
      const mockStudents = [
        { id: "STD001", name: "মোহাম্মদ আবদুল্লাহ", roll: "০১", photo: "/placeholder.svg" },
        { id: "STD002", name: "আবুল কাসেম", roll: "০২", photo: "/placeholder.svg" },
        { id: "STD003", name: "মোহাম্মদ ইব্রাহিম", roll: "০৩", photo: "/placeholder.svg" },
        { id: "STD004", name: "আবদুর রহমান", roll: "০৪", photo: "/placeholder.svg" },
        { id: "STD005", name: "মোহাম্মদ হাসান", roll: "০৫", photo: "/placeholder.svg" },
        { id: "STD006", name: "আবু বকর", roll: "০৬", photo: "/placeholder.svg" },
        { id: "STD007", name: "উমর ফারুক", roll: "০৭", photo: "/placeholder.svg" },
        { id: "STD008", name: "আলী ইবনে তালিব", roll: "০৮", photo: "/placeholder.svg" }
      ];
      
      setStudents(mockStudents);
      
      // Initialize attendance with all present
      const initialAttendance = {};
      mockStudents.forEach(student => {
        initialAttendance[student.id] = {
          status: 'present',
          remarks: ''
        };
      });
      setAttendance(initialAttendance);
      setLoading(false);
    }, 1000);
  };

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status
      }
    }));
  };

  const handleRemarksChange = (studentId: string, remarks: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remarks
      }
    }));
  };

  const markAllPresent = () => {
    const updatedAttendance = {};
    students.forEach(student => {
      updatedAttendance[student.id] = {
        status: 'present',
        remarks: attendance[student.id]?.remarks || ''
      };
    });
    setAttendance(updatedAttendance);
  };

  const markAllAbsent = () => {
    const updatedAttendance = {};
    students.forEach(student => {
      updatedAttendance[student.id] = {
        status: 'absent',
        remarks: attendance[student.id]?.remarks || ''
      };
    });
    setAttendance(updatedAttendance);
  };

  const saveAttendance = () => {
    const attendanceData = students.map(student => ({
      studentId: student.id,
      status: attendance[student.id]?.status || 'present',
      remarks: attendance[student.id]?.remarks || ''
    }));

    console.log('Saving attendance:', {
      classId: selectedClass,
      subject: selectedSubject,
      date: selectedDate,
      students: attendanceData
    });

    // Mock API call
    alert('উপস্থিতি সফলভাবে সংরক্ষিত হয়েছে!');
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll.includes(searchTerm)
  );

  const presentCount = Object.values(attendance).filter(a => a.status === 'present').length;
  const absentCount = Object.values(attendance).filter(a => a.status === 'absent').length;
  const lateCount = Object.values(attendance).filter(a => a.status === 'late').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-green-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/teacher" className="inline-flex items-center text-islamic-green hover:text-islamic-green-dark transition-colors">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">উপস্থিতি নিন</h1>
          <p className="text-gray-600">ক্লাস ও তারিখ নির্বাচন করে ছাত্রদের উপস্থিতি চিহ্নিত করুন</p>
        </div>

        {/* Class Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-islamic-blue" />
              <span>ক্লাস ও তারিখ নির্বাচন</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="class">ক্লাস নির্বাচন</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="ক্লাস নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(cls => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject">বিষয়</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">তারিখ</Label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="search">ছাত্র খুঁজুন</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="নাম বা রোল নম্বর"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedClass && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-6 w-6 text-islamic-blue" />
                    <div>
                      <p className="text-lg font-bold text-islamic-blue">{students.length}</p>
                      <p className="text-sm text-gray-600">মোট ছাত্র</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Check className="h-6 w-6 text-islamic-green" />
                    <div>
                      <p className="text-lg font-bold text-islamic-green">{presentCount}</p>
                      <p className="text-sm text-gray-600">উপস্থিত</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <X className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="text-lg font-bold text-red-600">{absentCount}</p>
                      <p className="text-sm text-gray-600">অনুপস্থিত</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-6 w-6 text-yellow-600" />
                    <div>
                      <p className="text-lg font-bold text-yellow-600">{lateCount}</p>
                      <p className="text-sm text-gray-600">বিলম্বিত</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={markAllPresent} className="bg-islamic-green hover:bg-islamic-green-dark">
                    সবাইকে উপস্থিত চিহ্নিত করুন
                  </Button>
                  <Button onClick={markAllAbsent} variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                    সবাইকে অনুপস্থিত চিহ্নিত করুন
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Student List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>ছাত্রদের তালিকা</span>
                  <Badge variant="outline">{filteredStudents.length} জন ছাত্র</Badge>
                </CardTitle>
                <CardDescription>
                  প্রতিটি ছাত্রের উপস্থিতি চিহ্নিত করুন
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-islamic-green mx-auto"></div>
                    <p className="mt-2 text-gray-600">লোড হচ্ছে...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredStudents.map((student) => (
                      <div key={student.id} className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-islamic-green rounded-full flex items-center justify-center text-white font-bold">
                              {student.roll}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{student.name}</h3>
                              <p className="text-sm text-gray-600">রোল: {student.roll}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleAttendanceChange(student.id, 'present')}
                                className={`${
                                  attendance[student.id]?.status === 'present'
                                    ? 'bg-islamic-green hover:bg-islamic-green-dark text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                                }`}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                উপস্থিত
                              </Button>
                              
                              <Button
                                size="sm"
                                onClick={() => handleAttendanceChange(student.id, 'absent')}
                                className={`${
                                  attendance[student.id]?.status === 'absent'
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                                }`}
                              >
                                <X className="h-4 w-4 mr-1" />
                                অনুপস্থিত
                              </Button>

                              <Button
                                size="sm"
                                onClick={() => handleAttendanceChange(student.id, 'late')}
                                className={`${
                                  attendance[student.id]?.status === 'late'
                                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-yellow-100'
                                }`}
                              >
                                <Clock className="h-4 w-4 mr-1" />
                                বিলম্বিত
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Remarks */}
                        <div className="mt-3">
                          <Input
                            placeholder="মন্তব্য (ঐচ্ছিক)"
                            value={attendance[student.id]?.remarks || ''}
                            onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Save Button */}
                {students.length > 0 && (
                  <div className="mt-6 text-center">
                    <Button 
                      onClick={saveAttendance}
                      size="lg"
                      className="bg-islamic-blue hover:bg-islamic-blue-dark text-white px-8"
                    >
                      <Save className="h-5 w-5 mr-2" />
                      উপস্থিতি সংরক্ষণ করুন
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
