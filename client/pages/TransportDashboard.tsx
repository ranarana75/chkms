import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Bus, 
  Users,
  MapPin,
  AlertTriangle,
  DollarSign,
  Plus,
  Settings,
  FileText,
  Navigation,
  School,
  Clock
} from "lucide-react";

export default function TransportDashboard() {
  const [transportData, setTransportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransportData();
  }, []);

  const loadTransportData = () => {
    setLoading(true);
    // Mock data load
    setTimeout(() => {
      setTransportData({
        dashboard: {
          totalVehicles: 8,
          activeVehicles: 7,
          totalPassengers: 142,
          totalCapacity: 180,
          occupancyRate: 78.9,
          monthlyRevenue: 355000,
          totalRoutes: 5,
          maintenanceDue: 2
        },
        vehicles: [
          {
            id: "VH001",
            vehicleNumber: "ঢাকা-মেট্রো-গ-১২৩৪৫৬",
            type: "বাস",
            capacity: 40,
            currentPassengers: 35,
            driverName: "আবুল হোসেন",
            driverPhone: "০১৭১১২২৩৩৪৪",
            route: "লক্ষ্মীপুর - ঢাকা",
            monthlyFee: 2500,
            status: "active",
            nextMaintenance: "২০২৪-১২-১৫"
          },
          {
            id: "VH002",
            vehicleNumber: "ঢাকা-মেট্রো-খ-৭৮৯১২ৃ",
            type: "মিনিবাস",
            capacity: 25,
            currentPassengers: 20,
            driverName: "রহিম উদ্দিন",
            driverPhone: "০১৭২২৩৩৪৪৫৫",
            route: "কুমিল্লা - চট্টগ্রাম",
            monthlyFee: 2000,
            status: "active",
            nextMaintenance: "২০২��-১২-২০"
          },
          {
            id: "VH003",
            vehicleNumber: "ঢাকা-মেট্রো-ক-৫৬৭৮৯০",
            type: "মিনিবাস",
            capacity: 25,
            currentPassengers: 18,
            driverName: "সালাম মিয়া",
            driverPhone: "০১৭৩৩৪৪৫৫৬৬",
            route: "সিলেট - ঢাকা",
            monthlyFee: 3000,
            status: "maintenance",
            nextMaintenance: "২০২৪-১২-১২"
          }
        ],
        routes: [
          {
            id: "RT001",
            name: "লক্ষ্মীপুর - ঢাকা",
            distance: "১৮০ কিমি",
            duration: "৫ ঘন্টা",
            frequency: "দৈনিক",
            passengerCount: 35,
            vehicleNumber: "ঢাকা-মেট্রো-গ-১২৩৪৫৬"
          },
          {
            id: "RT002", 
            name: "কুমিল্লা - চট্টগ্রাম",
            distance: "১৫০ কিমি",
            duration: "৫ ঘন্টা",
            frequency: "সাপ্তাহিক",
            passengerCount: 20,
            vehicleNumber: "ঢাকা-মেট্রো-খ-৭৮৯১২৩"
          },
          {
            id: "RT003",
            name: "সিলেট - ঢাকা", 
            distance: "২৪০ কিমি",
            duration: "৬ ঘন্টা",
            frequency: "সাপ্তাহিক",
            passengerCount: 18,
            vehicleNumber: "ঢাকা-মেট্রো-ক-৫৬৭৮৯০"
          }
        ],
        recentActivity: [
          {
            type: "departure",
            description: "গাড়ি ছেড়েছে মাদ্রাসা থেকে",
            vehicle: "ঢাকা-মেট্রো-গ-১২৩৪৫৬",
            time: "৩০ মিনিট আগে"
          },
          {
            type: "maintenance",
            description: "রক্ষণাবেক্ষণ সম্পন্ন",
            vehicle: "ঢাকা-মেট্রো-ক-৫৬৭৮৯০",
            time: "২ ঘন্টা আগে"
          },
          {
            type: "enrollment",
            description: "নতুন যাত্রী যোগ হয়েছে",
            student: "মোহাম্মদ সাকিব",
            route: "কুমিল���লা - চট্টগ্রাম",
            time: "১ দিন আগে"
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

  const { dashboard, vehicles, routes, recentActivity } = transportData;

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">পরিবহন ব্যবস্থাপনা</h1>
            <p className="text-gray-600">গাড়ি, রুট এবং যাত্রী ব্যবস্থাপনা</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-islamic-green hover:bg-islamic-green-dark">
              <Plus className="h-4 w-4 mr-2" />
              নতুন যাত্রী যোগ
            </Button>
            <Button variant="outline">
              <Navigation className="h-4 w-4 mr-2" />
              GPS ট্র্যাকিং
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Bus className="h-8 w-8 text-islamic-blue" />
                <div>
                  <p className="text-2xl font-bold text-islamic-blue">{dashboard.totalVehicles}</p>
                  <p className="text-sm text-gray-600">মোট গাড়ি</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-islamic-green" />
                <div>
                  <p className="text-2xl font-bold text-islamic-green">{dashboard.totalPassengers}</p>
                  <p className="text-sm text-gray-600">মোট যাত্রী</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MapPin className="h-8 w-8 text-islamic-gold" />
                <div>
                  <p className="text-2xl font-bold text-islamic-gold">{dashboard.totalRoutes}</p>
                  <p className="text-sm text-gray-600">সক্রিয় রুট</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-600">{dashboard.maintenanceDue}</p>
                  <p className="text-sm text-gray-600">রক্ষণাবেক্ষণ প্রয়োজন</p>
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
                  <p className="text-sm text-green-600 mt-1">+৮% গত মাসের তুলনায়</p>
                </div>
                <DollarSign className="h-12 w-12 text-islamic-green/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">যাত্রী দখলের হার</p>
                  <p className="text-3xl font-bold text-islamic-blue">{dashboard.occupancyRate}%</p>
                  <p className="text-sm text-blue-600 mt-1">{dashboard.totalPassengers}/{dashboard.totalCapacity} সিট দখলে</p>
                </div>
                <Users className="h-12 w-12 text-islamic-blue/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vehicle List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bus className="h-5 w-5 text-islamic-blue" />
                <span>গাড়ির তালিকা</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{vehicle.vehicleNumber}</h3>
                        <p className="text-sm text-gray-600">{vehicle.type} • {vehicle.route}</p>
                      </div>
                      <Badge variant={vehicle.status === 'active' ? 'default' : 'destructive'}>
                        {vehicle.status === 'active' ? 'চলমান' : 'রক্ষণাবেক্ষণে'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="text-sm">
                        <p className="text-gray-600">চালক</p>
                        <p className="font-medium">{vehicle.driverName}</p>
                        <p className="text-xs text-gray-500">{vehicle.driverPhone}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-600">যাত্রী</p>
                        <p className="font-medium">{vehicle.currentPassengers}/{vehicle.capacity}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-islamic-green h-2 rounded-full" 
                            style={{ width: `${(vehicle.currentPassengers / vehicle.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">পরবর্তী সার্ভিস: {vehicle.nextMaintenance}</span>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">
                          বিস্তারিত
                        </Button>
                        <Button size="sm" className="bg-islamic-blue hover:bg-islamic-blue-dark">
                          ট্র্যাক
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Routes */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-islamic-gold" />
                  <span>রুট তালিকা</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routes.map((route) => (
                    <div key={route.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{route.name}</h3>
                        <Badge variant="outline">{route.frequency}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">দূরত্ব: {route.distance}</p>
                          <p className="text-gray-600">সময়: {route.duration}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">যাত্রী: {route.passengerCount} জন</p>
                          <p className="text-gray-600">গাড়ি: {route.vehicleNumber}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          রুট দেখুন
                        </Button>
                        <Button size="sm" className="bg-islamic-green hover:bg-islamic-green-dark flex-1">
                          সময়সূচি
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-islamic-green" />
                  <span>সাম্প্রতিক কার্যক্রম</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'departure' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'maintenance' ? 'bg-orange-100 text-orange-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {activity.type === 'departure' ? <Bus className="h-4 w-4" /> :
                         activity.type === 'maintenance' ? <Settings className="h-4 w-4" /> :
                         <Users className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.description}</p>
                        {activity.vehicle && (
                          <p className="text-sm text-gray-600">{activity.vehicle}</p>
                        )}
                        {activity.student && (
                          <p className="text-sm text-gray-600">{activity.student} • {activity.route}</p>
                        )}
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
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
                <span className="text-sm">নতুন যাত্রী</span>
              </Button>
              <Button className="h-20 flex flex-col space-y-2 bg-islamic-blue hover:bg-islamic-blue-dark">
                <Navigation className="h-6 w-6" />
                <span className="text-sm">GPS ট্র্যাকিং</span>
              </Button>
              <Button className="h-20 flex flex-col space-y-2 bg-islamic-gold hover:bg-islamic-gold/80">
                <Settings className="h-6 w-6" />
                <span className="text-sm">রক্ষণাবেক্ষণ</span>
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
