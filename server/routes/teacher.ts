import { RequestHandler } from "express";
import { TeacherDashboardResponse } from "@shared/api";

// Mock teacher data
const mockTeacherData = {
  TCH001: {
    teacherInfo: {
      name: "উস্তাদ আবদুর রহমান",
      id: "TCH001",
      subjects: ["আরবি সাহিত্য", "তাফসীর"],
      classes: ["আলিম প্রথম", "আলিম দ্বিতীয়"],
      photo: "/placeholder.svg",
    },
    todayClasses: [
      {
        subject: "আরবি সাহিত্য",
        class: "আ���িম প্রথম",
        time: "৯:০০ - ১০:০০",
        room: "১০১",
        status: "completed" as const,
      },
      {
        subject: "তাফসীর",
        class: "আলিম দ্বিতীয়",
        time: "১১:০০ - ১২:০০",
        room: "২০৫",
        status: "ongoing" as const,
      },
      {
        subject: "আরবি সাহিত্য",
        class: "আলিম প্রথম",
        time: "২:০০ - ৩:০০",
        room: "১০১",
        status: "upcoming" as const,
      },
    ],
    classStatistics: [
      { class: "আলিম প্রথম", students: 35, attendance: 85, avgMarks: 78 },
      { class: "আলিম দ্বিতীয়", students: 28, attendance: 90, avgMarks: 82 },
    ],
    pendingTasks: [
      {
        task: "আলিম দ্বিতীয় বর্ষের মাসিক পরীক্ষার প্রশ্নপত্র তৈরি",
        priority: "high" as const,
        deadline: "১৮ ডিসেম্বর",
      },
      {
        task: "উপস্থিতি রিপোর্ট জমা দিন",
        priority: "medium" as const,
        deadline: "২০ ডিসেম্বর",
      },
      {
        task: "ছাত্রদের পারফরম্যান্স রিভিউ",
        priority: "low" as const,
        deadline: "২৫ ডিসেম্বর",
      },
    ],
    recentActivities: [
      {
        type: "marks",
        description: "আলিম প্রথম বর্ষের আরবি সাহিত্যের মার্কস এন্ট্রি",
        time: "২ ঘন্টা আগে",
      },
      {
        type: "attendance",
        description: "তাফসীর ক্লাসের উপস্থিতি নিয়েছেন",
        time: "৪ ঘন্টা আগে",
      },
      {
        type: "homework",
        description: "নতুন হোমওয়ার্ক দিয়েছেন",
        time: "১ দিন আগে",
      },
    ],
  },
};

export const getTeacherDashboard: RequestHandler = (req, res) => {
  const teacherId = req.params.teacherId || "TCH001";

  const teacherData =
    mockTeacherData[teacherId as keyof typeof mockTeacherData];

  if (!teacherData) {
    return res.status(404).json({
      success: false,
      message: "Teacher not found",
    });
  }

  const response: TeacherDashboardResponse = teacherData;
  res.json(response);
};

export const getTeacherProfile: RequestHandler = (req, res) => {
  const teacherId = req.params.teacherId || "TCH001";

  res.json({
    success: true,
    profile: {
      name: "উস্তাদ আবদুর রহমান",
      id: "TCH001",
      designation: "সহকারী অ���্যাপক",
      department: "ইসলামিক স্টাডিজ",
      joiningDate: "২০২০-০১-১৫",
      qualification: "মাস্টার্স ইন ইসলামিক স্টাডিজ",
      experience: "৮ বছর",
      subjects: ["আরবি সাহিত্য", "তাফসীর", "হাদিস"],
      classes: ["আলিম প্রথম", "আলিম দ্বিতীয়"],
      phone: "০১৭১১২২৩৩৪৪",
      email: "ustaz.rahman@chkms.edu.bd",
      address: "মিরপুর, ঢাকা",
      salary: 45000,
      photo: "/placeholder.svg",
    },
  });
};

export const getTeacherClasses: RequestHandler = (req, res) => {
  const teacherId = req.params.teacherId || "TCH001";
  const date = req.query.date || new Date().toISOString().split("T")[0];

  const classSchedule = [
    {
      id: "CLS001",
      subject: "আরবি সাহিত্য",
      class: "আলিম প্রথম",
      section: "ক",
      time: "৯:০০ - ১০:০০",
      room: "১০১",
      status: "completed",
      students: 35,
      present: 32,
      topic: "আরবি কবিতার ছন্দ",
    },
    {
      id: "CLS002",
      subject: "তাফসীর",
      class: "আলিম দ্বিতীয়",
      section: "খ",
      time: "১১:০০ - ১২:০০",
      room: "২০৫",
      status: "ongoing",
      students: 28,
      present: 26,
      topic: "সূরা আল-বাকারার তাফসীর",
    },
    {
      id: "CLS003",
      subject: "আরবি সাহিত্য",
      class: "আলিম প্রথম",
      section: "খ",
      time: "২:০০ - ৩:০০",
      room: "১০১",
      status: "upcoming",
      students: 30,
      present: 0,
      topic: "আরবি গদ্যের বিশ্লেষণ",
    },
  ];

  res.json({
    success: true,
    date,
    classes: classSchedule,
    summary: {
      totalClasses: classSchedule.length,
      completedClasses: classSchedule.filter((c) => c.status === "completed")
        .length,
      upcomingClasses: classSchedule.filter((c) => c.status === "upcoming")
        .length,
    },
  });
};

export const markAttendance: RequestHandler = (req, res) => {
  const { classId, students } = req.body;

  // Mock attendance marking
  res.json({
    success: true,
    message: "উপস্থিতি সফলভাবে সংরক্ষিত হয��েছে",
    classId,
    markedStudents: students.length,
    timestamp: new Date().toISOString(),
  });
};

export const enterMarks: RequestHandler = (req, res) => {
  const {
    studentId,
    subjectId,
    examType,
    totalMarks,
    obtainedMarks,
    examDate,
  } = req.body;

  // Mock marks entry
  res.json({
    success: true,
    message: "মার্কস সফলভা��ে এন্ট্রি করা হয়েছে",
    markEntry: {
      studentId,
      subjectId,
      examType,
      totalMarks,
      obtainedMarks,
      percentage: ((obtainedMarks / totalMarks) * 100).toFixed(2),
      grade:
        obtainedMarks >= 80
          ? "A+"
          : obtainedMarks >= 70
            ? "A"
            : obtainedMarks >= 60
              ? "A-"
              : obtainedMarks >= 50
                ? "B"
                : "C",
      examDate,
      enteredAt: new Date().toISOString(),
    },
  });
};

export const getStudentsByClass: RequestHandler = (req, res) => {
  const classId = req.params.classId;
  const teacherId = req.params.teacherId || "TCH001";

  // Mock student list
  const students = [
    {
      id: "STD001",
      name: "মোহাম্মদ আবদুল্লাহ",
      roll: "০১",
      photo: "/placeholder.svg",
      attendance: 94.4,
      lastExamMarks: 85,
      phone: "০১৭১২৩৪৫৬৭৮",
    },
    {
      id: "STD002",
      name: "আবুল কাসেম",
      roll: "০২",
      photo: "/placeholder.svg",
      attendance: 88.2,
      lastExamMarks: 78,
      phone: "০১৭১২৩৪৫৬৭৯",
    },
    {
      id: "STD003",
      name: "মোহাম্মদ ইব্রাহিম",
      roll: "০৩",
      photo: "/placeholder.svg",
      attendance: 91.6,
      lastExamMarks: 92,
      phone: "০১৭১২৩৪৫৬৮০",
    },
  ];

  res.json({
    success: true,
    classId,
    students,
    summary: {
      totalStudents: students.length,
      averageAttendance:
        students.reduce((sum, s) => sum + s.attendance, 0) / students.length,
      averageMarks:
        students.reduce((sum, s) => sum + s.lastExamMarks, 0) / students.length,
    },
  });
};

export const createAssignment: RequestHandler = (req, res) => {
  const { title, description, dueDate, classId, subjectId } = req.body;

  res.json({
    success: true,
    message: "অ্যাসাইনমেন্ট তৈরি করা হয়েছে",
    assignment: {
      id: `ASG${Date.now()}`,
      title,
      description,
      dueDate,
      classId,
      subjectId,
      createdAt: new Date().toISOString(),
      status: "active",
    },
  });
};
