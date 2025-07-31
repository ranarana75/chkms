import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import Navigation from "../components/Navigation";
import {
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
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Activity,
  PieChart,
  Calculator,
  Wallet
} from "lucide-react";
import { useLocalData, useNotifications } from "@/hooks/useLocalData";
import { LocalDB, STORAGE_KEYS } from "@shared/localDatabase";

interface Transaction {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  category: string;
  date: string;
  method: string;
  status: "completed" | "pending" | "failed";
  reference?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface FinancialStats {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  feeCollection: number;
  outstandingFees: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  feeCollectionRate: number;
  lastUpdated: Date;
}

// Create transactions database
const transactionsDB = new LocalDB<Transaction>(STORAGE_KEYS.FINANCIAL_TRANSACTIONS);

const FinanceDashboard: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [financialStats, setFinancialStats] = useState<FinancialStats>({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    feeCollection: 0,
    outstandingFees: 0,
    monthlyRevenue: 0,
    monthlyExpenses: 0,
    feeCollectionRate: 0,
    lastUpdated: new Date(),
  });
  const [isCreateTransactionOpen, setIsCreateTransactionOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [newTransaction, setNewTransaction] = useState({
    type: "",
    description: "",
    amount: "",
    category: "",
    method: "",
    reference: "",
  });

  const { data: transactions, loading, addItem: addTransaction, updateItem, removeItem, refresh } = useLocalData(transactionsDB);
  const { addNotification } = useNotifications();

  useEffect(() => {
    initializeSampleTransactions();
    calculateStats();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [transactions]);

  const initializeSampleTransactions = () => {
    if (transactions.length === 0) {
      const sampleTransactions: Transaction[] = [
        {
          id: "1",
          type: "income",
          description: "মাসিক টিউশন ফি - আলিম প্রথম বর্ষ",
          amount: 45000,
          category: "tuition",
          date: "2024-12-10",
          method: "বিকাশ",
          status: "completed",
          reference: "TXN001",
          createdBy: "admin-001",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          type: "expense",
          description: "বিদ্যুৎ বিল - ডিসেম্বর ২০২৪",
          amount: 8500,
          category: "utilities",
          date: "2024-12-09",
          method: "ক্যাশ",
          status: "completed",
          reference: "EXP001",
          createdBy: "admin-001",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          type: "income",
          description: "লাইব্রেরি ফি - ডিসেম্বর",
          amount: 12500,
          category: "library",
          date: "2024-12-08",
          method: "নগদ",
          status: "completed",
          reference: "TXN002",
          createdBy: "admin-001",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "4",
          type: "expense",
          description: "শিক্ষকদের বেতন - ডিসেম্বর",
          amount: 85000,
          category: "salary",
          date: "2024-12-05",
          method: "ব্যাংক ট্রান্সফার",
          status: "completed",
          reference: "SAL001",
          createdBy: "admin-001",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "5",
          type: "income",
          description: "পরিবহন ফি - আলিম দ্বিতীয় বর্ষ",
          amount: 25000,
          category: "transport",
          date: "2024-12-07",
          method: "বিকাশ",
          status: "completed",
          reference: "TXN003",
          createdBy: "admin-001",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "6",
          type: "expense",
          description: "স্টেশনারি ক্রয়",
          amount: 15000,
          category: "supplies",
          date: "2024-12-06",
          method: "ক্যাশ",
          status: "completed",
          reference: "EXP002",
          createdBy: "admin-001",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "7",
          type: "income",
          description: "হোস্টেল ফি - ডিসেম্বর",
          amount: 35000,
          category: "hostel",
          date: "2024-12-04",
          method: "নগদ",
          status: "completed",
          reference: "TXN004",
          createdBy: "admin-001",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];

      sampleTransactions.forEach(transaction => {
        transactionsDB.add(transaction);
      });
    }
  };

  const calculateStats = () => {
    if (!transactions.length) return;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Calculate totals
    const totalRevenue = transactions
      .filter((t: Transaction) => t.type === "income" && t.status === "completed")
      .reduce((sum, t: Transaction) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t: Transaction) => t.type === "expense" && t.status === "completed")
      .reduce((sum, t: Transaction) => sum + t.amount, 0);

    // Calculate monthly figures
    const monthlyRevenue = transactions
      .filter((t: Transaction) => {
        const transactionDate = new Date(t.date);
        return t.type === "income" && 
               t.status === "completed" &&
               transactionDate.getMonth() === currentMonth &&
               transactionDate.getFullYear() === currentYear;
      })
      .reduce((sum, t: Transaction) => sum + t.amount, 0);

    const monthlyExpenses = transactions
      .filter((t: Transaction) => {
        const transactionDate = new Date(t.date);
        return t.type === "expense" && 
               t.status === "completed" &&
               transactionDate.getMonth() === currentMonth &&
               transactionDate.getFullYear() === currentYear;
      })
      .reduce((sum, t: Transaction) => sum + t.amount, 0);

    // Calculate fee collection
    const feeCollection = transactions
      .filter((t: Transaction) => 
        t.type === "income" && 
        t.status === "completed" &&
        ['tuition', 'library', 'transport', 'hostel'].includes(t.category)
      )
      .reduce((sum, t: Transaction) => sum + t.amount, 0);

    // Estimate outstanding fees (mock calculation)
    const outstandingFees = Math.max(0, Math.floor(feeCollection * 0.15));

    // Calculate fee collection rate
    const totalExpectedFees = feeCollection + outstandingFees;
    const feeCollectionRate = totalExpectedFees > 0 ? (feeCollection / totalExpectedFees) * 100 : 0;

    setFinancialStats({
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      feeCollection,
      outstandingFees,
      monthlyRevenue,
      monthlyExpenses,
      feeCollectionRate: Math.round(feeCollectionRate * 10) / 10,
      lastUpdated: new Date(),
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    calculateStats();
    addNotification("success", "ডেটা আপডেট", "আর্থিক তথ্য সফলভাবে আপডেট হয়েছে");
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleCreateTransaction = async () => {
    if (!newTransaction.type || !newTransaction.description || !newTransaction.amount || !newTransaction.category || !newTransaction.method) {
      addNotification("error", "ত্রুটি", "সব ক্ষেত্র পূরণ করুন");
      return;
    }

    try {
      const transaction: Transaction = {
        id: Date.now().toString(),
        type: newTransaction.type as "income" | "expense",
        description: newTransaction.description,
        amount: parseFloat(newTransaction.amount),
        category: newTransaction.category,
        date: new Date().toISOString().split("T")[0],
        method: newTransaction.method,
        status: "completed",
        reference: newTransaction.reference || `TXN${Date.now()}`,
        createdBy: "admin-001",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const success = await addTransaction(transaction);
      if (success) {
        setIsCreateTransactionOpen(false);
        setNewTransaction({
          type: "",
          description: "",
          amount: "",
          category: "",
          method: "",
          reference: "",
        });
        addNotification("success", "লেনদেন যোগ", "নতুন লেনদেন সফলভাবে যোগ করা হয়েছে");
        calculateStats();
      }
    } catch (error) {
      addNotification("error", "ত্রুটি", "লেনদেন যোগ করতে সমস্যা হয়েছে");
    }
  };

  const getTransactionColor = (type: string) => {
    return type === "income" ? "text-green-600" : "text-red-600";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case "tuition":
        return "টিউশন ফি";
      case "library":
        return "লাইব্রেরি ফি";
      case "transport":
        return "পরিবহন ফি";
      case "hostel":
        return "হোস্টেল ফি";
      case "salary":
        return "বেতন";
      case "utilities":
        return "ইউটিলিটি";
      case "maintenance":
        return "রক্ষণাবেক্ষণ";
      case "supplies":
        return "সরবরাহ";
      default:
        return category;
    }
  };

  // Calculate category-wise summary
  const categoryWiseSummary = React.useMemo(() => {
    const summary: Record<string, { income: number; expense: number; net: number }> = {};
    
    transactions.forEach((transaction: Transaction) => {
      if (transaction.status === "completed") {
        if (!summary[transaction.category]) {
          summary[transaction.category] = { income: 0, expense: 0, net: 0 };
        }
        
        if (transaction.type === "income") {
          summary[transaction.category].income += transaction.amount;
        } else {
          summary[transaction.category].expense += transaction.amount;
        }
        summary[transaction.category].net = summary[transaction.category].income - summary[transaction.category].expense;
      }
    });
    
    return Object.entries(summary).map(([category, data]) => ({
      category,
      ...data,
    }));
  }, [transactions]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              আর্থিক ব্যবস্থাপনা
            </h1>
            <p className="text-gray-600 mt-1">
              আয়-ব্যয় এবং ফি কালেকশন ট্র্যাকিং
            </p>
            <p className="text-sm text-gray-500 mt-1">
              শেষ আপডেট: {financialStats.lastUpdated.toLocaleString('bn-BD')}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              রিফ্রেশ
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              রিপোর্ট ডাউনলোড
            </Button>
            <Dialog
              open={isCreateTransactionOpen}
              onOpenChange={setIsCreateTransactionOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  নতুন লেনদেন
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>নতুন লেনদেন যোগ করুন</DialogTitle>
                  <DialogDescription>
                    লেনদেনের বিস্তারিত তথ্য প্রদান করুন
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="transactionType">���রন</Label>
                    <Select
                      value={newTransaction.type}
                      onValueChange={(value) =>
                        setNewTransaction({ ...newTransaction, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="লেনদেনের ধরন নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">আয়</SelectItem>
                        <SelectItem value="expense">ব্যয়</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="transactionDescription">বিবরণ</Label>
                    <Input
                      id="transactionDescription"
                      value={newTransaction.description}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          description: e.target.value,
                        })
                      }
                      placeholder="লেনদেনের বিবর��"
                    />
                  </div>
                  <div>
                    <Label htmlFor="transactionAmount">পরিমাণ (৳)</Label>
                    <Input
                      id="transactionAmount"
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          amount: e.target.value,
                        })
                      }
                      placeholder="০"
                    />
                  </div>
                  <div>
                    <Label htmlFor="transactionCategory">বিভাগ</Label>
                    <Select
                      value={newTransaction.category}
                      onValueChange={(value) =>
                        setNewTransaction({
                          ...newTransaction,
                          category: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {newTransaction.type === "income" ? (
                          <>
                            <SelectItem value="tuition">টিউশন ফি</SelectItem>
                            <SelectItem value="library">
                              লাইব্রেরি ফি
                            </SelectItem>
                            <SelectItem value="transport">পরিবহন ফি</SelectItem>
                            <SelectItem value="hostel">হোস্টেল ফি</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="salary">বেতন</SelectItem>
                            <SelectItem value="utilities">ইউটিলিটি</SelectItem>
                            <SelectItem value="maintenance">
                              রক্ষণাবেক্ষণ
                            </SelectItem>
                            <SelectItem value="supplies">সরবরাহ</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="transactionMethod">প���মেন্ট পদ্ধতি</Label>
                    <Select
                      value={newTransaction.method}
                      onValueChange={(value) =>
                        setNewTransaction({ ...newTransaction, method: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="পেমেন্ট পদ্ধতি নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">ক্যাশ</SelectItem>
                        <SelectItem value="bkash">বিকাশ</SelectItem>
                        <SelectItem value="nagad">নগদ</SelectItem>
                        <SelectItem value="bank">ব্যাংক ট্রান্সফার</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="transactionReference">রেফারেন্স (ঐচ্ছিক)</Label>
                    <Input
                      id="transactionReference"
                      value={newTransaction.reference}
                      onChange={(e) =>
                        setNewTransaction({ ...newTransaction, reference: e.target.value })
                      }
                      placeholder="TXN001"
                    />
                  </div>
                  <Button
                    onClick={handleCreateTransaction}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    লেনদেন যোগ করুন
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Financial Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">মোট আয়</p>
                  <p className="text-2xl font-bold text-green-600">
                    {loading ? (
                      <Activity className="h-8 w-8 animate-spin" />
                    ) : (
                      `৳${financialStats.totalRevenue.toLocaleString()}`
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    এই মাস: ৳{financialStats.monthlyRevenue.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">মোট ব্যয়</p>
                  <p className="text-2xl font-bold text-red-600">
                    {loading ? (
                      <Activity className="h-8 w-8 animate-spin" />
                    ) : (
                      `৳${financialStats.totalExpenses.toLocaleString()}`
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    এই মাস: ৳{financialStats.monthlyExpenses.toLocaleString()}
                  </p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">নিট লাভ</p>
                  <p className={`text-2xl font-bold ${financialStats.netProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {loading ? (
                      <Activity className="h-8 w-8 animate-spin" />
                    ) : (
                      `৳${financialStats.netProfit.toLocaleString()}`
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    মাসিক: ৳{(financialStats.monthlyRevenue - financialStats.monthlyExpenses).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">
                    ফি কালেকশন
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {loading ? (
                      <Activity className="h-8 w-8 animate-spin" />
                    ) : (
                      `${financialStats.feeCollectionRate}%`
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    বকেয়া: ৳{financialStats.outstandingFees.toLocaleString()}
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category-wise Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-blue-600" />
              <span>বিভাগ অনুযায়ী সারসংক্ষেপ</span>
            </CardTitle>
            <CardDescription>প্রতিটি বিভাগের আয়-ব্যয়ের বিবরণ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryWiseSummary.map((summary, index: number) => (
                <div key={`category-${summary.category}-${index}`} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {getCategoryText(summary.category)}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-600">আয়:</span>
                      <span className="font-medium">৳{summary.income.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">ব্যয়:</span>
                      <span className="font-medium">৳{summary.expense.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">নিট:</span>
                      <span className={`font-bold ${summary.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ৳{summary.net.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>সাম্প্রতিক লেনদেনসমূহ</span>
            </CardTitle>
            <CardDescription>গত ৩০ দিনের লেনদ��নের তালিকা</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Activity className="h-8 w-8 animate-spin text-islamic-green" />
                <span className="ml-2">লোড হচ্ছে...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">তারিখ</th>
                      <th className="text-left p-2">বিবরণ</th>
                      <th className="text-left p-2">বিভাগ</th>
                      <th className="text-left p-2">পদ্ধতি</th>
                      <th className="text-left p-2">পরিমাণ</th>
                      <th className="text-left p-2">অবস্থা</th>
                      <th className="text-left p-2">কার্যক্রম</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.slice(0, 10).map((transaction: Transaction, index: number) => (
                      <tr
                        key={`transaction-${transaction.id}-${index}`}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-2">
                          {new Date(transaction.date).toLocaleDateString("bn-BD")}
                        </td>
                        <td className="p-2 font-medium">
                          {transaction.description}
                        </td>
                        <td className="p-2">
                          {getCategoryText(transaction.category)}
                        </td>
                        <td className="p-2">{transaction.method}</td>
                        <td
                          className={`p-2 font-bold ${getTransactionColor(transaction.type)}`}
                        >
                          {transaction.type === "income" ? "+" : "-"}৳
                          {transaction.amount.toLocaleString()}
                        </td>
                        <td className="p-2">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status === "completed"
                              ? "সম্পন্ন"
                              : transaction.status === "pending"
                                ? "অপ��ক্ষ��ান"
                                : "ব্যর্থ"}
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
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinanceDashboard;
