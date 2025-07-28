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
  Trash2
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  category: string;
  date: string;
  method: string;
  status: 'completed' | 'pending' | 'failed';
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
}

const FinanceDashboard: React.FC = () => {
  const [financialStats, setFinancialStats] = useState<FinancialStats | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isCreateTransactionOpen, setIsCreateTransactionOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: '',
    description: '',
    amount: '',
    category: '',
    method: ''
  });

  useEffect(() => {
    fetchFinancialData();
    fetchTransactions();
  }, []);

  const fetchFinancialData = async () => {
    try {
      const response = await fetch('/api/finance/dashboard');
      const data = await response.json();
      setFinancialStats(data.stats);
    } catch (error) {
      console.error('Error fetching financial data:', error);
      // Mock data for demo
      setFinancialStats({
        totalRevenue: 2500000,
        totalExpenses: 1800000,
        netProfit: 700000,
        feeCollection: 2200000,
        outstandingFees: 300000,
        monthlyRevenue: 220000,
        monthlyExpenses: 150000,
        feeCollectionRate: 88.5
      });
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/finance/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Mock data for demo
      setTransactions([
        {
          id: '1',
          type: 'income',
          description: 'মাসিক টিউশন ফি - ক্লাস ৮',
          amount: 15000,
          category: 'tuition',
          date: '2024-12-10',
          method: 'বিকাশ',
          status: 'completed'
        },
        {
          id: '2',
          type: 'expense',
          description: 'বিদ্যুৎ বিল',
          amount: 8500,
          category: 'utilities',
          date: '2024-12-09',
          method: 'ক্যাশ',
          status: 'completed'
        },
        {
          id: '3',
          type: 'income',
          description: 'লাইব্রেরি ফি',
          amount: 2500,
          category: 'library',
          date: '2024-12-08',
          method: 'নগদ',
          status: 'completed'
        },
        {
          id: '4',
          type: 'expense',
          description: 'শিক্ষকদের বেতন',
          amount: 85000,
          category: 'salary',
          date: '2024-12-05',
          method: 'ব্যাংক ট্রান্সফার',
          status: 'completed'
        }
      ]);
    }
  };

  const handleCreateTransaction = async () => {
    try {
      const response = await fetch('/api/finance/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTransaction,
          amount: parseFloat(newTransaction.amount),
          status: 'completed',
          date: new Date().toISOString().split('T')[0]
        }),
      });

      if (response.ok) {
        setIsCreateTransactionOpen(false);
        setNewTransaction({
          type: '',
          description: '',
          amount: '',
          category: '',
          method: ''
        });
        fetchTransactions();
        fetchFinancialData();
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const getTransactionColor = (type: string) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'tuition':
        return 'টিউশন ফি';
      case 'library':
        return 'লাইব্রেরি ফি';
      case 'transport':
        return 'পরিবহন ফি';
      case 'hostel':
        return 'হোস্টেল ফি';
      case 'salary':
        return 'বেতন';
      case 'utilities':
        return 'ইউটিলিটি';
      case 'maintenance':
        return 'রক্ষণাবেক্ষণ';
      case 'supplies':
        return 'সরবরাহ';
      default:
        return category;
    }
  };

  if (!financialStats) {
    return <div className="flex justify-center items-center h-64">লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">আর্থিক ব্যবস্থাপনা</h1>
            <p className="text-gray-600 mt-1">আয়-ব্যয় এবং ফি কালেকশন ট্র্যাকিং</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              রিপোর্ট ডাউনলোড
            </Button>
            <Dialog open={isCreateTransactionOpen} onOpenChange={setIsCreateTransactionOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  নতুন লেনদেন
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>নতুন লেনদেন ���োগ করুন</DialogTitle>
                  <DialogDescription>
                    লেনদেনের বিস্তারিত তথ্য প্রদান করুন
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="transactionType">ধরন</Label>
                    <Select value={newTransaction.type} onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value })}>
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
                      onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                      placeholder="লেনদেনের বিবরণ"
                    />
                  </div>
                  <div>
                    <Label htmlFor="transactionAmount">পরিমাণ (৳)</Label>
                    <Input
                      id="transactionAmount"
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                      placeholder="০"
                    />
                  </div>
                  <div>
                    <Label htmlFor="transactionCategory">বিভাগ</Label>
                    <Select value={newTransaction.category} onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {newTransaction.type === 'income' ? (
                          <>
                            <SelectItem value="tuition">টিউশন ফি</SelectItem>
                            <SelectItem value="library">লাইব্রেরি ফি</SelectItem>
                            <SelectItem value="transport">পরিবহন ফি</SelectItem>
                            <SelectItem value="hostel">হোস্টেল ফি</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="salary">বেতন</SelectItem>
                            <SelectItem value="utilities">ইউটিলিটি</SelectItem>
                            <SelectItem value="maintenance">রক্ষণাবেক্ষণ</SelectItem>
                            <SelectItem value="supplies">সরবরাহ</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="transactionMethod">পেমেন্ট পদ্ধতি</Label>
                    <Select value={newTransaction.method} onValueChange={(value) => setNewTransaction({ ...newTransaction, method: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="পেমেন্ট ���দ্ধতি নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">ক্যাশ</SelectItem>
                        <SelectItem value="bkash">বিকাশ</SelectItem>
                        <SelectItem value="nagad">নগদ</SelectItem>
                        <SelectItem value="bank">ব্যাংক ট্রান্সফার</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreateTransaction} className="w-full bg-green-600 hover:bg-green-700">
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
                  <p className="text-2xl font-bold text-green-600">৳{financialStats.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">এই মাস: ৳{financialStats.monthlyRevenue.toLocaleString()}</p>
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
                  <p className="text-2xl font-bold text-red-600">৳{financialStats.totalExpenses.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">এই মাস: ৳{financialStats.monthlyExpenses.toLocaleString()}</p>
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
                  <p className="text-2xl font-bold text-blue-600">৳{financialStats.netProfit.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">গত মাসের তুলনায় ↗ ১২%</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">ফি কালেকশন</p>
                  <p className="text-2xl font-bold text-purple-600">{financialStats.feeCollectionRate}%</p>
                  <p className="text-xs text-gray-500">বকেয়া: ৳{financialStats.outstandingFees.toLocaleString()}</p>
                </div>
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>সাম্প্রতিক লেনদেনসমূহ</span>
            </CardTitle>
            <CardDescription>গত ৩০ দিনের লেনদেনের তালিকা</CardDescription>
          </CardHeader>
          <CardContent>
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
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{new Date(transaction.date).toLocaleDateString('bn-BD')}</td>
                      <td className="p-2 font-medium">{transaction.description}</td>
                      <td className="p-2">{getCategoryText(transaction.category)}</td>
                      <td className="p-2">{transaction.method}</td>
                      <td className={`p-2 font-bold ${getTransactionColor(transaction.type)}`}>
                        {transaction.type === 'income' ? '+' : '-'}৳{transaction.amount.toLocaleString()}
                      </td>
                      <td className="p-2">
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status === 'completed' ? 'সম্পন্ন' : 
                           transaction.status === 'pending' ? 'অপেক্ষমান' : 'ব্যর্থ'}
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
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
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

export default FinanceDashboard;
