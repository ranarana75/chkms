import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { School, ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userType || !username || !password) {
      setError("সকল ফিল্ড পূরণ করুন");
      return;
    }

    setIsLoading(true);
    setError("");

    const success = await login({
      username,
      password,
      userType: userType as any
    });

    if (success) {
      // Redirect based on user type
      switch(userType) {
        case 'student':
          navigate('/student');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate(from);
      }
    } else {
      setError("ভুল ব্যবহারকারী নাম বা পাসওয়ার্ড");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-green via-islamic-blue to-islamic-green-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-white hover:text-islamic-gold transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            হোমে ফিরে যান
          </Link>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-white rounded-lg">
              <School className="h-8 w-8 text-islamic-green" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white">CHKMS</h1>
              <p className="text-sm text-islamic-gold">চুনতি হাকিমিয়া কামিল মাদ্রাসা</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 font-bengali-heading">লগইন করুন</CardTitle>
            <CardDescription className="font-bengali-body">
              আপনার অ্যাকাউন্টে প্রবেশ করুন
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin}>
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="userType" className="font-bengali">ব্যবহারকারীর ধরন</Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger>
                  <SelectValue placeholder="ব্যবহারকারীর ধরন নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">শিক্ষার্থী</SelectItem>
                  <SelectItem value="teacher">শিক্ষক</SelectItem>
                  <SelectItem value="admin">প্রশাসক</SelectItem>
                  <SelectItem value="parent">অভিভাবক</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Username/ID */}
            <div className="space-y-2">
              <Label htmlFor="username">
                {userType === 'student' ? 'শিক্ষার্থী আইডি' : 
                 userType === 'teacher' ? 'শিক্ষক আইডি' :
                 userType === 'admin' ? 'প্রশাসক আইডি' :
                 'ব্যবহারকারী আইডি'}
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={
                  userType === 'student' ? 'যেমন: STD001' :
                  userType === 'teacher' ? 'যেমন: TCH001' :
                  userType === 'admin' ? 'যেমন: ADM001' :
                  'আপনার আইডি লিখুন'
                }
                className="border-gray-300 focus:border-islamic-green focus:ring-islamic-green"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">পাসওয়ার্ড</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  className="border-gray-300 focus:border-islamic-green focus:ring-islamic-green pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded border-gray-300" />
                <label htmlFor="remember" className="text-sm text-gray-600">মনে রাখুন</label>
              </div>
              <Link to="/forgot-password" className="text-sm text-islamic-blue hover:underline">
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              type="submit"
              className="w-full bg-islamic-green hover:bg-islamic-green-dark text-white py-2.5 font-bengali"
              disabled={!userType || isLoading}
            >
              {isLoading ? 'লগইন করা হচ্ছে...' : 'লগইন করুন'}
            </Button>

            {/* Demo Links */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600 mb-3">ডেমো অ্যাকাউন্ট দিয়ে প্রবেশ:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="border-islamic-blue text-islamic-blue hover:bg-islamic-blue hover:text-white"
                >
                  <Link to="/student">শিক্ষার্থী ডেমো</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="border-islamic-green text-islamic-green hover:bg-islamic-green hover:text-white"
                >
                  <Link to="/teacher">শিক্ষক ডেমো</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="border-islamic-gold text-islamic-gold hover:bg-islamic-gold hover:text-white col-span-2"
                >
                  <Link to="/admin">প্রশাসক ডেমো</Link>
                </Button>
              </div>
            </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-white/80 text-sm">
          <p>© 2024 চুনতি হাকিমিয়া কামিল মাদ্রাসা</p>
          <p>সকল অধিকার সংরক্ষিত</p>
        </div>
      </div>
    </div>
  );
}
