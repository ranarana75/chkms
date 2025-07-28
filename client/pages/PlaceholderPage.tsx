import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Construction, Home } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
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
          <Card className="shadow-xl border-orange-100 bg-orange-50/50 dark:bg-orange-950/20">
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <Construction className="h-12 w-12 text-orange-600" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                {title}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300">
                আমরা এই মডিউলটি নিয়ে কাজ করছি। শীঘ্রই এটি ব্যবহারের জন্য প��রস্তুত হবে।
                আরও তথ্যের জন্য প্রশাসনের সাথে যোগাযোগ করুন।
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-islamic-green hover:bg-islamic-green-dark">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    হোমে যান
                  </Link>
                </Button>
                <Button variant="outline" className="border-islamic-blue text-islamic-blue hover:bg-islamic-blue hover:text-white">
                  প্রশাসনের সাথে যোগাযোগ
                </Button>
              </div>

              <div className="pt-6 border-t border-orange-200 dark:border-orange-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  পরবর্তী আপডেটের জন্য অপেক্ষা করুন অথবা আমাদের সাথে যোগাযোগ করে এই ফিচারের জন্য অনুরোধ জানান।
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
