import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid md:grid-cols-4 gap-8 mb-8">

          {/* Logo + About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#4A90E2] to-[#6FCF97] p-2 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">
                MedGuard AI
              </span>
            </div>

            <p className="text-sm leading-relaxed">
              Intelligent medicine verification platform powered by advanced AI technology.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">

              <li>
                <Link to="/features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>

              <li>
                <Link to="/verify" className="hover:text-white transition-colors">
                  Verify Medicine
                </Link>
              </li>

              <li>
                <Link to="/symptom-checker" className="hover:text-white transition-colors">
                  Symptom Checker
                </Link>
              </li>

              <li>
                <Link to="/history" className="hover:text-white transition-colors">
                  History
                </Link>
              </li>

            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">

              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>

              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>

            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">

              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-sm">
            © 2026 MedGuard AI. All rights reserved. • Not a substitute for professional medical advice
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;