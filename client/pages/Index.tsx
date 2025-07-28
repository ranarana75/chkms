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
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-islamic-green" />,
      title: "শিক্ষার্থী ব্যবস্থাপনা",
      description: "সম্পূর্ণ ছাত্র তথ্য, উপস্থিতি এবং পারফরম্যান্স ট্র্যাকিং",
      color: "bg-green-50 dark:bg-green-950",
      link: "/student",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-islamic-blue" />,
      title: "শিক্ষক পোর্টাল",
      description: "ক্লাস রুটিন, মার্কস এন্ট্রি এবং শিক্ষক ড্যাশবোর্ড",
      color: "bg-blue-50 dark:bg-blue-950",
      link: "/teacher",
    },
    {
      icon: <Calculator className="h-8 w-8 text-islamic-gold" />,
      title: "আ��্থিক ব্যবস্থাপনা",
      description: "ফি কালেকশন, বকেয়া ট্র্যাকিং এবং আর্থিক রিপোর্ট",
      color: "bg-yellow-50 dark:bg-yellow-950",
      link: "/finance",
    },
    {
      icon: <FileText className="h-8 w-8 text-red-600" />,
      title: "পরীক্ষা ব্যবস্থাপনা",
      description: "পরীক্ষার সময়সূচি, প্রশ্নপত্র এবং ফলাফল ব্যবস্থাপনা",
      color: "bg-red-50 dark:bg-red-950",
      link: "/examination",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      title: "লাইব্রেরি সিস্টেম",
      description: "ডিজিটাল বুক ক্যাটালগ এবং ইস্যু-রিটার্ন ব্যবস্থা",
      color: "bg-purple-50 dark:bg-purple-950",
      link: "/library",
    },
    {
      icon: <Building2 className="h-8 w-8 text-orange-600" />,
      title: "হোস্টেল ব্যবস্থাপনা",
      description: "রুম অ্যালোকেশন, মেস ব্যবস্থাপনা এ���ং হোস্��েল সেবা",
      color: "bg-orange-50 dark:bg-orange-950",
      link: "/hostel",
    },
    {
      icon: <Bus className="h-8 w-8 text-indigo-600" />,
      title: "ট্রান্সপোর্ট সিস্টেম",
      description: "রুট পরিকল্পনা, GPS ট্র্যাকিং এবং নিরাপত্তা",
      color: "bg-indigo-50 dark:bg-indigo-950",
      link: "/transport",
    },
    {
      icon: <School className="h-8 w-8 text-green-600" />,
      title: "ইসলামিক ফিচারস",
      description: "নামাজের সময়, হিফজ ট্র্যাকিং এবং আখলাক পয়েন্ট",
      color: "bg-emerald-50 dark:bg-emerald-950",
      link: "/islamic",
    },
  ];

  const stats = [
    {
      label: "মোট শিক্ষা���্থী",
      value: "1,200+",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "শিক্ষক",
      value: "85+",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    { label: "বিভাগ", value: "12", icon: <Building2 className="h-5 w-5" /> },
    {
      label: "সফলত���র হা����",
      value: "95%",
      icon: <Star className="h-5 w-5" />,
    },
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
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="#about"
                className="text-gray-600 hover:text-islamic-green transition-colors font-bengali"
              >
                সম্পর���কে
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
                য���গাযোগ
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Badge className="bg-islamic-gold/10 text-islamic-gold border-islamic-gold/20 px-6 py-2 text-lg font-bengali">
              আধুনিক মাদ্রাসা ব্যবস্থাপন��
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-bengali-heading">
            চুনতি হাকিমিয়া কামিল মাদ্রাসা
            <span className="block text-islamic-green">
              ম্যানেজমেন্ট সিস্টেম
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto font-bengali-body">
            ইসলামিক শিক্ষার ঐতিহ্য রক্ষা করে আধুনিক প্রযুক্তির সমন্ব���়ে একটি
            সম্পূর্ণ ���িজিটাল শিক্ষা ব্যবস্থাপনা
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-islamic-green hover:bg-islamic-green-dark text-white px-8 font-bengali"
            >
              <Users className="mr-2 h-5 w-5" />
              শিক্ষার্থী পোর্টাল
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-islamic-blue text-islamic-blue hover:bg-islamic-blue hover:text-white px-8 font-bengali"
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              শিক্ষক পোর্টাল
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border-green-100 dark:border-gray-800"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-2 text-islamic-green">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-bengali">
                    {stat.label}
                  </div>
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
                  className={`${feature.color} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
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
                    <CardDescription className="text-center text-gray-600 dark:text-gray-300 font-bengali-body">
                      {feature.description}
                    </CardDescription>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-islamic-green/20 bg-green-50 dark:bg-green-950">
              <CardHeader>
                <School className="h-12 w-12 text-islamic-green mx-auto mb-4" />
                <CardTitle className="text-islamic-green font-bengali-title">
                  নামাজের সময়সূচি
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  স্থানীয় সময় অনুযায়��� স্বয়ংক্রি��় নামাজের ওয়াক্ত আপডেট
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-islamic-gold/20 bg-yellow-50 dark:bg-yellow-950">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-islamic-gold mx-auto mb-4" />
                <CardTitle className="text-islamic-gold font-bengali-title">
                  হিফজ ট্র্যাকিং
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 font-bengali-body">
                  কুরআন মুখস্থের অগ্রগতি ও তাজবীদ মূল্যায়ন
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-islamic-blue/20 bg-blue-50 dark:bg-blue-950">
              <CardHeader>
                <Star className="h-12 w-12 text-islamic-blue mx-auto mb-4" />
                <CardTitle className="text-islamic-blue">
                  আখলাক ��য়ে���্ট
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  নৈ��িক আচরণ ও ইসলামিক মূল্যবোধের মূল্যায়ন
                </p>
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
                আমাদের সাথে যোগাযোগ করুন এবং আধুনিক মাদ্রাসা ব্যবস্থাপনার
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
                  <span>চুনতি, ���ক্ষ্মীপুর, বা���লাদেশ</span>
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
              <Button className="w-full bg-islamic-green hover:bg-islamic-green-dark text-white font-bengali">
                ডেমো বুক করুন
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
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
          <p className="text-gray-400">
            © 2024 চুনতি হাকিম��য়া কামিল মাদ্র���সা ম্যানেজমেন্ট সিস্টেম। সকল
            অধিকার সংরক্ষিত।
          </p>
        </div>
      </footer>
    </div>
  );
}
