// src/pages/Contact.jsx
import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissionStatus(null); // Reset status

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmissionStatus('error');
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Contact Form Data Submitted:', formData);

    // Simulate API call
    setTimeout(() => {
      setSubmissionStatus('success');
      // Optionally reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      alert('Your message has been sent successfully!');
    }, 1000); // Simulate network delay
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-12">

      {/* Hero Section for Contact Page */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-10 sm:p-16 mb-12 shadow-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          Get in Touch
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed opacity-95 max-w-3xl mx-auto">
          We're here to help you. Feel free to reach out with any questions or inquiries.
        </p>
      </section>

      {/* Contact Details and Form Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Contact Details */}
        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg text-gray-800">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Our Contact Information</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-lg text-gray-700">
                123 Health Lane, Wellness City, <br />
                Kirtipur, Bagmati Province, Nepal
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-lg text-gray-700">
                <a href="tel:+977123456789" className="text-blue-600 hover:underline">+977-1-23456789</a>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-lg text-gray-700">
                <a href="mailto:info@swastha.com" className="text-blue-600 hover:underline">info@swastha.com</a>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Operating Hours</h3>
              <p className="text-lg text-gray-700">
                Monday - Friday: 9:00 AM - 6:00 PM <br />
                Saturday: 9:00 AM - 1:00 PM <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg text-gray-800">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Your Full Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Regarding your inquiry..."
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            {/* Submission Status Message */}
            {submissionStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline ml-2">Your message has been sent. We'll get back to you soon.</span>
              </div>
            )}
            {submissionStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline ml-2">There was an issue sending your message. Please try again.</span>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700
                           transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Find Us on the Map</h2>
        <div className="relative overflow-hidden rounded-xl" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.783011311545!2d85.27599707449557!3d27.69230537618956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e273f7a1b5%3A0x6b40e7a25a8e23b8!2sKirtipur%2C%20Nepal!5e0!3m2!1sen!2snp!4v1716616800000!5m2!1sen!2snp" // Replace with your actual Google Maps embed URL
            width="100%"
            height="100%"
            style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Location on Google Maps"
          ></iframe>
        </div>
        <p className="text-center text-gray-600 mt-6 text-md">
          Visit us during our operating hours or use the map to find our clinic.
        </p>
      </section>

    </div>
  );
}

export default Contact;