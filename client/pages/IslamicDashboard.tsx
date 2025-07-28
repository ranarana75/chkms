import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Clock, 
  BookOpen,
  Star,
  Calendar,
  Award,
  Users,
  TrendingUp,
  School,
  Plus
} from "lucide-react";

export default function IslamicDashboard() {
  const [islamicData, setIslamicData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIslamicData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const loadIslamicData = () => {
    setLoading(true);
    // Mock data load
    setTimeout(() => {
      setIslamicData({
        prayerTimes: {
          date: "১৫ ডিসেম্বর ২০২৪",
          hijriDate: "১৫ জমাদিউল আওয়াল ১৪৪৬",
          location: "লক্ষ্মীপুর, বাংলাদেশ",
          times: {
            fajr: "���:১৫",
            sunrise: "৬:৩৫",
            dhuhr: "১১:৫৫",
            asr: "৩:৩০",
            maghrib: "৫:১০",
            isha: "৬:৩৫"
          }
        },
        hifzStats: {
          totalStudents: 156,
          activeHifzStudents: 89,
          completedHifz: 12,
          averageProgress: 67.5,
          topPerformers: [
            { name: "মোহাম্মদ আবদুল্লাহ", progress: 95, class: "আলিম প্রথম" },
            { name: "আবুল কাসেম", progress: 88, class: "আলিম দ্বিতীয়" },
            { name: "মোহাম্মদ ইব্রাহিম", progress: 82, class: "আলিম প্রথম" }
          ]
        },
        akhlaqLeaders: [
          { name: "আব্দুর রহমান", points: 185, level: "প্ল্যাটিনাম", class: "আলিম দ্বিতীয়" },
          { name: "মোহাম্মদ হাসান", points: 142, level: "গোল্ড", class: "আলিম প���রথম" },
          { name: "আবু বকর", points: 128, level: "গোল্ড", class: "আলিম দ্বিতীয়" }
        ],
        upcomingEvents: [
          {
            name: "মাসিক ওয়াজ মাহফিল",
            date: "২০ ডিসেম্বর",
            time: "আসরের পর",
            speaker: "মাওলানা আবুল হাসান"
          },
          {
            name: "হিফজ প্রতিযোগিতা",
            date: "২৫ ডিসেম্বর",
            time: "সকাল ১০:০০",
            venue: "মসজিদ"
          },
          {
            name: "ইসলামিক কুইজ",
            date: "৩০ ডিসেম্বর",
            time: "বিকাল ৩:০০",
            venue: "ক্লাসরুম-১"
          }
        ],
        tajweedLessons: [
          { title: "মাখরাজ (উচ্চারণস্থান)", level: "শুরুর পর্যায়", duration: "৩০ মিনিট" },
          { title: "সিফাত (বর্ণের গুণাবলী)", level: "মধ্যম পর্যায়", duration: "৪৫ মিনিট" },
          { title: "আহকামুল মাদ্দ", level: "উন্নত পর্যায়", duration: "৬০ মিনিট" }
        ]
      });
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green"></div>
      </div>
    );
  }

  const { prayerTimes, hifzStats, akhlaqLeaders, upcomingEvents, tajweedLessons } = islamicData;

  const getNextPrayer = () => {
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeString = `${currentHour}:${currentMinute.toString().padStart(2, '0')}`;

    const prayers = [
      { name: "ফজর", time: "5:15", display: "ফজর" },
      { name: "যোহর", time: "11:55", display: "যোহর" },
      { name: "আসর", time: "15:30", display: "আসর" },
      { name: "মাগরিব", time: "17:10", display: "মাগরিব" },
      { name: "ইশা", time: "18:35", display: "ইশা" }
    ];

    for (const prayer of prayers) {
      const [hour, minute] = prayer.time.split(':').map(Number);
      if (currentHour < hour || (currentHour === hour && currentMinute < minute)) {
        return prayer.display;
      }
    }
    return "ফজর"; // Next day's Fajr
  };

  const nextPrayer = getNextPrayer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50">
      <Navigation />
      {/* Header */}
      <header className="border-b border-green-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/admin" className="inline-flex items-center text-islamic-green hover:text-islamic-green-dark transition-colors">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ইসলামিক বিভাগ</h1>
          <p className="text-gray-600">নামাজের সময়, হিফজ অগ্রগতি, আখলাক পয়েন্ট এবং ইসলামিক কার্যক্রম</p>
        </div>

        {/* Prayer Times Section */}
        <Card className="mb-8 bg-gradient-to-r from-islamic-green/10 to-islamic-blue/10 border-islamic-green/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-islamic-green" />
                <span>নামাজের সময়সূচি</span>
              </CardTitle>
              <div className="text-right">
                <p className="text-sm text-gray-600">{prayerTimes.date}</p>
                <p className="text-xs text-islamic-green">{prayerTimes.hijriDate}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(prayerTimes.times).map(([prayer, time]) => {
                const prayerNames = {
                  fajr: "ফজর",
                  dhuhr: "যোহর", 
                  asr: "আসর",
                  maghrib: "মাগরিব",
                  isha: "ইশা"
                };
                
                const isNext = prayerNames[prayer] === nextPrayer;
                
                return (
                  <div key={prayer} className={`text-center p-4 rounded-lg ${
                    isNext ? 'bg-islamic-green text-white' : 'bg-white border'
                  }`}>
                    <p className={`text-sm font-medium ${isNext ? 'text-white' : 'text-gray-600'}`}>
                      {prayerNames[prayer]}
                    </p>
                    <p className={`text-xl font-bold ${isNext ? 'text-white' : 'text-islamic-green'}`}>
                      {time}
                    </p>
                    {isNext && (
                      <Badge className="mt-1 bg-white text-islamic-green">
                        পরবর্তী নামাজ
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">📍 {prayerTimes.location}</p>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-islamic-green" />
                <div>
                  <p className="text-2xl font-bold text-islamic-green">{hifzStats.activeHifzStudents}</p>
                  <p className="text-sm text-gray-600">সক্রিয় হাফেজ</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Award className="h-8 w-8 text-islamic-blue" />
                <div>
                  <p className="text-2xl font-bold text-islamic-blue">{hifzStats.completedHifz}</p>
                  <p className="text-sm text-gray-600">সম্পূর্ণ হাফেজ</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="h-8 w-8 text-islamic-gold" />
                <div>
                  <p className="text-2xl font-bold text-islamic-gold">{hifzStats.averageProgress}%</p>
                  <p className="text-sm text-gray-600">গড় অগ্রগতি</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-600">{hifzStats.totalStudents}</p>
                  <p className="text-sm text-gray-600">মোট শিক্ষার্থী</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hifz Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-islamic-green" />
                <span>হিফজে সেরা শিক্ষার্থী</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hifzStats.topPerformers.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.class}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-islamic-green text-white">
                        {student.progress}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Akhlaq Leaders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-islamic-gold" />
                <span>আখলাকে শীর্ষস্থানীয়</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {akhlaqLeaders.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.class}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${
                        student.level === 'প��ল্যাটিনাম' ? 'bg-gray-700' :
                        student.level === 'গোল্ড' ? 'bg-yellow-600' :
                        'bg-gray-500'
                      } text-white`}>
                        {student.points} পয়েন্ট
                      </Badge>
                      <p className="text-xs text-gray-600 mt-1">{student.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Islamic Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-islamic-blue" />
                <span>আসন্ন ইসলামিক অনুষ্ঠান</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{event.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {event.date}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{event.time}</p>
                    {event.speaker && (
                      <p className="text-sm text-islamic-green">ব���্তা: {event.speaker}</p>
                    )}
                    {event.venue && (
                      <p className="text-sm text-gray-500">স্থান: {event.venue}</p>
                    )}
                  </div>
                ))}
                <Button className="w-full bg-islamic-green hover:bg-islamic-green-dark">
                  <Plus className="h-4 w-4 mr-2" />
                  নতুন অনুষ্ঠান যোগ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tajweed Lessons */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-islamic-green" />
              <span>তাজবীদ পাঠ</span>
            </CardTitle>
            <CardDescription>
              কুরআন তিলাওয়াতের সঠিক নিয়মাবলী শিক্ষা
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tajweedLessons.map((lesson, index) => (
                <div key={index} className="p-4 border rounded-lg hover:border-islamic-green/50 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">{lesson.title}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {lesson.level}
                    </Badge>
                    <span className="text-sm text-gray-600">{lesson.duration}</span>
                  </div>
                  <Button size="sm" className="w-full bg-islamic-blue hover:bg-islamic-blue-dark">
                    পাঠ শুরু করুন
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
