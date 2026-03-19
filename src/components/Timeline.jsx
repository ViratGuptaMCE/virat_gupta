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
      // Animate Main Line drawing down
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

      // Animate Items
      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item, index) => {
        // Fade in and float up effect
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

        // Animate Milestone Star
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
      className="timeline-section"
      id="experience"
      style={{
        position: "relative",
        minHeight: "100vh", // Ensure it takes at least screen height
        padding: "15vh 5%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <h2
        style={{
          marginBottom: "8rem",
          fontSize: "clamp(3rem, 5vw, 4rem)",
          color: "#fff",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        Experiences.
      </h2>

      <div style={{ width: "100%", maxWidth: "1200px", position: "relative" }}>
        {/* Track Line (Background) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "1px",
            background: "rgba(255, 255, 255, 0.1)",
            zIndex: 0,
          }}
        />

        {/* Active Line (Animated) */}
        <div
          ref={lineRef}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "2px", // Slightly thicker
            background:
              "linear-gradient(to bottom, transparent, #fff, transparent)",
            height: "0%", // Starts at 0
            zIndex: 0,
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
          }}
        />

        {/* Items */}
        {history.map((item, index) => (
          <div
            key={index}
            className="timeline-item"
            style={{
              display: "flex",
              justifyContent: index % 2 === 0 ? "flex-end" : "flex-start",
              paddingBottom: "6rem", // Default spacing
              width: "50%",
              marginLeft: index % 2 === 0 ? 0 : "auto",
              paddingRight: index % 2 === 0 ? "4rem" : 0,
              paddingLeft: index % 2 === 0 ? 0 : "4rem",
              position: "relative",
            }}
          >
            {/* Milestone Star on the line */}
            <div
              className="milestone-star"
              style={{
                position: "absolute",
                top: "0",
                [index % 2 === 0 ? "right" : "left"]: "-8px", // Center on line (line width 2px, star 16px -> shift 7px + margin)
                // Actually let's just use calc
                [index % 2 === 0 ? "right" : "left"]: "auto",
                left: index % 2 === 0 ? "auto" : "-8px",
                right: index % 2 === 0 ? "-8px" : "auto",

                width: "16px",
                height: "16px",
                background: "#fff",
                borderRadius: "50%",
                zIndex: 2,
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
                border: "3px solid #050505", // Hole punch effect if desired, or solid
              }}
            />

            {/* Content Card */}
            <div
              className="content-card"
              style={{
                width: "100%",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: "1.5rem",
                padding: "2.5rem",
                transition: "all 0.3s ease",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)";
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px -10px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  color: "#888",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  marginBottom: "0.75rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "0.25em 0.75em",
                  borderRadius: "100px",
                }}
              >
                {item.year}
              </span>
              <h3
                style={{
                  fontSize: "1.75rem",
                  marginBottom: "0.75rem",
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                {item.role}
              </h3>
              <p style={{ color: "#aaa", fontSize: "1rem" }}>{item.company}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
