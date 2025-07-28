import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useLocalStorage, useNotifications } from '@/hooks/useLocalData';
import { 
  Users, 
  UserPlus, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  GraduationCap,
  AlertCircle
} from 'lucide-react';
import Navigation from '@/components/Navigation';

interface AdmissionApplication {
  id: string;
  applicationNumber: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  nationality: string;
  religion: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  phoneNumber: string;
  email?: string;
  guardianName: string;
  guardianPhone: string;
  guardianRelation: string;
  previousInstitution?: string;
  lastClass?: string;
  gpa?: number;
  appliedClass: string;
  appliedSection: string;
  admissionFee: number;
  monthlyFee: number;
  status: 'pending' | 'interview_scheduled' | 'interview_completed' | 'approved' | 'rejected' | 'enrolled';
  submissionDate: string;
  interviewDate?: string;
  interviewScore?: number;
  interviewNotes?: string;
  approvalDate?: string;
  rejectionReason?: string;
  enrollmentDate?: string;
  documents: AdmissionDocument[];
  createdAt: string;
}

interface AdmissionDocument {
  id: string;
  type: 'birth_certificate' | 'photo' | 'previous_certificate' | 'guardian_id' | 'other';
  name: string;
  submitted: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  notes?: string;
}

interface AdmissionStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  enrolledStudents: number;
  todayApplications: number;
  approvalRate: number;
  averageProcessingDays: number;
}

interface AdmissionRequirement {
  id: string;
  className: string;
  minimumAge: number;
  maximumAge: number;
  requiredDocuments: string[];
  admissionFee: number;
  monthlyFee: number;
  totalSeats: number;
  availableSeats: number;
  admissionTestRequired: boolean;
  interviewRequired: boolean;
  isActive: boolean;
}

export default function AdmissionDashboard() {
  const [applications, setApplications] = useLocalStorage<AdmissionApplication[]>('admissionApplications', []);
  const [requirements, setRequirements] = useLocalStorage<AdmissionRequirement[]>('admissionRequirements', []);
  const [stats, setStats] = useState<AdmissionStats>({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    enrolledStudents: 0,
    todayApplications: 0,
    approvalRate: 0,
    averageProcessingDays: 0
  });

  const { addNotification } = useNotifications();
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const [isRequirementDialogOpen, setIsRequirementDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<AdmissionApplication | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<AdmissionApplication | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize with sample data if empty
  useEffect(() => {
    if (applications.length === 0) {
      const sampleDocuments: AdmissionDocument[] = [
        { id: '1', type: 'birth_certificate', name: 'জন্ম সনদ', submitted: true, verificationStatus: 'verified' },
        { id: '2', type: 'photo', name: 'পাসপোর্ট সাইজ ছবি', submitted: true, verificationStatus: 'verified' },
        { id: '3', type: 'previous_certificate', name: 'পূর্ববর্তী শিক্ষার সনদ', submitted: true, verificationStatus: 'pending' },
        { id: '4', type: 'guardian_id', name: 'অভিভাবকের পরিচয়পত্র', submitted: false, verificationStatus: 'pending' }
      ];

      const sampleApplications: AdmissionApplication[] = [
        {
          id: '1',
          applicationNumber: 'ADM-2024-001',
          studentName: 'মোহাম্মদ আব্দুল্লাহ রহমান',
          fatherName: 'মোহাম্মদ আব্দুর রহমান',
          motherName: 'ফাতিমা খাতুন',
          dateOfBirth: '2010-05-15',
          gender: 'male',
          nationality: 'বাংলাদেশী',
          religion: 'ইসলাম',
          bloodGroup: 'B+',
          presentAddress: 'বাড়ি নং ২৫, রোড নং ৩, ধানমন্ডি, ঢাকা',
          permanentAddress: 'গ্রাম: কামারপাড়া, উপজেলা: কালিয়াকৈর, জেলা: গাজীপুর',
          phoneNumber: '০১৭১১১১১১১১',
          email: 'abdullah@example.com',
          guardianName: 'মোহাম্মদ আব্দুর রহমান',
          guardianPhone: '০১৭১১১১১১১১',
          guardianRelation: 'পিতা',
          previousInstitution: 'ঢাকা মডেল স্কুল',
          lastClass: 'অষ্টম শ্রেণী',
          gpa: 5.0,
          appliedClass: 'নবম শ্রেণী',
          appliedSection: 'ক',
          admissionFee: 5000,
          monthlyFee: 2000,
          status: 'pending',
          submissionDate: '2024-01-15',
          documents: sampleDocuments,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          applicationNumber: 'ADM-2024-002',
          studentName: 'আয়েশা সিদ্দিকা',
          fatherName: 'মোহাম্মদ সিদ্দিক আহমেদ',
          motherName: 'রাবিয়া খাতুন',
          dateOfBirth: '2009-08-22',
          gender: 'female',
          nationality: 'বাংলাদেশী',
          religion: 'ইসলাম',
          bloodGroup: 'A+',
          presentAddress: 'বাড়ি নং ১২, গুলশান ২, ঢাকা',
          permanentAddress: 'গ্রাম: মিরপুর, উপজেলা: সাভার, জেলা: ঢাকা',
          phoneNumber: '০১৮২২২২২২২২',
          guardianName: 'মোহাম্মদ সিদ্দিক আহমেদ',
          guardianPhone: '০১৮২২২২২২২২',
          guardianRelation: 'পিতা',
          previousInstitution: 'ইডিয়াল স্কুল',
          lastClass: 'নবম শ্রেণী',
          gpa: 4.8,
          appliedClass: 'দশম শ্রেণী',
          appliedSection: 'খ',
          admissionFee: 5000,
          monthlyFee: 2000,
          status: 'approved',
          submissionDate: '2024-01-10',
          approvalDate: '2024-01-20',
          interviewDate: '2024-01-18',
          interviewScore: 85,
          interviewNotes: 'খুবই মেধাবী ছাত্রী, ভর্তির জন্য উপযুক্ত',
          documents: sampleDocuments.map(doc => ({ ...doc, submitted: true, verificationStatus: 'verified' as const })),
          createdAt: new Date().toISOString()
        }
      ];
      setApplications(sampleApplications);

      const sampleRequirements: AdmissionRequirement[] = [
        {
          id: '1',
          className: 'নবম শ্রেণী',
          minimumAge: 14,
          maximumAge: 17,
          requiredDocuments: ['জন্ম সনদ', 'পাসপোর্ট সাইজ ছবি', 'JSC সনদ', 'অভিভাবকের পরিচয়পত্র'],
          admissionFee: 5000,
          monthlyFee: 2000,
          totalSeats: 120,
          availableSeats: 85,
          admissionTestRequired: true,
          interviewRequired: true,
          isActive: true
        },
        {
          id: '2',
          className: 'দশম শ্রেণী',
          minimumAge: 15,
          maximumAge: 18,
          requiredDocuments: ['জন্ম সনদ', 'পাসপোর্ট সাইজ ছবি', 'SSC সনদ', 'অভিভাবকের পর���চয়পত্র'],
          admissionFee: 5000,
          monthlyFee: 2000,
          totalSeats: 100,
          availableSeats: 67,
          admissionTestRequired: true,
          interviewRequired: true,
          isActive: true
        },
        {
          id: '3',
          className: 'আলিম ১ম বর্ষ',
          minimumAge: 16,
          maximumAge: 20,
          requiredDocuments: ['জন্ম সনদ', 'পাসপোর্ট সাইজ ছবি', 'HSC/দাখিল সনদ', 'অভিভাবকের পরিচয়পত্র'],
          admissionFee: 7000,
          monthlyFee: 2500,
          totalSeats: 80,
          availableSeats: 52,
          admissionTestRequired: true,
          interviewRequired: true,
          isActive: true
        }
      ];
      setRequirements(sampleRequirements);
    }
  }, [applications.length, setApplications, setRequirements]);

  // Calculate stats
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    
    const totalApplications = applications.length;
    const pendingApplications = applications.filter(a => a.status === 'pending').length;
    const approvedApplications = applications.filter(a => a.status === 'approved').length;
    const rejectedApplications = applications.filter(a => a.status === 'rejected').length;
    const enrolledStudents = applications.filter(a => a.status === 'enrolled').length;
    const todayApplications = applications.filter(a => a.submissionDate === today).length;
    
    const approvalRate = totalApplications > 0 ? Math.round((approvedApplications / totalApplications) * 100) : 0;
    
    // Calculate average processing days
    const processedApplications = applications.filter(a => a.approvalDate || a.rejectionReason);
    const averageProcessingDays = processedApplications.length > 0 
      ? Math.round(processedApplications.reduce((sum, app) => {
          const submissionDate = new Date(app.submissionDate);
          const processedDate = new Date(app.approvalDate || app.submissionDate);
          const daysDiff = Math.abs(processedDate.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24);
          return sum + daysDiff;
        }, 0) / processedApplications.length)
      : 0;

    setStats({
      totalApplications,
      pendingApplications,
      approvedApplications,
      rejectedApplications,
      enrolledStudents,
      todayApplications,
      approvalRate,
      averageProcessingDays
    });
  }, [applications]);

  const handleAddApplication = (applicationData: Omit<AdmissionApplication, 'id' | 'createdAt' | 'applicationNumber'>) => {
    const applicationNumber = `ADM-${new Date().getFullYear()}-${String(applications.length + 1).padStart(3, '0')}`;
    const newApplication: AdmissionApplication = {
      ...applicationData,
      id: Date.now().toString(),
      applicationNumber,
      createdAt: new Date().toISOString()
    };
    setApplications([...applications, newApplication]);
    addNotification('ভর্তির আবেদন সফলভাবে জমা হয়েছে', 'success');
    setIsApplicationDialogOpen(false);
  };

  const handleAddRequirement = (requirementData: Omit<AdmissionRequirement, 'id'>) => {
    const newRequirement: AdmissionRequirement = {
      ...requirementData,
      id: Date.now().toString()
    };
    setRequirements([...requirements, newRequirement]);
    addNotification('ভর্তির শর্তাবলী সফলভাবে যোগ করা হয়েছে', 'success');
    setIsRequirementDialogOpen(false);
  };

  const updateApplicationStatus = (applicationId: string, newStatus: AdmissionApplication['status'], additionalData?: Partial<AdmissionApplication>) => {
    const updatedApplications = applications.map(app =>
      app.id === applicationId 
        ? { 
            ...app, 
            status: newStatus,
            ...additionalData,
            ...(newStatus === 'approved' && { approvalDate: new Date().toISOString().split('T')[0] }),
            ...(newStatus === 'enrolled' && { enrollmentDate: new Date().toISOString().split('T')[0] })
          }
        : app
    );
    setApplications(updatedApplications);
    addNotification('আবেদনের অবস্থা আপডেট হয়েছে', 'success');
  };

  const handleDeleteApplication = (applicationId: string) => {
    const updatedApplications = applications.filter(a => a.id !== applicationId);
    setApplications(updatedApplications);
    addNotification('আবেদন মুছে ফেলা হয়েছে', 'success');
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      pending: "outline",
      interview_scheduled: "default",
      interview_completed: "secondary",
      approved: "default",
      rejected: "destructive",
      enrolled: "secondary"
    };
    
    const labels: { [key: string]: string } = {
      pending: 'অপেক্ষায়',
      interview_scheduled: 'ইন্টারভিউ নির্ধারিত',
      interview_completed: 'ইন্টারভিউ সম���পন্ন',
      approved: 'অনুমোদিত',
      rejected: 'প্রত্যাখ্যাত',
      enrolled: 'ভর্তি সম্পন্ন'
    };

    return (
      <Badge variant={variants[status] || "secondary"}>
        {labels[status] || status}
      </Badge>
    );
  };

  const getVerificationBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      pending: "outline",
      verified: "default",
      rejected: "destructive"
    };
    
    const labels: { [key: string]: string } = {
      pending: 'যাচাইকরণ অপেক্ষায়',
      verified: 'যাচাইকৃত',
      rejected: 'প্রত্যাখ্যাত'
    };

    return (
      <Badge variant={variants[status] || "secondary"} className="text-xs">
        {labels[status] || status}
      </Badge>
    );
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phoneNumber.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100" style={{ fontFamily: '"Noto Serif Bengali", serif' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">ভর্তি ড্যাশবোর্ড</h1>
          <p className="text-emerald-600">ভর্তির আবেদন ব্যবস্থাপনা ও প্রক্রিয়াকরণ</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">মোট আবেদন</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{stats.totalApplications}</div>
              <p className="text-xs text-blue-600">আজ: {stats.todayApplications}</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">অপেক্ষায়</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{stats.pendingApplications}</div>
              <p className="text-xs text-orange-600">প্রক্রিয়াকরণের অপেক্ষায়</p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">অনুমোদিত</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{stats.approvedApplications}</div>
              <p className="text-xs text-green-600">ভর্তি: {stats.enrolledStudents}</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">অনুমোদনের হার</CardTitle>
              <GraduationCap className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{stats.approvalRate}%</div>
              <Progress value={stats.approvalRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-indigo-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="text-indigo-700">গড় প্রক্রিয়াকরণ সময়</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-800">{stats.averageProcessingDays}</div>
              <p className="text-indigo-600">দিন</p>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">প্রত্যাখ্যাত আবেদন</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-800">{stats.rejectedApplications}</div>
              <p className="text-red-600">মোট আবেদনের {stats.totalApplications > 0 ? Math.round((stats.rejectedApplications / stats.totalApplications) * 100) : 0}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="applications">আবেদন তালিকা</TabsTrigger>
            <TabsTrigger value="requirements">ভর্তির শর্তাবলী</TabsTrigger>
            <TabsTrigger value="seats">আসন পরিস্থিতি</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Input
                  placeholder="নাম, আবেদন নম্বর বা ফোন নম্বর দিয়ে খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80"
                />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সকল আবেদন</SelectItem>
                    <SelectItem value="pending">অপেক্ষায়</SelectItem>
                    <SelectItem value="interview_scheduled">ইন্টারভিউ নির্ধারিত</SelectItem>
                    <SelectItem value="interview_completed">ইন্টারভিউ সম্পন্ন</SelectItem>
                    <SelectItem value="approved">অনুমোদিত</SelectItem>
                    <SelectItem value="rejected">প্রত্যাখ্যাত</SelectItem>
                    <SelectItem value="enrolled">ভর্তি সম্পন্ন</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isApplicationDialogOpen} onOpenChange={setIsApplicationDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন আবেদন
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>নতুন ভর্তির আবেদন</DialogTitle>
                    <DialogDescription>
                      আবেদনকারীর সম্পূর্ণ তথ্য পূরণ করুন
                    </DialogDescription>
                  </DialogHeader>
                  <ApplicationForm requirements={requirements} onSubmit={handleAddApplication} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {filteredApplications.map((application) => (
                <Card key={application.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1" onClick={() => setSelectedApplication(application)}>
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold">{application.studentName}</h3>
                          <Badge variant="outline">{application.applicationNumber}</Badge>
                          {getStatusBadge(application.status)}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">
                              <GraduationCap className="w-4 h-4 inline mr-1" />
                              আবেদিত শ্রেণী: {application.appliedClass}
                            </p>
                            <p className="text-gray-600 mb-1">
                              <Phone className="w-4 h-4 inline mr-1" />
                              ফোন: {application.phoneNumber}
                            </p>
                            <p className="text-gray-600">
                              <Calendar className="w-4 h-4 inline mr-1" />
                              আবেদনের তারিখ: {new Date(application.submissionDate).toLocaleDateString('bn-BD')}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">পিতার নাম: {application.fatherName}</p>
                            <p className="text-gray-600 mb-1">অভিভাবক: {application.guardianName}</p>
                            <p className="text-gray-600">ভর্তি ফি: ৳{application.admissionFee}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          {application.documents.slice(0, 3).map((doc, index) => (
                            <span key={index} className="text-xs">
                              {getVerificationBadge(doc.verificationStatus)}
                            </span>
                          ))}
                          {application.documents.length > 3 && (
                            <span className="text-xs text-gray-500">+{application.documents.length - 3} আরো</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Select
                          value={application.status}
                          onValueChange={(value: AdmissionApplication['status']) => updateApplicationStatus(application.id, value)}
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">অপেক্ষায়</SelectItem>
                            <SelectItem value="interview_scheduled">ইন্টারভিউ নির্ধারিত</SelectItem>
                            <SelectItem value="interview_completed">ইন্টারভিউ সম্পন্ন</SelectItem>
                            <SelectItem value="approved">অনুমোদিত</SelectItem>
                            <SelectItem value="rejected">প্রত্যাখ্যাত</SelectItem>
                            <SelectItem value="enrolled">ভর্তি সম্পন্ন</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteApplication(application.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Application Details Dialog */}
            {selectedApplication && (
              <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>আবেদনের বিস্তারিত - {selectedApplication.applicationNumber}</DialogTitle>
                  </DialogHeader>
                  <ApplicationDetails application={selectedApplication} />
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          {/* Requirements Tab */}
          <TabsContent value="requirements" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-emerald-800">ভর্তির শর্তাবলী</h2>
              <Dialog open={isRequirementDialogOpen} onOpenChange={setIsRequirementDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    ন��ুন শর্তাবলী
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>ভর্তির শর্তাবলী যোগ</DialogTitle>
                  </DialogHeader>
                  <RequirementForm onSubmit={handleAddRequirement} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {requirements.map((requirement) => (
                <Card key={requirement.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold">{requirement.className}</h3>
                          <Badge variant={requirement.isActive ? "default" : "secondary"}>
                            {requirement.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">বয়স: {requirement.minimumAge} - {requirement.maximumAge} বছর</p>
                            <p className="text-gray-600 mb-1">ভর্তি ফি: ৳{requirement.admissionFee}</p>
                            <p className="text-gray-600 mb-1">মাসিক ফি: ৳{requirement.monthlyFee}</p>
                            <p className="text-gray-600">মোট আসন: {requirement.totalSeats}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">উপলব্ধ আসন: {requirement.availableSeats}</p>
                            <p className="text-gray-600 mb-1">ভর্তি পরীক্ষা: {requirement.admissionTestRequired ? 'প্রয়োজন' : 'প্রয়োজন নেই'}</p>
                            <p className="text-gray-600">ইন্টারভিউ: {requirement.interviewRequired ? 'প্রয়োজন' : 'প্রয়োজন নেই'}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">প্রয়োজনীয় কাগজপত্র:</p>
                          <div className="flex flex-wrap gap-2">
                            {requirement.requiredDocuments.map((doc, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Seats Tab */}
          <TabsContent value="seats" className="space-y-6">
            <h2 className="text-2xl font-semibold text-emerald-800">আসন পরিস্থিতি</h2>
            
            <div className="grid gap-4">
              {requirements.map((requirement) => {
                const applicationsForClass = applications.filter(app => app.appliedClass === requirement.className);
                const approvedForClass = applicationsForClass.filter(app => app.status === 'approved' || app.status === 'enrolled').length;
                const occupancyRate = (approvedForClass / requirement.totalSeats) * 100;
                
                return (
                  <Card key={requirement.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{requirement.className}</h3>
                          <p className="text-gray-600">মোট আবেদন: {applicationsForClass.length}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-emerald-800">
                            {requirement.availableSeats}/{requirement.totalSeats}
                          </div>
                          <p className="text-sm text-gray-600">উপলব্ধ আসন</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>আসন দখলের হার</span>
                            <span>{Math.round(occupancyRate)}%</span>
                          </div>
                          <Progress value={occupancyRate} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-semibold text-blue-800">{applicationsForClass.filter(a => a.status === 'pending').length}</div>
                            <div className="text-blue-600">অপেক্ষায়</div>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="font-semibold text-green-800">{applicationsForClass.filter(a => a.status === 'approved').length}</div>
                            <div className="text-green-600">অনুমোদিত</div>
                          </div>
                          <div className="text-center p-2 bg-purple-50 rounded">
                            <div className="font-semibold text-purple-800">{applicationsForClass.filter(a => a.status === 'enrolled').length}</div>
                            <div className="text-purple-600">ভর্তি সম্পন্ন</div>
                          </div>
                          <div className="text-center p-2 bg-red-50 rounded">
                            <div className="font-semibold text-red-800">{applicationsForClass.filter(a => a.status === 'rejected').length}</div>
                            <div className="text-red-600">প্রত্যাখ্যাত</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ApplicationForm({ 
  requirements, 
  onSubmit 
}: { 
  requirements: AdmissionRequirement[];
  onSubmit: (data: Omit<AdmissionApplication, 'id' | 'createdAt' | 'applicationNumber'>) => void;
}) {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: 'male' as const,
    nationality: 'বাংলাদেশী',
    religion: 'ইসলাম',
    bloodGroup: '',
    presentAddress: '',
    permanentAddress: '',
    phoneNumber: '',
    email: '',
    guardianName: '',
    guardianPhone: '',
    guardianRelation: 'পিতা',
    previousInstitution: '',
    lastClass: '',
    gpa: 0,
    appliedClass: '',
    appliedSection: '',
    admissionFee: 0,
    monthlyFee: 0,
    status: 'pending' as const,
    submissionDate: new Date().toISOString().split('T')[0],
    documents: [] as AdmissionDocument[]
  });

  const selectedRequirement = requirements.find(r => r.className === formData.appliedClass);

  useEffect(() => {
    if (selectedRequirement) {
      setFormData(prev => ({
        ...prev,
        admissionFee: selectedRequirement.admissionFee,
        monthlyFee: selectedRequirement.monthlyFee,
        documents: selectedRequirement.requiredDocuments.map((doc, index) => ({
          id: (index + 1).toString(),
          type: 'other' as const,
          name: doc,
          submitted: false,
          verificationStatus: 'pending' as const
        }))
      }));
    }
  }, [selectedRequirement]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ব্যক্তিগত তথ্য</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="studentName">শিক্ষার্থীর নাম *</Label>
            <Input
              id="studentName"
              value={formData.studentName}
              onChange={(e) => setFormData({...formData, studentName: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">জন্ম তারিখ *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fatherName">পিতার নাম *</Label>
            <Input
              id="fatherName"
              value={formData.fatherName}
              onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="motherName">মাতার নাম *</Label>
            <Input
              id="motherName"
              value={formData.motherName}
              onChange={(e) => setFormData({...formData, motherName: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">লিঙ্গ *</Label>
            <Select value={formData.gender} onValueChange={(value: 'male' | 'female') => setFormData({...formData, gender: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">পুরুষ</SelectItem>
                <SelectItem value="female">মহিলা</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bloodGroup">রক্তের গ্রুপ</Label>
            <Select value={formData.bloodGroup} onValueChange={(value) => setFormData({...formData, bloodGroup: value})}>
              <SelectTrigger>
                <SelectValue placeholder="নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">যোগাযোগের তথ্য</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="presentAddress">বর্তমান ঠিকানা *</Label>
            <Textarea
              id="presentAddress"
              value={formData.presentAddress}
              onChange={(e) => setFormData({...formData, presentAddress: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="permanentAddress">স্থায়ী ঠিকানা *</Label>
            <Textarea
              id="permanentAddress"
              value={formData.permanentAddress}
              onChange={(e) => setFormData({...formData, permanentAddress: e.target.value})}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">ফোন নম্বর *</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                placeholder="০১৭xxxxxxxx"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">ইমেইল</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="example@email.com"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Guardian Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">অভিভাবকের তথ্য</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="guardianName">অভিভাবকের নাম *</Label>
            <Input
              id="guardianName"
              value={formData.guardianName}
              onChange={(e) => setFormData({...formData, guardianName: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guardianPhone">অভিভাবকের ফোন *</Label>
            <Input
              id="guardianPhone"
              value={formData.guardianPhone}
              onChange={(e) => setFormData({...formData, guardianPhone: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guardianRelation">সম্পর্ক *</Label>
            <Select value={formData.guardianRelation} onValueChange={(value) => setFormData({...formData, guardianRelation: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="পিতা">পিতা</SelectItem>
                <SelectItem value="মাতা">মাতা</SelectItem>
                <SelectItem value="ভাই">ভাই</SelectItem>
                <SelectItem value="বোন">বোন</SelectItem>
                <SelectItem value="চাচা">চাচা</SelectItem>
                <SelectItem value="মামা">মামা</SelectItem>
                <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">শিক্ষাগত তথ্য</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="appliedClass">আবেদিত শ্রেণী *</Label>
            <Select value={formData.appliedClass} onValueChange={(value) => setFormData({...formData, appliedClass: value})}>
              <SelectTrigger>
                <SelectValue placeholder="শ্রেণী নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {requirements.filter(r => r.isActive).map((req) => (
                  <SelectItem key={req.id} value={req.className}>
                    {req.className} (উপলব্ধ: {req.availableSeats})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="appliedSection">শাখা *</Label>
            <Select value={formData.appliedSection} onValueChange={(value) => setFormData({...formData, appliedSection: value})}>
              <SelectTrigger>
                <SelectValue placeholder="শাখা নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ক">ক</SelectItem>
                <SelectItem value="খ">খ</SelectItem>
                <SelectItem value="গ">গ</SelectItem>
                <SelectItem value="ঘ">ঘ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="previousInstitution">পূর্ববর্তী শিক্ষা প্রতিষ্ঠান</Label>
            <Input
              id="previousInstitution"
              value={formData.previousInstitution}
              onChange={(e) => setFormData({...formData, previousInstitution: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastClass">সর্বশেষ উত্তীর্ণ শ্রেণী</Label>
            <Input
              id="lastClass"
              value={formData.lastClass}
              onChange={(e) => setFormData({...formData, lastClass: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gpa">জিপিএ/গ্রেড</Label>
            <Input
              id="gpa"
              type="number"
              step="0.01"
              max="5"
              value={formData.gpa}
              onChange={(e) => setFormData({...formData, gpa: parseFloat(e.target.value) || 0})}
            />
          </div>
        </div>
      </div>

      {/* Fee Information */}
      {selectedRequirement && (
        <div>
          <h3 className="text-lg font-semibold mb-4">ফি এর তথ্য</h3>
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
            <div>
              <Label>ভর্তি ফি</Label>
              <div className="text-xl font-semibold text-emerald-600">৳{selectedRequirement.admissionFee}</div>
            </div>
            <div>
              <Label>মাসিক ফি</Label>
              <div className="text-xl font-semibold text-emerald-600">৳{selectedRequirement.monthlyFee}</div>
            </div>
          </div>
        </div>
      )}

      <DialogFooter>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          আবেদন জমা দিন
        </Button>
      </DialogFooter>
    </form>
  );
}

function ApplicationDetails({ application }: { application: AdmissionApplication }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">ব্যক্তিগত তথ্য</h3>
          <div className="space-y-2 text-sm">
            <p><strong>নাম:</strong> {application.studentName}</p>
            <p><strong>পিতা:</strong> {application.fatherName}</p>
            <p><strong>মাতা:</strong> {application.motherName}</p>
            <p><strong>জন্ম তারিখ:</strong> {new Date(application.dateOfBirth).toLocaleDateString('bn-BD')}</p>
            <p><strong>লিঙ্গ:</strong> {application.gender === 'male' ? 'পুরুষ' : 'মহিলা'}</p>
            <p><strong>রক্তের গ্রুপ:</strong> {application.bloodGroup}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">যোগাযোগের তথ্য</h3>
          <div className="space-y-2 text-sm">
            <p><strong>ফোন:</strong> {application.phoneNumber}</p>
            <p><strong>ইমেইল:</strong> {application.email || 'নেই'}</p>
            <p><strong>অভিভাবক:</strong> {application.guardianName} ({application.guardianRelation})</p>
            <p><strong>অভিভাবকের ফোন:</strong> {application.guardianPhone}</p>
            <p><strong>বর্তমান ঠিকানা:</strong> {application.presentAddress}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">শিক্ষাগত তথ্য</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><strong>আবেদিত শ্রেণী:</strong> {application.appliedClass} ({application.appliedSection})</p>
          <p><strong>পূর্ববর্তী প্রতিষ্ঠান:</strong> {application.previousInstitution || 'উল্লেখ নেই'}</p>
          <p><strong>সর্বশেষ শ্রেণী:</strong> {application.lastClass || 'উল্লেখ নেই'}</p>
          <p><strong>জিপিএ:</strong> {application.gpa || 'উল্লেখ নেই'}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">কাগজপত্রের অবস্থা</h3>
        <div className="grid grid-cols-2 gap-2">
          {application.documents.map((doc) => (
            <div key={doc.id} className="flex justify-between items-center p-2 border rounded">
              <span className="text-sm">{doc.name}</span>
              <div className="flex gap-2">
                <Badge variant={doc.submitted ? "default" : "outline"}>
                  {doc.submitted ? 'জমা দেওয়া' : 'অপেক্ষায়'}
                </Badge>
                <Badge variant={doc.verificationStatus === 'verified' ? "default" : doc.verificationStatus === 'rejected' ? "destructive" : "outline"}>
                  {doc.verificationStatus === 'verified' ? 'যাচাইকৃত' : doc.verificationStatus === 'rejected' ? 'প্রত্যাখ্যাত' : 'অপেক্ষায়'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {application.interviewDate && (
        <div>
          <h3 className="text-lg font-semibold mb-3">ইন্টারভিউর তথ্য</h3>
          <div className="text-sm space-y-2">
            <p><strong>তারিখ:</strong> {new Date(application.interviewDate).toLocaleDateString('bn-BD')}</p>
            {application.interviewScore && <p><strong>স্কোর:</strong> {application.interviewScore}/100</p>}
            {application.interviewNotes && <p><strong>মন্তব্য:</strong> {application.interviewNotes}</p>}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-3">ফি এর তথ্য</h3>
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
          <div>
            <p className="text-sm text-gray-600">ভর্তি ফি</p>
            <p className="text-xl font-semibold text-emerald-600">৳{application.admissionFee}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">মাসিক ফি</p>
            <p className="text-xl font-semibold text-emerald-600">৳{application.monthlyFee}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequirementForm({ onSubmit }: { onSubmit: (data: Omit<AdmissionRequirement, 'id'>) => void }) {
  const [formData, setFormData] = useState({
    className: '',
    minimumAge: 14,
    maximumAge: 18,
    requiredDocuments: [] as string[],
    admissionFee: 5000,
    monthlyFee: 2000,
    totalSeats: 100,
    availableSeats: 100,
    admissionTestRequired: true,
    interviewRequired: true,
    isActive: true
  });

  const [newDocument, setNewDocument] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addDocument = () => {
    if (newDocument.trim()) {
      setFormData({...formData, requiredDocuments: [...formData.requiredDocuments, newDocument.trim()]});
      setNewDocument('');
    }
  };

  const removeDocument = (index: number) => {
    setFormData({...formData, requiredDocuments: formData.requiredDocuments.filter((_, i) => i !== index)});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="className">শ্রেণীর নাম *</Label>
          <Input
            id="className"
            value={formData.className}
            onChange={(e) => setFormData({...formData, className: e.target.value})}
            placeholder="নবম শ্রেণী"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalSeats">মোট আসন *</Label>
          <Input
            id="totalSeats"
            type="number"
            value={formData.totalSeats}
            onChange={(e) => setFormData({...formData, totalSeats: parseInt(e.target.value), availableSeats: parseInt(e.target.value)})}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minimumAge">সর্বনিম্ন বয়স *</Label>
          <Input
            id="minimumAge"
            type="number"
            value={formData.minimumAge}
            onChange={(e) => setFormData({...formData, minimumAge: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maximumAge">সর্বোচ্চ বয়স *</Label>
          <Input
            id="maximumAge"
            type="number"
            value={formData.maximumAge}
            onChange={(e) => setFormData({...formData, maximumAge: parseInt(e.target.value)})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="admissionFee">ভর্তি ফি (৳) *</Label>
          <Input
            id="admissionFee"
            type="number"
            value={formData.admissionFee}
            onChange={(e) => setFormData({...formData, admissionFee: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="monthlyFee">মাসিক ফি (৳) *</Label>
          <Input
            id="monthlyFee"
            type="number"
            value={formData.monthlyFee}
            onChange={(e) => setFormData({...formData, monthlyFee: parseInt(e.target.value)})}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>প্রয়োজনীয় কাগজপত্র</Label>
        <div className="flex gap-2">
          <Input
            value={newDocument}
            onChange={(e) => setNewDocument(e.target.value)}
            placeholder="কাগজপত্রের নাম"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDocument())}
          />
          <Button type="button" onClick={addDocument} variant="outline">
            যোগ করুন
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.requiredDocuments.map((doc, index) => (
            <Badge key={index} variant="outline" className="cursor-pointer" onClick={() => removeDocument(index)}>
              {doc} ×
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="admissionTestRequired"
            checked={formData.admissionTestRequired}
            onChange={(e) => setFormData({...formData, admissionTestRequired: e.target.checked})}
          />
          <Label htmlFor="admissionTestRequired">ভর্তি পরীক্ষা প্রয়োজন</Label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="interviewRequired"
            checked={formData.interviewRequired}
            onChange={(e) => setFormData({...formData, interviewRequired: e.target.checked})}
          />
          <Label htmlFor="interviewRequired">ইন্টারভিউ প্রয়োজন</Label>
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          শর্তাবলী যোগ করুন
        </Button>
      </DialogFooter>
    </form>
  );
}
