import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaComments, FaUsers, FaChartLine } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      title: "AI Resume Analysis",
      description:
        "Get personalized insights on your CV using AI-driven analysis that pinpoints strengths, weaknesses, and optimizes it for your dream job.",
      icon: <FaRobot className="text-[#0077b6] text-4xl" />,
      features: [
        "Skills gap analysis",
        "ATS compatibility check",
        "Tailored keyword suggestions",
        "Industry optimization",
      ],
    },
    {
      title: "Interview Simulator",
      description:
        "Ace your interviews with our adaptive AI simulator offering role-specific practice, real-time feedback, and performance tracking.",
      icon: <FaComments className="text-[#0077b6] text-4xl" />,
      features: [
        "Job-specific Q&A",
        "Voice & text analysis",
        "Body language detection",
        "AI-powered scoring",
      ],
    },
    {
      title: "Career Circles",
      description:
        "Network with top professionals and coaches in AI-powered career hubs designed for collaboration and growth.",
      icon: <FaUsers className="text-[#0077b6] text-4xl" />,
      features: [
        "Live discussions",
        "Expert Q&A sessions",
        "Resource library",
        "Industry networking",
      ],
    },
    {
      title: "Application Tracker",
      description:
        "Stay ahead by organizing, tracking, and analyzing all your job applications with AI-powered insights.",
      icon: <FaChartLine className="text-[#0077b6] text-4xl" />,
      features: [
        "Smart reminders",
        "Company insights",
        "Progress analytics",
        "Dashboard visualization",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="relative min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] py-20 px-4 lg:px-14"
    >
      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,119,182,0.07),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#0077b6] to-[#00b4d8]">
            AI-Powered Career Services
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Harness artificial intelligence and expert guidance to gain the
            ultimate edge in your career.
          </p>
        </motion.div>

        {/* Services Grid (2x2 with Equal Heights) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col h-full bg-white/90 backdrop-blur-lg border border-[#0077b6]/20 rounded-2xl p-8 shadow-md hover:shadow-xl hover:border-[#00b4d8]/50 transition-all duration-300"
            >
              <div className="flex items-center mb-5">
                {service.icon}
                <h3 className="text-2xl font-bold text-gray-800 ml-4">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4 flex-grow">
                {service.description}
              </p>
              <ul className="space-y-2 text-gray-700 flex-grow">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-[#00b4d8] rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-5 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:from-[#00b4d8] hover:to-[#0077b6] text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300">
                Learn More →
              </button>
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <h3 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Unlock Your Career Potential?
          </h3>
          <button className="bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:from-[#00b4d8] hover:to-[#0077b6] text-white font-bold px-10 py-4 rounded-full text-xl shadow-lg transition-transform hover:scale-110">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
