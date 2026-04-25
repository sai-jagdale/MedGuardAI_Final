import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Camera,
  Barcode,
  Scan,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  Sparkles,
  Calendar,
  DollarSign,
  Building,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAuth } from "../../contexts/AuthContext";
import { BarcodeInput } from "./inputs/BarcodeInput";
import { TextInput } from "./inputs/TextInput";

export function Verify() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [batchNumber, setBatchNumber] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [inputMode, setInputMode] = useState<"text" | "image" | "barcode">("image");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleVerify = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

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
        aiSummary:
          randomStatus.type === "authentic"
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
        return {
          color: "#6FCF97",
          bg: "bg-[#6FCF97]/10",
          border: "border-[#6FCF97]/30",
          text: "text-[#6FCF97]",
          icon: CheckCircle2,
        };
      case "fake":
        return {
          color: "#EF5350",
          bg: "bg-[#EF5350]/10",
          border: "border-[#EF5350]/30",
          text: "text-[#EF5350]",
          icon: XCircle,
        };
      case "expired":
        return {
          color: "#FFA726",
          bg: "bg-[#FFA726]/10",
          border: "border-[#FFA726]/30",
          text: "text-[#FFA726]",
          icon: Clock,
        };
      case "illegal":
        return {
          color: "#AB47BC",
          bg: "bg-[#AB47BC]/10",
          border: "border-[#AB47BC]/30",
          text: "text-[#AB47BC]",
          icon: AlertTriangle,
        };
      default:
        return {
          color: "#718096",
          bg: "bg-gray-100",
          border: "border-gray-300",
          text: "text-gray-600",
          icon: AlertTriangle,
        };
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-green-100 text-[#4A90E2] px-5 py-2.5 rounded-full text-sm font-medium shadow-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Verification</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Verify Your Medicine
            <span className="block mt-2 bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] bg-clip-text text-transparent">
              In Seconds
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload a photo, scan a barcode, or enter batch details to instantly verify medicine authenticity.
          </p>
        </div>

        {/* Verification Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Card */}
          <Card className="border-0 shadow-xl rounded-3xl bg-gradient-to-br from-blue-50/50 to-green-50/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#4A90E2]" />
                Input Medicine Details
              </CardTitle>
              <CardDescription>Choose your preferred verification method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 relative">
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setInputMode("image")}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    inputMode === "image"
                      ? "bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] text-white shadow-md"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Image
                </button>

                <button
                  onClick={() => setInputMode("text")}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    inputMode === "text"
                      ? "bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] text-white shadow-md"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Text
                </button>

                <button
                  onClick={() => setInputMode("barcode")}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    inputMode === "barcode"
                      ? "bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] text-white shadow-md"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Barcode
                </button>
              </div>
              {/* Image Upload */}
              {inputMode === "image" && (
               <>
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
                          <div className="w-16 h-16 bg-gradient-to-br from-[#6FCF97] to-[#A8E6CF] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                            <CheckCircle2 className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
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
              </>
            )}

           {inputMode === "text" && <TextInput onVerify={handleVerify} />}

           {/* Barcode/Text Input */}
           {inputMode === "barcode" && ( <BarcodeInput onVerify={handleVerify} /> ) }

              <Button
                  className="w-full h-12 bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] hover:opacity-90 rounded-xl shadow-lg text-base disabled:opacity-100 disabled:cursor-not-allowed"
                  onClick={handleVerify}
                  disabled={ isVerifying || (inputMode === "image" && !selectedFile) || (inputMode === "barcode" && !batchNumber)} >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Scan className="w-5 h-5 mr-2" />
                    Verify Medicine
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="border-0 shadow-xl rounded-3xl bg-gradient-to-br from-blue-50/50 to-green-50/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#4A90E2]" />
                Verification Result
              </CardTitle>
              <CardDescription>AI-powered analysis and safety insights</CardDescription>
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
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 ${
                      getStatusConfig(verificationResult.status).bg
                    } ${getStatusConfig(verificationResult.status).border}`}
                  >
                    {(() => {
                      const StatusIcon = getStatusConfig(verificationResult.status).icon;
                      return (
                        <StatusIcon
                          className={`w-10 h-10 flex-shrink-0 ${
                            getStatusConfig(verificationResult.status).text
                          }`}
                        />
                      );
                    })()}
                    <div className="flex-1">
                      <div
                        className={`inline-block px-4 py-1.5 ${
                          getStatusConfig(verificationResult.status).bg
                        } ${
                          getStatusConfig(verificationResult.status).text
                        } rounded-full text-sm font-semibold mb-2 capitalize`}
                      >
                        {verificationResult.status}
                      </div>
                      <p className="text-sm text-gray-600">
                        Confidence: {verificationResult.confidence.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* AI Summary */}
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 p-5 rounded-2xl shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#4A90E2] to-[#6FCF97] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
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
                        {
                          icon: FileText,
                          label: "Medicine Name",
                          value: verificationResult.medicineName,
                        },
                        {
                          icon: Building,
                          label: "Manufacturer",
                          value: verificationResult.manufacturer,
                        },
                        {
                          icon: Barcode,
                          label: "Batch Number",
                          value: verificationResult.batchNumber,
                        },
                        { icon: Calendar, label: "MFG Date", value: verificationResult.mfgDate },
                        { icon: Clock, label: "EXP Date", value: verificationResult.expDate },
                        { icon: DollarSign, label: "MRP", value: verificationResult.mrp },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 px-3 bg-white rounded-xl shadow-sm"
                        >
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full h-11 rounded-xl border-2 border-[#4A90E2] text-[#4A90E2] hover:bg-blue-50"
                  >
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
                    <p className="text-sm mt-1">Upload an image , enter details or enter barcode to verify</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
