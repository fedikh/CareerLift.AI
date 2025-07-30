import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";

const FAQ = () => {
  return (
    <footer id="FAQ" className="bg-[#001a33] border-t border-[#003366]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="md:grid md:grid-cols-3 md:gap-8">
          {/* Contact Information */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaEnvelope className="text-[#4da6ff] mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Email</p>
                  <p className="text-white font-medium">
                    support@careerlift.ai
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FaPhoneAlt className="text-[#4da6ff] mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Phone</p>
                  <p className="text-white font-medium">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Services
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                About Us
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </a>
            </div>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Stay Connected
            </h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="text-gray-400 hover:text-[#4da6ff] transition-colors"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#4da6ff] transition-colors"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#4da6ff] transition-colors"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-[#002b4d] border border-[#004080] text-white placeholder-gray-400 rounded-l-md focus:ring-[#4da6ff] focus:border-[#4da6ff] flex-grow text-sm"
                />
                <button className="bg-gradient-to-r from-[#0066cc] to-[#004080] text-white px-3 py-2 rounded-r-md text-sm font-medium hover:opacity-90 transition-opacity">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#001225] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs md:text-sm">
            © {new Date().getFullYear()} CareerLift. All rights reserved.
          </p>
          <div className="mt-2 md:mt-0 flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-xs md:text-sm transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-xs md:text-sm transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-xs md:text-sm transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FAQ;
