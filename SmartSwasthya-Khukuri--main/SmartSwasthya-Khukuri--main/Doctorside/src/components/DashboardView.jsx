// components/DashboardView.js
import React from "react";
import { Calendar, Users, Clock, Heart, QrCode } from "lucide-react";
import StatCard from "./StatCard";

const DashboardView = ({ appointments, setActiveTab }) => {
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, Dr. Smith. Here's your daily overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Calendar}
          title="Today's Appointments"
          value="12"
          color="blue"
          trend="+8% from yesterday"
        />
        <StatCard
          icon={Users}
          title="Total Patients"
          value="156"
          color="green"
          trend="+12% this month"
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
          trend="+15% efficiency"
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
              <span className="text-blue-600 font-medium">12 appointments</span>
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
            {appointments.slice(0, 3).map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-900">{apt.patientName}</p>
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
  );
};

export default DashboardView;
