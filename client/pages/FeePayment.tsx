import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocalStorage, useNotifications } from '@/hooks/useLocalData';
import { 
  CreditCard, 
  DollarSign, 
  User, 
  Calendar, 
  Search,
  Plus,
  Receipt,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  Smartphone
} from 'lucide-react';
import Navigation from '@/components/Navigation';

interface Student {
  id: string;
  studentId: string;
  name: string;
  class: string;
  section: string;
  fatherName: string;
  phoneNumber: string;
  admissionDate: string;
  isActive: boolean;
}

interface FeeStructure {
  id: string;
  class: string;
  tuitionFee: number;
  libraryFee: number;
  transportFee: number;
  hostelFee: number;
  examFee: number;
  miscellaneousFee: number;
  totalMonthlyFee: number;
}

interface FeePayment {
  id: string;
  studentId: string;
  studentName: string;
  paymentDate: string;
  month: string;
  year: string;
  tuitionFee: number;
  libraryFee: number;
  transportFee: number;
  hostelFee: number;
  examFee: number;
  miscellaneousFee: number;
  totalAmount: number;
  paymentMethod: 'cash' | 'bkash' | 'nagad' | 'rocket' | 'bank';
  transactionId?: string;
  discount?: number;
  lateFee?: number;
  status: 'paid' | 'partial' | 'pending' | 'overdue';
  receivedBy: string;
  remarks?: string;
  receiptNumber: string;
  createdAt: string;
}

interface FeeRecord {
  studentId: string;
  studentName: string;
  class: string;
  monthlyFee: number;
  paidMonths: string[];
  pendingMonths: string[];
  totalPaid: number;
  totalPending: number;
  lastPaymentDate?: string;
  status: 'current' | 'due' | 'overdue';
}

export default function FeePayment() {
  const [students, setStudents] = useLocalStorage<Student[]>('students', []);
  const [feeStructures, setFeeStructures] = useLocalStorage<FeeStructure[]>('feeStructures', []);
  const [payments, setPayments] = useLocalStorage<FeePayment[]>('feePayments', []);
  const [feeRecords, setFeeRecords] = useLocalStorage<FeeRecord[]>('feeRecords', []);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [paymentForm, setPaymentForm] = useState({
    month: new Date().toISOString().slice(0, 7), // YYYY-MM format
    tuitionFee: 0,
    libraryFee: 0,
    transportFee: 0,
    hostelFee: 0,
    examFee: 0,
    miscellaneousFee: 0,
    discount: 0,
    lateFee: 0,
    paymentMethod: 'cash' as const,
    transactionId: '',
    remarks: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<FeePayment | null>(null);
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);

  const { addNotification } = useNotifications();

  // Initialize sample data
  useEffect(() => {
    if (students.length === 0) {
      const sampleStudents: Student[] = [
        {
          id: '1',
          studentId: 'STD001',
          name: 'মোহাম্মদ আব্দুল্লাহ রহমান',
          class: 'নবম শ্রেণী',
          section: 'ক',
          fatherName: 'মোহাম্মদ আব্দুর রহমান',
          phoneNumber: '01711111111',
          admissionDate: '2023-01-15',
          isActive: true
        },
        {
          id: '2',
          studentId: 'STD002',
          name: 'আয়েশা সিদ্দিকা',
          class: 'দশম শ্রেণী',
          section: 'খ',
          fatherName: 'মোহাম্মদ সিদ্দিক আহমেদ',
          phoneNumber: '01822222222',
          admissionDate: '2022-01-10',
          isActive: true
        },
        {
          id: '3',
          studentId: 'STD003',
          name: 'ফাতিমা খাতুন',
          class: 'আলিম ১ম বর্ষ',
          section: 'ক',
          fatherName: 'মোহাম্মদ কামাল উদ্দিন',
          phoneNumber: '01933333333',
          admissionDate: '2021-01-05',
          isActive: true
        }
      ];
      setStudents(sampleStudents);

      const sampleFeeStructures: FeeStructure[] = [
        {
          id: '1',
          class: 'নবম শ্রেণী',
          tuitionFee: 1500,
          libraryFee: 200,
          transportFee: 500,
          hostelFee: 0,
          examFee: 300,
          miscellaneousFee: 100,
          totalMonthlyFee: 2600
        },
        {
          id: '2',
          class: 'দশম শ্রেণী',
          tuitionFee: 1600,
          libraryFee: 200,
          transportFee: 500,
          hostelFee: 0,
          examFee: 400,
          miscellaneousFee: 100,
          totalMonthlyFee: 2800
        },
        {
          id: '3',
          class: 'আলিম ১ম বর্ষ',
          tuitionFee: 2000,
          libraryFee: 300,
          transportFee: 600,
          hostelFee: 0,
          examFee: 500,
          miscellaneousFee: 150,
          totalMonthlyFee: 3550
        }
      ];
      setFeeStructures(sampleFeeStructures);

      // Generate fee records
      const sampleFeeRecords: FeeRecord[] = sampleStudents.map(student => {
        const feeStructure = sampleFeeStructures.find(fs => fs.class === student.class);
        const monthlyFee = feeStructure?.totalMonthlyFee || 2000;
        
        return {
          studentId: student.id,
          studentName: student.name,
          class: student.class,
          monthlyFee,
          paidMonths: ['2024-01', '2024-02'],
          pendingMonths: ['2024-03', '2024-04'],
          totalPaid: monthlyFee * 2,
          totalPending: monthlyFee * 2,
          lastPaymentDate: '2024-02-15',
          status: 'due' as const
        };
      });
      setFeeRecords(sampleFeeRecords);
    }
  }, [students.length, setStudents, setFeeStructures, setFeeRecords]);

  // Update payment form when student is selected
  useEffect(() => {
    if (selectedStudent) {
      const feeStructure = feeStructures.find(fs => fs.class === selectedStudent.class);
      if (feeStructure) {
        setPaymentForm(prev => ({
          ...prev,
          tuitionFee: feeStructure.tuitionFee,
          libraryFee: feeStructure.libraryFee,
          transportFee: feeStructure.transportFee,
          hostelFee: feeStructure.hostelFee,
          examFee: feeStructure.examFee,
          miscellaneousFee: feeStructure.miscellaneousFee
        }));
      }
    }
  }, [selectedStudent, feeStructures]);

  const calculateTotal = () => {
    const total = paymentForm.tuitionFee + 
                  paymentForm.libraryFee + 
                  paymentForm.transportFee + 
                  paymentForm.hostelFee + 
                  paymentForm.examFee + 
                  paymentForm.miscellaneousFee + 
                  paymentForm.lateFee - 
                  paymentForm.discount;
    return Math.max(0, total);
  };

  const handlePayment = () => {
    if (!selectedStudent) return;

    const total = calculateTotal();
    const receiptNumber = `RCP-${Date.now()}`;
    
    const newPayment: FeePayment = {
      id: Date.now().toString(),
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      paymentDate: new Date().toISOString().split('T')[0],
      month: paymentForm.month.split('-')[1],
      year: paymentForm.month.split('-')[0],
      tuitionFee: paymentForm.tuitionFee,
      libraryFee: paymentForm.libraryFee,
      transportFee: paymentForm.transportFee,
      hostelFee: paymentForm.hostelFee,
      examFee: paymentForm.examFee,
      miscellaneousFee: paymentForm.miscellaneousFee,
      totalAmount: total,
      paymentMethod: paymentForm.paymentMethod,
      transactionId: paymentForm.transactionId,
      discount: paymentForm.discount,
      lateFee: paymentForm.lateFee,
      status: 'paid',
      receivedBy: 'ক্যাশিয়ার',
      remarks: paymentForm.remarks,
      receiptNumber,
      createdAt: new Date().toISOString()
    };

    setPayments([...payments, newPayment]);

    // Update fee records
    const updatedFeeRecords = feeRecords.map(record => {
      if (record.studentId === selectedStudent.id) {
        const monthStr = paymentForm.month;
        const updatedPaidMonths = [...record.paidMonths, monthStr];
        const updatedPendingMonths = record.pendingMonths.filter(m => m !== monthStr);
        
        return {
          ...record,
          paidMonths: updatedPaidMonths,
          pendingMonths: updatedPendingMonths,
          totalPaid: record.totalPaid + total,
          totalPending: Math.max(0, record.totalPending - total),
          lastPaymentDate: newPayment.paymentDate,
          status: updatedPendingMonths.length === 0 ? 'current' as const : 'due' as const
        };
      }
      return record;
    });
    setFeeRecords(updatedFeeRecords);

    setReceiptData(newPayment);
    setIsReceiptDialogOpen(true);
    setIsPaymentDialogOpen(false);
    addNotification('ফি পরিশোধ সফলভাবে সম্পন্ন হয়েছে', 'success');

    // Reset form
    setSelectedStudent(null);
    setPaymentForm({
      month: new Date().toISOString().slice(0, 7),
      tuitionFee: 0,
      libraryFee: 0,
      transportFee: 0,
      hostelFee: 0,
      examFee: 0,
      miscellaneousFee: 0,
      discount: 0,
      lateFee: 0,
      paymentMethod: 'cash',
      transactionId: '',
      remarks: ''
    });
  };

  const printReceipt = () => {
    addNotification('রসিদ প্রিন্ট করা হচ্ছে...', 'info');
    setTimeout(() => {
      addNotification('রসিদ সফলভাবে প্রিন্ট হয়েছে', 'success');
    }, 1500);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phoneNumber.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      current: "default",
      due: "outline", 
      overdue: "destructive",
      paid: "default",
      partial: "outline",
      pending: "secondary"
    };
    
    const labels: { [key: string]: string } = {
      current: 'হালনাগাদ',
      due: 'বকেয়া',
      overdue: 'অতিবাহিত',
      paid: 'পরিশ���ধিত',
      partial: 'আংশিক',
      pending: 'অপেক্ষায়'
    };

    return (
      <Badge variant={variants[status] || "secondary"}>
        {labels[status] || status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100" style={{ fontFamily: '"Noto Serif Bengali", serif' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">ফি পরিশোধ</h1>
          <p className="text-emerald-600">শিক্ষার্থীদের ফি পরিশোধ ও ব্যবস্থাপনা</p>
        </div>

        <Tabs defaultValue="payment" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payment">ফি পরিশোধ</TabsTrigger>
            <TabsTrigger value="records">ফি রেকর্ড</TabsTrigger>
            <TabsTrigger value="structure">ফি কাঠামো</TabsTrigger>
          </TabsList>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  শিক্ষার্থী খুঁজুন
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <Input
                    placeholder="নাম, আইডি বা ফোন নম্বর দিয়ে খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>

                <div className="grid gap-3 max-h-60 overflow-y-auto">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedStudent?.id === student.id 
                          ? 'border-emerald-500 bg-emerald-50' 
                          : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-25'
                      }`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{student.name}</h3>
                          <p className="text-sm text-gray-600">
                            আইডি: {student.studentId} | শ্রেণী: {student.class} ({student.section})
                          </p>
                          <p className="text-sm text-gray-600">
                            পিতা: {student.fatherName} | ফোন: {student.phoneNumber}
                          </p>
                        </div>
                        <Badge variant={student.isActive ? "default" : "secondary"}>
                          {student.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedStudent && (
              <Card>
                <CardHeader>
                  <CardTitle>ফি পরিশোধ - {selectedStudent.name}</CardTitle>
                  <CardDescription>
                    আইডি: {selectedStudent.studentId} | শ্রেণী: {selectedStudent.class}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>মাস/বছর</Label>
                      <Input
                        type="month"
                        value={paymentForm.month}
                        onChange={(e) => setPaymentForm({...paymentForm, month: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>পেমেন্ট পদ্ধতি</Label>
                      <Select 
                        value={paymentForm.paymentMethod} 
                        onValueChange={(value: any) => setPaymentForm({...paymentForm, paymentMethod: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">নগদ</SelectItem>
                          <SelectItem value="bkash">বিকাশ</SelectItem>
                          <SelectItem value="nagad">নগদ (অ্যাপ)</SelectItem>
                          <SelectItem value="rocket">রকেট</SelectItem>
                          <SelectItem value="bank">ব্যাংক</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {paymentForm.paymentMethod !== 'cash' && (
                    <div className="space-y-2">
                      <Label>ট্রানজেকশন আইডি</Label>
                      <Input
                        placeholder="ট্রানজেকশন আইডি লিখুন"
                        value={paymentForm.transactionId}
                        onChange={(e) => setPaymentForm({...paymentForm, transactionId: e.target.value})}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <h3 className="font-semibold">ফি বিবরণ</h3>
                      
                      <div className="space-y-2">
                        <Label>টিউশন ফি</Label>
                        <Input
                          type="number"
                          value={paymentForm.tuitionFee}
                          onChange={(e) => setPaymentForm({...paymentForm, tuitionFee: parseInt(e.target.value) || 0})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>লাইব্রেরি ফি</Label>
                        <Input
                          type="number"
                          value={paymentForm.libraryFee}
                          onChange={(e) => setPaymentForm({...paymentForm, libraryFee: parseInt(e.target.value) || 0})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>পরিবহন ফি</Label>
                        <Input
                          type="number"
                          value={paymentForm.transportFee}
                          onChange={(e) => setPaymentForm({...paymentForm, transportFee: parseInt(e.target.value) || 0})}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">অতিরিক্ত ফি</h3>

                      <div className="space-y-2">
                        <Label>পরীক্ষা ফি</Label>
                        <Input
                          type="number"
                          value={paymentForm.examFee}
                          onChange={(e) => setPaymentForm({...paymentForm, examFee: parseInt(e.target.value) || 0})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>বিবিধ ফি</Label>
                        <Input
                          type="number"
                          value={paymentForm.miscellaneousFee}
                          onChange={(e) => setPaymentForm({...paymentForm, miscellaneousFee: parseInt(e.target.value) || 0})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>জরিমানা</Label>
                        <Input
                          type="number"
                          value={paymentForm.lateFee}
                          onChange={(e) => setPaymentForm({...paymentForm, lateFee: parseInt(e.target.value) || 0})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>ছাড়</Label>
                        <Input
                          type="number"
                          value={paymentForm.discount}
                          onChange={(e) => setPaymentForm({...paymentForm, discount: parseInt(e.target.value) || 0})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>মন্তব্য</Label>
                    <Textarea
                      placeholder="অতিরিক্ত মন্তব্য (ঐচ্ছিক)"
                      value={paymentForm.remarks}
                      onChange={(e) => setPaymentForm({...paymentForm, remarks: e.target.value})}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>মোট পরিশোধযোগ্য:</span>
                      <span className="text-emerald-600">৳{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      onClick={handlePayment}
                      className="bg-emerald-600 hover:bg-emerald-700 flex-1"
                      disabled={calculateTotal() <= 0}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      ফি পরিশোধ করুন
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedStudent(null)}
                    >
                      বাতিল
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Records Tab */}
          <TabsContent value="records" className="space-y-6">
            <div className="grid gap-4">
              {feeRecords.map((record) => (
                <Card key={record.studentId}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold">{record.studentName}</h3>
                          <Badge variant="outline">{record.class}</Badge>
                          {getStatusBadge(record.status)}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">মাসিক ফি: ৳{record.monthlyFee.toLocaleString()}</p>
                            <p className="text-gray-600 mb-1">পরিশোধিত: ৳{record.totalPaid.toLocaleString()}</p>
                            <p className="text-gray-600">বকেয়া: ৳{record.totalPending.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">পরিশোধিত মাস: {record.paidMonths.length}</p>
                            <p className="text-gray-600 mb-1">বকেয়া মাস: {record.pendingMonths.length}</p>
                            {record.lastPaymentDate && (
                              <p className="text-gray-600">শেষ পরিশোধ: {new Date(record.lastPaymentDate).toLocaleDateString('bn-BD')}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Fee Structure Tab */}
          <TabsContent value="structure" className="space-y-6">
            <div className="grid gap-4">
              {feeStructures.map((structure) => (
                <Card key={structure.id}>
                  <CardHeader>
                    <CardTitle>{structure.class}</CardTitle>
                    <CardDescription>মাসিক ফি কাঠামো</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="flex justify-between mb-2">
                          <span>টিউশন ফি:</span>
                          <span>৳{structure.tuitionFee.toLocaleString()}</span>
                        </p>
                        <p className="flex justify-between mb-2">
                          <span>লাইব্রেরি ফি:</span>
                          <span>৳{structure.libraryFee.toLocaleString()}</span>
                        </p>
                        <p className="flex justify-between mb-2">
                          <span>পরিবহন ফি:</span>
                          <span>৳{structure.transportFee.toLocaleString()}</span>
                        </p>
                      </div>
                      <div>
                        <p className="flex justify-between mb-2">
                          <span>পরীক্ষা ফি:</span>
                          <span>৳{structure.examFee.toLocaleString()}</span>
                        </p>
                        <p className="flex justify-between mb-2">
                          <span>বিবিধ ফি:</span>
                          <span>৳{structure.miscellaneousFee.toLocaleString()}</span>
                        </p>
                        <p className="flex justify-between font-semibold text-emerald-600 border-t pt-2">
                          <span>মোট মাসিক ফি:</span>
                          <span>৳{structure.totalMonthlyFee.toLocaleString()}</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Receipt Dialog */}
        {receiptData && (
          <Dialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">ফি পরিশোধের রসিদ</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 p-4 border rounded">
                <div className="text-center border-b pb-4">
                  <h3 className="font-bold">চুনতি হাকিমিয়া কামিল মাদ্রাসা</h3>
                  <p className="text-sm text-gray-600">ফি পরিশোধের রসিদ</p>
                  <p className="text-sm font-medium">রসিদ নং: {receiptData.receiptNumber}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>তারিখ:</span>
                    <span>{new Date(receiptData.paymentDate).toLocaleDateString('bn-BD')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>শিক্ষার্থী:</span>
                    <span>{receiptData.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>মাস/বছর:</span>
                    <span>{receiptData.month}/{receiptData.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>পেমেন্ট পদ্ধতি:</span>
                    <span>{receiptData.paymentMethod === 'cash' ? 'নগদ' : receiptData.paymentMethod}</span>
                  </div>
                  {receiptData.transactionId && (
                    <div className="flex justify-between">
                      <span>ট্রানজেকশন ID:</span>
                      <span>{receiptData.transactionId}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-2 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>টিউশন ফি:</span>
                    <span>৳{receiptData.tuitionFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>লাইব্রেরি ফি:</span>
                    <span>৳{receiptData.libraryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>পরিবহন ফি:</span>
                    <span>৳{receiptData.transportFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>পরীক্ষা ফি:</span>
                    <span>৳{receiptData.examFee.toLocaleString()}</span>
                  </div>
                  {receiptData.lateFee > 0 && (
                    <div className="flex justify-between">
                      <span>জরিমানা:</span>
                      <span>৳{receiptData.lateFee.toLocaleString()}</span>
                    </div>
                  )}
                  {receiptData.discount > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>ছাড়:</span>
                      <span>-৳{receiptData.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>মোট:</span>
                    <span>৳{receiptData.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-center text-xs text-gray-500 border-t pt-2">
                  <p>গ্রহণকারী: {receiptData.receivedBy}</p>
                  <p>ধন্যবাদ!</p>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={printReceipt} className="w-full">
                  <Receipt className="w-4 h-4 mr-2" />
                  প্রিন্ট করুন
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
