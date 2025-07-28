import { RequestHandler } from "express";

// Mock hostel data
const mockRooms = [
  {
    id: "RM001",
    roomNumber: "১০১",
    floor: 1,
    type: "double",
    capacity: 2,
    currentOccupancy: 2,
    monthlyFee: 3000,
    amenities: ["ফ্যান", "আলো", "ওয়ারড্রোব"],
    status: "occupied",
    residents: [
      { studentId: "STD001", name: "মোহাম্মদ আবদুল্লাহ", checkInDate: "২০২৪-০১-১৫" },
      { studentId: "STD002", name: "আবুল কাসেম", checkInDate: "২০২৪-০১-২০" }
    ]
  },
  {
    id: "RM002", 
    roomNumber: "১০২",
    floor: 1,
    type: "triple",
    capacity: 3,
    currentOccupancy: 2,
    monthlyFee: 2500,
    amenities: ["ফ্যান", "আলো", "ওয়ারড্রোব"],
    status: "available",
    residents: [
      { studentId: "STD003", name: "মোহাম্মদ ইব্রাহিম", checkInDate: "২০২৪-০২-০১" },
      { studentId: "STD004", name: "আব্দুর রহমান", checkInDate: "২০২৪-০২-০৫" }
    ]
  }
];

const mockMessData = {
  monthlyFee: 4500,
  mealPlan: {
    breakfast: "সকাল ৭:০০ - ৯:০০",
    lunch: "দুপুর ১২:৩০ - ২:৩০", 
    dinner: "সন্ধ্যা ৭:০০ - ৯:০০"
  },
  weeklyMenu: [
    {
      day: "শনিবার",
      breakfast: "রুটি, ডিম, চা",
      lunch: "ভাত, ডাল, সবজি, মাছ",
      dinner: "ভাত, তরকারি, মাংস"
    },
    {
      day: "রবিবার", 
      breakfast: "পরোটা, সবজি, চা",
      lunch: "ভাত, ডাল, ভর্তা, মাছ",
      dinner: "খিচুড়ি, ডিম"
    },
    {
      day: "সোমবার",
      breakfast: "রুটি, ভাজি, চা", 
      lunch: "ভাত, ডাল, সবজি, মুরগি",
      dinner: "ভাত, তরকারি, মাছ"
    }
  ]
};

const mockComplaints = [
  {
    id: "CMP001",
    studentId: "STD001",
    studentName: "মোহাম্মদ আবদুল্লাহ",
    roomNumber: "১০১",
    category: "বিদ্যুৎ",
    description: "রুমের ফ্যান কাজ করছে না",
    priority: "high",
    status: "pending",
    submittedDate: "২০২৪-১২-১৪",
    resolvedDate: null
  },
  {
    id: "CMP002",
    studentId: "STD003", 
    studentName: "মোহাম্মদ ইব্রাহিম",
    roomNumber: "১০২",
    category: "পানি",
    description: "বাথরুমের কল থেকে পানি আসে না",
    priority: "medium",
    status: "in_progress",
    submittedDate: "২০২৪-১২-১২",
    resolvedDate: null
  }
];

export const getHostelDashboard: RequestHandler = (req, res) => {
  const totalRooms = mockRooms.length;
  const occupiedRooms = mockRooms.filter(r => r.status === 'occupied').length;
  const availableRooms = totalRooms - occupiedRooms;
  const totalResidents = mockRooms.reduce((sum, room) => sum + room.currentOccupancy, 0);
  const occupancyRate = (totalResidents / mockRooms.reduce((sum, room) => sum + room.capacity, 0)) * 100;

  res.json({
    success: true,
    dashboard: {
      totalRooms,
      occupiedRooms,
      availableRooms,
      totalResidents,
      occupancyRate: occupancyRate.toFixed(1),
      monthlyRevenue: totalResidents * 3000, // Average fee
      pendingComplaints: mockComplaints.filter(c => c.status === 'pending').length,
      recentActivity: [
        {
          type: "check_in",
          description: "নতুন শি��্ষার্থী চেক-ইন",
          student: "মোহাম্মদ হাসান",
          room: "১০৫",
          time: "২ ঘন্টা আগে"
        },
        {
          type: "complaint", 
          description: "নতুন অভিযোগ জমা",
          student: "আবু বকর",
          room: "২০৩",
          time: "৪ ঘন্টা আগে"
        }
      ]
    }
  });
};

export const getRooms: RequestHandler = (req, res) => {
  const { floor, type, status } = req.query;
  
  let filteredRooms = [...mockRooms];
  
  if (floor) {
    filteredRooms = filteredRooms.filter(room => room.floor === Number(floor));
  }
  
  if (type && type !== 'all') {
    filteredRooms = filteredRooms.filter(room => room.type === type);
  }
  
  if (status && status !== 'all') {
    filteredRooms = filteredRooms.filter(room => room.status === status);
  }

  res.json({
    success: true,
    rooms: filteredRooms
  });
};

export const getRoomDetails: RequestHandler = (req, res) => {
  const roomId = req.params.roomId;
  const room = mockRooms.find(r => r.id === roomId);
  
  if (!room) {
    return res.status(404).json({
      success: false,
      message: "রুম পাওয়া যায়নি"
    });
  }

  res.json({
    success: true,
    room: {
      ...room,
      paymentHistory: [
        {
          month: "নভেম্বর ২০২৪",
          amount: room.monthlyFee,
          status: "paid",
          paidDate: "২০২ৄ-১১-০৫"
        },
        {
          month: "ডিসেম্বর ২০২৪",
          amount: room.monthlyFee,
          status: "pending",
          dueDate: "২০২৪-১২-০৫"
        }
      ]
    }
  });
};

export const allocateRoom: RequestHandler = (req, res) => {
  const { studentId, roomId, checkInDate } = req.body;
  
  const room = mockRooms.find(r => r.id === roomId);
  if (!room) {
    return res.status(404).json({
      success: false,
      message: "রুম পাওয়া যায়নি"
    });
  }

  if (room.currentOccupancy >= room.capacity) {
    return res.status(400).json({
      success: false,
      message: "রুমে জায়গা নেই"
    });
  }

  // Add student to room
  room.residents.push({
    studentId,
    name: "নতুন শিক্ষার্থী", // Should fetch from student data
    checkInDate
  });
  
  room.currentOccupancy += 1;
  if (room.currentOccupancy >= room.capacity) {
    room.status = "occupied";
  }

  res.json({
    success: true,
    message: "রুম বরাদ্দ সফল হয়েছে",
    allocation: {
      studentId,
      roomId,
      roomNumber: room.roomNumber,
      checkInDate,
      monthlyFee: room.monthlyFee
    }
  });
};

export const checkOutStudent: RequestHandler = (req, res) => {
  const { studentId, roomId, checkOutDate } = req.body;
  
  const room = mockRooms.find(r => r.id === roomId);
  if (!room) {
    return res.status(404).json({
      success: false,
      message: "রুম পাওয়া যায়নি"
    });
  }

  const residentIndex = room.residents.findIndex(r => r.studentId === studentId);
  if (residentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "এই রুমে শিক্ষার্থী খুঁজে পাওয়া যায়নি"
    });
  }

  // Remove student from room
  room.residents.splice(residentIndex, 1);
  room.currentOccupancy -= 1;
  room.status = "available";

  res.json({
    success: true,
    message: "চেক-আউট সফল হয়েছে",
    checkOut: {
      studentId,
      roomId,
      roomNumber: room.roomNumber,
      checkOutDate
    }
  });
};

export const getMessMenu: RequestHandler = (req, res) => {
  res.json({
    success: true,
    messData: mockMessData
  });
};

export const updateMessMenu: RequestHandler = (req, res) => {
  const { day, breakfast, lunch, dinner } = req.body;
  
  const dayMenu = mockMessData.weeklyMenu.find(menu => menu.day === day);
  if (dayMenu) {
    if (breakfast) dayMenu.breakfast = breakfast;
    if (lunch) dayMenu.lunch = lunch;
    if (dinner) dayMenu.dinner = dinner;
  }

  res.json({
    success: true,
    message: "মেনু আপডেট করা হয়েছে",
    updatedMenu: dayMenu
  });
};

export const getComplaints: RequestHandler = (req, res) => {
  const { status, priority, studentId } = req.query;
  
  let filteredComplaints = [...mockComplaints];
  
  if (status && status !== 'all') {
    filteredComplaints = filteredComplaints.filter(c => c.status === status);
  }
  
  if (priority && priority !== 'all') {
    filteredComplaints = filteredComplaints.filter(c => c.priority === priority);
  }
  
  if (studentId) {
    filteredComplaints = filteredComplaints.filter(c => c.studentId === studentId);
  }

  res.json({
    success: true,
    complaints: filteredComplaints
  });
};

export const submitComplaint: RequestHandler = (req, res) => {
  const { studentId, roomNumber, category, description, priority } = req.body;
  
  const newComplaint = {
    id: `CMP${Date.now()}`,
    studentId,
    studentName: "শিক্ষার্থী নাম", // Should fetch from student data
    roomNumber,
    category,
    description,
    priority: priority || 'medium',
    status: 'pending',
    submittedDate: new Date().toISOString().split('T')[0],
    resolvedDate: null,
    resolution: null,
    resolvedBy: null
  };

  mockComplaints.push(newComplaint);

  res.json({
    success: true,
    message: "অভিযোগ জমা দেওয়া হয়েছে",
    complaint: newComplaint
  });
};

export const resolveComplaint: RequestHandler = (req, res) => {
  const { complaintId, resolution, resolvedBy } = req.body;
  
  const complaint = mockComplaints.find(c => c.id === complaintId);
  if (!complaint) {
    return res.status(404).json({
      success: false,
      message: "অভিযোগ পাওয়া যায়নি"
    });
  }

  (complaint as any).status = 'resolved';
  (complaint as any).resolvedDate = new Date().toISOString().split('T')[0];
  (complaint as any).resolution = resolution;
  (complaint as any).resolvedBy = resolvedBy;

  res.json({
    success: true,
    message: "অভিযোগ সমাধান করা হয়েছে",
    complaint
  });
};

export const getHostelReports: RequestHandler = (req, res) => {
  const { reportType, startDate, endDate } = req.query;
  
  res.json({
    success: true,
    message: "রিপোর্ট তৈরি করা হচ্ছে",
    report: {
      id: `HST_RPT${Date.now()}`,
      type: reportType,
      period: `${startDate} থেকে ${endDate}`,
      downloadUrl: `/api/hostel/reports/HST_RPT${Date.now()}.pdf`,
      createdAt: new Date().toISOString()
    }
  });
};
