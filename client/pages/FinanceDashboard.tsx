import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  CreditCard,
  Users,
  FileText,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  School
} from "lucide-react";

export default function FinanceDashboard() {
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("current-month");

  useEffect(() => {
    loadFinancialData();
  }, [selectedPeriod]);

  const loadFinancialData = () => {
    setLoading(true);
    // Mock data load
    setTimeout(() => {
      setFinancialData({
        overview: {
          totalRevenue: 1245000,
          monthlyRevenue: 125000,
          totalExpenses: 890000,
          monthlyExpenses: 89000,
          totalStudents: 1247,
          feeCollectionRate: 85.5,
          pendingFees: 235000,
          profit: 355000
        },
        recentTransactions: [
          {
            id: "TXN001",
            type: "income",
            description: "টিউশন ফি - আলিম প্রথম বর্ষ",
            amount: 5000,
            date: "২০২৪-১২-১৫",
            method: "বিকাশ",
            status: "completed"
          },
          {
            id: "TXN002", 
            type: "expense",
            description: "শিক্ষক বেতন - নভেম্বর",
            amount: 45000,
            date: "২০২৪-১২-১৪",
            method: "ব্যাংক",
            status: "completed"
          },
          {
            id: "TXN003",
            type: "income", 
            description: "লাইব্রেরি ফি",
            amount: 500,
            date: "২০২��-১২-১৩",
            method: "নগদ",
            status: "completed"
          },
          {
            id: "TXN004",
            type: "expense",
            description: "ইউটিলিটি বিল - ডিসেম্বর",
            amount: 8500,
            date: "২০২৪-১২-১২",
            method: "ব্যাংক",
            status: "completed"
          },
          {
            id: "TXN005",
            type: "income",
            description: "ট্রান্সপোর্ট ফি",
            amount: 2000,
            date: "২০২৪-১২-১১",
            method: "নগদ",
            status: "completed"
          }
        ],
        monthlyStats: [
          { month: "জানুয়ারি", income: 120000, expense: 85000 },
          { month: "ফেব্রুয়ারি", income: 125000, expense: 87000 },
          { month: "মার্চ", income: 130000, expense: 89000 },
          { month: "এপ্রিল", income: 128000, expense: 88000 },
          { month: "মে", income: 135000, expense: 90000 },
          { month: "জুন", income: 132000, expense: 91000 }
        ],
        feeCategories: [
          { name: "টিউশন ফি", budgeted: 800000, collected: 720000, pending: 80000 },
          { name: "লাইব্রেরি ফি", budgeted: 50000, collected: 45000, pending: 5000 },
          { name: "পরীক্ষার ফি", budgeted: 150000, collected: 120000, pending: 30000 },
          { name: "ক্রীড়া ফি", budgeted: 30000, collected: 25000, pending: 5000 }
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

  const { overview, recentTransactions, feeCategories } = financialData;

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">আর্থিক ব্যবস্থাপনা</h1>
            <p className="text-gray-600">আয়-ব্যয়, ফি কালেকশন এবং আর্থিক রিপোর্ট</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">চলতি মাস</SelectItem>
                <SelectItem value="last-month">গত মাস</SelectItem>
                <SelectItem value="current-year">চলতি বছর</SelectItem>
                <SelectItem value="last-year">গত বছর</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-islamic-green hover:bg-islamic-green-dark">
              <Plus className="h-4 w-4 mr-2" />
              নতুন লেনদেন
            </Button>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট আয়</p>
                  <p className="text-2xl font-bold text-islamic-green">৳{overview.totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+12.5%</span>
                  </div>
                </div>
                <div className="p-3 bg-islamic-green/10 rounded-full">
                  <ArrowUpRight className="h-6 w-6 text-islamic-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট ব্যয়</p>
                  <p className="text-2xl font-bold text-red-600">৳{overview.totalExpenses.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    <span className="text-sm text-red-600">+5.2%</span>
                  </div>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <ArrowDownRight className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">নিট লাভ</p>
                  <p className="text-2xl font-bold text-islamic-blue">৳{overview.profit.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+18.3%</span>
                  </div>
                </div>
                <div className="p-3 bg-islamic-blue/10 rounded-full">
                  <DollarSign className="h-6 w-6 text-islamic-blue" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">বকেয়া ফি</p>
                  <p className="text-2xl font-bold text-islamic-gold">৳{overview.pendingFees.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600">{overview.feeCollectionRate}% সংগৃহীত</span>
                  </div>
                </div>
                <div className="p-3 bg-islamic-gold/10 rounded-full">
                  <CreditCard className="h-6 w-6 text-islamic-gold" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-islamic-blue" />
                    <span>সাম্প্রতিক লেনদেন</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    সব দেখুন
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'income' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.type === 'income' ? 
                            <ArrowUpRight className="h-4 w-4" /> : 
                            <ArrowDownRight className="h-4 w-4" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{transaction.date}</span>
                            <span>•</span>
                            <span>{transaction.method}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}৳{transaction.amount.toLocaleString()}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {transaction.status === 'completed' ? 'সম্পন্ন' : 'অপেক্ষমাণ'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fee Categories */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-islamic-gold" />
                  <span>ফি ক্যাটেগরি</span>
                </CardTitle>
                <CardDescription>
                  বিভিন্ন ধরনের ফি সংগ্রহের অবস্থা
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feeCategories.map((category, index) => {
                    const collectionRate = (category.collected / category.budgeted) * 100;
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{category.name}</span>
                          <span className="text-sm text-gray-600">{collectionRate.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-islamic-green h-2 rounded-full" 
                            style={{ width: `${collectionRate}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>সংগৃহীত: ৳{category.collected.toLocaleString()}</span>
                          <span>বকেয়া: ৳{category.pending.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>দ্রুত অ্যাকশন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-islamic-green hover:bg-islamic-green-dark justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  ফি পেমেন্ট রেকর্ড
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  ব্যয় যোগ করুন
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  আর্থিক রিপোর্ট
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  বকেয়া তালিকা
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
