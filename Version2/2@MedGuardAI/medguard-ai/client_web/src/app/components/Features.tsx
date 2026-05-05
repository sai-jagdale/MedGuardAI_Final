import { Link } from "react-router-dom";
import {
  Scan,
  Camera,
  Barcode,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  Database,
  Smartphone,
  Zap,
  Lock,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useAuth } from "../../contexts/AuthContext";

export function Features() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Camera,
      title: "Image Recognition",
      description: "Upload medicine photos and our AI instantly analyzes packaging, batch numbers, and authenticity markers.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50/50",
    },
    {
      icon: Barcode,
      title: "Barcode Scanning",
      description: "Scan barcodes and QR codes to verify medicine authenticity against official pharmaceutical databases.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50/50",
    },
    {
      icon: Scan,
      title: "OCR Technology",
      description: "Extract and verify text from medicine labels including batch numbers, expiry dates, and manufacturer details.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50/50",
    },
    {
      icon: ShieldCheck,
      title: "Authenticity Verification",
      description: "Cross-reference medicines with global pharmaceutical databases to detect counterfeits and illegal imports.",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50/50",
    },
    {
      icon: Clock,
      title: "Expiry Date Detection",
      description: "Automatically identify and alert you about expired or near-expiry medicines to ensure safety.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50/50",
    },
    {
      icon: AlertTriangle,
      title: "Counterfeit Detection",
      description: "AI-powered analysis identifies fake medicines by detecting packaging inconsistencies and manufacturing anomalies.",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50/50",
    },
    {
      icon: Database,
      title: "History Tracking",
      description: "Maintain a complete record of all scanned medicines with detailed reports and verification status.",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50/50",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Scan medicines on-the-go with our mobile-optimized interface designed for quick verification anywhere.",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50/50",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get verification results in minutess with our high-speed AI processing and real-time analysis.",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50/50",
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Your data is encrypted and secure. We never share your information with third parties.",
      color: "from-gray-700 to-gray-800",
      bgColor: "bg-gray-50/50",
    },
    {
      icon: Globe,
      title: "Indian Database",
      description: "Access to Indian pharmaceutical databases covering medicines from all over the country.",
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50/50",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description: "Machine learning algorithms provide detailed safety insights and recommendations for each medicine.",
      color: "from-violet-500 to-violet-600",
      bgColor: "bg-violet-50/50",
    },
  ];

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-green-100 text-[#4A90E2] px-5 py-2.5 rounded-full text-sm font-medium shadow-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Comprehensive Features</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="block mt-2 bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] bg-clip-text text-transparent">
              Verify Medicine Safety
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI technology combined with pharmaceutical databases to ensure every medicine you take is safe, authentic, and effective.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden ${feature.bgColor} backdrop-blur-sm`}
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#4A90E2]/10 via-transparent to-[#6FCF97]/10 rounded-3xl p-12 text-center shadow-xl border border-[#4A90E2]/10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Verify Your Medicines?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust MedGuard AI to ensure their medicine safety every day.
          </p>
          <Link to={isAuthenticated ? "/verify" : "/register"}>
            <Button size="lg" className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] hover:opacity-90 shadow-lg rounded-xl text-base">
              Start Verification Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
