import { Link } from "react-router-dom";
import {
  Shield,
  Target,
  Users,
  Award,
  Heart,
  Globe,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export function About() {
  const stats = [
    { number: "500K+", label: "Medicines Verified", icon: CheckCircle2 },
    { number: "50K+", label: "Active Users", icon: Users },
    { number: "99.8%", label: "Accuracy Rate", icon: Award },
    { number: "150+", label: "Countries Covered", icon: Globe },
  ];

  const values = [
    {
      icon: Shield,
      title: "Patient Safety First",
      description: "Our primary mission is to protect patients from counterfeit and dangerous medicines. Every feature we build is designed with user safety in mind.",
    },
    {
      icon: Sparkles,
      title: "Innovation in Healthcare",
      description: "We leverage cutting-edge AI and machine learning to make medicine verification accessible to everyone, everywhere.",
    },
    {
      icon: Heart,
      title: "Empowering Communities",
      description: "We believe everyone deserves access to safe medicines. Our platform empowers individuals to take control of their health.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Fighting counterfeit medicines is a global challenge. We're building a worldwide network of protection and verification.",
    },
  ];

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-green-100 text-[#4A90E2] px-5 py-2.5 rounded-full text-sm font-medium shadow-sm mb-6">
            <Heart className="w-4 h-4" />
            <span>Our Mission</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Protecting Lives Through
            <span className="block mt-2 bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] bg-clip-text text-transparent">
              AI-Powered Verification
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            MedGuard AI was founded with a single purpose: to eliminate counterfeit medicines and ensure every patient has access to safe, authentic medications.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-blue-50/50 to-green-50/50 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4A90E2] to-[#6FCF97] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Story */}
        <div className="mb-20">
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-br from-[#4A90E2]/5 to-[#6FCF97]/5">
            <CardContent className="p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4A90E2] to-[#6FCF97] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      The World Health Organization estimates that 1 in 10 medical products in low and middle-income countries is substandard or falsified. This alarming statistic inspired us to create MedGuard AI.
                    </p>
                    <p>
                      Founded in 2024 by a team of healthcare professionals, AI researchers, and pharmaceutical experts, we set out to build a solution that could help anyone verify medicine authenticity instantly using just their smartphone.
                    </p>
                    <p>
                      Today, MedGuard AI uses advanced artificial intelligence, optical character recognition, and blockchain technology to cross-reference medicines with global pharmaceutical databases, helping protect patients from counterfeit drugs.
                    </p>
                    <p>
                      Our platform has verified over 500,000 medicines and helped thousands of users ensure their medications are safe and authentic. We're committed to making healthcare safer for everyone, everywhere.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-blue-50/50 to-green-50/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#4A90E2] to-[#6FCF97] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#4A90E2]/10 via-transparent to-[#6FCF97]/10 rounded-3xl p-12 text-center shadow-xl border border-[#4A90E2]/10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Us in Making Healthcare Safer
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of the movement to eliminate counterfeit medicines. Start verifying your medicines with MedGuard AI today.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] hover:opacity-90 shadow-lg rounded-xl text-base">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
