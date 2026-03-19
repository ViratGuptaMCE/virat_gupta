import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const canvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Configuration
  const CONFIG = {
    particleCount: 60, // Reduced density
    destabilizeThreshold: 20,
    colors: ["#00f3ff20", "#ff009920", "#00ff6620", "#ffea0020", "#b700ff20"],
    cursorBaseRadius: 15,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];
    let shockwaves = [];
    let animationFrameId;

    const mouse = {
      x: -1000,
      y: -1000,
      eaten: 0,
      color: "#ffffff",
      pulse: 0,
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    class Particle {
      constructor(x, y, color, isBurst = false) {
        this.reset(x, y, color, isBurst);
      }

      reset(x, y, color, isBurst = false) {
        this.x = x || Math.random() * width;
        this.y = y || Math.random() * height;
        this.angle = Math.random() * Math.PI * 2;
        this.baseSpeed = Math.random() * 1.2 + 0.5;
        this.speed = isBurst ? Math.random() * 12 + 4 : this.baseSpeed;
        this.color =
          color ||
          CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
        this.radius = Math.random() * 2 + 1;
        this.history = [];
        this.historyLength = 8;
        this.turnSpeed = (Math.random() - 0.5) * 0.1;
      }

      update() {
        this.history.unshift({ x: this.x, y: this.y });
        if (this.history.length > this.historyLength) this.history.pop();

        if (this.speed > this.baseSpeed) this.speed *= 0.95;

        this.angle += this.turnSpeed;
        if (Math.random() < 0.02) this.turnSpeed = (Math.random() - 0.5) * 0.1;

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10; // optional glow
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset for other drawings
      }
    }

    const init = () => {
      resize();
      particles = Array.from(
        { length: CONFIG.particleCount },
        () => new Particle(),
      );
      setIsReady(true);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const destabilize = () => {
      // Release all eaten particles
      for (let i = 0; i < mouse.eaten; i++) {
        particles.push(new Particle(mouse.x, mouse.y, mouse.color, true));
      }
      // Reset cursor state
      mouse.eaten = 0;
      mouse.color = "#ffffff";
    };

    const animate = () => {
      ctx.fillStyle = "rgba(5, 5, 10, 0.2)";
      ctx.fillRect(0, 0, width, height);

      mouse.pulse += 0.05;
      const instabilityRatio = mouse.eaten / CONFIG.destabilizeThreshold;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.cursorBaseRadius + p.radius) {
          mouse.eaten++;
          mouse.color = p.color;

          if (particles.length > CONFIG.particleCount) {
            particles.splice(i, 1);
          } else {
            p.reset();
          }

          if (mouse.eaten >= CONFIG.destabilizeThreshold) {
            destabilize();
          }
        }
      }

      // Draw Cursor
      ctx.save();

      // Visual instability indicators
      const shake =
        instabilityRatio > 0.6
          ? (Math.random() - 0.5) * (instabilityRatio * 5)
          : 0;
      const pulseScale = 1 + Math.sin(mouse.pulse) * 0.1 * instabilityRatio;

      ctx.translate(mouse.x + shake, mouse.y + shake);

      // Glowing aura
      const gradient = ctx.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        CONFIG.cursorBaseRadius * 2,
      );
      gradient.addColorStop(0, mouse.color);
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(0, 0, CONFIG.cursorBaseRadius * 2 * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.4 + instabilityRatio * 0.6;
      ctx.fill();

      // Stability Ring (disappears as instability increases)
      if (instabilityRatio > 0) {
        ctx.beginPath();
        ctx.arc(
          0,
          0,
          CONFIG.cursorBaseRadius + 5,
          0,
          Math.PI * 2 * (1 - instabilityRatio),
        );
        ctx.strokeStyle = mouse.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Core
      ctx.beginPath();
      ctx.arc(0, 0, CONFIG.cursorBaseRadius, 0, Math.PI * 2);
      ctx.fillStyle = mouse.color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = mouse.color;
      ctx.fill();

      // Inner white light
      ctx.beginPath();
      ctx.arc(0, 0, CONFIG.cursorBaseRadius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
      <canvas ref={canvasRef} className="fixed w-full h-screen -z-1 inset-0 block" /> 
  );
};

export default App;
