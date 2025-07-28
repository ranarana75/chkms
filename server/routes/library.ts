import { RequestHandler } from "express";

// Mock library data
const mockBooks = [
  {
    id: "BK001",
    title: "তাফসীরে ইবনে কাসীর",
    author: "ইমাম ইবনে কাসীর",
    isbn: "978-984-123456-7",
    category: "তাফসীর",
    language: "bangla",
    totalCopies: 10,
    availableCopies: 7,
    publisher: "ইসলামিক ফাউন্ডেশন",
    publishYear: "২০২০",
    shelf: "A-101",
    description: "কুরআনের বিস্তারিত তাফসীর"
  },
  {
    id: "BK002",
    title: "সহীহ বুখারী",
    author: "ইমাম বুখারী",
    isbn: "978-984-123456-8",
    category: "হাদিস",
    language: "arabic",
    totalCopies: 15,
    availableCopies: 12,
    publisher: "দারুল ���ুতুব",
    publishYear: "২০১৯",
    shelf: "B-205",
    description: "হাদিসের সবচেয়ে বিশুদ্ধ সংকলন"
  },
  {
    id: "BK003",
    title: "আরবি ব্যাকরণ",
    author: "ড. মুহাম্মদ আব্দুল্লাহ",
    isbn: "978-984-123456-9",
    category: "আরবি সাহিত্য",
    language: "bangla",
    totalCopies: 20,
    availableCopies: 18,
    publisher: "একাডেমিক প্রেস",
    publishYear: "২০২১",
    shelf: "C-301",
    description: "আরবি ভাষার বিস্তারিত ব্যাকরণ"
  }
];

const mockIssues = [
  {
    id: "ISU001",
    bookId: "BK001",
    studentId: "STD001",
    studentName: "মোহাম্মদ আবদুল্লাহ",
    bookTitle: "তাফসীরে ইবনে কাসীর",
    issueDate: "২০২৪-১২-০১",
    dueDate: "২০২৪-১২-১৫",
    returnDate: null,
    fine: 0,
    status: "issued"
  },
  {
    id: "ISU002",
    bookId: "BK002",
    studentId: "STD002",
    studentName: "আবুল কাসেম",
    bookTitle: "সহীহ বুখারী",
    issueDate: "২০২৪-১১-২৮",
    dueDate: "২০২৪-১২-১২",
    returnDate: "২০২৪-১২-১০",
    fine: 0,
    status: "returned"
  }
];

export const getLibraryDashboard: RequestHandler = (req, res) => {
  const totalBooks = mockBooks.reduce((sum, book) => sum + book.totalCopies, 0);
  const availableBooks = mockBooks.reduce((sum, book) => sum + book.availableCopies, 0);
  const issuedBooks = totalBooks - availableBooks;
  const overdueBooks = mockIssues.filter(issue => 
    issue.status === 'issued' && 
    new Date(issue.dueDate) < new Date()
  ).length;

  res.json({
    success: true,
    dashboard: {
      totalBooks,
      availableBooks,
      issuedBooks,
      overdueBooks,
      totalMembers: 1247,
      categories: ["তাফসীর", "হাদিস", "ফিকহ", "আরবি সাহিত্য", "বাংলা", "ইংরেজি"],
      recentIssues: mockIssues.slice(0, 5),
      popularBooks: mockBooks.slice(0, 3)
    }
  });
};

export const getBooks: RequestHandler = (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    search, 
    category, 
    language, 
    availability 
  } = req.query;

  let filteredBooks = [...mockBooks];

  // Search filter
  if (search) {
    const searchTerm = (search as string).toLowerCase();
    filteredBooks = filteredBooks.filter(book => 
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.isbn.includes(searchTerm)
    );
  }

  // Category filter
  if (category && category !== 'all') {
    filteredBooks = filteredBooks.filter(book => book.category === category);
  }

  // Language filter
  if (language && language !== 'all') {
    filteredBooks = filteredBooks.filter(book => book.language === language);
  }

  // Availability filter
  if (availability === 'available') {
    filteredBooks = filteredBooks.filter(book => book.availableCopies > 0);
  } else if (availability === 'unavailable') {
    filteredBooks = filteredBooks.filter(book => book.availableCopies === 0);
  }

  const startIndex = ((page as number) - 1) * (limit as number);
  const endIndex = startIndex + (limit as number);
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  res.json({
    success: true,
    books: paginatedBooks,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: filteredBooks.length,
      totalPages: Math.ceil(filteredBooks.length / (limit as number))
    }
  });
};

export const getBookDetails: RequestHandler = (req, res) => {
  const bookId = req.params.bookId;
  const book = mockBooks.find(b => b.id === bookId);
  
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "বইটি পাওয়া যায়নি"
    });
  }

  const bookIssues = mockIssues.filter(issue => issue.bookId === bookId);

  res.json({
    success: true,
    book: {
      ...book,
      issueHistory: bookIssues,
      currentlyIssued: bookIssues.filter(issue => issue.status === 'issued').length
    }
  });
};

export const issueBook: RequestHandler = (req, res) => {
  const { bookId, studentId, dueDate } = req.body;
  
  const book = mockBooks.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "বইটি পাওয়া যায়নি"
    });
  }

  if (book.availableCopies <= 0) {
    return res.status(400).json({
      success: false,
      message: "এই বইটি বর্তমানে উপলব্ধ নেই"
    });
  }

  const newIssue = {
    id: `ISU${Date.now()}`,
    bookId,
    studentId,
    studentName: "শিক্ষার্থী নাম", // This should come from student lookup
    bookTitle: book.title,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate,
    returnDate: null,
    fine: 0,
    status: "issued"
  };

  // Update available copies
  book.availableCopies -= 1;

  res.json({
    success: true,
    message: "বইটি সফলভাবে ইস্যু করা হয়েছে",
    issue: newIssue
  });
};

export const returnBook: RequestHandler = (req, res) => {
  const { issueId, returnDate, condition } = req.body;
  
  const issue = mockIssues.find(i => i.id === issueId);
  if (!issue) {
    return res.status(404).json({
      success: false,
      message: "ইস্যুর রেকর্ড পাওয়া যায়নি"
    });
  }

  const book = mockBooks.find(b => b.id === issue.bookId);
  if (book) {
    book.availableCopies += 1;
  }

  // Calculate fine if overdue
  const dueDate = new Date(issue.dueDate);
  const actualReturnDate = new Date(returnDate);
  let fine = 0;
  
  if (actualReturnDate > dueDate) {
    const overdueDays = Math.ceil((actualReturnDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
    fine = overdueDays * 5; // 5 taka per day fine
  }

  issue.returnDate = returnDate;
  issue.fine = fine;
  issue.status = "returned";

  res.json({
    success: true,
    message: "বইটি সফলভাবে ফেরত নেওয়া হয়েছে",
    return: {
      issueId,
      returnDate,
      fine,
      condition
    }
  });
};

export const getIssuedBooks: RequestHandler = (req, res) => {
  const { studentId, status = 'all' } = req.query;
  
  let filteredIssues = [...mockIssues];
  
  if (studentId) {
    filteredIssues = filteredIssues.filter(issue => issue.studentId === studentId);
  }
  
  if (status !== 'all') {
    filteredIssues = filteredIssues.filter(issue => issue.status === status);
  }

  res.json({
    success: true,
    issues: filteredIssues
  });
};

export const addNewBook: RequestHandler = (req, res) => {
  const { 
    title, 
    author, 
    isbn, 
    category, 
    language, 
    totalCopies, 
    publisher, 
    publishYear, 
    shelf,
    description 
  } = req.body;

  const newBook = {
    id: `BK${Date.now()}`,
    title,
    author,
    isbn,
    category,
    language,
    totalCopies: Number(totalCopies),
    availableCopies: Number(totalCopies),
    publisher,
    publishYear,
    shelf,
    description
  };

  mockBooks.push(newBook);

  res.json({
    success: true,
    message: "নতুন বই সফলভাবে যোগ করা হয়েছে",
    book: newBook
  });
};

export const getOverdueBooks: RequestHandler = (req, res) => {
  const currentDate = new Date();
  const overdueIssues = mockIssues.filter(issue => 
    issue.status === 'issued' && 
    new Date(issue.dueDate) < currentDate
  );

  const overdueWithFines = overdueIssues.map(issue => {
    const dueDate = new Date(issue.dueDate);
    const overdueDays = Math.ceil((currentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
    const fine = overdueDays * 5; // 5 taka per day

    return {
      ...issue,
      overdueDays,
      calculatedFine: fine
    };
  });

  res.json({
    success: true,
    overdueBooks: overdueWithFines,
    totalFine: overdueWithFines.reduce((sum, issue) => sum + issue.calculatedFine, 0)
  });
};

export const getLibraryReports: RequestHandler = (req, res) => {
  const { reportType, startDate, endDate } = req.query;
  
  res.json({
    success: true,
    message: "রিপোর্ট তৈরি করা হচ্ছে",
    report: {
      id: `LIB_RPT${Date.now()}`,
      type: reportType,
      period: `${startDate} থেকে ${endDate}`,
      downloadUrl: `/api/library/reports/LIB_RPT${Date.now()}.pdf`,
      createdAt: new Date().toISOString()
    }
  });
};
