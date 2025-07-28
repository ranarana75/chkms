import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  BookOpen, 
  Users,
  Clock,
  Search,
  Plus,
  Download,
  AlertTriangle,
  CheckCircle,
  School,
  Library,
  FileText
} from "lucide-react";

export default function LibraryDashboard() {
  const [libraryData, setLibraryData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLibraryData();
  }, []);

  const loadLibraryData = () => {
    setLoading(true);
    // Mock data load
    setTimeout(() => {
      setLibraryData({
        totalBooks: 2500,
        availableBooks: 2150,
        issuedBooks: 350,
        overdueBooks: 25,
        totalMembers: 1247,
        categories: ["তাফসীর", "হাদিস", "ফিকহ", "আরবি সাহিত্য", "বাংলা", "ইংরেজি", "গণিত", "বিজ্ঞান"],
        recentIssues: [
          {
            id: "ISU001",
            studentName: "মোহাম্মদ আবদুল্লাহ",
            bookTitle: "তাফসীরে ইবনে কাসীর",
            issueDate: "২০২৪-১২-০১",
            dueDate: "২০২৪-১২-১৫",
            status: "issued"
          },
          {
            id: "ISU002",
            studentName: "আবুল কাসেম",
            bookTitle: "সহীহ বুখারী",
            issueDate: "২০২৪-১১-২৮",
            dueDate: "২০২৪-১২-১২",
            status: "returned"
          },
          {
            id: "ISU003",
            studentName: "মোহ��ম্মদ ইব্রাহিম",
            bookTitle: "আরবি ব্যাকরণ",
            issueDate: "২০২৪-১২-০৩",
            dueDate: "২০২৪-১২-১৭",
            status: "issued"
          }
        ],
        popularBooks: [
          {
            id: "BK001",
            title: "তাফসীরে ইবনে কাসীর",
            author: "ইমাম ইবনে কাসীর",
            category: "তাফসীর",
            totalCopies: 10,
            availableCopies: 7,
            issueCount: 45
          },
          {
            id: "BK002",
            title: "সহীহ বুখারী",
            author: "ইমাম বুখারী",
            category: "হাদিস",
            totalCopies: 15,
            availableCopies: 12,
            issueCount: 38
          },
          {
            id: "BK003",
            title: "আরবি ব্যাকরণ",
            author: "ড. মুহাম্মদ আব্দুল্লাহ",
            category: "আরবি সাহিত্য",
            totalCopies: 20,
            availableCopies: 18,
            issueCount: 32
          }
        ],
        overdueList: [
          {
            id: "ISU004",
            studentName: "আব্দুর রহমান",
            bookTitle: "ফিকহুস সুন্নাহ",
            dueDate: "২০২৪-১১-৩০",
            overdueDays: 15,
            fine: 75
          },
          {
            id: "ISU005",
            studentName: "মোহাম্মদ হাসান",
            bookTitle: "আল-আকীদাহ",
            dueDate: "২০২৪-১২-০৫",
            overdueDays: 10,
            fine: 50
          }
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

  const { 
    totalBooks, 
    availableBooks, 
    issuedBooks, 
    overdueBooks, 
    totalMembers,
    categories,
    recentIssues,
    popularBooks,
    overdueList
  } = libraryData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50">
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">লাইব্রেরি ব্যবস্থাপনা</h1>
            <p className="text-gray-600">বই ইস্যু, ফেরত এবং লাইব্রেরি পরিচালনা</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-islamic-green hover:bg-islamic-green-dark">
              <Plus className="h-4 w-4 mr-2" />
              নতুন বই যোগ করুন
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              রিপোর্ট ডাউনলোড
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-islamic-blue" />
                <div>
                  <p className="text-2xl font-bold text-islamic-blue">{totalBooks.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">মোট বই</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-islamic-green" />
                <div>
                  <p className="text-2xl font-bold text-islamic-green">{availableBooks.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">উপলব্ধ বই</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Library className="h-8 w-8 text-islamic-gold" />
                <div>
                  <p className="text-2xl font-bold text-islamic-gold">{issuedBooks}</p>
                  <p className="text-sm text-gray-600">ইস্যুকৃত বই</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-600">{overdueBooks}</p>
                  <p className="text-sm text-gray-600">বিলম্বিত বই</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-600">{totalMembers.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">সদস্য সংখ্যা</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-islamic-blue" />
              <span>বই অনুসন্ধান</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="বইয়ের নাম, লেখক বা ISBN"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="ক্যাটেগরি নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব ক্যাটেগরি</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="bg-islamic-blue hover:bg-islamic-blue-dark">
                <Search className="h-4 w-4 mr-2" />
                অনুসন্ধান করুন
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Issues */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-islamic-green" />
                    <span>সাম্প্রতিক ইস্যু</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    সব দেখুন
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentIssues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          issue.status === 'issued' 
                            ? 'bg-yellow-100 text-yellow-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {issue.status === 'issued' ? 
                            <Clock className="h-4 w-4" /> : 
                            <CheckCircle className="h-4 w-4" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{issue.bookTitle}</p>
                          <p className="text-sm text-gray-600">{issue.studentName}</p>
                          <p className="text-xs text-gray-500">
                            ইস্যু: {issue.issueDate} • ফেরত: {issue.dueDate}
                          </p>
                        </div>
                      </div>
                      <Badge variant={issue.status === 'issued' ? 'default' : 'outline'}>
                        {issue.status === 'issued' ? 'ইস্যুকৃত' : 'ফেরত'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Books */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-islamic-gold" />
                  <span>জনপ্রিয় বই</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularBooks.map((book, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <h3 className="font-semibold text-gray-900">{book.title}</h3>
                        <p className="text-sm text-gray-600">{book.author}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">{book.category}</Badge>
                          <span className="text-xs text-gray-500">
                            {book.issueCount} বার ইস্যু
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {book.availableCopies}/{book.totalCopies} উপলব্ধ
                        </p>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-islamic-green h-2 rounded-full" 
                            style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overdue Books */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span>বিলম্বিত বই</span>
                </CardTitle>
                <CardDescription>
                  যেসব বই নির্ধারিত সময়ে ফেরত দেওয়া হয়নি
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {overdueList.map((item, index) => (
                    <div key={index} className="p-3 border rounded-lg bg-red-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{item.bookTitle}</h4>
                        <Badge variant="destructive" className="text-xs">
                          {item.overdueDays} দিন
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{item.studentName}</p>
                      <p className="text-xs text-gray-500">শেষ তারিখ: {item.dueDate}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-medium text-red-600">
                          জরিমানা: ৳{item.fine}
                        </span>
                        <Button size="sm" variant="outline" className="text-xs">
                          রিমাইন্ডার
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>দ্রুত অ্যাকশন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-islamic-green hover:bg-islamic-green-dark justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  বই ইস্যু করুন
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  বই ফেরত নিন
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  নতুন বই যোগ করুন
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  লাইব্রেরি রিপোর্ট
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
