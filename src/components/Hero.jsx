import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const Hero = () => {
  const [isMeltHovered, setIsMeltHovered] = useState(false);

  return (
    <main className="container min-h-screen p-4 md:p-12 lg:p-20 font-sans selection:bg-cyan-500 selection:text-black overflow-hidden relative" id="about">
      {/* The Gooey Container - Applies the viscous filter to all children */}
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-y-0">
        {/* 1. INTRO – redesigned with dark gradient and code snippet feel */}
        <div className="flex-2 flex flex-col">
          <header className=" text-white p-10 w-full flex flex-col justify-between group transition-all duration-700 relative z-30 ">
            <div className="relative">
              <h1 className="text-6xl lg:text-8xl font-mono font-bold tracking-tighter relative">
                {" "}
                Virat_Gupta
              </h1>
              <p className="text-sm lg:text-lg font-mono mt-2">
                <span className="text-cyan-400">// Web Developer</span> |
                <span className="text-pink-400"> ML Learner</span>
              </p>

              <div className="flex items-center gap-2 mt-4 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span>system.online</span>
              </div>
            </div>
          </header>
          <section className="w-full p-8 flex flex-col relative group z-20">
            {/* Bio + Academics */}
            <div className="z-10 max-w-lg">
              <p className="text-yellow-400 uppercase">3rd year undergraduate student</p>
              <strong>Mathematics and Computing Engineering , DTU</strong>
              <br />
              <p className="text-sm font-mono text-zinc-400 leading-relaxed">
                Passionate web developer exploring the intersection of
                technology and creativity. Currently diving into machine
                learning while nurturing a love for visual arts. I enjoy
                building scalable systems and experimenting with design-driven
                interfaces.
              </p>
            </div>
          </section>
        </div>

        {/* 2. AVATAR – with fixed size and scaled clip‑paths */}
        <div className="flex flex-col" style={{ filter: "url(#gooey-fluid)" }}>
          <section
            className="bg-cyan-400 p-1 group relative z-40 self-center justify-self-center transition-all duration-700"
            style={{
              width: "20rem", // h-80 = 20rem
              height: "20rem", // w-80 = 20rem
              clipPath: isMeltHovered
                ? 'path("M120,0 C224,0 256,80 224,200 C208,272 164,308 100,400 C56,328 32,272 16,200 C-16,80 16,0 120,0 Z")' // scaled from hover
                : 'path("M120,0 C224,0 256,80 234,200 C208,272 184,294 84,304 C56,272 32,272 16,200 C-16,80 16,0 120,0 Z")', // scaled from default
            }}
          >
            <div
              className="w-full h-full bg-[#0a0a0c] overflow-hidden transition-all duration-700"
              style={{
                clipPath:
                  'path("M120,4 C216,4 248,80 216,196 C184,312 56,312 24,196 C-8,80 24,4 120,4 Z")', // scaled inner path
              }}
            >
              <img
                src="/ProfilePhoto.png"
                alt="Digital Avatar"
                className="w-full h-full object-cover mix-blend-screen opacity-70 group-hover:opacity-100 transition-all -translate-x-10"
              />
            </div>
          </section>

          <section className="flex items-center justify-center z-50 ">
            <button
              onMouseEnter={() => setIsMeltHovered(true)}
              onMouseLeave={() => setIsMeltHovered(false)}
              className="w-62 h-60 bg-cyan-400 text-black rounded-full flex flex-col items-center justify-center text-center p-10 group transition-all duration-700 relative overflow-visible"
              style={{
                clipPath: isMeltHovered
                  ? 'path("M144,-100 C223,-100 360,80 228,44 C250,320 23,108 144,308 C64,108 -40,220 0,144 C40,80 64,-100 144,-100 Z")'
                  : 'path("M144,-40 C223,-40 320,80 288,44 C250,20 223,208 154,228 C64,188 -40,180 0,144 C40,80 64,-40 144,-40 Z")',
              }}
            >
              <span className="text-3xl font-black uppercase italic leading-none mb-2 transition-colors group-hover:text-[#fff]">
                Melt <br /> In
              </span>
              <div className="mt-4 bg-black text-white p-3 rounded-full group-hover:scale-125 transition-transform">
                <ArrowUpRight size={20} />
              </div>
            </button>
          </section>
        </div>
      </div>

      {/* SVG Gooey Filter Definition */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="gooey-fluid" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="15"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -14"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `,
        }}
      />
    </main>
  );
};

export default Hero;
