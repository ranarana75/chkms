import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
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
  FileText,
  RefreshCw,
  Activity,
  Target,
  TrendingUp
} from "lucide-react";
import { useLocalData, useNotifications, useSearch, usePagination } from "@/hooks/useLocalData";
import { libraryIssuesDB, LocalDB, STORAGE_KEYS } from "@shared/localDatabase";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  language: "bangla" | "arabic" | "english" | "urdu";
  totalCopies: number;
  availableCopies: number;
  issuedCopies: number;
  publisher?: string;
  publishYear?: number;
  shelfLocation?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
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
  status: "issued" | "returned" | "overdue";
  issuedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface LibraryStats {
  totalBooks: number;
  totalStudents: number;
  booksIssued: number;
  overdueBooks: number;
  totalFines: number;
  popularBooks: number;
  lastUpdated: Date;
}

// Create books database
const booksDB = new LocalDB<Book>('chkms_books');

const LibraryDashboard: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [libraryStats, setLibraryStats] = useState<LibraryStats>({
    totalBooks: 0,
    totalStudents: 0,
    booksIssued: 0,
    overdueBooks: 0,
    totalFines: 0,
    popularBooks: 0,
    lastUpdated: new Date(),
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isIssueBookOpen, setIsIssueBookOpen] = useState(false);
  const [isReturnBookOpen, setIsReturnBookOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    language: "",
    totalCopies: "",
    publisher: "",
    publishYear: "",
    shelfLocation: "",
    description: "",
  });
  const [issueBook, setIssueBook] = useState({
    bookId: "",
    studentId: "",
    studentName: "",
    dueDays: "30",
  });
  const [returnBook, setReturnBook] = useState({
    issueId: "",
    fine: "",
    condition: "",
  });

  const { data: books, loading: booksLoading, addItem: addBook, updateItem: updateBook, refresh: refreshBooks } = useLocalData(booksDB);
  const { data: issues, loading: issuesLoading, addItem: addIssue, updateItem: updateIssue, refresh: refreshIssues } = useLocalData(libraryIssuesDB);
  const { addNotification } = useNotifications();

  // Search functionality
  const { filteredData: filteredBooks, resultCount } = useSearch(
    books,
    ["title", "author", "isbn"],
    searchTerm,
    selectedCategory !== "all" ? { category: selectedCategory } : {}
  );

  // Pagination
  const { 
    currentPage, 
    totalPages, 
    paginatedData: paginatedBooks, 
    goToPage, 
    nextPage, 
    prevPage 
  } = usePagination(filteredBooks, 10);

  useEffect(() => {
    initializeSampleData();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [books, issues]);

  const initializeSampleData = () => {
    // Initialize sample books
    if (books.length === 0) {
      const sampleBooks: Book[] = [
        {
          id: "1",
          title: "তাফসীরে ইবনে কাসীর",
          author: "ইমাম ইবনে কাসীর",
          isbn: "978-984-123-456-7",
          category: "islamic",
          language: "bangla",
          totalCopies: 10,
          availableCopies: 7,
          issuedCopies: 3,
          publisher: "ইসলামিক ফাউন্ডেশন",
          publishYear: 2020,
          shelfLocation: "A-01",
          description: "পবিত্র কুরআনের সর্বোত্তম তাফসীর গ্রন্থ",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "সহীহ বুখারী",
          author: "ইমাম বুখারী",
          isbn: "978-984-123-457-8",
          category: "hadith",
          language: "arabic",
          totalCopies: 15,
          availableCopies: 12,
          issuedCopies: 3,
          publisher: "দারুস সালাম",
          publishYear: 2019,
          shelfLocation: "B-02",
          description: "হাদিসের সবচেয়ে নির্ভরযোগ্য গ্রন্থ",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "বাংলা ব্যাকরণ",
          author: "ড. মুহাম্মদ শহীদুল্লাহ",
          isbn: "978-984-123-458-9",
          category: "academic",
          language: "bangla",
          totalCopies: 20,
          availableCopies: 15,
          issuedCopies: 5,
          publisher: "বাংলা একাডেমি",
          publishYear: 2018,
          shelfLocation: "C-03",
          description: "বাংলা ভাষার ব্যাকরণ শিক্ষার জন্য অপরিহার্য গ্রন্থ",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "4",
          title: "আরবি ব্যাকরণ",
          author: "আল্লামা যামাখশারী",
          isbn: "978-984-123-459-0",
          category: "arabic",
          language: "arabic",
          totalCopies: 12,
          availableCopies: 9,
          issuedCopies: 3,
          publisher: "মাকতাবা আল-আজহার",
          publishYear: 2021,
          shelfLocation: "D-04",
          description: "আরবি ব্যাকরণ শিক্ষার মৌলিক গ্রন্থ",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];

      sampleBooks.forEach(book => booksDB.add(book));
    }

    // Initialize sample issues
    if (issues.length === 0) {
      const sampleIssues: LibraryIssue[] = [
        {
          id: "1",
          bookId: "1",
          bookTitle: "তাফসীরে ইবনে কাসীর",
          studentId: "STD001",
          studentName: "মোহাম্মদ আব্দুল্লাহ",
          issueDate: "2024-11-15",
          dueDate: "2024-12-15",
          status: "issued",
          issuedBy: "librarian-001",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          bookId: "2",
          bookTitle: "সহীহ বুখারী",
          studentId: "STD002",
          studentName: "ফাতিমা খাতুন",
          issueDate: "2024-11-10",
          dueDate: "2024-12-10",
          status: "overdue",
          fine: 50,
          issuedBy: "librarian-001",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          bookId: "3",
          bookTitle: "বাংলা ব্যাকরণ",
          studentId: "STD003",
          studentName: "আবু বকর সিদ্দিক",
          issueDate: "2024-11-20",
          dueDate: "2024-12-20",
          returnDate: "2024-12-05",
          status: "returned",
          issuedBy: "librarian-001",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];

      sampleIssues.forEach(issue => libraryIssuesDB.add(issue));
    }
  };

  const calculateStats = () => {
    const totalBooks = books.length;
    const booksIssued = issues.filter((issue: LibraryIssue) => issue.status === "issued").length;
    const overdueBooks = issues.filter((issue: LibraryIssue) => issue.status === "overdue").length;
    const totalFines = issues.reduce((sum: number, issue: LibraryIssue) => sum + (issue.fine || 0), 0);
    
    // Calculate unique students who have borrowed books
    const uniqueStudents = new Set(issues.map((issue: LibraryIssue) => issue.studentId)).size;
    
    // Calculate popular books (books with more than 2 issues)
    const bookIssueCount: Record<string, number> = {};
    issues.forEach((issue: LibraryIssue) => {
      bookIssueCount[issue.bookId] = (bookIssueCount[issue.bookId] || 0) + 1;
    });
    const popularBooks = Object.values(bookIssueCount).filter(count => count > 2).length;

    setLibraryStats({
      totalBooks,
      totalStudents: uniqueStudents,
      booksIssued,
      overdueBooks,
      totalFines,
      popularBooks,
      lastUpdated: new Date(),
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refreshBooks(), refreshIssues()]);
    calculateStats();
    addNotification("success", "ডেটা আপডেট", "লাইব্রেরির তথ্য সফলভাবে আপডেট হয়েছে");
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author || !newBook.category || !newBook.language || !newBook.totalCopies) {
      addNotification("error", "ত্রুটি", "সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন");
      return;
    }

    try {
      const book: Book = {
        id: Date.now().toString(),
        title: newBook.title,
        author: newBook.author,
        isbn: newBook.isbn || `ISBN-${Date.now()}`,
        category: newBook.category,
        language: newBook.language as any,
        totalCopies: parseInt(newBook.totalCopies),
        availableCopies: parseInt(newBook.totalCopies),
        issuedCopies: 0,
        publisher: newBook.publisher,
        publishYear: newBook.publishYear ? parseInt(newBook.publishYear) : undefined,
        shelfLocation: newBook.shelfLocation,
        description: newBook.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const success = await addBook(book);
      if (success) {
        setIsAddBookOpen(false);
        setNewBook({
          title: "",
          author: "",
          isbn: "",
          category: "",
          language: "",
          totalCopies: "",
          publisher: "",
          publishYear: "",
          shelfLocation: "",
          description: "",
        });
        addNotification("success", "বই যোগ", "নতুন বই সফলভাবে যোগ করা হয়েছে");
      }
    } catch (error) {
      addNotification("error", "ত্রুটি", "বই যোগ করতে সমস্যা হয়েছে");
    }
  };

  const handleIssueBook = async () => {
    if (!issueBook.bookId || !issueBook.studentId || !issueBook.studentName) {
      addNotification("error", "ত্রুটি", "সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন");
      return;
    }

    try {
      const selectedBook = books.find((book: Book) => book.id === issueBook.bookId);
      if (!selectedBook || selectedBook.availableCopies <= 0) {
        addNotification("error", "ত্রুটি", "বইটি বর্তমানে উপলব্ধ নেই");
        return;
      }

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + parseInt(issueBook.dueDays));

      const issue: LibraryIssue = {
        id: Date.now().toString(),
        bookId: issueBook.bookId,
        bookTitle: selectedBook.title,
        studentId: issueBook.studentId,
        studentName: issueBook.studentName,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        status: "issued",
        issuedBy: "librarian-001",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const issueSuccess = await addIssue(issue);
      if (issueSuccess) {
        // Update book availability
        const updatedBook = {
          ...selectedBook,
          availableCopies: selectedBook.availableCopies - 1,
          issuedCopies: selectedBook.issuedCopies + 1,
          updatedAt: new Date().toISOString(),
        };
        await updateBook(selectedBook.id, updatedBook);

        setIsIssueBookOpen(false);
        setIssueBook({
          bookId: "",
          studentId: "",
          studentName: "",
          dueDays: "30",
        });
        addNotification("success", "বই ইস্যু", "বই সফলভাবে ইস্যু করা হয়েছে");
      }
    } catch (error) {
      addNotification("error", "ত্রুটি", "বই ইস্যু করতে সমস্যা হয়েছে");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "issued":
        return "bg-blue-100 text-blue-800";
      case "returned":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "issued":
        return "ইস্যুকৃত";
      case "returned":
        return "ফেরত";
      case "overdue":
        return "বিলম্বিত";
      default:
        return status;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case "islamic":
        return "ইসলামিক";
      case "hadith":
        return "হাদিস";
      case "academic":
        return "��কাডেমিক";
      case "literature":
        return "সাহিত্য";
      case "science":
        return "বিজ্ঞান";
      case "arabic":
        return "��রবি";
      default:
        return category;
    }
  };

  const getLanguageText = (language: string) => {
    switch (language) {
      case "bangla":
        return "বাংলা";
      case "arabic":
        return "আরবি";
      case "english":
        return "ইংরেজি";
      case "urdu":
        return "উর্দু";
      default:
        return language;
    }
  };

  // Calculate most popular books
  const popularBooks = React.useMemo(() => {
    const bookStats: Record<string, { book: Book; issueCount: number }> = {};
    
    issues.forEach((issue: LibraryIssue) => {
      const book = books.find((b: Book) => b.id === issue.bookId);
      if (book) {
        if (!bookStats[book.id]) {
          bookStats[book.id] = { book, issueCount: 0 };
        }
        bookStats[book.id].issueCount++;
      }
    });
    
    return Object.values(bookStats)
      .sort((a, b) => b.issueCount - a.issueCount)
      .slice(0, 5);
  }, [books, issues]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              লাইব্রেরি ব্যবস্থাপনা
            </h1>
            <p className="text-gray-600 mt-1">
              বই ক্যাটালগ এবং ইস্যু-রিটার্ন ব্যবস্থাপনা
            </p>
            <p className="text-sm text-gray-500 mt-1">
              শেষ আপডেট: {libraryStats.lastUpdated.toLocaleString('bn-BD')}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              রিফ্রেশ
            </Button>
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
                    <Select
                      value={issueBook.bookId}
                      onValueChange={(value) =>
                        setIssueBook({ ...issueBook, bookId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="বই নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {books
                          .filter((book: Book) => book.availableCopies > 0)
                          .map((book: Book) => (
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
                      onChange={(e) =>
                        setIssueBook({
                          ...issueBook,
                          studentId: e.target.value,
                        })
                      }
                      placeholder="STD001"
                    />
                  </div>
                  <div>
                    <Label htmlFor="issueStudentName">শিক্ষার্থীর নাম</Label>
                    <Input
                      id="issueStudentName"
                      value={issueBook.studentName}
                      onChange={(e) =>
                        setIssueBook({
                          ...issueBook,
                          studentName: e.target.value,
                        })
                      }
                      placeholder="শিক্ষার্থীর নাম"
                    />
                  </div>
                  <div>
                    <Label htmlFor="issueDueDays">ফেরত দেওয়ার সময়সীমা (দিন)</Label>
                    <Select
                      value={issueBook.dueDays}
                      onValueChange={(value) =>
                        setIssueBook({ ...issueBook, dueDays: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="সময়সীমা নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">৭ দিন</SelectItem>
                        <SelectItem value="15">১৫ দিন</SelectItem>
                        <SelectItem value="30">৩০ দিন</SelectItem>
                        <SelectItem value="60">৬০ দিন</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={handleIssueBook}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
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
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>নতুন বই যোগ করুন</DialogTitle>
                  <DialogDescription>
                    লাইব্রেরিতে নতুন বইয়ের তথ্য প্রদান করুন
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bookTitle">বইয়ের নাম</Label>
                      <Input
                        id="bookTitle"
                        value={newBook.title}
                        onChange={(e) =>
                          setNewBook({ ...newBook, title: e.target.value })
                        }
                        placeholder="বইয়ের নাম"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bookAuthor">লেখক</Label>
                      <Input
                        id="bookAuthor"
                        value={newBook.author}
                        onChange={(e) =>
                          setNewBook({ ...newBook, author: e.target.value })
                        }
                        placeholder="লেখকের নাম"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bookIsbn">ISBN</Label>
                      <Input
                        id="bookIsbn"
                        value={newBook.isbn}
                        onChange={(e) =>
                          setNewBook({ ...newBook, isbn: e.target.value })
                        }
                        placeholder="978-984-123-456-7"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bookPublisher">প্রকাশক</Label>
                      <Input
                        id="bookPublisher"
                        value={newBook.publisher}
                        onChange={(e) =>
                          setNewBook({ ...newBook, publisher: e.target.value })
                        }
                        placeholder="প্রকাশকের নাম"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="bookCategory">বিভাগ</Label>
                      <Select
                        value={newBook.category}
                        onValueChange={(value) =>
                          setNewBook({ ...newBook, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="islamic">ইসলামিক</SelectItem>
                          <SelectItem value="hadith">হাদিস</SelectItem>
                          <SelectItem value="academic">একাডেমিক</SelectItem>
                          <SelectItem value="literature">সাহিত্য</SelectItem>
                          <SelectItem value="science">বিজ্ঞান</SelectItem>
                          <SelectItem value="arabic">আরবি</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bookLanguage">ভাষা</Label>
                      <Select
                        value={newBook.language}
                        onValueChange={(value) =>
                          setNewBook({ ...newBook, language: value })
                        }
                      >
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
                    <div>
                      <Label htmlFor="bookCopies">কপি সংখ্যা</Label>
                      <Input
                        id="bookCopies"
                        type="number"
                        value={newBook.totalCopies}
                        onChange={(e) =>
                          setNewBook({ ...newBook, totalCopies: e.target.value })
                        }
                        placeholder="১০"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bookYear">প্রকাশনা বছর</Label>
                      <Input
                        id="bookYear"
                        type="number"
                        value={newBook.publishYear}
                        onChange={(e) =>
                          setNewBook({ ...newBook, publishYear: e.target.value })
                        }
                        placeholder="২০২৪"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bookShelf">তাক অবস্থান</Label>
                      <Input
                        id="bookShelf"
                        value={newBook.shelfLocation}
                        onChange={(e) =>
                          setNewBook({ ...newBook, shelfLocation: e.target.value })
                        }
                        placeholder="A-01"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bookDescription">বিবরণ</Label>
                    <Textarea
                      id="bookDescription"
                      value={newBook.description}
                      onChange={(e) =>
                        setNewBook({ ...newBook, description: e.target.value })
                      }
                      placeholder="বইয়ের বিস্তারিত বিবরণ"
                      rows={3}
                    />
                  </div>
                  <Button
                    onClick={handleAddBook}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
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
                  <p className="text-2xl font-bold text-gray-900">
                    {booksLoading ? (
                      <Activity className="h-6 w-6 animate-spin" />
                    ) : (
                      libraryStats.totalBooks
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    নিবন্ধিত পাঠক
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {libraryStats.totalStudents}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    ইস্যুকৃত বই
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {libraryStats.booksIssued}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    বিলম্বিত বই
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {libraryStats.overdueBooks}
                  </p>
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
                  <p className="text-2xl font-bold text-gray-900">
                    ৳{libraryStats.totalFines}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    জনপ্রিয় বই
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {libraryStats.popularBooks}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>বই অনুসন্ধান</CardTitle>
            <CardDescription>
              {resultCount} টি বই পাওয়া গেছে
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 mb-4">
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
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
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
                  <SelectItem value="arabic">আরবি</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Books Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>বইয়ের তালিকা</CardTitle>
                <CardDescription>
                  পৃষ্ঠা {currentPage} এর {totalPages} ({resultCount} টি বই)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {booksLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Activity className="h-8 w-8 animate-spin text-islamic-green" />
                    <span className="ml-2">লোড হচ্ছে...</span>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">বইয়ের নাম</th>
                            <th className="text-left p-2">লেখক</th>
                            <th className="text-left p-2">বিভাগ</th>
                            <th className="text-left p-2">ভাষা</th>
                            <th className="text-left p-2">উপলব্ধ</th>
                            <th className="text-left p-2">কার্যক্রম</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedBooks.map((book: Book) => (
                            <tr key={book.id} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-medium">{book.title}</td>
                              <td className="p-2">{book.author}</td>
                              <td className="p-2">{getCategoryText(book.category)}</td>
                              <td className="p-2">{getLanguageText(book.language)}</td>
                              <td className="p-2">
                                <Badge
                                  className={
                                    book.availableCopies > 0
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }
                                >
                                  {book.availableCopies}/{book.totalCopies}
                                </Badge>
                              </td>
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
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-between items-center mt-4">
                        <Button 
                          variant="outline" 
                          onClick={prevPage} 
                          disabled={currentPage === 1}
                        >
                          পূর্ববর্তী
                        </Button>
                        <span className="text-sm text-gray-600">
                          পৃষ্ঠা {currentPage} এর {totalPages}
                        </span>
                        <Button 
                          variant="outline" 
                          onClick={nextPage} 
                          disabled={currentPage === totalPages}
                        >
                          পরবর্তী
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Books */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <span>জনপ্রিয় বই</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularBooks.map(({ book, issueCount }, index) => (
                    <div key={book.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{book.title}</p>
                        <p className="text-xs text-gray-500">{book.author}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {issueCount} বার
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Issues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>সাম্প্রতিক ইস্যু</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {issuesLoading ? (
                  <div className="flex justify-center items-center py-4">
                    <Activity className="h-6 w-6 animate-spin text-islamic-green" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {issues.slice(0, 5).map((issue: LibraryIssue) => (
                      <div key={issue.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium text-sm">{issue.bookTitle}</p>
                          <Badge className={getStatusColor(issue.status)} variant="outline">
                            {getStatusText(issue.status)}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">{issue.studentName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(issue.issueDate).toLocaleDateString("bn-BD")}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryDashboard;
