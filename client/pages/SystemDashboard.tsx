import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  Shield, 
  Database, 
  Smartphone, 
  Mail, 
  MessageSquare, 
  Video, 
  GraduationCap, 
  Activity,
  CheckCircle,
  AlertTriangle,
  Settings,
  Download,
  Upload
} from 'lucide-react';

interface SystemModule {
  id: string;
  name: string;
  nameEn: string;
  status: 'active' | 'inactive' | 'maintenance';
  version: string;
  lastUpdated: string;
  description: string;
  features: string[];
}

interface SystemMetrics {
  uptime: number;
  totalUsers: number;
  activeUsers: number;
  dataSize: string;
  backupStatus: 'success' | 'pending' | 'failed';
  lastBackup: string;
  securityScore: number;
}

const SystemDashboard: React.FC = () => {
  const [systemModules] = useState<SystemModule[]>([
    {
      id: 'student',
      name: 'শিক্ষার্থী ব্যবস্থাপনা',
      nameEn: 'Student Management',
      status: 'active',
      version: '2.1.0',
      lastUpdated: '2024-12-10',
      description: 'শিক্ষার্থীদের তথ্য, উপস্থিতি এবং পারফরমেন্স ট্র্যাকিং',
      features: ['প্রোফাইল ম্যানেজমেন্ট', 'উপস্থিতি ট্র্যাকিং', 'মার্কস এন্ট্রি', 'ফি ম্যানেজমেন্ট']
    },
    {
      id: 'teacher',
      name: 'শিক্ষক পোর্টাল',
      nameEn: 'Teacher Portal',
      status: 'active',
      version: '2.0.5',
      lastUpdated: '2024-12-09',
      description: 'শিক্ষকদের জন্য ড্যাশবোর্ড এবং ক্লাস ম্যানেজমেন্ট',
      features: ['ক্লাস রুটিন', 'উপস্থিতি মার্ক', 'মার্কস এন্ট্রি', 'অ্যাসাইনমেন্ট']
    },
    {
      id: 'examination',
      name: 'পরীক্ষা ব্যবস্থাপনা',
      nameEn: 'Examination Management',
      status: 'active',
      version: '1.8.2',
      lastUpdated: '2024-12-10',
      description: 'পরীক্ষ���র সময়সূচি, প্রশ্নপত্র এবং ফলাফল ব্যবস্থাপনা',
      features: ['পরীক্ষার সময়সূচি', 'প্রশ্নপত্র তৈরি', 'ফলাফল প্রস্তুতি', 'রিপোর্ট কার্ড']
    },
    {
      id: 'admission',
      name: 'ভর্তি ব্যবস্থাপনা',
      nameEn: 'Admission Management',
      status: 'active',
      version: '1.5.0',
      lastUpdated: '2024-12-10',
      description: 'অনলাইন ভর্তি আবেদন এবং নির্বাচন প্রক্রিয়া',
      features: ['অনলাইন আবেদন', 'নির্বাচন প্রক্রিয়া', 'ভর্তি পরীক্ষা', 'ফলাফল প্রকাশ']
    },
    {
      id: 'notice',
      name: 'নোটিশ বোর্ড',
      nameEn: 'Notice Board',
      status: 'active',
      version: '1.3.0',
      lastUpdated: '2024-12-10',
      description: 'ঘোষণা এবং বার্তা ব্যবস্থাপনা',
      features: ['নোটিশ প্রকাশ', 'জরুরি ঘোষণা', 'টার্গেটেড মেসেজিং', 'অট��� এক্সপায়ার']
    },
    {
      id: 'calendar',
      name: 'ক্যালেন্ডার ও ইভেন্ট',
      nameEn: 'Calendar & Events',
      status: 'active',
      version: '1.4.0',
      lastUpdated: '2024-12-10',
      description: 'একাডেমিক ক্যালেন্ডার এবং ইভেন্ট পরিকল্পনা',
      features: ['একাডেমিক ক্যালেন্ডার', 'ইভেন্ট ম্যানেজমেন্ট', 'ছুটির দিন', 'রিমাইন্ডার']
    },
    {
      id: 'finance',
      name: 'আর্থিক ব্যবস্থাপনা',
      nameEn: 'Financial Management',
      status: 'active',
      version: '2.2.0',
      lastUpdated: '2024-12-08',
      description: 'ফি কালেকশন, বকেয়া ট্র্যাকিং এবং আর্থিক রিপোর্ট',
      features: ['ফি কালেকশন', 'আয়-ব্যয় ট্র্যাকিং', 'বকেয়া ম্যানেজমেন্ট', 'আর্থিক রিপোর্ট']
    },
    {
      id: 'library',
      name: 'লাইব্রেরি সিস্টেম',
      nameEn: 'Library System',
      status: 'active',
      version: '1.6.0',
      lastUpdated: '2024-12-07',
      description: 'ডিজিটাল বুক ক্যাটালগ এবং ইস্যু-রিটার্ন ব্যবস্থা',
      features: ['বুক ক্যাটালগ', 'ইস্যু-রিটার্ন', 'ওভারডিউ ট্র্যাকিং', 'ফাইন ক্যালকুলেশন']
    },
    {
      id: 'hostel',
      name: 'হোস্টেল ব্যবস্থাপনা',
      nameEn: 'Hostel Management',
      status: 'active',
      version: '1.2.0',
      lastUpdated: '2024-12-06',
      description: 'রুম অ্যালোকেশন, মেস ব্যবস্থাপনা এবং হোস্টেল সেবা',
      features: ['রুম অ্যালোকেশন', 'মেস ম্যানেজমেন্ট', 'অভিযোগ ব্যবস্থা', 'ফি ম্যানেজমেন্ট']
    },
    {
      id: 'transport',
      name: 'ট্রান্সপোর্ট সিস্টেম',
      nameEn: 'Transport System',
      status: 'active',
      version: '1.3.0',
      lastUpdated: '2024-12-06',
      description: 'রুট পরিকল্পনা, GPS ট্র্যাকিং এব�� নিরাপত্তা',
      features: ['রুট ম্যানেজমেন্ট', 'GPS ট্র্যাকিং', 'যাত্রী তালিকা', 'রক্ষণাবেক্ষণ']
    },
    {
      id: 'islamic',
      name: 'ইসলামিক ফিচার',
      nameEn: 'Islamic Features',
      status: 'active',
      version: '1.7.0',
      lastUpdated: '2024-12-05',
      description: 'নামাজের সময়, হিফজ ট্র্যাকিং এবং আখলাক পয়েন্ট',
      features: ['প্রেয়ার টাইম', 'হিফজ ট্র্যাকিং', 'আখলাক পয়েন্ট', 'তাজবীদ লেসন']
    },
    {
      id: 'reports',
      name: 'রিপোর্ট ও অ্যানালিটিক্স',
      nameEn: 'Reports & Analytics',
      status: 'active',
      version: '1.0.0',
      lastUpdated: '2024-12-10',
      description: 'ব্যাপক রিপোর্টিং এবং ডেটা অ্যানালিটিক্স',
      features: ['কাস্টম রিপোর্ট', 'ডেটা অ্যানালিটিক্স', 'চার্ট ভিজুয়ালাইজেশন', 'এক্সপোর্ট']
    }
  ]);

  const [systemMetrics] = useState<SystemMetrics>({
    uptime: 99.8,
    totalUsers: 1500,
    activeUsers: 1250,
    dataSize: '2.8 GB',
    backupStatus: 'success',
    lastBackup: '2024-12-10 02:00:00',
    securityScore: 95
  });

  const [integrationStatus] = useState({
    mobileApp: { status: 'active', version: '1.0.0', features: ['অফলাইন এক্সেস', 'পুশ নোটিফিকেশন', 'বায়োমেট্রিক লগইন'] },
    smsService: { status: 'active', provider: 'বাংলালিংক', features: ['OTP ভেরিফিকেশন', 'বাল্ক SMS', 'ডেলিভারি রিপোর্ট'] },
    emailService: { status: 'active', provider: 'Gmail SMTP', features: ['অটো ইমেইল', 'টেমপ্লেট', 'ট্র্যাকিং'] },
    onlineClasses: { status: 'active', provider: 'Zoom Integration', features: ['ভার্চুয়াল ক্লাসরুম', 'রেকর্ডিং', 'অ্যাটেন্ডেন্স ট্র্যাকিং'] },
    backup: { status: 'active', frequency: 'দৈনিক', retention: '৩০ দিন', lastBackup: '২ ঘন্টা আগে' },
    security: { status: 'active', features: ['২FA', 'এনক্রিপশন', 'অডিট লগ', 'ইনট্রুশন ডিটেকশন'] }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'সক্রিয়';
      case 'inactive':
        return 'নিষ্ক্রিয়';
      case 'maintenance':
        return 'রক্ষণাবেক্ষণ';
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">সিস্টেম ড্যাশবোর্ড</h1>
          <p className="text-gray-600 mt-1">সম্পূর্ণ সিস্টেমের অবস্থা এবং পারফরমেন্স</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            সেটিংস
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            সিস্টেম রিপোর��ট
          </Button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">সিস্টেম আপটাইম</p>
                <p className="text-2xl font-bold text-green-600">{systemMetrics.uptime}%</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
            <Progress value={systemMetrics.uptime} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">সক্রিয় ব্যবহারকারী</p>
                <p className="text-2xl font-bold text-blue-600">{systemMetrics.activeUsers}</p>
                <p className="text-xs text-gray-500">মোট {systemMetrics.totalUsers}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ডেটা সাইজ</p>
                <p className="text-2xl font-bold text-purple-600">{systemMetrics.dataSize}</p>
              </div>
              <Database className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">নিরাপত্তা স্কোর</p>
                <p className="text-2xl font-bold text-green-600">{systemMetrics.securityScore}%</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <Progress value={systemMetrics.securityScore} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Integration Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <span>ইন্টিগ্রেশন স্ট্যাটাস</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">মোবাইল অ্যাপ</p>
                    <p className="text-sm text-gray-600">v{integrationStatus.mobileApp.version}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">SMS সেবা</p>
                    <p className="text-sm text-gray-600">{integrationStatus.smsService.provider}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">ইমেইল সেবা</p>
                    <p className="text-sm text-gray-600">{integrationStatus.emailService.provider}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Video className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium">অনলাইন ক্লাস</p>
                    <p className="text-sm text-gray-600">{integrationStatus.onlineClasses.provider}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>নিরাপত্তা ও ব্যাকআপ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">ব্যাকআপ স্ট্যাটাস</p>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    সফল
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">শেষ ব্যাকআপ: {integrationStatus.backup.lastBackup}</p>
                <p className="text-sm text-gray-600">ফ্রিকোয়েন্সি: {integrationStatus.backup.frequency}</p>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">নিরাপত্তা ব্যবস্থা</p>
                  <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
                </div>
                <div className="text-sm text-gray-600">
                  {integrationStatus.security.features.map((feature, index) => (
                    <span key={index} className="inline-block bg-gray-100 rounded px-2 py-1 mr-1 mb-1">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">স্টুডেন্ট পোর্টফোলিও</p>
                  <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
                </div>
                <p className="text-sm text-gray-600">ডিজিটাল পোর্টফোলিও এবং অভিজ্ঞতা ট্র্যাকিং</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Modules */}
      <Card>
        <CardHeader>
          <CardTitle>সিস্টেম মডিউল���মূহ</CardTitle>
          <CardDescription>সকল মডিউলের অবস্থা এবং সংস্করণ তথ্য</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemModules.map((module) => (
              <div key={module.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{module.name}</h3>
                    <p className="text-sm text-gray-600">{module.nameEn}</p>
                  </div>
                  <Badge className={getStatusColor(module.status)}>
                    {getStatusText(module.status)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                  <span>v{module.version}</span>
                  <span>{new Date(module.lastUpdated).toLocaleDateString('bn-BD')}</span>
                </div>
                <div className="space-y-1">
                  {module.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="text-xs bg-gray-50 rounded px-2 py-1">
                      • {feature}
                    </div>
                  ))}
                  {module.features.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{module.features.length - 3} আরও ফিচার
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>সিস্টেম হেলথ চেক</CardTitle>
          <CardDescription>সিস্টেমের সার্বিক স্বাস্থ্য এবং পারফরমেন্স মেট্রিক্স</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">✓</div>
              <h3 className="font-semibold text-gray-900">সব মডিউল চালু</h3>
              <p className="text-sm text-gray-600">১২টি মডিউল সফলভাবে চলম��ন</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900">দ্রুত পারফরমেন্স</h3>
              <p className="text-sm text-gray-600">গড় রেসপন্স টাইম < ২০০ms</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">🔒</div>
              <h3 className="font-semibold text-gray-900">নিরাপত্তা সুরক্ষিত</h3>
              <p className="text-sm text-gray-600">সর্বোচ্চ নিরাপত্তা মান অনুসরণ</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemDashboard;