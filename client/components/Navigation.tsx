import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  Home, 
  Users, 
  GraduationCap, 
  Calculator, 
  BookOpen, 
  Building2, 
  Bus, 
  FileText, 
  UserPlus, 
  Bell, 
  Calendar, 
  BarChart3,
  School,
  Settings,
  LogOut
} from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'হোম', path: '/' },
    { icon: Users, label: 'শিক্ষার্থী', path: '/student' },
    { icon: GraduationCap, label: 'শিক্ষক', path: '/teacher' },
    { icon: Calculator, label: 'আর্থিক', path: '/finance' },
    { icon: FileText, label: 'পরীক্ষা', path: '/examination' },
    { icon: BookOpen, label: 'লাইব্রেরি', path: '/library' },
    { icon: School, label: 'ইসলামিক', path: '/islamic' },
    { icon: Building2, label: 'হোস্টেল', path: '/hostel' },
    { icon: Bus, label: 'ট্রান্সপোর্ট', path: '/transport' },
    { icon: UserPlus, label: 'ভর্তি', path: '/admission' },
    { icon: Bell, label: 'নোটিশ', path: '/notice' },
    { icon: Calendar, label: 'ক্যালেন্ডার', path: '/calendar' },
    { icon: BarChart3, label: 'রিপোর্ট', path: '/reports' },
    { icon: Settings, label: 'সিস্টেম', path: '/system' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-green-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-islamic-green rounded-lg">
              <School className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-islamic-green-dark">CHKMS</h1>
              <p className="text-xs text-muted-foreground">চুনতি হাকিমিয়া কামিল মাদ্রাসা</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.slice(0, 8).map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-islamic-green text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-islamic-green'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button & Auth */}
          <div className="flex items-center space-x-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/login">লগইন</Link>
            </Button>
            <Button asChild className="bg-islamic-green hover:bg-islamic-green-dark" size="sm">
              <Link to="/admin">অ্যাডমিন</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden pb-4">
          <div className="grid grid-cols-4 gap-2">
            {menuItems.slice(0, 12).map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-md text-xs transition-colors ${
                    isActive(item.path)
                      ? 'bg-islamic-green text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
