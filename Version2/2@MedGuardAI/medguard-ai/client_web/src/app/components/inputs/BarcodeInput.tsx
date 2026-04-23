import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Camera, Barcode } from "lucide-react";

export function BarcodeInput({ onVerify }: any) {
  const [barcode, setBarcode] = useState("");
  const [cameraOn, setCameraOn] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraOn(true);
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());
    setCameraOn(false);
  };

  return (
    <div className="space-y-6">

      {/* Label */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Barcode className="w-4 h-4 text-[#6FCF97]" />
          Scan Barcode
        </Label>

        {/* Scan Box (like Upload Image) */}
        {!cameraOn && (
          <div
            onClick={startCamera}
            className="border-2 border-dashed border-[#6FCF97]/30 rounded-2xl p-8 text-center 
            hover:border-[#6FCF97] hover:bg-green-50/30 transition-all cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                <Camera className="w-8 h-8 text-[#6FCF97]" />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">
                  Tap to scan barcode
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Camera will open automatically
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Camera Preview */}
      {cameraOn && (
        <div className="relative rounded-2xl overflow-hidden border">
          <video
            ref={videoRef}
            autoPlay
            className="w-full"
          />

          {/* Scanner Line Animation */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500 animate-pulse"></div>

          <Button
            onClick={stopCamera}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600"
          >
            Stop
          </Button>
        </div>
      )}

      {/* OR Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-white text-gray-500 uppercase tracking-wider">
            Or Enter Manually
          </span>
        </div>
      </div>

      {/* Manual Input */}
      <Input
        placeholder="Enter barcode manually"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        className="h-12 rounded-xl border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2]"
      />

    </div>
  );
}

export default BarcodeInput;