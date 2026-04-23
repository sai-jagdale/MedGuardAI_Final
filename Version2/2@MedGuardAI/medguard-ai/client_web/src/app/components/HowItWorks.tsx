import { Link } from "react-router-dom";
import {
  Upload,
  Scan,
  CheckCircle2,
  ArrowRight,
  Camera,
  Sparkles,
  Shield,
  FileSearch,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Footer } from "./Footer";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Camera,
      title: "Capture or Upload",
      description: "Take a photo of your medicine packaging or upload an existing image. You can also scan barcodes or enter batch numbers manually.",
      color: "from-[#4A90E2] to-[#5BA3E8]",
    },
    {
      number: "02",
      icon: Scan,
      title: "AI Analysis",
      description: "Our advanced AI analyzes the image using OCR, pattern recognition, and machine learning to extract all relevant information.",
      color: "from-[#5BA3E8] to-[#6CB8EE]",
    },
    {
      number: "03",
      icon: FileSearch,
      title: "Database Verification",
      description: "We cross-reference the extracted data with global pharmaceutical databases and regulatory authority records.",
      color: "from-[#6CB8EE] to-[#6FCF97]",
    },
    {
      number: "04",
      icon: CheckCircle2,
      title: "Get Results",
      description: "Receive instant verification results with detailed insights, safety status, and recommendations within seconds.",
      color: "from-[#6FCF97] to-[#7DD9A3]",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "99.8% Accuracy",
      description: "Industry-leading accuracy powered by advanced AI algorithms",
    },
    {
      icon: Sparkles,
      title: "2-Second Results",
      description: "Get instant verification results in under 2 seconds",
    },
    {
      icon: CheckCircle2,
      title: "500K+ Verified",
      description: "Over half a million medicines verified successfully",
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-green-100 text-[#4A90E2] px-5 py-2.5 rounded-full text-sm font-medium shadow-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Simple Process</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            How MedGuard AI
            <span className="block mt-2 bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] bg-clip-text text-transparent">
              Verifies Your Medicines
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered verification process is simple, fast, and highly accurate. Here's how it works in just 4 easy steps.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50/50 to-green-50/50 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className={`flex-shrink-0 w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-[#4A90E2] mb-2">STEP {step.number}</div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-12 h-12 text-[#4A90E2]/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4A90E2] to-[#6FCF97] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#4A90E2]/10 via-transparent to-[#6FCF97]/10 rounded-3xl p-12 text-center shadow-xl border border-[#4A90E2]/10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Experience the Power of AI Verification
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Try MedGuard AI now and see how easy it is to verify medicine authenticity in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/verify">
              <Button size="lg" className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] hover:opacity-90 shadow-lg rounded-xl text-base">
                <Upload className="w-5 h-5 mr-2" />
                Verify Medicine Now
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-2 border-[#4A90E2] text-[#4A90E2] hover:bg-blue-50 rounded-xl text-base">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Footer Section */}
    <Footer />
    </div>
  );
}
