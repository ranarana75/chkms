import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { School } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

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

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50 flex items-center justify-center">
        <Card className="w-96 shadow-xl border-red-200">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <School className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <p className="text-lg font-medium text-red-600">অ্যাক্সেস নিষিদ্ধ</p>
            <p className="text-sm text-gray-600 mt-2">
              আপনার এই পৃষ্ঠা দেখার অনুমতি নেই
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
