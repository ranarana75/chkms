import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Home, School, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-green-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-islamic-green hover:text-islamic-green-dark transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            হোমে ফিরে যান
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="shadow-xl border-islamic-green/20 bg-green-50/50 dark:bg-green-950/20">
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="p-6 bg-islamic-green/10 rounded-full">
                  <School className="h-16 w-16 text-islamic-green" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold text-gray-900 dark:text-white">
                ৪০৤
              </CardTitle>
              <CardDescription className="text-xl text-gray-600 dark:text-gray-300">
                প���ষ্ঠাটি খুঁজে পাওয়া যায়নি
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300">
                দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি বিদ্যমান নেই বা সরানো হয়েছে।
                অনুগ্রহ করে URL চেক করুন অথবা নিচের লিংকগুলো ব্যবহার করুন।
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-islamic-green hover:bg-islamic-green-dark">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    হোমে যান
                  </Link>
                </Button>
                <Button variant="outline" className="border-islamic-blue text-islamic-blue hover:bg-islamic-blue hover:text-white">
                  <Search className="mr-2 h-4 w-4" />
                  খুঁজুন
                </Button>
              </div>

              <div className="pt-6 border-t border-green-200 dark:border-green-800">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  দ্রুত অ্যাক্সেসের জন্য:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button variant="outline" size="sm" asChild className="border-islamic-green text-islamic-green hover:bg-islamic-green hover:text-white">
                    <Link to="/student">শিক্ষার্থী পোর্টাল</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="border-islamic-blue text-islamic-blue hover:bg-islamic-blue hover:text-white">
                    <Link to="/teacher">শিক্ষক পোর্টাল</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="border-islamic-gold text-islamic-gold hover:bg-islamic-gold hover:text-white">
                    <Link to="/admin">প্রশাসক পোর্টাল</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
