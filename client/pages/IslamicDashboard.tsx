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
import { Progress } from '@/components/ui/progress';
import { useLocalData } from '@/hooks/useLocalData';
import { useNotifications } from '@/hooks/useNotifications';
import { Clock, Book, User, Plus, Edit, Trophy, Star, Calendar, Moon, Sun } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface PrayerTime {
  id: string;
  name: string;
  nameArabic: string;
  time: string;
  congregationTime?: string;
  isActive: boolean;
}

interface HifzStudent {
  id: string;
  studentId: string;
  studentName: string;
  currentSurah: string;
  currentAyah: number;
  totalAyahMemorized: number;
  totalParaCompleted: number;
  teacherId: string;
  teacherName: string;
  progressPercentage: number;
  startDate: string;
  lastReviewDate: string;
  status: 'active' | 'completed' | 'paused';
  notes: string;
}

interface HifzProgress {
  id: string;
  studentId: string;
  date: string;
  surahName: string;
  ayahFrom: number;
  ayahTo: number;
  revisionSurahs: string[];
  teacherFeedback: string;
  grade: 'excellent' | 'good' | 'average' | 'needs_improvement';
  createdAt: string;
}

interface IslamicEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'lecture' | 'competition' | 'celebration' | 'program';
  location: string;
  speaker?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  createdAt: string;
}

interface IslamicStats {
  totalHifzStudents: number;
  activeHifzStudents: number;
  completedHifz: number;
  averageProgress: number;
  todaysPrayers: number;
  upcomingEvents: number;
}

export default function IslamicDashboard() {
  const [prayerTimes, setPrayerTimes] = useLocalData<PrayerTime[]>('prayerTimes', []);
  const [hifzStudents, setHifzStudents] = useLocalData<HifzStudent[]>('hifzStudents', []);
  const [hifzProgress, setHifzProgress] = useLocalData<HifzProgress[]>('hifzProgress', []);
  const [islamicEvents, setIslamicEvents] = useLocalData<IslamicEvent[]>('islamicEvents', []);
  
  const [stats, setStats] = useState<IslamicStats>({
    totalHifzStudents: 0,
    activeHifzStudents: 0,
    completedHifz: 0,
    averageProgress: 0,
    todaysPrayers: 0,
    upcomingEvents: 0
  });

  const { addNotification } = useNotifications();
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<HifzStudent | null>(null);

  // Initialize with sample data if empty
  useEffect(() => {
    if (prayerTimes.length === 0) {
      const defaultPrayerTimes: PrayerTime[] = [
        { id: '1', name: 'ফজর', nameArabic: 'الفجر', time: '05:30', congregationTime: '05:45', isActive: true },
        { id: '2', name: 'জোহর', nameArabic: 'الظهر', time: '12:15', congregationTime: '12:30', isActive: true },
        { id: '3', name: 'আসর', nameArabic: 'العصر', time: '16:30', congregationTime: '16:45', isActive: true },
        { id: '4', name: 'মাগরিব', nameArabic: 'المغرب', time: '18:45', congregationTime: '19:00', isActive: true },
        { id: '5', name: 'এশা', nameArabic: 'العشاء', time: '20:15', congregationTime: '20:30', isActive: true }
      ];
      setPrayerTimes(defaultPrayerTimes);
    }

    if (hifzStudents.length === 0) {
      const sampleStudents: HifzStudent[] = [
        {
          id: '1',
          studentId: 'HFZ001',
          studentName: 'আবদুল্লাহ আল মামুন',
          currentSurah: 'সূরা বাকারাহ',
          currentAyah: 145,
          totalAyahMemorized: 1250,
          totalParaCompleted: 3,
          teacherId: 'T001',
          teacherName: 'মাওলানা আবু বকর',
          progressPercentage: 20,
          startDate: '2023-01-15',
          lastReviewDate: '2024-01-10',
          status: 'active',
          notes: 'খুবই মেধাবী ছাত্র, নিয়মিত অনুশীলন করে'
        },
        {
          id: '2',
          studentId: 'HFZ002',
          studentName: 'ফাতিমা আক্তার',
          currentSurah: 'সূরা আলে ইমরান',
          currentAyah: 89,
          totalAyahMemorized: 890,
          totalParaCompleted: 2,
          teacherId: 'T002',
          teacherName: 'মাওলানা আবুল কাসেম',
          progressPercentage: 15,
          startDate: '2023-03-01',
          lastReviewDate: '2024-01-08',
          status: 'active',
          notes: 'নিয়মিত তিলাওয়াত ক���ে, ভালো অগ্রগতি'
        }
      ];
      setHifzStudents(sampleStudents);

      const sampleProgress: HifzProgress[] = [
        {
          id: '1',
          studentId: 'HFZ001',
          date: '2024-01-10',
          surahName: 'সূরা বাকারাহ',
          ayahFrom: 140,
          ayahTo: 145,
          revisionSurahs: ['সূরা ফাতিহা', 'সূরা বাকারাহ (১-১৩৯)'],
          teacherFeedback: 'চমৎকার অগ্রগতি, তিলাওয়াত শুদ্ধ',
          grade: 'excellent',
          createdAt: new Date().toISOString()
        }
      ];
      setHifzProgress(sampleProgress);

      const sampleEvents: IslamicEvent[] = [
        {
          id: '1',
          title: 'মাসিক কুরআন প্রতিযোগিতা',
          description: 'হিফজ বিভাগের শিক্ষার্থীদের জন্য মাসিক তিলাওয়াত প্রতিযোগিতা',
          date: '2024-02-15',
          time: '14:00',
          type: 'competition',
          location: 'মূল হল',
          speaker: 'মাওলানা আবু বকর',
          status: 'upcoming',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'ইসলামিক আখলাক বিষয়ক বক্তব্য',
          description: 'শিক্ষার্থীদের চরিত্র গঠনে ইসলামিক মূল্যবোধের গুরুত্ব',
          date: '2024-02-20',
          time: '10:00',
          type: 'lecture',
          location: 'লেকচার হল',
          speaker: 'মাওলানা আবুল কাসেম',
          status: 'upcoming',
          createdAt: new Date().toISOString()
        }
      ];
      setIslamicEvents(sampleEvents);
    }
  }, [prayerTimes.length, hifzStudents.length, setPrayerTimes, setHifzStudents, setHifzProgress, setIslamicEvents]);

  // Calculate stats
  useEffect(() => {
    const totalHifzStudents = hifzStudents.length;
    const activeHifzStudents = hifzStudents.filter(s => s.status === 'active').length;
    const completedHifz = hifzStudents.filter(s => s.status === 'completed').length;
    const averageProgress = activeHifzStudents > 0 
      ? hifzStudents.filter(s => s.status === 'active').reduce((sum, s) => sum + s.progressPercentage, 0) / activeHifzStudents
      : 0;
    const todaysPrayers = prayerTimes.filter(p => p.isActive).length;
    const upcomingEvents = islamicEvents.filter(e => e.status === 'upcoming').length;

    setStats({
      totalHifzStudents,
      activeHifzStudents,
      completedHifz,
      averageProgress: Math.round(averageProgress),
      todaysPrayers,
      upcomingEvents
    });
  }, [hifzStudents, prayerTimes, islamicEvents]);

  const handleAddStudent = (studentData: Omit<HifzStudent, 'id'>) => {
    const newStudent: HifzStudent = {
      ...studentData,
      id: Date.now().toString()
    };
    setHifzStudents([...hifzStudents, newStudent]);
    addNotification('হিফজ শিক্ষার্থী সফলভাবে যোগ করা হয়েছে', 'success');
    setIsStudentDialogOpen(false);
  };

  const handleAddProgress = (progressData: Omit<HifzProgress, 'id' | 'createdAt'>) => {
    const newProgress: HifzProgress = {
      ...progressData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setHifzProgress([...hifzProgress, newProgress]);

    // Update student progress
    const updatedStudents = hifzStudents.map(student => {
      if (student.studentId === progressData.studentId) {
        return {
          ...student,
          currentSurah: progressData.surahName,
          currentAyah: progressData.ayahTo,
          totalAyahMemorized: student.totalAyahMemorized + (progressData.ayahTo - progressData.ayahFrom + 1),
          lastReviewDate: progressData.date,
          progressPercentage: Math.min(100, student.progressPercentage + 2)
        };
      }
      return student;
    });
    setHifzStudents(updatedStudents);

    addNotification('অগ্রগতি রেকর্ড সফলভাবে যোগ করা হয়েছে', 'success');
    setIsProgressDialogOpen(false);
  };

  const handleAddEvent = (eventData: Omit<IslamicEvent, 'id' | 'createdAt'>) => {
    const newEvent: IslamicEvent = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setIslamicEvents([...islamicEvents, newEvent]);
    addNotification('ইসলামিক ইভেন্ট সফলভাবে যোগ করা হয়েছে', 'success');
    setIsEventDialogOpen(false);
  };

  const updatePrayerTime = (prayerId: string, time: string) => {
    const updatedTimes = prayerTimes.map(prayer =>
      prayer.id === prayerId ? { ...prayer, time } : prayer
    );
    setPrayerTimes(updatedTimes);
    addNotification('নামাজের সময় আপডেট হয়েছে', 'success');
  };

  const getGradeBadge = (grade: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      excellent: "default",
      good: "secondary",
      average: "outline",
      needs_improvement: "destructive"
    };
    
    const labels: { [key: string]: string } = {
      excellent: 'চমৎকার',
      good: 'ভালো',
      average: 'মধ্যম',
      needs_improvement: 'উন্নতি প্রয়োজন'
    };

    return (
      <Badge variant={variants[grade] || "secondary"}>
        {labels[grade] || grade}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      active: "default",
      completed: "secondary",
      paused: "outline",
      upcoming: "outline",
      ongoing: "default",
      competition: "secondary",
      lecture: "default",
      celebration: "secondary",
      program: "outline"
    };
    
    const labels: { [key: string]: string } = {
      active: 'সক্রিয়',
      completed: 'সম্পন্ন',
      paused: 'বিরতি',
      upcoming: 'আসন্ন',
      ongoing: 'চলমান',
      competition: 'প্রতিযোগিতা',
      lecture: 'বক্তব্য',
      celebration: 'উৎসব',
      program: 'অনুষ্ঠান'
    };

    return (
      <Badge variant={variants[status] || "secondary"}>
        {labels[status] || status}
      </Badge>
    );
  };

  const getCurrentPrayer = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const sortedPrayers = prayerTimes
      .filter(p => p.isActive)
      .map(p => ({
        ...p,
        timeInMinutes: parseInt(p.time.split(':')[0]) * 60 + parseInt(p.time.split(':')[1])
      }))
      .sort((a, b) => a.timeInMinutes - b.timeInMinutes);

    for (let i = 0; i < sortedPrayers.length; i++) {
      if (currentTime < sortedPrayers[i].timeInMinutes) {
        return sortedPrayers[i];
      }
    }
    
    return sortedPrayers[0]; // Next day's first prayer
  };

  const nextPrayer = getCurrentPrayer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100" style={{ fontFamily: '"Noto Serif Bengali", serif' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">ইসলামিক ড্যাশবোর্���</h1>
          <p className="text-emerald-600">নামাজের সময়সূচি ও হিফজ বিভাগ ব্যবস্থাপনা</p>
        </div>

        {/* Current Prayer & Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200 col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-blue-700 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                পরবর্তী নামাজ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">
                {nextPrayer?.name} - {nextPrayer?.time}
              </div>
              <p className="text-blue-600 text-lg">{nextPrayer?.nameArabic}</p>
              <p className="text-sm text-blue-600 mt-2">
                জামাত: {nextPrayer?.congregationTime}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">সক্রিয় হিফজ</CardTitle>
              <User className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{stats.activeHifzStudents}</div>
              <p className="text-xs text-green-600">মোট: {stats.totalHifzStudents}</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">গড় অগ্রগতি</CardTitle>
              <Trophy className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{stats.averageProgress}%</div>
              <Progress value={stats.averageProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="prayers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="prayers">নামাজের সময়</TabsTrigger>
            <TabsTrigger value="hifz">হিফজ বিভাগ</TabsTrigger>
            <TabsTrigger value="progress">অগ্রগতি</TabsTrigger>
            <TabsTrigger value="events">ইভেন্ট</TabsTrigger>
          </TabsList>

          {/* Prayer Times Tab */}
          <TabsContent value="prayers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-emerald-800">আজকের নামাজের সময়সূচি</h2>
              <div className="text-sm text-emerald-600">
                {new Date().toLocaleDateString('bn-BD', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            <div className="grid gap-4">
              {prayerTimes.map((prayer) => (
                <Card key={prayer.id} className="bg-white/70">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                          {prayer.name === 'ফজর' && <Sun className="h-8 w-8 text-orange-500" />}
                          {prayer.name === 'জোহর' && <Sun className="h-8 w-8 text-yellow-500" />}
                          {prayer.name === 'আসর' && <Sun className="h-8 w-8 text-orange-400" />}
                          {prayer.name === 'মাগরিব' && <Moon className="h-8 w-8 text-purple-500" />}
                          {prayer.name === 'এশা' && <Moon className="h-8 w-8 text-indigo-500" />}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{prayer.name}</h3>
                          <p className="text-lg text-gray-600">{prayer.nameArabic}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-800">{prayer.time}</div>
                        <p className="text-sm text-gray-600">জামাত: {prayer.congregationTime}</p>
                        <Input
                          type="time"
                          value={prayer.time}
                          onChange={(e) => updatePrayerTime(prayer.id, e.target.value)}
                          className="mt-2 w-32"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Hifz Students Tab */}
          <TabsContent value="hifz" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-emerald-800">হিফজ শিক্ষার্থী তালিকা</h2>
              <Dialog open={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন শিক্ষার্থী
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>হিফজ শিক্ষার্থী যোগ</DialogTitle>
                    <DialogDescription>
                      নতুন হিফজ শিক্ষার্থীর তথ্য পূরণ করুন
                    </DialogDescription>
                  </DialogHeader>
                  <HifzStudentForm onSubmit={handleAddStudent} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {hifzStudents.map((student) => (
                <Card key={student.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold">{student.studentName}</h3>
                          <Badge variant="outline">ID: {student.studentId}</Badge>
                          {getStatusBadge(student.status)}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">বর্তমান সূরা: {student.currentSurah}</p>
                            <p className="text-sm text-gray-600 mb-1">আয়াত: {student.currentAyah}</p>
                            <p className="text-sm text-gray-600 mb-1">মোট আয়াত মুখস্থ: {student.totalAyahMemorized}</p>
                            <p className="text-sm text-gray-600">পূর্ণ পারা: {student.totalParaCompleted}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">শিক্ষক: {student.teacherName}</p>
                            <p className="text-sm text-gray-600 mb-1">শুরু: {new Date(student.startDate).toLocaleDateString('bn-BD')}</p>
                            <p className="text-sm text-gray-600 mb-2">শেষ পর্যালোচনা: {new Date(student.lastReviewDate).toLocaleDateString('bn-BD')}</p>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>অগ্রগতি</span>
                                <span>{student.progressPercentage}%</span>
                              </div>
                              <Progress value={student.progressPercentage} />
                            </div>
                          </div>
                        </div>
                        {student.notes && (
                          <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                            <strong>মন্তব্য:</strong> {student.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-emerald-800">দৈনিক অগ্রগতি রেকর্ড</h2>
              <Dialog open={isProgressDialogOpen} onOpenChange={setIsProgressDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    অগ্রগতি যোগ
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>দৈনিক অগ্রগতি রেকর্ড</DialogTitle>
                    <DialogDescription>
                      আজকের পাঠের অগ্রগতি রেকর্ড করুন
                    </DialogDescription>
                  </DialogHeader>
                  <ProgressForm hifzStudents={hifzStudents} onSubmit={handleAddProgress} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {hifzProgress.map((progress) => {
                const student = hifzStudents.find(s => s.studentId === progress.studentId);
                return (
                  <Card key={progress.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg font-semibold">{student?.studentName}</h3>
                            <Badge variant="outline">{progress.studentId}</Badge>
                            {getGradeBadge(progress.grade)}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">তারিখ: {new Date(progress.date).toLocaleDateString('bn-BD')}</p>
                              <p className="text-sm text-gray-600 mb-1">সূরা: {progress.surahName}</p>
                              <p className="text-sm text-gray-600 mb-1">আয়াত: {progress.ayahFrom} - {progress.ayahTo}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">পর্যালোচনা সূরা:</p>
                              <div className="flex flex-wrap gap-1">
                                {progress.revisionSurahs.map((surah, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {surah}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          {progress.teacherFeedback && (
                            <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                              <strong>শিক্ষকের মন্তব্য:</strong> {progress.teacherFeedback}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-emerald-800">ইসলামিক ইভেন্ট ও অনুষ্ঠান</h2>
              <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন ইভেন্ট
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>ইসলামিক ইভেন্ট যোগ</DialogTitle>
                    <DialogDescription>
                      নতুন ইসলামিক ইভেন্ট বা অনুষ্ঠানের তথ্য পূরণ করুন
                    </DialogDescription>
                  </DialogHeader>
                  <EventForm onSubmit={handleAddEvent} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {islamicEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                          {getStatusBadge(event.type)}
                          {getStatusBadge(event.status)}
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
                              {event.time}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">স্থান: {event.location}</p>
                            {event.speaker && (
                              <p className="text-gray-600">বক্তা: {event.speaker}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function HifzStudentForm({ onSubmit }: { onSubmit: (data: Omit<HifzStudent, 'id'>) => void }) {
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    currentSurah: '',
    currentAyah: 1,
    totalAyahMemorized: 0,
    totalParaCompleted: 0,
    teacherId: '',
    teacherName: '',
    progressPercentage: 0,
    startDate: new Date().toISOString().split('T')[0],
    lastReviewDate: new Date().toISOString().split('T')[0],
    status: 'active' as const,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="studentId">শিক্ষার্থী আইডি</Label>
          <Input
            id="studentId"
            value={formData.studentId}
            onChange={(e) => setFormData({...formData, studentId: e.target.value})}
            placeholder="HFZ001"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentName">শিক���ষার্থীর নাম</Label>
          <Input
            id="studentName"
            value={formData.studentName}
            onChange={(e) => setFormData({...formData, studentName: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="currentSurah">বর্তমান সূরা</Label>
          <Input
            id="currentSurah"
            value={formData.currentSurah}
            onChange={(e) => setFormData({...formData, currentSurah: e.target.value})}
            placeholder="সূরা বাকারাহ"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currentAyah">বর্তমান আয়াত</Label>
          <Input
            id="currentAyah"
            type="number"
            value={formData.currentAyah}
            onChange={(e) => setFormData({...formData, currentAyah: parseInt(e.target.value)})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="teacherId">শিক্ষক আইডি</Label>
          <Input
            id="teacherId"
            value={formData.teacherId}
            onChange={(e) => setFormData({...formData, teacherId: e.target.value})}
            placeholder="T001"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacherName">শিক্ষকের নাম</Label>
          <Input
            id="teacherName"
            value={formData.teacherName}
            onChange={(e) => setFormData({...formData, teacherName: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">শুরুর তারিখ</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">অবস্থা</Label>
          <Select value={formData.status} onValueChange={(value: 'active' | 'completed' | 'paused') => setFormData({...formData, status: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">সক্রিয়</SelectItem>
              <SelectItem value="completed">সম্পন্ন</SelectItem>
              <SelectItem value="paused">বিরতি</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">মন্তব্য</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          placeholder="শিক্ষার্থী সম্পর্কে বিশেষ মন্তব্য..."
        />
      </div>

      <DialogFooter>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          শিক্ষার্থী যোগ করুন
        </Button>
      </DialogFooter>
    </form>
  );
}

function ProgressForm({ 
  hifzStudents, 
  onSubmit 
}: { 
  hifzStudents: HifzStudent[];
  onSubmit: (data: Omit<HifzProgress, 'id' | 'createdAt'>) => void;
}) {
  const [formData, setFormData] = useState({
    studentId: '',
    date: new Date().toISOString().split('T')[0],
    surahName: '',
    ayahFrom: 1,
    ayahTo: 1,
    revisionSurahs: [] as string[],
    teacherFeedback: '',
    grade: 'good' as const
  });

  const [newRevisionSurah, setNewRevisionSurah] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addRevisionSurah = () => {
    if (newRevisionSurah.trim()) {
      setFormData({...formData, revisionSurahs: [...formData.revisionSurahs, newRevisionSurah.trim()]});
      setNewRevisionSurah('');
    }
  };

  const removeRevisionSurah = (index: number) => {
    setFormData({...formData, revisionSurahs: formData.revisionSurahs.filter((_, i) => i !== index)});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="studentId">শিক্ষার্থী</Label>
          <Select value={formData.studentId} onValueChange={(value) => setFormData({...formData, studentId: value})}>
            <SelectTrigger>
              <SelectValue placeholder="শিক্ষার্থী নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {hifzStudents.filter(s => s.status === 'active').map((student) => (
                <SelectItem key={student.id} value={student.studentId}>
                  {student.studentName} ({student.studentId})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="surahName">সূরার নাম</Label>
        <Input
          id="surahName"
          value={formData.surahName}
          onChange={(e) => setFormData({...formData, surahName: e.target.value})}
          placeholder="সূরা বাকারাহ"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ayahFrom">আয়াত থেকে</Label>
          <Input
            id="ayahFrom"
            type="number"
            value={formData.ayahFrom}
            onChange={(e) => setFormData({...formData, ayahFrom: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ayahTo">আয়াত পর্যন্ত</Label>
          <Input
            id="ayahTo"
            type="number"
            value={formData.ayahTo}
            onChange={(e) => setFormData({...formData, ayahTo: parseInt(e.target.value)})}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>পর্যালোচনা সূরা</Label>
        <div className="flex gap-2">
          <Input
            value={newRevisionSurah}
            onChange={(e) => setNewRevisionSurah(e.target.value)}
            placeholder="পর্যালোচিত সূরার নাম"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRevisionSurah())}
          />
          <Button type="button" onClick={addRevisionSurah} variant="outline">
            যোগ করুন
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.revisionSurahs.map((surah, index) => (
            <Badge key={index} variant="outline" className="cursor-pointer" onClick={() => removeRevisionSurah(index)}>
              {surah} ×
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="grade">মূল্যায়ন</Label>
        <Select value={formData.grade} onValueChange={(value: 'excellent' | 'good' | 'average' | 'needs_improvement') => setFormData({...formData, grade: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="excellent">চমৎকার</SelectItem>
            <SelectItem value="good">ভালো</SelectItem>
            <SelectItem value="average">মধ্যম</SelectItem>
            <SelectItem value="needs_improvement">উন্নতি প্রয়োজন</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="teacherFeedback">শিক্ষকের মন্তব্য</Label>
        <Textarea
          id="teacherFeedback"
          value={formData.teacherFeedback}
          onChange={(e) => setFormData({...formData, teacherFeedback: e.target.value})}
          placeholder="আজকের পাঠ সম্পর্কে মন্তব্য..."
        />
      </div>

      <DialogFooter>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          অগ্রগতি রেকর্ড করুন
        </Button>
      </DialogFooter>
    </form>
  );
}

function EventForm({ onSubmit }: { onSubmit: (data: Omit<IslamicEvent, 'id' | 'createdAt'>) => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    type: 'lecture' as const,
    location: '',
    speaker: '',
    status: 'upcoming' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">অনুষ্ঠানের নাম</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="মাসিক কুরআন প্রতিযোগিতা"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">বিবরণ</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="অনুষ্ঠানের বিস্তারিত বিবরণ..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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
          <Label htmlFor="time">সময়</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">ধরন</Label>
          <Select value={formData.type} onValueChange={(value: 'lecture' | 'competition' | 'celebration' | 'program') => setFormData({...formData, type: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lecture">বক্তব্য</SelectItem>
              <SelectItem value="competition">প্রতিযোগিতা</SelectItem>
              <SelectItem value="celebration">উৎসব</SelectItem>
              <SelectItem value="program">অনুষ্ঠান</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">স্থান</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            placeholder="মূল হল"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="speaker">বক্তা (ঐচ্ছিক)</Label>
        <Input
          id="speaker"
          value={formData.speaker}
          onChange={(e) => setFormData({...formData, speaker: e.target.value})}
          placeholder="মাওলানা আবু বকর"
        />
      </div>

      <DialogFooter>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          ইভেন্��� যোগ করুন
        </Button>
      </DialogFooter>
    </form>
  );
}
