import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import Navigation from '../components/Navigation';
import { 
  Bus, 
  MapPin,
  Users,
  Route,
  Plus,
  Eye,
  Edit,
  UserPlus,
  Wrench,
  Navigation as NavigationIcon,
  Clock
} from 'lucide-react';

interface Vehicle {
  id: string;
  vehicleNumber: string;
  type: 'bus' | 'minibus' | 'microbus';
  capacity: number;
  currentPassengers: number;
  driverName: string;
  driverPhone: string;
  route: string;
  monthlyFee: number;
  status: 'active' | 'maintenance' | 'inactive';
  lastMaintenance: string;
}

interface TransportRoute {
  id: string;
  routeName: string;
  startPoint: string;
  endPoint: string;
  stops: string[];
  distance: number;
  duration: number;
  vehicles: number;
  passengers: number;
}

interface TransportUser {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  vehicleId: string;
  vehicleNumber: string;
  route: string;
  pickupPoint: string;
  monthlyFee: number;
  status: 'active' | 'inactive';
  emergencyContact: string;
}

interface TransportStats {
  totalVehicles: number;
  activeVehicles: number;
  totalPassengers: number;
  monthlyRevenue: number;
  totalRoutes: number;
  maintenanceVehicles: number;
}

const TransportDashboard: React.FC = () => {
  const [transportStats, setTransportStats] = useState<TransportStats | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [passengers, setPassengers] = useState<TransportUser[]>([]);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isEnrollPassengerOpen, setIsEnrollPassengerOpen] = useState(false);

  useEffect(() => {
    fetchTransportData();
  }, []);

  const fetchTransportData = async () => {
    try {
      const response = await fetch('/api/transport/dashboard');
      const data = await response.json();
      setTransportStats(data.stats);
      setVehicles(data.vehicles || []);
      setRoutes(data.routes || []);
      setPassengers(data.passengers || []);
    } catch (error) {
      console.error('Error fetching transport data:', error);
      // Mock data for demo
      setTransportStats({
        totalVehicles: 8,
        activeVehicles: 7,
        totalPassengers: 142,
        monthlyRevenue: 355000,
        totalRoutes: 5,
        maintenanceVehicles: 1
      });

      setVehicles([
        {
          id: '1',
          vehicleNumber: 'ঢাকা-মেট্রো-গ-১২৩৪৫৬',
          type: 'bus',
          capacity: 40,
          currentPassengers: 35,
          driverName: 'মোহাম্মদ করিম',
          driverPhone: '01712345678',
          route: 'চুনতি-রামগতি-লক্ষ্মীপুর',
          monthlyFee: 2500,
          status: 'active',
          lastMaintenance: '2024-11-15'
        },
        {
          id: '2',
          vehicleNumber: 'ঢাকা-মেট্রো-খ-৭৮৯০১২',
          type: 'minibus',
          capacity: 25,
          currentPassengers: 20,
          driverName: 'আব্দুল রহমান',
          driverPhone: '01812345678',
          route: 'চুনতি-কমলনগর',
          monthlyFee: 2000,
          status: 'active',
          lastMaintenance: '2024-12-01'
        }
      ]);

      setRoutes([
        {
          id: '1',
          routeName: 'চুনতি-রামগতি-লক্ষ্মীপুর',
          startPoint: 'চুনতি হাকিমিয়া মাদ্রাসা',
          endPoint: 'ল��্ষ্মীপুর সদর',
          stops: ['চুনতি বাজার', 'রামগতি', 'কামালনগর', 'লক্ষ্মীপুর'],
          distance: 25,
          duration: 45,
          vehicles: 2,
          passengers: 55
        },
        {
          id: '2',
          routeName: 'চুনতি-কমলনগর',
          startPoint: 'চুনতি হাকিমিয়া মাদ্রাসা',
          endPoint: 'কমলনগর',
          stops: ['চুনতি', 'কমলনগর'],
          distance: 15,
          duration: 30,
          vehicles: 1,
          passengers: 20
        }
      ]);

      setPassengers([
        {
          id: '1',
          studentId: 'std-001',
          studentName: 'মোহাম্মদ আব্দুল্লাহ',
          class: 'class-8',
          vehicleId: '1',
          vehicleNumber: 'ঢাকা-মেট্রো-গ-১২৩৪৫৬',
          route: 'চুনতি-রামগতি-লক্ষ্মীপুর',
          pickupPoint: 'রামগতি',
          monthlyFee: 2500,
          status: 'active',
          emergencyContact: '01712345678'
        }
      ]);
    }
  };

  const getVehicleTypeText = (type: string) => {
    switch (type) {
      case 'bus':
        return 'বাস';
      case 'minibus':
        return 'মিনিবাস';
      case 'microbus':
        return 'মাইক্রোবাস';
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'সক্রিয়';
      case 'maintenance':
        return 'রক্ষণাবেক্ষণ';
      case 'inactive':
        return 'নিষ্ক্রিয়';
      default:
        return status;
    }
  };

  if (!transportStats) {
    return <div className="flex justify-center items-center h-64">লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ট্রান্সপোর্ট ব্যবস্থাপনা</h1>
            <p className="text-gray-600 mt-1">যানবাহন ও রুট ব্যবস্থাপনা</p>
          </div>
          <div className="flex space-x-2">
            <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  যানবাহন যোগ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>নতুন যানবাহন যোগ করুন</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>যানবাহনের নম্বর</Label>
                    <Input placeholder="ঢাকা-মেট্রো-গ-১২৩৪৫৬" />
                  </div>
                  <div>
                    <Label>ধরন</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="যানবাহনের ধরন নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bus">বাস</SelectItem>
                        <SelectItem value="minibus">মিনিবাস</SelectItem>
                        <SelectItem value="microbus">মাইক্রোবাস</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>চালকের নাম</Label>
                    <Input placeholder="মোহাম্মদ করিম" />
                  </div>
                  <div>
                    <Label>চালকের ফোন</Label>
                    <Input placeholder="01712345678" />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    যানবাহন যোগ করুন
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isEnrollPassengerOpen} onOpenChange={setIsEnrollPassengerOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  যাত্রী ভর্তি
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>নতুন যাত্রী ভর্তি করুন</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>শিক্ষার্থী আইডি</Label>
                    <Input placeholder="std-001" />
                  </div>
                  <div>
                    <Label>রুট নির্বাচন</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="রুট নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {routes.map((route) => (
                          <SelectItem key={route.id} value={route.id}>
                            {route.routeName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>পিকআপ পয়েন্ট</Label>
                    <Input placeholder="রামগতি" />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    যাত্রী ভর্তি করুন
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
                <Bus className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট যানবাহন</p>
                  <p className="text-2xl font-bold text-gray-900">{transportStats.totalVehicles}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <NavigationIcon className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">সক্রিয় যানবাহন</p>
                  <p className="text-2xl font-bold text-gray-900">{transportStats.activeVehicles}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট যাত্রী</p>
                  <p className="text-2xl font-bold text-gray-900">{transportStats.totalPassengers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Route className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট রুট</p>
                  <p className="text-2xl font-bold text-gray-900">{transportStats.totalRoutes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Wrench className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">রক্ষণাবেক্ষণে</p>
                  <p className="text-2xl font-bold text-gray-900">{transportStats.maintenanceVehicles}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">মাসিক আয়</p>
                  <p className="text-2xl font-bold text-gray-900">৳{transportStats.monthlyRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vehicle Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bus className="w-5 h-5 text-blue-600" />
                <span>যানবাহনের অবস্থা</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{vehicle.vehicleNumber}</h3>
                        <p className="text-sm text-gray-600">{getVehicleTypeText(vehicle.type)} - {vehicle.driverName}</p>
                      </div>
                      <Badge className={getStatusColor(vehicle.status)}>
                        {getStatusText(vehicle.status)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">ধারণক্ষমতা:</span> {vehicle.capacity}
                      </div>
                      <div>
                        <span className="font-medium">বর্তমান যাত্রী:</span> {vehicle.currentPassengers}
                      </div>
                      <div>
                        <span className="font-medium">রুট:</span> {vehicle.route}
                      </div>
                      <div>
                        <span className="font-medium">মাসিক ফি:</span> ৳{vehicle.monthlyFee}
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
                      {vehicle.status === 'active' && (
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                          <Wrench className="w-4 h-4 mr-1" />
                          রক্ষণাবেক্ষণ
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Routes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span>পরিবহন রুট</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routes.map((route) => (
                  <div key={route.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{route.routeName}</h3>
                        <p className="text-sm text-gray-600">{route.startPoint} → {route.endPoint}</p>
                      </div>
                      <Badge variant="outline">{route.passengers} যাত্রী</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">দূরত্ব:</span> {route.distance} কিমি
                      </div>
                      <div>
                        <span className="font-medium">সময়:</span> {route.duration} মিনিট
                      </div>
                      <div>
                        <span className="font-medium">যানবাহন:</span> {route.vehicles}টি
                      </div>
                      <div>
                        <span className="font-medium">স্টপ:</span> {route.stops.length}টি
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      <span className="font-medium">স্টপসমূহ:</span> {route.stops.join(' → ')}
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
            </CardContent>
          </Card>
        </div>

        {/* Passengers Table */}
        <Card>
          <CardHeader>
            <CardTitle>বর্তমান যাত্রীরা</CardTitle>
            <CardDescription>পরিবহন সেবা ব্যবহারকারী শিক্ষার্থীদের তালিকা</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">শিক্ষার্থীর নাম</th>
                    <th className="text-left p-2">আইডি</th>
                    <th className="text-left p-2">শ্রেণী</th>
                    <th className="text-left p-2">যানবাহন</th>
                    <th className="text-left p-2">রুট</th>
                    <th className="text-left p-2">পিকআপ পয়েন্ট</th>
                    <th className="text-left p-2">মাসিক ফি</th>
                    <th className="text-left p-2">অবস্থা</th>
                    <th className="text-left p-2">কার্যক্রম</th>
                  </tr>
                </thead>
                <tbody>
                  {passengers.map((passenger) => (
                    <tr key={passenger.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{passenger.studentName}</td>
                      <td className="p-2">{passenger.studentId}</td>
                      <td className="p-2">{passenger.class}</td>
                      <td className="p-2">{passenger.vehicleNumber}</td>
                      <td className="p-2">{passenger.route}</td>
                      <td className="p-2">{passenger.pickupPoint}</td>
                      <td className="p-2">৳{passenger.monthlyFee}</td>
                      <td className="p-2">
                        <Badge className={getStatusColor(passenger.status)}>
                          {passenger.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
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

export default TransportDashboard;
