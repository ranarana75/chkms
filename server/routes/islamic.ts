import { RequestHandler } from "express";

// Mock Islamic data
const mockHifzData = [
  {
    id: "HFZ001",
    studentId: "STD001",
    studentName: "মোহাম্মদ আবদুল্লাহ",
    surahName: "সূরা আল-ফাতিহা",
    surahNumber: 1,
    ayahFrom: 1,
    ayahTo: 7,
    completedDate: "২০২৪-০৯-১৫",
    grade: "excellent",
    teacherId: "TCH001",
    teacherName: "উস্তাদ আবদুর রহমান",
    remarks: "খুবই সুন্দর তিলাওয়াত"
  },
  {
    id: "HFZ002",
    studentId: "STD001",
    studentName: "মোহাম্মদ আবদুল্লাহ",
    surahName: "সূরা আল-বাকারা",
    surahNumber: 2,
    ayahFrom: 1,
    ayahTo: 50,
    completedDate: "২০২৪-১০-২০",
    grade: "good",
    teacherId: "TCH001",
    teacherName: "উস্তাদ আবদুর রহমান",
    remarks: "তাজবীদ আরো উন্নতি করতে হবে"
  }
];

const mockAkhlaqData = [
  {
    id: "AKH001",
    studentId: "STD001",
    studentName: "মোহাম্মদ আবদুল্লাহ",
    category: "সততা",
    points: 10,
    reason: "পরীক্ষায় অসততা না করা",
    awardedBy: "TCH001",
    teacherName: "উস্তাদ আবদুর রহমান",
    date: "২০২৪-১২-১০"
  },
  {
    id: "AKH002",
    studentId: "STD001",
    studentName: "মোহাম্মদ আবদুল্লাহ",
    category: "সহযোগিতা",
    points: 8,
    reason: "নতুন ছাত্রকে সাহায্য করা",
    awardedBy: "TCH002",
    teacherName: "উস্তাদ আহমদ",
    date: "২০২৪-১২-০৮"
  }
];

export const getPrayerTimes: RequestHandler = (req, res) => {
  const { date = new Date().toISOString().split('T')[0] } = req.query;
  
  // Mock prayer times for Lakshmipur, Bangladesh
  const prayerTimes = {
    date,
    location: "লক্ষ্মীপুর, বাংলাদ��শ",
    times: {
      fajr: "৫:১৫",
      sunrise: "৬:৩৫",
      dhuhr: "১১:৫৫",
      asr: "৩:৩০",
      maghrib: "৫:১০",
      isha: "৬:৩৫"
    },
    hijriDate: "১৫ জমাদিউল আওয়াল ১৪৪৬",
    islamicEvents: [
      {
        name: "জুমুআহ",
        description: "সাপ্তাহিক জুমার নামাজ",
        time: "১২:৩০"
      }
    ]
  };

  res.json({
    success: true,
    prayerTimes
  });
};

export const getHifzProgress: RequestHandler = (req, res) => {
  const { studentId } = req.params;
  
  const studentProgress = mockHifzData.filter(h => h.studentId === studentId);
  
  const totalSurahs = 114;
  const completedSurahs = studentProgress.length;
  const percentage = (completedSurahs / totalSurahs) * 100;
  
  // Calculate current para (assuming 30 paras total)
  const completedParas = Math.floor(completedSurahs / 4); // Rough calculation
  
  res.json({
    success: true,
    hifzProgress: {
      studentId,
      totalSurahs,
      completedSurahs,
      completedParas,
      totalParas: 30,
      percentage: percentage.toFixed(1),
      currentSurah: completedSurahs < totalSurahs ? `সূরা নং ${completedSurahs + 1}` : "সম্পূর্ণ",
      recentProgress: studentProgress.slice(-5),
      gradeDistribution: {
        excellent: studentProgress.filter(p => p.grade === 'excellent').length,
        good: studentProgress.filter(p => p.grade === 'good').length,
        average: studentProgress.filter(p => p.grade === 'average').length,
        needs_improvement: studentProgress.filter(p => p.grade === 'needs_improvement').length
      }
    }
  });
};

export const addHifzProgress: RequestHandler = (req, res) => {
  const { studentId, surahName, surahNumber, ayahFrom, ayahTo, grade, teacherId, remarks } = req.body;
  
  const newProgress = {
    id: `HFZ${Date.now()}`,
    studentId,
    studentName: "মোহাম্মদ আবদুল্লাহ", // Should fetch from student data
    surahName,
    surahNumber: Number(surahNumber),
    ayahFrom: Number(ayahFrom),
    ayahTo: Number(ayahTo),
    completedDate: new Date().toISOString().split('T')[0],
    grade,
    teacherId,
    teacherName: "উস্তাদ আবদুর রহমান", // Should fetch from teacher data
    remarks
  };

  mockHifzData.push(newProgress);

  res.json({
    success: true,
    message: "হিফজ অগ্রগতি সফলভাবে যোগ করা হয়েছে",
    progress: newProgress
  });
};

export const getAkhlaqPoints: RequestHandler = (req, res) => {
  const { studentId } = req.params;
  
  const studentAkhlaq = mockAkhlaqData.filter(a => a.studentId === studentId);
  const totalPoints = studentAkhlaq.reduce((sum, a) => sum + a.points, 0);
  
  // Calculate level based on points
  let level = "ব্রোঞ্জ";
  let nextLevelPoints = 50;
  
  if (totalPoints >= 200) {
    level = "ডায়মন্ড";
    nextLevelPoints = null;
  } else if (totalPoints >= 150) {
    level = "প্ল্যাটিনাম";
    nextLevelPoints = 200;
  } else if (totalPoints >= 100) {
    level = "গোল্ড";
    nextLevelPoints = 150;
  } else if (totalPoints >= 50) {
    level = "সিলভার";
    nextLevelPoints = 100;
  }

  const categoryStats = {};
  studentAkhlaq.forEach(item => {
    if (!categoryStats[item.category]) {
      categoryStats[item.category] = 0;
    }
    categoryStats[item.category] += item.points;
  });

  res.json({
    success: true,
    akhlaqData: {
      studentId,
      totalPoints,
      level,
      nextLevelPoints,
      recentActivities: studentAkhlaq.slice(-10),
      categoryStats,
      monthlyProgress: [
        { month: "অক্টোবর", points: 15 },
        { month: "নভেম্বর", points: 22 },
        { month: "ডিসেম্বর", points: 18 }
      ]
    }
  });
};

export const addAkhlaqPoints: RequestHandler = (req, res) => {
  const { studentId, category, points, reason, awardedBy } = req.body;
  
  const newAkhlaq = {
    id: `AKH${Date.now()}`,
    studentId,
    studentName: "মোহাম্মদ আবদুল্লাহ", // Should fetch from student data
    category,
    points: Number(points),
    reason,
    awardedBy,
    teacherName: "উস্তাদ আবদুর রহমান", // Should fetch from teacher data
    date: new Date().toISOString().split('T')[0]
  };

  mockAkhlaqData.push(newAkhlaq);

  res.json({
    success: true,
    message: "আখলাক পয়েন্ট সফলভাবে যোগ করা হয়েছে",
    akhlaq: newAkhlaq
  });
};

export const getIslamicEvents: RequestHandler = (req, res) => {
  const { month = new Date().getMonth() + 1, year = new Date().getFullYear() } = req.query;
  
  const islamicEvents = [
    {
      id: "EVT001",
      name: "মাসিক ওয়াজ মাহফিল",
      type: "ওয়াজ",
      date: "২০২৪-১২-২০",
      time: "আসরের পর",
      speaker: "ম���ওলানা আবুল হাসান",
      venue: "মূল হল",
      description: "মাসিক ইসলামিক আলোচনা সভা"
    },
    {
      id: "EVT002",
      name: "হিফজ প্রতিযোগিতা",
      type: "প্রতিযোগিতা",
      date: "২০২৪-১২-২৫",
      time: "সকাল ১০:০০",
      venue: "মসজিদ",
      description: "বার্ষিক কুরআন তিলাওয়াত প্রতিযোগিতা"
    },
    {
      id: "EVT003",
      name: "ইসলামিক কুইজ",
      type: "কুইজ",
      date: "২০২৪-১২-৩০",
      time: "বিকাল ৩:০০",
      venue: "ক্লাসরুম-১",
      description: "ইসলামিক জ্ঞান বিষয়ক কুইজ প্রতিযোগিতা"
    }
  ];

  res.json({
    success: true,
    events: islamicEvents
  });
};

export const getIslamicCalendar: RequestHandler = (req, res) => {
  const { month = new Date().getMonth() + 1, year = new Date().getFullYear() } = req.query;
  
  const calendar = {
    hijriMonth: "জমাদিউল আওয়াল",
    hijriYear: "১৪৪৬",
    gregorianMonth: month,
    gregorianYear: year,
    importantDates: [
      {
        date: "২০২৪-১২-১৫",
        hijriDate: "১৫ জমাদিউল আওয়াল",
        significance: "জুমুআহ",
        type: "weekly"
      },
      {
        date: "২০২৪-১২-২২",
        hijriDate: "২২ জমাদিউল আওয়াল",
        significance: "জুমুআহ",
        type: "weekly"
      },
      {
        date: "২০২৪-১২-২৯",
        hijriDate: "২৯ জমাদিউল আওয়াল",
        significance: "জুমুআহ",
        type: "weekly"
      }
    ]
  };

  res.json({
    success: true,
    calendar
  });
};

export const getTajweedLessons: RequestHandler = (req, res) => {
  const lessons = [
    {
      id: "TJW001",
      title: "মাখরাজ (উচ্চারণস্থান)",
      description: "আরবি বর্ণের সঠিক উচ্চারণস্থান",
      level: "শুরুর পর্যায়",
      duration: "৩০ মিনিট",
      topics: ["মাখরাজুল হুরুফ", "১৭টি মাখরাজ", "সঠিক উচ্চারণ"]
    },
    {
      id: "TJW002", 
      title: "সিফাত (বর্ণের গুণাবলী)",
      description: "আরবি বর্ণের বিশেষ গুণাবলী",
      level: "মধ্যম পর্যায়",
      duration: "৪৫ মিনিট",
      topics: ["লাযিমাহ সিফাত", "আরিযাহ সিফাত", "বিপরীত সিফাত"]
    },
    {
      id: "TJW003",
      title: "আহকামুল মাদ্দ",
      description: "দীর্ঘকরণের নিয়মাবলী",
      level: "উন্নত পর্যায়",
      duration: "৬০ মিনিট",
      topics: ["মাদ্দ তবীয়ী", "মাদ্দ ফার্ঈ", "মাদ্দের পরিমাণ"]
    }
  ];

  res.json({
    success: true,
    lessons
  });
};
