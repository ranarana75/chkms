import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Calendar, Clock, MapPin, Users, Gift, Plus, Eye, Edit, Trash2, CalendarDays } from 'lucide-react';
import { CalendarEvent, Holiday, AcademicCalendar } from '../../shared/database';

interface CalendarStats {
  todayEvents: number;
  upcomingEvents: number;
  thisMonthEvents: number;
  totalHolidays: number;
}

interface DashboardData {
  stats: CalendarStats;
  todayEvents: CalendarEvent[];
  upcomingEvents: CalendarEvent[];
  upcomingHolidays: Holiday[];
  academicCalendar: AcademicCalendar;
}

const CalendarDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isCreateHolidayOpen, setIsCreateHolidayOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    type: '',
    category: '',
    location: '',
    organizer: '',
    targetAudience: ''
  });
  const [newHoliday, setNewHoliday] = useState({
    name: '',
    startDate: '',
    endDate: '',
    type: '',
    description: ''
  });

  useEffect(() => {
    fetchDashboardData();
    fetchEvents();
    fetchHolidays();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/calendar/dashboard');
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/calendar/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchHolidays = async () => {
    try {
      const response = await fetch('/api/calendar/holidays');
      const data = await response.json();
      setHolidays(data);
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };

  const handleCreateEvent = async () => {
    try {
      const response = await fetch('/api/calendar/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newEvent,
          status: 'scheduled',
          isPublic: true,
          createdBy: 'admin-001'
        }),
      });

      if (response.ok) {
        setIsCreateEventOpen(false);
        setNewEvent({
          title: '',
          description: '',
          startDate: '',
          endDate: '',
          startTime: '',
          endTime: '',
          type: '',
          category: '',
          location: '',
          organizer: '',
          targetAudience: ''
        });
        fetchEvents();
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleCreateHoliday = async () => {
    try {
      const response = await fetch('/api/calendar/holidays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newHoliday,
          isRecurring: false
        }),
      });

      if (response.ok) {
        setIsCreateHolidayOpen(false);
        setNewHoliday({
          name: '',
          startDate: '',
          endDate: '',
          type: '',
          description: ''
        });
        fetchHolidays();
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error creating holiday:', error);
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'competition':
        return 'bg-green-100 text-green-800';
      case 'workshop':
        return 'bg-purple-100 text-purple-800';
      case 'cultural':
        return 'bg-pink-100 text-pink-800';
      case 'sports':
        return 'bg-orange-100 text-orange-800';
      case 'exam':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeText = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'সভা';
      case 'competition':
        return 'প্রতিযোগিতা';
      case 'workshop':
        return 'কর্মশালা';
      case 'cultural':
        return 'সাংস্কৃতিক';
      case 'sports':
        return 'ক্রীড়া';
      case 'exam':
        return 'পরীক্ষা';
      default:
        return type;
    }
  };

  const getHolidayTypeColor = (type: string) => {
    switch (type) {
      case 'religious':
        return 'bg-green-100 text-green-800';
      case 'national':
        return 'bg-red-100 text-red-800';
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAudienceText = (audience: string) => {
    switch (audience) {
      case 'students':
        return 'শিক্ষার্থী';
      case 'teachers':
        return 'শিক্ষক';
      case 'parents':
        return 'অভিভাবক';
      case 'all':
        return 'সকলে';
      default:
        return audience;
    }
  };

  if (!dashboardData) {
    return <div className="flex justify-center items-center h-64">লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ক্যালেন্ডার ও ইভেন্ট</h1>
          <p className="text-gray-600 mt-1">একাডেমিক ক্যালেন্ডার এবং ইভেন্ট ব্যবস্থাপনা</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                নতুন ইভেন্ট
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>নতুন ইভেন্ট তৈরি করুন</DialogTitle>
                <DialogDescription>
                  ইভেন্টের বিস্তারিত তথ্য প্রদান করুন
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <Label htmlFor="eventTitle">ইভেন্টের নাম</Label>
                  <Input
                    id="eventTitle"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="ইভেন্টের নাম"
                  />
                </div>
                <div>
                  <Label htmlFor="eventDescription">বিবরণ</Label>
                  <Textarea
                    id="eventDescription"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="ইভেন্টের বিবরণ"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventStartDate">শুরুর তারিখ</Label>
                    <Input
                      id="eventStartDate"
                      type="date"
                      value={newEvent.startDate}
                      onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventEndDate">শেষের তারিখ</Label>
                    <Input
                      id="eventEndDate"
                      type="date"
                      value={newEvent.endDate}
                      onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventStartTime">শুরুর সময়</Label>
                    <Input
                      id="eventStartTime"
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventEndTime">শেষের সময়</Label>
                    <Input
                      id="eventEndTime"
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventType">ধরন</Label>
                    <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="ধরন নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">সভা</SelectItem>
                        <SelectItem value="competition">প্রতিযোগিতা</SelectItem>
                        <SelectItem value="workshop">কর্মশালা</SelectItem>
                        <SelectItem value="cultural">সাংস্কৃতিক</SelectItem>
                        <SelectItem value="sports">ক্রী���়া</SelectItem>
                        <SelectItem value="exam">পরীক্ষা</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="eventCategory">বিভাগ</Label>
                    <Select value={newEvent.category} onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">শিক্ষা</SelectItem>
                        <SelectItem value="administrative">প্রশাসনিক</SelectItem>
                        <SelectItem value="islamic">ইসলামিক</SelectItem>
                        <SelectItem value="entertainment">বিনোদন</SelectItem>
                        <SelectItem value="professional">পেশাগত</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="eventLocation">স্থান</Label>
                  <Input
                    id="eventLocation"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="ইভেন্টের স্থান"
                  />
                </div>
                <div>
                  <Label htmlFor="eventOrganizer">আয়োজক</Label>
                  <Input
                    id="eventOrganizer"
                    value={newEvent.organizer}
                    onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
                    placeholder="আয়োজকের নাম"
                  />
                </div>
                <div>
                  <Label htmlFor="eventAudience">লক্ষ্য দর্শক</Label>
                  <Select value={newEvent.targetAudience} onValueChange={(value) => setNewEvent({ ...newEvent, targetAudience: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="দর্শক নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সকলে</SelectItem>
                      <SelectItem value="students">শিক্ষার্থী</SelectItem>
                      <SelectItem value="teachers">শিক্ষক</SelectItem>
                      <SelectItem value="parents">অভিভাবক</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreateEvent} className="w-full bg-blue-600 hover:bg-blue-700">
                  ইভেন্ট তৈরি করুন
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateHolidayOpen} onOpenChange={setIsCreateHolidayOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                নতুন ছুটি
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>নতুন ছুটি যোগ করুন</DialogTitle>
                <DialogDescription>
                  ছুটির বিস্তারিত তথ্য প্রদান করুন
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="holidayName">ছুটির নাম</Label>
                  <Input
                    id="holidayName"
                    value={newHoliday.name}
                    onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                    placeholder="ছুটির নাম"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="holidayStartDate">শুরুর তারিখ</Label>
                    <Input
                      id="holidayStartDate"
                      type="date"
                      value={newHoliday.startDate}
                      onChange={(e) => setNewHoliday({ ...newHoliday, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="holidayEndDate">শেষের তারিখ</Label>
                    <Input
                      id="holidayEndDate"
                      type="date"
                      value={newHoliday.endDate}
                      onChange={(e) => setNewHoliday({ ...newHoliday, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="holidayType">ধরন</Label>
                  <Select value={newHoliday.type} onValueChange={(value) => setNewHoliday({ ...newHoliday, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="ধরন নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="religious">ধর্মীয়</SelectItem>
                      <SelectItem value="national">জাতীয়</SelectItem>
                      <SelectItem value="academic">শিক্ষা</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="holidayDescription">বিবরণ</Label>
                  <Textarea
                    id="holidayDescription"
                    value={newHoliday.description}
                    onChange={(e) => setNewHoliday({ ...newHoliday, description: e.target.value })}
                    placeholder="ছুটির বিবরণ"
                    rows={3}
                  />
                </div>
                <Button onClick={handleCreateHoliday} className="w-full bg-green-600 hover:bg-green-700">
                  ছুটি যোগ করুন
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">আজকের ইভেন্ট</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.todayEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">আসন্ন ইভেন্ট</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.upcomingEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CalendarDays className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">এই মাসের ইভেন্ট</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.thisMonthEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Gift className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">মোট ছুটির দিন</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalHolidays}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Academic Calendar Info */}
      <Card>
        <CardHeader>
          <CardTitle>একাডেমিক ক্যালেন্ডার</CardTitle>
          <CardDescription>শিক্ষাবর্ষ {dashboardData.academicCalendar.academicYear}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600">শিক্ষাবর্ষের সময়কাল</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(dashboardData.academicCalendar.startDate).toLocaleDateString('bn-BD')} - {new Date(dashboardData.academicCalendar.endDate).toLocaleDateString('bn-BD')}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">টার্মসমূহ</p>
              <div className="space-y-1">
                {dashboardData.academicCalendar.terms.map((term, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{term.name}</span>
                    <Badge className={term.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {term.status === 'active' ? 'সক্রিয়' : 'সম্পন্ন'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">অবস্থা</p>
              <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>আজকের ইভেন্টসমূহ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.todayEvents.length > 0 ? (
                dashboardData.todayEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <Badge className={getEventTypeColor(event.type)}>
                        {getEventTypeText(event.type)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{getAudienceText(event.targetAudience)}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">আজ কোন ইভেন্ট নেই</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span>আসন্ন ইভেন্টসমূহ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.upcomingEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <Badge className={getEventTypeColor(event.type)}>
                      {getEventTypeText(event.type)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{event.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(event.startDate).toLocaleDateString('bn-BD')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      বিস্তারিত
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Holidays */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="w-5 h-5 text-green-600" />
            <span>আসন্ন ছুটির দিনসমূহ</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dashboardData.upcomingHolidays.map((holiday) => (
              <div key={holiday.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{holiday.name}</h3>
                  <Badge className={getHolidayTypeColor(holiday.type)}>
                    {holiday.type === 'religious' ? 'ধর্মীয়' : holiday.type === 'national' ? 'জাতীয়' : 'শিক্ষা'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{holiday.description}</p>
                <div className="text-xs text-gray-500">
                  <span>{new Date(holiday.startDate).toLocaleDateString('bn-BD')}</span>
                  {holiday.startDate !== holiday.endDate && (
                    <span> - {new Date(holiday.endDate).toLocaleDateString('bn-BD')}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>সমস্ত ইভেন্ট</CardTitle>
          <CardDescription>সকল ইভেন্টের তালিকা এবং বিস্তারিত তথ্য</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ইভেন্টের নাম</th>
                  <th className="text-left p-2">ধরন</th>
                  <th className="text-left p-2">তারিখ</th>
                  <th className="text-left p-2">সময়</th>
                  <th className="text-left p-2">স্থান</th>
                  <th className="text-left p-2">লক্ষ্য দর্শক</th>
                  <th className="text-left p-2">কার্যক্রম</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{event.title}</td>
                    <td className="p-2">
                      <Badge className={getEventTypeColor(event.type)}>
                        {getEventTypeText(event.type)}
                      </Badge>
                    </td>
                    <td className="p-2">{new Date(event.startDate).toLocaleDateString('bn-BD')}</td>
                    <td className="p-2">{event.startTime} - {event.endTime}</td>
                    <td className="p-2">{event.location}</td>
                    <td className="p-2">{getAudienceText(event.targetAudience)}</td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default CalendarDashboard;
