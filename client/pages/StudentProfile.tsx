import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart,
  FileText,
  Download,
  Edit,
  School
} from "lucide-react";

export default function StudentProfile() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data load
    setTimeout(() => {
      setStudentData({
        name: "মোহাম্ম�� আবদুল্লাহ",
        id: "STD001",
        class: "আলিম প্রথম বর্ষ",
        section: "ক",
        roll: "০৫",
        photo: "/placeholder.svg",
        fatherName: "মোহাম্মদ আব্দুর রহিম",
        motherName: "ফাতিমা খাতুন",
        dateOfBirth: "২০০৫-০৩-১৫",
        bloodGroup: "B+",
        address: "গ্রাম: চুনতি, উপজেলা: লক্ষ্মীপুর, জেলা: লক্ষ্মীপুর",
        phone: "০১৭১২৩৪৫৬৭৮",
        emergencyContact: "০১৭৮৭৬৫৪৩২১",
        admissionDate: "২০২৩-০১-০১"
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-green-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/student" className="inline-flex items-center text-islamic-green hover:text-islamic-green-dark transition-colors">
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
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-islamic-green/20 bg-gradient-to-r from-islamic-green/5 to-islamic-blue/5">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-32 w-32 border-4 border-islamic-green/20">
                  <AvatarImage src={studentData.photo} alt={studentData.name} />
                  <AvatarFallback className="bg-islamic-green text-white text-3xl">
                    {studentData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-900">{studentData.name}</h1>
                  <p className="text-lg text-islamic-green font-semibold">{studentData.class} • {studentData.section} বিভাগ</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                    <Badge className="bg-islamic-blue text-white">
                      আইডি: {studentData.id}
                    </Badge>
                    <Badge className="bg-islamic-gold text-white">
                      রোল: {studentData.roll}
                    </Badge>
                    <Badge className="bg-islamic-green text-white">
                      ভর্তি: {studentData.admissionDate}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Button className="bg-islamic-green hover:bg-islamic-green-dark">
                    <Edit className="h-4 w-4 mr-2" />
                    প্রোফাইল সম্পাদনা
                  </Button>
                  <Button variant="outline" className="border-islamic-blue text-islamic-blue">
                    <Download className="h-4 w-4 mr-2" />
                    প্রোফাইল ডাউনলোড
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">ব্যক্তিগত তথ্য</TabsTrigger>
            <TabsTrigger value="academic">একাডেমিক তথ্য</TabsTrigger>
            <TabsTrigger value="contact">যোগাযোগ তথ্য</TabsTrigger>
            <TabsTrigger value="documents">ডকুমেন্ট</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-islamic-green" />
                    <span>মৌলিক তথ্য</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">পূর্ণ নাম</label>
                      <p className="font-semibold">{studentData.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">জন্ম তারিখ</label>
                      <p className="font-semibold">{studentData.dateOfBirth}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">রক্তের গ্রুপ</label>
                      <p className="font-semibold">{studentData.bloodGroup}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">ভর্তির তারিখ</label>
                      <p className="font-semibold">{studentData.admissionDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span>পারিবারিক তথ্য</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">পিতার নাম</label>
                    <p className="font-semibold">{studentData.fatherName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">মাতার নাম</label>
                    <p className="font-semibold">{studentData.motherName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">জরুরি যোগাযোগ</label>
                    <p className="font-semibold">{studentData.emergencyContact}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academic">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>��কাডেমিক বিবরণ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">শ্রেণী</label>
                      <p className="font-semibold">{studentData.class}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">শাখা</label>
                      <p className="font-semibold">{studentData.section}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">রোল নম্বর</label>
                      <p className="font-semibold">{studentData.roll}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">শিক্ষার্থী আইডি</label>
                      <p className="font-semibold">{studentData.id}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>সাম্প্রতিক পারফরম্যান্স</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>গড় নম্বর</span>
                      <Badge className="bg-islamic-green text-white">৮৫.৫%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>উপস্থিতি</span>
                      <Badge className="bg-islamic-blue text-white">৯৪.৪%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>হিফজ অগ্রগতি</span>
                      <Badge className="bg-islamic-gold text-white">১৫/৩০ পারা</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-islamic-blue" />
                  <span>যোগাযোগের তথ্য</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>মোবাইল নম্বর</span>
                    </label>
                    <p className="font-semibold text-lg">{studentData.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>জরুরি যোগাযোগ</span>
                    </label>
                    <p className="font-semibold text-lg">{studentData.emergencyContact}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>পূর্ণ ঠিকানা</span>
                  </label>
                  <p className="font-semibold text-lg">{studentData.address}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-islamic-gold" />
                  <span>ডকুমেন্ট ও সার্টিফিকেট</span>
                </CardTitle>
                <CardDescription>
                  আপলোড করা ডকুমেন্ট এবং সার্টিফিকেটের তালিকা
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "জন্ম সনদ", status: "আপলোড সম্পন্ন", date: "২০২৩-০১-০১" },
                    { name: "SSC সার্টিফিকেট", status: "আপলোড সম্পন্ন", date: "২০২৩-০১-০১" },
                    { name: "ছবি", status: "আপলোড সম্পন্ন", date: "২০২৩-০১-০১" },
                    { name: "জাতীয় পরিচয়পত্র", status: "অনুপস্থিত", date: "-" }
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-600">{doc.date}</p>
                      </div>
                      <Badge variant={doc.status === "আপলোড সম্পন্ন" ? "default" : "destructive"}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button className="bg-islamic-green hover:bg-islamic-green-dark">
                    <FileText className="h-4 w-4 mr-2" />
                    নতুন ডকুমেন্ট আপলোড
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
