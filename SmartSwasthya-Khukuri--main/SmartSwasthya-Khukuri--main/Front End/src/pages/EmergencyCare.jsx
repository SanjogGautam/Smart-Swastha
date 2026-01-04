// Frontend/src/pages/EmergencyCare.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function EmergencyCare() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl p-10 sm:p-16 mb-12 shadow-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          Emergency Care Services
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed opacity-95 max-w-3xl mx-auto">
          Immediate and critical medical attention when every second counts.
        </p>
      </section>

      <section className="bg-white p-8 sm:p-12 rounded-xl shadow-lg mb-12 text-gray-800">
        <h2 className="text-3xl font-bold text-red-700 mb-6">When to Seek Emergency Care</h2>
        <p className="text-lg leading-relaxed mb-4">
          Our emergency care unit is equipped to handle a wide range of urgent medical conditions. If you or someone you know is experiencing a life-threatening situation, please call emergency services immediately or proceed to the nearest emergency room.
        </p>
        <ul className="list-disc list-inside text-lg space-y-2 text-gray-700 ml-4">
          <li>Severe bleeding or trauma</li>
          <li>Chest pain or symptoms of a heart attack</li>
          <li>Stroke symptoms (FAST: Face drooping, Arm weakness, Speech difficulty, Time to call)</li>
          <li>Severe allergic reactions</li>
          <li>Loss of consciousness</li>
          <li>Difficulty breathing</li>
          <li>Poisoning or overdose</li>
        </ul>
        <p className="text-lg leading-relaxed mt-4 font-semibold text-red-600">
          For immediate life-threatening emergencies, please dial your local emergency number (e.g., 100 or 102 in Nepal) or go to the nearest hospital.
        </p>
      </section>

      <section className="bg-red-50 p-8 sm:p-12 rounded-xl shadow-lg mb-12 text-gray-800 text-center">
        <h2 className="text-3xl font-bold text-red-700 mb-6">Our Emergency Team</h2>
        <p className="text-lg leading-relaxed mb-4">
          Our dedicated team of emergency physicians, nurses, and support staff are trained to provide rapid and effective care during critical situations. We utilize advanced diagnostic tools and life-saving equipment to ensure the best possible outcomes.
        </p>
      </section>

      <section className="text-center mt-12">
        <p className="text-lg text-gray-700 mb-4">
          For non-life-threatening urgent conditions that require prompt attention but are not critical, you may book an urgent appointment or contact us.
        </p>
        <Link
          to="/appointment"
          className="bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700
                     transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Book an Urgent Consultation (Non-Emergency)
        </Link>
      </section>
    </div>
  );
}

export default EmergencyCare;