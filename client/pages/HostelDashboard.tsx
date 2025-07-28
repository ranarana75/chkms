import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import Navigation from '../components/Navigation';
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
  CheckCircle
} from 'lucide-react';

interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  type: 'single' | 'double' | 'triple' | 'dormitory';
  capacity: number;
  currentOccupancy: number;
  monthlyFee: number;
  facilities: string[];
  isActive: boolean;
}

interface HostelResident {
  id: string;
  studentId: string;
  studentName: string;
  roomId: string;
  roomNumber: string;
  checkInDate: string;
  monthlyFee: number;
  status: 'active' | 'inactive';
  emergencyContact: string;
}

interface HostelComplaint {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  complaint: string;
  category: 'maintenance' | 'cleanliness' | 'food' | 'security' | 'other';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'resolved';
  date: string;
}

interface HostelStats {
  totalRooms: number;
  occupiedRooms: number;
  totalStudents: number;
  monthlyRevenue: number;
  pendingComplaints: number;
  messStudents: number;
}

const HostelDashboard: React.FC = () => {
  const [hostelStats, setHostelStats] = useState<HostelStats | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [residents, setResidents] = useState<HostelResident[]>([]);
  const [complaints, setComplaints] = useState<HostelComplaint[]>([]);
  const [isAllocateRoomOpen, setIsAllocateRoomOpen] = useState(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);

  useEffect(() => {
    fetchHostelData();
  }, []);

  const fetchHostelData = async () => {
    try {
      const response = await fetch('/api/hostel/dashboard');
      const data = await response.json();
      setHostelStats(data.stats);
      setRooms(data.rooms || []);
      setResidents(data.residents || []);
      setComplaints(data.complaints || []);
    } catch (error) {
      console.error('Error fetching hostel data:', error);
      // Mock data for demo
      setHostelStats({
        totalRooms: 45,
        occupiedRooms: 38,
        totalStudents: 142,
        monthlyRevenue: 355000,
        pendingComplaints: 8,
        messStudents: 135
      });

      setRooms([
        {
          id: '1',
          roomNumber: '১০১',
          floor: 1,
          type: 'double',
          capacity: 2,
          currentOccupancy: 2,
          monthlyFee: 2500,
          facilities: ['ফ্যান', 'বিদ্যুৎ', 'পানি'],
          isActive: true
        },
        {
          id: '2',
          roomNumber: '১০২',
          floor: 1,
          type: 'triple',
          capacity: 3,
          currentOccupancy: 1,
          monthlyFee: 2000,
          facilities: ['ফ্যান', 'বিদ্যুৎ', 'পানি', 'আলমারি'],
          isActive: true
        }
      ]);

      setResidents([
        {
          id: '1',
          studentId: 'std-001',
          studentName: 'মোহাম্মদ আব্দুল্লাহ',
          roomId: '1',
          roomNumber: '১০১',
          checkInDate: '2024-01-15',
          monthlyFee: 2500,
          status: 'active',
          emergencyContact: '01712345678'
        }
      ]);

      setComplaints([
        {
          id: '1',
          studentId: 'std-001',
          studentName: 'মোহাম্মদ আব্দুল্লাহ',
          roomNumber: '১০১',
          complaint: 'রুমের ফ্যান নষ্ট',
          category: 'maintenance',
          priority: 'high',
          status: 'pending',
          date: '2024-12-10'
        }
      ]);
    }
  };

  const getRoomTypeText = (type: string) => {
    switch (type) {
      case 'single':
        return 'একক';
      case 'double':
        return 'দ্বিক';
      case 'triple':
        return 'ত্রিক';
      case 'dormitory':
        return 'ডরমিটরি';
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!hostelStats) {
    return <div className="flex justify-center items-center h-64">লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">হোস্টেল ব্যবস্থাপনা</h1>
            <p className="text-gray-600 mt-1">রুম অ্যালোকেশন এবং আবাসিক সেবা ব্যবস্থাপনা</p>
          </div>
          <div className="flex space-x-2">
            <Dialog open={isAllocateRoomOpen} onOpenChange={setIsAllocateRoomOpen}>
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
                  <div>
                    <Label>শিক্ষার্থী আইডি</Label>
                    <Input placeholder="std-001" />
                  </div>
                  <div>
                    <Label>রুম নির্বাচন</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="উপলব্ধ রুম নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.filter(room => room.currentOccupancy < room.capacity).map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            রুম {room.roomNumber} - {getRoomTypeText(room.type)} (৳{room.monthlyFee})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
                  <DialogTitle>নতুন অভিযোগ দায়ের করুন</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>অভিযোগের বিবরণ</Label>
                    <Textarea placeholder="অভিযোগের বিস্তারিত লিখুন..." />
                  </div>
                  <div>
                    <Label>বিভাগ</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="অভিযোগের ধরন নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maintenance">রক্ষণাবেক্ষণ</SelectItem>
                        <SelectItem value="cleanliness">পরিচ্ছন্নতা</SelectItem>
                        <SelectItem value="food">খাবার</SelectItem>
                        <SelectItem value="security">নিরাপত্তা</SelectItem>
                        <SelectItem value="other">অন্যান্য</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
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
                  <p className="text-2xl font-bold text-gray-900">{hostelStats.totalRooms}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bed className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">দখলকৃত রুম</p>
                  <p className="text-2xl font-bold text-gray-900">{hostelStats.occupiedRooms}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{hostelStats.totalStudents}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{hostelStats.messStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">অমীমাংসিত অভিযোগ</p>
                  <p className="text-2xl font-bold text-gray-900">{hostelStats.pendingComplaints}</p>
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
                  <p className="text-2xl font-bold text-gray-900">৳{hostelStats.monthlyRevenue.toLocaleString()}</p>
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
              <div className="space-y-4">
                {rooms.map((room) => (
                  <div key={room.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">রুম {room.roomNumber}</h3>
                        <p className="text-sm text-gray-600">{room.floor} তলা - {getRoomTypeText(room.type)}</p>
                      </div>
                      <Badge className={room.currentOccupancy < room.capacity ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {room.currentOccupancy}/{room.capacity}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">মা��িক ফি:</span> ৳{room.monthlyFee}
                      </div>
                      <div>
                        <span className="font-medium">সুবিধা:</span> {room.facilities.join(', ')}
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3">
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
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{complaint.studentName}</h3>
                        <p className="text-sm text-gray-600">রুম {complaint.roomNumber}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getPriorityColor(complaint.priority)}>
                          {complaint.priority === 'high' ? 'জরুরি' : 
                           complaint.priority === 'medium' ? 'মধ্যম' : 'কম'}
                        </Badge>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status === 'pending' ? 'অপেক্ষমান' : 
                           complaint.status === 'in_progress' ? 'প্রক্রিয়াধীন' : 'সমাধান'}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{complaint.complaint}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{new Date(complaint.date).toLocaleDateString('bn-BD')}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {complaint.status === 'pending' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            সমাধান
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Residents Table */}
        <Card>
          <CardHeader>
            <CardTitle>বর্তমান বাসিন্দারা</CardTitle>
            <CardDescription>হোস্টেলে বর্তমানে থাকা শিক্ষার্থীদের তালিকা</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">শিক্ষার্থীর নাম</th>
                    <th className="text-left p-2">আইডি</th>
                    <th className="text-left p-2">রুম নম্বর</th>
                    <th className="text-left p-2">প্রবেশের তারিখ</th>
                    <th className="text-left p-2">মাসিক ফি</th>
                    <th className="text-left p-2">জরুরি যোগাযোগ</th>
                    <th className="text-left p-2">অবস্থা</th>
                    <th className="text-left p-2">কার্যক্রম</th>
                  </tr>
                </thead>
                <tbody>
                  {residents.map((resident) => (
                    <tr key={resident.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{resident.studentName}</td>
                      <td className="p-2">{resident.studentId}</td>
                      <td className="p-2">{resident.roomNumber}</td>
                      <td className="p-2">{new Date(resident.checkInDate).toLocaleDateString('bn-BD')}</td>
                      <td className="p-2">৳{resident.monthlyFee}</td>
                      <td className="p-2">{resident.emergencyContact}</td>
                      <td className="p-2">
                        <Badge className={getStatusColor(resident.status)}>
                          {resident.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HostelDashboard;
