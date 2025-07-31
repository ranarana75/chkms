import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useLocalData";
import Navigation from "@/components/Navigation";
import {
  User,
  Settings,
  Shield,
  Clock,
  Phone,
  Mail,
  MapPin,
  Edit,
  Save,
  Eye,
  EyeOff,
  Calendar,
  Building,
  GraduationCap,
  UserCheck,
  LogOut,
  Smartphone,
} from "lucide-react";

export default function UserProfile() {
  const {
    user,
    session,
    logout,
    changePassword,
    updateProfile,
    sessionExpiry,
  } = useAuth();
  const { addNotification } = useNotifications();

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    department: user?.department || "",
    class: user?.class || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdateProfile = async () => {
    try {
      const result = await updateProfile(profileForm);
      if (result.success) {
        addNotification(result.message || "প্রোফাইল আপডেট হয়েছে", "success");
        setIsEditing(false);
      } else {
        addNotification(result.message || "প্রোফাইল আপডেটে সমস্যা", "error");
      }
    } catch (error) {
      addNotification("প্রোফাইল আপডেটে সমস্যা হয়েছে", "error");
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      addNotification("নতুন পাসওয়ার্ড মিলছে না", "error");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      addNotification("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে", "error");
      return;
    }

    try {
      const result = await changePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword,
      );
      if (result.success) {
        addNotification(
          result.message || "পাসওয়ার্ড পরিবর্তিত হয়েছে",
          "success",
        );
        setShowPasswordDialog(false);
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        addNotification(
          result.message || "পাসওয়ার্ড পরিবর্তনে ��মস্যা",
          "error",
        );
      }
    } catch (error) {
      addNotification("পাসওয়ার্ড পরিবর্তনে সমস্যা হয়েছে", "error");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin":
        return "প্রশাসক";
      case "teacher":
        return "শিক্ষক";
      case "student":
        return "শিক্ষার্থী";
      case "parent":
        return "অভিভাবক";
      default:
        return role;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (!user) {
    return <div>লোড হচ্ছে...</div>;
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100"
      style={{ fontFamily: '"Noto Serif Bengali", serif' }}
    >
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">
            ব্যবহারকারী প্রোফাইল
          </h1>
          <p className="text-emerald-600">আপনার অ্যাকাউন্ট তথ্য এবং সেটিংস</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.profileImage} />
                  <AvatarFallback className="text-xl">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {user.name}
                </h2>
                <Badge variant="secondary" className="mb-4">
                  {getRoleText(user.role)}
                </Badge>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{user.username}</span>
                  </div>

                  {user.email && (
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{user.email}</span>
                    </div>
                  )}

                  {user.phone && (
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{user.phone}</span>
                    </div>
                  )}

                  {user.department && (
                    <div className="flex items-center justify-center space-x-2">
                      <Building className="w-4 h-4 text-gray-500" />
                      <span>{user.department}</span>
                    </div>
                  )}

                  {user.class && (
                    <div className="flex items-center justify-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-gray-500" />
                      <span>{user.class}</span>
                    </div>
                  )}

                  {user.lastLogin && (
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>
                        শেষ লগইন:{" "}
                        {new Date(user.lastLogin).toLocaleString("bn-BD")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <UserCheck className="w-4 h-4" />
                    <span className="text-sm">সক্রিয় অ্যাকাউন্ট</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Info */}
            {session && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="w-5 h-5" />
                    <span>বর্তমান সেশন</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">তৈরি:</span>{" "}
                    {new Date(session.createdAt).toLocaleString("bn-BD")}
                  </div>
                  <div>
                    <span className="font-medium">শেষ সক্রিয়:</span>{" "}
                    {new Date(session.lastActivity).toLocaleString("bn-BD")}
                  </div>
                  <div>
                    <span className="font-medium">মেয়াদ শেষ:</span>{" "}
                    {sessionExpiry
                      ? new Date(sessionExpiry).toLocaleString("bn-BD")
                      : "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">ডিভাইস:</span>{" "}
                    {session.deviceInfo}
                  </div>

                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    size="sm"
                    className="w-full mt-4"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    লগআউট করুন
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">প্রোফাইল তথ্য</TabsTrigger>
                <TabsTrigger value="security">নিরাপত্তা</TabsTrigger>
                <TabsTrigger value="permissions">অনুমতি</TabsTrigger>
              </TabsList>

              {/* Profile Information */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>ব্যক্তিগত তথ্য</CardTitle>
                        <CardDescription>
                          আপনার প্রোফাইল তথ্য আপডেট করুন
                        </CardDescription>
                      </div>
                      <Button
                        onClick={() =>
                          isEditing ? handleUpdateProfile() : setIsEditing(true)
                        }
                        variant={isEditing ? "default" : "outline"}
                      >
                        {isEditing ? (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            সংরক্ষণ
                          </>
                        ) : (
                          <>
                            <Edit className="w-4 h-4 mr-2" />
                            সম্পাদনা
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">পূর্ণ নাম</Label>
                        <Input
                          id="name"
                          value={profileForm.name}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              name: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">ইমেইল</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileForm.email}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              email: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">ফোন নম্বর</Label>
                        <Input
                          id="phone"
                          value={profileForm.phone}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              phone: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                        />
                      </div>

                      {user.role === "teacher" && (
                        <div>
                          <Label htmlFor="department">বিভাগ</Label>
                          <Input
                            id="department"
                            value={profileForm.department}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                department: e.target.value,
                              })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                      )}

                      {user.role === "student" && (
                        <div>
                          <Label htmlFor="class">শ্রেণী</Label>
                          <Input
                            id="class"
                            value={profileForm.class}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                class: e.target.value,
                              })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex space-x-2 pt-4">
                        <Button
                          onClick={() => setIsEditing(false)}
                          variant="outline"
                        >
                          বাতিল
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>নিরাপত্তা সেটিংস</span>
                    </CardTitle>
                    <CardDescription>
                      আপনার অ্যাকাউন্ট নিরাপত্তা পরিচালনা করুন
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Change Password */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">প���সওয়ার্ড পরিবর্তন</h3>
                          <p className="text-sm text-gray-600">
                            আপনার অ্যাকাউন্টের পাসওয়ার্ড আপডেট করুন
                          </p>
                        </div>
                        <Dialog
                          open={showPasswordDialog}
                          onOpenChange={setShowPasswordDialog}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              পাসওয়ার্ড পরিবর্তন
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>পাসওয়ার্ড পরিবর্তন</DialogTitle>
                              <DialogDescription>
                                নিরাপত্তার জন্য একটি শক্তিশালী পাসওয়ার্ড
                                ব্যবহার করুন
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="currentPassword">
                                  বর্তমান পাসওয়ার্ড
                                </Label>
                                <div className="relative">
                                  <Input
                                    id="currentPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={passwordForm.currentPassword}
                                    onChange={(e) =>
                                      setPasswordForm({
                                        ...passwordForm,
                                        currentPassword: e.target.value,
                                      })
                                    }
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                  >
                                    {showPassword ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="newPassword">
                                  নতুন পাসওয়ার্ড
                                </Label>
                                <div className="relative">
                                  <Input
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    value={passwordForm.newPassword}
                                    onChange={(e) =>
                                      setPasswordForm({
                                        ...passwordForm,
                                        newPassword: e.target.value,
                                      })
                                    }
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setShowNewPassword(!showNewPassword)
                                    }
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                  >
                                    {showNewPassword ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="confirmPassword">
                                  পাসওয়ার্ড নিশ্চিত করুন
                                </Label>
                                <Input
                                  id="confirmPassword"
                                  type="password"
                                  value={passwordForm.confirmPassword}
                                  onChange={(e) =>
                                    setPasswordForm({
                                      ...passwordForm,
                                      confirmPassword: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>

                            <DialogFooter>
                              <Button
                                onClick={handleChangePassword}
                                className="bg-emerald-600 hover:bg-emerald-700"
                              >
                                পাসওয়ার্ড পরিবর্তন করুন
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Permissions */}
              <TabsContent value="permissions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>অনুমতি এবং অ্যাক্সেস</CardTitle>
                    <CardDescription>
                      আপনার অ্যাকাউন্টের অনুমতি দেখুন
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">আপনা�� ভূমিকা</h3>
                        <Badge
                          variant="secondary"
                          className="text-lg px-4 py-2"
                        >
                          {getRoleText(user.role)}
                        </Badge>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">অনুমতি তালিকা</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {user.permissions.includes("all") ? (
                            <Badge variant="default" className="bg-green-600">
                              সম্পূর্ণ অ্যাক্সেস
                            </Badge>
                          ) : (
                            user.permissions.map((permission, index) => (
                              <Badge key={index} variant="outline">
                                {permission}
                              </Badge>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
