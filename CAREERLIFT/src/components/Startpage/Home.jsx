import React from "react";
import bankingVideo from "/videos/bgvideo.mp4";

const Home = () => {
  return (
    <div
      id="home"
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={bankingVideo} type="video/mp4" />
      </video>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#004080] via-[#006699] to-[#004080] drop-shadow-lg tracking-wide mb-6">
          Career Success{" "}
          <span className="text-black animate-pulse">Made Easy</span>
        </h1>
        <p className="text-black text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Boost your job search with{" "}
          <span className="text-[#004080] font-semibold">AI-powered</span> tools
          for CV analysis,
          <br />
          interview practice, and career guidance.
        </p>
        <button className="bg-gradient-to-r from-[#004080] to-[#006699] hover:bg-[#4D4D4D] text-white font-bold px-10 py-4 rounded-full text-xl shadow-lg shadow-[#004080]/40 hover:scale-105 transition-all duration-300">
          Get Started →
        </button>
      </div>
    </div>
  );
};

export default Home;
