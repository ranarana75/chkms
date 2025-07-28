import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Users, UserCheck, Clock, CheckCircle, FileText, Calendar, School, Phone, Mail, MapPin, Plus, Eye, Download } from 'lucide-react';
import { AdmissionApplication, AdmissionSession, AdmissionTest } from '../../shared/database';

interface AdmissionStats {
  totalApplications: number;
  pendingApplications: number;
  selectedStudents: number;
  paidApplications: number;
  totalSeats: number;
  availableSeats: number;
}

interface DashboardData {
  stats: AdmissionStats;
  activeSession: AdmissionSession | null;
  recentApplications: AdmissionApplication[];
  upcomingTests: AdmissionTest[];
}

const AdmissionDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [sessions, setSessions] = useState<AdmissionSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>('');
  const [isCreateSessionOpen, setIsCreateSessionOpen] = useState(false);
  const [newSession, setNewSession] = useState({
    name: '',
    academicYear: '',
    startDate: '',
    endDate: '',
    totalSeats: '',
    applicationFee: ''
  });

  useEffect(() => {
    fetchDashboardData();
    fetchSessions();
    fetchApplications();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admission/dashboard');
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/admission/sessions');
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/admission/applications');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleCreateSession = async () => {
    try {
      const response = await fetch('/api/admission/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newSession,
          totalSeats: parseInt(newSession.totalSeats),
          applicationFee: parseInt(newSession.applicationFee),
          availableSeats: parseInt(newSession.totalSeats),
          status: 'active'
        }),
      });

      if (response.ok) {
        setIsCreateSessionOpen(false);
        setNewSession({
          name: '',
          academicYear: '',
          startDate: '',
          endDate: '',
          totalSeats: '',
          applicationFee: ''
        });
        fetchSessions();
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'selected':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'waiting':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'অপেক্ষমান';
      case 'selected':
        return 'নির্বাচিত';
      case 'rejected':
        return 'বাতিল';
      case 'waiting':
        return 'অপেক্ষমান তালিকা';
      default:
        return status;
    }
  };

  const getClassText = (classValue: string) => {
    switch (classValue) {
      case 'class-6':
        return '৬ষ্ঠ শ্রেণী';
      case 'class-7':
        return '৭ম শ্রেণী';
      case 'class-8':
        return '৮ম শ্রেণী';
      case 'class-9':
        return '৯ম শ্রেণী';
      case 'class-10':
        return '১০ম শ্রেণী';
      default:
        return classValue;
    }
  };

  if (!dashboardData) {
    return <div className="flex justify-center items-center h-64">লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ভর্তি ব্যবস্থাপনা</h1>
          <p className="text-gray-600 mt-1">অনলাইন ভর্তি আবেদন এবং নির্বাচন প্রক্রিয়া</p>
        </div>
        <Dialog open={isCreateSessionOpen} onOpenChange={setIsCreateSessionOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              নতুন সেশন
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>নতুন ভর্তি সেশন তৈরি করুন</DialogTitle>
              <DialogDescription>
                ভর্তি সেশনের বিস্ত��রিত তথ্য প্রদান করুন
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="sessionName">সেশ���ের নাম</Label>
                <Input
                  id="sessionName"
                  value={newSession.name}
                  onChange={(e) => setNewSession({ ...newSession, name: e.target.value })}
                  placeholder="ভর্তি ২০২৫"
                />
              </div>
              <div>
                <Label htmlFor="academicYear">শিক্ষাবর্ষ</Label>
                <Input
                  id="academicYear"
                  value={newSession.academicYear}
                  onChange={(e) => setNewSession({ ...newSession, academicYear: e.target.value })}
                  placeholder="২০২৫"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">শুরুর তারিখ</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newSession.startDate}
                    onChange={(e) => setNewSession({ ...newSession, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">শেষের তারিখ</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newSession.endDate}
                    onChange={(e) => setNewSession({ ...newSession, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalSeats">মোট আসন</Label>
                  <Input
                    id="totalSeats"
                    type="number"
                    value={newSession.totalSeats}
                    onChange={(e) => setNewSession({ ...newSession, totalSeats: e.target.value })}
                    placeholder="২০০"
                  />
                </div>
                <div>
                  <Label htmlFor="applicationFee">আবেদন ফি</Label>
                  <Input
                    id="applicationFee"
                    type="number"
                    value={newSession.applicationFee}
                    onChange={(e) => setNewSession({ ...newSession, applicationFee: e.target.value })}
                    placeholder="৫০০"
                  />
                </div>
              </div>
              <Button onClick={handleCreateSession} className="w-full bg-green-600 hover:bg-green-700">
                সেশন তৈরি করুন
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
                <p className="text-sm font-medium text-gray-600">মোট আবেদন</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalApplications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">অপেক্��মান</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.pendingApplications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">নির্বাচিত</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.selectedStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">পেমেন্ট সম্পন্ন</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.paidApplications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <School className="w-8 h-8 text-indigo-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">মোট আসন</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalSeats}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">উপলব্ধ আসন</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.availableSeats}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>সাম্প্রতিক আবেদনসমূহ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentApplications.map((application) => (
                <div key={application.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{application.studentName}</h3>
                    <Badge className={getStatusColor(application.status)}>
                      {getStatusText(application.status)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">শ্রেণী:</span> {getClassText(application.classAppliedFor)}
                    </div>
                    <div>
                      <span className="font-medium">আবেদনের তারিখ:</span> {new Date(application.applicationDate).toLocaleDateString('bn-BD')}
                    </div>
                    <div>
                      <span className="font-medium">পিতার নাম:</span> {application.fatherName}
                    </div>
                    <div>
                      <span className="font-medium">ফোন:</span> {application.guardianPhone}
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      বিস্তারিত
                    </Button>
                    {application.status === 'selected' && (
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        ভর্তি ফর্ম
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <span>আসন্ন পরীক্ষাসমূহ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.upcomingTests.map((test) => (
                <div key={test.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{test.testName}</h3>
                    <Badge variant="outline">{test.totalMarks} নম্বর</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">তারিখ:</span> {new Date(test.testDate).toLocaleDateString('bn-BD')}
                    </div>
                    <div>
                      <span className="font-medium">সময়:</span> {test.testTime}
                    </div>
                    <div>
                      <span className="font-medium">সময়কাল:</span> {test.duration} মিনিট
                    </div>
                    <div>
                      <span className="font-medium">স্থান:</span> {test.venue}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="font-medium text-sm text-gray-600">বিষয়সমূহ:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {test.subjects.map((subject, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Session Info */}
      {dashboardData.activeSession && (
        <Card>
          <CardHeader>
            <CardTitle>সক্রিয় ভর্তি সেশন</CardTitle>
            <CardDescription>{dashboardData.activeSession.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-600">শিক্ষাবর্ষ</p>
                <p className="text-lg font-semibold text-gray-900">{dashboardData.activeSession.academicYear}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">আবেদনের সময়সীমা</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(dashboardData.activeSession.startDate).toLocaleDateString('bn-BD')} - {new Date(dashboardData.activeSession.endDate).toLocaleDateString('bn-BD')}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">আবেদন ফি</p>
                <p className="text-lg font-semibold text-gray-900">৳{dashboardData.activeSession.applicationFee}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">অবস্থা</p>
                <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Applications */}
      <Card>
        <CardHeader>
          <CardTitle>সমস্ত আবেদন</CardTitle>
          <CardDescription>সকল ভর্তি আবেদনের তালিকা এবং বিস্তারিত তথ্য</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">আবেদনকারীর নাম</th>
                  <th className="text-left p-2">পিতার নাম</th>
                  <th className="text-left p-2">শ্রেণী</th>
                  <th className="text-left p-2">আবেদনের তারিখ</th>
                  <th className="text-left p-2">ফোন</th>
                  <th className="text-left p-2">অবস্থা</th>
                  <th className="text-left p-2">কার্যক্রম</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{application.studentName}</td>
                    <td className="p-2">{application.fatherName}</td>
                    <td className="p-2">{getClassText(application.classAppliedFor)}</td>
                    <td className="p-2">{new Date(application.applicationDate).toLocaleDateString('bn-BD')}</td>
                    <td className="p-2">{application.guardianPhone}</td>
                    <td className="p-2">
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusText(application.status)}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
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
    </div>
  );
};

export default AdmissionDashboard;
