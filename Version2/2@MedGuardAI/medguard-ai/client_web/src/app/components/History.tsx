import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  History as HistoryIcon,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Loader2,
  Filter,
  Search,
  Calendar,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { useAuth } from "../../contexts/AuthContext";
import { apiService } from "../../services/api";
import { toast } from "sonner";
import { HistoryViewer } from "./HistoryViewer";

export function History() {
  const [medicineHistory, setMedicineHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated , accessToken } = useAuth();
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  useEffect(() => {
    if (isLoading) return; // ✅ WAIT FOR AUTH

    if (!isAuthenticated) {
      navigate("/login");
    } else if (accessToken) {
      fetchHistory();
    }
  }, [isAuthenticated, accessToken, isLoading]);

  const fetchHistory = async () => {
    if (!accessToken) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/server/history/sessions/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed request");
      }
      const data = await res.json();
      console.log("HISTORY DATA:", data);
      setMedicineHistory(data);
    } catch (error) {
      console.error("History error:", error);
      toast.error("Failed to load history");
      setMedicineHistory([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "authentic":
        return {
          bg: "bg-[#6FCF97]/10",
          text: "text-[#6FCF97]",
          icon: CheckCircle2,
        };
      case "fake":
        return {
          bg: "bg-[#EF5350]/10",
          text: "text-[#EF5350]",
          icon: XCircle,
        };
      case "expired":
        return {
          bg: "bg-[#FFA726]/10",
          text: "text-[#FFA726]",
          icon: Clock,
        };
      case "illegal":
        return {
          bg: "bg-[#AB47BC]/10",
          text: "text-[#AB47BC]",
          icon: AlertTriangle,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          icon: AlertTriangle,
        };
    }
  };

  const handleOpen = async (item: any) => {
    try {
      if (item.type === "chat") {
        const res = await fetch(
          `http://127.0.0.1:8000/api/server/history/messages/${item.id}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();

        setSelectedItem(data); // chat messages
      } else {
        setSelectedItem(item); // medicine data
      }

      setViewerOpen(true);

    } catch (error) {
      toast.error("Failed to load data");
    }
  };

  const filteredHistory = medicineHistory.filter((item) => {
    const matchesSearch =
      (item.preview || item.medicine || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      item.status === filterStatus || // ✅ medicine filters
      (filterStatus === "chat" && item.type === "chat"); // ✅ chat filter

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Verification History</h1>
          <p className="text-xl text-gray-600">
            View and manage all your past medicine verifications
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2]"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              className={`rounded-xl ${
                filterStatus === "all"
                  ? "bg-gradient-to-r from-[#4A90E2] to-[#6FCF97]"
                  : "border-gray-200"
              }`}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "authentic" ? "default" : "outline"}
              onClick={() => setFilterStatus("authentic")}
              className={`rounded-xl ${
                filterStatus === "authentic" ? "bg-[#6FCF97]" : "border-gray-200"
              }`}
            >
              Authentic
            </Button>
            <Button
              variant={filterStatus === "fake" ? "default" : "outline"}
              onClick={() => setFilterStatus("fake")}
              className={`rounded-xl ${
                filterStatus === "fake" ? "bg-[#EF5350]" : "border-gray-200"
              }`}
            >
              Fake
            </Button>
            <Button
              variant={filterStatus === "chat" ? "default" : "outline"}
              onClick={() => setFilterStatus("chat")}
              className={`rounded-xl ${
                filterStatus === "chat"
                  ? "bg-gradient-to-r from-[#4A90E2] to-[#6FCF97]"
                  : "border-gray-200"
              }`}
            >
              Chat
            </Button>
          </div>
        </div>

        {/* History List */}
        <Card className="border-0 shadow-xl rounded-3xl bg-gradient-to-br from-blue-50/50 to-green-50/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HistoryIcon className="w-5 h-5 text-[#4A90E2]" />
              All Verifications
            </CardTitle>
            <CardDescription>
              {filteredHistory.length} {filteredHistory.length === 1 ? "result" : "results"} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <Loader2 className="w-12 h-12 text-[#4A90E2] animate-spin" />
                <p className="text-gray-600">Loading history...</p>
              </div>
            ) : filteredHistory.length > 0 ? (
              <div className="space-y-3">
                {filteredHistory.map((item) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleOpen(item)} // 🔥 IMPORTANT CHANGE
                      className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-4">

                        {/* ICON (simple for chat) */}
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shadow-sm">
                          <HistoryIcon className="w-6 h-6 text-[#4A90E2]" />
                        </div>

                        {/* TEXT */}
                        <div>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </p>

                          {/* 🔥 CHAT PREVIEW */}
                          <p className="font-semibold text-gray-900 mt-1">
                            {item.preview?.slice(0, 40)}...
                          </p>
                        </div>
                      </div>

                      {/* OPTIONAL TAG */}
                      <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                        Chat
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 space-y-4 text-gray-400">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center">
                  <HistoryIcon className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-600">
                    {searchQuery || filterStatus !== "all" ? "No results found" : "No history yet"}
                  </p>
                  <p className="text-sm mt-1">
                    {searchQuery || filterStatus !== "all"
                      ? "Try adjusting your filters"
                      : "Start verifying medicines to see your history"}
                  </p>
                  {!searchQuery && filterStatus === "all" && (
                    <Link to="/verify">
                      <Button className="mt-4 bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] hover:opacity-90 rounded-xl">
                        Verify Medicine
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {viewerOpen && (
        <HistoryViewer
          item={selectedItem}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
}
