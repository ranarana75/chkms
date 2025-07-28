import express from 'express';
import { Notice, Announcement } from '../../shared/database';

const router = express.Router();

// Mock notice data
const notices: Notice[] = [
  {
    id: '1',
    title: 'ঈদুল ফিতর ছুটির নোটিশ',
    content: 'আগামী ঈদুল ফিতর উপলক্ষে মাদ্���াসা ৭ দিন বন্ধ থাকবে। ছুটির পর ক্লাস নিয়মিত হবে।',
    type: 'holiday',
    targetAudience: 'all',
    publishDate: new Date('2024-12-10'),
    expiryDate: new Date('2024-12-25'),
    publishedBy: 'admin-001',
    publisherName: 'মাওলানা আব্দুর রহমান',
    isActive: true,
    priority: 'high',
    attachments: []
  },
  {
    id: '2',
    title: 'বার্ষিক পরীক্ষার রুটিন প্রকাশ',
    content: 'বার্ষিক পরীক্ষা ২০২৪ এর রুটিন প্রকাশিত হয়েছে। সকল শিক্ষার্থী নোটিশ বোর্ড দেখে নিবেন।',
    type: 'exam',
    targetAudience: 'students',
    publishDate: new Date('2024-12-08'),
    expiryDate: new Date('2024-12-30'),
    publishedBy: 'teacher-001',
    publisherName: 'উস্তাদ মোহাম্মদ হাসান',
    isActive: true,
    priority: 'high',
    attachments: ['exam_routine_2024.pdf']
  },
  {
    id: '3',
    title: 'নতুন লাইব্রেরি বই সংগ্রহ',
    content: 'মাদ্রাসার লাইব্রেরিতে নতুন ইসলামিক বইপত্র সংগ্রহ করা হয়েছে। শিক্ষার্থীরা লাইব্রেরিয়ানের সাথে যোগাযোগ করুন।',
    type: 'general',
    targetAudience: 'students',
    publishDate: new Date('2024-12-07').toISOString(),
    expiryDate: new Date('2024-12-22').toISOString(),
    publishedBy: 'librarian-001',
    publisherName: 'মাওলানা আবু বকর',
    isActive: true,
    priority: 'medium',
    attachments: ['new_books_list.pdf']
  },
  {
    id: '4',
    title: 'অভিভাবক সভা আয়োজন',
    content: 'আগামী শুক্রবার বিকাল ৩টায় অভিভাবক সভা অনুষ্ঠিত হবে। সকল অভিভাবকদের উপস্থিত থাকার জন্য অনুরোধ করা হচ্ছে।',
    type: 'event',
    targetAudience: 'parents',
    publishDate: new Date('2024-12-06'),
    expiryDate: new Date('2024-12-15'),
    publishedBy: 'admin-001',
    publisherName: 'মাওলানা আব্দুর রহমান',
    isActive: true,
    priority: 'high',
    attachments: []
  },
  {
    id: '5',
    title: 'শিক্ষক ��িয়োগ বিজ্ঞপ্তি',
    content: 'আরবি ও ইসলামিক স্টাডিজ বিভাগে নতুন শিক্ষক নিয়োগের জন্য আবেদন আহ্বান করা হচ্ছে।',
    type: 'general',
    targetAudience: 'all',
    publishDate: new Date('2024-12-05'),
    expiryDate: new Date('2024-12-20'),
    publishedBy: 'admin-001',
    publisherName: 'মাওলানা আব্দুর রহমান',
    isActive: true,
    priority: 'medium',
    attachments: ['teacher_recruitment.pdf']
  }
];

const announcements: Announcement[] = [
  {
    id: '1',
    title: 'জরুরি ঘোষণা: আজকের ক্লাস বাতিল',
    content: 'প্রতিকূল আবহাওয়ার কারণে আজকের সকল ক্লাস বাতিল করা হলো।',
    type: 'urgent',
    targetAudience: 'all',
    publishDate: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    publishedBy: 'admin-001',
    publisherName: 'মাওলানা আব্দুর রহমান',
    isActive: true,
    isPinned: true,
    autoExpire: true
  },
  {
    id: '2',
    title: 'নামাজ��র সময় পরিবর্তন',
    content: 'শীতকালীন সময়সূ���ি অনুযায়ী নামাজের সময় পরিবর্তিত হয়েছে।',
    type: 'general',
    targetAudience: 'all',
    publishDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    publishedBy: 'imam-001',
    publisherName: 'হাফেজ আব্দুল করিম',
    isActive: true,
    isPinned: false,
    autoExpire: false
  }
];

// Get notice board dashboard
router.get('/dashboard', (req, res) => {
  const activeNotices = notices.filter(notice => notice.isActive).length;
  const urgentNotices = notices.filter(notice => notice.priority === 'high' && notice.isActive).length;
  const totalAnnouncements = announcements.filter(ann => ann.isActive).length;
  const pinnedAnnouncements = announcements.filter(ann => ann.isPinned && ann.isActive).length;

  res.json({
    stats: {
      activeNotices,
      urgentNotices,
      totalAnnouncements,
      pinnedAnnouncements
    },
    recentNotices: notices.filter(notice => notice.isActive).slice(0, 5),
    urgentAnnouncements: announcements.filter(ann => ann.type === 'urgent' && ann.isActive)
  });
});

// Get all notices
router.get('/notices', (req, res) => {
  const { type, audience, active } = req.query;
  
  let filteredNotices = notices;
  
  if (type) {
    filteredNotices = filteredNotices.filter(notice => notice.type === type);
  }
  
  if (audience) {
    filteredNotices = filteredNotices.filter(notice => 
      notice.targetAudience === audience || notice.targetAudience === 'all'
    );
  }
  
  if (active !== undefined) {
    filteredNotices = filteredNotices.filter(notice => notice.isActive === (active === 'true'));
  }
  
  // Sort by publish date (newest first)
  filteredNotices.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  
  res.json(filteredNotices);
});

// Get notice by ID
router.get('/notices/:id', (req, res) => {
  const { id } = req.params;
  const notice = notices.find(n => n.id === id);
  
  if (!notice) {
    return res.status(404).json({ error: 'Notice not found' });
  }
  
  res.json(notice);
});

// Create new notice
router.post('/notices', (req, res) => {
  const newNotice: Notice = {
    id: `notice-${Date.now()}`,
    ...req.body,
    publishDate: new Date().toISOString(),
    isActive: true,
    attachments: req.body.attachments || []
  };
  
  notices.unshift(newNotice);
  res.status(201).json(newNotice);
});

// Update notice
router.put('/notices/:id', (req, res) => {
  const { id } = req.params;
  const noticeIndex = notices.findIndex(n => n.id === id);
  
  if (noticeIndex === -1) {
    return res.status(404).json({ error: 'Notice not found' });
  }
  
  notices[noticeIndex] = {
    ...notices[noticeIndex],
    ...req.body
  };
  
  res.json(notices[noticeIndex]);
});

// Delete notice
router.delete('/notices/:id', (req, res) => {
  const { id } = req.params;
  const noticeIndex = notices.findIndex(n => n.id === id);
  
  if (noticeIndex === -1) {
    return res.status(404).json({ error: 'Notice not found' });
  }
  
  notices.splice(noticeIndex, 1);
  res.json({ message: 'Notice deleted successfully' });
});

// Get all announcements
router.get('/announcements', (req, res) => {
  const { type, audience, active, pinned } = req.query;
  
  let filteredAnnouncements = announcements;
  
  if (type) {
    filteredAnnouncements = filteredAnnouncements.filter(ann => ann.type === type);
  }
  
  if (audience) {
    filteredAnnouncements = filteredAnnouncements.filter(ann => 
      ann.targetAudience === audience || ann.targetAudience === 'all'
    );
  }
  
  if (active !== undefined) {
    filteredAnnouncements = filteredAnnouncements.filter(ann => ann.isActive === (active === 'true'));
  }
  
  if (pinned !== undefined) {
    filteredAnnouncements = filteredAnnouncements.filter(ann => ann.isPinned === (pinned === 'true'));
  }
  
  // Sort by pinned first, then by publish date
  filteredAnnouncements.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });
  
  res.json(filteredAnnouncements);
});

// Create new announcement
router.post('/announcements', (req, res) => {
  const newAnnouncement: Announcement = {
    id: `announcement-${Date.now()}`,
    ...req.body,
    publishDate: new Date().toISOString(),
    isActive: true,
    isPinned: req.body.isPinned || false,
    autoExpire: req.body.autoExpire || false
  };
  
  announcements.unshift(newAnnouncement);
  res.status(201).json(newAnnouncement);
});

// Update announcement
router.put('/announcements/:id', (req, res) => {
  const { id } = req.params;
  const announcementIndex = announcements.findIndex(ann => ann.id === id);
  
  if (announcementIndex === -1) {
    return res.status(404).json({ error: 'Announcement not found' });
  }
  
  announcements[announcementIndex] = {
    ...announcements[announcementIndex],
    ...req.body
  };
  
  res.json(announcements[announcementIndex]);
});

// Pin/Unpin announcement
router.patch('/announcements/:id/pin', (req, res) => {
  const { id } = req.params;
  const { isPinned } = req.body;
  
  const announcementIndex = announcements.findIndex(ann => ann.id === id);
  
  if (announcementIndex === -1) {
    return res.status(404).json({ error: 'Announcement not found' });
  }
  
  announcements[announcementIndex].isPinned = isPinned;
  
  res.json(announcements[announcementIndex]);
});

// Delete announcement
router.delete('/announcements/:id', (req, res) => {
  const { id } = req.params;
  const announcementIndex = announcements.findIndex(ann => ann.id === id);
  
  if (announcementIndex === -1) {
    return res.status(404).json({ error: 'Announcement not found' });
  }
  
  announcements.splice(announcementIndex, 1);
  res.json({ message: 'Announcement deleted successfully' });
});

// Get public notices (for public display)
router.get('/public', (req, res) => {
  const publicNotices = notices.filter(notice => 
    notice.isActive && 
    new Date(notice.expiryDate || Date.now()) > new Date()
  );
  
  const publicAnnouncements = announcements.filter(ann => 
    ann.isActive && 
    new Date(ann.expiryDate || Date.now()) > new Date()
  );
  
  res.json({
    notices: publicNotices.slice(0, 10),
    announcements: publicAnnouncements.slice(0, 5)
  });
});

// Get notices for specific user role
router.get('/for/:role', (req, res) => {
  const { role } = req.params;
  
  const roleNotices = notices.filter(notice => 
    notice.isActive &&
    (notice.targetAudience === role || notice.targetAudience === 'all') &&
    new Date(notice.expiryDate || Date.now()) > new Date()
  );
  
  const roleAnnouncements = announcements.filter(ann => 
    ann.isActive &&
    (ann.targetAudience === role || ann.targetAudience === 'all') &&
    new Date(ann.expiryDate || Date.now()) > new Date()
  );
  
  res.json({
    notices: roleNotices,
    announcements: roleAnnouncements
  });
});

// Auto-expire announcements (this would be called by a cron job)
router.post('/expire-announcements', (req, res) => {
  const now = new Date();
  let expiredCount = 0;
  
  announcements.forEach(ann => {
    if (ann.autoExpire && ann.expiryDate && new Date(ann.expiryDate) <= now) {
      ann.isActive = false;
      expiredCount++;
    }
  });
  
  res.json({ message: `${expiredCount} announcements expired` });
});

export default router;
