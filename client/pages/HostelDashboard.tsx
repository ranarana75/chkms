import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
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
import Navigation from "../components/Navigation";
import {
  Building2,
  Users,
  Bed,
  Utensils,
  MessageSquare,
  Plus,
  Eye,
  Edit,
  UserPlus,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Activity,
  Home,
  Settings,
  Clock,
  Target
} from "lucide-react";
import { useLocalData, useNotifications } from "@/hooks/useLocalData";
import { hostelResidentsDB, LocalDB, STORAGE_KEYS } from "@shared/localDatabase";

interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  type: "single" | "double" | "triple" | "dormitory";
  capacity: number;
  currentOccupancy: number;
  monthlyFee: number;
  facilities: string[];
  isActive: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface HostelResident {
  id: string;
  studentId: string;
  studentName: string;
  roomId: string;
  roomNumber: string;
  checkInDate: string;
  monthlyFee: number;
  status: "active" | "inactive";
  emergencyContact: string;
  guardianName?: string;
  class?: string;
  paymentStatus: "paid" | "pending" | "overdue";
  lastPayment?: string;
  createdAt: string;
  updatedAt: string;
}

interface HostelComplaint {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  complaint: string;
  category: "maintenance" | "cleanliness" | "food" | "security" | "other";
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "resolved";
  date: string;
  assignedTo?: string;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
}

interface HostelStats {
  totalRooms: number;
  occupiedRooms: number;
  totalStudents: number;
  monthlyRevenue: number;
  pendingComplaints: number;
  messStudents: number;
  availableRooms: number;
  lastUpdated: Date;
}

// Create databases
const roomsDB = new LocalDB<Room>('chkms_hostel_rooms');
const complaintsDB = new LocalDB<HostelComplaint>('chkms_hostel_complaints');

const HostelDashboard: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hostelStats, setHostelStats] = useState<HostelStats>({
    totalRooms: 0,
    occupiedRooms: 0,
    totalStudents: 0,
    monthlyRevenue: 0,
    pendingComplaints: 0,
    messStudents: 0,
    availableRooms: 0,
    lastUpdated: new Date(),
  });
  const [isAllocateRoomOpen, setIsAllocateRoomOpen] = useState(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    floor: "",
    type: "",
    capacity: "",
    monthlyFee: "",
    facilities: [] as string[],
    description: "",
  });
  const [roomAllocation, setRoomAllocation] = useState({
    studentId: "",
    studentName: "",
    roomId: "",
    emergencyContact: "",
    guardianName: "",
    class: "",
  });
  const [newComplaint, setNewComplaint] = useState({
    studentId: "",
    studentName: "",
    roomNumber: "",
    complaint: "",
    category: "",
    priority: "",
  });

  const { data: rooms, loading: roomsLoading, addItem: addRoom, updateItem: updateRoom, refresh: refreshRooms } = useLocalData(roomsDB);
  const { data: residents, loading: residentsLoading, addItem: addResident, updateItem: updateResident, refresh: refreshResidents } = useLocalData(hostelResidentsDB);
  const { data: complaints, loading: complaintsLoading, addItem: addComplaint, updateItem: updateComplaint, refresh: refreshComplaints } = useLocalData(complaintsDB);
  const { addNotification } = useNotifications();

  useEffect(() => {
    initializeSampleData();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [rooms, residents, complaints]);

  const initializeSampleData = () => {
    // Initialize sample rooms
    if (rooms.length === 0) {
      const sampleRooms: Room[] = [
        {
          id: "1",
          roomNumber: "১০১",
          floor: 1,
          type: "double",
          capacity: 2,
          currentOccupancy: 2,
          monthlyFee: 2500,
          facilities: ["ফ্যান", "বিদ্যুৎ", "পানি", "আলমারি"],
          isActive: true,
          description: "দ্বিতল ভবনের ��্রথম তলার কক্ষ",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          roomNumber: "১০২",
          floor: 1,
          type: "triple",
          capacity: 3,
          currentOccupancy: 1,
          monthlyFee: 2000,
          facilities: ["ফ্যান", "বিদ্যুৎ", "পানি", "আলমারি", "পড়ার টেবিল"],
          isActive: true,
          description: "প্রশস্ত ত্রিক কক্ষ",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          roomNumber: "২০১",
          floor: 2,
          type: "single",
          capacity: 1,
          currentOccupancy: 0,
          monthlyFee: 3000,
          facilities: ["ফ্যান", "বিদ্যুৎ", "পানি", "আলম���রি", "পড়ার টেবিল", "চেয়ার"],
          isActive: true,
          description: "একক কক্ষ - প্রিমিয়াম",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "4",
          roomNumber: "২০২",
          floor: 2,
          type: "dormitory",
          capacity: 6,
          currentOccupancy: 4,
          monthlyFee: 1500,
          facilities: ["ফ্যান", "বিদ্যুৎ", "পানি"],
          isActive: true,
          description: "সাধারণ ডরমিটরি",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];

      sampleRooms.forEach(room => roomsDB.add(room));
    }

    // Initialize sample residents
    if (residents.length === 0) {
      const sampleResidents: HostelResident[] = [
        {
          id: "1",
          studentId: "STD001",
          studentName: "মোহাম্মদ আব্দুল্লাহ",
          roomId: "1",
          roomNumber: "১০১",
          checkInDate: "2024-01-15",
          monthlyFee: 2500,
          status: "active",
          emergencyContact: "01712345678",
          guardianName: "আব্দুল করিম",
          class: "আলিম প্রথম বর্ষ",
          paymentStatus: "paid",
          lastPayment: "2024-12-01",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          studentId: "STD002",
          studentName: "আহমদ হাসান",
          roomId: "1",
          roomNumber: "১০১",
          checkInDate: "2024-01-20",
          monthlyFee: 2500,
          status: "active",
          emergencyContact: "01812345678",
          guardianName: "হাসান আলী",
          class: "আলিম দ্বিতীয় বর্ষ",
          paymentStatus: "pending",
          lastPayment: "2024-11-01",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          studentId: "STD003",
          studentName: "মোহাম্মদ ইব্রাহিম",
          roomId: "2",
          roomNumber: "১০২",
          checkInDate: "2024-02-01",
          monthlyFee: 2000,
          status: "active",
          emergencyContact: "01912345678",
          guardianName: "ইব্রাহিম খান",
          class: "ফাজিল প্রথম বর্ষ",
          paymentStatus: "paid",
          lastPayment: "2024-12-05",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];

      sampleResidents.forEach(resident => hostelResidentsDB.add(resident));
    }

    // Initialize sample complaints
    if (complaints.length === 0) {
      const sampleComplaints: HostelComplaint[] = [
        {
          id: "1",
          studentId: "STD001",
          studentName: "মোহাম্মদ আব্দুল্লাহ",
          roomNumber: "১০১",
          complaint: "রুমের ফ্যান নষ্ট হয়ে গেছে। দ্রুত ঠিক করার প্রয়োজন।",
          category: "maintenance",
          priority: "high",
          status: "pending",
          date: "2024-12-10",
          assignedTo: "রক্ষণাবেক্ষণ বিভাগ",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          studentId: "STD002",
          studentName: "আহমদ হাসান",
          roomNumber: "১০১",
          complaint: "বাথরুমে পানির সমস্যা। পানি আসে না।",
          category: "maintenance",
          priority: "medium",
          status: "in_progress",
          date: "2024-12-08",
          assignedTo: "প্লাম্বার",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          studentId: "STD003",
          studentName: "মোহাম্মদ ইব্রাহিম",
          roomNumber: "১০২",
          complaint: "মেসের খাবারের মান ভালো নয়।",
          category: "food",
          priority: "low",
          status: "resolved",
          date: "2024-12-05",
          assignedTo: "মেস ব্যবস্থাপক",
          resolution: "রাঁধুনীর সাথে আলোচনা করে খাবারের মান উন্নত করা হয়েছে।",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];

      sampleComplaints.forEach(complaint => complaintsDB.add(complaint));
    }
  };

  const calculateStats = () => {
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter((room: Room) => room.currentOccupancy > 0).length;
    const availableRooms = rooms.filter((room: Room) => room.currentOccupancy < room.capacity).length;
    const totalStudents = residents.filter((resident: HostelResident) => resident.status === "active").length;
    const monthlyRevenue = residents
      .filter((resident: HostelResident) => resident.status === "active")
      .reduce((sum: number, resident: HostelResident) => sum + resident.monthlyFee, 0);
    const pendingComplaints = complaints.filter((complaint: HostelComplaint) => 
      complaint.status === "pending" || complaint.status === "in_progress"
    ).length;
    
    // Estimate mess students (90% of residents)
    const messStudents = Math.floor(totalStudents * 0.9);

    setHostelStats({
      totalRooms,
      occupiedRooms,
      totalStudents,
      monthlyRevenue,
      pendingComplaints,
      messStudents,
      availableRooms,
      lastUpdated: new Date(),
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refreshRooms(), refreshResidents(), refreshComplaints()]);
    calculateStats();
    addNotification("success", "ডেটা আপডেট", "হোস্টেলের তথ্য সফলভাবে আপডেট হয়েছে");
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleAddRoom = async () => {
    if (!newRoom.roomNumber || !newRoom.floor || !newRoom.type || !newRoom.capacity || !newRoom.monthlyFee) {
      addNotification("error", "ত্রুটি", "সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন");
      return;
    }

    try {
      const room: Room = {
        id: Date.now().toString(),
        roomNumber: newRoom.roomNumber,
        floor: parseInt(newRoom.floor),
        type: newRoom.type as any,
        capacity: parseInt(newRoom.capacity),
        currentOccupancy: 0,
        monthlyFee: parseInt(newRoom.monthlyFee),
        facilities: newRoom.facilities,
        isActive: true,
        description: newRoom.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const success = await addRoom(room);
      if (success) {
        setIsAddRoomOpen(false);
        setNewRoom({
          roomNumber: "",
          floor: "",
          type: "",
          capacity: "",
          monthlyFee: "",
          facilities: [],
          description: "",
        });
        addNotification("success", "রুম যোগ", "নতুন রুম সফলভাবে যোগ করা হয়েছে");
      }
    } catch (error) {
      addNotification("error", "ত্রুটি", "রুম যোগ করতে সমস্যা হয়েছে");
    }
  };

  const handleAllocateRoom = async () => {
    if (!roomAllocation.studentId || !roomAllocation.studentName || !roomAllocation.roomId || !roomAllocation.emergencyContact) {
      addNotification("error", "ত্রুটি", "সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন");
      return;
    }

    try {
      const selectedRoom = rooms.find((room: Room) => room.id === roomAllocation.roomId);
      if (!selectedRoom || selectedRoom.currentOccupancy >= selectedRoom.capacity) {
        addNotification("error", "ত্রুটি", "রুমটি বর্তমানে উপলব্ধ নেই");
        return;
      }

      const resident: HostelResident = {
        id: Date.now().toString(),
        studentId: roomAllocation.studentId,
        studentName: roomAllocation.studentName,
        roomId: roomAllocation.roomId,
        roomNumber: selectedRoom.roomNumber,
        checkInDate: new Date().toISOString().split('T')[0],
        monthlyFee: selectedRoom.monthlyFee,
        status: "active",
        emergencyContact: roomAllocation.emergencyContact,
        guardianName: roomAllocation.guardianName,
        class: roomAllocation.class,
        paymentStatus: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const residentSuccess = await addResident(resident);
      if (residentSuccess) {
        // Update room occupancy
        const updatedRoom = {
          ...selectedRoom,
          currentOccupancy: selectedRoom.currentOccupancy + 1,
          updatedAt: new Date().toISOString(),
        };
        await updateRoom(selectedRoom.id, updatedRoom);

        setIsAllocateRoomOpen(false);
        setRoomAllocation({
          studentId: "",
          studentName: "",
          roomId: "",
          emergencyContact: "",
          guardianName: "",
          class: "",
        });
        addNotification("success", "রুম বরাদ্দ", "রুম সফলভাবে বরাদ্দ করা হয়েছে");
      }
    } catch (error) {
      addNotification("error", "ত্রুটি", "রুম বরাদ্দ করতে সমস্যা হয়েছে");
    }
  };

  const handleComplaint = async () => {
    if (!newComplaint.studentId || !newComplaint.studentName || !newComplaint.complaint || !newComplaint.category || !newComplaint.priority) {
      addNotification("error", "ত্���ুটি", "সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন");
      return;
    }

    try {
      const complaint: HostelComplaint = {
        id: Date.now().toString(),
        studentId: newComplaint.studentId,
        studentName: newComplaint.studentName,
        roomNumber: newComplaint.roomNumber,
        complaint: newComplaint.complaint,
        category: newComplaint.category as any,
        priority: newComplaint.priority as any,
        status: "pending",
        date: new Date().toISOString().split('T')[0],
        assignedTo: getAssignedDepartment(newComplaint.category),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const success = await addComplaint(complaint);
      if (success) {
        setIsComplaintOpen(false);
        setNewComplaint({
          studentId: "",
          studentName: "",
          roomNumber: "",
          complaint: "",
          category: "",
          priority: "",
        });
        addNotification("success", "অভিযোগ দায়ের", "অভিযোগ সফলভাবে দায়ের করা হয়েছে");
      }
    } catch (error) {
      addNotification("error", "ত্রুটি", "অভিযোগ দায়ের করতে সমস্যা হয়েছে");
    }
  };

  const getAssignedDepartment = (category: string) => {
    switch (category) {
      case "maintenance":
        return "রক্ষণাবেক্ষণ বিভাগ";
      case "cleanliness":
        return "পরিচ্ছন্নতা বিভাগ";
      case "food":
        return "মেস ব্যবস্থাপক";
      case "security":
        return "নিরাপত্তা বিভাগ";
      default:
        return "প্রশাসন";
    }
  };

  const getRoomTypeText = (type: string) => {
    switch (type) {
      case "single":
        return "একক";
      case "double":
        return "দ্বিক";
      case "triple":
        return "ত্রিক";
      case "dormitory":
        return "ডরমিটরি";
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "সক্রিয়";
      case "pending":
        return "অপেক্ষমান";
      case "resolved":
        return "সমাধান";
      case "in_progress":
        return "প্রক্রিয়াধীন";
      case "paid":
        return "পরিশোধিত";
      case "overdue":
        return "বকেয়া";
      default:
        return status;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case "maintenance":
        return "রক্ষণাবেক্ষণ";
      case "cleanliness":
        return "পরিচ্ছন্নতা";
      case "food":
        return "খাবার";
      case "security":
        return "নিরাপত্তা";
      case "other":
        return "অন্যান্য";
      default:
        return category;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "জরুরি";
      case "medium":
        return "মধ্যম";
      case "low":
        return "কম";
      default:
        return priority;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              হোস্টেল ব্যবস্থাপনা
            </h1>
            <p className="text-gray-600 mt-1">
              রুম অ্যালোকেশন এবং আবাসিক সেবা ব্যবস্থাপনা
            </p>
            <p className="text-sm text-gray-500 mt-1">
              শেষ আপডেট: {hostelStats.lastUpdated.toLocaleString('bn-BD')}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              রিফ্রেশ
            </Button>
            <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  নতুন রুম
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>নতুন রুম যোগ করুন</DialogTitle>
                  <DialogDescription>
                    রুমের বিস্তারিত তথ্য প্রদান করুন
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="roomNumber">রুম নম্বর</Label>
                      <Input
                        id="roomNumber"
                        value={newRoom.roomNumber}
                        onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                        placeholder="১০১"
                      />
                    </div>
                    <div>
                      <Label htmlFor="roomFloor">তলা</Label>
                      <Input
                        id="roomFloor"
                        type="number"
                        value={newRoom.floor}
                        onChange={(e) => setNewRoom({ ...newRoom, floor: e.target.value })}
                        placeholder="১"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="roomType">ধরন</Label>
                      <Select value={newRoom.type} onValueChange={(value) => setNewRoom({ ...newRoom, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="রুমের ধরন নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">একক</SelectItem>
                          <SelectItem value="double">দ্বিক</SelectItem>
                          <SelectItem value="triple">ত্রিক</SelectItem>
                          <SelectItem value="dormitory">ডরমিট��ি</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="roomCapacity">ধারণক্ষমতা</Label>
                      <Input
                        id="roomCapacity"
                        type="number"
                        value={newRoom.capacity}
                        onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                        placeholder="২"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="roomFee">মাসিক ফি (৳)</Label>
                    <Input
                      id="roomFee"
                      type="number"
                      value={newRoom.monthlyFee}
                      onChange={(e) => setNewRoom({ ...newRoom, monthlyFee: e.target.value })}
                      placeholder="২৫০০"
                    />
                  </div>
                  <div>
                    <Label htmlFor="roomDescription">বিবরণ</Label>
                    <Textarea
                      id="roomDescription"
                      value={newRoom.description}
                      onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                      placeholder="রুমের বিস্তারিত বিবরণ"
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleAddRoom} className="w-full bg-purple-600 hover:bg-purple-700">
                    রুম যোগ করুন
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog
              open={isAllocateRoomOpen}
              onOpenChange={setIsAllocateRoomOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  রুম বরাদ্দ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>রুম বরাদ্দ করুন</DialogTitle>
                  <DialogDescription>
                    শিক্ষার্থীকে রুম বরাদ্দ করার জন্য তথ্য প্রদান করুন
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>শিক্ষার্থী আইডি</Label>
                      <Input 
                        value={roomAllocation.studentId}
                        onChange={(e) => setRoomAllocation({ ...roomAllocation, studentId: e.target.value })}
                        placeholder="STD001" 
                      />
                    </div>
                    <div>
                      <Label>শিক্ষার্থীর নাম</Label>
                      <Input 
                        value={roomAllocation.studentName}
                        onChange={(e) => setRoomAllocation({ ...roomAllocation, studentName: e.target.value })}
                        placeholder="নাম লিখুন" 
                      />
                    </div>
                  </div>
                  <div>
                    <Label>রুম নির্বাচন</Label>
                    <Select value={roomAllocation.roomId} onValueChange={(value) => setRoomAllocation({ ...roomAllocation, roomId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="উপলব্ধ রুম নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms
                          .filter((room: Room) => room.currentOccupancy < room.capacity)
                          .map((room: Room, index: number) => (
                            <SelectItem key={`select-room-${room.id}-${index}`} value={room.id}>
                              রুম {room.roomNumber} - {getRoomTypeText(room.type)} (৳{room.monthlyFee}) 
                              [{room.currentOccupancy}/{room.capacity}]
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>জরুরি যোগাযোগ</Label>
                    <Input 
                      value={roomAllocation.emergencyContact}
                      onChange={(e) => setRoomAllocation({ ...roomAllocation, emergencyContact: e.target.value })}
                      placeholder="01712345678" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>অভিভাবকের নাম</Label>
                      <Input 
                        value={roomAllocation.guardianName}
                        onChange={(e) => setRoomAllocation({ ...roomAllocation, guardianName: e.target.value })}
                        placeholder="অভিভাবকের নাম" 
                      />
                    </div>
                    <div>
                      <Label>শ্রেণী</Label>
                      <Input 
                        value={roomAllocation.class}
                        onChange={(e) => setRoomAllocation({ ...roomAllocation, class: e.target.value })}
                        placeholder="আলিম প্রথম বর্ষ" 
                      />
                    </div>
                  </div>
                  <Button onClick={handleAllocateRoom} className="w-full bg-blue-600 hover:bg-blue-700">
                    রুম বরাদ্দ করুন
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isComplaintOpen} onOpenChange={setIsComplaintOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  অভিযোগ দায়ের
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>নতুন অভিযোগ দায���ের করুন</DialogTitle>
                  <DialogDescription>
                    অভিযোগের বিস্তারিত তথ্য প্রদান করুন
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>শিক্ষার্থী আইডি</Label>
                      <Input 
                        value={newComplaint.studentId}
                        onChange={(e) => setNewComplaint({ ...newComplaint, studentId: e.target.value })}
                        placeholder="STD001" 
                      />
                    </div>
                    <div>
                      <Label>নাম</Label>
                      <Input 
                        value={newComplaint.studentName}
                        onChange={(e) => setNewComplaint({ ...newComplaint, studentName: e.target.value })}
                        placeholder="নাম লিখুন" 
                      />
                    </div>
                  </div>
                  <div>
                    <Label>রুম নম্বর</Label>
                    <Input 
                      value={newComplaint.roomNumber}
                      onChange={(e) => setNewComplaint({ ...newComplaint, roomNumber: e.target.value })}
                      placeholder="১০১" 
                    />
                  </div>
                  <div>
                    <Label>অভিযোগের বিবরণ</Label>
                    <Textarea 
                      value={newComplaint.complaint}
                      onChange={(e) => setNewComplaint({ ...newComplaint, complaint: e.target.value })}
                      placeholder="অভিযোগের বিস্তারিত লিখুন..." 
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>বিভাগ</Label>
                      <Select value={newComplaint.category} onValueChange={(value) => setNewComplaint({ ...newComplaint, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="অভিযোগের ধরন নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maintenance">রক্ষণাব���ক্ষণ</SelectItem>
                          <SelectItem value="cleanliness">পরিচ্ছন্নতা</SelectItem>
                          <SelectItem value="food">খাবার</SelectItem>
                          <SelectItem value="security">নিরাপত্তা</SelectItem>
                          <SelectItem value="other">অন্যান্য</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>অগ্রাধিকার</Label>
                      <Select value={newComplaint.priority} onValueChange={(value) => setNewComplaint({ ...newComplaint, priority: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="অগ্রাধিকার নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">কম</SelectItem>
                          <SelectItem value="medium">মধ্যম</SelectItem>
                          <SelectItem value="high">জরুরি</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleComplaint} className="w-full bg-orange-600 hover:bg-orange-700">
                    অভিযোগ জমা দিন
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building2 className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট রুম</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {roomsLoading ? (
                      <Activity className="h-6 w-6 animate-spin" />
                    ) : (
                      hostelStats.totalRooms
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bed className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    দখলকৃত রুম
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {hostelStats.occupiedRooms}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট ছাত্র</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {hostelStats.totalStudents}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Utensils className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">মেস সদস্য</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {hostelStats.messStudents}
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
                    অমীমাংসিত অভিযোগ
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {hostelStats.pendingComplaints}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">মাসিক আয়</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ৳{hostelStats.monthlyRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Room Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>রুমের অবস্থা</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {roomsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Activity className="h-8 w-8 animate-spin text-islamic-green" />
                  <span className="ml-2">লোড হচ্ছে...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {rooms.slice(0, 6).map((room: Room, index: number) => (
                    <div key={`room-${room.id}-${index}`} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            রুম {room.roomNumber}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {room.floor} তলা - {getRoomTypeText(room.type)}
                          </p>
                        </div>
                        <Badge
                          className={
                            room.currentOccupancy < room.capacity
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {room.currentOccupancy}/{room.capacity}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">মাসিক ফি:</span> ৳
                          {room.monthlyFee}
                        </div>
                        <div>
                          <span className="font-medium">সুবিধা:</span>{" "}
                          {room.facilities.slice(0, 3).join(", ")}
                          {room.facilities.length > 3 && "..."}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          বিস্তারিত
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          সম্পাদনা
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Complaints */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-orange-600" />
                <span>সাম্প্রতিক অভিযোগ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {complaintsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Activity className="h-8 w-8 animate-spin text-islamic-green" />
                  <span className="ml-2">লোড হচ্ছে...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {complaints.slice(0, 5).map((complaint: HostelComplaint, index: number) => (
                    <div key={`complaint-${complaint.id}-${index}`} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {complaint.studentName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            রুম {complaint.roomNumber}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getPriorityColor(complaint.priority)}>
                            {getPriorityText(complaint.priority)}
                          </Badge>
                          <Badge className={getStatusColor(complaint.status)}>
                            {getStatusText(complaint.status)}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        {complaint.complaint}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{getCategoryText(complaint.category)}</span>
                        <span>
                          {new Date(complaint.date).toLocaleDateString("bn-BD")}
                        </span>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {complaint.status === "pending" && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            প্রক্রিয়া শুরু
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Residents Table */}
        <Card>
          <CardHeader>
            <CardTitle>বর্তমান বাসিন্দারা</CardTitle>
            <CardDescription>
              হোস্টেলে বর্তমানে থাকা শিক্ষার্থীদের তালিকা
            </CardDescription>
          </CardHeader>
          <CardContent>
            {residentsLoading ? (
              <div className="flex justify-center items-center py-8">
                <Activity className="h-8 w-8 animate-spin text-islamic-green" />
                <span className="ml-2">লোড হচ্ছে...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">শিক্ষার্থীর নাম</th>
                      <th className="text-left p-2">আইডি</th>
                      <th className="text-left p-2">রুম নম্বর</th>
                      <th className="text-left p-2">প্রবেশের তারিখ</th>
                      <th className="text-left p-2">মাসিক ফি</th>
                      <th className="text-left p-2">পেমেন্ট অবস্থা</th>
                      <th className="text-left p-2">অবস্থা</th>
                      <th className="text-left p-2">কার্যক্রম</th>
                    </tr>
                  </thead>
                  <tbody>
                    {residents.map((resident: HostelResident, index: number) => (
                      <tr key={`resident-${resident.id}-${index}`} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">
                          {resident.studentName}
                        </td>
                        <td className="p-2">{resident.studentId}</td>
                        <td className="p-2">{resident.roomNumber}</td>
                        <td className="p-2">
                          {new Date(resident.checkInDate).toLocaleDateString("bn-BD")}
                        </td>
                        <td className="p-2">৳{resident.monthlyFee}</td>
                        <td className="p-2">
                          <Badge className={getStatusColor(resident.paymentStatus || "pending")}>
                            {getStatusText(resident.paymentStatus || "pending")}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <Badge className={getStatusColor(resident.status)}>
                            {getStatusText(resident.status)}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HostelDashboard;
