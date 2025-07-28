import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useLocalStorage, useNotifications } from '@/hooks/useLocalData';
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart,
  FileText,
  Download,
  Edit,
  School,
  BookOpen,
  Trophy,
  Clock,
  DollarSign,
  Users,
  GraduationCap,
  Mail,
  Home
} from 'lucide-react';
import Navigation from '@/components/Navigation';

interface StudentData {
  id: string;
  studentId: string;
  name: string;
  nameEnglish: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  bloodGroup: string;
  nationality: string;
  religion: string;
  class: string;
  section: string;
  roll: string;
  admissionDate: string;
  presentAddress: string;
  permanentAddress: string;
  phoneNumber: string;
  email?: string;
  guardianName: string;
  guardianPhone: string;
  guardianRelation: string;
  photo?: string;
  emergencyContact: string;
  previousSchool?: string;
  isActive: boolean;
}

interface AcademicRecord {
  year: string;
  class: string;
  exam: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  position: number;
  remarks: string;
}

interface AttendanceRecord {
  month: string;
  year: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  percentage: number;
  lateCount: number;
}

interface FeeRecord {
  month: string;
  year: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  paymentDate?: string;
  status: 'paid' | 'partial' | 'pending' | 'overdue';
}

interface SubjectGrade {
  subject: string;
  marks: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  position: number;
}

export default function StudentProfile() {
  const [studentData, setStudentData] = useLocalStorage<StudentData>('currentStudent', {
    id: '1',
    studentId: 'STD001',
    name: 'মোহাম্মদ আব্দুল্লাহ রহমান',
    nameEnglish: 'Mohammad Abdullah Rahman',
    fatherName: 'মোহাম্মদ আব্দুর রহমান',
    motherName: 'ফাতিমা খাতুন',
    dateOfBirth: '2008-05-15',
    gender: 'male',
    bloodGroup: 'B+',
    nationality: 'বাংলাদেশী',
    religion: 'ইসলাম',
    class: 'নবম শ্রেণী',
    section: 'ক',
    roll: '05',
    admissionDate: '2023-01-15',
    presentAddress: 'বাড়ি নং ২৫, রোড নং ৩, ধানমন্ডি, ঢাকা',
    permanentAddress: 'গ্রাম: কামারপাড়া, উপজেলা: কালিয়াকৈর, জেলা: গাজীপ���র',
    phoneNumber: '01711111111',
    email: 'abdullah@example.com',
    guardianName: 'মোহাম্মদ আব্দুর রহমান',
    guardianPhone: '01711111111',
    guardianRelation: 'পিতা',
    emergencyContact: '01722222222',
    previousSchool: 'ঢাকা মডেল স্কুল',
    isActive: true
  });

  const [academicRecords, setAcademicRecords] = useLocalStorage<AcademicRecord[]>('studentAcademicRecords', [
    {
      year: '2024',
      class: 'নবম শ্রেণী',
      exam: 'প্রথম সাময়িক',
      totalMarks: 600,
      obtainedMarks: 485,
      percentage: 80.83,
      grade: 'A+',
      position: 3,
      remarks: 'চমৎকার ফলাফল'
    },
    {
      year: '2023',
      class: 'অষ্টম শ্রেণী',
      exam: 'বার্ষিক পরীক্ষা',
      totalMarks: 600,
      obtainedMarks: 510,
      percentage: 85.0,
      grade: 'A+',
      position: 2,
      remarks: 'অতি উত্তম'
    }
  ]);

  const [attendanceRecords, setAttendanceRecords] = useLocalStorage<AttendanceRecord[]>('studentAttendanceRecords', [
    {
      month: 'জানুয়ারি',
      year: '2024',
      totalDays: 22,
      presentDays: 20,
      absentDays: 2,
      percentage: 90.9,
      lateCount: 1
    },
    {
      month: 'ফেব্রুয়ারি',
      year: '2024',
      totalDays: 20,
      presentDays: 18,
      absentDays: 2,
      percentage: 90.0,
      lateCount: 0
    },
    {
      month: 'মার্চ',
      year: '2024',
      totalDays: 23,
      presentDays: 21,
      absentDays: 2,
      percentage: 91.3,
      lateCount: 2
    }
  ]);

  const [feeRecords, setFeeRecords] = useLocalStorage<FeeRecord[]>('studentFeeRecords', [
    {
      month: 'জানুয়ারি',
      year: '2024',
      totalAmount: 2600,
      paidAmount: 2600,
      pendingAmount: 0,
      paymentDate: '2024-01-15',
      status: 'paid'
    },
    {
      month: 'ফেব্রুয়ারি',
      year: '2024',
      totalAmount: 2600,
      paidAmount: 2600,
      pendingAmount: 0,
      paymentDate: '2024-02-12',
      status: 'paid'
    },
    {
      month: 'মার্চ',
      year: '2024',
      totalAmount: 2600,
      paidAmount: 0,
      pendingAmount: 2600,
      status: 'pending'
    }
  ]);

  const [subjectGrades, setSubjectGrades] = useLocalStorage<SubjectGrade[]>('studentSubjectGrades', [
    { subject: 'আরবি', marks: 85, totalMarks: 100, percentage: 85, grade: 'A+', position: 2 },
    { subject: 'ইসলামিক শিক্ষা', marks: 90, totalMarks: 100, percentage: 90, grade: 'A+', position: 1 },
    { subject: 'বাংলা', marks: 82, totalMarks: 100, percentage: 82, grade: 'A+', position: 4 },
    { subject: 'ইংরেজি', marks: 78, totalMarks: 100, percentage: 78, grade: 'A', position: 8 },
    { subject: 'গণিত', marks: 75, totalMarks: 100, percentage: 75, grade: 'A', position: 12 },
    { subject: 'বিজ্ঞান', marks: 88, totalMarks: 100, percentage: 88, grade: 'A+', position: 3 }
  ]);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { addNotification } = useNotifications();

  const calculateOverallAttendance = () => {
    const totalDays = attendanceRecords.reduce((sum, record) => sum + record.totalDays, 0);
    const presentDays = attendanceRecords.reduce((sum, record) => sum + record.presentDays, 0);
    return totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
  };

  const calculateOverallGrade = () => {
    const totalMarks = subjectGrades.reduce((sum, grade) => sum + grade.marks, 0);
    const totalPossible = subjectGrades.reduce((sum, grade) => sum + grade.totalMarks, 0);
    return totalPossible > 0 ? Math.round((totalMarks / totalPossible) * 100) : 0;
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      paid: "default",
      partial: "outline",
      pending: "secondary",
      overdue: "destructive"
    };
    
    const labels: { [key: string]: string } = {
      paid: 'পরিশোধিত',
      partial: 'আংশিক',
      pending: 'বকেয়া',
      overdue: 'অতিবাহিত'
    };

    return (
      <Badge variant={variants[status] || "secondary"}>
        {labels[status] || status}
      </Badge>
    );
  };

  const downloadProfilePDF = () => {
    addNotification('প্রোফাইল PDF ডাউনলোড হচ্ছে...', 'info');
    setTimeout(() => {
      addNotification('প্রোফাইল PDF সফলভাবে ডাউনলোড হয়েছে', 'success');
    }, 2000);
  };

  const age = new Date().getFullYear() - new Date(studentData.dateOfBirth).getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100" style={{ fontFamily: '"Noto Serif Bengali", serif' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">শিক্ষার্থীর প্রোফাইল</h1>
          <p className="text-emerald-600">ব্যক্তিগত তথ্য ও শিক্ষাগত রেকর্ড</p>
        </div>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={studentData.photo} alt={studentData.name} />
                  <AvatarFallback className="text-2xl font-bold bg-emerald-100 text-emerald-700">
                    {studentData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{studentData.name}</h2>
                    <p className="text-lg text-gray-600">{studentData.nameEnglish}</p>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <Badge variant="default">{studentData.studentId}</Badge>
                      <Badge variant="outline">{studentData.class} - {studentData.section}</Badge>
                      <Badge variant="outline">রোল: {studentData.roll}</Badge>
                      <Badge variant={studentData.isActive ? "default" : "destructive"}>
                        {studentData.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={downloadProfilePDF} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      PDF ডাউনলোড
                    </Button>
                    <Button onClick={() => setIsEditDialogOpen(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      সম্পাদনা
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">উপস্থিতি</p>
                  <p className="text-2xl font-bold text-blue-800">{calculateOverallAttendance()}%</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">সামগ্রিক নম্বর</p>
                  <p className="text-2xl font-bold text-green-800">{calculateOverallGrade()}%</p>
                </div>
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">মোট বকেয়া</p>
                  <p className="text-2xl font-bold text-purple-800">
                    ৳{feeRecords.reduce((sum, record) => sum + record.pendingAmount, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">বয়স</p>
                  <p className="text-2xl font-bold text-orange-800">{age} বছর</p>
                </div>
                <User className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">ব্যক্তিগত তথ্য</TabsTrigger>
            <TabsTrigger value="academic">শিক্ষাগত রেকর্ড</TabsTrigger>
            <TabsTrigger value="attendance">উপস্থিতি</TabsTrigger>
            <TabsTrigger value="fees">ফি রেকর্ড</TabsTrigger>
            <TabsTrigger value="grades">বিষয়ভিত্তিক নম্বর</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    ব্যক্তিগত বিবরণ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-gray-600">পূর্ণ নাম</Label>
                      <p className="font-medium">{studentData.name}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">ইংরেজি নাম</Label>
                      <p className="font-medium">{studentData.nameEnglish}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">জন্ম তারিখ</Label>
                      <p className="font-medium">{new Date(studentData.dateOfBirth).toLocaleDateString('bn-BD')}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">লিঙ্গ</Label>
                      <p className="font-medium">{studentData.gender === 'male' ? 'পুরুষ' : 'মহিলা'}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">রক্তের গ্রুপ</Label>
                      <p className="font-medium">{studentData.bloodGroup}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">জাতীয়তা</Label>
                      <p className="font-medium">{studentData.nationality}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">ধর্ম</Label>
                      <p className="font-medium">{studentData.religion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    পারিবারিক তথ্য
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <Label className="text-gray-600">পিতার নাম</Label>
                      <p className="font-medium">{studentData.fatherName}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">মাতার নাম</Label>
                      <p className="font-medium">{studentData.motherName}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">অভিভাবক</Label>
                      <p className="font-medium">{studentData.guardianName} ({studentData.guardianRelation})</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">অভিভাবকের ফোন</Label>
                      <p className="font-medium">{studentData.guardianPhone}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">জরুরি যোগাযোগ</Label>
                      <p className="font-medium">{studentData.emergencyContact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    ঠিকানা
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-gray-600">বর্তমান ঠিকানা</Label>
                    <p className="font-medium">{studentData.presentAddress}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">স্থায়ী ঠিকানা</Label>
                    <p className="font-medium">{studentData.permanentAddress}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="h-5 w-5" />
                    শিক্ষাগত তথ্য
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-gray-600">শ্রেণী</Label>
                      <p className="font-medium">{studentData.class}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">শাখা</Label>
                      <p className="font-medium">{studentData.section}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">রোল নম্বর</Label>
                      <p className="font-medium">{studentData.roll}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">ভর্তির তারিখ</Label>
                      <p className="font-medium">{new Date(studentData.admissionDate).toLocaleDateString('bn-BD')}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-gray-600">পূর্ববর্তী স্কুল</Label>
                      <p className="font-medium">{studentData.previousSchool || 'তথ্য নেই'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Academic Records Tab */}
          <TabsContent value="academic" className="space-y-6">
            <div className="grid gap-4">
              {academicRecords.map((record, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{record.exam} - {record.year}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <Label className="text-gray-600">শ্রেণী</Label>
                            <p className="font-medium">{record.class}</p>
                          </div>
                          <div>
                            <Label className="text-gray-600">প্রাপ্ত নম্বর</Label>
                            <p className="font-medium">{record.obtainedMarks}/{record.totalMarks}</p>
                          </div>
                          <div>
                            <Label className="text-gray-600">শতকরা</Label>
                            <p className={`font-medium ${getGradeColor(record.percentage)}`}>
                              {record.percentage}%
                            </p>
                          </div>
                          <div>
                            <Label className="text-gray-600">গ্রেড</Label>
                            <Badge variant="default">{record.grade}</Badge>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <Label className="text-gray-600">অবস্থান</Label>
                            <p className="font-medium">{record.position} তম</p>
                          </div>
                          <div>
                            <Label className="text-gray-600">মন্তব্য</Label>
                            <p className="font-medium">{record.remarks}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>উপস্থিতির সারসংক্ষেপ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">
                    {calculateOverallAttendance()}%
                  </div>
                  <div className="text-gray-600">সামগ্রিক উপস্থিতি</div>
                  <Progress value={calculateOverallAttendance()} className="mt-4" />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {attendanceRecords.map((record, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{record.month} {record.year}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3 text-sm">
                          <div>
                            <Label className="text-gray-600">মোট দিন</Label>
                            <p className="font-medium">{record.totalDays}</p>
                          </div>
                          <div>
                            <Label className="text-gray-600">উপস্থিত</Label>
                            <p className="font-medium text-green-600">{record.presentDays}</p>
                          </div>
                          <div>
                            <Label className="text-gray-600">অনুপস্থিত</Label>
                            <p className="font-medium text-red-600">{record.absentDays}</p>
                          </div>
                          <div>
                            <Label className="text-gray-600">বিলম্ব</Label>
                            <p className="font-medium text-orange-600">{record.lateCount}</p>
                          </div>
                          <div>
                            <Label className="text-gray-600">শতকরা</Label>
                            <p className={`font-medium ${getGradeColor(record.percentage)}`}>
                              {record.percentage}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Fee Records Tab */}
          <TabsContent value="fees" className="space-y-6">
            <div className="grid gap-4">
              {feeRecords.map((record, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold">{record.month} {record.year}</h3>
                          {getStatusBadge(record.status)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <Label className="text-gray-600">মোট ফি</Label>
                            <p className="font-medium">৳{record.totalAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <Label className="text-gray-600">পরিশোধিত</Label>
                            <p className="font-medium text-green-600">৳{record.paidAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <Label className="text-gray-600">বকেয়া</Label>
                            <p className="font-medium text-red-600">৳{record.pendingAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <Label className="text-gray-600">পরিশোধের তারিখ</Label>
                            <p className="font-medium">
                              {record.paymentDate 
                                ? new Date(record.paymentDate).toLocaleDateString('bn-BD')
                                : 'পরিশোধ হয়নি'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Subject Grades Tab */}
          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>বিষয়ভিত্তিক ফলাফল</CardTitle>
                <CardDescription>সর্বশেষ পরীক্ষার ফলাফল</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {subjectGrades.map((grade, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{grade.subject}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span>নম্বর: {grade.marks}/{grade.totalMarks}</span>
                          <span className={getGradeColor(grade.percentage)}>
                            {grade.percentage}%
                          </span>
                          <Badge variant="default">{grade.grade}</Badge>
                          <span className="text-gray-600">অবস্থান: {grade.position}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Progress value={grade.percentage} className="w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>প্রোফাইল সম্পাদনা</DialogTitle>
              <DialogDescription>
                শিক্ষার্থীর তথ্য আপডেট করুন
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>নাম</Label>
                <Input value={studentData.name} onChange={(e) => setStudentData({...studentData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>ইংরেজি নাম</Label>
                <Input value={studentData.nameEnglish} onChange={(e) => setStudentData({...studentData, nameEnglish: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>ফোন নম্বর</Label>
                <Input value={studentData.phoneNumber} onChange={(e) => setStudentData({...studentData, phoneNumber: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>ইমেইল</Label>
                <Input value={studentData.email || ''} onChange={(e) => setStudentData({...studentData, email: e.target.value})} />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => {
                setIsEditDialogOpen(false);
                addNotification('প্রোফাইল সফলভাবে আপডেট হয়েছে', 'success');
              }}>
                সংরক্ষণ করুন
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
