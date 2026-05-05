import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Scan,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Camera,
  Barcode,
  FileSearch,
  Clock,
  Award,
  Users,
  Stethoscope,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "../../contexts/AuthContext";

export function Home() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-20 lg:pt-16 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-green-100/40 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-green-100 text-[#4A90E2] px-5 py-2.5 rounded-full text-sm font-medium shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Medicine Verification</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Verify Your Medicines
                <span className="block mt-2 bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] bg-clip-text text-transparent">
                  Instantly with AI
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                MedGuard AI uses advanced OCR, barcode scanning, and machine learning to verify medicine authenticity, check expiry dates, and ensure safety—all in seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/verify">
                  <Button size="lg" className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] hover:opacity-90 shadow-xl hover:shadow-2xl transition-all rounded-xl w-full sm:w-auto text-base">
                    Check Medicine Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-8 pt-6">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-6 h-6 text-[#6FCF97]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">50K+</div>
                    <div className="text-xs text-gray-600">Verified Medicine Dataset</div>
                  </div>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-md">
                    <Award className="w-6 h-6 text-[#4A90E2]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">97.8%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/20 to-[#6FCF97]/20 rounded-3xl blur-3xl"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/50">
                <ImageWithFallback
                  src="/HomePageImage.png"
                  alt="Medical AI Technology"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-[#4A90E2] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Powerful Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Complete Medicine Safety Solution
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Multiple verification methods and AI-powered analysis for comprehensive medicine safety
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl bg-gradient-to-br from-blue-50/50 to-white backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#4A90E2] to-[#6FB1FC] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Scan className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">OCR Scanning</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Advanced optical character recognition extracts medicine details from images instantly
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl bg-gradient-to-br from-green-50/50 to-white backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#6FCF97] to-[#A8E6CF] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Barcode className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Barcode Scan</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Quick barcode verification against our comprehensive pharmaceutical database
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl bg-gradient-to-br from-purple-50/50 to-white backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#AB47BC] to-[#CE93D8] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Verification</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  AI based strong verification , authenticity and detectection of counterfeit medicines
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl bg-gradient-to-br from-orange-50/50 to-white backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#FFA726] to-[#FFB74D] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <FileSearch className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety Insights</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Get detailed safety reports including expiry, legality, and manufacturer info
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50/50 via-white to-green-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How MedGuard AI Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Verify your medicine in three simple steps using AI technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/50">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1580281657527-47f249e8f4df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMG1lZGljaW5lJTIwdmVyaWZpY2F0aW9uJTIwc2FmZXR5fGVufDF8fHx8MTc3NjQxMTY2NXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Pharmacy Medicine"
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#4A90E2] to-[#6FB1FC] text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Input Medicine Details
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Upload an image, scan a barcode, or enter medicine text. Our system supports multiple input methods for your convenience.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#6FCF97] to-[#A8E6CF] text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    AI Analysis
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our AI uses OCR, RAG similarity search, and LLM models to extract data, verify authenticity, and check against regulatory databases.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#AB47BC] to-[#CE93D8] text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Get Instant Results
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Receive comprehensive verification results with color-coded status, AI summary, and safety recommendations within minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Verification Status
            </h2>
            <p className="text-lg text-gray-600">
              Our AI categorizes medicines into clear safety statuses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl bg-gradient-to-br from-green-50/50 to-white backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#6FCF97]/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <CheckCircle2 className="w-8 h-8 text-[#6FCF97]" />
                </div>
                <div className="inline-block px-4 py-1.5 bg-[#6FCF97]/20 text-[#6FCF97] rounded-full text-sm font-semibold mb-3">
                  Authentic
                </div>
                <p className="text-sm text-gray-600">
                  Medicine is verified as genuine and safe to use
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl bg-gradient-to-br from-red-50/50 to-white backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#EF5350]/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <AlertTriangle className="w-8 h-8 text-[#EF5350]" />
                </div>
                <div className="inline-block px-4 py-1.5 bg-[#EF5350]/20 text-[#EF5350] rounded-full text-sm font-semibold mb-3">
                  Fake
                </div>
                <p className="text-sm text-gray-600">
                  Counterfeit detected - do not consume
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl bg-gradient-to-br from-orange-50/50 to-white backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#FFA726]/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Clock className="w-8 h-8 text-[#FFA726]" />
                </div>
                <div className="inline-block px-4 py-1.5 bg-[#FFA726]/20 text-[#FFA726] rounded-full text-sm font-semibold mb-3">
                  Expired
                </div>
                <p className="text-sm text-gray-600">
                  Medicine has passed expiry date
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl bg-gradient-to-br from-purple-50/50 to-white backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#AB47BC]/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <ShieldCheck className="w-8 h-8 text-[#AB47BC]" />
                </div>
                <div className="inline-block px-4 py-1.5 bg-[#AB47BC]/20 text-[#AB47BC] rounded-full text-sm font-semibold mb-3">
                  Illegal
                </div>
                <p className="text-sm text-gray-600">
                  Not approved for use in India
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-50/50 to-green-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                <Stethoscope className="w-4 h-4 text-[#4A90E2]" />
                <span className="text-gray-700">About MedGuard AI</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Your Trusted Partner in Medicine Safety
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                MedGuard AI was created to combat the growing threat of counterfeit medicines in India. Using cutting-edge AI technology including OCR, RAG search, and LLMs, we provide instant, accurate medicine verification.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform also features a symptom-based home remedy system to help you make informed healthcare decisions. We're committed to making healthcare safer and more accessible for everyone.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] bg-clip-text text-transparent mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600">Available Anytime</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] bg-clip-text text-transparent mb-2">
                    100%
                  </div>
                  <div className="text-sm text-gray-600">Free to Use</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/50">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758691461990-03b49d969495?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwaGVhbHRoY2FyZSUyMHRydXN0fGVufDF8fHx8MTc3NjQxMTY2NXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Healthcare Trust"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Start Verifying Medicines Today
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8">
            Start using MedGuard AI for safe, instant medicine verification
          </p>
          <Link to={isAuthenticated ? "/verify" : "/register"}>
            <Button
              size="lg"
              className="bg-white text-[#4A90E2] hover:bg-gray-50 shadow-2xl hover:shadow-3xl transition-all rounded-xl text-base"
            >
              {isAuthenticated ? "Verify Medicine" : "Get Started"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
