import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const history = [
  {
    year: "Aug 2025 - Feb 2026",
    role: "Tech Developer Intern",
    company: "Rayeva World",
  },
  {
    year: "Sep 2024 - Dec 2024",
    role: "Python Programmer Intern",
    company: "Lab On Wheels, DTU USIP",
  },
  {
    year: "2023-2025",
    role: "Member",
    company: "Kalakriti DTU",
  },
];

export default function Timeline() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate main line drawing down
      gsap.fromTo(
        lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
            end: "bottom 90%",
            scrub: 1,
          },
        },
      );

      // Animate each timeline item
      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item) => {
        // Content card fade + float
        gsap.fromTo(
          item.querySelector(".content-card"),
          { autoAlpha: 0, y: 50, filter: "blur(10px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Milestone star pop
        gsap.fromTo(
          item.querySelector(".milestone-star"),
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center overflow-hidden"
    >
      <h2 className="mb-16 md:mb-24 text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase text-center">
        Experiences.
      </h2>

      <div className="relative w-full max-w-6xl mx-auto">
        {/* Background track line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/10 z-0" />

        {/* Animated active line */}
        <div
          ref={lineRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.5)] z-0"
          style={{ height: "0%" }}
        />

        {/* Timeline items */}
        {history.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`
                timeline-item relative flex flex-col
                ${isEven ? "md:items-end" : "md:items-start"}
                w-full md:w-1/2
                ${isEven ? "md:ml-auto md:pr-8 lg:pr-12" : "md:mr-auto md:pl-8 lg:pl-12"}
                mb-16 last:mb-0
              `}
            >
              {/* Milestone star – positioned on the line */}
              <div
                className="
                  milestone-star absolute top-0 z-10
                  w-4 h-4 bg-white rounded-full
                  border-2 border-black
                  shadow-[0_0_20px_rgba(255,255,255,0.8)]
                  md:left-auto md:right-auto
                "
                style={{
                  left: isEven ? "auto" : "-0.5rem",
                  right: isEven ? "-0.5rem" : "auto",
                  // On mobile, we override to left positioning later via media query or JS
                }}
              />

              {/* Content card */}
              <div
                className="
                  content-card w-full max-w-md
                  bg-gradient-to-br from-white/5 to-white/3
                  border border-white/5
                  backdrop-blur-md
                  rounded-3xl p-6 md:p-8
                  transition-all duration-300
                  hover:border-white/20
                  hover:bg-gradient-to-br hover:from-white/8 hover:to-white/4
                  hover:-translate-y-1
                  hover:shadow-xl
                  cursor-default
                  relative overflow-hidden
                "
              >
                <span className="inline-block text-xs font-semibold tracking-wider text-zinc-400 border border-white/10 px-3 py-1 rounded-full mb-3">
                  {item.year}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                  {item.role}
                </h3>
                <p className="text-zinc-400 text-base md:text-lg">
                  {item.company}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile timeline adjustment: line on left, stars on left, all cards on right */}
      <style jsx>{`
        @media (max-width: 768px) {
          .timeline-item {
            align-items: flex-start !important;
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-left: 2rem !important;
            padding-right: 0 !important;
          }
          .milestone-star {
            left: -0.5rem !important;
            right: auto !important;
          }
          .absolute.left-1\\/2 {
            left: 1rem !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </section>
  );
}
