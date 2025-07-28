import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Save, 
  Search,
  TrendingUp,
  Award,
  Users,
  FileText,
  School
} from "lucide-react";

export default function TeacherMarks() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [examDate, setExamDate] = useState(new Date().toISOString().split('T')[0]);
  const [totalMarks, setTotalMarks] = useState("");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const classes = [
    { id: "CLS001", name: "আলিম প্রথম - ক" },
    { id: "CLS002", name: "আলিম দ্বিতীয় - খ" },
    { id: "CLS003", name: "আলিম প্রথম - খ" }
  ];

  const subjects = ["আরবি সাহিত্য", "তাফসীর", "হাদিস", "ফিকহ"];
  const examTypes = ["মাসিক পরীক্ষা", "অর্ধবার্ষিক পরীক্ষা", "বার্ষিক পরীক্ষা", "সাপ্তাহিক পরীক্ষা", "অ্যাসাইনমেন্ট", "কুইজ"];

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
        { id: "STD001", name: "মোহাম্মদ আবদুল্ল���হ", roll: "০১", photo: "/placeholder.svg" },
        { id: "STD002", name: "আবুল কাসেম", roll: "০২", photo: "/placeholder.svg" },
        { id: "STD003", name: "মোহাম্মদ ইব্রাহিম", roll: "০৩", photo: "/placeholder.svg" },
        { id: "STD004", name: "আবদুর রহমান", roll: "০৪", photo: "/placeholder.svg" },
        { id: "STD005", name: "মোহাম্মদ হাসান", roll: "০৫", photo: "/placeholder.svg" },
        { id: "STD006", name: "আবু বকর", roll: "০৬", photo: "/placeholder.svg" },
        { id: "STD007", name: "উমর ফারুক", roll: "০৭", photo: "/placeholder.svg" },
        { id: "STD008", name: "আলী ইবনে তালিব", roll: "০৮", photo: "/placeholder.svg" }
      ];
      
      setStudents(mockStudents);
      
      // Initialize marks
      const initialMarks = {};
      mockStudents.forEach(student => {
        initialMarks[student.id] = {
          obtainedMarks: '',
          remarks: ''
        };
      });
      setMarks(initialMarks);
      setLoading(false);
    }, 1000);
  };

  const handleMarksChange = (studentId: string, obtainedMarks: string) => {
    setMarks(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        obtainedMarks
      }
    }));
  };

  const handleRemarksChange = (studentId: string, remarks: string) => {
    setMarks(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remarks
      }
    }));
  };

  const calculateGrade = (obtained: number, total: number) => {
    const percentage = (obtained / total) * 100;
    if (percentage >= 80) return 'A+';
    if (percentage >= 70) return 'A';
    if (percentage >= 60) return 'A-';
    if (percentage >= 50) return 'B';
    if (percentage >= 40) return 'C';
    if (percentage >= 33) return 'D';
    return 'F';
  };

  const saveMarks = () => {
    const marksData = students.map(student => ({
      studentId: student.id,
      obtainedMarks: parseFloat(marks[student.id]?.obtainedMarks || '0'),
      remarks: marks[student.id]?.remarks || ''
    })).filter(m => m.obtainedMarks > 0);

    console.log('Saving marks:', {
      classId: selectedClass,
      subject: selectedSubject,
      examType: selectedExamType,
      examDate,
      totalMarks: parseFloat(totalMarks),
      students: marksData
    });

    // Mock API call
    alert('মার্কস সফলভাবে সংরক্ষিত হয়েছে!');
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll.includes(searchTerm)
  );

  const marksArray = Object.values(marks).filter((m: any) => m.obtainedMarks !== '');
  const enteredMarksCount = marksArray.length;
  const totalSum = enteredMarksCount > 0 ?
    marksArray.reduce((sum: number, m: any) => sum + parseFloat(m.obtainedMarks), 0) : 0;
  const averageMarks = enteredMarksCount > 0 ? totalSum / enteredMarksCount : 0;

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">মার্কস এন্ট্রি</h1>
          <p className="text-gray-600">পরীক্ষার ফলাফল এবং মার্কস এন্ট্রি করুন</p>
        </div>

        {/* Exam Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-islamic-blue" />
              <span>পরীক্ষার বিবরণ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <Label htmlFor="class">ক্লাস</Label>
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
                <Label htmlFor="examType">পরীক্ষার ধরন</Label>
                <Select value={selectedExamType} onValueChange={setSelectedExamType}>
                  <SelectTrigger>
                    <SelectValue placeholder="পরীক্ষার ধরন" />
                  </SelectTrigger>
                  <SelectContent>
                    {examTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="totalMarks">পূর্ণ নম্বর</Label>
                <Input
                  type="number"
                  placeholder="১০০"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="examDate">পরীক্ষার তারিখ</Label>
                <Input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="search">ছাত্র খুঁজুন</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="নাম বা রোল"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedClass && selectedSubject && selectedExamType && totalMarks && (
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
                    <FileText className="h-6 w-6 text-islamic-green" />
                    <div>
                      <p className="text-lg font-bold text-islamic-green">{enteredMarksCount}</p>
                      <p className="text-sm text-gray-600">এন্ট্রি সম্পন্ন</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-islamic-gold" />
                    <div>
                      <p className="text-lg font-bold text-islamic-gold">{averageMarks.toFixed(1)}</p>
                      <p className="text-sm text-gray-600">গড় নম্বর</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Award className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-lg font-bold text-purple-600">{totalMarks}</p>
                      <p className="text-sm text-gray-600">পূর্ণ নম্বর</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Student Marks Entry */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>ছাত্রদের মার্কস এন্ট্রি</span>
                  <Badge variant="outline">{filteredStudents.length} জন ছাত্র</Badge>
                </CardTitle>
                <CardDescription>
                  প্রতিটি ছাত্রের প্রাপ্ত নম্বর এন্ট্রি করুন
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
                    {filteredStudents.map((student) => {
                      const obtainedMarks = parseFloat(marks[student.id]?.obtainedMarks || '0');
                      const total = parseFloat(totalMarks || '100');
                      const percentage = obtainedMarks > 0 ? (obtainedMarks / total) * 100 : 0;
                      const grade = obtainedMarks > 0 ? calculateGrade(obtainedMarks, total) : '';
                      
                      return (
                        <div key={student.id} className="p-4 border rounded-lg bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-islamic-green rounded-full flex items-center justify-center text-white font-bold">
                                {student.roll}
                              </div>
                              <div>
                                <h3 className="font-semibold">{student.name}</h3>
                                <p className="text-sm text-gray-600">রোল: {student.roll}</p>
                              </div>
                            </div>

                            <div>
                              <Label className="text-sm">প্রাপ্ত নম্বর</Label>
                              <div className="flex items-center space-x-2">
                                <Input
                                  type="number"
                                  min="0"
                                  max={totalMarks}
                                  placeholder="০"
                                  value={marks[student.id]?.obtainedMarks || ''}
                                  onChange={(e) => handleMarksChange(student.id, e.target.value)}
                                  className="w-20"
                                />
                                <span className="text-sm text-gray-600">/ {totalMarks}</span>
                              </div>
                            </div>

                            <div className="text-center">
                              <Label className="text-sm">শতকরা</Label>
                              <p className="text-lg font-bold text-islamic-blue">
                                {percentage > 0 ? `${percentage.toFixed(1)}%` : '-'}
                              </p>
                            </div>

                            <div className="text-center">
                              <Label className="text-sm">গ্রেড</Label>
                              <Badge 
                                className={`${
                                  grade === 'A+' ? 'bg-green-600' :
                                  grade === 'A' || grade === 'A-' ? 'bg-blue-600' :
                                  grade === 'B' ? 'bg-yellow-600' :
                                  grade === 'C' || grade === 'D' ? 'bg-orange-600' :
                                  grade === 'F' ? 'bg-red-600' : 'bg-gray-400'
                                } text-white`}
                              >
                                {grade || '-'}
                              </Badge>
                            </div>

                            <div>
                              <Label className="text-sm">মন্তব্য</Label>
                              <Input
                                placeholder="মন্তব্য (ঐচ্ছিক)"
                                value={marks[student.id]?.remarks || ''}
                                onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                                className="text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Save Button */}
                {students.length > 0 && (
                  <div className="mt-6 text-center">
                    <Button 
                      onClick={saveMarks}
                      size="lg"
                      className="bg-islamic-blue hover:bg-islamic-blue-dark text-white px-8"
                    >
                      <Save className="h-5 w-5 mr-2" />
                      মার্কস সংরক্ষণ করুন
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
