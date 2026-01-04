import React, { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  Users,
  Clock,
  MessageSquare,
  FileText,
  Settings,
  Bell,
  Search,
  Filter,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  User,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  TrendingUp,
  Activity,
  Heart,
  Thermometer,
  QrCode,
  Download,
  Share,
  ArrowLeft,
  Calendar as CalendarIcon,
} from "lucide-react";
import { QrReader } from "react-qr-reader";
import axios from "axios";

// Mock data for demonstration
const mockAppointments = [
  {
    id: 1,
    patientName: "Rajesh Kumar",
    patientId: "PAT001",
    time: "09:00 AM",
    date: "2025-07-25",
    type: "General Checkup",
    status: "confirmed",
    urgency: "normal",
    phone: "+977-98-1234567",
    email: "rajesh.kumar@email.com",
    age: 45,
    symptoms: "Routine health check, mild fatigue",
  },
  {
    id: 2,
    patientName: "Sita Sharma",
    patientId: "PAT002",
    time: "10:30 AM",
    date: "2025-07-25",
    type: "Follow-up",
    status: "pending",
    urgency: "high",
    phone: "+977-98-7654321",
    email: "sita.sharma@email.com",
    age: 32,
    symptoms: "Diabetes monitoring, blood sugar levels",
  },
  {
    id: 3,
    patientName: "Hari Bahadur",
    patientId: "PAT003",
    time: "02:00 PM",
    date: "2025-07-25",
    type: "Preventive Care",
    status: "confirmed",
    urgency: "normal",
    phone: "+977-98-1111222",
    email: "hari.bahadur@email.com",
    age: 28,
    symptoms: "Vaccination consultation",
  },
  {
    id: 4,
    patientName: "Maya Thapa",
    patientId: "PAT004",
    time: "03:30 PM",
    date: "2025-07-25",
    type: "Telehealth",
    status: "confirmed",
    urgency: "normal",
    phone: "+977-98-3333444",
    email: "maya.thapa@email.com",
    age: 55,
    symptoms: "Medication review, hypertension",
  },
];

const mockPatients = [
  {
    id: "PAT001",
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    phone: "+977-98-1234567",
    email: "rajesh.kumar@email.com",
    address: "Lalitpur, Nepal",
    lastVisit: "2025-07-20",
    condition: "Hypertension",
    insurance: "Nepal Insurance",
    emergencyContact: "+977-98-9999888",
  },
  {
    id: "PAT002",
    name: "Sita Sharma",
    age: 32,
    gender: "Female",
    phone: "+977-98-7654321",
    email: "sita.sharma@email.com",
    address: "Kathmandu, Nepal",
    lastVisit: "2025-07-18",
    condition: "Diabetes Type 2",
    insurance: "Prabhu Insurance",
    emergencyContact: "+977-98-7777666",
  },
  {
    id: "PAT003",
    name: "Hari Bahadur",
    age: 28,
    gender: "Male",
    phone: "+977-98-1111222",
    email: "hari.bahadur@email.com",
    address: "Pokhara, Nepal",
    lastVisit: "2025-07-22",
    condition: "Healthy",
    insurance: "ABC Health",
    emergencyContact: "+977-98-1234567",
  },
  {
    id: "PAT004",
    name: "Maya Thapa",
    age: 55,
    gender: "Female",
    phone: "+977-98-3333444",
    email: "maya.thapa@email.com",
    address: "Biratnagar, Nepal",
    lastVisit: "2025-07-24",
    condition: "Hypertension",
    insurance: "XYZ Care",
    emergencyContact: "+977-98-5555666",
  },
];

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // New states for QR scanner and patient report
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [scannerError, setScannerError] = useState(null);
  const [patientReport, setPatientReport] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [reportError, setReportError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null); // For custom alerts

  // Backend URL from environment
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api";

  // Function to fetch patient data from backend, wrapped in useCallback for performance
  const fetchPatientData = useCallback(async (patientId) => {
    try {
      setIsLoadingReport(true);
      setReportError(null);
      
      // Fetch patient basic data
      // NOTE: Using hardcoded ID '1' as in the original code. This should be dynamic in a real app.
      const patientResponse = await axios.get(`${BACKEND_URL}/patients/1`);
      const patientInfo = patientResponse.data;
      setPatientData(patientInfo);
      
      // Fetch patient report
      // NOTE: Using hardcoded ID '1' as in the original code. This should be dynamic in a real app.
      const reportResponse = await axios.get(`${BACKEND_URL}/patient-reports/1`);
      const reportInfo = reportResponse.data;
      setPatientReport(reportInfo);
      
      return { patientInfo, reportInfo };
    } catch (error) {
      console.error("Error fetching patient data:", error);
      setReportError(error.response?.data?.message || "Failed to fetch patient data");
      return null;
    } finally {
      setIsLoadingReport(false);
    }
  }, [BACKEND_URL]); // Dependency for useCallback

  // Effect to handle scanned QR data
  useEffect(() => {
    if (scannedData) {
      // Immediately switch to the report tab and turn off the camera.
      // This provides a smoother transition and prevents re-scans.
      setActiveTab("patient-report");
      setIsScannerOpen(false);

      const handleScannedData = async () => {
        try {
          // Check if scanned data contains patient ID
          if (scannedData === "user_30PPJDp4cUoAH1sXoYTCdaSpyWM") {
            // For the specific user, use patient ID 1
            await fetchPatientData(1);
          } else {
            // Try to extract patient ID from scanned data
            let patientId = null;
            
            try {
              // Try to parse as JSON first
              const parsedData = JSON.parse(scannedData);
              patientId = parsedData.patientId || parsedData.id;
            } catch (error) {
              // If not JSON, treat as direct patient ID
              patientId = scannedData.replace(/\D/g, ''); // Extract numbers only
            }
            
            if (patientId) {
              await fetchPatientData(patientId);
            } else {
              setAlertMessage(`Invalid QR code format. Scanned data: "${scannedData}"`);
              // If the QR code is invalid, switch back to the scanner so the user can try again.
              setActiveTab("scan-qr");
            }
          }
        } catch (error) {
          console.error("Error processing scanned data:", error);
          setAlertMessage("Error processing QR code data");
          // If there's an error fetching data, switch back to the scanner.
          setActiveTab("scan-qr");
        }
        
        // Reset scanned data to prevent re-triggering.
        setScannedData(null);
      };

      handleScannedData();
    }
  }, [scannedData, fetchPatientData]);

  const handleAppointmentAction = (id, action) => {
    console.log(`${action} appointment ${id}`);
    // In real app, this would update the backend
  };

  const filteredAppointments = mockAppointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || apt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "normal":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const StatCard = ({ icon: Icon, title, value, color = "blue", trend }) => (
    <div
      className={`bg-white p-6 rounded-xl shadow-lg border-l-4 border-${color}-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold text-${color}-600 mt-2`}>{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 text-sm font-medium">
                {trend}
              </span>
            </div>
          )}
        </div>
        <Icon className={`w-12 h-12 text-${color}-500 opacity-80`} />
      </div>
    </div>
  );

  // QR Reader Handlers
  const handleScanResult = (result, error) => {
    // Only set the scanned data. The useEffect hook will handle the logic.
    if (result && !scannedData) {
      setScannedData(result.text);
      setScannerError(null);
    }
    if (error) {
      if (error.message !== scannerError) {
          console.error("QR Scan Error:", error);
          setScannerError("Error during scanning. Please try again.");
      }
    }
  };

  const handleScannerError = (err) => {
    console.error("Scanner Error:", err);
    setScannerError("Failed to access camera or a scanning error occurred.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-blue-700">Swastha</h1>
                  <p className="text-xs text-gray-500">Doctor Portal</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Dr. Smith</p>
                  <p className="text-gray-500">General Physician</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg h-screen sticky top-16">
          <nav className="mt-8 px-4">
            <ul className="space-y-2">
              {[
                { id: "dashboard", label: "Dashboard", icon: Activity },
                { id: "appointments", label: "Appointments", icon: Calendar },
                { id: "patients", label: "Patients", icon: Users },
                { id: "scan-qr", label: "Scan QR Code", icon: QrCode },
                { id: "patient-report", label: "Patient Report", icon: FileText },
                { id: "messages", label: "Messages", icon: MessageSquare },
                { id: "reports", label: "Reports", icon: FileText },
                { id: "settings", label: "Settings", icon: Settings },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      if (item.id === "scan-qr") {
                        setIsScannerOpen(true);
                        // Clear previous report data when going to scanner
                        setPatientData(null);
                        setPatientReport(null);
                        setReportError(null);
                        setActiveTab("scan-qr");
                      } else {
                        setIsScannerOpen(false);
                        setActiveTab(item.id);
                      }
                    }}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      activeTab === item.id
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Dashboard
                </h1>
                <p className="text-gray-600">
                  Welcome back, Dr.Shyam. Here's your daily overview.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={Calendar}
                  title="Today's Appointments"
                  value="12"
                  color="blue"
                />
                <StatCard
                  icon={Users}
                  title="Total Patients"
                  value="156"
                  color="green"
                />
                <StatCard
                  icon={Clock}
                  title="Pending Appointments"
                  value="3"
                  color="yellow"
                />
                <StatCard
                  icon={Heart}
                  title="Completed Today"
                  value="8"
                  color="red"
                />
              </div>

              {/* Quick Actions & Upcoming Appointments */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveTab("appointments")}
                      className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                    >
                      <span className="flex items-center">
                        <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                        View Today's Schedule
                      </span>
                      <span className="text-blue-600 font-medium">
                        12 appointments
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab("patients")}
                      className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
                    >
                      <span className="flex items-center">
                        <Users className="w-5 h-5 text-green-600 mr-3" />
                        Add New Patient
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab("scan-qr")}
                      className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200"
                    >
                      <span className="flex items-center">
                        <QrCode className="w-5 h-5 text-purple-600 mr-3" />
                        Scan Patient QR
                      </span>
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Upcoming Appointments
                  </h3>
                  <div className="space-y-3">
                    {mockAppointments.slice(0, 3).map((apt) => (
                      <div
                        key={apt.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {apt.patientName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {apt.time} - {apt.type}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            apt.status
                          )}`}
                        >
                          {apt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">
                  Appointments
                </h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Add Appointment
                </button>
              </div>

              {/* Search and Filter */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Appointments Table */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patient
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                 
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAppointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text- sm font-medium text-gray-900">
                                {apt.patientName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {apt.patientId}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {apt.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {apt.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(
                                apt.status
                              )}`}
                            >
                              {apt.status}
                            </span>
                          </td>
                  
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "patients" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Add Patient
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {patient.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {patient.age} years, {patient.gender}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPatient(patient);
                          setShowPatientModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {patient.email}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {patient.address}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          Last Visit: {patient.lastVisit}
                        </p>
                        <p className="text-xs text-gray-500">
                          Condition: {patient.condition}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QR Scanner View */}
          {activeTab === "scan-qr" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Scan Patient QR Code
              </h1>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-center mb-6">
                  <p className="text-gray-600 mb-4">
                    Point your camera at the patient's QR code to quickly pull
                    up their profile.
                  </p>

                  {scannerError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 font-medium">Scanner Error:</p>
                      <p className="text-red-600 text-sm">{scannerError}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full max-w-md bg-gray-200 rounded-lg overflow-hidden relative mb-6">
                    {isScannerOpen ? (
                      <div className="relative">
                        <QrReader
                          onResult={handleScanResult}
                          onError={handleScannerError}
                          constraints={{ facingMode: "environment" }}
                          scanDelay={500}
                          style={{ width: "100%" }}
                        />
                        <div className="absolute inset-0 border-2 border-white pointer-events-none">
                          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blue-500"></div>
                          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-blue-500"></div>
                          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-blue-500"></div>
                          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-blue-500"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-16 bg-gray-100">
                        <QrCode className="w-24 h-24 text-gray-400 mb-4" />
                        <p className="text-gray-500 text-center">
                          Click "Start Scanner" to begin scanning QR codes
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsScannerOpen((prev) => !prev)}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                        isScannerOpen
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {isScannerOpen ? (
                        <>
                          <XCircle className="w-5 h-5 inline mr-2" />
                          Stop Scanner
                        </>
                      ) : (
                        <>
                          <QrCode className="w-5 h-5 inline mr-2" />
                          Start Scanner
                        </>
                      )}
                    </button>

                    {scannerError && (
                      <button
                        onClick={() => setScannerError(null)}
                        className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        Clear Error
                      </button>
                    )}
                  </div>
                </div>

                {/* Instructions */}
                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    Scanning Instructions
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mt-0.5 mr-2 text-blue-600" />
                      Ensure good lighting for best scanning results
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mt-0.5 mr-2 text-blue-600" />
                      Hold the QR code steady within the scanner frame
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mt-0.5 mr-2 text-blue-600" />
                      The scanner will automatically detect and process QR codes
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mt-0.5 mr-2 text-blue-600" />
                      Patient report will open automatically when QR code is recognized
                    </li>
                  </ul>
                  
                  <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">
                      Test QR Code
                    </h4>
                    <p className="text-xs text-blue-700 mb-2">
                      For testing purposes, scan this code: 
                    </p>
                    <code className="text-xs bg-blue-100 px-2 py-1 rounded text-blue-800">
                      user_30PPJDp4cUoAH1sXoYTCdaSpyWM
                    </code>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Patient Report View */}
          {activeTab === "patient-report" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setActiveTab("scan-qr")}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Scanner
                  </button>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Patient Report
                  </h1>
                </div>
                {patientReport && (
                  <div className="flex space-x-2">
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </button>
                    <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </div>
                )}
              </div>

              {isLoadingReport && (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading patient report...</p>
                </div>
              )}

              {reportError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-center">
                    <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-red-800">
                        Error Loading Report
                      </h3>
                      <p className="text-red-600 mt-1">{reportError}</p>
                    </div>
                  </div>
                </div>
              )}

              {patientData && patientReport && !isLoadingReport && (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Report Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">
                          {patientReport.reportTitle}
                        </h2>
                        <div className="flex items-center space-x-4 text-blue-100">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {new Date(patientReport.reportDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {patientReport.doctorName}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          patientReport.status === "pending"
                            ? "bg-yellow-500 text-white"
                            : patientReport.status === "completed"
                            ? "bg-green-500 text-white"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {patientReport.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Patient Information */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
                        Patient Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <label className="text-sm font-medium text-gray-600">
                            Full Name
                          </label>
                          <p className="text-lg font-semibold text-gray-900 mt-1">
                            {patientData.name}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <label className="text-sm font-medium text-gray-600">
                            Age
                          </label>
                          <p className="text-lg font-semibold text-gray-900 mt-1">
                            {patientData.age} years
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <label className="text-sm font-medium text-gray-600">
                            Phone Number
                          </label>
                          <p className="text-lg font-semibold text-gray-900 mt-1">
                            {patientData.phoneNumber}
                          </p>
                        </div>
                        {patientData.gender && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="text-sm font-medium text-gray-600">
                              Gender
                            </label>
                            <p className="text-lg font-semibold text-gray-900 mt-1">
                              {patientData.gender}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Vital Signs */}
                    {(patientReport.bloodPressure || patientReport.heartRate || patientReport.temperature || patientReport.weight || patientReport.height) && (
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
                          Vital Signs
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                          {patientReport.bloodPressure && (
                            <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
                              <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                              <label className="text-sm font-medium text-red-600">
                                Blood Pressure
                              </label>
                              <p className="text-lg font-bold text-red-700 mt-1">
                                {patientReport.bloodPressure}
                              </p>
                            </div>
                          )}
                          {patientReport.heartRate && (
                            <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg text-center">
                              <Activity className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                              <label className="text-sm font-medium text-pink-600">
                                Heart Rate
                              </label>
                              <p className="text-lg font-bold text-pink-700 mt-1">
                                {patientReport.heartRate} bpm
                              </p>
                            </div>
                          )}
                          {patientReport.temperature && (
                            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-center">
                              <Thermometer className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                              <label className="text-sm font-medium text-orange-600">
                                Temperature
                              </label>
                              <p className="text-lg font-bold text-orange-700 mt-1">
                                {patientReport.temperature}°F
                              </p>
                            </div>
                          )}
                          {patientReport.weight && (
                            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                              <User className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                              <label className="text-sm font-medium text-blue-600">
                                Weight
                              </label>
                              <p className="text-lg font-bold text-blue-700 mt-1">
                                {patientReport.weight} kg
                              </p>
                            </div>
                          )}
                          {patientReport.height && (
                            <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                              <User className="w-8 h-8 text-green-600 mx-auto mb-2" />
                              <label className="text-sm font-medium text-green-600">
                                Height
                              </label>
                              <p className="text-lg font-bold text-green-700 mt-1">
                                {patientReport.height} cm
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Notes Section */}
                    {patientReport.notes && (
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
                          Notes
                        </h3>
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <p className="text-gray-800 leading-relaxed">
                            {patientReport.notes}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Follow-up Section */}
                    {patientReport.followUp && (
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
                          Follow-up
                        </h3>
                        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                          <div className="flex items-start">
                            <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                            <p className="text-blue-800 leading-relaxed">
                              {patientReport.followUp}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Associated Image */}
                    {patientReport.imageUrl && (
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
                          Associated Image
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <img
                            src={patientReport.imageUrl}
                            alt="Patient Report"
                            className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Report Category */}
                    <div className="border-t pt-6">
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Category: <strong>{patientReport.category}</strong></span>
                        <span>Report ID: <strong>{patientReport.id}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!patientData && !patientReport && !isLoadingReport && !reportError && (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Report Selected
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Scan a patient QR code to view their report
                  </p>
                  <button
                    onClick={() => setActiveTab("scan-qr")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Go to QR Scanner
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "messages" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No messages yet
                </h3>
                <p className="text-gray-600">
                  Patient messages will appear here
                </p>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Generate Reports
                </h3>
                <p className="text-gray-600">
                  Create patient reports, medical summaries, and analytics
                </p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Doctor Settings
                </h3>
                <p className="text-gray-600">
                  Manage your profile, preferences, and clinic information
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Alert Modal */}
      {alertMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                <div className="flex items-start mb-4">
                    <AlertCircle className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold">Notification</h3>
                        <p className="text-gray-700 mt-2 break-words">{alertMessage}</p>
                    </div>
                </div>
                <button
                    onClick={() => setAlertMessage(null)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    Close
                </button>
            </div>
        </div>
      )}

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Appointment Details</h3>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Patient
                </label>
                <p className="text-gray-900">
                  {selectedAppointment.patientName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Time
                </label>
                <p className="text-gray-900">{selectedAppointment.time}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Type
                </label>
                <p className="text-gray-900">{selectedAppointment.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Symptoms
                </label>
                <p className="text-gray-900">{selectedAppointment.symptoms}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Contact
                </label>
                <p className="text-gray-900">{selectedAppointment.phone}</p>
                <p className="text-gray-900">{selectedAppointment.email}</p>
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() =>
                  handleAppointmentAction(selectedAppointment.id, "confirm")
                }
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Confirm
              </button>
              <button
                onClick={() =>
                  handleAppointmentAction(selectedAppointment.id, "reschedule")
                }
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Patient Detail Modal */}
      {showPatientModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Patient Profile</h3>
              <button
                onClick={() => setShowPatientModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    {selectedPatient.name}
                  </h4>
                  <p className="text-gray-600">
                    {selectedPatient.age} years, {selectedPatient.gender}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <p className="text-gray-900">{selectedPatient.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedPatient.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <p className="text-gray-900">{selectedPatient.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Last Visit
                  </label>
                  <p className="text-gray-900">{selectedPatient.lastVisit}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Condition
                  </label>
                  <p className="text-gray-900">{selectedPatient.condition}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Insurance
                  </label>
                  <p className="text-gray-900">{selectedPatient.insurance}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Emergency Contact
                </label>
                <p className="text-gray-900">
                  {selectedPatient.emergencyContact}
                </p>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Edit Profile
              </button>
              <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                View History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
