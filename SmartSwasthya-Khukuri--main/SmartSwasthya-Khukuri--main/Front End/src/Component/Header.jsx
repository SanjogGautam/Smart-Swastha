// Frontend/src/Component/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser, SignInButton, UserButton } from '@clerk/clerk-react';
import Logo from './Logo'; // Import the Logo component

function Header() {
  const { isSignedIn, user } = useUser();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isPatientPortalOpen, setIsPatientPortalOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isServicesActive = () => {
    return location.pathname.startsWith('/services');
  };

  const isPatientPortalActive = () => {
    return location.pathname === '/insurance-details' || location.pathname === '/medical-reports' || location.pathname === '/patient-qr';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsPatientPortalOpen(false);
  };

  // Handle clicking outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdowns when clicking outside
      if (!event.target.closest('.dropdown-container')) {
        setIsServicesDropdownOpen(false);
        setIsPatientPortalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsServicesDropdownOpen(false);
        setIsPatientPortalOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
    setIsPatientPortalOpen(false); // Close other dropdown
  };

  const togglePatientPortalDropdown = () => {
    setIsPatientPortalOpen(!isPatientPortalOpen);
    setIsServicesDropdownOpen(false); // Close other dropdown
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Logo 
              size="default" 
              showText={true} 
              className="hover:opacity-90 transition-opacity duration-200 w-auto max-w-[120px] sm:max-w-none" 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
            <Link
              to="/"
              className={`px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={toggleServicesDropdown}
                className={`px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-colors duration-200 flex items-center ${
                  isServicesActive() 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Services
                <svg className={`ml-1 h-3 w-3 xl:h-4 xl:w-4 transform transition-transform duration-200 ${
                  isServicesDropdownOpen ? 'rotate-180' : ''
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Services Dropdown Menu */}
              {isServicesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 lg:w-60 xl:w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <Link
                      to="/services/general-checkups"
                      className="block px-3 xl:px-4 py-2 text-xs xl:text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={() => {
                        setIsServicesDropdownOpen(false);
                        closeMobileMenu();
                      }}
                    >
                      <div className="flex items-center">
                        <svg className="mr-2 xl:mr-3 h-3 w-3 xl:h-4 xl:w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        General Check-ups
                      </div>
                    </Link>
                    <Link
                      to="/services/preventive-care"
                      className="block px-3 xl:px-4 py-2 text-xs xl:text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={() => {
                        setIsServicesDropdownOpen(false);
                        closeMobileMenu();
                      }}
                    >
                      <div className="flex items-center">
                        <svg className="mr-2 xl:mr-3 h-3 w-3 xl:h-4 xl:w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Preventive Care
                      </div>
                    </Link>
                    <Link
                      to="/services/telehealth-consultations"
                      className="block px-3 xl:px-4 py-2 text-xs xl:text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={() => {
                        setIsServicesDropdownOpen(false);
                        closeMobileMenu();
                      }}
                    >
                      <div className="flex items-center">
                        <svg className="mr-2 xl:mr-3 h-3 w-3 xl:h-4 xl:w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        AI Assistant
                      </div>
                    </Link>
                    <Link
                      to="/services/emergency-care"
                      className="block px-3 xl:px-4 py-2 text-xs xl:text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={() => {
                        setIsServicesDropdownOpen(false);
                        closeMobileMenu();
                      }}
                    >
                      <div className="flex items-center">
                        <svg className="mr-2 xl:mr-3 h-3 w-3 xl:h-4 xl:w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Emergency Care
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/appointment"
              className={`px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-colors duration-200 ${
                isActive('/appointment') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Appointment
            </Link>

            {/* Patient Portal Dropdown - Only show if signed in */}
            {isSignedIn && (
              <div className="relative dropdown-container">
                <button
                  onClick={togglePatientPortalDropdown}
                  className={`px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-colors duration-200 flex items-center ${
                    isPatientPortalActive() 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="hidden xl:inline">Patient Portal</span>
                  <span className="xl:hidden">Portal</span>
                  <svg className={`ml-1 h-3 w-3 xl:h-4 xl:w-4 transform transition-transform duration-200 ${
                    isPatientPortalOpen ? 'rotate-180' : ''
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Patient Portal Dropdown Menu */}
                {isPatientPortalOpen && (
                  <div className="absolute left-0 mt-2 w-48 lg:w-52 xl:w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link
                        to="/medical-reports"
                        className="block px-3 xl:px-4 py-2 text-xs xl:text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                        onClick={() => {
                          setIsPatientPortalOpen(false);
                          closeMobileMenu();
                        }}
                      >
                        <div className="flex items-center">
                          <svg className="mr-2 xl:mr-3 h-3 w-3 xl:h-4 xl:w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Medical Reports
                        </div>
                      </Link>
                      <Link
                        to="/insurance-details"
                        className="block px-3 xl:px-4 py-2 text-xs xl:text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                        onClick={() => {
                          setIsPatientPortalOpen(false);
                          closeMobileMenu();
                        }}
                      >
                        <div className="flex items-center">
                          <svg className="mr-2 xl:mr-3 h-3 w-3 xl:h-4 xl:w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          Insurance Claim
                        </div>
                      </Link>
                      <Link
                        to="/patient-qr"
                        className="block px-3 xl:px-4 py-2 text-xs xl:text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                        onClick={() => {
                          setIsPatientPortalOpen(false);
                          closeMobileMenu();
                        }}
                      >
                        <div className="flex items-center">
                          <svg className="mr-2 xl:mr-3 h-3 w-3 xl:h-4 xl:w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                          My QR Code
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Link
              to="/about"
              className={`px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-colors duration-200 ${
                isActive('/about') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-colors duration-200 ${
                isActive('/contact') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Tablet Navigation (768px - 1023px) */}
          <nav className="hidden md:flex lg:hidden items-center space-x-3">
            <Link
              to="/"
              className={`px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>

            {/* Tablet Services Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={toggleServicesDropdown}
                className={`px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                  isServicesActive() 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Services
                <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
                  isServicesDropdownOpen ? 'rotate-180' : ''
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServicesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {/* Tablet dropdown items */}
                    <Link to="/services/general-checkups" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsServicesDropdownOpen(false)}>General Check-ups</Link>
                    <Link to="/services/preventive-care" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsServicesDropdownOpen(false)}>Preventive Care</Link>
                    <Link to="/services/telehealth-consultations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsServicesDropdownOpen(false)}>AI Assistant</Link>
                    <Link to="/services/emergency-care" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsServicesDropdownOpen(false)}>Emergency Care</Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/appointment"
              className={`px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/appointment') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Book
            </Link>

            {isSignedIn && (
              <div className="relative dropdown-container">
                <button
                  onClick={togglePatientPortalDropdown}
                  className={`px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                    isPatientPortalActive() 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  Portal
                  <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
                    isPatientPortalOpen ? 'rotate-180' : ''
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isPatientPortalOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link to="/medical-reports" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsPatientPortalOpen(false)}>Medical Reports</Link>
                      <Link to="/insurance-details" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsPatientPortalOpen(false)}>Insurance Claim</Link>
                      <Link to="/patient-qr" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsPatientPortalOpen(false)}>My QR Code</Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* User Authentication */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
            {isSignedIn ? (
              <div className="flex items-center space-x-2 lg:space-x-3">
                <span className="text-xs lg:text-sm text-gray-700 hidden lg:inline">
                  Welcome, {user?.firstName}
                </span>
                <span className="text-xs text-gray-700 lg:hidden">
                  {user?.firstName}
                </span>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "h-7 w-7 lg:h-8 lg:w-8"
                    }
                  }}
                />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-md text-xs lg:text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile user button */}
            {isSignedIn && (
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-7 w-7"
                  }
                }}
              />
            )}
            
            <button
              onClick={toggleMobileMenu}
              className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
              aria-label="Toggle navigation menu"
            >
              <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 max-h-screen overflow-y-auto">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>

              {/* Mobile Services Section */}
              <div>
                <button
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center justify-between ${
                    isServicesActive() 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  Services
                  <svg className={`h-4 w-4 transform transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isServicesDropdownOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    <Link
                      to="/services/general-checkups"
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                      onClick={closeMobileMenu}
                    >
                      General Check-ups
                    </Link>
                    <Link
                      to="/services/preventive-care"
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                      onClick={closeMobileMenu}
                    >
                      Preventive Care
                    </Link>
                    <Link
                      to="/services/telehealth-consultations"
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                      onClick={closeMobileMenu}
                    >
                      AI Assistant
                    </Link>
                    <Link
                      to="/services/emergency-care"
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                      onClick={closeMobileMenu}
                    >
                      Emergency Care
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/appointment"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/appointment') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Appointment
              </Link>

              {/* Mobile Patient Portal - Only show if signed in */}
              {isSignedIn && (
                <div>
                  <button
                    onClick={() => setIsPatientPortalOpen(!isPatientPortalOpen)}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center justify-between ${
                      isPatientPortalActive() 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    Patient Portal
                    <svg className={`h-4 w-4 transform transition-transform ${isPatientPortalOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isPatientPortalOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      <Link
                        to="/medical-reports"
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        onClick={closeMobileMenu}
                      >
                        Medical Reports
                      </Link>
                      <Link
                        to="/insurance-details"
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        onClick={closeMobileMenu}
                      >
                        Insurance Claim
                      </Link>
                      <Link
                        to="/patient-qr"
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        onClick={closeMobileMenu}
                      >
                        My QR Code
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <Link
                to="/about"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/about') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                About
              </Link>

              <Link
                to="/contact"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/contact') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Contact
              </Link>

              {/* Mobile Authentication - Only show sign in if not signed in */}
              {!isSignedIn && (
                <div className="pt-4 border-t border-gray-200">
                  <SignInButton mode="modal">
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 mx-3">
                      Sign In
                    </button>
                  </SignInButton>
                </div>
              )}

              {/* Mobile user info - Only show if signed in */}
              {isSignedIn && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <span className="text-sm text-gray-700">
                      Signed in as {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;