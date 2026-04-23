import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Toaster } from "./ui/sonner";

export function Root() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-green-50/30">
      <Navbar />
      <Outlet />
      <Toaster position="top-right" />
    </div>
  );
}