// src/Component/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo[1].png'; // Using the specific uploaded logo name

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12 mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Company Info */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center mb-4">
            <img src={logo} alt="Swastha Logo" className="h-10 w-auto mr-3" />
            <span className="text-3xl font-extrabold text-white">Swastha</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Empowering healthier lives through compassionate and innovative care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-5 text-blue-200">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 text-base">Home</Link></li>
            <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-base">About Us</Link></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-base">Our Services</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-base">Blog & News</a></li>
            <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-base">Contact Us</Link></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-base">FAQs</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-5 text-blue-200">Contact Info</h3>
          <p className="text-gray-300 text-base mb-3">
            123 Healthway, Kirtipur, Kathmandu, Nepal
          </p>
          <p className="text-gray-300 text-base mb-3">
            Email: <a href="mailto:info@swastha.com" className="hover:underline">info@swastha.com</a>
          </p>
          <p className="text-gray-300 text-base mb-3">
            Phone: <a href="tel:+977123456789" className="hover:underline">+977-1-23456789</a>
          </p>
          <p className="text-gray-300 text-base">
            Operating Hours: Mon-Fri, 9 AM - 6 PM NST
          </p>
        </div>

        {/* Search & Connect */}
        <div>
          <h3 className="text-xl font-bold mb-5 text-blue-200">Search & Connect</h3>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search site..."
              className="w-full bg-blue-800 text-white placeholder-blue-300 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              <i className="fab fa-facebook-f text-2xl"></i> {/* Requires Font Awesome */}
              {/* For simplicity, you can use an SVG icon here if not using Font Awesome */}
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              <i className="fab fa-linkedin-in text-2xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-blue-700 mt-10 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Swastha. All rights reserved.</p>
        <p className="mt-2">
          <a href="#" className="hover:underline mx-2">Privacy Policy</a> |
          <a href="#" className="hover:underline mx-2">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;