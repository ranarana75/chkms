import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import Navigation from '../components/Navigation';
import { 
  BookOpen, 
  Users,
  Clock,
  Search,
  Plus,
  Download,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  Library,
  FileText
} from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  language: 'bangla' | 'arabic' | 'english' | 'urdu';
  totalCopies: number;
  availableCopies: number;
  issuedCopies: number;
}

interface LibraryIssue {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fine?: number;
  status: 'issued' | 'returned' | 'overdue';
}

interface LibraryStats {
  totalBooks: number;
  totalStudents: number;
  booksIssued: number;
  overdueBooks: number;
  totalFines: number;
  popularBooks: number;
}

const LibraryDashboard: React.FC = () => {
  const [libraryStats, setLibraryStats] = useState<LibraryStats | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [issues, setIssues] = useState<LibraryIssue[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isIssueBookOpen, setIsIssueBookOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    language: '',
    totalCopies: ''
  });
  const [issueBook, setIssueBook] = useState({
    bookId: '',
    studentId: '',
    studentName: ''
  });

  useEffect(() => {
    fetchLibraryData();
    fetchBooks();
    fetchIssues();
  }, []);

  const fetchLibraryData = async () => {
    try {
      const response = await fetch('/api/library/dashboard');
      const data = await response.json();
      setLibraryStats(data.stats);
    } catch (error) {
      console.error('Error fetching library data:', error);
      // Mock data for demo
      setLibraryStats({
        totalBooks: 2850,
        totalStudents: 1247,
        booksIssued: 485,
        overdueBooks: 23,
        totalFines: 4500,
        popularBooks: 156
      });
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/library/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      // Mock data for demo
      setBooks([
        {
          id: '1',
          title: 'তাফসীরে ইবনে কাসীর',
          author: 'ইমাম ইবনে কাসীর',
          isbn: '978-984-123-456-7',
          category: 'islamic',
          language: 'bangla',
          totalCopies: 10,
          availableCopies: 7,
          issuedCopies: 3
        },
        {
          id: '2',
          title: 'সহীহ বুখারী',
          author: 'ইমাম বুখারী',
          isbn: '978-984-123-457-8',
          category: 'hadith',
          language: 'arabic',
          totalCopies: 15,
          availableCopies: 12,
          issuedCopies: 3
        },
        {
          id: '3',
          title: 'বাংলা ব্যাকরণ',
          author: 'ড. মুহাম্মদ শহীদুল্লাহ',
          isbn: '978-984-123-458-9',
          category: 'academic',
          language: 'bangla',
          totalCopies: 20,
          availableCopies: 15,
          issuedCopies: 5
        }
      ]);
    }
  };

  const fetchIssues = async () => {
    try {
      const response = await fetch('/api/library/issues');
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
      // Mock data for demo
      setIssues([
        {
          id: '1',
          bookId: '1',
          bookTitle: 'তাফসীরে ইবনে কাসীর',
          studentId: 'std-001',
          studentName: 'মোহাম্মদ আব্দুল্লাহ',
          issueDate: '2024-11-15',
          dueDate: '2024-12-15',
          status: 'issued'
        },
        {
          id: '2',
          bookId: '2',
          bookTitle: 'সহীহ বুখারী',
          studentId: 'std-002',
          studentName: 'ফাতিমা খাতুন',
          issueDate: '2024-11-10',
          dueDate: '2024-12-10',
          status: 'overdue',
          fine: 50
        },
        {
          id: '3',
          bookId: '3',
          bookTitle: 'বাংলা ব্যাকরণ',
          studentId: 'std-003',
          studentName: 'আবু বকর সিদ্দিক',
          issueDate: '2024-11-20',
          dueDate: '2024-12-20',
          returnDate: '2024-12-05',
          status: 'returned'
        }
      ]);
    }
  };

  const handleAddBook = async () => {
    try {
      const response = await fetch('/api/library/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newBook,
          totalCopies: parseInt(newBook.totalCopies),
          availableCopies: parseInt(newBook.totalCopies),
          issuedCopies: 0
        }),
      });

      if (response.ok) {
        setIsAddBookOpen(false);
        setNewBook({
          title: '',
          author: '',
          isbn: '',
          category: '',
          language: '',
          totalCopies: ''
        });
        fetchBooks();
        fetchLibraryData();
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleIssueBook = async () => {
    try {
      const response = await fetch('/api/library/issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...issueBook,
          issueDate: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }),
      });

      if (response.ok) {
        setIsIssueBookOpen(false);
        setIssueBook({
          bookId: '',
          studentId: '',
          studentName: ''
        });
        fetchIssues();
        fetchBooks();
        fetchLibraryData();
      }
    } catch (error) {
      console.error('Error issuing book:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued':
        return 'bg-blue-100 text-blue-800';
      case 'returned':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'issued':
        return 'ইস্যুকৃত';
      case 'returned':
        return 'ফেরত';
      case 'overdue':
        return 'অতিরিক্ত সময়';
      default:
        return status;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'islamic':
        return 'ইসলামিক';
      case 'hadith':
        return 'হাদিস';
      case 'academic':
        return 'একাডেমিক';
      case 'literature':
        return 'সাহিত্য';
      case 'science':
        return 'বিজ্ঞান';
      default:
        return category;
    }
  };

  const getLanguageText = (language: string) => {
    switch (language) {
      case 'bangla':
        return 'বাংলা';
      case 'arabic':
        return 'আরবি';
      case 'english':
        return 'ইংরেজি';
      case 'urdu':
        return 'উর্দু';
      default:
        return language;
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!libraryStats) {
    return <div className="flex justify-center items-center h-64">লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">লাইব্রেরি ব্যবস্থাপনা</h1>
            <p className="text-gray-600 mt-1">বই ক্যাটালগ এবং ইস্যু-রিটার্ন ব্যবস্থাপনা</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              রিপোর্ট
            </Button>
            <Dialog open={isIssueBookOpen} onOpenChange={setIsIssueBookOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  বই ইস্যু
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>বই ইস্যু করুন</DialogTitle>
                  <DialogDescription>
                    শিক্ষার্থীকে বই ইস্যু করার জন্য তথ্য প্রদান করুন
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="issueBookId">বই নির্বাচন</Label>
                    <Select value={issueBook.bookId} onValueChange={(value) => setIssueBook({ ...issueBook, bookId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="বই নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {books.filter(book => book.availableCopies > 0).map((book) => (
                          <SelectItem key={book.id} value={book.id}>
                            {book.title} - {book.author} (উপলব্ধ: {book.availableCopies})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="issueStudentId">শিক্ষার্থী আইডি</Label>
                    <Input
                      id="issueStudentId"
                      value={issueBook.studentId}
                      onChange={(e) => setIssueBook({ ...issueBook, studentId: e.target.value })}
                      placeholder="std-001"
                    />
                  </div>
                  <div>
                    <Label htmlFor="issueStudentName">শিক্ষার্থীর নাম</Label>
                    <Input
                      id="issueStudentName"
                      value={issueBook.studentName}
                      onChange={(e) => setIssueBook({ ...issueBook, studentName: e.target.value })}
                      placeholder="শিক্ষার্থীর নাম"
                    />
                  </div>
                  <Button onClick={handleIssueBook} className="w-full bg-blue-600 hover:bg-blue-700">
                    বই ইস্যু করুন
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  নতুন বই
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>নতুন বই যোগ করুন</DialogTitle>
                  <DialogDescription>
                    লাইব্রেরিতে নতুন বইয়ের তথ্য প্রদান করুন
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bookTitle">বইয়ের নাম</Label>
                    <Input
                      id="bookTitle"
                      value={newBook.title}
                      onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                      placeholder="বইয়ের নাম"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bookAuthor">লেখক</Label>
                    <Input
                      id="bookAuthor"
                      value={newBook.author}
                      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                      placeholder="লেখকের নাম"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bookIsbn">ISBN</Label>
                    <Input
                      id="bookIsbn"
                      value={newBook.isbn}
                      onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                      placeholder="978-984-123-456-7"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bookCategory">বিভাগ</Label>
                      <Select value={newBook.category} onValueChange={(value) => setNewBook({ ...newBook, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="বিভাগ নির্বা��ন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="islamic">ইসলামিক</SelectItem>
                          <SelectItem value="hadith">হাদিস</SelectItem>
                          <SelectItem value="academic">একাডেমিক</SelectItem>
                          <SelectItem value="literature">সাহিত্য</SelectItem>
                          <SelectItem value="science">বিজ্ঞান</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bookLanguage">ভাষা</Label>
                      <Select value={newBook.language} onValueChange={(value) => setNewBook({ ...newBook, language: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="ভাষা নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bangla">বাংলা</SelectItem>
                          <SelectItem value="arabic">আরবি</SelectItem>
                          <SelectItem value="english">ইংরেজি</SelectItem>
                          <SelectItem value="urdu">উর্দু</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bookCopies">কপি সংখ্যা</Label>
                    <Input
                      id="bookCopies"
                      type="number"
                      value={newBook.totalCopies}
                      onChange={(e) => setNewBook({ ...newBook, totalCopies: e.target.value })}
                      placeholder="১০"
                    />
                  </div>
                  <Button onClick={handleAddBook} className="w-full bg-green-600 hover:bg-green-700">
                    বই যোগ করুন
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট বই</p>
                  <p className="text-2xl font-bold text-gray-900">{libraryStats.totalBooks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">নিবন্ধিত শিক্ষার্থী</p>
                  <p className="text-2xl font-bold text-gray-900">{libraryStats.totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">ইস্যুকৃত বই</p>
                  <p className="text-2xl font-bold text-gray-900">{libraryStats.booksIssued}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">বিলম্বিত বই</p>
                  <p className="text-2xl font-bold text-gray-900">{libraryStats.overdueBooks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">জরিমানা</p>
                  <p className="text-2xl font-bold text-gray-900">৳{libraryStats.totalFines}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">জনপ্রিয় বই</p>
                  <p className="text-2xl font-bold text-gray-900">{libraryStats.popularBooks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>বই অনুসন্ধান</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="বই বা লেখকের নাম অনুসন্ধান করুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব বিভাগ</SelectItem>
                  <SelectItem value="islamic">ইসলামিক</SelectItem>
                  <SelectItem value="hadith">হাদিস</SelectItem>
                  <SelectItem value="academic">একাডেমিক</SelectItem>
                  <SelectItem value="literature">সাহিত্য</SelectItem>
                  <SelectItem value="science">বিজ্ঞান</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Books Table */}
        <Card>
          <CardHeader>
            <CardTitle>বইয়ের তালিকা</CardTitle>
            <CardDescription>লাইব্রেরির সকল বইয়ের তালিকা এবং প্রাপ্যতা</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">বইয়ের নাম</th>
                    <th className="text-left p-2">লেখক</th>
                    <th className="text-left p-2">বিভাগ</th>
                    <th className="text-left p-2">ভাষা</th>
                    <th className="text-left p-2">মোট কপি</th>
                    <th className="text-left p-2">উপলব্ধ</th>
                    <th className="text-left p-2">ইস্যুকৃত</th>
                    <th className="text-left p-2">কার্যক্রম</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{book.title}</td>
                      <td className="p-2">{book.author}</td>
                      <td className="p-2">{getCategoryText(book.category)}</td>
                      <td className="p-2">{getLanguageText(book.language)}</td>
                      <td className="p-2">{book.totalCopies}</td>
                      <td className="p-2">
                        <Badge className={book.availableCopies > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {book.availableCopies}
                        </Badge>
                      </td>
                      <td className="p-2">{book.issuedCopies}</td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Issues */}
        <Card>
          <CardHeader>
            <CardTitle>সাম্প্রতিক ইস্যু/রিটার্ন</CardTitle>
            <CardDescription>গত ৩০ দিনের বই ইস্যু এবং রিটার্নের তালিকা</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">বইয়ের নাম</th>
                    <th className="text-left p-2">শিক্ষার্থী</th>
                    <th className="text-left p-2">ইস্যুর তারিখ</th>
                    <th className="text-left p-2">ফেরতের তারিখ</th>
                    <th className="text-left p-2">জরিমানা</th>
                    <th className="text-left p-2">অবস্থা</th>
                    <th className="text-left p-2">কার্যক্রম</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => (
                    <tr key={issue.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{issue.bookTitle}</td>
                      <td className="p-2">{issue.studentName}</td>
                      <td className="p-2">{new Date(issue.issueDate).toLocaleDateString('bn-BD')}</td>
                      <td className="p-2">{new Date(issue.dueDate).toLocaleDateString('bn-BD')}</td>
                      <td className="p-2">{issue.fine ? `৳${issue.fine}` : '-'}</td>
                      <td className="p-2">
                        <Badge className={getStatusColor(issue.status)}>
                          {getStatusText(issue.status)}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {issue.status === 'issued' && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              ফেরত
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LibraryDashboard;
