import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Search,
  CreditCard,
  DollarSign,
  User,
  Calendar,
  Check,
  AlertCircle,
  Receipt,
  School
} from "lucide-react";

export default function FeePayment() {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const students = [
    { id: "STD001", name: "মোহাম্মদ আবদুল্লাহ", class: "আলিম প্রথম", roll: "০১" },
    { id: "STD002", name: "আবুল কাসেম", class: "আলিম প্রথম", roll: "০২" },
    { id: "STD003", name: "মোহাম্মদ ইব্রাহিম", class: "আলিম দ্বিতীয়", roll: "০৩" }
  ];

  const paymentMethods = [
    { value: "cash", label: "নগদ", icon: <DollarSign className="h-4 w-4" /> },
    { value: "bkash", label: "বিকাশ", icon: <CreditCard className="h-4 w-4" /> },
    { value: "nagad", label: "নগদ (মোবাইল)", icon: <CreditCard className="h-4 w-4" /> },
    { value: "bank", label: "ব্যাংক ট্রান্সফার", icon: <CreditCard className="h-4 w-4" /> }
  ];

  useEffect(() => {
    if (selectedStudent) {
      loadStudentFeeData();
    }
  }, [selectedStudent]);

  const loadStudentFeeData = () => {
    setLoading(true);
    // Mock data load
    setTimeout(() => {
      setStudentData({
        id: selectedStudent,
        name: "মোহাম্মদ আবদুল্লাহ",
        class: "আলিম প্রথম বর্ষ",
        roll: "০১",
        fees: [
          {
            type: "টিউশন ফি",
            amount: 5000,
            dueDate: "২০২৪-১২-৩১",
            status: "pending",
            description: "ডিসেম্বর ২০২৪ মাসের টিউশন ফি"
          },
          {
            type: "পরীক্ষার ফি", 
            amount: 1500,
            dueDate: "২০২৪-১২-২০",
            status: "pending",
            description: "মাসিক পরীক্ষার ফি"
          },
          {
            type: "লাইব্রেরি ফি",
            amount: 500,
            dueDate: "২০২৪-১২-৩১",
            status: "paid",
            paidDate: "২০২৪-১১-২৫",
            description: "লাইব্রেরি ব্যবহারের ফি"
          }
        ],
        totalDue: 6500,
        totalPaid: 500,
        totalPending: 6000
      });
      setLoading(false);
    }, 1000);
  };

  const handlePayment = () => {
    if (!selectedStudent || !paymentMethod || !amount) {
      alert("সকল তথ্য পূরণ করুন");
      return;
    }

    // Mock payment processing
    alert(`৳${amount} ফি পেমেন্ট সফলভাবে সম্পন্ন হয়েছে!`);
    
    // Reset form
    setAmount("");
    setTransactionId("");
    setRemarks("");
    loadStudentFeeData(); // Reload data
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-green-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/admin" className="inline-flex items-center text-islamic-green hover:text-islamic-green-dark transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              ড্যা��বোর্ডে ফিরে যান
            </Link>
            <div className="flex items-center space-x-2">
              <School className="h-6 w-6 text-islamic-green" />
              <span className="font-bold text-islamic-green">CHKMS</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ফি পেমেন্ট</h1>
          <p className="text-gray-600">শিক্ষার্থীদের ফি পেমেন্ট রেকর্ড করুন</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Student Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-islamic-blue" />
                  <span>শিক্ষার্থী নির্বাচন</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="নাম, আইডি বা রোল দিয়ে খুঁজুন"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => setSelectedStudent(student.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedStudent === student.id
                          ? 'border-islamic-green bg-islamic-green/5'
                          : 'border-gray-200 hover:border-islamic-green/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.class} • রোল: {student.roll}</p>
                        </div>
                        {selectedStudent === student.id && (
                          <Check className="h-5 w-5 text-islamic-green" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            {selectedStudent ? (
              <div className="space-y-6">
                {/* Student Fee Status */}
                {studentData && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{studentData.name} এর ফি বিবরণ</span>
                        <Badge variant="outline">{studentData.class}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-islamic-green">৳{studentData.totalPaid.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">��রিশোধিত</p>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <p className="text-2xl font-bold text-red-600">৳{studentData.totalPending.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">বকেয়া</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-islamic-blue">৳{studentData.totalDue.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">মোট ফি</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold">ফি বিভাগসমূহ:</h4>
                        {studentData.fees.map((fee, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{fee.type}</p>
                              <p className="text-sm text-gray-600">{fee.description}</p>
                              <p className="text-sm text-gray-600">শেষ তারিখ: {fee.dueDate}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold">৳{fee.amount.toLocaleString()}</p>
                              <Badge variant={fee.status === 'paid' ? 'default' : 'destructive'}>
                                {fee.status === 'paid' ? 'পরিশোধিত' : 'বকেয়া'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Payment Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-islamic-gold" />
                      <span>পেমেন্ট তথ্য</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="amount">পেমেন্ট পরিমাণ (৳)</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="পেমেন্টের পরিমাণ লিখুন"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="method">পেমেন্ট পদ্ধতি</Label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger>
                            <SelectValue placeholder="পেমেন্ট পদ্ধতি নির্বাচন করুন" />
                          </SelectTrigger>
                          <SelectContent>
                            {paymentMethods.map((method) => (
                              <SelectItem key={method.value} value={method.value}>
                                <div className="flex items-center space-x-2">
                                  {method.icon}
                                  <span>{method.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {(paymentMethod === 'bkash' || paymentMethod === 'nagad' || paymentMethod === 'bank') && (
                      <div>
                        <Label htmlFor="transactionId">ট্রানজেকশন আইডি</Label>
                        <Input
                          id="transactionId"
                          placeholder="ট্রানজেকশন আইডি লিখুন"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="remarks">মন্তব্য (ঐচ্ছিক)</Label>
                      <Textarea
                        id="remarks"
                        placeholder="অতিরিক্ত মন্তব্য লিখুন"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">পেমেন্ট নিশ্চিতকরণ</p>
                          <p className="text-sm text-yellow-700">
                            পেমেন্টের সকল তথ্য যাচাই করে নিন। পেমেন্ট সম্পন্ন হওয়ার পর রসিদ স্বয়ংক্রিয়ভাবে তৈরি হবে।
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={handlePayment}
                        className="flex-1 bg-islamic-green hover:bg-islamic-green-dark"
                        disabled={!amount || !paymentMethod}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        পেমেন্ট সম্পন্ন করুন
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Receipt className="h-4 w-4 mr-2" />
                        রসিদ প্রিন্ট করু��
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">শিক্ষার্থী নির্বাচন করুন</h3>
                  <p className="text-gray-600">পেমেন্ট প্রক্রিয়া শুরু করতে বাম পাশ থেকে একজন শিক্ষার্থী নির্বাচন করুন</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
