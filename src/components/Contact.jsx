import React, { useState } from "react";
import { Linkedin, Github, Mail } from "lucide-react";

const ContactSection = () => {
  const [activeTab, setActiveTab] = useState(null);

  // Configuration for the different sections
  const sections = {
    linkedin: {
      id: "linkedin",
      label: "Let's connect!",
      color: "text-blue-500",
      bgColor: "bg-blue-500",
      borderColor: "border-blue-500",
      highlightPart: "linkedin", // which part of the email to highlight
    },
    github: {
      id: "github",
      label: "See my code!",
      color: "text-zinc-500",
      bgColor: "bg-zinc-500",
      borderColor: "border-zinc-500",
      highlightPart: "github",
    },
    mail: {
      id: "mail",
      label: "Say hello!",
      color: "text-orange-500",
      bgColor: "bg-orange-500",
      borderColor: "border-orange-500",
      highlightPart: "mail",
    },
  };

  const currentSection = activeTab ? sections[activeTab] : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]  p-8 font-sans">
      <div className="relative group ">
        {/* Floating Label (Animated Text) */}
        <div
          className={`absolute -top-12 left-0 transition-all duration-300 ease-out transform pointer-events-none
            ${activeTab ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}
          `}
          style={{
            fontFamily: '"Caveat", "Brush Script MT", cursive',
            fontSize: "1.8rem",
            transform: activeTab ? "rotate(-12deg)" : "rotate(0deg)",
          }}
        >
          <span className={currentSection?.color}>{currentSection?.label}</span>
        </div>

        {/* Main Pill Address Bar */}
        <div className="bg-white px-8 py-5 rounded-[2rem] shadow-xl shadow-zinc-200/50 flex items-center justify-center min-w-[320px] border border-zinc-100 relative z-10">
          <div className="text-2xl font-medium tracking-tight flex whitespace-nowrap">
            {/* Part 1: hello (linked to Mail) */}

            <span
              className={`transition-colors duration-300 ${activeTab === "mail" ? "text-orange-500" : activeTab === "github" ? "text-black uppercase" : activeTab === "linkedin" ? "text-blue-500" : "text-zinc-400"}`}
            >
              v
            </span>
            <span
              className={`transition-colors duration-300 ${activeTab === "mail" ? "text-orange-500" : activeTab === "github" ? "text-black" : activeTab === "linkedin" ? "text-blue-500" : "text-zinc-400"}`}
            >
              irat
            </span>
            <span
              className={`transition-colors duration-300 ${activeTab === "mail" ? "text-orange-500" : activeTab === "github" ? "text-black uppercase" : activeTab === "linkedin" ? "text-blue-500" : "text-zinc-400"}`}
            >
              g
            </span>
            <span
              className={`transition-colors duration-300 ${activeTab === "mail" ? "text-orange-500" : activeTab === "github" ? "text-black" : activeTab === "linkedin" ? "text-blue-500" : "text-zinc-400"}`}
            >
              upta
            </span>
            <span
              className={`transition-colors duration-300 ${activeTab === "mail" ? "text-orange-500" : activeTab === "linkedin" ? "text-blue-500" : "text-zinc-400"}`}
            >
              70
            </span>
            <span
              className={`transition-colors duration-300 ${activeTab === "mail" ? "text-orange-500" : "text-zinc-400"}`}
            >
              10
            </span>

            {/* Part 2: @ */}
            <span
              className={`transition-colors duration-300 ${activeTab === "mail" ? "text-orange-500" : "text-zinc-400"}`}
            >
              @gmail.
            </span>

            <span
              className={`transition-colors duration-300 ${activeTab === "github" ? "text-zinc-900" : activeTab === "mail" ? "text-orange-500" : "text-zinc-400"}`}
            >
              {activeTab === "github" ? "MCE" : "com"}
            </span>
          </div>
        </div>

        {/* The Connective Dashed Box */}
        <div
          className={`absolute  top-10 ${activeTab === "linkedin" ? "w-30 left-10 " : "w-70 left-1/2 -translate-x-1/2"} h-25 border-2 border-dashed rounded-lg transition-all duration-300 z-0
            ${activeTab ? "opacity-100" : "opacity-0"}
            ${currentSection?.borderColor}
          `}
        />
      </div>

      {/* Social Icons Row */}
      <div className="flex items-center gap-12 mt-20 relative z-10">
        {/* LinkedIn */}
        <button
          onMouseEnter={() => setActiveTab("linkedin")}
          onMouseLeave={() => setActiveTab(null)}
          onClick={() =>
            window.open("https://www.linkedin.com/in/viratgupta70", "_blank")
          }
          className={`transition-all duration-300 transform hover:scale-110 p-2 rounded-lg
      ${activeTab === "linkedin" ? "text-blue-500 bg-blue-50" : "text-zinc-400"}
    `}
        >
          <Linkedin
            size={32}
            strokeWidth={activeTab === "linkedin" ? 2.5 : 2}
          />
        </button>

        {/* Github */}
        <button
          onMouseEnter={() => setActiveTab("github")}
          onMouseLeave={() => setActiveTab(null)}
          onClick={() =>
            window.open("https://github.com/ViratGuptaMCE", "_blank")
          }
          className={`transition-all duration-300 transform hover:scale-110 p-2 rounded-lg
      ${activeTab === "github" ? "text-zinc-900 bg-zinc-100" : "text-zinc-400"}
    `}
        >
          <Github size={32} strokeWidth={activeTab === "github" ? 2.5 : 2} />
        </button>

        {/* Mail */}
        <button
          onMouseEnter={() => setActiveTab("mail")}
          onMouseLeave={() => setActiveTab(null)}
          onClick={() => window.open("mailto:viratgupta7010@gmail.com")}
          className={`transition-all duration-300 transform hover:scale-110 p-2 rounded-lg
      ${activeTab === "mail" ? "text-orange-500 bg-orange-50" : "text-zinc-400"}
    `}
        >
          <Mail size={32} strokeWidth={activeTab === "mail" ? 2.5 : 2} />
        </button>
      </div>

      {/* Decorative styling for the "Handwritten" font feel */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
      `}</style>
    </div>
  );
};

export default ContactSection;
