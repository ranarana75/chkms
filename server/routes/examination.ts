import express from 'express';
import { 
  Examination, 
  ExamSchedule, 
  Question, 
  ExamResult, 
  ReportCard 
} from '../../shared/database';

const router = express.Router();

// Mock examination data
const examinations: Examination[] = [
  {
    id: '1',
    name: 'বার্ষিক পরীক্ষা ২০২৪',
    type: 'annual',
    class: 'class-8',
    startDate: '2024-12-15',
    endDate: '2024-12-25',
    status: 'upcoming',
    totalMarks: 500,
    passingMarks: 250,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'ষাণ্মাসিক পরীক্ষা ২০২৪',
    type: 'half_yearly',
    class: 'class-9',
    startDate: '2024-11-01',
    endDate: '2024-11-10',
    status: 'completed',
    totalMarks: 400,
    passingMarks: 200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'ত্রৈমাসিক পরীক্ষা ২০২৪',
    type: 'quarterly',
    class: 'class-7',
    startDate: '2024-10-15',
    endDate: '2024-10-22',
    status: 'completed',
    totalMarks: 300,
    passingMarks: 150,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const examSchedules: ExamSchedule[] = [
  {
    id: '1',
    examinationId: '1',
    subject: 'আরবি',
    date: '2024-12-15',
    startTime: '09:00',
    endTime: '12:00',
    duration: 180,
    room: 'কক্���-১০১',
    invigilator: 'মাওলানা আব্দুল করিম',
    marks: 100
  },
  {
    id: '2',
    examinationId: '1',
    subject: 'বাংলা',
    date: '2024-12-16',
    startTime: '09:00',
    endTime: '12:00',
    duration: 180,
    room: 'কক্ষ-১০২',
    invigilator: 'উস্তাদ মোহাম্মদ রশিদ',
    marks: 100
  },
  {
    id: '3',
    examinationId: '1',
    subject: 'ইংরেজি',
    date: '2024-12-17',
    startTime: '09:00',
    endTime: '11:30',
    duration: 150,
    room: 'কক্ষ-১০৩',
    invigilator: 'মাওলানা আবু বকর',
    marks: 75
  },
  {
    id: '4',
    examinationId: '1',
    subject: 'গণিত',
    date: '2024-12-18',
    startTime: '09:00',
    endTime: '11:30',
    duration: 150,
    room: 'কক্ষ-১০১',
    invigilator: 'উস্তাদ আহমদ হাসান',
    marks: 75
  }
];

const questions: Question[] = [
  {
    id: '1',
    examinationId: '1',
    subject: 'আরবি',
    questionText: 'আল-কুরআনের প্রথম সূরা কোনটি?',
    questionType: 'mcq',
    options: ['সূরা আল-ফাতিহা', 'সূরা আল-বাকারা', 'স���রা আলে-ইমরান', 'সূরা আন-নিসা'],
    correctAnswer: 'সূরা আল-ফাতিহা',
    marks: 5,
    difficulty: 'easy'
  },
  {
    id: '2',
    examinationId: '1',
    subject: 'আরবি',
    questionText: 'হযরত মুহাম্মদ (সা.) এর জন্মস্থান কোথায়?',
    questionType: 'short_answer',
    marks: 10,
    difficulty: 'medium'
  },
  {
    id: '3',
    examinationId: '1',
    subject: 'বাংলা',
    questionText: 'বাংলা ভাষার জনক কে?',
    questionType: 'mcq',
    options: ['রবীন্দ্রনাথ ঠাকুর', 'কাজী নজরুল ইসলাম', 'ড. মুহাম্মদ শহীদুল্লাহ', 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়'],
    correctAnswer: 'ড. মুহাম্মদ শহীদুল্লাহ',
    marks: 5,
    difficulty: 'medium'
  }
];

const examResults: ExamResult[] = [
  {
    id: '1',
    examinationId: '2',
    studentId: 'std-001',
    subject: 'আরবি',
    obtainedMarks: 85,
    totalMarks: 100,
    grade: 'A+',
    gpa: 5.0,
    position: 1,
    status: 'pass'
  },
  {
    id: '2',
    examinationId: '2',
    studentId: 'std-001',
    subject: 'বাংলা',
    obtainedMarks: 78,
    totalMarks: 100,
    grade: 'A',
    gpa: 4.0,
    position: 3,
    status: 'pass'
  },
  {
    id: '3',
    examinationId: '2',
    studentId: 'std-002',
    subject: 'আরবি',
    obtainedMarks: 72,
    totalMarks: 100,
    grade: 'A-',
    gpa: 3.5,
    position: 5,
    status: 'pass'
  }
];

const reportCards: ReportCard[] = [
  {
    id: '1',
    examinationId: '2',
    studentId: 'std-001',
    studentName: 'মোহাম্মদ আব্দুল্লাহ',
    class: 'class-9',
    roll: '001',
    results: [
      { subject: 'আরবি', obtainedMarks: 85, totalMarks: 100, grade: 'A+', gpa: 5.0 },
      { subject: 'বাংলা', obtainedMarks: 78, totalMarks: 100, grade: 'A', gpa: 4.0 },
      { subject: 'ইংরেজি', obtainedMarks: 82, totalMarks: 100, grade: 'A+', gpa: 5.0 },
      { subject: 'গণিত', obtainedMarks: 75, totalMarks: 100, grade: 'A', gpa: 4.0 },
      { subject: 'ইসলামিক স্টাডিজ', obtainedMarks: 90, totalMarks: 100, grade: 'A+', gpa: 5.0 }
    ],
    totalObtained: 410,
    totalMarks: 500,
    cgpa: 4.6,
    overallGrade: 'A+',
    position: 1,
    totalStudents: 45,
    remarks: 'অসাধারণ পারফরমেন্স। আরও ভালো করার সুযোগ রয়েছে।',
    issueDate: new Date().toISOString()
  },
  {
    id: '2',
    examinationId: '2',
    studentId: 'std-002',
    studentName: 'ফাতিমা খাতুন',
    class: 'class-9',
    roll: '002',
    results: [
      { subject: 'আরবি', obtainedMarks: 72, totalMarks: 100, grade: 'A-', gpa: 3.5 },
      { subject: 'বাংলা', obtainedMarks: 88, totalMarks: 100, grade: 'A+', gpa: 5.0 },
      { subject: 'ইংরেজি', obtainedMarks: 70, totalMarks: 100, grade: 'A-', gpa: 3.5 },
      { subject: 'গণিত', obtainedMarks: 68, totalMarks: 100, grade: 'B+', gpa: 3.0 },
      { subject: 'ইসলামিক স্টাডিজ', obtainedMarks: 85, totalMarks: 100, grade: 'A+', gpa: 5.0 }
    ],
    totalObtained: 383,
    totalMarks: 500,
    cgpa: 4.0,
    overallGrade: 'A',
    position: 5,
    totalStudents: 45,
    remarks: 'ভালো ফলাফল। গণিতে আরও মনোযোগ দিতে হবে।',
    issueDate: new Date().toISOString()
  }
];

// Get examination dashboard
router.get('/dashboard', (req, res) => {
  const totalExams = examinations.length;
  const upcomingExams = examinations.filter(exam => exam.status === 'upcoming').length;
  const completedExams = examinations.filter(exam => exam.status === 'completed').length;
  const totalResults = examResults.length;
  const passedStudents = examResults.filter(result => result.status === 'pass').length;
  const averageMarks = examResults.reduce((sum, result) => sum + result.obtainedMarks, 0) / examResults.length;

  res.json({
    stats: {
      totalExams,
      upcomingExams,
      completedExams,
      totalResults,
      passedStudents,
      averageMarks: Math.round(averageMarks * 100) / 100
    },
    recentExams: examinations.slice(0, 5),
    upcomingSchedules: examSchedules.slice(0, 5)
  });
});

// Get all examinations
router.get('/examinations', (req, res) => {
  res.json(examinations);
});

// Get examination by ID
router.get('/examinations/:id', (req, res) => {
  const { id } = req.params;
  const examination = examinations.find(exam => exam.id === id);
  
  if (!examination) {
    return res.status(404).json({ error: 'Examination not found' });
  }
  
  res.json(examination);
});

// Create new examination
router.post('/examinations', (req, res) => {
  const newExamination: Examination = {
    id: `exam-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  examinations.push(newExamination);
  res.status(201).json(newExamination);
});

// Get exam schedules for examination
router.get('/examinations/:id/schedules', (req, res) => {
  const { id } = req.params;
  const schedules = examSchedules.filter(schedule => schedule.examinationId === id);
  res.json(schedules);
});

// Create exam schedule
router.post('/examinations/:id/schedules', (req, res) => {
  const { id } = req.params;
  const newSchedule: ExamSchedule = {
    id: `schedule-${Date.now()}`,
    examinationId: id,
    ...req.body
  };
  
  examSchedules.push(newSchedule);
  res.status(201).json(newSchedule);
});

// Get questions for examination and subject
router.get('/examinations/:id/questions', (req, res) => {
  const { id } = req.params;
  const { subject } = req.query;
  
  let filteredQuestions = questions.filter(q => q.examinationId === id);
  
  if (subject) {
    filteredQuestions = filteredQuestions.filter(q => q.subject === subject);
  }
  
  res.json(filteredQuestions);
});

// Create question
router.post('/examinations/:id/questions', (req, res) => {
  const { id } = req.params;
  const newQuestion: Question = {
    id: `question-${Date.now()}`,
    examinationId: id,
    ...req.body
  };
  
  questions.push(newQuestion);
  res.status(201).json(newQuestion);
});

// Get exam results
router.get('/examinations/:id/results', (req, res) => {
  const { id } = req.params;
  const results = examResults.filter(result => result.examinationId === id);
  res.json(results);
});

// Submit exam result
router.post('/examinations/:id/results', (req, res) => {
  const { id } = req.params;
  const newResult: ExamResult = {
    id: `result-${Date.now()}`,
    examinationId: id,
    ...req.body
  };
  
  examResults.push(newResult);
  res.status(201).json(newResult);
});

// Get report card
router.get('/examinations/:examId/students/:studentId/report-card', (req, res) => {
  const { examId, studentId } = req.params;
  const reportCard = reportCards.find(card => 
    card.examinationId === examId && card.studentId === studentId
  );
  
  if (!reportCard) {
    return res.status(404).json({ error: 'Report card not found' });
  }
  
  res.json(reportCard);
});

// Generate report card
router.post('/examinations/:examId/students/:studentId/report-card', (req, res) => {
  const { examId, studentId } = req.params;
  
  // Get student results for this examination
  const studentResults = examResults.filter(result => 
    result.examinationId === examId && result.studentId === studentId
  );
  
  if (studentResults.length === 0) {
    return res.status(404).json({ error: 'No results found for this student' });
  }
  
  // Calculate totals and grades
  const totalObtained = studentResults.reduce((sum, result) => sum + result.obtainedMarks, 0);
  const totalMarks = studentResults.reduce((sum, result) => sum + result.totalMarks, 0);
  const cgpa = studentResults.reduce((sum, result) => sum + result.gpa, 0) / studentResults.length;
  
  const newReportCard: ReportCard = {
    id: `report-${Date.now()}`,
    examinationId: examId,
    studentId: studentId,
    studentName: req.body.studentName || 'Unknown Student',
    class: req.body.class || 'Unknown Class',
    roll: req.body.roll || '000',
    results: studentResults.map(result => ({
      subject: result.subject,
      obtainedMarks: result.obtainedMarks,
      totalMarks: result.totalMarks,
      grade: result.grade,
      gpa: result.gpa
    })),
    totalObtained,
    totalMarks,
    cgpa: Math.round(cgpa * 100) / 100,
    overallGrade: cgpa >= 4.5 ? 'A+' : cgpa >= 4.0 ? 'A' : cgpa >= 3.5 ? 'A-' : cgpa >= 3.0 ? 'B+' : 'B',
    position: req.body.position || 1,
    totalStudents: req.body.totalStudents || 1,
    remarks: req.body.remarks || 'ভালো ফলাফল।',
    issueDate: new Date().toISOString()
  };
  
  reportCards.push(newReportCard);
  res.status(201).json(newReportCard);
});

// Get all report cards for examination
router.get('/examinations/:id/report-cards', (req, res) => {
  const { id } = req.params;
  const cards = reportCards.filter(card => card.examinationId === id);
  res.json(cards);
});

// Get exam statistics
router.get('/examinations/:id/statistics', (req, res) => {
  const { id } = req.params;
  const filteredResults = examResults.filter(result => result.examinationId === id);
  
  if (examResults.length === 0) {
    return res.json({
      totalStudents: 0,
      passedStudents: 0,
      failedStudents: 0,
      averageMarks: 0,
      highestMarks: 0,
      lowestMarks: 0,
      gradeDistribution: {}
    });
  }
  
  const passedStudents = examResults.filter(result => result.status === 'pass').length;
  const failedStudents = examResults.length - passedStudents;
  const averageMarks = examResults.reduce((sum, result) => sum + result.obtainedMarks, 0) / examResults.length;
  const highestMarks = Math.max(...examResults.map(result => result.obtainedMarks));
  const lowestMarks = Math.min(...examResults.map(result => result.obtainedMarks));
  
  const gradeDistribution = examResults.reduce((acc, result) => {
    acc[result.grade] = (acc[result.grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  res.json({
    totalStudents: examResults.length,
    passedStudents,
    failedStudents,
    averageMarks: Math.round(averageMarks * 100) / 100,
    highestMarks,
    lowestMarks,
    gradeDistribution
  });
});

export default router;
