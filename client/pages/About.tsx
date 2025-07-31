import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import { 
  School, 
  Users, 
  Award, 
  BookOpen, 
  GraduationCap, 
  Target, 
  Heart, 
  Globe,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  TreePine,
  Building,
  Lightbulb,
  Shield,
  Handshake
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const milestones = [
    {
      year: "১৯২���",
      title: "প্রতিষ্ঠা",
      description: "হযরত মাওলানা আবদুল হাকিম (রহ.) কর্তৃক প্রতিষ্ঠিত"
    },
    {
      year: "১৯৫০",
      title: "সরকারি স্বীকৃতি",
      description: "বাংলাদেশ সরকার কর্তৃক আনুষ্ঠানিক স্বীকৃতি প্রাপ্তি"
    },
    {
      year: "১৯৮৫",
      title: "কামিল অনুমোদন",
      description: "ইসলামিক বিশ্ববিদ্যালয় বোর্ড কর্তৃক কামিল কোর্স অনুমোদন"
    },
    {
      year: "২০০০",
      title: "আধুনিকায়ন",
      description: "কম্পিউটার ল্যাব ও ডিজিটাল লাইব্রেরি চালু"
    },
    {
      year: "২০২০",
      title: "অনলাইন শিক্ষা",
      description: "কোভিড-১৯ এ অনলাইন শিক্ষা কার্যক্রম শুরু"
    },
    {
      year: "২০২৪",
      title: "ডিজিটাল রূপান্তর",
      description: "সম্পূর্ণ ম্যানেজমেন্ট সিস্টেম ডিজিটালাইজেশন"
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "ইসলামিক মূল্যবোধ",
      description: "কুরআন ও সুন্নাহ ভিত্তিক জীবনযাত্রা এবং নৈতিক শিক্ষার প্রসার"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      title: "গুণগত শিক্ষা",
      description: "আধুনিক পদ্ধতিতে ইসলামিক ও সাধারণ শিক্ষার সমন্বয়"
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: "সামাজিক দায়বদ্ধতা",
      description: "সমাজের কল্যাণে আলেম-উলামা তৈরি এবং সেবামূলক কার্যক্রম"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
      title: "উন্নয়নশীল মানসিকতা",
      description: "যুগের সাথে তাল মিলিয়ে প্র���ুক্তিগত উন্নয়ন ও আধুনিকায়ন"
    }
  ];

  const leadership = [
    {
      name: "মাওলানা আবদুর রহমান",
      position: "প্রধান মুহতামিম",
      education: "দারুল উলুম দেওবন্দ, কামিল",
      experience: "৩৫ বছর",
      image: "/placeholder.svg"
    },
    {
      name: "উস্তাদ মোহাম্মদ আলী",
      position: "একাডেমিক পরিচালক",
      education: "আল-আজহার বিশ্ববিদ্যালয়, মিশর",
      experience: "২৮ বছর",
      image: "/placeholder.svg"
    },
    {
      name: "হাফেজ সাইফুল ইসলাম",
      position: "হিফজ বিভাগের প্রধান",
      education: "জামেয়া ইমদাদিয়া, ফরিদাবাদ",
      experience: "২২ বছর",
      image: "/placeholder.svg"
    },
    {
      name: "উস্তাদ ড. নাজমুল হক",
      position: "গবেষণা পরিচালক",
      education: "কিং সউদ বিশ্ববিদ্যালয়, সৌদি আরব",
      experience: "২০ বছর",
      image: "/placeholder.svg"
    }
  ];

  const facilities = [
    {
      icon: <Building className="h-6 w-6 text-blue-500" />,
      title: "আধুনিক ক্যাম্পাস",
      description: "২৫ একর জমিতে নির্মিত আধুনিক সুবিধাসহ ক্যাম্পাস"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-green-500" />,
      title: "ডিজিটাল লাইব্রেরি",
      description: "৫০,০০০+ বই ও ১০,০০০+ ই-বুকের সমৃদ্ধ সংগ্রহ"
    },
    {
      icon: <School className="h-6 w-6 text-purple-500" />,
      title: "স্মার্ট ক্লাসরুম",
      description: "আধুনিক প্রযুক্তি সংবলিত ৪৫টি ক্লাসরুম"
    },
    {
      icon: <Globe className="h-6 w-6 text-orange-500" />,
      title: "ইন্টারনেট সুবিধা",
      description: "সম্পূর্ণ ক্যাম্পাসে হাই-স্পিড ওয়াইফাই নেটওয়ার্ক"
    }
  ];

  const achievements = [
    "জাতীয় মাদ্রাসা শিক্ষা বোর্ডে শীর্ষ ১০টি প্রতিষ্ঠানের মধ্যে স্থান",
    "৯৮% পাসের হার অর্জন (গত ৫ বছরের গড়)",
    "১০০+ হাফেজে কুরআন তৈরি (প্রতি বছর)",
    "৫০+ শিক্ষার্থী উচ্চ শিক্ষায় বৃত্তি প্রাপ্তি",
    "আন্তর্জাতিক কুরআন প্রতিযোগিতায় পুরস্কার",
    "সামাজিক সেবায় জাতীয় পুরস্কার"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100" style={{ fontFamily: '"Noto Serif Bengali", serif' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="bg-islamic-gold/10 text-islamic-gold border-islamic-gold/20 px-6 py-2 text-lg mb-6">
            আমাদের সম্পর্কে
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-emerald-800 mb-6">
            চুনতি হাকিমিয়া কামিল মাদ্রাসা
          </h1>
          <p className="text-xl text-emerald-600 mb-8 max-w-3xl mx-auto">
            ১০০ বছরের গৌরবময় ঐতিহ্য নিয়ে ইসলামিক শিক্ষার আলো ছড়িয়ে দেওয়া একটি 
            অগ্রগামী শিক্ষা প্রতিষ্ঠান
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
              <Calendar className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="font-semibold">প্রতিষ্ঠা: ১৯২৪</span>
            </div>
            <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
              <Users className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="font-semibold">৫০০০+ আলেম</span>
            </div>
            <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
              <Award className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="font-semibold">৯৮% সাফল্যের হার</span>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="border-emerald-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-emerald-800">
                <Target className="h-6 w-6 mr-3" />
                আমাদের লক্ষ্য
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                ইসলামিক মূল্যবোধে গড়ে তোলা আলেম-উলামা তৈরি করা যারা দ্বীনি ইলমের পাশাপাশি 
                আধুনিক জ্ঞান-বিজ্ঞানেও পারদর্শী হবেন। তারা সমাজে ইসলামের সঠিক বার্তা পৌঁছে 
                দিয়ে মানবতার কল্যাণে কাজ করবেন।
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-emerald-800">
                <Shield className="h-6 w-6 mr-3" />
                আমাদের দৃষ্টিভঙ্গি
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                একটি আদর্শ ইসলামিক শিক্ষা প্রতিষ্ঠান হিসেবে আন্তর্জাতিক মানের শিক্ষা প্রদান করা, 
                যেখানে ঐতিহ্যবাহী ইসলামিক শিক্ষা ও আধুনিক প্রযুক্তির নিখুঁত সমন্বয় ঘটানো হবে।
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Historical Timeline */}
        <Card className="mb-16 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-emerald-800 text-center">
              আমাদের ইতিহাস
            </CardTitle>
            <CardDescription className="text-center text-lg">
              ১০০ বছরের গৌরবময় পথ পরিক্রমা
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  <div className="bg-emerald-100 rounded-lg p-6 border-l-4 border-emerald-600">
                    <div className="text-2xl font-bold text-emerald-800 mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-700">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Core Values */}
        <Card className="mb-16 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-emerald-800 text-center">
              আমাদের মূল্যবোধ
            </CardTitle>
            <CardDescription className="text-center text-lg">
              যে নীতিমালার উপর আমাদের শিক্ষা ব্যবস্থা গড়ে উঠেছে
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-700">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leadership Team */}
        <Card className="mb-16 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-emerald-800 text-center">
              নেতৃত্ব
            </CardTitle>
            <CardDescription className="text-center text-lg">
              অভিজ্ঞ ও দক্ষ শিক্ষক পরিষদ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadership.map((leader, index) => (
                <Card key={index} className="text-center border-emerald-200">
                  <CardContent className="pt-6">
                    <div className="w-24 h-24 bg-emerald-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <GraduationCap className="h-12 w-12 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-emerald-600 font-medium mb-2">
                      {leader.position}
                    </p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>শিক্ষা:</strong> {leader.education}</p>
                      <p><strong>অভিজ্ঞতা:</strong> {leader.experience}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Facilities */}
        <Card className="mb-16 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-emerald-800 text-center">
              অবক���ঠামো ও সুবিধাদি
            </CardTitle>
            <CardDescription className="text-center text-lg">
              আধুনিক শিক্ষার পরিবেশ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {facilities.map((facility, index) => (
                <div key={index} className="text-center p-6 bg-emerald-50 rounded-lg">
                  <div className="flex justify-center mb-4">
                    {facility.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {facility.title}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {facility.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="mb-16 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-emerald-800 text-center">
              আমাদের অর্জনসমূহ
            </CardTitle>
            <CardDescription className="text-center text-lg">
              গৌরবের পরিসংখ্যান
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-emerald-800 text-center">
              যোগাযোগ করুন
            </CardTitle>
            <CardDescription className="text-center text-lg">
              আমাদের সাথে সংযুক্ত হন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">ঠিকানা</h3>
                <p className="text-gray-700">
                  চুনতি হাকিমিয়া কামিল ম��দ্রাসা<br />
                  চুনতি, লক্ষ্মীপুর-৩৭০৪<br />
                  বাংলাদেশ
                </p>
              </div>
              <div className="text-center">
                <Phone className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">ফোন</h3>
                <p className="text-gray-700">
                  +৮৮০১২৩৪৫৬৭৮৯০<br />
                  +৮৮০১৯৮৭৬৫৪৩২১
                </p>
              </div>
              <div className="text-center">
                <Mail className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">ইমেইল</h3>
                <p className="text-gray-700">
                  info@chkmadrasa.edu.bd<br />
                  admission@chkmadrasa.edu.bd
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link to="/contact">
                  <Handshake className="mr-2 h-4 w-4" />
                  আরো জানুন
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
