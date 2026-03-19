import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".project-section");

      if (!sections.length) return;

      gsap.set(sections.slice(1), {
        clipPath: "inset(100% 0% 0% 0%)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${sections.length * 100}%`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * sections.length),
              sections.length - 1,
            );
            setActiveProject(index);
          },
        },
      });

      sections.forEach((section, i) => {
        if (i === 0) return;

        const content = section.querySelector(".content-inner");

        tl.to(
          section,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            duration: 1 / sections.length,
          },
          i / sections.length,
        );

        if (content) {
          tl.from(
            content,
            {
              y: 50, // reduced from 100 for smoother mobile experience
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            i / sections.length + 0.1,
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="projects">
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden text-white"
      >
        {/* Top UI */}
        <div className="absolute top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-8 z-[100] flex justify-between items-center mix-blend-difference">
          <div className="text-base sm:text-xl font-black tracking-tighter">
            PROJECTS.
          </div>

          <div className="flex gap-2 sm:gap-4 items-center">
            {projects.map((p, i) => (
              <div
                key={p.id}
                className={`h-0.5 sm:h-0.75 transition-all duration-500 rounded-full ${
                  activeProject === i
                    ? "w-6 sm:w-10 bg-white"
                    : "w-1.5 sm:w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Sections */}
        {projects.map((project, index) => (
          <section
            key={project.id}
            className="project-section absolute inset-0 w-full h-full flex flex-col md:flex-row items-center overflow-hidden"
            style={{
              zIndex: index + 10,
              willChange: "clip-path, transform",
            }}
          >
            {/* LEFT SIDE - Image */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-black">
              {/* Background blur */}
              <div
                className="absolute inset-0 opacity-30 transition-transform duration-[1.5s]"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "grayscale(100%) blur(60px)",
                  transform:
                    activeProject === index ? "scale(1.1)" : "scale(1.3)",
                }}
              />

              {/* Main image */}
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16">
                <div
                  className="relative w-full max-w-md lg:max-w-xl aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/5 transition-transform duration-700"
                  style={{
                    transform:
                      activeProject === index
                        ? "translateY(0)"
                        : "translateY(20px)",
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Content */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#080808] flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-20 relative">
              <div className="content-inner w-full max-w-xl">
                <div className="space-y-4 sm:space-y-6">
                  <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">
                    {project.category}
                  </span>

                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tighter">
                    {project.title}
                  </h2>

                  <p className="text-base sm:text-lg md:text-xl text-white/40 italic">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 sm:pt-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[8px] sm:text-[10px] font-bold text-white/30 border border-white/10 px-2 sm:px-3 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 sm:pt-10">
                    <button
                      onClick={() => window.open(project.github, "_blank")}
                      className="group flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-black uppercase tracking-widest transition-all hover:gap-6 sm:hover:gap-10"
                    >
                      <span>Explore Source</span>
                      <div className="w-8 sm:w-12 h-px bg-white/40 transition-all group-hover:w-12 sm:group-hover:w-20 group-hover:bg-white" />
                    </button>
                  </div>
                </div>

                {/* Large background number - hidden on small screens, smaller on tablets */}
                <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.02] pointer-events-none">
                  <span className="text-[20vh] lg:text-[30vh] xl:text-[35vh] font-black">
                    {index + 1}
                  </span>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Grain overlay */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <filter id="noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
