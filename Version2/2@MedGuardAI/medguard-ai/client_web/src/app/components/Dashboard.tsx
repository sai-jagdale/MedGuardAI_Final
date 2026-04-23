import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Upload,
  Camera,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  History,
  LogOut,
  User,
  ShieldCheck,
  Scan,
  Barcode,
  Sparkles,
  Clock,
  Calendar,
  DollarSign,
  Building,
  AlertTriangle,
  Home,
  Stethoscope,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAuth } from "../../contexts/AuthContext";
import { apiService } from "../../services/api";
import { toast } from "sonner";

export function Dashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [batchNumber, setBatchNumber] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [medicineHistory, setMedicineHistory] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout} = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
  }, [isAuthenticated]);

  const fetchMedicineHistory = async () => {

    setIsLoadingHistory(true);
    try {
      const history = await apiService.getMedicineHistory();
      setMedicineHistory(history);
    } catch (error: any) {
      toast.error("Failed to load medicine history");
      setMedicineHistory([]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const statuses = [
        { type: "authentic", color: "#6FCF97" },
        { type: "fake", color: "#EF5350" },
        { type: "expired", color: "#FFA726" },
        { type: "illegal", color: "#AB47BC" },
      ];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      setVerificationResult({
        status: randomStatus.type,
        color: randomStatus.color,
        medicineName: "Paracetamol 500mg Tablets",
        manufacturer: "PharmaCorp India Ltd.",
        batchNumber: batchNumber || "BN2026041234",
        mfgDate: "January 2026",
        expDate: "December 2027",
        mrp: "₹45.00",
        confidence: 96.5 + Math.random() * 3,
        timestamp: new Date().toLocaleString(),
        aiSummary: randomStatus.type === "authentic" 
          ? "This medicine has been verified as authentic. All safety parameters including manufacturing date, expiry date, and batch number have been validated against official pharmaceutical databases. Safe to use as per prescription."
          : randomStatus.type === "fake"
          ? "⚠️ WARNING: This medicine appears to be counterfeit. Packaging inconsistencies and batch number mismatch detected. Do not consume. Report to local drug regulatory authorities immediately."
          : randomStatus.type === "expired"
          ? "This medicine has passed its expiry date. Consuming expired medicines may be ineffective or harmful. Please dispose of safely and obtain a fresh supply."
          : "This medicine is not approved for sale in India by the Central Drugs Standard Control Organization (CDSCO). It may be illegal or require special import permissions.",
      });
      setIsVerifying(false);
    }, 2500);
  };


  const getStatusConfig = (status: string) => {
    switch (status) {
      case "authentic":
        return { color: "#6FCF97", bg: "bg-[#6FCF97]/10", border: "border-[#6FCF97]/30", text: "text-[#6FCF97]", icon: CheckCircle2 };
      case "fake":
        return { color: "#EF5350", bg: "bg-[#EF5350]/10", border: "border-[#EF5350]/30", text: "text-[#EF5350]", icon: XCircle };
      case "expired":
        return { color: "#FFA726", bg: "bg-[#FFA726]/10", border: "border-[#FFA726]/30", text: "text-[#FFA726]", icon: Clock };
      case "illegal":
        return { color: "#AB47BC", bg: "bg-[#AB47BC]/10", border: "border-[#AB47BC]/30", text: "text-[#AB47BC]", icon: AlertTriangle };
      default:
        return { color: "#718096", bg: "bg-gray-100", border: "border-gray-300", text: "text-gray-600", icon: AlertCircle };
    }
  };

  return (
    <div className="min-h-screen">
      
      {/* Main Content */}
      <div className="overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Verify Medicine
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {user?.name || "User"}! Upload or scan to verify medicine authenticity
            </p>
          </div>

          {/* Verify Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Card */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#4A90E2]" />
                    Input Medicine Details
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred verification method
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Image Upload */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Camera className="w-4 h-4 text-[#4A90E2]" />
                      Upload Image
                    </Label>
                    <div className="border-2 border-dashed border-[#4A90E2]/30 rounded-2xl p-8 text-center hover:border-[#4A90E2] hover:bg-blue-50/30 transition-all cursor-pointer">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        {selectedFile ? (
                          <div className="space-y-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#6FCF97] to-[#A8E6CF] rounded-2xl flex items-center justify-center mx-auto">
                              <CheckCircle2 className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-gray-500">Click to change image</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                              <Upload className="w-8 h-8 text-[#4A90E2]" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-3 bg-white text-gray-500 uppercase tracking-wider">Or</span>
                    </div>
                  </div>

                  {/* Barcode/Text Input */}
                  <div className="space-y-3">
                    <Label htmlFor="batch" className="flex items-center gap-2 text-sm font-medium">
                      <Barcode className="w-4 h-4 text-[#6FCF97]" />
                      Batch Number / Barcode
                    </Label>
                    <Input
                      id="batch"
                      placeholder="Enter batch number or barcode"
                      value={batchNumber}
                      onChange={(e) => setBatchNumber(e.target.value)}
                      className="h-12 rounded-xl border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2]"
                    />
                  </div>

                  <Button
                    className="w-full h-12 bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] hover:opacity-90 rounded-xl shadow-lg text-base"
                    onClick={handleVerify}
                    disabled={!selectedFile && !batchNumber}
                  >
                    <Scan className="w-5 h-5 mr-2" />
                    {isVerifying ? "Verifying..." : "Verify Medicine"}
                  </Button>
                </CardContent>
              </Card>

              {/* Results Card */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#4A90E2]" />
                    Verification Result
                  </CardTitle>
                  <CardDescription>
                    AI-powered analysis and safety insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isVerifying ? (
                    <div className="flex flex-col items-center justify-center py-16 space-y-4">
                      <div className="w-20 h-20 border-4 border-[#4A90E2]/20 border-t-[#4A90E2] rounded-full animate-spin"></div>
                      <p className="text-gray-600 font-medium">Analyzing medicine with AI...</p>
                      <p className="text-sm text-gray-500">This may take a few seconds</p>
                    </div>
                  ) : verificationResult ? (
                    <div className="space-y-6">
                      {/* Status Badge */}
                      <div
                        className={`flex items-center gap-4 p-5 rounded-2xl border-2 ${getStatusConfig(verificationResult.status).bg} ${getStatusConfig(verificationResult.status).border}`}
                      >
                        {(() => {
                          const StatusIcon = getStatusConfig(verificationResult.status).icon;
                          return <StatusIcon className={`w-10 h-10 flex-shrink-0 ${getStatusConfig(verificationResult.status).text}`} />;
                        })()}
                        <div className="flex-1">
                          <div className={`inline-block px-4 py-1.5 ${getStatusConfig(verificationResult.status).bg} ${getStatusConfig(verificationResult.status).text} rounded-full text-sm font-semibold mb-2 capitalize`}>
                            {verificationResult.status}
                          </div>
                          <p className="text-sm text-gray-600">
                            Confidence: {verificationResult.confidence.toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      {/* AI Summary */}
                      <div className="bg-gradient-to-br from-blue-50 to-green-50 p-5 rounded-2xl">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#4A90E2] to-[#6FCF97] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">AI Summary</h4>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {verificationResult.aiSummary}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Extracted Data */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 text-sm">Extracted Data</h4>
                        <div className="space-y-2">
                          {[
                            { icon: FileText, label: "Medicine Name", value: verificationResult.medicineName },
                            { icon: Building, label: "Manufacturer", value: verificationResult.manufacturer },
                            { icon: Barcode, label: "Batch Number", value: verificationResult.batchNumber },
                            { icon: Calendar, label: "MFG Date", value: verificationResult.mfgDate },
                            { icon: Clock, label: "EXP Date", value: verificationResult.expDate },
                            { icon: DollarSign, label: "MRP", value: verificationResult.mrp },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <item.icon className="w-4 h-4" />
                                <span>{item.label}</span>
                              </div>
                              <span className="text-sm font-medium text-gray-900">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button variant="outline" className="w-full h-11 rounded-xl border-2 border-[#4A90E2] text-[#4A90E2] hover:bg-blue-50">
                        Save to History
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 space-y-4 text-gray-400">
                      <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center">
                        <FileText className="w-10 h-10" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-600">No results yet</p>
                        <p className="text-sm mt-1">Upload an image or enter details to verify</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

          {/* History Section */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5 text-[#4A90E2]" />
                  Verification History
                </CardTitle>
                <CardDescription>View all your past medicine verifications</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingHistory ? (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <Loader2 className="w-12 h-12 text-[#4A90E2] animate-spin" />
                    <p className="text-gray-600">Loading history...</p>
                  </div>
                ) : medicineHistory.length > 0 ? (
                  <div className="space-y-3">
                    {medicineHistory.map((item) => {
                      const config = getStatusConfig(item.status);
                      const StatusIcon = config.icon;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${config.bg} rounded-2xl flex items-center justify-center`}>
                              <StatusIcon className={`w-6 h-6 ${config.text}`} />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{item.medicine}</p>
                              <p className="text-sm text-gray-500">
                                {item.date} • {item.confidence}% confidence
                              </p>
                            </div>
                          </div>
                          <div className={`px-4 py-1.5 ${config.bg} ${config.text} rounded-full text-xs font-semibold capitalize`}>
                            {item.status}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4 text-gray-400">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <History className="w-10 h-10" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-gray-600">No history yet</p>
                      <p className="text-sm mt-1">Start verifying medicines to see your history</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

          {/* Profile Section */}
            <Card className="border-0 shadow-lg rounded-2xl max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#4A90E2]" />
                  Profile Information
                </CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#4A90E2] to-[#6FCF97] rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{user?.name || "User"}</h3>
                    <p className="text-gray-600 mt-1">{user?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 p-5 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#4A90E2]">{medicineHistory.length}</div>
                    <div className="text-xs text-gray-600 mt-1">Total Scans</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#6FCF97]">
                      {medicineHistory.filter((h) => h.status === "authentic").length}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Authentic</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#EF5350]">
                      {medicineHistory.filter((h) => h.status === "fake").length}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Fake</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#FFA726]">
                      {medicineHistory.filter((h) => h.status === "expired").length}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Expired</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Account Type</Label>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-[#4A90E2]/20">
                    <p className="text-sm font-semibold text-gray-900">Free Plan</p>
                    <p className="text-xs text-gray-600 mt-1">Unlimited verifications • All features included</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full h-11 rounded-xl border-2 border-[#4A90E2] text-[#4A90E2] hover:bg-blue-50">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
