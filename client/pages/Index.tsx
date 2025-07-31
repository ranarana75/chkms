import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRealtimeStats } from "@/hooks/useLocalData";
import { initializeSampleData } from "@shared/localDatabase";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Users,
  GraduationCap,
  Calculator,
  Building2,
  Bus,
  Heart,
  Shield,
  School,
  Clock,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  FileText,
  TrendingUp,
  Activity,
  Award,
  Calendar,
  Globe,
  Download,
  PlayCircle,
  MessageSquare,
  CheckCircle,
  Zap,
  Target,
  BarChart3,
  Settings,
  Bell,
  CreditCard,
  BookMarked,
  TreePine,
  Sun,
  Moon,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Smartphone,
  Laptop,
  Tablet,
  Monitor
} from "lucide-react";

export default function Index() {
  const { stats, refresh } = useRealtimeStats();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Initialize sample data on first load
    initializeSampleData();

    // Refresh stats
    refresh();

    // Loading simulation
    setTimeout(() => setIsLoading(false), 1000);

    // Update time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [refresh]);

  // Dynamic stats based on real data
  const dynamicStats = [
    {
      label: "মোট শিক্ষার্থী",
      value: isLoading ? "..." : `${stats.totalStudents}+`,
      icon: <Users className="h-5 w-5" />,
      trend: "+৫ এই মাসে",
      color: "text-blue-600",
    },
    {
      label: "শিক্ষক",
      value: isLoading ? "..." : `${stats.totalTeachers}+`,
      icon: <GraduationCap className="h-5 w-5" />,
      trend: "+২ নতুন যোগদান",
      color: "text-green-600",
    },
    {
      label: "সক্রিয় নোটিশ",
      value: isLoading ? "..." : `${stats.activeNotices}`,
      icon: <FileText className="h-5 w-5" />,
      trend: "আজ প্রকাশিত",
      color: "text-orange-600",
    },
    {
      label: "সফলতার হার",
      value: isLoading ? "..." : `${stats.collectionRate}%`,
      icon: <Star className="h-5 w-5" />,
      trend: `↗ ${Math.floor(Math.random() * 5) + 1}% বৃদ্ধি`,
      color: "text-purple-600",
    },
  ];

  const features = [
    {
      icon: <Users className="h-8 w-8 text-islamic-green" />,
      title: "শিক্ষার্থী ব্যবস্থাপনা",
      description: "সম্পূর্ণ ছাত্র তথ্য, উপস্থিতি এবং পারফরম্যান্স ট্র্যাকিং",
      color: "bg-green-50 dark:bg-green-950",
      link: "/student",
      features: ["ভর্তি প্রক্রিয়া", "���পস্থিতি ট্র্যাকিং", "ফলাফল ব্যবস্থাপনা", "অভিভাবক যোগাযোগ"]
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-islamic-blue" />,
      title: "শিক্ষক পোর্টাল",
      description: "ক্লাস রুটিন, মার্কস এন্ট্রি এবং শিক্ষক ড্যাশবোর্ড",
      color: "bg-blue-50 dark:bg-blue-950",
      link: "/teacher",
      features: ["ক্লাস রুটিন", "মার্কস এন্ট্রি", "অ্যাসাইনমেন্ট", "রিপোর্ট কার্ড"]
    },
    {
      icon: <Calculator className="h-8 w-8 text-islamic-gold" />,
      title: "আর্থিক ব্যবস্থাপনা",
      description: "ফি কালেকশন, বকেয়া ট্র্যাকিং এবং আর্থিক রিপোর্ট",
      color: "bg-yellow-50 dark:bg-yellow-950",
      link: "/finance",
      features: ["ফি কালেকশন", "বকেয়া ট্র্যাকিং", "আর্থিক রিপোর্ট", "বাজেট পরিকল্পনা"]
    },
    {
      icon: <FileText className="h-8 w-8 text-red-600" />,
      title: "পরীক্ষা ব্যবস্থাপনা",
      description: "পরীক্ষার সময়সূচি, প্রশ্নপত্র এবং ফলাফল ব্যবস্থাপনা",
      color: "bg-red-50 dark:bg-red-950",
      link: "/examination",
      features: ["পরীক্ষার সময়সূচি", "প্রশ্নব্যাংক", "ফলাফল প্রকাশ", "সার্টিফিকেট"]
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      title: "লাইব্রেরি সিস্টেম",
      description: "ডিজিটাল বুক ক্যাটালগ এবং ইস্যু-রিটার্ন ব্যবস্থা",
      color: "bg-purple-50 dark:bg-purple-950",
      link: "/library",
      features: ["বুক ক্যাটালগ", "ইস্যু-রিটার্ন", "ডিজিটাল বুক", "গবেষণা সহায়তা"]
    },
    {
      icon: <Building2 className="h-8 w-8 text-orange-600" />,
      title: "হোস্টেল ব্যবস্থাপনা",
      description: "রুম অ্যালোকেশন, মেস ব্যবস্থাপনা এবং হোস্টেল সেবা",
      color: "bg-orange-50 dark:bg-orange-950",
      link: "/hostel",
      features: ["রুম বরাদ্দ", "মেস ব্যবস্থাপনা", "নিরাপত্তা", "রক্ষণাবেক্ষণ"]
    },
    {
      icon: <Bus className="h-8 w-8 text-indigo-600" />,
      title: "ট্রান্সপোর্ট সিস্টেম",
      description: "রুট পরিকল্পনা, GPS ট্র্যাকিং এবং নিরাপত্তা",
      color: "bg-indigo-50 dark:bg-indigo-950",
      link: "/transport",
      features: ["রুট ট্র্যাকিং", "GPS মনিটরিং", "ড্রাইভার ব্যবস্থাপনা", "নিরাপত্তা"]
    },
    {
      icon: <School className="h-8 w-8 text-green-600" />,
      title: "ইসলামিক ফিচারস",
      description: "নামাজের সময়, হিফজ ট্র্যাকিং এবং আখলাক পয়েন্ট",
      color: "bg-emerald-50 dark:bg-emerald-950",
      link: "/islamic",
      features: ["নামাজের ওয়াক্ত", "হিফজ ট্র্যাকিং", "আখলাক পয়েন্ট", "ইসলামিক ক্যালেন্ডার"]
    },
  ];

  const achievements = [
    { icon: <Award className="h-8 w-8 text-yellow-500" />, title: "১০০+ বছরের ঐতিহ্য", description: "দীর্ঘ ইতিহাস ও অভিজ্ঞতা" },
    { icon: <Users className="h-8 w-8 text-blue-500" />, title: "৫০০০+ ছাত্র", description: "সফল আলেম তৈরি" },
    { icon: <GraduationCap className="h-8 w-8 text-green-500" />, title: "৯৮% পাসের হার", description: "উচ্চ শিক্ষার মান" },
    { icon: <Star className="h-8 w-8 text-purple-500" />, title: "৫০+ বিশেষজ্ঞ শিক্ষক", description: "অভিজ্ঞ শিক্ষকমন্ডলী" },
  ];

  const testimonials = [
    {
      name: "উস্তাদ আবদুর রহমান",
      role: "প্রধান শিক্ষক",
      text: "এই সিস্টেম আমাদের প্রশাসনিক কাজকে অনেক সহজ করে দিয়েছে। ছাত্রদের তথ্য ব্যবস্থাপনা এখন খুবই কার্যকর।",
      image: "/placeholder.svg"
    },
    {
      name: "হাফেজ মোহাম্মদ আলী",
      role: "হিফজ বিভাগের প্রধান",
      text: "হিফজ ট্র্যাকিং ফিচার অসাধারণ। এখন প্রতিটি ছাত্রের অগ্রগতি সহজেই মনিটর করতে পারি।",
      image: "/placeholder.svg"
    },
    {
      name: "মাওলানা সাইফুল ইসলাম",
      role: "একাডেমিক কোঅর্ডিনেটর",
      text: "পরীক্ষার ফলাফল প্রকাশ এবং রিপোর্ট তৈরি এত দ্রুত হয় যে বিশ্বাস করতে পারি না।",
      image: "/placeholder.svg"
    },
  ];

  const islamicFeatures = [
    {
      icon: <Sun className="h-12 w-12 text-yellow-500" />,
      title: "নামাজের সময়সূচি",
      description: "স্থানীয় সময় অনুযায়ী স্বয়ংক্রিয় নামাজের ওয়াক্ত আপডেট",
      time: "ফজর: ৫:১৫ | যোহর: ১২:০৫ | আসর: ৪:৩০ | মাগরিব: ৬:১৫ | এশা: ৭:৪৫"
    },
    {
      icon: <BookMarked className="h-12 w-12 text-green-500" />,
      title: "হিফজ ট্র্যাকিং",
      description: "কুরআন মুখস্থের অগ্রগতি ও তাজবীদ মূল্যায়ন",
      progress: "সম্পূর্ণ কুরআন: ৭৫% | তাজবীদ স্কোর: ৮৫%"
    },
    {
      icon: <Star className="h-12 w-12 text-purple-500" />,
      title: "আখলাক পয়েন্ট",
      description: "নৈতিক আচরণ ও ইসলামিক মূল্যবোধের মূল্যায়ন",
      points: "গড় আখলাক স্কোর: ৯২% | সর্বোচ্চ: ৯৮%"
    },
  ];

  const quickLinks = [
    { title: "অনলাইন ভর্তি", link: "/admission", icon: <Users className="h-5 w-5" /> },
    { title: "ফি পেমেন্ট", link: "/fee-payment", icon: <CreditCard className="h-5 w-5" /> },
    { title: "নোটিশ বোর্ড", link: "/notice", icon: <Bell className="h-5 w-5" /> },
    { title: "একাডেমিক ক্যালেন্ডার", link: "/calendar", icon: <Calendar className="h-5 w-5" /> },
    { title: "লাইব্রেরি", link: "/library", icon: <BookOpen className="h-5 w-5" /> },
    { title: "রিপোর্ট", link: "/reports", icon: <BarChart3 className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-green-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-islamic-green rounded-lg">
                <School className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-islamic-green-dark dark:text-islamic-green">
                  CHKMS
                </h1>
                <p className="text-sm text-muted-foreground font-bengali">
                  চুনতি হাকিমিয়া কামিল মাদ্রাসা
                </p>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{currentTime.toLocaleTimeString('bn-BD')}</span>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="#about"
                className="text-gray-600 hover:text-islamic-green transition-colors font-bengali"
              >
                সম্পর্কে
              </Link>
              <Link
                to="#features"
                className="text-gray-600 hover:text-islamic-green transition-colors font-bengali"
              >
                বৈশিষ্ট্য
              </Link>
              <Link
                to="#contact"
                className="text-gray-600 hover:text-islamic-green transition-colors font-bengali"
              >
                যোগাযোগ
              </Link>
              <Button
                asChild
                className="bg-islamic-green hover:bg-islamic-green-dark font-bengali"
              >
                <Link to="/login">লগইন</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Quick Access Bar */}
      <div className="bg-islamic-green text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              🔥 নতুন ফিচার: ডিজিটাল লাইব্রেরি এখন লাইভ!
            </div>
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <span>পরবর্তী পরীক্ষা: ১৫ ডিসেম্বর</span>
              <span>•</span>
              <span>হটলাইন: ০১৭১১-১২৩৪৫৬</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Badge className="bg-islamic-gold/10 text-islamic-gold border-islamic-gold/20 px-6 py-2 text-lg font-bengali">
              আধুনিক মাদ্রাসা ব্যবস্থাপনা
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-bengali-heading">
            চুনতি হাকিমিয়া কামিল মাদ্রাসা
            <span className="block text-islamic-green">
              ম্যানেজমেন্ট সিস্টেম
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto font-bengali-body">
            ইসলামিক শিক্ষার ঐতিহ্য রক্ষা করে আধুনিক প্রযুক্তির সমন্বয়ে একটি
            সম্পূর্ণ ডিজিটাল শিক্ষা ব্যবস্থাপনা
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              asChild
              className="bg-islamic-green hover:bg-islamic-green-dark text-white px-8 font-bengali"
            >
              <Link to="/student">
                <Users className="mr-2 h-5 w-5" />
                শিক্ষার্থী পোর্টাল
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-islamic-blue text-islamic-blue hover:bg-islamic-blue hover:text-white px-8 font-bengali"
            >
              <Link to="/teacher">
                <GraduationCap className="mr-2 h-5 w-5" />
                শিক্ষক পোর্টাল
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-islamic-gold text-islamic-gold hover:bg-islamic-gold hover:text-white px-8 font-bengali"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              ভিডিও ট্যুর
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {dynamicStats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border-green-100 dark:border-gray-800 hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className={`flex justify-center mb-2 ${stat.color}`}>
                    {isLoading ? (
                      <Activity className="h-5 w-5 animate-spin" />
                    ) : (
                      stat.icon
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-bengali">
                    {stat.label}
                  </div>
                  {stat.trend && !isLoading && (
                    <div className="text-xs text-green-600 mt-1 flex items-center justify-center font-bengali">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.trend}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-bengali-heading">
              দ্রুত অ্যাক্সেস
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.link}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer text-center">
                  <CardContent className="p-4">
                    <div className="flex justify-center mb-2 text-islamic-green">
                      {link.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white font-bengali">
                      {link.title}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-bengali-heading">
              আমাদের অর্জনসমূহ
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-bengali-body">
              দীর্ঘ পথ পরিক্রমায় আমাদের গৌরবময় ইতিহাস ও সাফল্যের পরিসংখ্যান
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {achievement.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-bengali-title">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 font-bengali-body">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 bg-white/50 dark:bg-gray-800/50"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-bengali-heading">
              সিস্টেমের বৈশিষ্ট্যসমূহ
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-bengali-body">
              আধুনিক প্রযুক্তি ব্যবহার করে মাদ্রাসার সকল কার্যক্রম ডিজিটাইজেশন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link} className="block">
                <Card
                  className={`${feature.color} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full`}
                >
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white font-bengali-title">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 dark:text-gray-300 font-bengali-body mb-4">
                      {feature.description}
                    </CardDescription>
                    <div className="space-y-2">
                      {feature.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="font-bengali">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Islamic Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-bengali-heading">
              ইসলামিক বিশেষ সুবিধা
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-bengali-body">
              ইসলামিক মূল্যবোধ ও আধুনিক প্রযুক্তির নিখুঁত সমন্বয়
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {islamicFeatures.map((feature, index) => (
              <Card key={index} className="text-center border-islamic-green/20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-islamic-green font-bengali-title">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 font-bengali-body mb-4">
                    {feature.description}
                  </p>
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 font-bengali">
                      {feature.time || feature.progress || feature.points}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-bengali-heading">
              আমাদের শিক্ষকদের মতামত
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-bengali-body">
              যারা প্রতিদিন এই সিস্টেম ব্যবহার করেন তাদের অভিজ্ঞতা
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-islamic-green rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-gray-900 dark:text-white font-bengali">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-bengali">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic font-bengali-body">
                    "{testimonial.text}"
                  </p>
                  <div className="flex text-yellow-400 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-bengali-heading">
              আধুনিক প্রযুক্তি
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-bengali-body">
              সর্বশেষ প্রযুক্তি ব্যবহার করে নির্মিত নির���পদ ও দ্রুত সিস্টেম
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Smartphone className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-bengali">মোবাইল অ্যাপ</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-bengali">Android ও iOS সাপোর্ট</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Monitor className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-bengali">ওয়েব প্ল্যাটফর্ম</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-bengali">সব ব্রাউজারে কাজ করে</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-red-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-bengali">নিরাপত্তা</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-bengali">২৫৬-বিট এনক্রিপশন</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-bengali">ক্লাউড স্টোরেজ</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-bengali">২৪/৭ ব্যাকআপ</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-islamic-green text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-bengali-heading">
                যোগাযোগ করুন
              </h2>
              <p className="text-lg mb-8 text-green-100 font-bengali-body">
                আমাদের সাথে যোগাযোগ ক��ুন এবং আধুনিক মাদ্রাসা ব্যবস্থাপনার
                অংশীদার হন
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5" />
                  <span>+8801234567890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5" />
                  <span>info@chkmadrasa.edu.bd</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5" />
                  <span>চুনতি, লক্ষ্মীপুর, বাংলাদেশ</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5" />
                  <span>www.chkmadrasa.edu.bd</span>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 font-bengali">আমাদের ফলো করুন</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-islamic-green">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-islamic-green">
                    <Youtube className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-islamic-green">
                    <Instagram className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 text-gray-900">
              <h3 className="text-xl font-bold mb-4 font-bengali-title">
                আজই শুরু করুন
              </h3>
              <p className="mb-6 font-bengali-body">
                আপনার মাদ্রাসার জন্য আধুনিক ব্যবস্থাপনা সিস্টেম ব্যবহার করুন
              </p>
              <div className="space-y-4">
                <Button className="w-full bg-islamic-green hover:bg-islamic-green-dark text-white font-bengali">
                  ডেমো বুক করুন
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full border-islamic-green text-islamic-green hover:bg-islamic-green hover:text-white font-bengali">
                  <Download className="mr-2 h-4 w-4" />
                  ব্রোশিউর ডাউনলোড
                </Button>
                <Button variant="outline" className="w-full border-islamic-blue text-islamic-blue hover:bg-islamic-blue hover:text-white font-bengali">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  লাইভ চ্যাট
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-islamic-green rounded-lg">
                  <School className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">CHKMS</h3>
                  <p className="text-sm text-gray-400">
                    চুনতি হাকিমিয়া কামিল মাদ্রাসা
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm font-bengali-body">
                ইসলামিক শিক্ষার ঐতিহ্য রক্ষা করে আধুনিক প্রযুক্তির সমন্বয়ে
                একটি সম্পূর্ণ ডিজিটাল শিক্ষা ব্যবস্থাপনা।
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 font-bengali">দ্রুত লিঙ্ক</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors font-bengali">আমাদের সম্পর্কে</Link></li>
                <li><Link to="/admission" className="text-gray-400 hover:text-white transition-colors font-bengali">ভর্তি তথ্য</Link></li>
                <li><Link to="/academic" className="text-gray-400 hover:text-white transition-colors font-bengali">একাডেমিক</Link></li>
                <li><Link to="/notice" className="text-gray-400 hover:text-white transition-colors font-bengali">নোটিশ</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors font-bengali">যোগাযোগ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 font-bengali">সেবাসমূহ</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/student" className="text-gray-400 hover:text-white transition-colors font-bengali">শিক্ষার্থী পোর্টাল</Link></li>
                <li><Link to="/teacher" className="text-gray-400 hover:text-white transition-colors font-bengali">শিক্ষক পোর্টাল</Link></li>
                <li><Link to="/parent" className="text-gray-400 hover:text-white transition-colors font-bengali">অভিভাবক পোর্টাল</Link></li>
                <li><Link to="/library" className="text-gray-400 hover:text-white transition-colors font-bengali">ডিজিটাল লাইব্রেরি</Link></li>
                <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors font-bengali">সাপো��্ট</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 font-bengali">যোগাযোগ</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="font-bengali">চুনতি, লক্ষ্মীপুর-৩৭০৪</p>
                <p>ফোন: +৮৮০১২৩৪৫৬৭৮৯০</p>
                <p>ইমেইল: info@chkmadrasa.edu.bd</p>
                <p className="font-bengali">সময়: সকাল ৮টা - বিকেল ৫টা</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 font-bengali">
              © ২০২৪ চুনতি হাকিমিয়া কামিল মাদ্রাসা ম্যানেজমেন্ট সিস্টেম। সকল
              অধিকার সংরক্ষিত।
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors font-bengali">গোপনীয়তা নীতি</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors font-bengali">ব্যবহারের শর্তাবলী</Link>
              <Link to="/help" className="text-gray-400 hover:text-white transition-colors font-bengali">সাহায্য</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
