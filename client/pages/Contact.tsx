import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Globe,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Users,
  HeadphonesIcon,
  Building,
  Car,
  Bus,
  Plane,
  CheckCircle,
  AlertCircle,
  User,
  GraduationCap,
  FileText,
  Calendar,
  Info
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: ''
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-emerald-600" />,
      title: 'ফোন',
      details: ['+৮৮০১২৩৪৫৬৭৮৯০', '+৮৮০১৯৮৭৬৫৤৩২১'],
      description: 'সকাল ৮টা থেকে বিকেল ৫টা'
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: 'ইমেইল',
      details: ['info@chkmadrasa.edu.bd', 'admission@chkmadrasa.edu.bd'],
      description: '২৪ ঘন্টা উপলব্ধ'
    },
    {
      icon: <MapPin className="h-6 w-6 text-red-600" />,
      title: 'ঠিকানা',
      details: ['চুনতি হাকিমিয়া কামিল মাদ্রাসা', 'চুনতি, লক্ষ্মীপুর-৩৭০৪, বাংলাদেশ'],
      description: 'মূল ক্যাম্পাস'
    },
    {
      icon: <Globe className="h-6 w-6 text-purple-600" />,
      title: 'ওয়েবসাইট',
      details: ['www.chkmadrasa.edu.bd', 'portal.chkmadrasa.edu.bd'],
      description: 'অনলাইন সেবা'
    }
  ];

  const departments = [
    {
      name: 'ভর্তি বিভাগ',
      phone: '+৮৮০১২৩৪৫৬৭৮৯১',
      email: 'admission@chkmadrasa.edu.bd',
      head: 'মাওলানা আব্দুল কারিম',
      time: 'সকাল ৯টা - বিকেল ৪টা'
    },
    {
      name: 'একাডেমিক বিভাগ',
      phone: '+৮৮০১২৩৪৫৬৭৮৯২',
      email: 'academic@chkmadrasa.edu.bd',
      head: 'উস্তাদ মোহাম্মদ আলী',
      time: 'সকাল ৮টা - বিকেল ৫টা'
    },
    {
      name: 'প্রশাসনিক বিভাগ',
      phone: '+৮৮০১২৩৪৫৬৭৮৯৩',
      email: 'admin@chkmadrasa.edu.bd',
      head: 'জনাব আহমদ হাসান',
      time: 'সকাল ৮টা - বিকেল ৫টা'
    },
    {
      name: 'আর্থিক বিভাগ',
      phone: '+৮৮০১২৩৪৫৬৭৮৯৪',
      email: 'finance@chkmadrasa.edu.bd',
      head: 'জনাব রফিকুল ইসলাম',
      time: 'সকাল ৯টা - বিকেল ৪টা'
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, name: 'Facebook', url: '#', followers: '১০K+' },
    { icon: <Youtube className="h-5 w-5" />, name: 'YouTube', url: '#', followers: '৫K+' },
    { icon: <Instagram className="h-5 w-5" />, name: 'Instagram', url: '#', followers: '৩K+' },
    { icon: <Twitter className="h-5 w-5" />, name: 'Twitter', url: '#', followers: '২K+' }
  ];

  const faqCategories = [
    {
      category: 'ভর্তি সংক্রান্ত',
      icon: <GraduationCap className="h-5 w-5 text-blue-500" />,
      questions: [
        'ভর্তির যোগ্যতা কী?',
        'কবে ভর্তি শুরু হবে?',
        'ভর্তি ফি কত?',
        'কী কী কাগজপত্র লাগবে?'
      ]
    },
    {
      category: 'একাডেমিক',
      icon: <FileText className="h-5 w-5 text-green-500" />,
      questions: [
        'পাঠ্যক্রম কী?',
        'পরীক্ষার সময়সূচি',
        'ফলাফল কবে দেওয়া হবে?',
        'সার্টিফিকেট কীভাবে পাবো?'
      ]
    },
    {
      category: 'আবাসন',
      icon: <Building className="h-5 w-5 text-purple-500" />,
      questions: [
        'হোস্টেল সুবিধা আছে কি?',
        'হোস্টেল ফি কত?',
        'খাবারের ব্যবস্থা কেমন?',
        'নিরাপত্তা ব্যবস্থা কী?'
      ]
    }
  ];

  const officeHours = [
    { day: 'রবিবার - বৃহস্পতিবার', time: 'সকাল ৮:০০ - বিকেল ৫:০০' },
    { day: 'শুক্রবার', time: 'সকাল ৮:০০ - দুপুর ১২:��০' },
    { day: 'শনিবার', time: 'বন্ধ' },
    { day: 'সরকারি ছুটির দিন', time: 'বন্ধ' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100" style={{ fontFamily: '"Noto Serif Bengali", serif' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-6 py-2 text-lg mb-6">
            যোগাযোগ
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-emerald-800 mb-6">
            আমাদের সাথে যোগাযোগ করুন
          </h1>
          <p className="text-xl text-emerald-600 mb-8 max-w-3xl mx-auto">
            আপনার যেকোনো প্রশ্ন, পরামর্শ বা সহায়তার জন্য আমরা সর্বদা প্রস্তুত।
            আমাদের সাথে যোগাযোগ করুন এবং দ্রুত সমাধান পান।
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center border-emerald-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {info.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-emerald-800">
                <MessageSquare className="inline mr-2" />
                আমাদের লিখুন
              </CardTitle>
              <CardDescription>
                আপনার বার্তা পাঠান, আমরা শীঘ্রই উত্তর দেব
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-800">আপনার বার্তা সফলভাবে পাঠানো হয়েছে!</span>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">পূর্ণ নাম *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="আপনার নাম লিখুন"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">ফোন নম্বর *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="৯৮৭৬৫৪৩২১০"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">ইমেইল</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="category">বিষয়ের ধরন *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admission">ভর্তি সংক্রান্ত</SelectItem>
                      <SelectItem value="academic">একাডেমিক</SelectItem>
                      <SelectItem value="hostel">আবাসন</SelectItem>
                      <SelectItem value="finance">আর্থিক</SelectItem>
                      <SelectItem value="general">সাধারণ জিজ্ঞাসা</SelectItem>
                      <SelectItem value="complaint">অভিযোগ</SelectItem>
                      <SelectItem value="suggestion">পরামর্শ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">বিষয় *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="সংক্ষেপে বিষয় লিখুন"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">বিস��তারিত বার্তা *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                    rows={5}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      পাঠানো হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      বার্তা পাঠান
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Office Hours & Map */}
          <div className="space-y-8">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-800">
                  <Clock className="inline mr-2" />
                  অফিস সময়
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                      <span className="font-medium text-gray-900">{schedule.day}</span>
                      <span className="text-emerald-600 font-semibold">{schedule.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">বিশেষ সময়</p>
                      <p className="text-xs text-yellow-700">
                        রমজান মাসে অফিস সময় ভিন্ন হতে পারে। বিস্তারিত জানতে ফোন করুন।
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-800">
                  <MapPin className="inline mr-2" />
                  অবস্থান
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-emerald-600 mx-auto mb-2" />
                    <p className="text-emerald-700">মানচিত্র লোড হচ্ছে...</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>ঠিকানা:</strong> চুনতি হাকিমিয়া কামিল মাদ্রাসা</p>
                  <p><strong>এলাকা:</strong> চুনতি, লক্ষ্মীপুর-৩৭০৪</p>
                  <p><strong>দেশ:</strong> বাংলাদেশ</p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center justify-center p-2 bg-blue-50 rounded">
                    <Car className="h-4 w-4 text-blue-600 mr-1" />
                    <span>গাড়ি</span>
                  </div>
                  <div className="flex items-center justify-center p-2 bg-green-50 rounded">
                    <Bus className="h-4 w-4 text-green-600 mr-1" />
                    <span>বাস</span>
                  </div>
                  <div className="flex items-center justify-center p-2 bg-purple-50 rounded">
                    <Plane className="h-4 w-4 text-purple-600 mr-1" />
                    <span>এয়ারপোর্ট</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Department Contacts */}
        <Card className="mb-16 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-emerald-800 text-center">
              বিভাগীয় যোগাযোগ
            </CardTitle>
            <CardDescription className="text-center text-lg">
              নির্দিষ্ট বিভাগের সাথে সরাসরি যোগাযোগ করুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept, index) => (
                <Card key={index} className="border-emerald-200">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{dept.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-500 mr-3" />
                        <span className="text-sm"><strong>প্রধান:</strong> {dept.head}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-3" />
                        <span className="text-sm">{dept.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-3" />
                        <span className="text-sm">{dept.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-3" />
                        <span className="text-sm">{dept.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-16 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-emerald-800 text-center">
              সচরাচর জিজ্ঞাসা
            </CardTitle>
            <CardDescription className="text-center text-lg">
              প্রায়শই জিজ্ঞাসিত প্রশ্নসমূহ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {faqCategories.map((category, index) => (
                <Card key={index} className="border-emerald-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      {category.icon}
                      <span className="ml-2">{category.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.questions.map((question, idx) => (
                        <li key={idx} className="text-sm text-gray-700 hover:text-emerald-600 cursor-pointer transition-colors">
                          • {question}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Info className="mr-2 h-4 w-4" />
                      আরো জানুন
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-emerald-800 text-center">
              সামাজিক যোগাযোগ
            </CardTitle>
            <CardDescription className="text-center text-lg">
              আমাদের সামাজিক যোগাযোগ মাধ্যমে ফলো করুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {socialLinks.map((social, index) => (
                <Card key={index} className="text-center border-emerald-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-emerald-100 rounded-full">
                        {social.icon}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{social.name}</h3>
                    <p className="text-sm text-emerald-600">{social.followers} অনুসরণকারী</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                আমাদের সর্বশেষ আপডেট ও খবরাখবর পেতে ফলো করুন
              </p>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Users className="mr-2 h-4 w-4" />
                সবগুলো ফলো করুন
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
