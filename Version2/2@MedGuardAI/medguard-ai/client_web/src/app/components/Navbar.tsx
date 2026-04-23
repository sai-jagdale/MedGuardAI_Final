import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { NavItem} from "./ui/navitem";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Verify } from "./Verify";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItemClass = (path: string) =>
    `text-base font-medium transition-colors relative ${
      isActive(path)
        ? "text-[#4A90E2]"
        : "text-black hover:text-[#4A90E2]"
    }`;

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/favicon.png" alt="MedGuard AI" className="w-16 h-16 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] bg-clip-text text-transparent">
                MedGuard AI
              </span>
              <span className="text-sm text-black -mt-0.5">Medicine Verification</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavItem path="/">Home</NavItem>
            <NavItem path="/features">Features</NavItem>
            <NavItem path="/how-it-works">How It Works</NavItem>
            <NavItem path="/about">About</NavItem>

            {!isAuthenticated ? (
                <>
                  <NavItem path="/login">Login</NavItem>
                  <Button
                      onClick={() => {navigate("/register")} }
                      className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] hover:opacity-90 shadow-xl hover:shadow-2xl transition-all rounded-xl w-full sm:w-auto text-base">
                      Get Started
                    </Button>
                </>
              ) : (
                <>
                  {/* History */}
                  <NavItem path="/history">History</NavItem>

                  {/* Verify Medicines */}
                  <NavItem path="/verify">Verify Medicines</NavItem>

                  <NavItem path="/ai-assistant">AI Assistant</NavItem>

                  {/* User Dropdown */}
                  <div className="relative">
                    <Button
                      onClick={() => setOpen(!open)}
                      className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] hover:opacity-90 shadow-xl hover:shadow-2xl transition-all rounded-xl w-full sm:w-auto text-base"
                    >
                      Hi {user?.name}
                    </Button>

                    {open && (
                      <div className="absolute right-0 mt-2 w-44 bg-white border border-green-200 rounded-xl shadow-lg shadow-green-100 z-50 overflow-hidden">
                        
                        <button
                          onClick={() => {
                            setOpen(false);
                            navigate("/account");
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Profile
                        </button>

                        <button
                          onClick={() => {
                            setOpen(false);
                            logout();
                            navigate("/");
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Logout
                        </button>

                      </div>
                    )}
                  </div>
                </>
              )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-[#4A90E2] transition-colors rounded-lg hover:bg-blue-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className={`text-sm py-3 px-4 rounded-xl transition-colors font-medium ${
                  isActive("/")
                    ? "bg-gradient-to-r from-blue-50 to-green-50 text-[#4A90E2]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/features"
                className={`text-sm py-3 px-4 rounded-xl transition-colors font-medium ${
                  isActive("/features")
                    ? "bg-gradient-to-r from-blue-50 to-green-50 text-[#4A90E2]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/how-it-works"
                className={`text-sm py-3 px-4 rounded-xl transition-colors font-medium ${
                  isActive("/how-it-works")
                    ? "bg-gradient-to-r from-blue-50 to-green-50 text-[#4A90E2]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                to="/about"
                className={`text-sm py-3 px-4 rounded-xl transition-colors font-medium ${
                  isActive("/about")
                    ? "bg-gradient-to-r from-blue-50 to-green-50 text-[#4A90E2]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              {!isAuthenticated ? (
                <>
                  <button onClick={() => navigate("/login")}>Login</button>
                  <button onClick={() => navigate("/register")}>Get Started</button>
                </>
              ) : (
                <>
                  {/* History */}
                  <button onClick={() => navigate("/history")}>History</button>

                  {/* User Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setOpen(!open)}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Hi {user?.name}
                    </button>

                    {open && (
                      <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded z-50">
                        
                        <button
                          onClick={() => {
                            setOpen(false);
                            navigate("/profile");
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Profile
                        </button>

                        <button
                          onClick={() => {
                            setOpen(false);
                            logout();
                            navigate("/");
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Logout
                        </button>

                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
