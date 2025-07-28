import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Calendar, Clock, FileText, Users, Award, BarChart3, Plus, Eye, Download } from 'lucide-react';
import { Examination, ExamSchedule, ExamResult, ReportCard } from '../../shared/database';

interface ExaminationStats {
  totalExams: number;
  upcomingExams: number;
  completedExams: number;
  totalResults: number;
  passedStudents: number;
  averageMarks: number;
}

interface DashboardData {
  stats: ExaminationStats;
  recentExams: Examination[];
  upcomingSchedules: ExamSchedule[];
}

const ExaminationDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [examinations, setExaminations] = useState<Examination[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [reportCards, setReportCards] = useState<ReportCard[]>([]);
  const [isCreateExamOpen, setIsCreateExamOpen] = useState(false);
  const [newExam, setNewExam] = useState({
    name: '',
    type: '',
    class: '',
    startDate: '',
    endDate: '',
    totalMarks: '',
    passingMarks: ''
  });

  useEffect(() => {
    fetchDashboardData();
    fetchExaminations();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/examination/dashboard');
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchExaminations = async () => {
    try {
      const response = await fetch('/api/examination/examinations');
      const data = await response.json();
      setExaminations(data);
    } catch (error) {
      console.error('Error fetching examinations:', error);
    }
  };

  const fetchExamResults = async (examId: string) => {
    try {
      const response = await fetch(`/api/examination/examinations/${examId}/results`);
      const data = await response.json();
      setExamResults(data);
    } catch (error) {
      console.error('Error fetching exam results:', error);
    }
  };

  const fetchReportCards = async (examId: string) => {
    try {
      const response = await fetch(`/api/examination/examinations/${examId}/report-cards`);
      const data = await response.json();
      setReportCards(data);
    } catch (error) {
      console.error('Error fetching report cards:', error);
    }
  };

  const handleCreateExam = async () => {
    try {
      const response = await fetch('/api/examination/examinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newExam,
          totalMarks: parseInt(newExam.totalMarks),
          passingMarks: parseInt(newExam.passingMarks),
          status: 'upcoming'
        }),
      });

      if (response.ok) {
        setIsCreateExamOpen(false);
        setNewExam({
          name: '',
          type: '',
          class: '',
          startDate: '',
          endDate: '',
          totalMarks: '',
          passingMarks: ''
        });
        fetchExaminations();
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error creating examination:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getExamTypeText = (type: string) => {
    switch (type) {
      case 'annual':
        return 'বার্ষিক';
      case 'half_yearly':
        return 'ষাণ্মাসিক';
      case 'quarterly':
        return 'ত্রৈমাসিক';
      case 'monthly':
        return 'মাসিক';
      default:
        return type;
    }
  };

  if (!dashboardData) {
    return <div className="flex justify-center items-center h-64">লোড হচ্ছে...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">পরীক্ষা ব্যবস্থাপনা</h1>
          <p className="text-gray-600 mt-1">পরীক্ষার সময়সূচি এবং ফলাফল ব্যবস্থাপনা</p>
        </div>
        <Dialog open={isCreateExamOpen} onOpenChange={setIsCreateExamOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              নতুন পরীক্ষা
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>নতুন পরীক্ষা তৈরি করুন</DialogTitle>
              <DialogDescription>
                পরীক্ষার বিস্তারিত তথ্য প্রদান করুন
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="examName">পরীক্ষার নাম</Label>
                <Input
                  id="examName"
                  value={newExam.name}
                  onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
                  placeholder="পরীক্ষার নাম লিখুন"
                />
              </div>
              <div>
                <Label htmlFor="examType">পরীক্ষার ধরন</Label>
                <Select value={newExam.type} onValueChange={(value) => setNewExam({ ...newExam, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="পরীক্ষার ধরন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">বার্ষিক</SelectItem>
                    <SelectItem value="half_yearly">ষাণ্মাসিক</SelectItem>
                    <SelectItem value="quarterly">ত্রৈমাসিক</SelectItem>
                    <SelectItem value="monthly">মাসিক</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="examClass">শ্রেণী</Label>
                <Select value={newExam.class} onValueChange={(value) => setNewExam({ ...newExam, class: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="শ্রেণী নির্বাচ��� করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class-6">৬ম শ্রেণী</SelectItem>
                    <SelectItem value="class-7">৭ম শ্রেণী</SelectItem>
                    <SelectItem value="class-8">৮ম শ্রেণী</SelectItem>
                    <SelectItem value="class-9">৯ম শ্রেণী</SelectItem>
                    <SelectItem value="class-10">১০ম শ্রেণী</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">শুরুর তারিখ</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newExam.startDate}
                    onChange={(e) => setNewExam({ ...newExam, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">শেষের তারিখ</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newExam.endDate}
                    onChange={(e) => setNewExam({ ...newExam, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalMarks">পূর্ণ নম্বর</Label>
                  <Input
                    id="totalMarks"
                    type="number"
                    value={newExam.totalMarks}
                    onChange={(e) => setNewExam({ ...newExam, totalMarks: e.target.value })}
                    placeholder="৫০০"
                  />
                </div>
                <div>
                  <Label htmlFor="passingMarks">পাশের নম্বর</Label>
                  <Input
                    id="passingMarks"
                    type="number"
                    value={newExam.passingMarks}
                    onChange={(e) => setNewExam({ ...newExam, passingMarks: e.target.value })}
                    placeholder="২৫০"
                  />
                </div>
              </div>
              <Button onClick={handleCreateExam} className="w-full bg-green-600 hover:bg-green-700">
                পরীক্ষা তৈরি করুন
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">মোট পরীক্ষা</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalExams}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">আসন্ন পরীক্ষা</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.upcomingExams}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">সম্পন্ন পরীক্ষা</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.completedExams}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">মোট ফলাফল</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalResults}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">পাস শিক্ষার্থী</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.passedStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-indigo-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">গড় নম্বর</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.averageMarks.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Examinations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>সাম্প্রতিক পরীক্ষাসমূহ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentExams.map((exam) => (
                <div key={exam.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{exam.name}</h3>
                    <Badge className={getStatusColor(exam.status)}>
                      {exam.status === 'upcoming' ? 'আসন্ন' : 
                       exam.status === 'ongoing' ? 'চলমান' : 'সম্পন্ন'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">ধরন:</span> {getExamTypeText(exam.type)}
                    </div>
                    <div>
                      <span className="font-medium">শ্রেণী:</span> {exam.class}
                    </div>
                    <div>
                      <span className="font-medium">শুরু:</span> {new Date(exam.startDate).toLocaleDateString('bn-BD')}
                    </div>
                    <div>
                      <span className="font-medium">শেষ:</span> {new Date(exam.endDate).toLocaleDateString('bn-BD')}
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedExam(exam.id);
                        fetchExamResults(exam.id);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      বিস্তারিত
                    </Button>
                    {exam.status === 'completed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => fetchReportCards(exam.id)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        রিপোর্ট কার্ড
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Schedules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <span>আসন্ন পরীক্ষার সময়সূচি</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.upcomingSchedules.map((schedule) => (
                <div key={schedule.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{schedule.subject}</h3>
                    <Badge variant="outline">{schedule.marks} নম্বর</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">তারিখ:</span> {new Date(schedule.date).toLocaleDateString('bn-BD')}
                    </div>
                    <div>
                      <span className="font-medium">সময়:</span> {schedule.startTime} - {schedule.endTime}
                    </div>
                    <div>
                      <span className="font-medium">কক্ষ:</span> {schedule.room}
                    </div>
                    <div>
                      <span className="font-medium">পরীক্ষক:</span> {schedule.invigilator}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Examinations */}
      <Card>
        <CardHeader>
          <CardTitle>সমস্ত পরীক্ষা</CardTitle>
          <CardDescription>সকল পরীক্ষার তালিকা এবং বিস্তারিত তথ্য</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">পরীক্ষার নাম</th>
                  <th className="text-left p-2">ধরন</th>
                  <th className="text-left p-2">শ্রেণী</th>
                  <th className="text-left p-2">শুরুর তারিখ</th>
                  <th className="text-left p-2">শেষের তারিখ</th>
                  <th className="text-left p-2">অবস্থা</th>
                  <th className="text-left p-2">কার্যক্রম</th>
                </tr>
              </thead>
              <tbody>
                {examinations.map((exam) => (
                  <tr key={exam.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{exam.name}</td>
                    <td className="p-2">{getExamTypeText(exam.type)}</td>
                    <td className="p-2">{exam.class}</td>
                    <td className="p-2">{new Date(exam.startDate).toLocaleDateString('bn-BD')}</td>
                    <td className="p-2">{new Date(exam.endDate).toLocaleDateString('bn-BD')}</td>
                    <td className="p-2">
                      <Badge className={getStatusColor(exam.status)}>
                        {exam.status === 'upcoming' ? 'আসন্ন' : 
                         exam.status === 'ongoing' ? 'চলমান' : 'সম্পন্ন'}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {exam.status === 'completed' && (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExaminationDashboard;
