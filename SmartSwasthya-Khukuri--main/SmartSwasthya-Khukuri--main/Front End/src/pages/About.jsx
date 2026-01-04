// src/pages/About.jsx
import React from 'react';

function About() {
  // Placeholder data for team members
  const teamMembers = [
    {
      name: "Sanjog Gautam",
      title: "Front End Developer",
      image: "https://scontent.fktm10-1.fna.fbcdn.net/v/t39.30808-6/325625554_3267839993545850_7574233577202475193_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=0vd3lwF3NGoQ7kNvwGHk-pU&_nc_oc=AdmBuHyljOKG1YfwG8mUeOtz9PPpi2slt6S5CUKrehhF1PFKAn-MQZWezcqlVjKq-qA&_nc_zt=23&_nc_ht=scontent.fktm10-1.fna&_nc_gid=xtgp-zbAdQenkhjsVixp-w&oh=00_AfQl3ltZeunx3c_OTNUZPm-szBcQJ9YWDewgGtIFmxw07Q&oe=688A8489",
      description: "Just a passionate front-end developer who loves creating beautiful and user-friendly interfaces. Enjoys working with React and Tailwind CSS to build responsive web applications."
    },
    {
      name: "Khewang Theeng Tamang",
      title: "Backend Developer",
      image: "https://scontent.fktm10-1.fna.fbcdn.net/v/t39.30808-6/476632913_1174122704267943_3407514313557583361_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Jls8NaHgJDUQ7kNvwFTNdPu&_nc_oc=AdnvlUefsetd2pWjpXlmWNII5UNCWbG6MbN5MhuC0Ry_Pb_qj3D_NedIgp9_zRGMocI&_nc_zt=23&_nc_ht=scontent.fktm10-1.fna&_nc_gid=iT7ZqlvHzAhTt2B5_KQcoA&oh=00_AfTjNtxJZobNt600KMcekAu3XJRkpeLh5kxXk9_ysKRdzg&oe=688A756B",
      description: "Backend developer with a passion for creating efficient and scalable server-side applications. Loves solving complex problems and optimizing performance."
    },
    {
      name: "Aswin Phuyal",
      title: "Full Stack Developer",
      image: "https://scontent.fktm10-1.fna.fbcdn.net/v/t1.6435-9/129495710_861275507979812_745740662732737043_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=aHpFQrLBZCUQ7kNvwEwr85j&_nc_oc=AdkXekEBfMMQqC_Bno42IVhR77zTjvHQxjBjWuQZ-WI-UfOAYLP40-mGUKlkt7uR4DQ&_nc_zt=23&_nc_ht=scontent.fktm10-1.fna&_nc_gid=pA47iknEXgBwNBzVWWlgTA&oh=00_AfSqiY3evDTBDq7OQ6jOmyCok74bJPLhQKIn2_sI8PyEYw&oe=68AC22DA",
      description: "Full stack developer with passionate who has helped throughout the project and contributed sleepless night to do so."
    },
     {
      name: "Robin Man Shrestha",
      title: "Reseacher",
      image: "https://scontent.fktm10-1.fna.fbcdn.net/v/t39.30808-6/387798220_3613280258917128_6651242293864789459_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=64TEsj-Fg48Q7kNvwFJkfuW&_nc_oc=AdmVughcMPc6s79kgtX-CXO0rrxiW20yjVFLqRvYP82rCQq3rnQiaoRR6i9l9EfoXrc&_nc_zt=23&_nc_ht=scontent.fktm10-1.fna&_nc_gid=if9_5_F73NAVHp8yK-QDEw&oh=00_AfTm81DeYIUURcAflCWgMseYPIbG8-gZR8e4m8rpGrJD6w&oe=688AA22F",
      description: "Researcher who is the goat."
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-12">

      {/* Hero Section for About Page */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-10 sm:p-16 mb-12 shadow-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          About Swastha: Your Health Partner
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed opacity-95 max-w-3xl mx-auto">
          Dedicated to fostering a healthier community through compassionate care, advanced medical practices, and a patient-first approach.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="bg-white p-8 sm:p-12 rounded-xl shadow-lg mb-12 text-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Our Mission</h2>
        <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto">
          Our mission at Swastha is to provide accessible, high-quality, and holistic healthcare services that empower individuals to achieve optimal health and well-being. We are committed to integrating cutting-edge medical science with empathetic care, ensuring every patient receives personalized attention and effective treatment.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="bg-blue-50 p-8 sm:p-12 rounded-xl shadow-lg mb-12 text-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg bg-white shadow-md transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Compassion</h3>
            <p className="text-gray-600">We treat every patient with empathy, respect, and kindness, understanding their unique needs and concerns.</p>
          </div>
          <div className="p-6 rounded-lg bg-white shadow-md transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Excellence</h3>
            <p className="text-gray-600">We strive for the highest standards in medical care, constantly innovating and improving our services.</p>
          </div>
          <div className="p-6 rounded-lg bg-white shadow-md transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Integrity</h3>
            <p className="text-gray-600">We uphold the strongest ethical principles, ensuring transparency and trust in all our interactions.</p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-white p-8 sm:p-12 rounded-xl shadow-lg mb-12 text-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Meet Our Dedicated Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-200 shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.title}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl p-10 sm:p-16 text-center shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">Why Choose Swastha?</h2>
        <p className="text-lg sm:text-xl leading-relaxed mb-8 opacity-95 max-w-3xl mx-auto">
          Choosing Swastha means opting for a healthcare partner who genuinely cares. We offer:
        </p>
        <ul className="list-disc list-inside text-left mx-auto max-w-md space-y-3 text-lg opacity-90">
          <li>Personalized Treatment Plans tailored to your unique health needs.</li>
          <li>Access to a Network of Top Specialists and comprehensive services under one roof.</li>
          <li>A Focus on Preventive Care to keep you healthy long-term.</li>
          <li>Cutting-Edge Technology ensuring accurate diagnostics and effective treatments.</li>
          <li>Seamless Patient Experience from booking to recovery.</li>
        </ul>
      </section>

    </div>
  );
}

export default About;