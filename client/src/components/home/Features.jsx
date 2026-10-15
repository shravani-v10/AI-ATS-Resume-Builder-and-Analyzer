import React from "react";

const Features = () => {
  const features = [
    {
      title: "🤖 AI Resume Analysis",
      description: "Get personalized AI-powered feedback to improve your resume's quality, readability, and recruiter appeal.",
      hasAccent: false,
    },
    {
      
      title: "📊 ATS Compatibility Score",
      description: "Instantly evaluate your resume's ATS performance with a detailed score and expert recommendations.",
      hasAccent: true,
    },
    {
      title: "🎯 Keyword Optimization",
      description: "Match your resume with job descriptions by identifying and adding high-impact keywords.",
      hasAccent: false,
    },
    {
      title: "✍️ AI Resume Builder",
      description: "Design professional ATS-friendly resumes in minutes with customizable templates and AI-generated content",
      hasAccent: false,
    },
    {
      title: "📝 Grammar & Content Review",
      description: "Eliminate grammar mistakes, improve writing quality, and create compelling resume content effortlessly.",
      hasAccent: false,
    },
    {
      title: "🌐 Live Resume Link",
      description: "Generate a unique online resume URL and share your professional profile instantly with recruiters.",
      hasAccent: false,
    },
    {
      title: "📄 PDF Export",
      description: "Export your resume as a beautifully formatted, ATS-optimized PDF ready for every job application.",
      hasAccent: false,
    },
    {
      title: "🔒 Secure Resume Storage",
      description: "Keep all your resumes safely stored in one place with secure access whenever you need them.",
      hasAccent: false,
    },
  ];

return (
  <div
    id="features"
    className="flex flex-col items-center my-10 scroll-mt-12"
  >
    <style>
      {`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

        * {
          font-family: "Poppins", sans-serif;
        }
      `}
    </style>

    <div className="bg-white px-8 lg:px-20 xl:px-[120px] py-20 flex flex-col items-center">
      <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl w-full mb-9">
        <h1 className="text-2xl md:text-3xl font-medium text-zinc-800 mb-4 tracking-tight">
          Powerful Features
        </h1>

        <p className="text-sm text-zinc-800 tracking-tight max-w-xl">
          From AI-powered analysis to seamless resume building, explore features designed to help you get noticed.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl w-full border-t border-l border-zinc-200">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`relative p-6 md:p-6 flex flex-col gap-4 border-r border-b border-zinc-200 transition-all duration-300 cursor-pointer ${
              index === 0
                ? "bg-gradient-to-b from-white to-[#EEF0FF]"
                : "bg-white hover:bg-gradient-to-b hover:from-white hover:to-[#EEF0FF]"
            }`}
          >
            {feature.hasAccent && (
              <div className="absolute left-0 top-12 bottom-12 md:top-17 md:bottom-17 w-1.5 bg-indigo-500 rounded-r" />
            )}

            <div className="flex items-center gap-2.5 mb-1">
              {feature.icon}

              <h3 className="text-sm font-medium text-zinc-800 leading-snug">
                {feature.title}
              </h3>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed mb-4">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}; 
export default Features;