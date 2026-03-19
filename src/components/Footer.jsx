import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Heart, MapPin, Phone } from "lucide-react";
import ContactSection from "./Contact";

const Footer = () => {
  const footerRef = useRef(null);
  const magneticButtonRef = useRef(null);
  const textRef = useRef(null);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  // Load GSAP and ScrollTrigger via CDN
  useEffect(() => {
    const loadScripts = async () => {
      const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = resolve;
          document.head.appendChild(script);
        });
      };

      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
      );
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
      );
      setGsapLoaded(true);
    };

    loadScripts();
  }, []);

  useEffect(() => {
    if (!gsapLoaded || !footerRef.current) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    const textElements = textRef.current.querySelectorAll(".animate-text");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      textElements,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
    );

    // Magnetic effect for the main CTA
    const handleMouseMove = (e) => {
      const btn = magneticButtonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      const btn = magneticButtonRef.current;
      if (!btn) return;
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    const btn = magneticButtonRef.current;
    if (btn) {
      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (btn) {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [gsapLoaded]);

  return (
    <div className="flex flex-col font-sans" id="contact">
      <footer
        ref={footerRef}
        className="relative bg-black text-white overflow-hidden pb-10 pt-16 md:pt-20 lg:pt-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main grid: stack on mobile, two columns on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Column: Heading & CTA */}
            <div ref={textRef} className="space-y-6 mx-auto md:space-y-8">
              <h2 className="animate-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="text-cyan-400">Let's work </span><br />
                <span className="text-white/70">together.</span>
              </h2>

              {/* Address & optional contact info */}
              <div className="flex flex-col gap-3 text-zinc-200 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-cyan-500 flex-shrink-0" />
                  <span>Delhi, India</span>
                </div>
                {/* You can add more contact items here if needed */}
              </div>
            </div>

            {/* Right Column: Contact Section (already responsive) */}
            <ContactSection />
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 mt-12 md:mt-16 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center md:text-left">
              <span>© {new Date().getFullYear()} Virat Gupta</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                Built with{" "}
                <Heart size={14} className="text-red-500 fill-current" /> by a
                curious mind
              </span>
            </div>
            {/* Optional social links can go here */}
          </div>
        </div>

        {/* Large Scrolling Text Backdrop - responsive size */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-[0.1] pointer-events-none select-none">
          <div className="whitespace-nowrap text-[8vw] sm:text-[6vw] md:text-[5vw] font-black uppercase tracking-tighter leading-none translate-y-1/4">
            . Learner • Developer • Creator • Designer • Developer • Creator
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
