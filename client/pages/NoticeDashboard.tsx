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
import { Bell, Users, Calendar, Plus, Edit, Trash2, Pin, AlertCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'exam' | 'holiday' | 'urgent' | 'academic';
  targetAudience: 'all' | 'students' | 'teachers' | 'parents' | 'staff';
  priority: 'high' | 'medium' | 'low';
  publishDate: string;
  expiryDate: string;
  isActive: boolean;
  authorId: string;
  authorName: string;
  createdAt: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'news' | 'event' | 'achievement' | 'policy';
  targetAudience: 'all' | 'students' | 'teachers' | 'parents' | 'staff';
  publishDate: string;
  expiryDate?: string;
  isPinned: boolean;
  isActive: boolean;
  authorId: string;
  authorName: string;
  createdAt: string;
}

interface NoticeStats {
  totalNotices: number;
  activeNotices: number;
  totalAnnouncements: number;
  pinnedAnnouncements: number;
  urgentNotices: number;
  expiringSoon: number;
}

export default function NoticeDashboard() {
  const [notices, setNotices] = useLocalStorage<Notice[]>('notices', []);
  const [announcements, setAnnouncements] = useLocalStorage<Announcement[]>('announcements', []);
  const [stats, setStats] = useState<NoticeStats>({
    totalNotices: 0,
    activeNotices: 0,
    totalAnnouncements: 0,
    pinnedAnnouncements: 0,
    urgentNotices: 0,
    expiringSoon: 0
  });

  const { addNotification } = useNotifications();
  const [isNoticeDialogOpen, setIsNoticeDialogOpen] = useState(false);
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  // Initialize with sample data if empty
  useEffect(() => {
    if (notices.length === 0) {
      const sampleNotices: Notice[] = [
        {
          id: '1',
          title: 'বার্ষিক পরীক্ষার সময়সূচি প্রকাশ',
          content: 'আসন্ন বার্ষিক পরীক্ষার সময়সূচি প্রকাশিত হয়েছে। সকল শিক্ষার্থী অফিস থেকে সময়সূচি সংগ্রহ করুন।',
          type: 'exam',
          targetAudience: 'students',
          priority: 'high',
          publishDate: '2024-01-15',
          expiryDate: '2024-02-28',
          isActive: true,
          authorId: 'admin1',
          authorName: 'প্রধান শিক্ষক',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'শিক্ষক সভার আহ্বান',
          content: 'আগামী শুক্রবার বিকাল ৩টায় সকল শিক্ষকদের উপস্থিতির জন্য অনুরোধ করা হচ্ছে।',
          type: 'general',
          targetAudience: 'teachers',
          priority: 'medium',
          publishDate: '2024-01-10',
          expiryDate: '2024-01-20',
          isActive: true,
          authorId: 'admin1',
          authorName: 'প্রধান শিক্ষক',
          createdAt: new Date().toISOString()
        }
      ];
      setNotices(sampleNotices);

      const sampleAnnouncements: Announcement[] = [
        {
          id: '1',
          title: 'নতুন শিক্ষাবর্ষ ২০২৪ শুরু',
          content: 'নতুন শিক্ষাবর্ষ ২০২৪ শুরু হয়েছে। সকল শিক্ষার্থীকে স্বাগতম।',
          type: 'news',
          targetAudience: 'all',
          publishDate: '2024-01-01',
          isPinned: true,
          isActive: true,
          authorId: 'admin1',
          authorName: 'প্রধান শিক্ষক',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা',
          content: 'আগামী মাসে বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে। আগ্রহী শিক্ষার্থীরা নাম লিখান।',
          type: 'event',
          targetAudience: 'students',
          publishDate: '2024-01-12',
          expiryDate: '2024-02-15',
          isPinned: false,
          isActive: true,
          authorId: 'admin1',
          authorName: 'ক্রীড়া শিক্ষক',
          createdAt: new Date().toISOString()
        }
      ];
      setAnnouncements(sampleAnnouncements);
    }
  }, [notices.length, setNotices, setAnnouncements]);

  // Calculate stats
  useEffect(() => {
    const activeNotices = notices.filter(n => n.isActive).length;
    const urgentNotices = notices.filter(n => n.priority === 'high' && n.isActive).length;
    const pinnedAnnouncements = announcements.filter(a => a.isPinned && a.isActive).length;
    
    // Check expiring soon (within 7 days)
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    const expiringSoon = notices.filter(n => {
      const expiryDate = new Date(n.expiryDate);
      return n.isActive && expiryDate <= sevenDaysFromNow;
    }).length;

    setStats({
      totalNotices: notices.length,
      activeNotices,
      totalAnnouncements: announcements.length,
      pinnedAnnouncements,
      urgentNotices,
      expiringSoon
    });
  }, [notices, announcements]);

  const handleAddNotice = (noticeData: Omit<Notice, 'id' | 'createdAt'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setNotices([...notices, newNotice]);
    addNotification('নোটিশ সফলভাবে যোগ করা হয়েছে', 'success');
    setIsNoticeDialogOpen(false);
  };

  const handleAddAnnouncement = (announcementData: Omit<Announcement, 'id' | 'createdAt'>) => {
    const newAnnouncement: Announcement = {
      ...announcementData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setAnnouncements([...announcements, newAnnouncement]);
    addNotification('ঘোষণা সফলভাবে যোগ করা হয়েছে', 'success');
    setIsAnnouncementDialogOpen(false);
  };

  const toggleNoticeStatus = (noticeId: string) => {
    const updatedNotices = notices.map(notice =>
      notice.id === noticeId ? { ...notice, isActive: !notice.isActive } : notice
    );
    setNotices(updatedNotices);
    addNotification('নোটিশের অবস্থা পরিবর্তিত হয়েছে', 'success');
  };

  const toggleAnnouncementPin = (announcementId: string) => {
    const updatedAnnouncements = announcements.map(announcement =>
      announcement.id === announcementId ? { ...announcement, isPinned: !announcement.isPinned } : announcement
    );
    setAnnouncements(updatedAnnouncements);
    addNotification('ঘোষণা পিন করা/খোলা হয়েছে', 'success');
  };

  const deleteNotice = (noticeId: string) => {
    const updatedNotices = notices.filter(n => n.id !== noticeId);
    setNotices(updatedNotices);
    addNotification('নোটিশ মুছে ফেলা হয়েছে', 'success');
  };

  const deleteAnnouncement = (announcementId: string) => {
    const updatedAnnouncements = announcements.filter(a => a.id !== announcementId);
    setAnnouncements(updatedAnnouncements);
    addNotification('ঘোষণা মুছে ফেলা হয়েছে', 'success');
  };

  const getTypeBadge = (type: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      general: "default",
      exam: "destructive",
      holiday: "secondary",
      urgent: "destructive",
      academic: "default",
      news: "default",
      event: "secondary",
      achievement: "default",
      policy: "outline"
    };
    
    const labels: { [key: string]: string } = {
      general: 'সাধারণ',
      exam: 'পরীক্ষা',
      holiday: 'ছুটি',
      urgent: 'জরুরি',
      academic: 'শিক্ষা',
      news: 'সংবাদ',
      event: 'অনুষ্ঠান',
      achievement: 'সাফল্য',
      policy: 'নীতি'
    };

    return (
      <Badge variant={variants[type] || "secondary"}>
        {labels[type] || type}
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

  const getAudienceBadge = (audience: string) => {
    const labels: { [key: string]: string } = {
      all: 'সবার জন্য',
      students: 'শিক্ষার্থী',
      teachers: 'শিক্ষক',
      parents: 'অভিভাবক',
      staff: 'কর্মচারী'
    };

    return (
      <Badge variant="outline">
        {labels[audience] || audience}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100" style={{ fontFamily: '"Noto Serif Bengali", serif' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">নোটিশ ও ঘোষণা</h1>
          <p className="text-emerald-600">নোটিশ বোর্ড ও ঘোষণা ব্যবস্থাপনা</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">মোট নোটিশ</CardTitle>
              <Bell className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{stats.totalNotices}</div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">সক্রিয় নোটিশ</CardTitle>
              <Bell className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{stats.activeNotices}</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">মোট ঘোষণা</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{stats.totalAnnouncements}</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">পিন করা</CardTitle>
              <Pin className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{stats.pinnedAnnouncements}</div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700">জরুরি</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-800">{stats.urgentNotices}</div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">শীঘ্রই শেষ</CardTitle>
              <Calendar className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-800">{stats.expiringSoon}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="notices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notices">নোটিশ বোর্ড</TabsTrigger>
            <TabsTrigger value="announcements">ঘোষণা</TabsTrigger>
          </TabsList>

          {/* Notices Tab */}
          <TabsContent value="notices" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-emerald-800">নোটিশ তালিকা</h2>
              <Dialog open={isNoticeDialogOpen} onOpenChange={setIsNoticeDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন ন���টিশ
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>নতুন নোটিশ তৈরি</DialogTitle>
                    <DialogDescription>
                      নোটিশের বিস্তারিত তথ্য পূরণ করুন
                    </DialogDescription>
                  </DialogHeader>
                  <NoticeForm onSubmit={handleAddNotice} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {notices.map((notice) => (
                <Card key={notice.id} className={`${notice.priority === 'high' ? 'border-red-300 bg-red-50' : ''}`}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold">{notice.title}</h3>
                          {getTypeBadge(notice.type)}
                          {getPriorityBadge(notice.priority)}
                          {getAudienceBadge(notice.targetAudience)}
                          <Badge variant={notice.isActive ? "default" : "secondary"}>
                            {notice.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{notice.content}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                          <div>
                            <p>প্রকাশ: {new Date(notice.publishDate).toLocaleDateString('bn-BD')}</p>
                            <p>লেখক: {notice.authorName}</p>
                          </div>
                          <div>
                            <p>শেষ: {new Date(notice.expiryDate).toLocaleDateString('bn-BD')}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleNoticeStatus(notice.id)}
                        >
                          {notice.isActive ? 'বন্ধ করুন' : 'চালু করুন'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteNotice(notice.id)}
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

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-emerald-800">ঘোষণা তালিকা</h2>
              <Dialog open={isAnnouncementDialogOpen} onOpenChange={setIsAnnouncementDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন ঘোষণা
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>নতুন ঘোষণা তৈরি</DialogTitle>
                    <DialogDescription>
                      ঘোষণার বিস্তারিত তথ্য পূরণ করুন
                    </DialogDescription>
                  </DialogHeader>
                  <AnnouncementForm onSubmit={handleAddAnnouncement} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className={`${announcement.isPinned ? 'border-yellow-300 bg-yellow-50' : ''}`}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold">{announcement.title}</h3>
                          {getTypeBadge(announcement.type)}
                          {getAudienceBadge(announcement.targetAudience)}
                          {announcement.isPinned && (
                            <Badge variant="secondary">
                              <Pin className="w-3 h-3 mr-1" />
                              পিন করা
                            </Badge>
                          )}
                          <Badge variant={announcement.isActive ? "default" : "secondary"}>
                            {announcement.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{announcement.content}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                          <div>
                            <p>প্রকাশ: {new Date(announcement.publishDate).toLocaleDateString('bn-BD')}</p>
                            <p>লেখক: {announcement.authorName}</p>
                          </div>
                          <div>
                            {announcement.expiryDate && (
                              <p>শেষ: {new Date(announcement.expiryDate).toLocaleDateString('bn-BD')}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAnnouncementPin(announcement.id)}
                        >
                          <Pin className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteAnnouncement(announcement.id)}
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
        </Tabs>
      </div>
    </div>
  );
}

function NoticeForm({ onSubmit }: { onSubmit: (data: Omit<Notice, 'id' | 'createdAt'>) => void }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'general' as const,
    targetAudience: 'all' as const,
    priority: 'medium' as const,
    publishDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isActive: true,
    authorId: 'admin1',
    authorName: 'প্রধান শিক্ষক'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">নোটিশের শিরোনাম</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="নোটিশের শিরোনাম লিখুন"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">বিস্তারিত</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          placeholder="নোটিশের বিস্তারিত বিবরণ লিখুন"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">ধরন</Label>
          <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">সাধারণ</SelectItem>
              <SelectItem value="exam">পরীক্ষা</SelectItem>
              <SelectItem value="holiday">ছুটি</SelectItem>
              <SelectItem value="urgent">জরুরি</SelectItem>
              <SelectItem value="academic">শিক্ষা</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="targetAudience">টার্গেট</Label>
          <Select value={formData.targetAudience} onValueChange={(value: any) => setFormData({...formData, targetAudience: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সবার জন্য</SelectItem>
              <SelectItem value="students">শিক্ষার্থী</SelectItem>
              <SelectItem value="teachers">শিক্ষক</SelectItem>
              <SelectItem value="parents">অভিভাবক</SelectItem>
              <SelectItem value="staff">কর্মচারী</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="publishDate">প্রকাশের তারিখ</Label>
          <Input
            id="publishDate"
            type="date"
            value={formData.publishDate}
            onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiryDate">শেষের তারিখ</Label>
          <Input
            id="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
            required
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          নোটিশ প্রকাশ করুন
        </Button>
      </DialogFooter>
    </form>
  );
}

function AnnouncementForm({ onSubmit }: { onSubmit: (data: Omit<Announcement, 'id' | 'createdAt'>) => void }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'news' as const,
    targetAudience: 'all' as const,
    publishDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    isPinned: false,
    isActive: true,
    authorId: 'admin1',
    authorName: 'প্রধান শিক্ষক'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      expiryDate: formData.expiryDate || undefined
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">ঘোষণার শিরোনাম</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="ঘোষণার শিরোন���ম লিখুন"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">বিস্তারিত</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          placeholder="ঘোষণার বিস্তারিত বিবরণ লিখুন"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">ধরন</Label>
          <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="news">সংবাদ</SelectItem>
              <SelectItem value="event">অনুষ্ঠান</SelectItem>
              <SelectItem value="achievement">সাফল্য</SelectItem>
              <SelectItem value="policy">নীতি</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="targetAudience">টার্গেট</Label>
          <Select value={formData.targetAudience} onValueChange={(value: any) => setFormData({...formData, targetAudience: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সবার জন্য</SelectItem>
              <SelectItem value="students">শিক্ষার্থী</SelectItem>
              <SelectItem value="teachers">শিক্ষক</SelectItem>
              <SelectItem value="parents">অভিভাবক</SelectItem>
              <SelectItem value="staff">কর্মচারী</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="publishDate">প্রকাশের তারিখ</Label>
          <Input
            id="publishDate"
            type="date"
            value={formData.publishDate}
            onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiryDate">শেষের তারিখ (ঐ���্ছিক)</Label>
          <Input
            id="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isPinned"
          checked={formData.isPinned}
          onChange={(e) => setFormData({...formData, isPinned: e.target.checked})}
        />
        <Label htmlFor="isPinned">উপরে পিন করুন</Label>
      </div>

      <DialogFooter>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          ঘোষণা প্রকাশ করুন
        </Button>
      </DialogFooter>
    </form>
  );
}
