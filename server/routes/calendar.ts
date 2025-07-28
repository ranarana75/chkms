import express from 'express';
import { CalendarEvent, AcademicCalendar, Holiday } from '../../shared/database';

const router = express.Router();

// Mock calendar data
const academicCalendar: AcademicCalendar = {
  id: '1',
  academicYear: '২০২৪-২০২৫',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  terms: [
    {
      name: 'প্রথম টার্ম',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'completed'
    },
    {
      name: 'দ্বিতীয় টার্ম',
      startDate: '2024-07-01',
      endDate: '2024-12-31',
      status: 'active'
    }
  ],
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const holidays: Holiday[] = [
  {
    id: '1',
    name: 'ঈদুল ফিতর',
    startDate: '2024-04-10',
    endDate: '2024-04-13',
    type: 'religious',
    description: 'ঈদুল ফিতর উপলক্ষে মাদ্রাসা বন্ধ থাকবে',
    isRecurring: true,
    isActive: true
  },
  {
    id: '2',
    name: 'ঈদুল আযহা',
    startDate: '2024-06-17',
    endDate: '2024-06-20',
    type: 'religious',
    description: 'ঈদুল আযহা উপলক্ষে মাদ্রাসা বন্ধ থাকবে',
    isRecurring: true,
    isActive: true
  },
  {
    id: '3',
    name: 'স্বাধীনতা দিবস',
    startDate: '2024-03-26',
    endDate: '2024-03-26',
    type: 'national',
    description: 'বাংলাদেশের স্বাধীনতা দিবস',
    isRecurring: true,
    isActive: true
  },
  {
    id: '4',
    name: 'বিজয় দিবস',
    startDate: '2024-12-16',
    endDate: '2024-12-16',
    type: 'national',
    description: 'বাংলাদেশের বিজয় দিবস',
    isRecurring: true,
    isActive: true
  },
  {
    id: '5',
    name: 'শবে বরাত',
    startDate: '2024-02-25',
    endDate: '2024-02-25',
    type: 'religious',
    description: 'শবে বরাত উপলক্ষে ছুটি',
    isRecurring: true,
    isActive: true
  }
];

const calendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা',
    description: 'মাদ্রাসার বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে',
    startDate: '2024-12-20',
    endDate: '2024-12-22',
    startTime: '08:00',
    endTime: '17:00',
    type: 'sports',
    category: 'competition',
    location: 'মাদ্রাসা খেলার মাঠ',
    organizer: 'শারীরিক শিক্ষা বিভাগ',
    targetAudience: 'students',
    status: 'scheduled',
    isPublic: true,
    attendees: [],
    resources: ['মাইক', 'পুরস্কার', 'খেলার সামগ্রী'],
    createdBy: 'admin-001',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'অভিভাবক সভা',
    description: 'ত্রৈমাসিক অভিভাবক সভা অনুষ্ঠিত হবে',
    startDate: '2024-12-15',
    endDate: '2024-12-15',
    startTime: '15:00',
    endTime: '17:00',
    type: 'meeting',
    category: 'administrative',
    location: 'মূল অডিটোরিয়াম',
    organizer: 'প্রশাসনিক বিভাগ',
    targetAudience: 'parents',
    status: 'scheduled',
    isPublic: true,
    attendees: [],
    resources: ['মাইক', 'প্রজেক্টর'],
    createdBy: 'admin-001',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'হিফজ প্রতিযোগিতা',
    description: 'বার্ষিক হিফজুল কুরআন প্রতিযোগিতা',
    startDate: '2024-12-25',
    endDate: '2024-12-25',
    startTime: '09:00',
    endTime: '12:00',
    type: 'competition',
    category: 'islamic',
    location: 'মসজিদ',
    organizer: 'হিফজ বিভাগ',
    targetAudience: 'students',
    status: 'scheduled',
    isPublic: true,
    attendees: [],
    resources: ['মাইক', 'পুরস্কার'],
    createdBy: 'teacher-001',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'শিক্ষক প্রশিক্ষণ কর্মশালা',
    description: 'আধুনিক শিক্ষা পদ্ধতি নিয়ে প্রশিক্ষণ',
    startDate: '2024-12-18',
    endDate: '2024-12-19',
    startTime: '09:00',
    endTime: '16:00',
    type: 'workshop',
    category: 'professional',
    location: 'কনফারেন্স রুম',
    organizer: 'শিক্ষা বিভাগ',
    targetAudience: 'teachers',
    status: 'scheduled',
    isPublic: false,
    attendees: [],
    resources: ['প্রশিক্ষক', 'উপকরণ'],
    createdBy: 'admin-001',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'বার্ষিক সাংস্কৃতিক অনুষ্ঠান',
    description: 'মাদ্রাসার বার্ষিক সাংস্কৃতিক অনুষ্ঠান',
    startDate: '2024-12-30',
    endDate: '2024-12-30',
    startTime: '18:00',
    endTime: '21:00',
    type: 'cultural',
    category: 'entertainment',
    location: 'মূল অডিটোরিয়াম',
    organizer: 'সাংস্কৃতিক বিভাগ',
    targetAudience: 'all',
    status: 'scheduled',
    isPublic: true,
    attendees: [],
    resources: ['সাউন্ড সিস্টেম', 'আলোকসজ্জা', 'মঞ্চ'],
    createdBy: 'admin-001',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Get calendar dashboard
router.get('/dashboard', (req, res) => {
  const now = new Date();
  const todayEvents = calendarEvents.filter(event => 
    new Date(event.startDate) <= now && 
    new Date(event.endDate) >= now &&
    event.status === 'scheduled'
  );
  
  const upcomingEvents = calendarEvents.filter(event => 
    new Date(event.startDate) > now &&
    event.status === 'scheduled'
  ).slice(0, 5);
  
  const thisMonthEvents = calendarEvents.filter(event => {
    const eventDate = new Date(event.startDate);
    return eventDate.getMonth() === now.getMonth() && 
           eventDate.getFullYear() === now.getFullYear() &&
           event.status === 'scheduled';
  });
  
  const upcomingHolidays = holidays.filter(holiday => 
    new Date(holiday.startDate) > now &&
    holiday.isActive
  ).slice(0, 3);

  res.json({
    stats: {
      todayEvents: todayEvents.length,
      upcomingEvents: upcomingEvents.length,
      thisMonthEvents: thisMonthEvents.length,
      totalHolidays: holidays.filter(h => h.isActive).length
    },
    todayEvents,
    upcomingEvents,
    upcomingHolidays,
    academicCalendar
  });
});

// Get all events
router.get('/events', (req, res) => {
  const { 
    type, 
    category, 
    targetAudience, 
    status, 
    startDate, 
    endDate,
    month,
    year
  } = req.query;
  
  let filteredEvents = calendarEvents;
  
  if (type) {
    filteredEvents = filteredEvents.filter(event => event.type === type);
  }
  
  if (category) {
    filteredEvents = filteredEvents.filter(event => event.category === category);
  }
  
  if (targetAudience) {
    filteredEvents = filteredEvents.filter(event => 
      event.targetAudience === targetAudience || event.targetAudience === 'all'
    );
  }
  
  if (status) {
    filteredEvents = filteredEvents.filter(event => event.status === status);
  }
  
  if (startDate && endDate) {
    filteredEvents = filteredEvents.filter(event => 
      new Date(event.startDate) >= new Date(startDate as string) &&
      new Date(event.endDate) <= new Date(endDate as string)
    );
  }
  
  if (month && year) {
    filteredEvents = filteredEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.getMonth() === parseInt(month as string) - 1 &&
             eventDate.getFullYear() === parseInt(year as string);
    });
  }
  
  // Sort by start date
  filteredEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
  res.json(filteredEvents);
});

// Get event by ID
router.get('/events/:id', (req, res) => {
  const { id } = req.params;
  const event = calendarEvents.find(e => e.id === id);
  
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  res.json(event);
});

// Create new event
router.post('/events', (req, res) => {
  const newEvent: CalendarEvent = {
    id: `event-${Date.now()}`,
    ...req.body,
    attendees: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  calendarEvents.push(newEvent);
  res.status(201).json(newEvent);
});

// Update event
router.put('/events/:id', (req, res) => {
  const { id } = req.params;
  const eventIndex = calendarEvents.findIndex(e => e.id === id);
  
  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  calendarEvents[eventIndex] = {
    ...calendarEvents[eventIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json(calendarEvents[eventIndex]);
});

// Delete event
router.delete('/events/:id', (req, res) => {
  const { id } = req.params;
  const eventIndex = calendarEvents.findIndex(e => e.id === id);
  
  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  calendarEvents.splice(eventIndex, 1);
  res.json({ message: 'Event deleted successfully' });
});

// Get all holidays
router.get('/holidays', (req, res) => {
  const { type, active, year } = req.query;
  
  let filteredHolidays = holidays;
  
  if (type) {
    filteredHolidays = filteredHolidays.filter(holiday => holiday.type === type);
  }
  
  if (active !== undefined) {
    filteredHolidays = filteredHolidays.filter(holiday => holiday.isActive === (active === 'true'));
  }
  
  if (year) {
    filteredHolidays = filteredHolidays.filter(holiday => 
      new Date(holiday.startDate).getFullYear() === parseInt(year as string)
    );
  }
  
  // Sort by start date
  filteredHolidays.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
  res.json(filteredHolidays);
});

// Create new holiday
router.post('/holidays', (req, res) => {
  const newHoliday: Holiday = {
    id: `holiday-${Date.now()}`,
    ...req.body,
    isActive: true
  };
  
  holidays.push(newHoliday);
  res.status(201).json(newHoliday);
});

// Get academic calendar
router.get('/academic', (req, res) => {
  res.json(academicCalendar);
});

// Update academic calendar
router.put('/academic', (req, res) => {
  const updatedCalendar = {
    ...academicCalendar,
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  Object.assign(academicCalendar, updatedCalendar);
  res.json(academicCalendar);
});

// Get monthly calendar view
router.get('/month/:year/:month', (req, res) => {
  const { year, month } = req.params;
  const targetYear = parseInt(year);
  const targetMonth = parseInt(month) - 1; // JavaScript months are 0-indexed
  
  const monthEvents = calendarEvents.filter(event => {
    const eventDate = new Date(event.startDate);
    return eventDate.getFullYear() === targetYear && 
           eventDate.getMonth() === targetMonth;
  });
  
  const monthHolidays = holidays.filter(holiday => {
    const holidayDate = new Date(holiday.startDate);
    return holidayDate.getFullYear() === targetYear && 
           holidayDate.getMonth() === targetMonth &&
           holiday.isActive;
  });
  
  res.json({
    year: targetYear,
    month: targetMonth + 1,
    events: monthEvents,
    holidays: monthHolidays
  });
});

// Get events for specific date
router.get('/date/:date', (req, res) => {
  const { date } = req.params;
  const targetDate = new Date(date);
  
  const dayEvents = calendarEvents.filter(event => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    return targetDate >= eventStart && targetDate <= eventEnd;
  });
  
  const dayHolidays = holidays.filter(holiday => {
    const holidayStart = new Date(holiday.startDate);
    const holidayEnd = new Date(holiday.endDate);
    return targetDate >= holidayStart && targetDate <= holidayEnd && holiday.isActive;
  });
  
  res.json({
    date,
    events: dayEvents,
    holidays: dayHolidays
  });
});

// Register for event
router.post('/events/:id/register', (req, res) => {
  const { id } = req.params;
  const { userId, userName } = req.body;
  
  const eventIndex = calendarEvents.findIndex(e => e.id === id);
  
  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  const event = calendarEvents[eventIndex];
  
  // Check if user is already registered
  if (event.attendees.some(attendee => attendee.userId === userId)) {
    return res.status(400).json({ error: 'User already registered' });
  }
  
  event.attendees.push({
    userId,
    userName,
    registeredAt: new Date().toISOString()
  });
  
  event.updatedAt = new Date().toISOString();
  
  res.json({ message: 'Successfully registered for event', event });
});

// Get upcoming events for user
router.get('/user/:userId/upcoming', (req, res) => {
  const { userId } = req.params;
  const now = new Date();
  
  const userEvents = calendarEvents.filter(event => 
    new Date(event.startDate) > now &&
    (event.attendees.some(attendee => attendee.userId === userId) || 
     event.targetAudience === 'all')
  );
  
  res.json(userEvents);
});

export default router;
