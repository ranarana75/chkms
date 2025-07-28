import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useLocalStorage, useNotifications } from '@/hooks/useLocalData';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  GraduationCap, 
  DollarSign, 
  FileText, 
  Download, 
  Filter,
  Calendar,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react';
import Navigation from '@/components/Navigation';

interface StudentReport {
  totalStudents: number;
  byClass: { [key: string]: number };
  byGender: { male: number; female: number };
  newAdmissions: number;
  dropouts: number;
  attendance: { present: number; absent: number; percentage: number };
}

interface TeacherReport {
  totalTeachers: number;
  bySubject: { [key: string]: number };
  byExperience: { [key: string]: number };
  averageSalary: number;
  performance: { excellent: number; good: number; average: number };
}

interface FinancialReport {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  feeCollection: { collected: number; pending: number; percentage: number };
  monthlyTrend: { month: string; revenue: number; expenses: number }[];
}

interface AcademicReport {
  examResults: { excellent: number; good: number; average: number; poor: number };
  subjectPerformance: { subject: string; averageMarks: number; passRate: number }[];
  topPerformers: { name: string; marks: number; class: string }[];
  improvementNeeded: { name: string; marks: number; class: string }[];
}

interface ReportFilters {
  dateRange: string;
  class: string;
  subject: string;
  reportType: string;
}

export default function ReportsDashboard() {
  const [studentReport, setStudentReport] = useLocalStorage<StudentReport>('studentReport', {
    totalStudents: 450,
    byClass: {
      'নবম শ্রেণী': 120,
      'দশম শ্রেণী': 115,
      'আলিম ১ম বর্ষ': 95,
      'আলিম ২য় বর্ষ': 85,
      'ফাজিল ১ম বর্ষ': 35
    },
    byGender: { male: 285, female: 165 },
    newAdmissions: 95,
    dropouts: 12,
    attendance: { present: 385, absent: 65, percentage: 85.5 }
  });

  const [teacherReport, setTeacherReport] = useLocalStorage<TeacherReport>('teacherReport', {
    totalTeachers: 35,
    bySubject: {
      'ইসলামিক শিক্ষা': 12,
      'আরবি': 8,
      'বাংলা': 6,
      'ইংরেজি': 4,
      'গণিত': 3,
      'বিজ্ঞান': 2
    },
    byExperience: {
      '০-৫ বছর': 15,
      '৫-১০ বছর': 12,
      '১০+ বছর': 8
    },
    averageSalary: 25000,
    performance: { excellent: 18, good: 12, average: 5 }
  });

  const [financialReport, setFinancialReport] = useLocalStorage<FinancialReport>('financialReport', {
    totalRevenue: 2850000,
    totalExpenses: 2240000,
    netProfit: 610000,
    feeCollection: { collected: 2400000, pending: 450000, percentage: 84.2 },
    monthlyTrend: [
      { month: 'জানুয়ারি', revenue: 245000, expenses: 185000 },
      { month: 'ফেব্রুয়ারি', revenue: 235000, expenses: 190000 },
      { month: 'মার্চ', revenue: 255000, expenses: 195000 },
      { month: 'এপ্রিল', revenue: 240000, expenses: 180000 },
      { month: 'মে', revenue: 265000, expenses: 200000 },
      { month: 'জুন', revenue: 250000, expenses: 185000 }
    ]
  });

  const [academicReport, setAcademicReport] = useLocalStorage<AcademicReport>('academicReport', {
    examResults: { excellent: 125, good: 180, average: 110, poor: 35 },
    subjectPerformance: [
      { subject: 'আরবি', averageMarks: 82, passRate: 92 },
      { subject: 'ইসলামিক শিক্ষা', averageMarks: 85, passRate: 95 },
      { subject: 'বাংলা', averageMarks: 78, passRate: 88 },
      { subject: 'ইংরেজি', averageMarks: 72, passRate: 82 },
      { subject: 'গণিত', averageMarks: 68, passRate: 75 },
      { subject: 'বিজ্ঞান', averageMarks: 75, passRate: 85 }
    ],
    topPerformers: [
      { name: 'আবদুল্লাহ আল মামুন', marks: 95, class: 'আলিম ২য় বর্ষ' },
      { name: 'ফাতিমা আক্তার', marks: 94, class: 'দশম শ্রেণী' },
      { name: 'মোহাম্মদ হাসান', marks: 92, class: 'আলিম ১ম বর্ষ' }
    ],
    improvementNeeded: [
      { name: 'আহমদ আলী', marks: 45, class: 'নবম শ্রেণী' },
      { name: 'সালমা খাতুন', marks: 48, class: 'দশম শ্রেণী' }
    ]
  });

  const [filters, setFilters] = useState<ReportFilters>({
    dateRange: 'current_year',
    class: 'all',
    subject: 'all',
    reportType: 'all'
  });

  const { addNotification } = useNotifications();

  const generateReport = () => {
    addNotification('রিপোর্ট তৈরি হচ্ছে...', 'info');
    setTimeout(() => {
      addNotification('রিপোর্ট সফলভাবে তৈরি হয়েছে', 'success');
    }, 2000);
  };

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    addNotification(`${format.toUpperCase()} ফরম্যাটে রিপোর্ট ডাউনলোড হচ্ছে...`, 'info');
    setTimeout(() => {
      addNotification(`রিপোর্ট ${format.toUpperCase()} ফরম্যাটে ডাউনলোড সম্পন্ন`, 'success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100" style={{ fontFamily: '"Noto Serif Bengali", serif' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">রিপোর্ট ও বিশ্লেষণ</h1>
          <p className="text-emerald-600">প্রাতিষ্ঠানিক কর্মকাণ্ডের বিস্তারিত প্রতিবেদন ও পরিসংখ্যান</p>
        </div>

        {/* Report Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              রিপোর্ট ফিল্টার
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <Label>সময়কাল</Label>
                <Select value={filters.dateRange} onValueChange={(value) => setFilters({...filters, dateRange: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current_month">চলতি মাস</SelectItem>
                    <SelectItem value="current_year">চলতি বছর</SelectItem>
                    <SelectItem value="last_month">গত মাস</SelectItem>
                    <SelectItem value="last_year">গত বছর</SelectItem>
                    <SelectItem value="custom">কাস্টম</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>শ্রেণী</Label>
                <Select value={filters.class} onValueChange={(value) => setFilters({...filters, class: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব শ্রেণী</SelectItem>
                    <SelectItem value="grade_9">নবম শ্রেণী</SelectItem>
                    <SelectItem value="grade_10">দশম শ্রেণী</SelectItem>
                    <SelectItem value="alim_1">আলিম ১ম বর্ষ</SelectItem>
                    <SelectItem value="alim_2">আলিম ২য় বর্ষ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>বিষয়</Label>
                <Select value={filters.subject} onValueChange={(value) => setFilters({...filters, subject: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব বিষয়</SelectItem>
                    <SelectItem value="arabic">আরবি</SelectItem>
                    <SelectItem value="islamic">ইসলামিক শিক্ষা</SelectItem>
                    <SelectItem value="bangla">বাংলা</SelectItem>
                    <SelectItem value="english">ইংরেজি</SelectItem>
                    <SelectItem value="math">গণিত</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>রিপোর্ট ধরন</Label>
                <Select value={filters.reportType} onValueChange={(value) => setFilters({...filters, reportType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব রিপোর্ট</SelectItem>
                    <SelectItem value="student">শিক্ষার্থী রিপোর্ট</SelectItem>
                    <SelectItem value="academic">শিক্ষা রিপোর্ট</SelectItem>
                    <SelectItem value="financial">আর্থিক রিপোর্ট</SelectItem>
                    <SelectItem value="teacher">শিক্ষক রিপোর্ট</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={generateReport} className="bg-emerald-600 hover:bg-emerald-700">
                <BarChart3 className="w-4 h-4 mr-2" />
                রিপোর্ট তৈরি করুন
              </Button>
              <Button variant="outline" onClick={() => exportReport('pdf')}>
                <Download className="w-4 h-4 mr-2" />
                PDF ডাউনলোড
              </Button>
              <Button variant="outline" onClick={() => exportReport('excel')}>
                <Download className="w-4 h-4 mr-2" />
                Excel ডাউনলোড
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Report Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">সারসংক্ষেপ</TabsTrigger>
            <TabsTrigger value="students">শিক্ষার্থী</TabsTrigger>
            <TabsTrigger value="academic">শিক্ষা</TabsTrigger>
            <TabsTrigger value="financial">আর্থিক</TabsTrigger>
            <TabsTrigger value="teachers">শিক্ষক</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-700">মোট শিক্ষার্থী</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-800">{studentReport.totalStudents}</div>
                  <div className="text-xs text-blue-600">নতুন ভর্তি: {studentReport.newAdmissions}</div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-700">মোট শিক্ষক</CardTitle>
                  <GraduationCap className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">{teacherReport.totalTeachers}</div>
                  <div className="text-xs text-green-600">গড় বেতন: ৳{teacherReport.averageSalary.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-700">মোট আয়</CardTitle>
                  <DollarSign className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-800">৳{(financialReport.totalRevenue / 100000).toFixed(1)}L</div>
                  <div className="text-xs text-purple-600">লাভ: ৳{(financialReport.netProfit / 100000).toFixed(1)}L</div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-700">উপস্থিতির হার</CardTitle>
                  <Activity className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-800">{studentReport.attendance.percentage}%</div>
                  <Progress value={studentReport.attendance.percentage} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Quick Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>শ্রেণী অনুযায়ী শিক্ষার্থী বিতরণ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(studentReport.byClass).map(([className, count]) => (
                      <div key={className} className="flex justify-between items-center">
                        <span className="text-sm">{className}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-emerald-600 h-2 rounded-full" 
                              style={{ width: `${(count / studentReport.totalStudents) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-8">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>মাসিক আর্থিক ট্রেন্ড</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {financialReport.monthlyTrend.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{item.month}</span>
                        <div className="flex gap-4">
                          <div className="text-right">
                            <div className="text-xs text-green-600">আয়</div>
                            <div className="text-sm font-medium">৳{(item.revenue / 1000).toFixed(0)}K</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-red-600">ব্যয়</div>
                            <div className="text-sm font-medium">৳{(item.expenses / 1000).toFixed(0)}K</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Student Report Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>লিঙ্গ অনুযায়ী বিতরণ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>পুরুষ</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(studentReport.byGender.male / studentReport.totalStudents) * 100} className="w-20" />
                        <span className="text-sm font-medium">{studentReport.byGender.male}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>মহিলা</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(studentReport.byGender.female / studentReport.totalStudents) * 100} className="w-20" />
                        <span className="text-sm font-medium">{studentReport.byGender.female}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>উপস্থিতি রিপোর্ট</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{studentReport.attendance.percentage}%</div>
                      <div className="text-sm text-gray-600">গড় উপস্থিতি</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>উপস্থিত:</span>
                        <span className="font-medium">{studentReport.attendance.present}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>অনুপস্থিত:</span>
                        <span className="font-medium">{studentReport.attendance.absent}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ভর্তি ও ঝরে পড়া</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded">
                      <div className="text-2xl font-bold text-green-600">{studentReport.newAdmissions}</div>
                      <div className="text-sm text-green-700">নতুন ভর্তি</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded">
                      <div className="text-2xl font-bold text-red-600">{studentReport.dropouts}</div>
                      <div className="text-sm text-red-700">ঝরে পড়া</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Academic Report Tab */}
          <TabsContent value="academic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>পরীক্ষার ফলাফল বিতরণ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>অতি উত্তম (৮০+)</span>
                      <Badge variant="default">{academicReport.examResults.excellent}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>ভাল (৭০-৭৯)</span>
                      <Badge variant="secondary">{academicReport.examResults.good}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>মধ্যম (৬০-৬৯)</span>
                      <Badge variant="outline">{academicReport.examResults.average}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>উন্নতি প্রয়োজন (৬০ এর কম)</span>
                      <Badge variant="destructive">{academicReport.examResults.poor}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>বিষয়ভিত্তিক কর্মক্ষমতা</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {academicReport.subjectPerformance.map((subject, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{subject.subject}</span>
                          <span>{subject.averageMarks}% (পাশ: {subject.passRate}%)</span>
                        </div>
                        <Progress value={subject.averageMarks} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>শীর্ষ পারফরমার</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {academicReport.topPerformers.map((student, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded">
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-600">{student.class}</div>
                        </div>
                        <Badge variant="default">{student.marks}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>উন্নতি প্রয়োজন</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {academicReport.improvementNeeded.map((student, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded">
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-600">{student.class}</div>
                        </div>
                        <Badge variant="destructive">{student.marks}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Report Tab */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-700">মোট আয়</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-800">
                    ৳{financialReport.totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-600 mt-2">এই বছর</div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-700">মোট ব্যয়</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-800">
                    ৳{financialReport.totalExpenses.toLocaleString()}
                  </div>
                  <div className="text-sm text-red-600 mt-2">এই বছর</div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-700">নিট লাভ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-800">
                    ৳{financialReport.netProfit.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-600 mt-2">
                    {((financialReport.netProfit / financialReport.totalRevenue) * 100).toFixed(1)}% মার্জিন
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>ফি আদায়ের অবস্থা</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>আদায়কৃত ফি</span>
                    <span className="font-bold text-green-600">
                      ৳{financialReport.feeCollection.collected.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>বকেয়া ফি</span>
                    <span className="font-bold text-red-600">
                      ৳{financialReport.feeCollection.pending.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>আদায়ের হার</span>
                      <span>{financialReport.feeCollection.percentage}%</span>
                    </div>
                    <Progress value={financialReport.feeCollection.percentage} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teacher Report Tab */}
          <TabsContent value="teachers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>বিষয়ভিত্তিক শিক্ষক বিতরণ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(teacherReport.bySubject).map(([subject, count]) => (
                      <div key={subject} className="flex justify-between items-center">
                        <span className="text-sm">{subject}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-emerald-600 h-2 rounded-full" 
                              style={{ width: `${(count / teacherReport.totalTeachers) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-6">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>অভিজ্ঞতা অনুযায়ী বিতরণ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(teacherReport.byExperience).map(([experience, count]) => (
                      <div key={experience} className="flex justify-between items-center">
                        <span className="text-sm">{experience}</span>
                        <Badge variant="outline">{count} জন</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>শিক্ষক কর্মক্ষমতা</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">{teacherReport.performance.excellent}</div>
                    <div className="text-sm text-green-700">অতি উত্তম</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">{teacherReport.performance.good}</div>
                    <div className="text-sm text-blue-700">ভাল</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded">
                    <div className="text-2xl font-bold text-orange-600">{teacherReport.performance.average}</div>
                    <div className="text-sm text-orange-700">মধ্যম</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
