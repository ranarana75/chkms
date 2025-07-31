import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { School, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requiredPermissions?: string[];
}

export default function ProtectedRoute({ children, allowedRoles, requiredPermissions }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading, sessionExpiry, checkPermission, logout, refreshToken } = useAuth();
  const location = useLocation();
  const [sessionWarning, setSessionWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Check session expiry and show warning
  useEffect(() => {
    if (sessionExpiry && isAuthenticated) {
      const checkSession = () => {
        const now = new Date();
        const timeUntilExpiry = sessionExpiry.getTime() - now.getTime();
        const minutesLeft = Math.floor(timeUntilExpiry / (1000 * 60));
        
        setTimeLeft(minutesLeft);
        
        // Show warning when 15 minutes or less remaining
        if (minutesLeft <= 15 && minutesLeft > 0) {
          setSessionWarning(true);
        } else {
          setSessionWarning(false);
        }
        
        // Auto logout when session expires
        if (minutesLeft <= 0) {
          logout();
        }
      };
      
      checkSession();
      const interval = setInterval(checkSession, 60000); // Check every minute
      
      return () => clearInterval(interval);
    }
  }, [sessionExpiry, isAuthenticated, logout]);

  const handleExtendSession = async () => {
    const success = await refreshToken();
    if (success) {
      setSessionWarning(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50 flex items-center justify-center">
        <Card className="w-96 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-islamic-green rounded-full animate-pulse">
                <School className="h-8 w-8 text-white" />
              </div>
            </div>
            <p className="text-lg font-medium text-gray-900">লোড হচ্ছে...</p>
            <p className="text-sm text-gray-600 mt-2">অনুগ্রহ করে অপেক্ষা করুন</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50 flex items-center justify-center">
        <Card className="w-96 shadow-xl border-red-200">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <p className="text-lg font-medium text-red-600">অ্যাক্সেস নিষিদ্ধ</p>
            <p className="text-sm text-gray-600 mt-2">
              আপনার এই পৃষ্ঠা দেখার অনুমতি নেই
            </p>
            <p className="text-xs text-gray-500 mt-2">
              আপনার ভূমিকা: {user.role === 'admin' ? 'প্রশাসক' : user.role === 'teacher' ? 'শিক্ষক' : user.role === 'student' ? 'শিক্ষার্থী' : 'অভিভাবক'}
            </p>
            <Button 
              onClick={() => window.history.back()} 
              className="mt-4"
              variant="outline"
            >
              পেছনে ফিরে যান
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check permission-based access
  if (requiredPermissions && user && !requiredPermissions.every(permission => checkPermission(permission))) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50 flex items-center justify-center">
        <Card className="w-96 shadow-xl border-yellow-200">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <p className="text-lg font-medium text-yellow-600">অনুমতি প্রয়োজন</p>
            <p className="text-sm text-gray-600 mt-2">
              এই ফিচার ব্যবহারের স্পেশাল অনুমতি প্রয়োজন
            </p>
            <Button 
              onClick={() => window.history.back()} 
              className="mt-4"
              variant="outline"
            >
              পেছনে ফিরে যান
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Session Warning Modal */}
      {sessionWarning && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-96 shadow-xl border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <p className="text-lg font-medium text-orange-600 mb-2">
                সেশন শেষ হয়ে যাচ্ছে
              </p>
              <p className="text-sm text-gray-600 mb-4">
                আপনার সেশন {timeLeft} মিনিটে শেষ হবে।
                সেশন বাড়াতে চান?
              </p>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleExtendSession}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  সেশন বাড়ান
                </Button>
                <Button 
                  onClick={logout}
                  variant="outline"
                  className="flex-1"
                >
                  লগআউট করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {children}
    </>
  );
}
