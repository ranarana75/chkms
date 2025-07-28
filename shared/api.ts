// API ইন্টারফেস এবং এন্ডপয়েন্ট ডেফিনিশন

export interface DemoResponse {
  message: string;
}

// Authentication APIs
export interface LoginRequest {
  username: string;
  password: string;
  userType: 'student' | 'teacher' | 'admin' | 'parent';
}

export interface LoginResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
    role: string;
    permissions: string[];
  };
  token: string;
}

// Student APIs
export interface StudentDashboardResponse {
  studentInfo: {
    name: string;
    id: string;
    class: string;
    section: string;
    roll: string;
    photo?: string;
  };
  attendance: {
    present: number;
    total: number;
    percentage: number;
  };
  recentMarks: Array<{
    subject: string;
    marks: number;
    total: number;
    examType: string;
    date: string;
  }>;
  hifzProgress: {
    completed: number;
    total: number;
    currentSurah: string;
    lastCompleted?: string;
  };
  feeStatus: {
    paid: number;
    due: number;
    total: number;
    dueDate?: string;
  };
  upcomingEvents: Array<{
    title: string;
    date: string;
    type: string;
  }>;
}

// Teacher APIs
export interface TeacherDashboardResponse {
  teacherInfo: {
    name: string;
    id: string;
    subjects: string[];
    classes: string[];
    photo?: string;
  };
  todayClasses: Array<{
    subject: string;
    class: string;
    time: string;
    room: string;
    status: 'completed' | 'ongoing' | 'upcoming';
  }>;
  classStatistics: Array<{
    class: string;
    students: number;
    attendance: number;
    avgMarks: number;
  }>;
  pendingTasks: Array<{
    task: string;
    priority: 'high' | 'medium' | 'low';
    deadline: string;
  }>;
  recentActivities: Array<{
    type: string;
    description: string;
    time: string;
  }>;
}

// Admin APIs
export interface AdminDashboardResponse {
  overview: {
    totalStudents: number;
    totalTeachers: number;
    totalClasses: number;
    monthlyRevenue: number;
    pendingFees: number;
  };
  departmentStats: Array<{
    name: string;
    students: number;
    teachers: number;
    performance: number;
  }>;
  recentActivities: Array<{
    type: string;
    description: string;
    time: string;
  }>;
  pendingApprovals: Array<{
    type: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  systemAlerts: Array<{
    type: 'error' | 'warning' | 'success';
    message: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

// Attendance APIs
export interface AttendanceRequest {
  classId: string;
  date: string;
  students: Array<{
    studentId: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    remarks?: string;
  }>;
}

export interface AttendanceResponse {
  success: boolean;
  message: string;
}

// Marks APIs
export interface MarksEntryRequest {
  studentId: string;
  subjectId: string;
  examType: 'monthly' | 'midterm' | 'final' | 'assignment' | 'quiz';
  totalMarks: number;
  obtainedMarks: number;
  examDate: string;
}

export interface MarksResponse {
  success: boolean;
  message: string;
}

// Fee APIs
export interface FeePaymentRequest {
  studentId: string;
  amount: number;
  paymentMethod: 'cash' | 'bkash' | 'nagad' | 'bank';
  transactionId?: string;
}

export interface FeePaymentResponse {
  success: boolean;
  transactionId: string;
  receipt: {
    studentName: string;
    amount: number;
    date: string;
    receiptNumber: string;
  };
}

// Library APIs
export interface LibraryIssueRequest {
  bookId: string;
  studentId: string;
  dueDate: string;
}

export interface LibraryResponse {
  success: boolean;
  message: string;
  dueDate?: string;
}

// Notice APIs
export interface NoticeCreateRequest {
  title: string;
  content: string;
  type: 'general' | 'urgent' | 'exam' | 'holiday' | 'event';
  targetAudience: 'all' | 'students' | 'teachers' | 'parents';
  expiryDate?: string;
}

export interface NoticeResponse {
  success: boolean;
  noticeId: string;
}

// Prayer Times API
export interface PrayerTimesResponse {
  date: string;
  times: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  location: string;
}

// Report APIs
export interface ReportRequest {
  type: 'attendance' | 'marks' | 'fee' | 'performance';
  filters: {
    startDate?: string;
    endDate?: string;
    classId?: string;
    studentId?: string;
    subjectId?: string;
  };
  format: 'pdf' | 'excel' | 'json';
}

export interface ReportResponse {
  success: boolean;
  reportUrl: string;
  expiryTime: string;
}
