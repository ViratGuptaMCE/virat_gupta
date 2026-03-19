import React, { useState, useRef, useEffect, useMemo } from "react";
import { ExternalLink } from "lucide-react";

const Achievements = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const horizontalSectionRef = useRef(null);
  const horizontalStickyRef = useRef(null);
  const imageRefs = useRef([]);

  const achievements = useMemo(
    () => [
      {
        id: 1,
        title: "Hackathon Winner",
        description:
          "Top 4 at WeIgnite 2024 – built an AI-powered personal safety application for emergency.",
        metric: "🥇 4th Place · 600+ Participants",
        image: "/WeIgnite.jfif",
        color: "from-cyan-900 to-cyan-700", // cyan gradient
        accent: "#06b6d4", // cyan accent
        bgColor: "#031a1f", // very dark cyan tint
      },
      {
        id: 2,
        title: "Leetcode",
        description:
          "Solved 600+ problems, achieved top 7.71% with a contest rating of 1800.",
        metric: "🏆 Rating 1800 · Top 7.71%",
        image: "/leet.png",
        color: "from-zinc-900 to-zinc-700", // neutral black/gray gradient
        accent: "#ffffff", // white accent
        bgColor: "#0a0a0a", // deep black tint
      },
      {
        id: 3,
        title: "Codeforces Specialist",
        description:
          "Consistent performer with a peak rating of 1552 – specialist rank and 15+ contests solved.",
        metric: "Rating 1552 · Specialist",
        image: "/codeforces.png",
        color: "from-cyan-800 to-black", // cyan to black gradient
        accent: "#22d3ee", // bright cyan accent
        bgColor: "#041f21", // dark cyan-black blend
      },
      {
        id: 4,
        title: "Academics",
        description:
          "CGPA 9.56/10 · Recipient of the DTU Medals and Scholarships for outstanding academic performance.",
        metric: "DIR 3 · CGPA 9.56",
        image: "/GoldenPride.png",
        color: "from-black to-cyan-900", // black to cyan gradient
        accent: "#67e8f9", // soft cyan accent
        bgColor: "#0d1a1f", // dark cyan-black tint
      },
    ],
    [],
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!horizontalSectionRef.current || !horizontalStickyRef.current) return;

      const offsetTop = horizontalSectionRef.current.offsetTop;
      const height = horizontalSectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      const progress = Math.max(
        0,
        Math.min(1, (scrollPosition - offsetTop) / (height - windowHeight)),
      );

      const totalSlides = achievements.length;
      const currentSlide = Math.floor(progress * totalSlides * 0.99);
      setActiveSlide(currentSlide);

      const translateX =
        progress *
        (horizontalStickyRef.current.scrollWidth - window.innerWidth);
      horizontalStickyRef.current.style.transform = `translateX(-${translateX}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [achievements.length]);

  return (
    <div
      className="min-h-screen text-white/90 font-sans selection:bg-white/20 transition-colors duration-700"
      style={{
        backgroundColor: achievements[activeSlide]?.bgColor || "#000000",
      }}
    >
      {/* Hero Section */}
      <header className="relative h-[80vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        {/* Dynamic gradient overlay based on active achievement */}
        <div
          className="absolute inset-0 bg-linear-to-b from-transparent to-black/90"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent, ${achievements[activeSlide]?.bgColor || "#000"})`,
          }}
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-6 block text-white/40">
            Milestones & Recognition
          </span>
          <h1 className="text-5xl md:text-9xl font-black leading-[0.9] mb-8 tracking-tighter">
            Achieve<span className="text-white/20">ments.</span>
          </h1>
        </div>
      </header>

      {/* HORIZONTAL SCROLL SECTION */}
      <section ref={horizontalSectionRef} className="relative h-[400vh] z-10">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-transparent">
          <div
            ref={horizontalStickyRef}
            className="flex transition-transform duration-75 ease-out will-change-transform"
          >
            {achievements.map((item, idx) => (
              <div
                key={item.id}
                className="w-screen h-screen shrink-0 flex items-center justify-center px-12 md:px-32"
              >
                <div
                  className={`relative w-full max-w-300 md:aspect-21/9 rounded-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row bg-linear-to-br ${item.color} border border-white/10`}
                >
                  {/* Image Content */}
                  <div className="w-full max-md:h-50 md:w-2/3 relative h-full group">
                    <img
                      ref={(el) => (imageRefs.current[idx] = el)}
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                    <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-xl px-4 py-2 rounded-full text-white/90 text-[10px] font-bold tracking-widest flex items-center gap-2 border border-white/20">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: item.accent }}
                      />
                      {item.metric}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="w-full max-md:h-50 h-full md:w-1/3 p-4 md:p-12 flex flex-col justify-center text-white bg-black/40 backdrop-blur-sm">
                    <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed mb-8 font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Instruction */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[8px] font-bold tracking-[0.5em] uppercase text-white/30">
          Scroll
        </span>
        <div className="w-px h-8 bg-linear-to-b from-white/20 to-transparent" />
      </div>
    </div>
  );
};

export default Achievements;
