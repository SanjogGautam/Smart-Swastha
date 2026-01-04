// components/AppointmentModal.js
import React from "react";
import { XCircle } from "lucide-react";

const AppointmentModal = ({ appointment, onClose, onAppointmentAction }) => {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Appointment Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Patient</label>
            <p className="text-gray-900">{appointment.patientName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Time</label>
            <p className="text-gray-900">{appointment.time}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Type</label>
            <p className="text-gray-900">{appointment.type}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Symptoms
            </label>
            <p className="text-gray-900">{appointment.symptoms}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Contact</label>
            <p className="text-gray-900">{appointment.phone}</p>
            <p className="text-gray-900">{appointment.email}</p>
          </div>
        </div>
        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => onAppointmentAction(appointment.id, "confirm")}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Confirm
          </button>
          <button
            onClick={() => onAppointmentAction(appointment.id, "reschedule")}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
