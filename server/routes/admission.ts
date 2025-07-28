import express from 'express';
import { 
  AdmissionApplication, 
  AdmissionTest, 
  AdmissionCriteria,
  AdmissionResult,
  AdmissionSession 
} from '../../shared/database';

const router = express.Router();

// Mock admission data
const admissionSessions: AdmissionSession[] = [
  {
    id: '1',
    name: 'ভর্তি ২০২৫',
    academicYear: '২০২৫',
    startDate: '2024-12-01',
    endDate: '2025-01-31',
    status: 'active',
    totalSeats: 200,
    availableSeats: 150,
    applicationFee: 500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'ভর্তি ২০২৪',
    academicYear: '২০২৪',
    startDate: '2023-12-01',
    endDate: '2024-01-31',
    status: 'completed',
    totalSeats: 180,
    availableSeats: 0,
    applicationFee: 450,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const admissionApplications: AdmissionApplication[] = [
  {
    id: '1',
    sessionId: '1',
    studentName: 'মোহাম্মদ আব্দুল্লাহ আল মামুন',
    fatherName: 'মোহাম্মদ আব্দুর রহমান',
    motherName: 'ফাতিমা খাতুন',
    dateOfBirth: '2010-05-15',
    gender: 'male',
    nationality: 'বাংলাদেশী',
    religion: 'ইসলাম',
    bloodGroup: 'B+',
    presentAddress: 'গ্রাম: চুনতি, পোস্ট: চুনতি, উপজেলা: রামগতি, জেলা: লক্ষ্মীপুর',
    permanentAddress: 'গ্রাম: চুনতি, পোস্ট: চুনতি, উপজেলা: রামগতি, জেলা: লক্ষ্মীপুর',
    guardianPhone: '01712345678',
    guardianEmail: 'guardian@example.com',
    previousInstitution: 'চুনতি সরকারি প্রাথমিক বিদ্যালয়',
    classAppliedFor: 'class-6',
    status: 'pending',
    applicationDate: '2024-12-01',
    paymentStatus: 'paid',
    transactionId: 'TXN123456789',
    documents: ['birth_certificate', 'previous_result', 'photo'],
    testScore: 85,
    interviewScore: 90,
    totalScore: 87.5,
    rank: 5
  },
  {
    id: '2',
    sessionId: '1',
    studentName: 'আয়েশা সিদ্দিকা',
    fatherName: 'মোহাম্মদ আবু বকর',
    motherName: 'খাদিজা বেগম',
    dateOfBirth: '2011-03-22',
    gender: 'female',
    nationality: 'বাংলাদেশী',
    religion: 'ইসলাম',
    bloodGroup: 'A+',
    presentAddress: 'গ্রাম: কমলনগর, পোস্ট: কমলনগর, উপজেলা: রামগতি, জেলা: লক্ষ্মীপুর',
    permanentAddress: 'গ্রাম: কমলনগর, পোস্ট: কমলনগর, উপজেলা: রামগতি, জেলা: লক্ষ্মীপুর',
    guardianPhone: '01812345678',
    guardianEmail: 'guardian2@example.com',
    previousInstitution: 'কমলনগর প্রাথমিক বিদ্যালয়',
    classAppliedFor: 'class-6',
    status: 'selected',
    applicationDate: '2024-12-05',
    paymentStatus: 'paid',
    transactionId: 'TXN123456790',
    documents: ['birth_certificate', 'previous_result', 'photo'],
    testScore: 92,
    interviewScore: 88,
    totalScore: 90.0,
    rank: 1
  }
];

const admissionTests: AdmissionTest[] = [
  {
    id: '1',
    sessionId: '1',
    testName: 'লিখিত পরীক��ষা ২০২৫',
    testDate: '2025-01-15',
    testTime: '10:00',
    duration: 120,
    venue: 'মূল ভবন, পরীক্ষা হল',
    subjects: ['আরবি', 'বাংলা', 'ইংরেজি', 'গণিত', 'সাধারণ জ্ঞান'],
    totalMarks: 100,
    passingMarks: 40,
    status: 'scheduled'
  },
  {
    id: '2',
    sessionId: '1',
    testName: 'মৌখিক পরীক্ষা ২০২৫',
    testDate: '2025-01-20',
    testTime: '09:00',
    duration: 30,
    venue: 'প্রশাসনিক ভবন, সভাকক্ষ',
    subjects: ['ব্যক্তিত্ব মূল্যায়ন', 'ইসলামিক জ্ঞান', 'সাধারণ জ্ঞান'],
    totalMarks: 50,
    passingMarks: 25,
    status: 'scheduled'
  }
];

const admissionCriteria: AdmissionCriteria[] = [
  {
    id: '1',
    sessionId: '1',
    class: 'class-6',
    minimumAge: 11,
    maximumAge: 13,
    requiredDocuments: ['জন্ম নিবন্ধন', 'পূর্ববর্তী ফলাফল', 'ছবি', 'অভিভাবকের NID'],
    educationRequirement: 'পঞ্চম শ্রেণী পাস',
    testRequired: true,
    interviewRequired: true,
    totalSeats: 60,
    reservedSeats: {
      general: 45,
      quota: 10,
      staff: 5
    },
    selectionCriteria: {
      written: 60,
      interview: 20,
      previous_result: 20
    }
  },
  {
    id: '2',
    sessionId: '1',
    class: 'class-7',
    minimumAge: 12,
    maximumAge: 14,
    requiredDocuments: ['জন্ম নিবন্ধন', 'পূর্ববর্তী ফলাফল', 'ছবি', 'অভিভাবকের NID'],
    educationRequirement: 'ষষ্ঠ শ্রেণী পাস',
    testRequired: true,
    interviewRequired: true,
    totalSeats: 50,
    reservedSeats: {
      general: 40,
      quota: 8,
      staff: 2
    },
    selectionCriteria: {
      written: 60,
      interview: 20,
      previous_result: 20
    }
  }
];

const admissionResults: AdmissionResult[] = [
  {
    id: '1',
    sessionId: '1',
    applicationId: '2',
    studentName: 'আয়েশা সিদ্দিকা',
    class: 'class-6',
    status: 'selected',
    rank: 1,
    totalScore: 90.0,
    writtenMarks: 92,
    interviewMarks: 88,
    previousResultMarks: 90,
    publishDate: '2025-01-25',
    admissionDeadline: '2025-02-10',
    admissionFee: 15000,
    remarks: 'অভিনন্দন! আপনি ভর্তির জন্য নির্বাচিত হয়��ছেন।'
  },
  {
    id: '2',
    sessionId: '1',
    applicationId: '1',
    studentName: 'মোহাম্মদ আব্দুল্লাহ আল মামুন',
    class: 'class-6',
    status: 'waiting',
    rank: 5,
    totalScore: 87.5,
    writtenMarks: 85,
    interviewMarks: 90,
    previousResultMarks: 88,
    publishDate: '2025-01-25',
    admissionDeadline: '2025-02-10',
    admissionFee: 15000,
    remarks: 'আপনি অপেক্ষমান তালিকায় রয়েছেন।'
  }
];

// Get admission dashboard
router.get('/dashboard', (req, res) => {
  const activeSession = admissionSessions.find(session => session.status === 'active');
  const totalApplications = admissionApplications.filter(app => app.sessionId === activeSession?.id).length;
  const pendingApplications = admissionApplications.filter(app => 
    app.sessionId === activeSession?.id && app.status === 'pending'
  ).length;
  const selectedStudents = admissionApplications.filter(app => 
    app.sessionId === activeSession?.id && app.status === 'selected'
  ).length;
  const paidApplications = admissionApplications.filter(app => 
    app.sessionId === activeSession?.id && app.paymentStatus === 'paid'
  ).length;

  res.json({
    stats: {
      totalApplications,
      pendingApplications,
      selectedStudents,
      paidApplications,
      totalSeats: activeSession?.totalSeats || 0,
      availableSeats: activeSession?.availableSeats || 0
    },
    activeSession,
    recentApplications: admissionApplications.slice(0, 5),
    upcomingTests: admissionTests.filter(test => test.status === 'scheduled').slice(0, 3)
  });
});

// Get all admission sessions
router.get('/sessions', (req, res) => {
  res.json(admissionSessions);
});

// Get session by ID
router.get('/sessions/:id', (req, res) => {
  const { id } = req.params;
  const session = admissionSessions.find(s => s.id === id);
  
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  res.json(session);
});

// Create new admission session
router.post('/sessions', (req, res) => {
  const newSession: AdmissionSession = {
    id: `session-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  admissionSessions.push(newSession);
  res.status(201).json(newSession);
});

// Get all applications
router.get('/applications', (req, res) => {
  const { sessionId, status, class: classFilter } = req.query;
  
  let filteredApplications = admissionApplications;
  
  if (sessionId) {
    filteredApplications = filteredApplications.filter(app => app.sessionId === sessionId);
  }
  
  if (status) {
    filteredApplications = filteredApplications.filter(app => app.status === status);
  }
  
  if (classFilter) {
    filteredApplications = filteredApplications.filter(app => app.classAppliedFor === classFilter);
  }
  
  res.json(filteredApplications);
});

// Get application by ID
router.get('/applications/:id', (req, res) => {
  const { id } = req.params;
  const application = admissionApplications.find(app => app.id === id);
  
  if (!application) {
    return res.status(404).json({ error: 'Application not found' });
  }
  
  res.json(application);
});

// Create new application
router.post('/applications', (req, res) => {
  const newApplication: AdmissionApplication = {
    id: `app-${Date.now()}`,
    ...req.body,
    applicationDate: new Date().toISOString().split('T')[0],
    status: 'pending',
    paymentStatus: 'pending'
  };
  
  admissionApplications.push(newApplication);
  res.status(201).json(newApplication);
});

// Update application status
router.patch('/applications/:id', (req, res) => {
  const { id } = req.params;
  const applicationIndex = admissionApplications.findIndex(app => app.id === id);
  
  if (applicationIndex === -1) {
    return res.status(404).json({ error: 'Application not found' });
  }
  
  admissionApplications[applicationIndex] = {
    ...admissionApplications[applicationIndex],
    ...req.body
  };
  
  res.json(admissionApplications[applicationIndex]);
});

// Get admission tests
router.get('/tests', (req, res) => {
  const { sessionId } = req.query;
  
  let filteredTests = admissionTests;
  
  if (sessionId) {
    filteredTests = filteredTests.filter(test => test.sessionId === sessionId);
  }
  
  res.json(filteredTests);
});

// Create admission test
router.post('/tests', (req, res) => {
  const newTest: AdmissionTest = {
    id: `test-${Date.now()}`,
    ...req.body
  };
  
  admissionTests.push(newTest);
  res.status(201).json(newTest);
});

// Get admission criteria
router.get('/criteria', (req, res) => {
  const { sessionId, class: classFilter } = req.query;
  
  let filteredCriteria = admissionCriteria;
  
  if (sessionId) {
    filteredCriteria = filteredCriteria.filter(criteria => criteria.sessionId === sessionId);
  }
  
  if (classFilter) {
    filteredCriteria = filteredCriteria.filter(criteria => criteria.class === classFilter);
  }
  
  res.json(filteredCriteria);
});

// Create admission criteria
router.post('/criteria', (req, res) => {
  const newCriteria: AdmissionCriteria = {
    id: `criteria-${Date.now()}`,
    ...req.body
  };
  
  admissionCriteria.push(newCriteria);
  res.status(201).json(newCriteria);
});

// Get admission results
router.get('/results', (req, res) => {
  const { sessionId, status, class: classFilter } = req.query;
  
  let filteredResults = admissionResults;
  
  if (sessionId) {
    filteredResults = filteredResults.filter(result => result.sessionId === sessionId);
  }
  
  if (status) {
    filteredResults = filteredResults.filter(result => result.status === status);
  }
  
  if (classFilter) {
    filteredResults = filteredResults.filter(result => result.class === classFilter);
  }
  
  res.json(filteredResults);
});

// Publish admission results
router.post('/results/publish', (req, res) => {
  const { sessionId } = req.body;
  
  // Update all results for the session as published
  const sessionResults = admissionResults.filter(result => result.sessionId === sessionId);
  
  sessionResults.forEach(result => {
    result.publishDate = new Date().toISOString().split('T')[0];
  });
  
  res.json({ message: 'Results published successfully', count: sessionResults.length });
});

// Get admission statistics
router.get('/statistics/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  
  const sessionApplications = admissionApplications.filter(app => app.sessionId === sessionId);
  const sessionResults = admissionResults.filter(result => result.sessionId === sessionId);
  
  const stats = {
    totalApplications: sessionApplications.length,
    maleApplications: sessionApplications.filter(app => app.gender === 'male').length,
    femaleApplications: sessionApplications.filter(app => app.gender === 'female').length,
    pendingApplications: sessionApplications.filter(app => app.status === 'pending').length,
    selectedStudents: sessionResults.filter(result => result.status === 'selected').length,
    waitingStudents: sessionResults.filter(result => result.status === 'waiting').length,
    rejectedStudents: sessionResults.filter(result => result.status === 'rejected').length,
    classwiseApplications: {},
    averageScore: 0
  };
  
  // Calculate classwise applications
  sessionApplications.forEach(app => {
    if (!stats.classwiseApplications[app.classAppliedFor]) {
      stats.classwiseApplications[app.classAppliedFor] = 0;
    }
    stats.classwiseApplications[app.classAppliedFor]++;
  });
  
  // Calculate average score
  const totalScore = sessionResults.reduce((sum, result) => sum + result.totalScore, 0);
  stats.averageScore = sessionResults.length > 0 ? totalScore / sessionResults.length : 0;
  
  res.json(stats);
});

export default router;
