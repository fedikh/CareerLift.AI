import React from "react";
import Logo from "/src/assets/images/CLLOGO.png";

const About = () => {
  return (
    <div
      id="about"
      className="min-h-screen bg-gradient-to-b from-black to-[#001a33] flex items-center justify-center py-20"
    >
      {/* Main Content */}
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Logo Section */}
          <div className="w-full md:w-2/5 flex justify-center">
            <img
              src={Logo}
              alt="Company Logo"
              className="max-w-xs md:max-w-md animate-fade-in hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-3/5 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#004080] via-[#006699] to-[#004080] drop-shadow-lg mb-6">
              Empowering Your <span className="text-white ">Career Journey</span>
            </h2>
            <p className="text-white text-lg md:text-xl mb-6 MB-1leading-relaxed">
              At CareerLaunch, we're revolutionizing the job search process with
              cutting-edge AI technology. Our platform provides comprehensive
              tools for CV optimization, interview preparation, and personalized
              career guidance to help you stand out in today's competitive
              market.
            </p>
            <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
              Founded by career experts and tech innovators, we combine human
              insight with machine learning to deliver results that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-gradient-to-r from-[#004080] to-[#006699] hover:from-[#006699] hover:to-[#004080] text-white font-bold px-8 py-3 rounded-full text-lg shadow-lg shadow-[#004080]/40 hover:scale-105 transition-all duration-300">
                Our Mission →
              </button>
              <button className="border-2 border-[#006699] text-white hover:bg-[#006699]/20 font-bold px-8 py-3 rounded-full text-lg shadow-lg shadow-[#004080]/20 hover:scale-105 transition-all duration-300">
                Get Started 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
