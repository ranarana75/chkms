import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocalStorage, useNotifications } from '@/hooks/useLocalData';
import { Calendar, Clock, Users, Plus, Edit, Trash2, MapPin, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'class' | 'exam' | 'meeting' | 'holiday' | 'event' | 'prayer' | 'lecture';
  priority: 'high' | 'medium' | 'low';
  location: string;
  organizer: string;
  participants: string[];
  recurring: 'none' | 'daily' | 'weekly' | 'monthly';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  reminderMinutes: number;
  createdAt: string;
}

interface Schedule {
  id: string;
  dayOfWeek: string;
  className: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  semester: string;
  isActive: boolean;
}

interface CalendarStats {
  totalEvents: number;
  todayEvents: number;
  weekEvents: number;
  upcomingEvents: number;
  completedEvents: number;
  recurringEvents: number;
}

const daysOfWeek = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'];
const months = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

export default function CalendarDashboard() {
  const [events, setEvents] = useLocalData<CalendarEvent[]>('calendarEvents', []);
  const [schedules, setSchedules] = useLocalData<Schedule[]>('classSchedules', []);
  const [stats, setStats] = useState<CalendarStats>({
    totalEvents: 0,
    todayEvents: 0,
    weekEvents: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    recurringEvents: 0
  });

  const { addNotification } = useNotifications();
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  // Initialize with sample data if empty
  useEffect(() => {
    if (events.length === 0) {
      const sampleEvents: CalendarEvent[] = [
        {
          id: '1',
          title: 'বার্ষিক পরীক্ষা শুরু',
          description: 'সকল শ্রেণীর বার্ষিক পরীক্ষা শুরু হবে',
          date: '2024-02-15',
          startTime: '09:00',
          endTime: '17:00',
          type: 'exam',
          priority: 'high',
          location: 'পরীক্ষা হল',
          organizer: 'পরীক্ষা নিয়ন্ত্রক',
          participants: ['সকল শিক্ষার্থী'],
          recurring: 'none',
          status: 'scheduled',
          reminderMinutes: 60,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'শিক্ষক সভা',
          description: 'মাসিক শিক্ষক সভা ও পাঠ্যক্রম পর্যালোচনা',
          date: '2024-02-10',
          startTime: '14:00',
          endTime: '16:00',
          type: 'meeting',
          priority: 'medium',
          location: 'সভা কক্ষ',
          organizer: 'প্রধান শিক্ষক',
          participants: ['সকল শিক্ষক'],
          recurring: 'monthly',
          status: 'scheduled',
          reminderMinutes: 30,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'জুমার নামাজ',
          description: 'সাপ্তাহিক জুমার নামাজ ও খুতবা',
          date: '2024-02-09',
          startTime: '12:30',
          endTime: '13:15',
          type: 'prayer',
          priority: 'high',
          location: 'মাদ্রাসা মসজিদ',
          organizer: 'ইমাম সাহেব',
          participants: ['সকল শিক্ষার্থী ও শিক্ষক'],
          recurring: 'weekly',
          status: 'completed',
          reminderMinutes: 15,
          createdAt: new Date().toISOString()
        }
      ];
      setEvents(sampleEvents);

      const sampleSchedules: Schedule[] = [
        {
          id: '1',
          dayOfWeek: 'রবি',
          className: 'আলিম ১ম বর্ষ',
          subject: 'হাদিস শরীফ',
          teacher: 'মাওলানা আব্দুল্লাহ',
          room: 'কক্ষ ১০১',
          startTime: '08:00',
          endTime: '09:00',
          semester: 'প্রথম সেমিস্টার',
          isActive: true
        },
        {
          id: '2',
          dayOfWeek: 'রবি',
          className: 'ফাজিল ১ম বর্ষ',
          subject: 'তাফসীর',
          teacher: 'মাওলানা আবু বকর',
          room: 'কক্ষ ২০১',
          startTime: '09:00',
          endTime: '10:00',
          semester: 'প্রথম সেমিস্টার',
          isActive: true
        },
        {
          id: '3',
          dayOfWeek: 'সোম',
          className: 'কামিল ১ম বর্ষ',
          subject: 'ফিকাহ',
          teacher: 'মাওলানা আবুল কাসেম',
          room: 'কক্ষ ৩০১',
          startTime: '10:00',
          endTime: '11:00',
          semester: 'প্রথম সেমিস্টার',
          isActive: true
        }
      ];
      setSchedules(sampleSchedules);
    }
  }, [events.length, setEvents, setSchedules]);

  // Calculate stats
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const totalEvents = events.length;
    const todayEvents = events.filter(e => e.date === today).length;
    const weekEvents = events.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate >= weekStart && eventDate <= weekEnd;
    }).length;
    const upcomingEvents = events.filter(e => e.status === 'scheduled' && new Date(e.date) >= new Date()).length;
    const completedEvents = events.filter(e => e.status === 'completed').length;
    const recurringEvents = events.filter(e => e.recurring !== 'none').length;

    setStats({
      totalEvents,
      todayEvents,
      weekEvents,
      upcomingEvents,
      completedEvents,
      recurringEvents
    });
  }, [events]);

  const handleAddEvent = (eventData: Omit<CalendarEvent, 'id' | 'createdAt'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setEvents([...events, newEvent]);
    addNotification('ইভেন্ট সফলভাবে যোগ করা হয়েছে', 'success');
    setIsEventDialogOpen(false);
  };

  const handleAddSchedule = (scheduleData: Omit<Schedule, 'id'>) => {
    const newSchedule: Schedule = {
      ...scheduleData,
      id: Date.now().toString()
    };
    setSchedules([...schedules, newSchedule]);
    addNotification('ক্লাস রুটিন সফলভাবে যোগ করা হয়েছে', 'success');
    setIsScheduleDialogOpen(false);
  };

  const handleEditEvent = (eventData: Omit<CalendarEvent, 'id' | 'createdAt'>) => {
    if (editingEvent) {
      const updatedEvents = events.map(e => 
        e.id === editingEvent.id 
          ? { ...e, ...eventData }
          : e
      );
      setEvents(updatedEvents);
      addNotification('ইভেন্ট আপডেট হয়েছে', 'success');
      setEditingEvent(null);
      setIsEventDialogOpen(false);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    const updatedEvents = events.filter(e => e.id !== eventId);
    setEvents(updatedEvents);
    addNotification('ইভেন্ট মুছে ফেলা হয়েছে', 'success');
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    const updatedSchedules = schedules.filter(s => s.id !== scheduleId);
    setSchedules(updatedSchedules);
    addNotification('ক্লাস রুটিন মুছে ফেলা হয়েছে', 'success');
  };

  const updateEventStatus = (eventId: string, newStatus: 'scheduled' | 'ongoing' | 'completed' | 'cancelled') => {
    const updatedEvents = events.map(event =>
      event.id === eventId ? { ...event, status: newStatus } : event
    );
    setEvents(updatedEvents);
    addNotification('ইভেন্ট স্ট্যাটাস আপডেট হয়েছে', 'success');
  };

  const getEventsForDate = (date: string) => {
    return events.filter(e => e.date === date).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getSchedulesForDay = (dayOfWeek: string) => {
    return schedules.filter(s => s.dayOfWeek === dayOfWeek && s.isActive).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getTypeBadge = (type: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      class: "default",
      exam: "destructive",
      meeting: "secondary",
      holiday: "outline",
      event: "default",
      prayer: "secondary",
      lecture: "outline"
    };
    
    const labels: { [key: string]: string } = {
      class: 'ক্লাস',
      exam: 'পরীক্ষা',
      meeting: 'সভা',
      holiday: 'ছুটি',
      event: 'অনুষ্ঠান',
      prayer: 'নামাজ',
      lecture: 'বক্তব্য'
    };

    return (
      <Badge variant={variants[type] || "secondary"}>
        {labels[type] || type}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      scheduled: "outline",
      ongoing: "default",
      completed: "secondary",
      cancelled: "destructive"
    };
    
    const labels: { [key: string]: string } = {
      scheduled: 'নির্ধারিত',
      ongoing: 'চলমান',
      completed: 'সম্পন্ন',
      cancelled: 'বাতিল'
    };

    return (
      <Badge variant={variants[status] || "secondary"}>
        {labels[status] || status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      high: "destructive",
      medium: "default",
      low: "secondary"
    };
    
    const labels: { [key: string]: string } = {
      high: 'উচ্চ',
      medium: 'মধ্যম',
      low: 'নিম্ন'
    };

    return (
      <Badge variant={variants[priority] || "secondary"}>
        {labels[priority] || priority}
      </Badge>
    );
  };

  const renderCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const calendarDays = [];
    const currentDateString = new Date().toISOString().split('T')[0];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      const dayEvents = getEventsForDate(dateString);
      const isCurrentMonth = date.getMonth() === month;
      const isToday = dateString === currentDateString;

      calendarDays.push(
        <div
          key={dateString}
          className={`p-2 min-h-[100px] border border-gray-200 cursor-pointer hover:bg-gray-50 ${
            !isCurrentMonth ? 'bg-gray-100 text-gray-400' : 'bg-white'
          } ${isToday ? 'bg-blue-50 border-blue-300' : ''}`}
          onClick={() => setSelectedDate(dateString)}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : ''}`}>
            {date.getDate()}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded truncate ${
                  event.type === 'exam' ? 'bg-red-100 text-red-700' :
                  event.type === 'meeting' ? 'bg-blue-100 text-blue-700' :
                  event.type === 'prayer' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}
              >
                {event.startTime} {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 3} আরো</div>
            )}
          </div>
        </div>
      );
    }

    return calendarDays;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100" style={{ fontFamily: '"Noto Serif Bengali", serif' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">ক্যালেন্ডার ড্যাশবোর্ড</h1>
          <p className="text-emerald-600">ইভেন্ট ব্যবস্থাপনা ও সময়সূচি</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">আজকের ইভেন্ট</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{stats.todayEvents}</div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">এই সপ্তাহে</CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{stats.weekEvents}</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">আসন্ন</CardTitle>
              <Bell className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{stats.upcomingEvents}</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">সম্পন্ন</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{stats.completedEvents}</div>
            </CardContent>
          </Card>

          <Card className="bg-indigo-50 border-indigo-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-indigo-700">নিয়মিত</CardTitle>
              <Calendar className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-800">{stats.recurringEvents}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">মোট ইভেন্ট</CardTitle>
              <Calendar className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stats.totalEvents}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calendar">ক্যালেন্ডার</TabsTrigger>
            <TabsTrigger value="events">ইভেন্ট তালিকা</TabsTrigger>
            <TabsTrigger value="schedule">ক্লাস রুটিন</TabsTrigger>
          </TabsList>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-2xl font-semibold text-emerald-800">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <Button variant="outline" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন ইভেন্ট
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingEvent ? 'ইভেন্ট সম্পাদনা' : 'নতুন ইভেন্ট যোগ'}</DialogTitle>
                    <DialogDescription>
                      ইভেন্টের বিস্তারিত তথ্য পূরণ করুন
                    </DialogDescription>
                  </DialogHeader>
                  <EventForm 
                    event={editingEvent}
                    onSubmit={editingEvent ? handleEditEvent : handleAddEvent}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-7 border-b">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="p-3 text-center font-medium bg-gray-50 border-r">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {renderCalendarGrid()}
                </div>
              </CardContent>
            </Card>

            {/* Selected Date Events */}
            {selectedDate && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {new Date(selectedDate).toLocaleDateString('bn-BD')} - এর ইভেন্ট সমূহ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getEventsForDate(selectedDate).map((event) => (
                      <div key={event.id} className="flex justify-between items-center p-3 border rounded">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{event.title}</h4>
                            {getTypeBadge(event.type)}
                            {getStatusBadge(event.status)}
                            {getPriorityBadge(event.priority)}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span><Clock className="w-3 h-3 inline mr-1" />{event.startTime} - {event.endTime}</span>
                            <span><MapPin className="w-3 h-3 inline mr-1" />{event.location}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Select
                            value={event.status}
                            onValueChange={(value: 'scheduled' | 'ongoing' | 'completed' | 'cancelled') => updateEventStatus(event.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="scheduled">নির্ধারিত</SelectItem>
                              <SelectItem value="ongoing">চলমান</SelectItem>
                              <SelectItem value="completed">সম্পন্ন</SelectItem>
                              <SelectItem value="cancelled">বাতিল</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingEvent(event);
                              setIsEventDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {getEventsForDate(selectedDate).length === 0 && (
                      <p className="text-center text-gray-500 py-4">এই তারিখে কোন ইভেন্ট নেই</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-emerald-800">সকল ইভেন্ট</h2>
              <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন ইভেন্ট
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>নতুন ইভেন্ট যোগ</DialogTitle>
                    <DialogDescription>
                      ইভেন্টের বিস্তারিত তথ্য পূরণ করুন
                    </DialogDescription>
                  </DialogHeader>
                  <EventForm onSubmit={handleAddEvent} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                          {getTypeBadge(event.type)}
                          {getStatusBadge(event.status)}
                          {getPriorityBadge(event.priority)}
                        </div>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">
                              <Calendar className="w-4 h-4 inline mr-1" />
                              {new Date(event.date).toLocaleDateString('bn-BD')}
                            </p>
                            <p className="text-gray-600 mb-1">
                              <Clock className="w-4 h-4 inline mr-1" />
                              {event.startTime} - {event.endTime}
                            </p>
                            <p className="text-gray-600">
                              <MapPin className="w-4 h-4 inline mr-1" />
                              {event.location}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">আয়��জক: {event.organizer}</p>
                            <p className="text-gray-600 mb-1">রিমাইন্ডার: {event.reminderMinutes} মিনিট আগে</p>
                            {event.recurring !== 'none' && (
                              <Badge variant="outline">নিয়মিত: {event.recurring}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingEvent(event);
                            setIsEventDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-emerald-800">সাপ্তাহিক ক্লাস রুটিন</h2>
              <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন ক্লাস
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>নতুন ক্লাস রুটিন যোগ</DialogTitle>
                    <DialogDescription>
                      ক্লাসের বিস্তারিত তথ্য পূরণ করুন
                    </DialogDescription>
                  </DialogHeader>
                  <ScheduleForm onSubmit={handleAddSchedule} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {daysOfWeek.map((day) => {
                const daySchedules = getSchedulesForDay(day);
                return (
                  <Card key={day}>
                    <CardHeader>
                      <CardTitle className="text-lg">{day}বার - {daySchedules.length} টি ক্লাস</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {daySchedules.length > 0 ? (
                        <div className="space-y-3">
                          {daySchedules.map((schedule) => (
                            <div key={schedule.id} className="flex justify-between items-center p-3 border rounded">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium">{schedule.subject}</h4>
                                  <Badge variant="outline">{schedule.className}</Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span><Clock className="w-3 h-3 inline mr-1" />{schedule.startTime} - {schedule.endTime}</span>
                                  <span><Users className="w-3 h-3 inline mr-1" />{schedule.teacher}</span>
                                  <span><MapPin className="w-3 h-3 inline mr-1" />{schedule.room}</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteSchedule(schedule.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 py-4">এই দিনে কোন ক্লাস নেই</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function EventForm({ 
  event, 
  onSubmit 
}: { 
  event?: CalendarEvent | null;
  onSubmit: (data: Omit<CalendarEvent, 'id' | 'createdAt'>) => void;
}) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date || new Date().toISOString().split('T')[0],
    startTime: event?.startTime || '09:00',
    endTime: event?.endTime || '10:00',
    type: event?.type || 'event' as const,
    priority: event?.priority || 'medium' as const,
    location: event?.location || '',
    organizer: event?.organizer || '',
    participants: event?.participants || [],
    recurring: event?.recurring || 'none' as const,
    status: event?.status || 'scheduled' as const,
    reminderMinutes: event?.reminderMinutes || 30
  });

  const [newParticipant, setNewParticipant] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addParticipant = () => {
    if (newParticipant.trim()) {
      setFormData({...formData, participants: [...formData.participants, newParticipant.trim()]});
      setNewParticipant('');
    }
  };

  const removeParticipant = (index: number) => {
    setFormData({...formData, participants: formData.participants.filter((_, i) => i !== index)});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">ইভেন্টের নাম</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="বার্ষিক পরীক্ষা"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">ধরন</Label>
          <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="class">ক্লাস</SelectItem>
              <SelectItem value="exam">পরীক্ষা</SelectItem>
              <SelectItem value="meeting">সভা</SelectItem>
              <SelectItem value="holiday">ছুটি</SelectItem>
              <SelectItem value="event">অনুষ্ঠান</SelectItem>
              <SelectItem value="prayer">নামাজ</SelectItem>
              <SelectItem value="lecture">বক্তব্য</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">বিবরণ</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="ইভেন্টের বিস্তারিত বিবরণ..."
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">তারিখ</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startTime">শুরুর সময়</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({...formData, startTime: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">শেষের সময়</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({...formData, endTime: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">স্থান</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            placeholder="পরীক্ষা হল"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="organizer">আয়োজক</Label>
          <Input
            id="organizer"
            value={formData.organizer}
            onChange={(e) => setFormData({...formData, organizer: e.target.value})}
            placeholder="প্রধান শিক্ষক"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority">অগ্রাধিকার</Label>
          <Select value={formData.priority} onValueChange={(value: any) => setFormData({...formData, priority: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">উচ্চ</SelectItem>
              <SelectItem value="medium">মধ্যম</SelectItem>
              <SelectItem value="low">নিম্ন</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="recurring">পুনরাবৃত্তি</Label>
          <Select value={formData.recurring} onValueChange={(value: any) => setFormData({...formData, recurring: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">নেই</SelectItem>
              <SelectItem value="daily">দৈনিক</SelectItem>
              <SelectItem value="weekly">সাপ্তাহিক</SelectItem>
              <SelectItem value="monthly">মাসিক</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="reminderMinutes">রিমাইন্ডার (মিনিট)</Label>
          <Input
            id="reminderMinutes"
            type="number"
            value={formData.reminderMinutes}
            onChange={(e) => setFormData({...formData, reminderMinutes: parseInt(e.target.value)})}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>অংশগ্রহণকারী</Label>
        <div className="flex gap-2">
          <Input
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
            placeholder="অংশগ্রহণকারীর নাম"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addParticipant())}
          />
          <Button type="button" onClick={addParticipant} variant="outline">
            যোগ করুন
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.participants.map((participant, index) => (
            <Badge key={index} variant="outline" className="cursor-pointer" onClick={() => removeParticipant(index)}>
              {participant} ×
            </Badge>
          ))}
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          {event ? 'আপডেট করুন' : 'ইভেন্ট যোগ করুন'}
        </Button>
      </DialogFooter>
    </form>
  );
}

function ScheduleForm({ onSubmit }: { onSubmit: (data: Omit<Schedule, 'id'>) => void }) {
  const [formData, setFormData] = useState({
    dayOfWeek: '',
    className: '',
    subject: '',
    teacher: '',
    room: '',
    startTime: '08:00',
    endTime: '09:00',
    semester: 'প্রথম সেমিস্টার',
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dayOfWeek">সপ্তাহের দিন</Label>
          <Select value={formData.dayOfWeek} onValueChange={(value) => setFormData({...formData, dayOfWeek: value})}>
            <SelectTrigger>
              <SelectValue placeholder="দিন নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {daysOfWeek.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}বার
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="className">শ্রেণী</Label>
          <Input
            id="className"
            value={formData.className}
            onChange={(e) => setFormData({...formData, className: e.target.value})}
            placeholder="আলিম ১ম বর্ষ"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subject">বিষয়</Label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            placeholder="হাদিস শরীফ"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacher">শিক্ষক</Label>
          <Input
            id="teacher"
            value={formData.teacher}
            onChange={(e) => setFormData({...formData, teacher: e.target.value})}
            placeholder="মাওলানা আব্দুল্লাহ"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="room">কক্ষ</Label>
          <Input
            id="room"
            value={formData.room}
            onChange={(e) => setFormData({...formData, room: e.target.value})}
            placeholder="কক্ষ ১০১"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startTime">শুরুর সময়</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({...formData, startTime: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">শেষের সময়</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({...formData, endTime: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="semester">সেমিস্টার</Label>
        <Input
          id="semester"
          value={formData.semester}
          onChange={(e) => setFormData({...formData, semester: e.target.value})}
          placeholder="প্রথম সেমিস্টার"
          required
        />
      </div>

      <DialogFooter>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          ক্লাস যোগ করুন
        </Button>
      </DialogFooter>
    </form>
  );
}
