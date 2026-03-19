import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    category: "Web Engineering",
    items: ["JavaScript", "React", "HTML+CSS", "Express"],
  },
  { category: "Core Languages", items: ["Python", "C++"] },
  {
    category: "Databases",
    items: ["SQL", "MongoDB", "PostGres"],
  },
  { category: "Machine Learning", items: [ "Yolo", "PyTorch" , "Tensorflow" , "OpenCV"] },
];

export default function Skills() {
  const wrapperRef = useRef(null);
  const categoryRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Animate cards on scroll
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      // Initial state: Blurred, transparent, pushed right
      gsap.set(card, { autoAlpha: 0, x: 50, filter: "blur(5px)" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 15%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        })
        .to(card, {
          autoAlpha: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
        })
        .to(card, {
          autoAlpha: 0,
          x: 50,
          filter: "blur(5px)",
          duration: 1,
          ease: "power2.in",
        });
    });

    // Category switching
    skillsData.forEach((group, i) => {
      ScrollTrigger.create({
        trigger: `#category-${i}`,
        start: "top 60%",
        end: "bottom 60%",
        onEnter: () => updateCategory(group.category),
        onEnterBack: () => updateCategory(group.category),
        onLeaveBack: () => {
          if (i === 0) updateCategory(""); // Clear if scrolling back up past first
        },
      });
    });

    const updateCategory = (text) => {
      if (categoryRef.current) {
        gsap.to(categoryRef.current, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            categoryRef.current.innerText = text;
            gsap.to(categoryRef.current, { opacity: 1, duration: 0.2 });
          },
        });
      }
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      id="skills"
      className="whatido-section py-[10vh] relative flex justify-between items-start min-h-[150vh]"
    >
      <div className="sticky top-0 sm:top-[50vh] translate-y-[-50%] w-[25%] pl-[5%] z-1">
        <div className="relative">
          <h2 className="text-[clamp(3rem,6vw,5rem)] leading-[0.9] font-extrabold tracking-[-0.02em] text-white mb-4">
            SKILLS.
            <br />
          </h2>
        </div>
      </div>

      <div className="max-sm:-translate-x-[60%] w-[40%] flex flex-col gap-32 pt-[30vh] pb-[30vh] z-1 items-center">
        {skillsData.map((group, groupIndex) => (
          <div
            key={groupIndex}
            id={`category-${groupIndex}`}
            className="w-full flex flex-col gap-16"
          >
            {group.items.map((tech, i) => (
              <div
                key={`${groupIndex}-${i}`}
                ref={(el) => cardsRef.current.push(el)}
                className="tech-item flex items-center justify-center opacity-0 cursor-auto mx-auto w-fit"
              >
                <div className="dot w-3 h-3 bg-[#333] rounded-[50%] mr-8 transition-all duration-300 ease-in-out" />
                <h3 className="text-[clamp(2rem,3.5vw,3rem)] font-medium text-[#888] transition-colors duration-300 ease-in-out">
                  {tech}
                </h3>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="sticky top-[50vh] -translate-y-1/2 w-[30%] pr-[5%] z-1 text-right flex justify-end">
        <h3
          ref={categoryRef}
          className="text-[clamp(2.5rem,5vw,3rem)] leading-none font-bold text-[rgba(255,255,255,0.4)] uppercase tracking-[0.05em] text-right"
        ></h3>
      </div>
    </section>
  );
}
