import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Users, 
  Calendar,
  Award,
  FileText,
  Star,
  School,
  Globe,
  Heart,
  Target,
  CheckCircle,
  BookMarked,
  TrendingUp,
  BarChart3,
  PieChart,
  Library,
  Laptop,
  Video,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Academic() {
  const [selectedDepartment, setSelectedDepartment] = useState('hifjul-quran');

  const departments = [
    {
      id: 'hifjul-quran',
      name: 'হিফজুল কুরআন',
      description: 'পবিত্র কুরআন মুখস্থকরণ ও তাজবীদ শিক্ষা',
      duration: '২-৪ বছর',
      students: '৩৫০+',
      completion: '৯৮%',
      icon: <BookMarked className="h-8 w-8 text-green-600" />,
      color: 'bg-green-50'
    },
    {
      id: 'alim',
      name: 'আলিম',
      description: 'উচ্চ মাধ্যমিক স্তরের ইসলামিক শিক্ষা',
      duration: '২ বছর',
      students: '২৮০+',
      completion: '৯৫%',
      icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      id: 'fazil',
      name: 'ফাজিল',
      description: 'স্নাতক সমমানের ইসলামিক শিক্ষা',
      duration: '২ বছর',
      students: '১৮০+',
      completion: '৯২%',
      icon: <Award className="h-8 w-8 text-purple-600" />,
      color: 'bg-purple-50'
    },
    {
      id: 'kamil',
      name: 'কামিল',
      description: 'স্নাতকোত্তর সমমানের ইসলামিক শিক্ষা',
      duration: '২ বছর',
      students: '৮০+',
      completion: '৯০%',
      icon: <Star className="h-8 w-8 text-orange-600" />,
      color: 'bg-orange-50'
    }
  ];

  const subjects = {
    'hifjul-quran': [
      { name: 'তিলাওয়াত ও হিফজ', hours: '৬ ঘন্টা/দিন', level: 'মূল বিষয়' },
      { name: 'তাজবীদ', hours: '১ ঘন্টা/দিন', level: 'মূল বিষয়' },
      { name: 'আরবি ব্যাকরণ', hours: '১ ঘন্টা/দিন', level: 'সহায়ক বিষয়' },
      { name: 'ইসলামিক স্টাডিজ', hours: '১ ঘন্টা/দিন', level: 'সহায়ক বিষয়' }
    ],
    'alim': [
      { name: 'তাফসীর', hours: '৫ ঘন্টা/সপ্তাহ', level: 'মূল বিষয়' },
      { name: 'হাদিস', hours: '৫ ঘন্টা/সপ্তাহ', level: 'মূল বিষয়' },
      { name: 'ফিকহ', hours: '৪ ঘন্টা/সপ্তাহ', level: 'মূল বিষয়' },
      { name: 'আরবি সাহিত্য', hours: '৪ ঘন্টা/সপ্তাহ', level: 'মূল বিষয়' },
      { name: 'ইংরেজি', hours: '৩ ঘন্টা/সপ্তাহ', level: 'সহায়ক বিষয়' },
      { name: 'গণিত', hours: '৩ ঘন্টা/সপ্তাহ', level: 'সহায়ক বিষয়' }
    ],
    'fazil': [
      { name: 'উসূলুল ফিকহ', hours: '৪ ঘন্টা/সপ্তাহ', level: 'মূল বিষয়' },
      { name: 'তাফসীর ও উলুমুল কুরআন', hours: '৪ ঘন্টা/সপ্তাহ', level: 'মূল বিষয়' },
      { name: 'হাদিস ও উসূলুল হাদিস', hours: '৪ ঘন্টা/সপ্তাহ', level: 'মূল বিষয়' },
      { name: 'আকাইদ ও দর্শন', hours: '৩ ঘন্টা/সপ্তাহ', level: 'মূল বিষয়' },
      { name: 'ইসলামিক হিস্টোরি', hours: '৩ ঘন্টা/সপ্তাহ', level: 'সহায়ক বিষয়' },
      { name: 'কম্পিউটার সায়েন্স', hours: '২ ঘন্টা/সপ্তাহ', level: 'সহায়ক বিষয়' }
    ],
    'kamil': [
      { name: 'ইজ��িহাদ ও গবেষণা', hours: '৪ ঘন্টা/সপ্তাহ', level: 'মূল বিষয়' },
      { name: 'তুলনামূলক ধর্মতত্ত্ব', hours: '৩ ঘন্টা/সপ্তাহ', level: 'মূল বিষয়' },
      { name: 'ইসলামিক ইকোনমিক্স', hours: '৩ ঘন্টা/সপ্তাহ', level: 'মূল বিষয়' },
      { name: 'দাওয়াহ ও ইরশাদ', hours: '৩ ঘন্টা/সপ্তাহ', level: 'মূল বিষয়' },
      { name: 'ইসলামিক ল', hours: '২ ঘন্টা/সপ্তাহ', level: 'বিশেষত্ব' },
      { name: 'গবেষণা পদ্ধতি', hours: '২ ঘন্টা/সপ্তাহ', level: 'গবেষণা' }
    ]
  };

  const academicCalendar = [
    { event: 'নতুন শিক্ষাবর্ষ শুরু', date: '১ জানুয়ারি', type: 'academic' },
    { event: 'প্রথম সাময়িক পরীক্ষা', date: '১৫-২০ মার্চ', type: 'exam' },
    { event: 'রমজান ছুটি', date: '১০ মার্চ - ১৫ এপ্রিল', type: 'holiday' },
    { event: 'দ্বিতীয় সাময়িক পরীক্ষা', date: '১৫-২০ জুন', type: 'exam' },
    { event: 'গ্রীষ্মকালীন ছুটি', date: '১ জুলাই - ১৫ আগস্ট', type: 'holiday' },
    { event: 'তৃতীয় সাময়িক পরীক্ষা', date: '১৫-২০ সেপ্টেম্বর', type: 'exam' },
    { event: 'বার্ষিক পরীক্ষা', date: '১-১৫ ডিসেম্বর', type: 'exam' },
    { event: 'শীতকালীন ছুটি', date: '২০ ডিসেম্বর - ৩১ ডিসেম্বর', type: 'holiday' }
  ];

  const achievements = [
    { title: 'জাতীয় র‍্যাঙ্কিং', value: 'শীর্ষ ১০', icon: <Trophy className="h-6 w-6 text-yellow-500" /> },
    { title: 'পাসের হার', value: '৯৮%', icon: <TrendingUp className="h-6 w-6 text-green-500" /> },
    { title: 'হাফেজ তৈরি', value: '১০০+/বছর', icon: <BookMarked className="h-6 w-6 text-blue-500" /> },
    { title: 'বৃত্তিপ্রাপ্ত', value: '৫০+/বছর', icon: <Award className="h-6 w-6 text-purple-500" /> }
  ];

  const facilities = [
    { name: 'ডিজিটাল লাইব্রেরি', books: '৫��,০০০+', ebooks: '১০,০০০+' },
    { name: 'কম্পিউটার ল্যাব', computers: '৫০+', internet: 'হাই-স্পিড' },
    { name: 'অডিও-ভিজুয়াল রুম', capacity: '১০০ জন', equipment: 'আধুনিক' },
    { name: 'গবেষণাগার', research: '২০+ প্রকল্প', publication: '১৫+ বই' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" style={{ fontFamily: '"Noto Serif Bengali", serif' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-6 py-2 text-lg mb-6">
            একাডেমিক তথ্য
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-6">
            শিক্ষা কার্যক্রম
          </h1>
          <p className="text-xl text-blue-600 mb-8 max-w-3xl mx-auto">
            আধুনিক পদ্ধতিতে ইসলামিক শিক্ষা ও চরিত্র গঠনে আমাদের বিস্তৃত একাডেমিক প্��োগ্রাম
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center border-blue-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {achievement.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {achievement.value}
                </div>
                <div className="text-sm text-gray-600">
                  {achievement.title}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Departments Overview */}
        <Card className="mb-16 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-blue-800 text-center">
              একাডেমিক বিভাগসমূহ
            </CardTitle>
            <CardDescription className="text-center text-lg">
              বিভিন্ন স্তরের ইসলামিক শিক্ষা কার্যক্রম
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept) => (
                <Card 
                  key={dept.id} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedDepartment === dept.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedDepartment(dept.id)}
                >
                  <CardContent className={`pt-6 text-center ${dept.color}`}>
                    <div className="flex justify-center mb-4">
                      {dept.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {dept.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {dept.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>সময়কাল:</span>
                        <span className="font-medium">{dept.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>শি���্ষার্থী:</span>
                        <span className="font-medium">{dept.students}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>সাফল্যের হার:</span>
                        <span className="font-medium text-green-600">{dept.completion}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject Details */}
        <Card className="mb-16 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-800">
              {departments.find(d => d.id === selectedDepartment)?.name} - পাঠ্যক্রম
            </CardTitle>
            <CardDescription>
              এই বিভাগের বিস্তারিত পাঠ্যসূচি ও সময় বণ্টন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects[selectedDepartment]?.map((subject, index) => (
                <Card key={index} className="border-l-4 border-blue-500">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{subject.name}</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>সময়:</span>
                        <span>{subject.hours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ধরন:</span>
                        <Badge variant={subject.level === 'মূল বিষয়' ? 'default' : 'secondary'} className="text-xs">
                          {subject.level}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Academic Calendar */}
        <Card className="mb-16 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-blue-800 text-center">
              একাডেমিক ক্যালেন্ডার ২০২৪
            </CardTitle>
            <CardDescription className="text-center text-lg">
              বার্ষিক শিক্ষা কার্যক্রমের সময়সূচি
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {academicCalendar.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                    item.type === 'exam' ? 'bg-red-500' : 
                    item.type === 'holiday' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.event}</h4>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                  <Badge 
                    variant={item.type === 'exam' ? 'destructive' : item.type === 'holiday' ? 'secondary' : 'default'}
                    className="text-xs"
                  >
                    {item.type === 'exam' ? 'পরীক্ষা' : item.type === 'holiday' ? 'ছুটি' : 'একাডেমিক'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Facilities */}
        <Card className="mb-16 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-blue-800 text-center">
              একাডেমিক সুবিধাদি
            </CardTitle>
            <CardDescription className="text-center text-lg">
              শিক্ষার মান উন্নয়নে আধুনিক সুবিধা
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {facilities.map((facility, index) => (
                <Card key={index} className="text-center border-blue-200">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      {index === 0 && <Library className="h-12 w-12 text-blue-600 mx-auto" />}
                      {index === 1 && <Laptop className="h-12 w-12 text-green-600 mx-auto" />}
                      {index === 2 && <Video className="h-12 w-12 text-purple-600 mx-auto" />}
                      {index === 3 && <FileText className="h-12 w-12 text-orange-600 mx-auto" />}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {facility.name}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      {facility.books && (
                        <div className="flex justify-between">
                          <span>বই:</span>
                          <span className="font-medium">{facility.books}</span>
                        </div>
                      )}
                      {facility.ebooks && (
                        <div className="flex justify-between">
                          <span>ই-বুক:</span>
                          <span className="font-medium">{facility.ebooks}</span>
                        </div>
                      )}
                      {facility.computers && (
                        <div className="flex justify-between">
                          <span>কম্পিউটার:</span>
                          <span className="font-medium">{facility.computers}</span>
                        </div>
                      )}
                      {facility.internet && (
                        <div className="flex justify-between">
                          <span>ইন্টারনেট:</span>
                          <span className="font-medium">{facility.internet}</span>
                        </div>
                      )}
                      {facility.capacity && (
                        <div className="flex justify-between">
                          <span>ধারণক্ষমতা:</span>
                          <span className="font-medium">{facility.capacity}</span>
                        </div>
                      )}
                      {facility.equipment && (
                        <div className="flex justify-between">
                          <span>যন্ত্রপাতি:</span>
                          <span className="font-medium">{facility.equipment}</span>
                        </div>
                      )}
                      {facility.research && (
                        <div className="flex justify-between">
                          <span>গবেষণা:</span>
                          <span className="font-medium">{facility.research}</span>
                        </div>
                      )}
                      {facility.publication && (
                        <div className="flex justify-between">
                          <span>প্রকাশনা:</span>
                          <span className="font-medium">{facility.publication}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Downloads & Resources */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-blue-800 text-center">
              ডাউনলোড ও রিসোর্স
            </CardTitle>
            <CardDescription className="text-center text-lg">
              একাডেমিক তথ্য ও প্রয়োজনীয় ডকুমেন্ট
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-blue-200">
                <CardContent className="pt-6 text-center">
                  <Download className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">পাঠ্যক্রম</h3>
                  <p className="text-sm text-gray-600 mb-4">সম্পূর্ণ সিলেবাস ও পাঠ্য তালিকা</p>
                  <Button variant="outline" size="sm">ডাউনলোড করুন</Button>
                </CardContent>
              </Card>
              <Card className="border-blue-200">
                <CardContent className="pt-6 text-center">
                  <Calendar className="h-8 w-8 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">একাডেমিক ক্যালেন্ডার</h3>
                  <p className="text-sm text-gray-600 mb-4">বার্ষিক পরীক্ষা ও ছুটির তালিকা</p>
                  <Button variant="outline" size="sm">ডাউনলোড করুন</Button>
                </CardContent>
              </Card>
              <Card className="border-blue-200">
                <CardContent className="pt-6 text-center">
                  <FileText className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">ভর্তি গাইড</h3>
                  <p className="text-sm text-gray-600 mb-4">ভর্তির নিয়মকানুন ও প্রয়োজনীয় কাগজপত্র</p>
                  <Button variant="outline" size="sm">ডাউনলোড করুন</Button>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/admission">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  ভর্তির জন্য আবেদন করুন
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
