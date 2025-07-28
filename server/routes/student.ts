import { RequestHandler } from "express";
import { StudentDashboardResponse } from "@shared/api";

// Mock student data
const mockStudentData = {
  "STD001": {
    studentInfo: {
      name: "মোহাম্মদ আবদুল্লাহ",
      id: "STD001", 
      class: "আলিম প্রথম বর্ষ",
      section: "ক",
      roll: "০৫",
      photo: "/placeholder.svg"
    },
    attendance: {
      present: 85,
      total: 90,
      percentage: 94.4
    },
    recentMarks: [
      { subject: "আরবি সাহিত্য", marks: 85, total: 100, examType: "মাসিক পরীক্ষা", date: "২০২৪-১১-১৫" },
      { subject: "ইসলামিক স্টাডিজ", marks: 92, total: 100, examType: "মাসিক পরীক্ষা", date: "২০২৪-১১-১২" },
      { subject: "���াংলা", marks: 78, total: 100, examType: "সাপ্তাহিক পরীক্ষা", date: "২০২৪-১১-১০" },
      { subject: "গণিত", marks: 88, total: 100, examType: "মাসিক পরীক্ষা", date: "২০২৪-১১-০৮" }
    ],
    hifzProgress: {
      completed: 15,
      total: 30,
      currentSurah: "সূরা আল-বাকারা",
      lastCompleted: "সূরা আল-ফাতিহা"
    },
    feeStatus: {
      paid: 8500,
      due: 1500,
      total: 10000,
      dueDate: "২০২৪-১২-৩১"
    },
    upcomingEvents: [
      { title: "মাসিক পরীক্ষা", date: "১৫ ডিসেম্বর", type: "পরীক্ষা" },
      { title: "জুমার খুতবা", date: "১৮ ডিসেম্বর", type: "ইবাদত" },
      { title: "বার্ষিক ক্রীড়া প্রতিযোগিতা", date: "২২ ডিসেম্বর", type: "অনুষ্ঠান" }
    ]
  }
};

export const getStudentDashboard: RequestHandler = (req, res) => {
  const studentId = req.params.studentId || "STD001";
  
  const studentData = mockStudentData[studentId as keyof typeof mockStudentData];
  
  if (!studentData) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const response: StudentDashboardResponse = studentData;
  res.json(response);
};

export const getStudentProfile: RequestHandler = (req, res) => {
  const studentId = req.params.studentId || "STD001";
  
  const studentData = mockStudentData[studentId as keyof typeof mockStudentData];
  
  if (!studentData) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  res.json({
    success: true,
    profile: {
      ...studentData.studentInfo,
      fatherName: "মোহাম্মদ আব্দুর রহিম",
      motherName: "ফাতিমা খাতুন",
      dateOfBirth: "২০০৫-০৩-১৫",
      bloodGroup: "B+",
      address: "গ্রাম: চুনতি, উপজেলা: লক্ষ্মীপুর, জেলা: লক্ষ্মীপুর",
      phone: "০১৭১২৩৪৫৬৭৮",
      emergencyContact: "০১৭৮৭৬৫৪৩২১",
      admissionDate: "২০২৩-০১-০১"
    }
  });
};

export const getStudentAttendance: RequestHandler = (req, res) => {
  const studentId = req.params.studentId || "STD001";
  const month = req.query.month || "2024-12";
  
  // Mock attendance data for the month
  const attendanceData = [];
  const daysInMonth = 30;
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${month}-${day.toString().padStart(2, '0')}`;
    const status = Math.random() > 0.1 ? 'present' : 'absent';
    
    attendanceData.push({
      date,
      status,
      subjects: [
        { name: "আরবি সাহিত্য", status },
        { name: "ইসলামিক স্টাডিজ", status },
        { name: "বাংলা", status },
        { name: "গণিত", status }
      ]
    });
  }

  res.json({
    success: true,
    month,
    attendance: attendanceData,
    summary: {
      totalDays: daysInMonth,
      presentDays: attendanceData.filter(a => a.status === 'present').length,
      absentDays: attendanceData.filter(a => a.status === 'absent').length
    }
  });
};

export const getStudentMarks: RequestHandler = (req, res) => {
  const studentId = req.params.studentId || "STD001";
  const examType = req.query.examType || "all";
  
  const marksData = [
    { subject: "আরবি সাহিত্য", marks: 85, total: 100, examType: "মাসিক পরীক্ষা", date: "২০২৪-১১-১৫", grade: "A" },
    { subject: "ইসলামিক স্টাডিজ", marks: 92, total: 100, examType: "মাসিক পরীক্ষা", date: "২০২৪-১১-১২", grade: "A+" },
    { subject: "বাংলা", marks: 78, total: 100, examType: "সাপ্তাহিক পরীক্ষা", date: "২০২৪-১১-১০", grade: "A-" },
    { subject: "গণিত", marks: 88, total: 100, examType: "মাসিক পরীক্ষা", date: "২০২৪-১১-০৮", grade: "A" },
    { subject: "আরবি সাহিত্য", marks: 90, total: 100, examType: "অর্ধবার্ষিক", date: "২০২৪-০৬-১৫", grade: "A+" },
    { subject: "ইসলামিক স্টাডিজ", marks: 95, total: 100, examType: "অর্ধবার্ষিক", date: "২০২৪-০৬-১২", grade: "A+" }
  ];

  const filteredMarks = examType === "all" 
    ? marksData 
    : marksData.filter(m => m.examType === examType);

  res.json({
    success: true,
    marks: filteredMarks,
    summary: {
      totalSubjects: filteredMarks.length,
      averageMarks: filteredMarks.reduce((sum, m) => sum + m.marks, 0) / filteredMarks.length,
      totalMarks: filteredMarks.reduce((sum, m) => sum + m.marks, 0),
      totalPossible: filteredMarks.reduce((sum, m) => sum + m.total, 0)
    }
  });
};

export const getStudentFees: RequestHandler = (req, res) => {
  const studentId = req.params.studentId || "STD001";
  
  const feeData = [
    { 
      type: "টিউশন ফি", 
      amount: 5000, 
      dueDate: "২০২৪-১২-৩১", 
      status: "paid", 
      paidDate: "২০২ৄ-১১-২৫",
      transactionId: "TXN123456"
    },
    { 
      type: "লাইব্রেরি ফি", 
      amount: 500, 
      dueDate: "২০২৪-১২-৩১", 
      status: "paid", 
      paidDate: "২০২৪-১১-২৫",
      transactionId: "TXN123457"
    },
    { 
      type: "পরীক্ষার ফি", 
      amount: 1500, 
      dueDate: "২০২৪-১২-৩১", 
      status: "pending"
    },
    { 
      type: "ক্রীড়া ফি", 
      amount: 300, 
      dueDate: "২০২৪-১২-৩১", 
      status: "pending"
    }
  ];

  const totalPaid = feeData.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  const totalDue = feeData.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);

  res.json({
    success: true,
    fees: feeData,
    summary: {
      totalPaid,
      totalDue,
      total: totalPaid + totalDue
    }
  });
};
