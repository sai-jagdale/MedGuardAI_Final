import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "./ui/sonner";

export function Root() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50/30 via-white to-green-50/30">
      {/* NAVBAR */}
      <Navbar />
      <div className="flex-1 pt-6">
        <Outlet />
      </div>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}