import { RequestHandler } from "express";

// Mock transport data
const mockVehicles = [
  {
    id: "VH001",
    vehicleNumber: "ঢাকা-মেট্রো-গ-১২৩৪৫৬",
    type: "বাস",
    capacity: 40,
    currentPassengers: 35,
    driverName: "আবুল হোসেন",
    driverPhone: "০১৭১১২২৩৩৪৪",
    helperName: "করিম উদ্দিন",
    route: "লক্ষ্মীপুর - ঢাকা",
    monthlyFee: 2500,
    status: "active",
    lastMaintenance: "২০২৪-১১-১৫",
    nextMaintenance: "২০২৪-১২-১৫"
  },
  {
    id: "VH002",
    vehicleNumber: "ঢাকা-মেট্রো-খ-৭৮৯১২৩",
    type: "মিনিবাস",
    capacity: 25,
    currentPassengers: 20,
    driverName: "রহিম উদ্দিন",
    driverPhone: "০১৭২২৩৩৪৪৫৫",
    helperName: "আলাউদ্দিন",
    route: "কুমিল্লা - চট্টগ্রাম",
    monthlyFee: 2000,
    status: "active",
    lastMaintenance: "২০২৪-১০-২০",
    nextMaintenance: "২০২৪-১২-২০"
  }
];

const mockRoutes = [
  {
    id: "RT001",
    name: "লক্ষ্মীপুর - ঢাকা",
    vehicleId: "VH001",
    stops: [
      { name: "মাদ্রাসা গেট", time: "৬:০০", type: "pickup" },
      { name: "লক্ষ্মীপুর বাস স্ট্যান্ড", time: "৬:৩০", type: "pickup" },
      { name: "কুমিল্লা", time: "৮:০০", type: "stop" },
      { name: "ঢাকা গুলিস্তান", time: "১১:০০", type: "destination" }
    ],
    distance: "১৮০ কিমি",
    duration: "৫ ঘন্টা",
    frequency: "দৈনিক"
  },
  {
    id: "RT002", 
    name: "কুমিল্লা - চট্টগ্রাম",
    vehicleId: "VH002",
    stops: [
      { name: "মাদ্রাসা গেট", time: "৭:০০", type: "pickup" },
      { name: "কুমিল্লা বাস স্ট��যান্ড", time: "৭:৩০", type: "pickup" },
      { name: "ফেনী", time: "৯:৩০", type: "stop" },
      { name: "চট্টগ্রাম", time: "১২:০০", type: "destination" }
    ],
    distance: "১৫০ কিমি",
    duration: "৫ ঘন্টা",
    frequency: "সাপ্তাহিক"
  }
];

const mockTransportUsers = [
  {
    id: "TU001",
    studentId: "STD001",
    studentName: "মোহাম্মদ আবদুল্লাহ",
    vehicleId: "VH001",
    routeId: "RT001",
    pickupPoint: "মাদ্রাসা গেট",
    monthlyFee: 2500,
    status: "active",
    joinDate: "২০২৪-০১-১৫",
    emergencyContact: "০১৭৮৭৬৫৪৩২১"
  },
  {
    id: "TU002",
    studentId: "STD002", 
    studentName: "আবুল কাসেম",
    vehicleId: "VH001",
    routeId: "RT001",
    pickupPoint: "লক্ষ্মীপুর বাস স্ট্যান্ড",
    monthlyFee: 2500,
    status: "active",
    joinDate: "২০২৪-০২-০১",
    emergencyContact: "০১৭৯৮৭৬৫৪৩২"
  }
];

export const getTransportDashboard: RequestHandler = (req, res) => {
  const totalVehicles = mockVehicles.length;
  const activeVehicles = mockVehicles.filter(v => v.status === 'active').length;
  const totalPassengers = mockVehicles.reduce((sum, v) => sum + v.currentPassengers, 0);
  const totalCapacity = mockVehicles.reduce((sum, v) => sum + v.capacity, 0);
  const occupancyRate = (totalPassengers / totalCapacity) * 100;
  const monthlyRevenue = mockTransportUsers.filter(u => u.status === 'active').length * 2500;

  res.json({
    success: true,
    dashboard: {
      totalVehicles,
      activeVehicles,
      totalPassengers,
      totalCapacity,
      occupancyRate: occupancyRate.toFixed(1),
      monthlyRevenue,
      totalRoutes: mockRoutes.length,
      maintenanceDue: mockVehicles.filter(v => 
        new Date(v.nextMaintenance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      ).length
    }
  });
};

export const getVehicles: RequestHandler = (req, res) => {
  const { status, type } = req.query;
  
  let filteredVehicles = [...mockVehicles];
  
  if (status && status !== 'all') {
    filteredVehicles = filteredVehicles.filter(v => v.status === status);
  }
  
  if (type && type !== 'all') {
    filteredVehicles = filteredVehicles.filter(v => v.type === type);
  }

  res.json({
    success: true,
    vehicles: filteredVehicles
  });
};

export const getVehicleDetails: RequestHandler = (req, res) => {
  const vehicleId = req.params.vehicleId;
  const vehicle = mockVehicles.find(v => v.id === vehicleId);
  
  if (!vehicle) {
    return res.status(404).json({
      success: false,
      message: "গাড়ি পাওয়া যায়নি"
    });
  }

  const vehicleUsers = mockTransportUsers.filter(u => u.vehicleId === vehicleId);
  const route = mockRoutes.find(r => r.vehicleId === vehicleId);

  res.json({
    success: true,
    vehicle: {
      ...vehicle,
      passengers: vehicleUsers,
      route,
      maintenanceHistory: [
        {
          date: "২০২৪-১১-১৫",
          type: "নিয়মিত সার্ভিসিং",
          cost: 15000,
          garage: "মোহাম্মদ গ্যারেজ"
        },
        {
          date: "২০২৪-০৯-১০",
          type: "টায়ার পরিবর্তন",
          cost: 25000,
          garage: "হাসান অটো সেন্টার"
        }
      ]
    }
  });
};

export const getRoutes: RequestHandler = (req, res) => {
  res.json({
    success: true,
    routes: mockRoutes.map(route => ({
      ...route,
      vehicle: mockVehicles.find(v => v.id === route.vehicleId),
      passengerCount: mockTransportUsers.filter(u => u.routeId === route.id).length
    }))
  });
};

export const getTransportUsers: RequestHandler = (req, res) => {
  const { vehicleId, status, routeId } = req.query;
  
  let filteredUsers = [...mockTransportUsers];
  
  if (vehicleId) {
    filteredUsers = filteredUsers.filter(u => u.vehicleId === vehicleId);
  }
  
  if (status && status !== 'all') {
    filteredUsers = filteredUsers.filter(u => u.status === status);
  }
  
  if (routeId) {
    filteredUsers = filteredUsers.filter(u => u.routeId === routeId);
  }

  res.json({
    success: true,
    users: filteredUsers.map(user => ({
      ...user,
      vehicle: mockVehicles.find(v => v.id === user.vehicleId),
      route: mockRoutes.find(r => r.id === user.routeId)
    }))
  });
};

export const addTransportUser: RequestHandler = (req, res) => {
  const { studentId, vehicleId, routeId, pickupPoint, monthlyFee } = req.body;
  
  const vehicle = mockVehicles.find(v => v.id === vehicleId);
  if (!vehicle) {
    return res.status(404).json({
      success: false,
      message: "গাড়ি পাওয়া যায়নি"
    });
  }

  if (vehicle.currentPassengers >= vehicle.capacity) {
    return res.status(400).json({
      success: false,
      message: "গাড়িতে জায়গ�� নেই"
    });
  }

  const newUser = {
    id: `TU${Date.now()}`,
    studentId,
    studentName: "নতুন শিক্ষার্থী", // Should fetch from student data
    vehicleId,
    routeId,
    pickupPoint,
    monthlyFee: Number(monthlyFee),
    status: "active",
    joinDate: new Date().toISOString().split('T')[0],
    emergencyContact: "০১৭০০০০০০০০"
  };

  mockTransportUsers.push(newUser);
  vehicle.currentPassengers += 1;

  res.json({
    success: true,
    message: "ট্রান্সপোর্ট সেবায় যোগ করা হয়েছে",
    user: newUser
  });
};

export const removeTransportUser: RequestHandler = (req, res) => {
  const { userId } = req.body;
  
  const userIndex = mockTransportUsers.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "ব্যবহারকারী পাওয়া যায়নি"
    });
  }

  const user = mockTransportUsers[userIndex];
  const vehicle = mockVehicles.find(v => v.id === user.vehicleId);
  
  if (vehicle) {
    vehicle.currentPassengers -= 1;
  }

  mockTransportUsers.splice(userIndex, 1);

  res.json({
    success: true,
    message: "ট্রান্সপোর্ট সেবা থেকে বাদ দেওয়া হয়েছে"
  });
};

export const updateVehicleMaintenance: RequestHandler = (req, res) => {
  const { vehicleId, maintenanceType, cost, garage, notes } = req.body;
  
  const vehicle = mockVehicles.find(v => v.id === vehicleId);
  if (!vehicle) {
    return res.status(404).json({
      success: false,
      message: "গাড়ি পাওয়া যায়নি"
    });
  }

  vehicle.lastMaintenance = new Date().toISOString().split('T')[0];
  
  // Set next maintenance date (30 days from now)
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 30);
  vehicle.nextMaintenance = nextDate.toISOString().split('T')[0];

  res.json({
    success: true,
    message: "রক্ষণাবেক্ষণের তথ্য আপডেট করা হয়েছে",
    maintenance: {
      vehicleId,
      date: vehicle.lastMaintenance,
      type: maintenanceType,
      cost: Number(cost),
      garage,
      notes
    }
  });
};

export const getTransportReports: RequestHandler = (req, res) => {
  const { reportType, startDate, endDate } = req.query;
  
  res.json({
    success: true,
    message: "রিপোর্ট তৈরি করা হচ্ছে",
    report: {
      id: `TRP_RPT${Date.now()}`,
      type: reportType,
      period: `${startDate} থেকে ${endDate}`,
      downloadUrl: `/api/transport/reports/TRP_RPT${Date.now()}.pdf`,
      createdAt: new Date().toISOString()
    }
  });
};

export const trackVehicle: RequestHandler = (req, res) => {
  const vehicleId = req.params.vehicleId;
  
  // Mock GPS tracking data
  const trackingData = {
    vehicleId,
    currentLocation: {
      lat: 23.7104,
      lng: 90.4074,
      address: "ঢাকা, বাংলাদেশ"
    },
    speed: 45,
    lastUpdate: new Date().toISOString(),
    route: mockRoutes.find(r => r.vehicleId === vehicleId),
    nextStop: "কুমিল্লা",
    estimatedArrival: "৮:৩০"
  };

  res.json({
    success: true,
    tracking: trackingData
  });
};
