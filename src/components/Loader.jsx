import React, { useEffect, useRef, useState } from "react";

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const textGroupRef = useRef(null);
  const viratCharsRef = useRef([]);
  const guptaCharsRef = useRef([]);
  const liquidMaskRef = useRef(null);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  const virat = "VIRAT".split("");
  const gupta = "GUPTA".split("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script.async = true;
    script.onload = () => setGsapLoaded(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!gsapLoaded || !window.gsap) return;

    const gsap = window.gsap;

    // Initial State
    gsap.set([viratCharsRef.current, guptaCharsRef.current], {
      y: 100,
      opacity: 0,
      rotateX: -90,
    });
    gsap.set(liquidMaskRef.current, {
      scale: 0,
      borderRadius: "50%",
      opacity: 0,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // 1. Entrance Animation
    tl.to(containerRef.current, { opacity: 1, duration: 0.5 })
      .to(viratCharsRef.current, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "expo.out",
      })
      .to(
        guptaCharsRef.current,
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "expo.out",
        },
        "-=0.4",
      )

      // 2. Subtle "Breathing" movement
      .to(textGroupRef.current, {
        scale: 1.00,
        duration: 0.5,
        ease: "sine.inOut",
      })

      // 3. The "Liquid Mask" Reveal
      .to(
        liquidMaskRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "back.out(1.7)",
        },
        "-=1.0",
      )

      // 4. Contrast Shift & Exit
      .to(
        [viratCharsRef.current, guptaCharsRef.current],
        {
          color: "#ffffff",
          duration: 0.3,
          stagger: 0.02,
        },
        "-=0.2",
      )
      .to(
        liquidMaskRef.current,
        {
          scale: 80,
          duration: 0.5,
          ease: "power4.inOut",
          onStart: () => {
            gsap.to(textGroupRef.current, {
              letterSpacing: "1em",
              opacity: 0,
              duration: 0.8,
              ease: "power3.in",
            });
          },
        },
        "-=0.1",
      )

      .to(containerRef.current, {
        backgroundColor: "#000000",
        duration: 0.1,
      });

    return () => tl.kill();
  }, [gsapLoaded, onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 9999,
        background: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        perspective: "1000px",
        opacity: 0, // Start hidden until GSAP is ready
      }}
    >
      <div
        ref={liquidMaskRef}
        style={{
          position: "absolute",
          width: "100px",
          height: "100px",
          background: "#000000",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        ref={textGroupRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", overflow: "hidden" }}>
          {virat.map((char, i) => (
            <span
              key={`v-${i}`}
              ref={(el) => (viratCharsRef.current[i] = el)}
              style={charStyle}
            >
              {char}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", overflow: "hidden" }}>
          {gupta.map((char, i) => (
            <span
              key={`g-${i}`}
              ref={(el) => (guptaCharsRef.current[i] = el)}
              style={{ ...charStyle, fontWeight: 300, letterSpacing: "0.4em" }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      <div style={gridOverlayStyle} />
    </div>
  );
}

const charStyle = {
  display: "inline-block",
  fontSize: "clamp(2.5rem, 10vw, 5rem)",
  fontWeight: 800,
  color: "#000000",
  fontFamily: "system-ui, -apple-system, sans-serif",
  lineHeight: 1,
  transformOrigin: "bottom center",
};

const gridOverlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)`,
  backgroundSize: "40px 40px",
  opacity: 0.3,
  zIndex: 0,
};
