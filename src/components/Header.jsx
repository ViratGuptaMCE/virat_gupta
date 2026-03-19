import React, { useState, useEffect } from "react";
import {
  Download,
  Menu,
  X,
  Rocket,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Trigger the transition slightly after starting to scroll
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-purple-500/30">
      {/* MAIN NAVBAR CONTAINER */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] 
        ${
          isScrolled
            ? " backdrop-blur- border-b border-white/5"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 relative flex items-center justify-between">
          {/* LEFT SIDE: LOGO (Stays put) */}
          <div className="flex items-center group cursor-pointer relative z-10">
            <div className="relative">
              <div className="relative rounded-lg transition-colors">
                <a href="#about">
                  <img src="/logo_copy.svg" alt="logo" className="w-20 h-20" />
                </a>
              </div>
            </div>
          </div>

          {/* CENTER: NAV LINKS (Moves up and fades out on scroll) */}
          <div
            className={`hidden md:block absolute left-1/2 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${
              isScrolled
                ? "-translate-y-20 opacity-0 pointer-events-none"
                : "translate-y-0 opacity-100"
            }`}
          >
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-white transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-2 left-0 w-0 h-px bg-linear-to-r from-purple-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT SIDE: RESUME BUTTON (Stays put) */}
          <div className="relative z-10">
            <a
              href="/resume.pdf"
              download
              className={`relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full overflow-hidden group transition-all duration-500 active:scale-95
      ${
        isScrolled
          ? "bg-cyan-600  shadow-lg shadow-purple-500/20"
          : "bg-white text-black"
      }`}
            >
              <span
                className={`relative z-10 text-sm font-bold group-hover:text-white ${isScrolled ? "text-white" : "text-black"}`}
              >
                Resume
              </span>
              <Download
                className={`w-4 h-4 transition-all duration-300 group-hover:text-white ${
                  isScrolled ? "text-white" : "text-black"
                }`}
              />

              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-zinc-800 to-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>

          {/* MOBILE TOGGLE (Visible only on mobile) */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU (Simple slide-down) */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-500 ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"}`}
        >
          <div className="p-8 space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-2xl font-bold text-gray-300 hover:text-purple-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        body { scroll-behavior: smooth; }
      `,
        }}
      />
    </div>
  );
};

export default Header;
