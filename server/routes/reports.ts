import express from 'express';
import { Report, AnalyticsData, ReportTemplate } from '../../shared/database';

const router = express.Router();

// Mock reports data
const reports: Report[] = [
  {
    id: '1',
    title: 'মাসিক শিক্ষার্থী উপস্থিতি রিপোর্ট',
    type: 'attendance',
    category: 'academic',
    description: 'গত মাসের শিক্ষার্থীদের উপস্থিতির বিস্তারিত রিপোর্ট',
    generatedBy: 'admin-001',
    generatedByName: 'অ্যাডমিন',
    generatedAt: new Date().toISOString(),
    parameters: {
      startDate: '2024-11-01',
      endDate: '2024-11-30',
      class: 'all',
      section: 'all'
    },
    format: 'pdf',
    status: 'completed',
    downloadUrl: '/reports/attendance_november_2024.pdf',
    size: '2.5 MB'
  },
  {
    id: '2',
    title: 'ত্রৈমাসিক ফলাফল বিশ্লেষণ',
    type: 'academic',
    category: 'performance',
    description: 'ত্রৈমাসিক পরীক্ষার ফলাফলের বিস্তারিত বিশ্লেষণ',
    generatedBy: 'teacher-001',
    generatedByName: 'উস্তাদ মোহাম্মদ হাসান',
    generatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    parameters: {
      examType: 'quarterly',
      academicYear: '2024',
      class: 'class-8'
    },
    format: 'excel',
    status: 'completed',
    downloadUrl: '/reports/quarterly_results_2024.xlsx',
    size: '1.8 MB'
  },
  {
    id: '3',
    title: 'আর্থিক আয়-ব্যয় রিপোর্ট',
    type: 'financial',
    category: 'finance',
    description: 'গত তিন মাসের আর্থিক আয়-ব্যয়ের সারসংক্ষেপ',
    generatedBy: 'accountant-001',
    generatedByName: 'হিসাবরক্ষক',
    generatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    parameters: {
      startDate: '2024-09-01',
      endDate: '2024-11-30',
      department: 'all'
    },
    format: 'pdf',
    status: 'completed',
    downloadUrl: '/reports/financial_q3_2024.pdf',
    size: '3.2 MB'
  }
];

const reportTemplates: ReportTemplate[] = [
  {
    id: '1',
    name: 'উপস্থিতি রিপোর্ট',
    type: 'attendance',
    category: 'academic',
    description: 'শিক্ষার্থীদের উপস্থিতির বিস্তারিত রিপোর্ট',
    parameters: [
      { name: 'startDate', label: 'শুরুর তারিখ', type: 'date', required: true },
      { name: 'endDate', label: 'শেষের তারিখ', type: 'date', required: true },
      { name: 'class', label: 'শ্রেণী', type: 'select', required: false, options: ['all', 'class-6', 'class-7', 'class-8', 'class-9', 'class-10'] },
      { name: 'section', label: 'শাখা', type: 'select', required: false, options: ['all', 'A', 'B', 'C'] }
    ],
    formats: ['pdf', 'excel'],
    isActive: true
  },
  {
    id: '2',
    name: 'একাডেমিক পারফরমেন্স',
    type: 'academic',
    category: 'performance',
    description: 'শিক্ষার্থীদের একাড���মিক পারফরমেন্স বিশ্লেষণ',
    parameters: [
      { name: 'examType', label: 'পরীক্ষার ধরন', type: 'select', required: true, options: ['monthly', 'quarterly', 'half_yearly', 'annual'] },
      { name: 'academicYear', label: 'শিক্ষাবর্ষ', type: 'select', required: true, options: ['2024', '2023', '2022'] },
      { name: 'class', label: 'শ্রেণী', type: 'select', required: false, options: ['all', 'class-6', 'class-7', 'class-8', 'class-9', 'class-10'] },
      { name: 'subject', label: 'বিষয়', type: 'select', required: false, options: ['all', 'আরবি', 'বাংলা', 'ইংরেজি', 'গণিত', 'ইসলামিক স্টাডিজ'] }
    ],
    formats: ['pdf', 'excel'],
    isActive: true
  },
  {
    id: '3',
    name: 'আর্থিক রিপোর্ট',
    type: 'financial',
    category: 'finance',
    description: 'আর্থিক আয়-ব্যয়ের বিস্তারিত রিপোর্ট',
    parameters: [
      { name: 'startDate', label: 'শুরুর তারিখ', type: 'date', required: true },
      { name: 'endDate', label: 'শেষের তারিখ', type: 'date', required: true },
      { name: 'category', label: 'বিভাগ', type: 'select', required: false, options: ['all', 'income', 'expense', 'fees'] },
      { name: 'department', label: 'ডিপার্টমেন্ট', type: 'select', required: false, options: ['all', 'academic', 'administration', 'maintenance'] }
    ],
    formats: ['pdf', 'excel'],
    isActive: true
  },
  {
    id: '4',
    name: 'লাইব্রেরি ব্যবহার',
    type: 'library',
    category: 'academic',
    description: 'লাইব্রেরি বই ইস্যু ও রিটার্নের রিপোর্ট',
    parameters: [
      { name: 'startDate', label: 'শুরুর তারিখ', type: 'date', required: true },
      { name: 'endDate', label: 'শেষের তারিখ', type: 'date', required: true },
      { name: 'bookCategory', label: 'বইয়ের ধরন', type: 'select', required: false, options: ['all', 'islamic', 'academic', 'general'] },
      { name: 'class', label: 'শ্রেণী', type: 'select', required: false, options: ['all', 'class-6', 'class-7', 'class-8', 'class-9', 'class-10'] }
    ],
    formats: ['pdf', 'excel'],
    isActive: true
  },
  {
    id: '5',
    name: 'শিক্ষক কার্যকলাপ',
    type: 'teacher',
    category: 'hr',
    description: 'শিক্ষকদের কার্যকলাপ ও পারফরমেন্স রিপোর্ট',
    parameters: [
      { name: 'startDate', label: 'শুরুর তারিখ', type: 'date', required: true },
      { name: 'endDate', label: 'শেষের তারিখ', type: 'date', required: true },
      { name: 'department', label: 'বিভাগ', type: 'select', required: false, options: ['all', 'arabic', 'bangla', 'english', 'math', 'islamic'] },
      { name: 'includeAttendance', label: 'উপস্থিতি অন্তর্ভুক্ত', type: 'checkbox', required: false }
    ],
    formats: ['pdf', 'excel'],
    isActive: true
  }
];

const analyticsData: AnalyticsData = {
  students: {
    totalStudents: 1200,
    activeStudents: 1180,
    newAdmissions: 150,
    graduatedStudents: 200,
    averageAttendance: 92.5,
    classWiseDistribution: {
      'class-6': 250,
      'class-7': 230,
      'class-8': 220,
      'class-9': 200,
      'class-10': 180,
      'hifz': 120
    },
    genderDistribution: {
      male: 720,
      female: 480
    },
    performanceDistribution: {
      excellent: 180,
      good: 480,
      average: 360,
      needsImprovement: 180
    }
  },
  teachers: {
    totalTeachers: 85,
    activeTeachers: 82,
    newRecruits: 8,
    departmentWiseDistribution: {
      arabic: 25,
      islamic: 20,
      bangla: 12,
      english: 10,
      math: 8,
      science: 6,
      others: 4
    },
    experienceDistribution: {
      '0-2_years': 15,
      '3-5_years': 20,
      '6-10_years': 25,
      '11-15_years': 15,
      '15+_years': 10
    },
    averageAttendance: 96.8
  },
  financial: {
    totalRevenue: 25000000,
    totalExpenses: 18000000,
    netProfit: 7000000,
    feeCollection: 22000000,
    outstandingFees: 2500000,
    monthlyTrend: [
      { month: 'জানুয়ারি', revenue: 2200000, expenses: 1500000 },
      { month: 'ফেব্রুয়ারি', revenue: 2100000, expenses: 1450000 },
      { month: 'মার্চ', revenue: 2300000, expenses: 1600000 },
      { month: 'এপ্রিল', revenue: 2000000, expenses: 1400000 },
      { month: 'মে', revenue: 2150000, expenses: 1480000 },
      { month: 'জুন', revenue: 2250000, expenses: 1520000 }
    ],
    expenseCategories: {
      salaries: 12000000,
      infrastructure: 3000000,
      utilities: 1500000,
      maintenance: 800000,
      others: 700000
    }
  },
  academic: {
    totalClasses: 45,
    totalSubjects: 12,
    averageClassSize: 28,
    examResults: {
      passRate: 94.5,
      averageGPA: 3.8,
      gradeDistribution: {
        'A+': 15,
        'A': 25,
        'A-': 20,
        'B+': 18,
        'B': 12,
        'C+': 7,
        'C': 3
      }
    },
    subjectPerformance: [
      { subject: 'আরবি', averageMarks: 78.5, passRate: 96 },
      { subject: 'ইসলামিক স্টাডিজ', averageMarks: 82.3, passRate: 98 },
      { subject: 'বাংলা', averageMarks: 75.2, passRate: 94 },
      { subject: 'ইংরেজি', averageMarks: 68.7, passRate: 89 },
      { subject: 'গণিত', averageMarks: 71.4, passRate: 91 }
    ]
  },
  events: {
    totalEvents: 24,
    completedEvents: 18,
    upcomingEvents: 6,
    averageAttendance: 87.5,
    eventTypes: {
      academic: 8,
      cultural: 6,
      sports: 5,
      religious: 3,
      administrative: 2
    }
  }
};

// Get reports dashboard
router.get('/dashboard', (req, res) => {
  const totalReports = reports.length;
  const completedReports = reports.filter(r => r.status === 'completed').length;
  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const totalTemplates = reportTemplates.filter(t => t.isActive).length;

  res.json({
    stats: {
      totalReports,
      completedReports,
      pendingReports,
      totalTemplates
    },
    recentReports: reports.slice(0, 5),
    popularTemplates: reportTemplates.filter(t => t.isActive).slice(0, 4),
    analyticsOverview: {
      totalStudents: analyticsData.students.totalStudents,
      totalTeachers: analyticsData.teachers.totalTeachers,
      monthlyRevenue: analyticsData.financial.monthlyTrend[analyticsData.financial.monthlyTrend.length - 1]?.revenue || 0,
      averageAttendance: analyticsData.students.averageAttendance
    }
  });
});

// Get all reports
router.get('/list', (req, res) => {
  const { type, category, status, generatedBy } = req.query;
  
  let filteredReports = reports;
  
  if (type) {
    filteredReports = filteredReports.filter(r => r.type === type);
  }
  
  if (category) {
    filteredReports = filteredReports.filter(r => r.category === category);
  }
  
  if (status) {
    filteredReports = filteredReports.filter(r => r.status === status);
  }
  
  if (generatedBy) {
    filteredReports = filteredReports.filter(r => r.generatedBy === generatedBy);
  }
  
  // Sort by generation date (newest first)
  filteredReports.sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime());
  
  res.json(filteredReports);
});

// Get report by ID
router.get('/list/:id', (req, res) => {
  const { id } = req.params;
  const report = reports.find(r => r.id === id);
  
  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }
  
  res.json(report);
});

// Get all report templates
router.get('/templates', (req, res) => {
  const { type, category, active } = req.query;
  
  let filteredTemplates = reportTemplates;
  
  if (type) {
    filteredTemplates = filteredTemplates.filter(t => t.type === type);
  }
  
  if (category) {
    filteredTemplates = filteredTemplates.filter(t => t.category === category);
  }
  
  if (active !== undefined) {
    filteredTemplates = filteredTemplates.filter(t => t.isActive === (active === 'true'));
  }
  
  res.json(filteredTemplates);
});

// Get template by ID
router.get('/templates/:id', (req, res) => {
  const { id } = req.params;
  const template = reportTemplates.find(t => t.id === id);
  
  if (!template) {
    return res.status(404).json({ error: 'Template not found' });
  }
  
  res.json(template);
});

// Generate report from template
router.post('/generate/:templateId', (req, res) => {
  const { templateId } = req.params;
  const { parameters, format } = req.body;
  
  const template = reportTemplates.find(t => t.id === templateId);
  
  if (!template) {
    return res.status(404).json({ error: 'Template not found' });
  }
  
  // Create new report
  const newReport: Report = {
    id: `report-${Date.now()}`,
    title: `${template.name} - ${new Date().toLocaleDateString('bn-BD')}`,
    type: template.type,
    category: template.category,
    description: template.description,
    generatedBy: req.body.generatedBy || 'admin-001',
    generatedByName: req.body.generatedByName || 'অ্যাডমিন',
    generatedAt: new Date().toISOString(),
    parameters,
    format: format || 'pdf',
    status: 'pending',
    downloadUrl: '',
    size: ''
  };
  
  reports.unshift(newReport);
  
  // Simulate report generation
  setTimeout(() => {
    newReport.status = 'completed';
    newReport.downloadUrl = `/reports/${newReport.id}.${format}`;
    newReport.size = `${(Math.random() * 3 + 1).toFixed(1)} MB`;
  }, 2000);
  
  res.status(201).json(newReport);
});

// Get analytics data
router.get('/analytics', (req, res) => {
  const { type } = req.query;
  
  if (type) {
    switch (type) {
      case 'students':
        res.json(analyticsData.students);
        break;
      case 'teachers':
        res.json(analyticsData.teachers);
        break;
      case 'financial':
        res.json(analyticsData.financial);
        break;
      case 'academic':
        res.json(analyticsData.academic);
        break;
      case 'events':
        res.json(analyticsData.events);
        break;
      default:
        res.status(400).json({ error: 'Invalid analytics type' });
    }
  } else {
    res.json(analyticsData);
  }
});

// Get specific analytics
router.get('/analytics/students/performance', (req, res) => {
  const { class: classFilter, subject, timeframe } = req.query;
  
  // Mock performance data based on filters
  const performanceData = {
    summary: {
      totalStudents: classFilter ? 
        analyticsData.students.classWiseDistribution[classFilter as string] || 0 : 
        analyticsData.students.totalStudents,
      averageGPA: 3.8,
      passRate: 94.5
    },
    trends: [
      { month: 'জানুয়ারি', averageGPA: 3.6, passRate: 92 },
      { month: 'ফেব্রুয়ারি', averageGPA: 3.7, passRate: 93 },
      { month: 'মার্চ', averageGPA: 3.8, passRate: 94 },
      { month: 'এপ্রিল', averageGPA: 3.9, passRate: 95 },
      { month: 'মে', averageGPA: 3.8, passRate: 94 },
      { month: 'জুন', averageGPA: 3.8, passRate: 95 }
    ],
    subjectWise: analyticsData.academic.subjectPerformance
  };
  
  res.json(performanceData);
});

router.get('/analytics/attendance/trends', (req, res) => {
  const { timeframe = 'monthly' } = req.query;
  
  const attendanceTrends = {
    overall: [
      { period: 'জানুয়ারি', rate: 91.5 },
      { period: 'ফেব্রুয়ারি', rate: 92.0 },
      { period: 'মার্চ', rate: 93.2 },
      { period: 'এপ্রিল', rate: 91.8 },
      { period: 'মে', rate: 92.5 },
      { period: 'জুন', rate: 93.0 }
    ],
    classWise: [
      { class: 'class-6', rate: 94.2 },
      { class: 'class-7', rate: 93.8 },
      { class: 'class-8', rate: 92.5 },
      { class: 'class-9', rate: 91.2 },
      { class: 'class-10', rate: 90.8 }
    ]
  };
  
  res.json(attendanceTrends);
});

router.get('/analytics/financial/overview', (req, res) => {
  const { period = 'monthly' } = req.query;
  
  const financialOverview = {
    summary: {
      totalRevenue: analyticsData.financial.totalRevenue,
      totalExpenses: analyticsData.financial.totalExpenses,
      netProfit: analyticsData.financial.netProfit,
      profitMargin: ((analyticsData.financial.netProfit / analyticsData.financial.totalRevenue) * 100).toFixed(1)
    },
    trends: analyticsData.financial.monthlyTrend,
    expenseBreakdown: analyticsData.financial.expenseCategories,
    feeCollection: {
      collected: analyticsData.financial.feeCollection,
      outstanding: analyticsData.financial.outstandingFees,
      collectionRate: ((analyticsData.financial.feeCollection / (analyticsData.financial.feeCollection + analyticsData.financial.outstandingFees)) * 100).toFixed(1)
    }
  };
  
  res.json(financialOverview);
});

// Delete report
router.delete('/list/:id', (req, res) => {
  const { id } = req.params;
  const reportIndex = reports.findIndex(r => r.id === id);
  
  if (reportIndex === -1) {
    return res.status(404).json({ error: 'Report not found' });
  }
  
  reports.splice(reportIndex, 1);
  res.json({ message: 'Report deleted successfully' });
});

// Export analytics data
router.post('/analytics/export', (req, res) => {
  const { type, format, parameters } = req.body;
  
  const exportReport: Report = {
    id: `export-${Date.now()}`,
    title: `${type} Analytics Export - ${new Date().toLocaleDateString('bn-BD')}`,
    type: 'analytics',
    category: 'data',
    description: `${type} এর অ্যানালিটিক্স ডেটা এক্সপোর্ট`,
    generatedBy: req.body.generatedBy || 'admin-001',
    generatedByName: req.body.generatedByName || 'অ্যাডমিন',
    generatedAt: new Date().toISOString(),
    parameters: parameters || {},
    format: format || 'excel',
    status: 'pending',
    downloadUrl: '',
    size: ''
  };
  
  reports.unshift(exportReport);
  
  // Simulate export generation
  setTimeout(() => {
    exportReport.status = 'completed';
    exportReport.downloadUrl = `/exports/${exportReport.id}.${format}`;
    exportReport.size = `${(Math.random() * 5 + 2).toFixed(1)} MB`;
  }, 3000);
  
  res.status(201).json(exportReport);
});

export default router;
