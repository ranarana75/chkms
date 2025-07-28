import { RequestHandler } from "express";

// Mock financial data
const mockFinancialData = {
  overview: {
    totalRevenue: 1245000,
    monthlyRevenue: 125000,
    totalExpenses: 890000,
    monthlyExpenses: 89000,
    totalStudents: 1247,
    feeCollectionRate: 85.5,
    pendingFees: 235000,
    profit: 355000
  },
  recentTransactions: [
    {
      id: "TXN001",
      type: "income",
      description: "টিউশন ফি - আলিম প্রথম বর্ষ",
      amount: 5000,
      date: "২০২৪-১২-১৫",
      studentId: "STD001",
      method: "বিকাশ",
      status: "completed"
    },
    {
      id: "TXN002", 
      type: "expense",
      description: "শিক্ষক বেতন - নভেম্বর",
      amount: 45000,
      date: "২০২৪-১২-১৪",
      category: "salary",
      method: "ব্যাংক",
      status: "completed"
    },
    {
      id: "TXN003",
      type: "income", 
      description: "লাইব্রেরি ফি",
      amount: 500,
      date: "২০২৪-১২-১৩",
      studentId: "STD002",
      method: "নগদ",
      status: "completed"
    }
  ],
  monthlyStats: [
    { month: "জানুয়ারি", income: 120000, expense: 85000 },
    { month: "ফেব্রুয়ারি", income: 125000, expense: 87000 },
    { month: "মার্চ", income: 130000, expense: 89000 },
    { month: "এপ্রিল", income: 128000, expense: 88000 },
    { month: "মে", income: 135000, expense: 90000 },
    { month: "জুন", income: 132000, expense: 91000 }
  ],
  feeCategories: [
    { name: "টিউশন ফি", budgeted: 800000, collected: 720000, pending: 80000 },
    { name: "লাইব্রেরি ফি", budgeted: 50000, collected: 45000, pending: 5000 },
    { name: "পরীক্ষার ফি", budgeted: 150000, collected: 120000, pending: 30000 },
    { name: "ক্রীড়া ফি", budgeted: 30000, collected: 25000, pending: 5000 }
  ]
};

export const getFinancialOverview: RequestHandler = (req, res) => {
  res.json({
    success: true,
    overview: mockFinancialData.overview
  });
};

export const getFinancialTransactions: RequestHandler = (req, res) => {
  const { page = 1, limit = 10, type, startDate, endDate } = req.query;
  
  let transactions = [...mockFinancialData.recentTransactions];
  
  // Filter by type
  if (type && type !== 'all') {
    transactions = transactions.filter(t => t.type === type);
  }
  
  // Filter by date range
  if (startDate || endDate) {
    // Mock date filtering
    transactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      if (startDate && transactionDate < new Date(startDate as string)) return false;
      if (endDate && transactionDate > new Date(endDate as string)) return false;
      return true;
    });
  }
  
  const startIndex = ((page as number) - 1) * (limit as number);
  const endIndex = startIndex + (limit as number);
  const paginatedTransactions = transactions.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    transactions: paginatedTransactions,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: transactions.length,
      totalPages: Math.ceil(transactions.length / (limit as number))
    }
  });
};

export const createTransaction: RequestHandler = (req, res) => {
  const { type, description, amount, category, method, studentId } = req.body;
  
  const newTransaction = {
    id: `TXN${Date.now()}`,
    type,
    description,
    amount: Number(amount),
    date: new Date().toISOString().split('T')[0],
    category,
    method,
    studentId,
    status: "completed"
  };
  
  res.json({
    success: true,
    message: "লেনদেন সফলভাবে রেকর্ড করা হয়েছে",
    transaction: newTransaction
  });
};

export const getStudentFeeStatus: RequestHandler = (req, res) => {
  const studentId = req.params.studentId;
  
  const feeStatus = {
    studentId,
    fees: [
      {
        type: "টিউশন ফি",
        amount: 5000,
        dueDate: "২০২৪-১২-৩১",
        status: "paid",
        paidDate: "২০২৪-১১-২৫",
        transactionId: "TXN123456"
      },
      {
        type: "পরীক্ষার ফি", 
        amount: 1500,
        dueDate: "২০২৪-১২-৩১",
        status: "pending"
      }
    ],
    summary: {
      totalPaid: 5000,
      totalDue: 1500,
      total: 6500
    }
  };
  
  res.json({
    success: true,
    ...feeStatus
  });
};

export const processFeePayment: RequestHandler = (req, res) => {
  const { studentId, amount, paymentMethod, transactionId, feeType } = req.body;
  
  res.json({
    success: true,
    message: "ফি পেমেন্ট সফলভাবে সম্পন্ন হয়েছে",
    payment: {
      studentId,
      amount,
      paymentMethod,
      transactionId: transactionId || `TXN${Date.now()}`,
      feeType,
      paidAt: new Date().toISOString(),
      receipt: {
        receiptNumber: `RCP${Date.now()}`,
        studentName: "মোহাম্মদ আবদুল্লাহ",
        amount,
        date: new Date().toLocaleDateString('bn-BD'),
        method: paymentMethod
      }
    }
  });
};

export const getExpenseCategories: RequestHandler = (req, res) => {
  const categories = [
    { name: "শিক্ষক বেতন", budgeted: 540000, spent: 495000, percentage: 91.7 },
    { name: "কর্মচারী বেতন", budgeted: 180000, spent: 165000, percentage: 91.7 },
    { name: "ইউটিলিটি বিল", budgeted: 60000, spent: 55000, percentage: 91.7 },
    { name: "রক্ষণাবেক্ষণ", budgeted: 48000, spent: 42000, percentage: 87.5 },
    { name: "শিক্ষা সামগ্রী", budgeted: 36000, spent: 32000, percentage: 88.9 },
    { name: "অন্যান্য", budgeted: 26000, spent: 21000, percentage: 80.8 }
  ];
  
  res.json({
    success: true,
    categories
  });
};

export const generateFinancialReport: RequestHandler = (req, res) => {
  const { reportType, startDate, endDate, format = 'pdf' } = req.query;
  
  res.json({
    success: true,
    message: "রিপোর্ট তৈরি করা হচ্ছে",
    report: {
      id: `RPT${Date.now()}`,
      type: reportType,
      period: `${startDate} থেকে ${endDate}`,
      format,
      downloadUrl: `/api/finance/reports/RPT${Date.now()}.${format}`,
      createdAt: new Date().toISOString(),
      expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    }
  });
};

export const getDashboardStats: RequestHandler = (req, res) => {
  res.json({
    success: true,
    stats: {
      ...mockFinancialData.overview,
      monthlyStats: mockFinancialData.monthlyStats,
      feeCategories: mockFinancialData.feeCategories,
      recentTransactions: mockFinancialData.recentTransactions.slice(0, 5)
    }
  });
};
