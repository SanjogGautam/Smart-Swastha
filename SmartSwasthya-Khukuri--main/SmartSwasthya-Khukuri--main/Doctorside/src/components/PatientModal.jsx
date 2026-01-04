// components/PatientModal.js
import React from "react";
import { XCircle, User } from "lucide-react";

const PatientModal = ({ patient, isOpen, onClose }) => {
  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Patient Profile</h3>
          <button
            onClick={onClose}
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
                {patient.name}
              </h4>
              <p className="text-gray-600">
                {patient.age} years, {patient.gender}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <p className="text-gray-900">{patient.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900">{patient.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Address
              </label>
              <p className="text-gray-900">{patient.address}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Last Visit
              </label>
              <p className="text-gray-900">{patient.lastVisit}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Condition
              </label>
              <p className="text-gray-900">{patient.condition}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Insurance
              </label>
              <p className="text-gray-900">{patient.insurance}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Emergency Contact
            </label>
            <p className="text-gray-900">{patient.emergencyContact}</p>
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
  );
};

export default PatientModal;
