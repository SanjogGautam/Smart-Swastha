// Frontend/src/pages/PreventiveCare.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PreventiveCare() {
  const [expandedDisease, setExpandedDisease] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const diseases = [
    {
      id: 'dengue',
      name: "Dengue",
      icon: "🦟",
      severity: "High",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      causes: "Dengue fever is a mosquito-borne illness caused by any one of four types of dengue viruses. You can't get dengue fever from being around an infected person. Instead, dengue fever is spread through mosquito bites.",
      symptoms: [
        "High fever around 104°F (40°C)",
        "Headache",
        "Muscle, bone or joint pain",
        "Nausea, vomiting",
        "Pain behind the eyes",
        "Swollen glands, Rash"
      ],
      riskFactors: "You have a greater risk of developing dengue fever or a more severe form of the disease if you have had dengue fever in the past. Previous infection with a dengue fever virus increases your risk of severe symptoms if you get dengue fever again.",
      prevention: [
        "Stay in well-screened housing. The mosquitoes that carry the dengue viruses are most active from dawn to dusk, but they can also bite at night.",
        "Wear protective clothing. When you go into mosquito-infested areas, wear a long-sleeved shirt, long pants, socks and shoes.",
        "Use mosquito repellent. Permethrin can be applied to your clothing, shoes, camping gear and bed netting. For your skin, use a repellent containing at least a 10% concentration of DEET.",
        "Reduce mosquito habitat. The mosquitoes that carry the dengue virus typically live in and around houses, breeding in standing water that can collect in such things as used automobile tires."
      ]
    },
    {
      id: 'mpox',
      name: "MonkeyPox (MPox)",
      icon: "🐵",
      severity: "Medium",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      causes: "Mpox (also known as monkeypox) is a disease caused by infection with a virus, known as Monkeypox virus (MPV). This virus is part of the same family as the virus that causes smallpox.",
      symptoms: [
        "Fever",
        "Skin rash",
        "Swollen lymph nodes",
        "Muscle aches and backaches",
        "Headache and chills",
        "Tiredness, fatigue"
      ],
      riskFactors: "Although cases of mpox are not life-threatening, some people are at higher risk of getting severely ill, including people with severely weakened immune systems, children younger than 1 year, people with a history of eczema, and people who are pregnant.",
      prevention: [
        "Avoid close contact with people who have a rash that looks like Mpox.",
        "Avoid handling clothes, sheets, blankets or other materials that have been in contact with an infected animal or person.",
        "Wash your hands well. Properly wash with soap and water after any contact with an infected person or animal. If soap and water aren't available, use an alcohol-based hand sanitizer.",
        "Avoid animals that may carry the virus."
      ]
    },
    {
      id: 'influenza',
      name: "Influenza",
      icon: "🤧",
      severity: "Medium",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      causes: "Flu, also called influenza, is an infection of the nose, throat and lungs which is caused by a virus. These viruses travel through the air in droplets when someone with the infection coughs, sneezes or talks.",
      symptoms: [
        "Difficulty breathing or shortness of breath",
        "Chest pain",
        "Ongoing dizziness",
        "Seizures",
        "Severe weakness or muscle pain",
        "Sore throat and dry, persistent cough"
      ],
      riskFactors: "Factors that may raise your risk include weakened immune system, chronic illnesses such as asthma and other lung diseases, diabetes, heart disease, nervous system diseases, pregnancy, and obesity with a BMI of 40 or higher.",
      prevention: [
        "Wash your hands well and often with soap and water for at least 20 seconds. If soap and water aren't available, use an alcohol-based hand sanitizer with at least 60% alcohol.",
        "Avoid touching your face. Keeping your hands away from your eyes, nose and mouth helps keep germs away from those places.",
        "Cover your coughs and sneezes. Cough or sneeze into a tissue or your elbow. Then wash your hands.",
        "Clean surfaces. Regularly clean often-touched surfaces to prevent spread of infection from touching a surface with the virus on it.",
        "Avoid crowds. By avoiding crowds during peak flu season, you lower your chances of infection."
      ]
    },
    {
      id: 'measles',
      name: "Measles",
      icon: "🌡️",
      severity: "High",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      causes: "Measles is a highly contagious disease caused by a virus. It's an airborne disease, which means it spreads through the air when an infected person breathes, coughs, sneezes or talks. It causes severe disease, complications, and even death if not treated on time.",
      symptoms: [
        "Cough and runny nose",
        "Red and watery eyes",
        "Small white spots inside the cheeks",
        "A sore throat",
        "Muscle pain",
        "Sensitivity to light",
        "Rash usually on the face and upper neck"
      ],
      riskFactors: "Risk factors for measles include being unvaccinated, traveling internationally to countries where measles is more common, and having a vitamin A deficiency.",
      prevention: [
        "Vaccination is the best way to prevent measles. If you receive a measles vaccine, you're immune and unlikely ever to get the virus.",
        "The measles vaccine is extremely effective at preventing measles.",
        "There are separate vaccines for both children and adults.",
        "Book an appointment and consult with the doctor and get vaccinated before it's too late."
      ]
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const toggleDisease = (diseaseId) => {
    setExpandedDisease(expandedDisease === diseaseId ? null : diseaseId);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
      {/* Animated Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white rounded-2xl p-10 sm:p-16 mb-12 shadow-2xl text-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white bg-opacity-10 rounded-full animate-pulse delay-1000"></div>
        
        
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-4 animate-fade-in">
            🛡️ Preventive Care Services
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed opacity-95 max-w-3xl mx-auto animate-slide-up">
            Proactive measures to keep you healthy, happy, and reduce the risk of future illnesses.
          </p>
          <div className="mt-8 animate-bounce">
            <span className="text-4xl">⬇️</span>
          </div>
        </div>
      </section>

      {/* Interactive Tabs */}
      <section className="mb-12">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['overview', 'outbreaks', 'prevention'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50'
              }`}
            >
              {tab === 'overview' && '🏥 Overview'}
              {tab === 'outbreaks' && '⚠️ Current Outbreaks'}
              {tab === 'prevention' && '🛡️ Prevention Tips'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white p-8 sm:p-12 rounded-xl shadow-lg text-gray-800 transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-3">
                <span className="text-4xl">🎯</span>
                Our Approach to Prevention
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Preventive care at Swastha goes beyond just treating illness. We focus on empowering you with the knowledge and tools to lead a healthy lifestyle, prevent diseases, and improve your overall quality of life.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "🧬 Personalized wellness plans",
                  "💉 Vaccinations and immunizations", 
                  "📊 Chronic disease management and education",
                  "🥗 Nutritional counseling",
                  "🧘 Stress management techniques",
                  "🔬 Early screening tests (e.g., blood tests, mammograms)"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 sm:p-12 rounded-xl shadow-lg text-gray-800">
              <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">💪 Why Preventive Care Matters</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: "🎯", title: "Reduce Health Risks", desc: "Minimize the chances of developing serious health conditions." },
                  { icon: "✨", title: "Improve Quality of Life", desc: "Live a healthier, more energetic life." },
                  { icon: "💰", title: "Save Costs", desc: "Preventative measures can save significant medical costs long-term." }
                ].map((benefit, idx) => (
                  <div key={idx} className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                    <div className="text-4xl mb-4 text-center">{benefit.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{benefit.title}</h3>
                    <p className="text-gray-700 text-center">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'outbreaks' && (
          <div className="animate-fade-in">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-8 border-red-500 p-8 mb-8 rounded-r-xl shadow-lg">
              <h2 className="text-3xl font-bold text-red-700 mb-4 flex items-center gap-3">
                <span className="animate-pulse">⚠️</span>
                Recent Outbreaks - Stay Informed & Protected
              </h2>
              <p className="text-lg text-red-800 leading-relaxed">
                Knowledge is your first line of defense. Learn about recent disease outbreaks, their symptoms, and most importantly, how to protect yourself and your loved ones.
              </p>
            </div>

            <div className="space-y-6">
              {diseases.map((disease, index) => (
                <div key={disease.id} className={`${disease.bgColor} ${disease.borderColor} border-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 overflow-hidden`}>
                  <div 
                    className={`bg-gradient-to-r ${disease.color} text-white p-6 cursor-pointer hover:opacity-90 transition-opacity duration-200`}
                    onClick={() => toggleDisease(disease.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl animate-bounce">{disease.icon}</span>
                        <div>
                          <h3 className="text-2xl font-bold">{disease.name}</h3>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(disease.severity)}`}>
                            Severity: {disease.severity}
                          </span>
                        </div>
                      </div>
                      <div className={`transform transition-transform duration-300 ${expandedDisease === disease.id ? 'rotate-180' : ''}`}>
                        <span className="text-2xl">⬇️</span>
                      </div>
                    </div>
                  </div>
                  
                  {expandedDisease === disease.id && (
                    <div className="p-6 space-y-6 animate-slide-down">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              🔬 Causes:
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed">{disease.causes}</p>
                          </div>

                          <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              🌡️ Key Symptoms:
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {disease.symptoms.map((symptom, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                                  <span className="text-red-500">•</span>
                                  <span className="text-gray-700">{symptom}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              ⚡ Risk Factors:
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed">{disease.riskFactors}</p>
                          </div>

                          <div className="bg-green-100 p-4 rounded-lg shadow-md border-2 border-green-300">
                            <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                              🛡️ Prevention Measures:
                            </h4>
                            <div className="space-y-2">
                              {disease.prevention.map((measure, idx) => (
                                <div key={idx} className="flex items-start gap-2 p-2 bg-white rounded text-sm hover:bg-gray-50 transition-colors duration-200">
                                  <span className="text-green-600 font-bold mt-1">✓</span>
                                  <span className="text-gray-700">{measure}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'prevention' && (
          <div className="animate-fade-in space-y-8">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-center">🛡️ Universal Prevention Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: "🧼", title: "Hand Hygiene", tip: "Wash hands frequently with soap for at least 20 seconds" },
                  { icon: "😷", title: "Wear Masks", tip: "Use masks in crowded or high-risk areas" },
                  { icon: "💉", title: "Stay Vaccinated", tip: "Keep up with recommended vaccinations" },
                  { icon: "🏃", title: "Stay Active", tip: "Regular exercise boosts immune system" },
                  { icon: "🥗", title: "Eat Healthy", tip: "Balanced diet supports overall health" },
                  { icon: "😴", title: "Get Rest", tip: "Adequate sleep strengthens immunity" }
                ].map((tip, idx) => (
                  <div key={idx} className="bg-white bg-opacity-20 p-4 rounded-lg hover:bg-opacity-30 transition-all duration-300 text-black">
                    <div className="text-3xl mb-2">{tip.icon}</div>
                    <h3 className="font-semibold mb-2">{tip.title}</h3>
                    <p className="text-sm opacity-90">{tip.tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Emergency Contact Section with Pulse Animation */}
      <section className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-8 rounded-xl shadow-lg mb-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600 opacity-20 animate-pulse"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <span className="animate-bounce">🚨</span>
            When to Seek Immediate Medical Attention
          </h2>
          <p className="text-lg mb-6 leading-relaxed max-w-3xl mx-auto">
            If you experience any symptoms mentioned above, especially fever, rash, or difficulty breathing, don't wait. Early detection and treatment are crucial for your recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/appointment"
              className="bg-white text-red-600 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              🏥 Book Emergency Consultation
            </Link>
            <div className="flex items-center gap-2 bg-red-600 bg-opacity-50 px-4 py-2 rounded-full">
              <span className="animate-pulse text-yellow-300">📞</span>
              <span className="font-semibold">24/7 Hotline: 1-800-SWASTHA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action with Floating Animation */}
      <section className="text-center">
        <div className="transform hover:scale-105 transition-transform duration-300">
          <Link
            to="/appointment"
            className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-12 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="flex items-center gap-3">
              <span className="animate-pulse">📅</span>
              Schedule a Preventive Consultation
            </span>
          </Link>
        </div>
        <p className="mt-4 text-gray-600 animate-fade-in">Take the first step towards a healthier future today!</p>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animate-slide-down {
          animation: slide-down 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default PreventiveCare;