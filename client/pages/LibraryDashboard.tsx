import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocalStorage, useNotifications } from '@/hooks/useLocalData';
import { BookOpen, Users, Clock, Plus, Edit, Trash2, Search, Download } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  language: string;
  totalCopies: number;
  availableCopies: number;
  publishedYear: number;
  location: string;
  createdAt: string;
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
  fine: number;
  status: 'issued' | 'returned' | 'overdue';
  createdAt: string;
}

interface LibraryStats {
  totalBooks: number;
  totalIssues: number;
  activeIssues: number;
  overdueIssues: number;
  popularBooks: number;
  totalFineAmount: number;
}

export default function LibraryDashboard() {
  const [books, setBooks] = useLocalData<Book[]>('libraryBooks', []);
  const [issues, setIssues] = useLocalData<LibraryIssue[]>('libraryIssues', []);
  const [stats, setStats] = useState<LibraryStats>({
    totalBooks: 0,
    totalIssues: 0,
    activeIssues: 0,
    overdueIssues: 0,
    popularBooks: 0,
    totalFineAmount: 0
  });

  const { addNotification } = useNotifications();
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize with sample data if empty
  useEffect(() => {
    if (books.length === 0) {
      const sampleBooks: Book[] = [
        {
          id: '1',
          title: 'সহীহ বুখারী',
          author: 'ইমাম বুখারী',
          isbn: '978-984-123-456-7',
          category: 'হাদিস',
          language: 'আরবি',
          totalCopies: 5,
          availableCopies: 3,
          publishedYear: 2020,
          location: 'শেলফ A1',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'তাফসীরে ইবনে কাসীর',
          author: 'ইবনে কাসীর',
          isbn: '978-984-123-456-8',
          category: 'তাফসীর',
          language: 'বাংলা',
          totalCopies: 3,
          availableCopies: 2,
          publishedYear: 2019,
          location: 'শেলফ B2',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'রিয়াদুস সালেহীন',
          author: 'ইমাম নববী',
          isbn: '978-984-123-456-9',
          category: 'হাদিস',
          language: 'আরবি',
          totalCopies: 4,
          availableCopies: 1,
          publishedYear: 2021,
          location: 'শেলফ A2',
          createdAt: new Date().toISOString()
        }
      ];
      setBooks(sampleBooks);

      const sampleIssues: LibraryIssue[] = [
        {
          id: '1',
          bookId: '1',
          bookTitle: 'সহ��হ বুখারী',
          studentId: 'STD001',
          studentName: 'মোহাম্মদ আব্দুল্লাহ',
          issueDate: '2024-01-15',
          dueDate: '2024-02-15',
          status: 'issued',
          fine: 0,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          bookId: '3',
          bookTitle: 'রিয়াদুস সালেহীন',
          studentId: 'STD002',
          studentName: 'আহমদ হাসান',
          issueDate: '2024-01-05',
          dueDate: '2024-01-20',
          returnDate: '2024-01-18',
          status: 'returned',
          fine: 0,
          createdAt: new Date().toISOString()
        }
      ];
      setIssues(sampleIssues);
    }
  }, [books.length, setBooks, setIssues]);

  // Calculate stats
  useEffect(() => {
    const totalBooks = books.reduce((sum, book) => sum + book.totalCopies, 0);
    const totalIssues = issues.length;
    const activeIssues = issues.filter(issue => issue.status === 'issued').length;
    const overdueIssues = issues.filter(issue => {
      if (issue.status !== 'issued') return false;
      const dueDate = new Date(issue.dueDate);
      return dueDate < new Date();
    }).length;
    const popularBooks = books.filter(book => book.availableCopies < book.totalCopies).length;
    const totalFineAmount = issues.reduce((sum, issue) => sum + issue.fine, 0);

    setStats({
      totalBooks,
      totalIssues,
      activeIssues,
      overdueIssues,
      popularBooks,
      totalFineAmount
    });
  }, [books, issues]);

  const handleAddBook = (bookData: Omit<Book, 'id' | 'createdAt'>) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setBooks([...books, newBook]);
    addNotification('বই সফলভাবে যোগ করা হয়েছে', 'success');
    setIsBookDialogOpen(false);
  };

  const handleAddIssue = (issueData: Omit<LibraryIssue, 'id' | 'createdAt'>) => {
    const newIssue: LibraryIssue = {
      ...issueData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setIssues([...issues, newIssue]);

    // Update book availability
    const updatedBooks = books.map(book => 
      book.id === issueData.bookId 
        ? { ...book, availableCopies: book.availableCopies - 1 }
        : book
    );
    setBooks(updatedBooks);

    addNotification('বই ইস্যু করা হয়েছে', 'success');
    setIsIssueDialogOpen(false);
  };

  const handleReturnBook = (issueId: string) => {
    const updatedIssues = issues.map(issue => {
      if (issue.id === issueId) {
        const returnDate = new Date().toISOString().split('T')[0];
        let fine = 0;
        
        // Calculate fine if returned late
        const dueDate = new Date(issue.dueDate);
        const returnDateObj = new Date(returnDate);
        if (returnDateObj > dueDate) {
          const daysLate = Math.ceil((returnDateObj.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
          fine = daysLate * 5; // 5 taka per day
        }

        // Update book availability
        const updatedBooks = books.map(book => 
          book.id === issue.bookId 
            ? { ...book, availableCopies: book.availableCopies + 1 }
            : book
        );
        setBooks(updatedBooks);

        return { ...issue, status: 'returned' as const, returnDate, fine };
      }
      return issue;
    });
    
    setIssues(updatedIssues);
    addNotification('বই ফেরত নেওয়া হয়েছে', 'success');
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      issued: "default",
      returned: "secondary",
      overdue: "destructive"
    };
    
    const labels: { [key: string]: string } = {
      issued: 'ইস্যুকৃত',
      returned: 'ফেরত',
      overdue: 'বিলম্বিত'
    };

    return (
      <Badge variant={variants[status] || "secondary"}>
        {labels[status] || status}
      </Badge>
    );
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100" style={{ fontFamily: '"Noto Serif Bengali", serif' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">লাইব্রেরি ড্যাশবোর্ড</h1>
          <p className="text-emerald-600">বই ব্যবস্থাপনা ও ইস্যু ট্র্যাকিং</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">মোট বই</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{stats.totalBooks}</div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">মোট ইস্যু</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{stats.totalIssues}</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">সক্রিয় ইস্যু</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{stats.activeIssues}</div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700">বিলম্বিত</CardTitle>
              <Clock className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-800">{stats.overdueIssues}</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">জনপ্রিয় বই</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{stats.popularBooks}</div>
            </CardContent>
          </Card>

          <Card className="bg-indigo-50 border-indigo-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-indigo-700">মোট জরিমানা</CardTitle>
              <Download className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-800">৳{stats.totalFineAmount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="books" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="books">বই তালিকা</TabsTrigger>
            <TabsTrigger value="issues">ইস্যু তালিকা</TabsTrigger>
          </TabsList>

          {/* Books Tab */}
          <TabsContent value="books" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Input
                  placeholder="বই খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80"
                  icon={<Search className="w-4 h-4" />}
                />
              </div>
              <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন বই
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>নতুন বই যোগ</DialogTitle>
                    <DialogDescription>
                      বইয়ের তথ্য পূরণ করুন
                    </DialogDescription>
                  </DialogHeader>
                  <BookForm onSubmit={handleAddBook} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {filteredBooks.map((book) => (
                <Card key={book.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{book.title}</h3>
                          <Badge variant="outline">{book.category}</Badge>
                          <Badge variant={book.availableCopies > 0 ? "default" : "destructive"}>
                            {book.availableCopies > 0 ? '��পলব্ধ' : 'নেই'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">লেখক: {book.author}</p>
                            <p className="text-gray-600 mb-1">ভাষা: {book.language}</p>
                            <p className="text-gray-600">অবস্থান: {book.location}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">মোট কপি: {book.totalCopies}</p>
                            <p className="text-gray-600 mb-1">উপলব্ধ: {book.availableCopies}</p>
                            <p className="text-gray-600">প্রকাশ: {book.publishedYear}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Issues Tab */}
          <TabsContent value="issues" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-emerald-800">ইস্যু তালিকা</h2>
              <Dialog open={isIssueDialogOpen} onOpenChange={setIsIssueDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন ইস্যু
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>বই ইস্যু</DialogTitle>
                    <DialogDescription>
                      ইস্যুর তথ্য পূরণ করুন
                    </DialogDescription>
                  </DialogHeader>
                  <IssueForm books={books} onSubmit={handleAddIssue} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {issues.map((issue) => (
                <Card key={issue.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{issue.bookTitle}</h3>
                          {getStatusBadge(issue.status)}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">শিক্ষার্থী: {issue.studentName}</p>
                            <p className="text-gray-600 mb-1">ইস্যুর তারিখ: {new Date(issue.issueDate).toLocaleDateString('bn-BD')}</p>
                            <p className="text-gray-600">ফেরতের তারিখ: {new Date(issue.dueDate).toLocaleDateString('bn-BD')}</p>
                          </div>
                          <div>
                            {issue.returnDate && (
                              <p className="text-gray-600 mb-1">ফেরত: {new Date(issue.returnDate).toLocaleDateString('bn-BD')}</p>
                            )}
                            {issue.fine > 0 && (
                              <p className="text-red-600">জরিমানা: ৳{issue.fine}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {issue.status === 'issued' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReturnBook(issue.id)}
                          >
                            ফেরত নিন
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function BookForm({ onSubmit }: { onSubmit: (data: Omit<Book, 'id' | 'createdAt'>) => void }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    language: 'বাংলা',
    totalCopies: 1,
    availableCopies: 1,
    publishedYear: new Date().getFullYear(),
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">বইয়ের নাম</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">লেখক</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">বিভাগ</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            placeholder="যেমন: হাদিস, তাফসীর"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">ভাষা</Label>
          <Select value={formData.language} onValueChange={(value) => setFormData({...formData, language: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="বাংলা">বাংলা</SelectItem>
              <SelectItem value="আরবি">আরবি</SelectItem>
              <SelectItem value="ইংরেজি">ইংরেজি</SelectItem>
              <SelectItem value="উর্দু">উর্দু</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="totalCopies">মোট কপি</Label>
          <Input
            id="totalCopies"
            type="number"
            value={formData.totalCopies}
            onChange={(e) => {
              const total = parseInt(e.target.value);
              setFormData({...formData, totalCopies: total, availableCopies: total});
            }}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="publishedYear">প্রকাশের বছর</Label>
          <Input
            id="publishedYear"
            type="number"
            value={formData.publishedYear}
            onChange={(e) => setFormData({...formData, publishedYear: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">অবস্থান</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            placeholder="যেমন: শেলফ A1"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="isbn">ISBN (ঐচ্ছিক)</Label>
        <Input
          id="isbn"
          value={formData.isbn}
          onChange={(e) => setFormData({...formData, isbn: e.target.value})}
          placeholder="978-984-123-456-7"
        />
      </div>

      <DialogFooter>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          বই যোগ করুন
        </Button>
      </DialogFooter>
    </form>
  );
}

function IssueForm({ 
  books, 
  onSubmit 
}: { 
  books: Book[];
  onSubmit: (data: Omit<LibraryIssue, 'id' | 'createdAt'>) => void;
}) {
  const [formData, setFormData] = useState({
    bookId: '',
    bookTitle: '',
    studentId: '',
    studentName: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'issued' as const,
    fine: 0
  });

  const availableBooks = books.filter(book => book.availableCopies > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleBookSelect = (bookId: string) => {
    const selectedBook = books.find(book => book.id === bookId);
    if (selectedBook) {
      setFormData({
        ...formData,
        bookId,
        bookTitle: selectedBook.title
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bookId">বই নির্বাচন</Label>
        <Select value={formData.bookId} onValueChange={handleBookSelect}>
          <SelectTrigger>
            <SelectValue placeholder="বই নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {availableBooks.map((book) => (
              <SelectItem key={book.id} value={book.id}>
                {book.title} - {book.author} (উপলব্ধ: {book.availableCopies})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="studentId">শিক্ষার্থী ID</Label>
          <Input
            id="studentId"
            value={formData.studentId}
            onChange={(e) => setFormData({...formData, studentId: e.target.value})}
            placeholder="STD001"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentName">শিক্ষার্থীর নাম</Label>
          <Input
            id="studentName"
            value={formData.studentName}
            onChange={(e) => setFormData({...formData, studentName: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="issueDate">ইস্যুর তারিখ</Label>
          <Input
            id="issueDate"
            type="date"
            value={formData.issueDate}
            onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDate">ফেরতের তারিখ</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
            required
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          ইস্যু করুন
        </Button>
      </DialogFooter>
    </form>
  );
}
