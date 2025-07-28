import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Navigation from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Bell,
  Megaphone,
  Users,
  AlertTriangle,
  FileText,
  Pin,
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar,
} from "lucide-react";
import { Notice, Announcement } from "../../shared/database";

interface NoticeStats {
  activeNotices: number;
  urgentNotices: number;
  totalAnnouncements: number;
  pinnedAnnouncements: number;
}

interface DashboardData {
  stats: NoticeStats;
  recentNotices: Notice[];
  urgentAnnouncements: Announcement[];
}

const NoticeDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [notices, setNotices] = useState<Notice[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isCreateNoticeOpen, setIsCreateNoticeOpen] = useState(false);
  const [isCreateAnnouncementOpen, setIsCreateAnnouncementOpen] =
    useState(false);
  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    type: "",
    targetAudience: "",
    priority: "",
    expiryDate: "",
  });
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    type: "",
    targetAudience: "",
    expiryDate: "",
    isPinned: false,
    autoExpire: false,
  });

  useEffect(() => {
    fetchDashboardData();
    fetchNotices();
    fetchAnnouncements();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/notice/dashboard");
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const fetchNotices = async () => {
    try {
      const response = await fetch("/api/notice/notices");
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("/api/notice/announcements");
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleCreateNotice = async () => {
    try {
      const response = await fetch("/api/notice/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newNotice,
          publishedBy: "admin-001",
          publisherName: "অ্যাডমিন",
        }),
      });

      if (response.ok) {
        setIsCreateNoticeOpen(false);
        setNewNotice({
          title: "",
          content: "",
          type: "",
          targetAudience: "",
          priority: "",
          expiryDate: "",
        });
        fetchNotices();
        fetchDashboardData();
      }
    } catch (error) {
      console.error("Error creating notice:", error);
    }
  };

  const handleCreateAnnouncement = async () => {
    try {
      const response = await fetch("/api/notice/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newAnnouncement,
          publishedBy: "admin-001",
          publisherName: "অ্যাডমিন",
        }),
      });

      if (response.ok) {
        setIsCreateAnnouncementOpen(false);
        setNewAnnouncement({
          title: "",
          content: "",
          type: "",
          targetAudience: "",
          expiryDate: "",
          isPinned: false,
          autoExpire: false,
        });
        fetchAnnouncements();
        fetchDashboardData();
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  const handlePinAnnouncement = async (id: string, isPinned: boolean) => {
    try {
      const response = await fetch(`/api/notice/announcements/${id}/pin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPinned }),
      });

      if (response.ok) {
        fetchAnnouncements();
        fetchDashboardData();
      }
    } catch (error) {
      console.error("Error updating pin status:", error);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "exam":
        return "bg-blue-100 text-blue-800";
      case "holiday":
        return "bg-green-100 text-green-800";
      case "event":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "urgent":
        return "জরুরি";
      case "exam":
        return "পরীক্ষা";
      case "holiday":
        return "ছুটি";
      case "event":
        return "অনুষ্ঠান";
      case "general":
        return "সাধারণ";
      default:
        return type;
    }
  };

  const getAudienceText = (audience: string) => {
    switch (audience) {
      case "students":
        return "শিক্ষার্থী";
      case "teachers":
        return "শিক্ষ��";
      case "parents":
        return "অভিভাবক";
      case "all":
        return "সকলে";
      default:
        return audience;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!dashboardData) {
    return (
      <div className="flex justify-center items-center h-64">লোড হচ্ছে...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">নোটিশ বোর্ড</h1>
            <p className="text-gray-600 mt-1">ঘোষণা এবং বার্তা ব্যবস্থাপনা</p>
          </div>
          <div className="flex space-x-2">
            <Dialog
              open={isCreateNoticeOpen}
              onOpenChange={setIsCreateNoticeOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  নতুন নোটিশ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>নতুন নোটিশ তৈরি করুন</DialogTitle>
                  <DialogDescription>
                    নোটিশের বিস্তারিত তথ্য প্রদান করুন
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="noticeTitle">শিরোনাম</Label>
                    <Input
                      id="noticeTitle"
                      value={newNotice.title}
                      onChange={(e) =>
                        setNewNotice({ ...newNotice, title: e.target.value })
                      }
                      placeholder="নোটিশের শিরোনাম"
                    />
                  </div>
                  <div>
                    <Label htmlFor="noticeContent">বিস্তারিত</Label>
                    <Textarea
                      id="noticeContent"
                      value={newNotice.content}
                      onChange={(e) =>
                        setNewNotice({ ...newNotice, content: e.target.value })
                      }
                      placeholder="নোটিশের বিস্তারিত বিবরণ"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="noticeType">ধরন</Label>
                      <Select
                        value={newNotice.type}
                        onValueChange={(value) =>
                          setNewNotice({ ...newNotice, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="ধরন নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">সাধারণ</SelectItem>
                          <SelectItem value="urgent">জরুরি</SelectItem>
                          <SelectItem value="exam">পরীক্ষা</SelectItem>
                          <SelectItem value="holiday">ছুটি</SelectItem>
                          <SelectItem value="event">অনুষ্ঠান</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="noticeAudience">লক্ষ্য দর্শক</Label>
                      <Select
                        value={newNotice.targetAudience}
                        onValueChange={(value) =>
                          setNewNotice({ ...newNotice, targetAudience: value })
                        }
                      >
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
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="noticePriority">গুরুত্ব</Label>
                      <Select
                        value={newNotice.priority}
                        onValueChange={(value) =>
                          setNewNotice({ ...newNotice, priority: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="গুরুত্ব নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">কম</SelectItem>
                          <SelectItem value="medium">মধ্যম</SelectItem>
                          <SelectItem value="high">বেশি</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="noticeExpiry">মেয়াদ শেষ</Label>
                      <Input
                        id="noticeExpiry"
                        type="date"
                        value={newNotice.expiryDate}
                        onChange={(e) =>
                          setNewNotice({
                            ...newNotice,
                            expiryDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleCreateNotice}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    নোটিশ প্রকাশ করুন
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isCreateAnnouncementOpen}
              onOpenChange={setIsCreateAnnouncementOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  নতুন ঘোষণা
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>নতুন ঘোষণা তৈরি করুন</DialogTitle>
                  <DialogDescription>
                    ঘোষণার বিস্তারিত তথ্য প্রদান করুন
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="announcementTitle">শিরোনাম</Label>
                    <Input
                      id="announcementTitle"
                      value={newAnnouncement.title}
                      onChange={(e) =>
                        setNewAnnouncement({
                          ...newAnnouncement,
                          title: e.target.value,
                        })
                      }
                      placeholder="ঘোষণার শিরোনাম"
                    />
                  </div>
                  <div>
                    <Label htmlFor="announcementContent">বিস্তারিত</Label>
                    <Textarea
                      id="announcementContent"
                      value={newAnnouncement.content}
                      onChange={(e) =>
                        setNewAnnouncement({
                          ...newAnnouncement,
                          content: e.target.value,
                        })
                      }
                      placeholder="ঘোষণার বিস্তারিত বিবরণ"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="announcementType">ধরন</Label>
                      <Select
                        value={newAnnouncement.type}
                        onValueChange={(value) =>
                          setNewAnnouncement({
                            ...newAnnouncement,
                            type: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="ধরন নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">সাধারণ</SelectItem>
                          <SelectItem value="urgent">জরুরি</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="announcementAudience">লক্ষ্য দর্শক</Label>
                      <Select
                        value={newAnnouncement.targetAudience}
                        onValueChange={(value) =>
                          setNewAnnouncement({
                            ...newAnnouncement,
                            targetAudience: value,
                          })
                        }
                      >
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
                  </div>
                  <div>
                    <Label htmlFor="announcementExpiry">মেয়াদ শেষ</Label>
                    <Input
                      id="announcementExpiry"
                      type="date"
                      value={newAnnouncement.expiryDate}
                      onChange={(e) =>
                        setNewAnnouncement({
                          ...newAnnouncement,
                          expiryDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newAnnouncement.isPinned}
                        onChange={(e) =>
                          setNewAnnouncement({
                            ...newAnnouncement,
                            isPinned: e.target.checked,
                          })
                        }
                      />
                      <span>পিন করুন</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newAnnouncement.autoExpire}
                        onChange={(e) =>
                          setNewAnnouncement({
                            ...newAnnouncement,
                            autoExpire: e.target.checked,
                          })
                        }
                      />
                      <span>অটো মেয়াদ শেষ</span>
                    </label>
                  </div>
                  <Button
                    onClick={handleCreateAnnouncement}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    ঘোষণা প্রকাশ করুন
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
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    সক্রিয় নোটিশ
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.stats.activeNotices}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    জরুরি নোটিশ
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.stats.urgentNotices}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Megaphone className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট ঘোষণা</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.stats.totalAnnouncements}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Pin className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    পিন করা ঘোষণ��
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.stats.pinnedAnnouncements}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Notices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-blue-600" />
                <span>সাম্প্রতিক নোটিশসমূহ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentNotices.map((notice) => (
                  <div key={notice.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 flex-1">
                        {notice.title}
                      </h3>
                      <div className="flex space-x-2">
                        <Badge className={getTypeColor(notice.type)}>
                          {getTypeText(notice.type)}
                        </Badge>
                        <Badge className={getPriorityColor(notice.priority)}>
                          {notice.priority === "high"
                            ? "জরুরি"
                            : notice.priority === "medium"
                              ? "মধ্যম"
                              : "সাধারণ"}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {notice.content}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>
                        লক্ষ্য: {getAudienceText(notice.targetAudience)}
                      </span>
                      <span>
                        {new Date(notice.publishDate).toLocaleDateString(
                          "bn-BD",
                        )}
                      </span>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        দেখুন
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        সম্পাদনা
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Urgent Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Megaphone className="w-5 h-5 text-orange-600" />
                <span>জরুরি ঘোষণা</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.urgentAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="border rounded-lg p-4 bg-red-50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 flex-1">
                        {announcement.title}
                      </h3>
                      <div className="flex space-x-2">
                        {announcement.isPinned && (
                          <Pin className="w-4 h-4 text-red-600" />
                        )}
                        <Badge className="bg-red-100 text-red-800">জরুরি</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      {announcement.content}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>প্রকাশক: {announcement.publisherName}</span>
                      <span>
                        {new Date(announcement.publishDate).toLocaleDateString(
                          "bn-BD",
                        )}
                      </span>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handlePinAnnouncement(
                            announcement.id,
                            !announcement.isPinned,
                          )
                        }
                      >
                        <Pin className="w-4 h-4 mr-1" />
                        {announcement.isPinned ? "আনপিন" : "পিন"}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        সম্পাদনা
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Notices Table */}
        <Card>
          <CardHeader>
            <CardTitle>সমস্ত নোটিশ</CardTitle>
            <CardDescription>
              সকল নোটিশের তালিকা এবং বিস্তারিত তথ্য
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">শিরোনাম</th>
                    <th className="text-left p-2">ধরন</th>
                    <th className="text-left p-2">লক্ষ্য দর্শক</th>
                    <th className="text-left p-2">গুরুত্ব</th>
                    <th className="text-left p-2">প্রকাশের তারিখ</th>
                    <th className="text-left p-2">মেয়াদ শেষ</th>
                    <th className="text-left p-2">কার্যক্রম</th>
                  </tr>
                </thead>
                <tbody>
                  {notices.map((notice) => (
                    <tr key={notice.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{notice.title}</td>
                      <td className="p-2">
                        <Badge className={getTypeColor(notice.type)}>
                          {getTypeText(notice.type)}
                        </Badge>
                      </td>
                      <td className="p-2">
                        {getAudienceText(notice.targetAudience)}
                      </td>
                      <td className="p-2">
                        <Badge className={getPriorityColor(notice.priority)}>
                          {notice.priority === "high"
                            ? "জরুরি"
                            : notice.priority === "medium"
                              ? "মধ্যম"
                              : "সাধারণ"}
                        </Badge>
                      </td>
                      <td className="p-2">
                        {new Date(notice.publishDate).toLocaleDateString(
                          "bn-BD",
                        )}
                      </td>
                      <td className="p-2">
                        {notice.expiryDate
                          ? new Date(notice.expiryDate).toLocaleDateString(
                              "bn-BD",
                            )
                          : "অসীম"}
                      </td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                          >
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

export default NoticeDashboard;
