import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaComments, FaUsers, FaChartLine } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      title: "AI Resume Analysis",
      description:
        "Unlock tailored insights for your CV with advanced AI. Identify strengths, address weaknesses, and optimize your resume to capture your ideal opportunity.",
      icon: <FaRobot className="text-white text-4xl" />,
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      features: [
        "Comprehensive skills gap analysis",
        "ATS & recruiter compatibility check",
        "AI-driven keyword recommendations",
        "Industry-focused enhancements",
      ],
    },
    {
      title: "Interview Simulator",
      description:
        "Practice with intelligent simulations powered by AI. Experience role-specific mock interviews, receive immediate feedback, and monitor your progress over time.",
      icon: <FaComments className="text-white text-4xl" />,
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      features: [
        "Dynamic job-specific Q&A",
        "Real-time voice & text analytics",
        "Body language and response evaluation",
        "Automated performance scoring",
      ],
    },
    {
      title: "Career Circles",
      description:
        "Connect and collaborate in AI-guided career hubs. Access exclusive discussions, expert mentoring, and expand your professional network for accelerated growth.",
      icon: <FaUsers className="text-white text-4xl" />,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      features: [
        "Live interactive sessions",
        "Expert-led Q&A and guidance",
        "Curated resource library",
        "Industry networking opportunities",
      ],
    },
    {
      title: "Application Tracker",
      description:
        "Organize, monitor, and analyze your job applications using intelligent tracking. Get strategic reminders and actionable insights to advance your search.",
      icon: <FaChartLine className="text-white text-4xl" />,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      features: [
        "Automated smart reminders",
        "Company and role analytics",
        "Progress visualization",
        "Insightful dashboard tracking",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 py-20"
    >
      {/* Full Width Container */}
      <div className="w-full px-4 lg:px-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#004080] to-[#006699] mb-6">
            AI-Powered Career Services
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Experience next-generation career tools powered by artificial
            intelligence. Get expert guidance, actionable insights, and
            personalized support to advance your professional journey.
          </p>
        </motion.div>

        {/* Services Grid - Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group h-full"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full border border-[#0077b6]/10 hover:border-[#00b4d8]/30">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  {/* Icon overlay */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] rounded-2xl flex items-center justify-center shadow-lg">
                    {service.icon}
                  </div>
                </div>

                <div className="p-8">
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#0077b6] transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center text-gray-700"
                      >
                        <div className="w-3 h-3 bg-gradient-to-r from-[#004080] to-[#006699] rounded-full mr-4 shadow-sm"></div>
                        <span className="text-sm font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button className="w-full bg-gradient-to-r from-[#004080] to-[#006699] text-white font-semibold py-4 px-6 rounded-2xl hover:shadow-xl hover:shadow-[#0077b6]/25 transition-all duration-300 transform hover:scale-105">
                    Learn More →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gradient-to-r from-[#004080] to-[#006699] rounded-3xl p-12 text-white shadow-2xl"
        >
          <h3 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Unlock Your Career Potential?
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who are transforming their careers
            with AI-powered insights and personalized guidance.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#0077b6] font-bold px-12 py-4 rounded-2xl text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg"
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
