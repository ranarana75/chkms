import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Building2, 
  Users,
  Bed,
  AlertTriangle,
  DollarSign,
  Plus,
  Settings,
  FileText,
  Calendar,
  School
} from "lucide-react";

export default function HostelDashboard() {
  const [hostelData, setHostelData] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHostelData();
  }, []);

  const loadHostelData = () => {
    setLoading(true);
    // Mock data load
    setTimeout(() => {
      setHostelData({
        dashboard: {
          totalRooms: 50,
          occupiedRooms: 42,
          availableRooms: 8,
          totalResidents: 78,
          occupancyRate: 78.0,
          monthlyRevenue: 234000,
          pendingComplaints: 5
        },
        rooms: [
          {
            id: "RM001",
            roomNumber: "১০১",
            floor: 1,
            type: "double",
            capacity: 2,
            currentOccupancy: 2,
            monthlyFee: 3000,
            status: "occupied",
            residents: [
              { name: "মোহাম্মদ আবদুল্লাহ", checkInDate: "২০২৪-০১-১৫" },
              { name: "আবুল কাসেম", checkInDate: "২০২৪-০১-২০" }
            ]
          },
          {
            id: "RM002", 
            roomNumber: "১০২",
            floor: 1,
            type: "triple",
            capacity: 3,
            currentOccupancy: 2,
            monthlyFee: 2500,
            status: "available",
            residents: [
              { name: "মোহাম্মদ ইব্রাহিম", checkInDate: "২০২৪-০২-০১" },
              { name: "আব্দুর র���মান", checkInDate: "২০২৪-০২-০৫" }
            ]
          },
          {
            id: "RM003",
            roomNumber: "২০১", 
            floor: 2,
            type: "single",
            capacity: 1,
            currentOccupancy: 1,
            monthlyFee: 4000,
            status: "occupied",
            residents: [
              { name: "মোহাম্মদ হাসান", checkInDate: "২০২৪-০৩-১০" }
            ]
          }
        ],
        recentActivity: [
          {
            type: "check_in",
            description: "নতুন শিক্ষার্থী চেক-ইন",
            student: "মোহাম্মদ হাসান",
            room: "১০৫",
            time: "২ ঘন্টা আগে"
          },
          {
            type: "complaint", 
            description: "নতুন অভিযোগ জমা",
            student: "আবু বকর",
            room: "২০৩",
            time: "৪ ঘন্টা আগে"
          },
          {
            type: "payment",
            description: "হোস্টেল ফি পেমেন্ট",
            student: "উমর ফারুক",
            room: "৩০১",
            time: "১ দিন আগে"
          }
        ],
        complaints: [
          {
            id: "CMP001",
            studentName: "মোহাম্মদ আবদুল্লাহ",
            roomNumber: "১০১",
            category: "বিদ্যুৎ",
            description: "রুমের ফ্যান কাজ করছে না",
            priority: "high",
            status: "pending",
            submittedDate: "২০২৪-১২-১৪"
          },
          {
            id: "CMP002", 
            studentName: "মোহাম্মদ ইব্রাহিম",
            roomNumber: "১০২",
            category: "পানি",
            description: "বাথরুমের কল থেকে পানি আসে না",
            priority: "medium",
            status: "in_progress",
            submittedDate: "২০২৪-১২-১২"
          }
        ]
      });
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green"></div>
      </div>
    );
  }

  const { dashboard, rooms, recentActivity, complaints } = hostelData;

  const filteredRooms = selectedFloor === "all" 
    ? rooms 
    : rooms.filter(room => room.floor === Number(selectedFloor));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-green-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/admin" className="inline-flex items-center text-islamic-green hover:text-islamic-green-dark transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              ড্যাশবোর্ডে ফিরে যান
            </Link>
            <div className="flex items-center space-x-2">
              <School className="h-6 w-6 text-islamic-green" />
              <span className="font-bold text-islamic-green">CHKMS</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">হোস্টেল ব্যবস্থাপনা</h1>
            <p className="text-gray-600">রুম বরাদ্দ, আবাসিক সেবা এবং অভিযোগ ব্যবস্থাপনা</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-islamic-green hover:bg-islamic-green-dark">
              <Plus className="h-4 w-4 mr-2" />
              নতুন বরাদ্দ
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              সেটিংস
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-islamic-blue" />
                <div>
                  <p className="text-2xl font-bold text-islamic-blue">{dashboard.totalRooms}</p>
                  <p className="text-sm text-gray-600">মোট রুম</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-islamic-green" />
                <div>
                  <p className="text-2xl font-bold text-islamic-green">{dashboard.totalResidents}</p>
                  <p className="text-sm text-gray-600">মোট আবাসিক</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Bed className="h-8 w-8 text-islamic-gold" />
                <div>
                  <p className="text-2xl font-bold text-islamic-gold">{dashboard.availableRooms}</p>
                  <p className="text-sm text-gray-600">উপলব্ধ রুম</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-600">{dashboard.pendingComplaints}</p>
                  <p className="text-sm text-gray-600">অমীমাংসিত অভিযোগ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue and Occupancy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">মাসিক আয়</p>
                  <p className="text-3xl font-bold text-islamic-green">৳{dashboard.monthlyRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+১২% গত মাসের তুলনায়</p>
                </div>
                <DollarSign className="h-12 w-12 text-islamic-green/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">দখলের হার</p>
                  <p className="text-3xl font-bold text-islamic-blue">{dashboard.occupancyRate}%</p>
                  <p className="text-sm text-blue-600 mt-1">{dashboard.occupiedRooms}/{dashboard.totalRooms} রুম দখলে</p>
                </div>
                <Building2 className="h-12 w-12 text-islamic-blue/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Room Filter */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>রুম ব্যবস্থাপনা</CardTitle>
              <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব তলা</SelectItem>
                  <SelectItem value="1">১ম তলা</SelectItem>
                  <SelectItem value="2">২য় তলা</SelectItem>
                  <SelectItem value="3">৩য় তলা</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRooms.map((room) => (
                <div key={room.id} className={`p-4 border rounded-lg ${
                  room.status === 'occupied' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">রুম {room.roomNumber}</h3>
                    <Badge variant={room.status === 'occupied' ? 'destructive' : 'default'}>
                      {room.status === 'occupied' ? 'দখলে' : 'উপলব্ধ'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">ধরন:</span> {
                      room.type === 'single' ? 'একক' :
                      room.type === 'double' ? 'দ্বিজন' : 'ত্রিজন'
                    }</p>
                    <p><span className="font-medium">ধারণক্ষমতা:</span> {room.currentOccupancy}/{room.capacity}</p>
                    <p><span className="font-medium">মাসিক ফি:</span> ৳{room.monthlyFee.toLocaleString()}</p>
                  </div>

                  {room.residents.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs font-medium text-gray-600 mb-2">বর্তমান আবাসিক:</p>
                      {room.residents.map((resident, index) => (
                        <p key={index} className="text-xs text-gray-700">{resident.name}</p>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      বিস্তারিত
                    </Button>
                    {room.status === 'available' && (
                      <Button size="sm" className="bg-islamic-green hover:bg-islamic-green-dark flex-1">
                        বরাদ্দ করুন
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-islamic-blue" />
                <span>সাম্প্রতিক কার্যক্রম</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'check_in' ? 'bg-green-100 text-green-600' :
                      activity.type === 'complaint' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'check_in' ? <Users className="h-4 w-4" /> :
                       activity.type === 'complaint' ? <AlertTriangle className="h-4 w-4" /> :
                       <DollarSign className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.description}</p>
                      <p className="text-sm text-gray-600">
                        {activity.student} • রুম {activity.room}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Complaints */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>অমীমাংসিত অভিযোগ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{complaint.category}</h4>
                        <p className="text-sm text-gray-600">{complaint.studentName} • রুম {complaint.roomNumber}</p>
                      </div>
                      <Badge variant={
                        complaint.priority === 'high' ? 'destructive' :
                        complaint.priority === 'medium' ? 'default' : 'secondary'
                      }>
                        {complaint.priority === 'high' ? 'জরুরি' :
                         complaint.priority === 'medium' ? 'মধ্যম' : 'কম'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{complaint.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">জমা: {complaint.submittedDate}</span>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">
                          বিস্তারিত
                        </Button>
                        <Button size="sm" className="bg-islamic-green hover:bg-islamic-green-dark">
                          সমাধান
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>দ্রুত অ্যাকশন</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col space-y-2 bg-islamic-green hover:bg-islamic-green-dark">
                <Plus className="h-6 w-6" />
                <span className="text-sm">নতুন বরাদ্দ</span>
              </Button>
              <Button className="h-20 flex flex-col space-y-2 bg-islamic-blue hover:bg-islamic-blue-dark">
                <Users className="h-6 w-6" />
                <span className="text-sm">চেক-আউট</span>
              </Button>
              <Button className="h-20 flex flex-col space-y-2 bg-islamic-gold hover:bg-islamic-gold/80">
                <Settings className="h-6 w-6" />
                <span className="text-sm">মেস মেনু</span>
              </Button>
              <Button className="h-20 flex flex-col space-y-2 bg-purple-600 hover:bg-purple-700">
                <FileText className="h-6 w-6" />
                <span className="text-sm">রিপোর্ট</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
