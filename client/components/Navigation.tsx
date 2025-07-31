import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
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
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "হোম", path: "/" },
    { icon: Users, label: "শিক্ষার্থী", path: "/student" },
    { icon: GraduationCap, label: "শিক্ষক", path: "/teacher" },
    { icon: Calculator, label: "আর্থিক", path: "/finance" },
    { icon: FileText, label: "পরীক্ষা", path: "/examination" },
    { icon: BookOpen, label: "লাইব্রেরি", path: "/library" },
    { icon: School, label: "ইসলামিক", path: "/islamic" },
    { icon: Building2, label: "হোস্টেল", path: "/hostel" },
    { icon: Bus, label: "ট্রান্সপোর্ট", path: "/transport" },
    { icon: UserPlus, label: "ভর্তি", path: "/admission" },
    { icon: Bell, label: "নোটিশ", path: "/notice" },
    { icon: Calendar, label: "ক্যালেন্ডার", path: "/calendar" },
    { icon: BarChart3, label: "রিপোর্ট", path: "/reports" },
    { icon: Settings, label: "সিস্টেম", path: "/system" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
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
              <h1 className="text-lg font-bold text-islamic-green-dark">
                CHKMS
              </h1>
              <p className="text-xs text-muted-foreground font-bengali">
                চুনতি হাকিমিয়া কামিল মাদ্রাসা
              </p>
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
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors font-bengali ${
                    isActive(item.path)
                      ? "bg-islamic-green text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-islamic-green"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu / Login Button */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:bg-gray-100"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.profileImage} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">
                        {getRoleText(user.role)}
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email || user.username}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>প্রোফাইল</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>প্রশাসন</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>লগআউট</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    লগইন
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button
                    className="bg-islamic-green hover:bg-islamic-green-dark"
                    size="sm"
                  >
                    অ্যাডমিন
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen ? (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.path)
                        ? "bg-islamic-green text-white"
                        : "text-gray-700 hover:bg-green-50 hover:text-islamic-green"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* User actions for mobile */}
              {isAuthenticated && user && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center px-3 py-2">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarImage src={user.profileImage} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-base font-medium text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {getRoleText(user.role)}
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <User className="w-5 h-5" />
                    <span>প্রোফাইল</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>লগআউট</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
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
                        ? "bg-islamic-green text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
