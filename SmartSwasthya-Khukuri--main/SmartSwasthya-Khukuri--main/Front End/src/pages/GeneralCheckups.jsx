// Frontend/src/pages/GeneralCheckups.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function GeneralCheckups() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-10 sm:p-16 mb-12 shadow-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          General Check-ups
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed opacity-95 max-w-3xl mx-auto">
          Regular health assessments are vital for maintaining your well-being and detecting potential issues early.
        </p>
      </section>

      <section className="bg-white p-8 sm:p-12 rounded-xl shadow-lg mb-12 text-gray-800">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">What to Expect</h2>
        <p className="text-lg leading-relaxed mb-4">
          Our general check-up service includes a comprehensive physical examination, vital signs measurement, and a review of your medical history. We focus on preventive care and personalized health advice.
        </p>
        <ul className="list-disc list-inside text-lg space-y-2 text-gray-700 ml-4">
          <li>Full physical examination</li>
          <li>Blood pressure and vital signs check</li>
          <li>Cholesterol and blood sugar screening (if needed)</li>
          <li>Discussion of lifestyle and health goals</li>
          <li>Referrals to specialists if necessary</li>
        </ul>
      </section>

      <section className="bg-blue-50 p-8 sm:p-12 rounded-xl shadow-lg mb-12 text-gray-800 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Benefits of Regular Check-ups</h2>
        <p className="text-lg leading-relaxed mb-4">
          Regular check-ups help in:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Early Detection</h3>
            <p className="text-gray-700 text-sm">Catching health problems before they become serious.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Preventive Advice</h3>
            <p className="text-gray-700 text-sm">Receiving guidance on healthy habits and risk reduction.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Care</h3>
            <p className="text-gray-700 text-sm">Building a relationship with your doctor for tailored health plans.</p>
          </div>
        </div>
      </section>

      <section className="text-center mt-12">
        <Link
          to="/appointment"
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700
                     transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Book a General Check-up
        </Link>
      </section>
    </div>
  );
}

export default GeneralCheckups;