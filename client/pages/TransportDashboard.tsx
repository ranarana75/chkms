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
import { Bus, Users, MapPin, Clock, Plus, Edit, Trash2, Route, AlertCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface Vehicle {
  id: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  routeId: string;
  status: 'active' | 'maintenance' | 'inactive';
  lastMaintenance: string;
  nextMaintenance: string;
  createdAt: string;
}

interface TransportRoute {
  id: string;
  routeName: string;
  startLocation: string;
  endLocation: string;
  stops: string[];
  departureTime: string;
  arrivalTime: string;
  fare: number;
  vehicleId?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface TransportUser {
  id: string;
  studentId: string;
  studentName: string;
  routeId: string;
  pickupStop: string;
  dropoffStop: string;
  feeStatus: 'paid' | 'pending' | 'overdue';
  parentPhone: string;
  enrollmentDate: string;
  status: 'active' | 'inactive';
}

interface TransportStats {
  totalVehicles: number;
  totalRoutes: number;
  totalStudents: number;
  activeVehicles: number;
  maintenance: number;
  totalRevenue: number;
  pendingFees: number;
}

export default function TransportDashboard() {
  const [vehicles, setVehicles] = useLocalStorage<Vehicle[]>('vehicles', []);
  const [routes, setRoutes] = useLocalStorage<TransportRoute[]>('transportRoutes', []);
  const [transportUsers, setTransportUsers] = useLocalStorage<TransportUser[]>('transportUsers', []);
  const [stats, setStats] = useState<TransportStats>({
    totalVehicles: 0,
    totalRoutes: 0,
    totalStudents: 0,
    activeVehicles: 0,
    maintenance: 0,
    totalRevenue: 0,
    pendingFees: 0
  });

  const { addNotification } = useNotifications();
  const [isVehicleDialogOpen, setIsVehicleDialogOpen] = useState(false);
  const [isRouteDialogOpen, setIsRouteDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editingRoute, setEditingRoute] = useState<TransportRoute | null>(null);
  const [editingUser, setEditingUser] = useState<TransportUser | null>(null);

  // Initialize with sample data if empty
  useEffect(() => {
    if (vehicles.length === 0 && routes.length === 0) {
      const sampleRoutes: TransportRoute[] = [
        {
          id: '1',
          routeName: 'মূল রুট ১',
          startLocation: 'ঢাকা',
          endLocation: 'মাদ্রাসা ক্যাম্পাস',
          stops: ['মিরপুর ১০', 'কাজীপাড়া', 'শেওড়াপাড়া', 'মাদ্রাসা গেট'],
          departureTime: '07:00',
          arrivalTime: '08:30',
          fare: 500,
          status: 'active',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          routeName: 'উত্তরা রুট',
          startLocation: 'উত্তরা',
          endLocation: 'মাদ্রাসা ক্যাম্পাস',
          stops: ['উত্তরা সেক্টর ৭', 'হাজী ক্যাম্প', 'বিমানবন্দর', 'মাদ্রাসা গেট'],
          departureTime: '06:45',
          arrivalTime: '08:15',
          fare: 600,
          status: 'active',
          createdAt: new Date().toISOString()
        }
      ];

      const sampleVehicles: Vehicle[] = [
        {
          id: '1',
          vehicleNumber: 'ঢাকা-মে-১১-৯৮৭৬',
          driverName: 'আব্দুল করিম',
          driverPhone: '০১৭৮৮৮৮৮৮৮৮',
          capacity: 45,
          routeId: '1',
          status: 'active',
          lastMaintenance: '2024-01-15',
          nextMaintenance: '2024-04-15',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          vehicleNumber: 'ঢাকা-খ-১২-৫৪৩২',
          driverName: 'মোহাম্মদ রহিম',
          driverPhone: '০১৯৯৯৯৯৯৯৯৯',
          capacity: 35,
          routeId: '2',
          status: 'maintenance',
          lastMaintenance: '2024-02-01',
          nextMaintenance: '2024-05-01',
          createdAt: new Date().toISOString()
        }
      ];

      const sampleUsers: TransportUser[] = [
        {
          id: '1',
          studentId: 'STD001',
          studentName: 'মোহাম্মদ আলী',
          routeId: '1',
          pickupStop: 'মিরপুর ১০',
          dropoffStop: 'মাদ্রাসা গেট',
          feeStatus: 'paid',
          parentPhone: '০১৭১১১১১১১১',
          enrollmentDate: '2024-01-01',
          status: 'active'
        },
        {
          id: '2',
          studentId: 'STD002',
          studentName: 'ফাতিমা খাতুন',
          routeId: '2',
          pickupStop: 'উত্তরা সেক্টর ৭',
          dropoffStop: 'মাদ্রাসা গেট',
          feeStatus: 'pending',
          parentPhone: '০১৮২২২২২২২২',
          enrollmentDate: '2024-01-15',
          status: 'active'
        }
      ];

      setRoutes(sampleRoutes);
      setVehicles(sampleVehicles);
      setTransportUsers(sampleUsers);
    }
  }, [vehicles.length, routes.length, setVehicles, setRoutes, setTransportUsers]);

  // Calculate stats
  useEffect(() => {
    const totalVehicles = vehicles.length;
    const totalRoutes = routes.length;
    const totalStudents = transportUsers.filter(user => user.status === 'active').length;
    const activeVehicles = vehicles.filter(v => v.status === 'active').length;
    const maintenance = vehicles.filter(v => v.status === 'maintenance').length;
    
    const totalRevenue = transportUsers
      .filter(user => user.feeStatus === 'paid')
      .reduce((sum, user) => {
        const route = routes.find(r => r.id === user.routeId);
        return sum + (route?.fare || 0);
      }, 0);

    const pendingFees = transportUsers
      .filter(user => user.feeStatus === 'pending' || user.feeStatus === 'overdue')
      .reduce((sum, user) => {
        const route = routes.find(r => r.id === user.routeId);
        return sum + (route?.fare || 0);
      }, 0);

    setStats({
      totalVehicles,
      totalRoutes,
      totalStudents,
      activeVehicles,
      maintenance,
      totalRevenue,
      pendingFees
    });
  }, [vehicles, routes, transportUsers]);

  const handleAddVehicle = (vehicleData: Omit<Vehicle, 'id' | 'createdAt'>) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setVehicles([...vehicles, newVehicle]);
    addNotification('যানবাহন সফলভাবে যোগ করা হয়েছে', 'success');
    setIsVehicleDialogOpen(false);
  };

  const handleAddRoute = (routeData: Omit<TransportRoute, 'id' | 'createdAt'>) => {
    const newRoute: TransportRoute = {
      ...routeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setRoutes([...routes, newRoute]);
    addNotification('রুট সফলভাবে যোগ করা হয়েছে', 'success');
    setIsRouteDialogOpen(false);
  };

  const handleAddUser = (userData: Omit<TransportUser, 'id'>) => {
    const newUser: TransportUser = {
      ...userData,
      id: Date.now().toString()
    };
    setTransportUsers([...transportUsers, newUser]);
    addNotification('শিক্ষার্থী সফলভাবে নিবন্ধিত হয়েছে', 'success');
    setIsUserDialogOpen(false);
  };

  const handleEditVehicle = (vehicleData: Omit<Vehicle, 'id' | 'createdAt'>) => {
    if (editingVehicle) {
      const updatedVehicles = vehicles.map(v => 
        v.id === editingVehicle.id 
          ? { ...v, ...vehicleData }
          : v
      );
      setVehicles(updatedVehicles);
      addNotification('যানবাহনের তথ্য আপড��ট হয়েছে', 'success');
      setEditingVehicle(null);
      setIsVehicleDialogOpen(false);
    }
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    const updatedVehicles = vehicles.filter(v => v.id !== vehicleId);
    setVehicles(updatedVehicles);
    addNotification('যানবাহন মুছে ফেলা হয়েছে', 'success');
  };

  const handleDeleteRoute = (routeId: string) => {
    const updatedRoutes = routes.filter(r => r.id !== routeId);
    setRoutes(updatedRoutes);
    addNotification('রুট মুছে ফেলা হয়েছে', 'success');
  };

  const updateFeeStatus = (userId: string, newStatus: 'paid' | 'pending' | 'overdue') => {
    const updatedUsers = transportUsers.map(user =>
      user.id === userId ? { ...user, feeStatus: newStatus } : user
    );
    setTransportUsers(updatedUsers);
    addNotification('ফি স্ট্যাটাস আপডেট হয়েছে', 'success');
  };

  const getStatusBadge = (status: string, type: 'vehicle' | 'route' | 'fee') => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      active: "default",
      inactive: "secondary",
      maintenance: "destructive",
      paid: "default",
      pending: "outline",
      overdue: "destructive"
    };
    
    const labels: { [key: string]: string } = {
      active: 'সক্রিয়',
      inactive: 'নিষ্ক্রিয়',
      maintenance: 'রক্ষণাবেক্ষণ',
      paid: 'পরিশোধিত',
      pending: 'বাকি',
      overdue: 'বিলম্বিত'
    };

    return (
      <Badge variant={variants[status] || "secondary"}>
        {labels[status] || status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100" style={{ fontFamily: '"Noto Serif Bengali", serif' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">পরিবহন ড্যাশবোর্ড</h1>
          <p className="text-emerald-600">যানবাহন ও রুট ব্যবস্থাপনা</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">মোট যানবাহন</CardTitle>
              <Bus className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{stats.totalVehicles}</div>
              <p className="text-xs text-blue-600">সক্রিয়: {stats.activeVehicles}</p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">মোট রুট</CardTitle>
              <Route className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{stats.totalRoutes}</div>
              <p className="text-xs text-green-600">পরিচালিত রুট</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">মোট শিক্���ার্থী</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{stats.totalStudents}</div>
              <p className="text-xs text-purple-600">নিবন্ধিত</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">রক্ষণাবেক্ষণ</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{stats.maintenance}</div>
              <p className="text-xs text-orange-600">যানবাহন</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-emerald-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-700">মোট আয়</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-800">৳{stats.totalRevenue.toLocaleString()}</div>
              <p className="text-sm text-emerald-600">এই মাসে</p>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">বকেয়া ফি</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-800">৳{stats.pendingFees.toLocaleString()}</div>
              <p className="text-sm text-red-600">পরিশোধের অপেক্ষায়</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="vehicles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vehicles">যানবাহন</TabsTrigger>
            <TabsTrigger value="routes">রুট</TabsTrigger>
            <TabsTrigger value="students">শিক্ষার্থী</TabsTrigger>
          </TabsList>

          {/* Vehicles Tab */}
          <TabsContent value="vehicles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-emerald-800">যানবাহন তালিকা</h2>
              <Dialog open={isVehicleDialogOpen} onOpenChange={setIsVehicleDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন যানবাহন
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingVehicle ? 'যানবাহন সম্পাদনা' : 'নতুন যানবাহন যোগ'}</DialogTitle>
                    <DialogDescription>
                      যানবাহনের তথ্য পূরণ করুন
                    </DialogDescription>
                  </DialogHeader>
                  <VehicleForm 
                    vehicle={editingVehicle}
                    routes={routes}
                    onSubmit={editingVehicle ? handleEditVehicle : handleAddVehicle}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {vehicles.map((vehicle) => {
                const route = routes.find(r => r.id === vehicle.routeId);
                return (
                  <Card key={vehicle.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{vehicle.vehicleNumber}</h3>
                            {getStatusBadge(vehicle.status, 'vehicle')}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">চালক: {vehicle.driverName}</p>
                              <p className="text-gray-600">ফোন: {vehicle.driverPhone}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">ধারণক্ষমতা: {vehicle.capacity} জন</p>
                              <p className="text-gray-600">রুট: {route?.routeName || 'নির্ধারিত নয়'}</p>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-500">
                            <p>শেষ রক্ষণাবেক্ষণ: {new Date(vehicle.lastMaintenance).toLocaleDateString('bn-BD')}</p>
                            <p>পরবর্তী রক্ষণাবেক্ষণ: {new Date(vehicle.nextMaintenance).toLocaleDateString('bn-BD')}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingVehicle(vehicle);
                              setIsVehicleDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteVehicle(vehicle.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Routes Tab */}
          <TabsContent value="routes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-emerald-800">রুট তালিকা</h2>
              <Dialog open={isRouteDialogOpen} onOpenChange={setIsRouteDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন রুট
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>নতুন রুট যোগ</DialogTitle>
                    <DialogDescription>
                      রুটের বিস্তারিত তথ্য পূরণ করুন
                    </DialogDescription>
                  </DialogHeader>
                  <RouteForm onSubmit={handleAddRoute} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {routes.map((route) => {
                const assignedVehicle = vehicles.find(v => v.routeId === route.id);
                const studentsCount = transportUsers.filter(u => u.routeId === route.id && u.status === 'active').length;
                
                return (
                  <Card key={route.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg font-semibold">{route.routeName}</h3>
                            {getStatusBadge(route.status, 'route')}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">
                                <MapPin className="w-4 h-4 inline mr-1" />
                                {route.startLocation} → {route.endLocation}
                              </p>
                              <p className="text-sm text-gray-600 mb-1">
                                <Clock className="w-4 h-4 inline mr-1" />
                                {route.departureTime} - {route.arrivalTime}
                              </p>
                              <p className="text-sm text-gray-600">
                                <Users className="w-4 h-4 inline mr-1" />
                                {studentsCount} জন শিক্ষার��থী
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">ভাড়া: ৳{route.fare}</p>
                              <p className="text-sm text-gray-600 mb-1">
                                যানবাহন: {assignedVehicle?.vehicleNumber || 'নির্ধারিত নয়'}
                              </p>
                              <div className="text-sm text-gray-600">
                                <p className="font-medium mb-1">স্টপেজ:</p>
                                <div className="flex flex-wrap gap-1">
                                  {route.stops.map((stop, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {stop}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteRoute(route.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-emerald-800">শিক্ষার্থী তালিকা</h2>
              <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন নিবন্ধন
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>শিক্��ার্থী নিবন্ধন</DialogTitle>
                    <DialogDescription>
                      পরিবহন সেবার জন্য শিক্ষার্থী নিবন্ধন করুন
                    </DialogDescription>
                  </DialogHeader>
                  <TransportUserForm routes={routes} onSubmit={handleAddUser} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {transportUsers.map((user) => {
                const route = routes.find(r => r.id === user.routeId);
                return (
                  <Card key={user.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{user.studentName}</h3>
                            <Badge variant="outline">ID: {user.studentId}</Badge>
                            {getStatusBadge(user.feeStatus, 'fee')}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">রুট: {route?.routeName}</p>
                              <p className="text-gray-600">উঠার স্থান: {user.pickupStop}</p>
                              <p className="text-gray-600">নামার স্থান: {user.dropoffStop}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">অভিভাবকের ফোন: {user.parentPhone}</p>
                              <p className="text-gray-600">ভর্তির তারিখ: {new Date(user.enrollmentDate).toLocaleDateString('bn-BD')}</p>
                              <p className="text-gray-600">মাসিক ভাড়া: ৳{route?.fare || 0}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Select
                            value={user.feeStatus}
                            onValueChange={(value: 'paid' | 'pending' | 'overdue') => updateFeeStatus(user.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="paid">পরিশোধিত</SelectItem>
                              <SelectItem value="pending">বাকি</SelectItem>
                              <SelectItem value="overdue">বিলম্বিত</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function VehicleForm({ 
  vehicle, 
  routes, 
  onSubmit 
}: { 
  vehicle?: Vehicle | null; 
  routes: TransportRoute[];
  onSubmit: (data: Omit<Vehicle, 'id' | 'createdAt'>) => void;
}) {
  const [formData, setFormData] = useState({
    vehicleNumber: vehicle?.vehicleNumber || '',
    driverName: vehicle?.driverName || '',
    driverPhone: vehicle?.driverPhone || '',
    capacity: vehicle?.capacity || 30,
    routeId: vehicle?.routeId || '',
    status: vehicle?.status || 'active' as const,
    lastMaintenance: vehicle?.lastMaintenance || new Date().toISOString().split('T')[0],
    nextMaintenance: vehicle?.nextMaintenance || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vehicleNumber">গাড়ির নম্বর</Label>
          <Input
            id="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})}
            placeholder="ঢাকা-মে-১১-৯৮৭৬"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">ধারণক্ষমতা</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="driverName">চালকের নাম</Label>
          <Input
            id="driverName"
            value={formData.driverName}
            onChange={(e) => setFormData({...formData, driverName: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="driverPhone">চালকের ফোন</Label>
          <Input
            id="driverPhone"
            value={formData.driverPhone}
            onChange={(e) => setFormData({...formData, driverPhone: e.target.value})}
            placeholder="০১৭xxxxxxxx"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="routeId">রুট</Label>
          <Select value={formData.routeId} onValueChange={(value) => setFormData({...formData, routeId: value})}>
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
        <div className="space-y-2">
          <Label htmlFor="status">অবস্থা</Label>
          <Select value={formData.status} onValueChange={(value: 'active' | 'maintenance' | 'inactive') => setFormData({...formData, status: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">সক্রিয়</SelectItem>
              <SelectItem value="maintenance">রক্ষণাবেক্ষণ</SelectItem>
              <SelectItem value="inactive">নিষ্ক্রিয়</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lastMaintenance">শেষ রক্ষণাবেক্ষণ</Label>
          <Input
            id="lastMaintenance"
            type="date"
            value={formData.lastMaintenance}
            onChange={(e) => setFormData({...formData, lastMaintenance: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nextMaintenance">পরবর্তী রক্ষণাবেক্ষণ</Label>
          <Input
            id="nextMaintenance"
            type="date"
            value={formData.nextMaintenance}
            onChange={(e) => setFormData({...formData, nextMaintenance: e.target.value})}
            required
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          {vehicle ? 'আপডেট করুন' : 'যোগ করুন'}
        </Button>
      </DialogFooter>
    </form>
  );
}

function RouteForm({ onSubmit }: { onSubmit: (data: Omit<TransportRoute, 'id' | 'createdAt'>) => void }) {
  const [formData, setFormData] = useState({
    routeName: '',
    startLocation: '',
    endLocation: '',
    stops: [] as string[],
    departureTime: '',
    arrivalTime: '',
    fare: 0,
    status: 'active' as const
  });

  const [newStop, setNewStop] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addStop = () => {
    if (newStop.trim()) {
      setFormData({...formData, stops: [...formData.stops, newStop.trim()]});
      setNewStop('');
    }
  };

  const removeStop = (index: number) => {
    setFormData({...formData, stops: formData.stops.filter((_, i) => i !== index)});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="routeName">রুটের নাম</Label>
          <Input
            id="routeName"
            value={formData.routeName}
            onChange={(e) => setFormData({...formData, routeName: e.target.value})}
            placeholder="মূল রুট ১"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fare">ভাড়া (৳)</Label>
          <Input
            id="fare"
            type="number"
            value={formData.fare}
            onChange={(e) => setFormData({...formData, fare: parseInt(e.target.value)})}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startLocation">শুরুর স্থান</Label>
          <Input
            id="startLocation"
            value={formData.startLocation}
            onChange={(e) => setFormData({...formData, startLocation: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endLocation">শেষের স্থান</Label>
          <Input
            id="endLocation"
            value={formData.endLocation}
            onChange={(e) => setFormData({...formData, endLocation: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureTime">ছাড়ার সময়</Label>
          <Input
            id="departureTime"
            type="time"
            value={formData.departureTime}
            onChange={(e) => setFormData({...formData, departureTime: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="arrivalTime">পৌঁছানোর সময়</Label>
          <Input
            id="arrivalTime"
            type="time"
            value={formData.arrivalTime}
            onChange={(e) => setFormData({...formData, arrivalTime: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>স্টপেজ সমূহ</Label>
        <div className="flex gap-2">
          <Input
            value={newStop}
            onChange={(e) => setNewStop(e.target.value)}
            placeholder="স্টপেজের নাম"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStop())}
          />
          <Button type="button" onClick={addStop} variant="outline">
            যোগ করুন
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.stops.map((stop, index) => (
            <Badge key={index} variant="outline" className="cursor-pointer" onClick={() => removeStop(index)}>
              {stop} ×
            </Badge>
          ))}
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          রুট যোগ করুন
        </Button>
      </DialogFooter>
    </form>
  );
}

function TransportUserForm({ 
  routes, 
  onSubmit 
}: { 
  routes: TransportRoute[];
  onSubmit: (data: Omit<TransportUser, 'id'>) => void;
}) {
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    routeId: '',
    pickupStop: '',
    dropoffStop: '',
    feeStatus: 'pending' as const,
    parentPhone: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    status: 'active' as const
  });

  const selectedRoute = routes.find(r => r.id === formData.routeId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="studentId">শিক্ষার্থী আ���ডি</Label>
          <Input
            id="studentId"
            value={formData.studentId}
            onChange={(e) => setFormData({...formData, studentId: e.target.value})}
            placeholder="STD001"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentName">শিক্ষার্থীর নাম</Label>
          <Input
            id="studentName"
            value={formData.studentName}
            onChange={(e) => setFormData({...formData, studentName: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="routeId">রুট</Label>
        <Select value={formData.routeId} onValueChange={(value) => setFormData({...formData, routeId: value, pickupStop: '', dropoffStop: ''})}>
          <SelectTrigger>
            <SelectValue placeholder="রুট নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {routes.map((route) => (
              <SelectItem key={route.id} value={route.id}>
                {route.routeName} - ৳{route.fare}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedRoute && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickupStop">উঠার স্থান</Label>
            <Select value={formData.pickupStop} onValueChange={(value) => setFormData({...formData, pickupStop: value})}>
              <SelectTrigger>
                <SelectValue placeholder="স্টপেজ নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {selectedRoute.stops.map((stop, index) => (
                  <SelectItem key={index} value={stop}>
                    {stop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dropoffStop">নামার স্থান</Label>
            <Select value={formData.dropoffStop} onValueChange={(value) => setFormData({...formData, dropoffStop: value})}>
              <SelectTrigger>
                <SelectValue placeholder="স্টপেজ নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {selectedRoute.stops.map((stop, index) => (
                  <SelectItem key={index} value={stop}>
                    {stop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="parentPhone">অভিভাবকের ফোন</Label>
          <Input
            id="parentPhone"
            value={formData.parentPhone}
            onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
            placeholder="০১৭xxxxxxxx"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="enrollmentDate">ভর্তির তারিখ</Label>
          <Input
            id="enrollmentDate"
            type="date"
            value={formData.enrollmentDate}
            onChange={(e) => setFormData({...formData, enrollmentDate: e.target.value})}
            required
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          নিবন্ধন করুন
        </Button>
      </DialogFooter>
    </form>
  );
}
