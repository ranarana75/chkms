// ডেটাবেস স্কিমা এবং টাইপ ডেফিনিশন

export interface User {
  id: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  name: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Student {
  id: string;
  userId: string;
  studentId: string;
  admissionDate: Date;
  class: string;
  section: string;
  roll: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: Date;
  bloodGroup?: string;
  emergencyContact: string;
  photo?: string;
  isActive: boolean;
}

export interface Teacher {
  id: string;
  userId: string;
  teacherId: string;
  joiningDate: Date;
  subjects: string[];
  qualification: string;
  experience: number;
  salary: number;
  photo?: string;
  isActive: boolean;
}

export interface Class {
  id: string;
  name: string;
  level: string;
  capacity: number;
  currentStrength: number;
  classTeacherId?: string;
  isActive: boolean;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  type: 'compulsory' | 'optional' | 'islamic';
  creditHours: number;
  isActive: boolean;
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
  markedBy: string;
}

export interface Marks {
  id: string;
  studentId: string;
  subjectId: string;
  examType: 'monthly' | 'midterm' | 'final' | 'assignment' | 'quiz';
  totalMarks: number;
  obtainedMarks: number;
  examDate: Date;
  enteredBy: string;
  enteredAt: Date;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  type: 'tuition' | 'library' | 'transport' | 'hostel' | 'exam' | 'miscellaneous';
  dueDate: Date;
  paidDate?: Date;
  status: 'pending' | 'paid' | 'partial' | 'overdue';
  paymentMethod?: 'cash' | 'bkash' | 'nagad' | 'bank';
  transactionId?: string;
}

export interface Library {
  id: string;
  bookId: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  language: 'bangla' | 'arabic' | 'english' | 'urdu';
}

export interface LibraryIssue {
  id: string;
  bookId: string;
  studentId: string;
  issueDate: Date;
  dueDate: Date;
  returnDate?: Date;
  fine?: number;
  status: 'issued' | 'returned' | 'overdue';
}

export interface Hostel {
  id: string;
  roomNumber: string;
  capacity: number;
  currentOccupancy: number;
  type: 'single' | 'double' | 'triple' | 'dormitory';
  monthlyFee: number;
  isActive: boolean;
}

export interface HostelResident {
  id: string;
  studentId: string;
  roomId: string;
  checkInDate: Date;
  checkOutDate?: Date;
  status: 'active' | 'inactive';
}

export interface Transport {
  id: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  route: string;
  capacity: number;
  currentPassengers: number;
  monthlyFee: number;
  isActive: boolean;
}

export interface TransportUser {
  id: string;
  studentId: string;
  transportId: string;
  pickupPoint: string;
  status: 'active' | 'inactive';
}

export interface HifzProgress {
  id: string;
  studentId: string;
  surahName: string;
  ayahFrom: number;
  ayahTo: number;
  completedDate: Date;
  grade: 'excellent' | 'good' | 'average' | 'needs_improvement';
  teacherId: string;
  remarks?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'urgent' | 'exam' | 'holiday' | 'event';
  targetAudience: 'all' | 'students' | 'teachers' | 'parents';
  publishDate: Date;
  expiryDate?: Date;
  publishedBy: string;
  isActive: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'exam' | 'holiday' | 'competition' | 'islamic' | 'cultural';
  startDate: Date;
  endDate: Date;
  venue?: string;
  organizer: string;
  isActive: boolean;
}

export interface Examination {
  id: string;
  name: string;
  type: 'annual' | 'half_yearly' | 'quarterly' | 'monthly' | 'unit_test';
  class: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  totalMarks: number;
  passingMarks: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExamSchedule {
  id: string;
  examinationId: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  room: string;
  invigilator: string;
  marks: number;
}

export interface Question {
  id: string;
  examinationId: string;
  subject: string;
  questionText: string;
  questionType: 'mcq' | 'short_answer' | 'long_answer' | 'true_false';
  options?: string[];
  correctAnswer?: string;
  marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ExamResult {
  id: string;
  examinationId: string;
  studentId: string;
  subject: string;
  obtainedMarks: number;
  totalMarks: number;
  grade: string;
  gpa: number;
  position: number;
  status: 'pass' | 'fail';
}

export interface ReportCard {
  id: string;
  examinationId: string;
  studentId: string;
  studentName: string;
  class: string;
  roll: string;
  results: {
    subject: string;
    obtainedMarks: number;
    totalMarks: number;
    grade: string;
    gpa: number;
  }[];
  totalObtained: number;
  totalMarks: number;
  cgpa: number;
  overallGrade: string;
  position: number;
  totalStudents: number;
  remarks: string;
  issueDate: string;
}

export interface AdmissionSession {
  id: string;
  name: string;
  academicYear: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'completed';
  totalSeats: number;
  availableSeats: number;
  applicationFee: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdmissionApplication {
  id: string;
  sessionId: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  nationality: string;
  religion: string;
  bloodGroup?: string;
  presentAddress: string;
  permanentAddress: string;
  guardianPhone: string;
  guardianEmail?: string;
  previousInstitution?: string;
  classAppliedFor: string;
  status: 'pending' | 'selected' | 'rejected' | 'waiting';
  applicationDate: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  transactionId?: string;
  documents: string[];
  testScore?: number;
  interviewScore?: number;
  totalScore?: number;
  rank?: number;
}

export interface AdmissionTest {
  id: string;
  sessionId: string;
  testName: string;
  testDate: string;
  testTime: string;
  duration: number;
  venue: string;
  subjects: string[];
  totalMarks: number;
  passingMarks: number;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface AdmissionCriteria {
  id: string;
  sessionId: string;
  class: string;
  minimumAge: number;
  maximumAge: number;
  requiredDocuments: string[];
  educationRequirement: string;
  testRequired: boolean;
  interviewRequired: boolean;
  totalSeats: number;
  reservedSeats: {
    general: number;
    quota: number;
    staff: number;
  };
  selectionCriteria: {
    written: number;
    interview: number;
    previous_result: number;
  };
}

export interface AdmissionResult {
  id: string;
  sessionId: string;
  applicationId: string;
  studentName: string;
  class: string;
  status: 'selected' | 'waiting' | 'rejected';
  rank: number;
  totalScore: number;
  writtenMarks: number;
  interviewMarks: number;
  previousResultMarks: number;
  publishDate?: string;
  admissionDeadline?: string;
  admissionFee?: number;
  remarks?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'urgent';
  targetAudience: 'all' | 'students' | 'teachers' | 'parents';
  publishDate: string;
  expiryDate?: string;
  publishedBy: string;
  publisherName: string;
  isActive: boolean;
  isPinned: boolean;
  autoExpire: boolean;
}
