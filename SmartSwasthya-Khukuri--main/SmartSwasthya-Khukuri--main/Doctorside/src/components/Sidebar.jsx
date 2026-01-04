// components/Sidebar.js
import React from "react";
import {
  Activity,
  Calendar,
  Users,
  QrCode,
  MessageSquare,
  FileText,
  Settings,
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, setIsScannerOpen }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "patients", label: "Patients", icon: Users },
    { id: "scan-qr", label: "Scan QR Code", icon: QrCode },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleMenuClick = (itemId) => {
    setActiveTab(itemId);
    if (itemId === "scan-qr") {
      setIsScannerOpen(true);
    } else {
      setIsScannerOpen(false);
    }
  };

  return (
    <aside className="w-64 bg-white shadow-lg h-screen sticky top-16">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleMenuClick(item.id)}
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
  );
};

export default Sidebar;
