import { Router } from 'express';
import { Notice } from '../../shared/database';

const router = Router();

// Mock data
const notices: Notice[] = [
  {
    id: '1',
    title: 'ঈদুল ফিতর ছুটির নোটিশ',
    content: 'আগামী ঈদুল ফিতর উপলক্ষে মাদ্রাসা ৭ দিন বন্ধ থাকবে। ছুটির পর ক্লাস নিয়মিত হবে।',
    type: 'holiday',
    priority: 'high',
    targetAudience: 'all',
    publishDate: new Date('2024-12-10'),
    expiryDate: new Date('2024-12-25'),
    publishedBy: 'admin-001',
    isActive: true
  },
  {
    id: '2',
    title: 'বার্ষিক পরীক্ষার রুটিন প্রকাশ',
    content: 'বার্ষিক পরীক্ষা ২০২৪ এর রুটিন প্রকাশিত হয়েছে। সকল শিক্ষার্থী নোটিশ বোর্ড দেখে নিবেন।',
    type: 'exam',
    priority: 'high',
    targetAudience: 'students',
    publishDate: new Date('2024-12-08'),
    expiryDate: new Date('2024-12-30'),
    publishedBy: 'teacher-001',
    isActive: true
  },
  {
    id: '3',
    title: 'অভিভাবক সভা আয়োজন',
    content: 'আগামী শুক্রবার বিকাল ৩টায় অভিভাবক সভা অনুষ্ঠিত হবে। সকল অভিভাবকদের উপস্থিত থাকার জন্য অনুরোধ করা হচ্ছে।',
    type: 'event',
    priority: 'medium',
    targetAudience: 'parents',
    publishDate: new Date('2024-12-06'),
    expiryDate: new Date('2024-12-15'),
    publishedBy: 'admin-001',
    isActive: true
  },
  {
    id: '4',
    title: 'শিক্ষক নিয়োগ বিজ্ঞপ্তি',
    content: 'আরবি ও ইসলামিক স্টাডিজ বিভাগ��� নতুন শিক্ষক নিয়োগের জন্য আবেদন আহ্বান করা হচ্ছে।',
    type: 'general',
    priority: 'medium',
    targetAudience: 'all',
    publishDate: new Date('2024-12-05'),
    expiryDate: new Date('2024-12-20'),
    publishedBy: 'admin-001',
    isActive: true
  }
];

const announcements = [
  {
    id: '1',
    title: 'নতুন একাডেমিক বছর শুরু',
    content: 'আগামী জানুয়ারি থেকে নতুন একাডেমিক বছর ২০২৫ শুরু হবে।',
    type: 'general',
    targetAudience: 'all',
    publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    publishedBy: 'admin-001',
    publisherName: 'মাওলানা আব্দুর রহমান',
    isActive: true,
    isPinned: true,
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
    recentNotices: notices.slice(0, 5),
    recentAnnouncements: announcements.slice(0, 3)
  });
});

// Get all notices
router.get('/notices', (req, res) => {
  const { type, audience, active } = req.query;
  
  let filteredNotices = [...notices];
  
  if (type) {
    filteredNotices = filteredNotices.filter(n => n.type === type);
  }
  
  if (audience) {
    filteredNotices = filteredNotices.filter(n => 
      n.targetAudience === audience || n.targetAudience === 'all'
    );
  }
  
  if (active !== undefined) {
    filteredNotices = filteredNotices.filter(n => n.isActive === (active === 'true'));
  }

  res.json({
    success: true,
    notices: filteredNotices
  });
});

// Create new notice
router.post('/notices', (req, res) => {
  const { title, content, type, priority, targetAudience, expiryDate } = req.body;
  
  const newNotice: Notice = {
    id: (notices.length + 1).toString(),
    title,
    content,
    type,
    priority: priority || 'medium',
    targetAudience,
    publishDate: new Date(),
    expiryDate: expiryDate ? new Date(expiryDate) : undefined,
    publishedBy: 'current-user',
    isActive: true
  };
  
  notices.unshift(newNotice);
  
  res.json({
    success: true,
    message: 'নোটিশ প্রকাশিত হয়েছে',
    notice: newNotice
  });
});

// Update notice
router.put('/notices/:id', (req, res) => {
  const { id } = req.params;
  const noticeIndex = notices.findIndex(n => n.id === id);
  
  if (noticeIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'নোটিশ পাওয়া যায়নি'
    });
  }
  
  notices[noticeIndex] = { ...notices[noticeIndex], ...req.body };
  
  res.json({
    success: true,
    message: 'নোটিশ আপডেট করা হয়েছে',
    notice: notices[noticeIndex]
  });
});

// Delete notice
router.delete('/notices/:id', (req, res) => {
  const { id } = req.params;
  const noticeIndex = notices.findIndex(n => n.id === id);
  
  if (noticeIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'নোটিশ পাওয়া যায়নি'
    });
  }
  
  notices.splice(noticeIndex, 1);
  
  res.json({
    success: true,
    message: 'নোটিশ মুছে ফেলা হয়েছে'
  });
});

export default router;
