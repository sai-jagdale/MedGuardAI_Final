import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Edit2,
  Save,
  X,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAuth } from "../../contexts/AuthContext";
import { apiService } from "../../services/api";
import { toast } from "sonner";
import { Footer } from "./Footer";

export function Account() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [medicineHistory, setMedicineHistory] = useState<any[]>([]);
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUserProfile } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      if (user) {
        setEditedName(user?.name || "");
      }
      fetchHistory();
    }
  }, [isAuthenticated, user]);

  const fetchHistory = async () => {
    try {
      const history = await apiService.getMedicineHistory();

      console.log("Account History:", history);

      setMedicineHistory(history);
    } catch (error) {
      setMedicineHistory([]);
    }
  };

  const handleSave = async () => {
    if (!editedName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsUpdating(true);

      const payload: any = {};

        if (editedName && editedName !== user?.name) {
          payload.name = editedName;
        }

        if (editedEmail && editedEmail !== user?.email) {
          payload.email = editedEmail;
        }

        if (editedPassword && editedPassword.trim() !== "") {
          payload.password = editedPassword;
        }

    try {
      await updateUserProfile(payload);
      toast.success("Profile updated successfully");
      setIsEditing(false);
      setEditedPassword(""); // clear password after update
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditedName(user?.name || "");
    setEditedEmail(user?.email || "");
    setEditedPassword("");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-gray-900">Hello, </span>
            <span className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] bg-clip-text text-transparent">
              {user?.name || "User"}
            </span>
          </h1>
          <p className="text-xl text-gray-600">Manage your profile and view your statistics</p>
        </div>

        {/* Profile Card */}
        <Card className="border-0 shadow-xl rounded-3xl mb-8 bg-gradient-to-br from-blue-50/50 to-green-50/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#4A90E2]" />
              Profile Information
            </CardTitle>
            <CardDescription>Your personal details and account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 relative">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#4A90E2] to-[#6FCF97] rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder="New Name"
                        className="mt-1 h-12 rounded-xl border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2]"
                      />
                      <Input
                        id="email"
                        type="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        placeholder="New Email"
                        className="mt-4 h-12 rounded-xl border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2]"
                      />
                      <Input
                        id="password"
                        type="password"
                        value={editedPassword}
                        onChange={(e) => setEditedPassword(e.target.value)}
                        placeholder="New Password"
                        className="mt-4 h-12 rounded-xl border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        disabled={isUpdating}
                        className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] hover:opacity-90 rounded-xl"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isUpdating ? "Saving..." : "Save"}
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="rounded-xl border-gray-200"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{user?.name || "User"}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{user?.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Updated at {user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {!isEditing && (
              <div className="absolute bottom-6 right-6">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] hover:opacity-90 rounded-xl shadow-lg hover:scale-105 transition-all duration-200">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card className="border-0 shadow-xl rounded-3xl bg-gradient-to-br from-blue-50/50 to-green-50/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Verification Statistics</CardTitle>
            <CardDescription>Your medicine verification summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-3xl font-bold text-[#4A90E2] mb-1">
                  {medicineHistory.length}
                </div>
                <div className="text-xs text-gray-600">Total Scans</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-3xl font-bold text-[#6FCF97] mb-1">
                  {medicineHistory.filter((h) => h.status === "authentic").length}
                </div>
                <div className="text-xs text-gray-600">Authentic</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-3xl font-bold text-[#EF5350] mb-1">
                  {medicineHistory.filter((h) => h.status === "fake").length}
                </div>
                <div className="text-xs text-gray-600">Fake</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-3xl font-bold text-[#FFA726] mb-1">
                  {medicineHistory.filter((h) => h.status === "expired").length}
                </div>
                <div className="text-xs text-gray-600">Expired</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Footer Section */}
    <Footer />
    </div>
  );
}
