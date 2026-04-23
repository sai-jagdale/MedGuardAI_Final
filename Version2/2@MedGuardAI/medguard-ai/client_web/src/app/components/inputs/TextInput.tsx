import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "../ui/label";

export function TextInput({ onVerify }: any) {
  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    batch: "",
    mfg: "",
  });

  return (
    <div className="space-y-4">
      <div>
                    <Label className="text-sm font-medium">Medicine Name</Label>
                    <Input
                      placeholder="Medicine Name"
                      className="mt-1 h-12 rounded-xl border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2]"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Manufacturer</Label>
                    <Input
                      placeholder="Manufacturer"
                      className="mt-1 h-12 rounded-xl border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2]"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Batch Number</Label>
                    <Input
                      placeholder="Batch Number"
                      className="mt-1 h-12 rounded-xl border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2]"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Manufacturing Date</Label>
                    <Input
                      placeholder="dd-mm-yyyy"
                      className="mt-1 h-12 rounded-xl border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2]"
                    />
                  </div>
    </div>
  );
}

export default TextInput;