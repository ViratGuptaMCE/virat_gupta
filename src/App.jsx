import React, { useState } from "react";
import Scroller from "./components/Scroller";
import Loader from "./components/Loader.jsx";
import Hero from "./components/Hero.jsx";
import Skills from "./components/Skills";
import Projects from "./components/Projects.jsx";
import Timeline from "./components/Timeline.jsx";
import InteractiveBackground from "./components/BackGround";
import Achievements from "./components/Achievements.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Site content always renders behind */}
      <InteractiveBackground />
      <Scroller>
        <main>
          <Header />
          <Hero />
          <Skills />
          <Timeline />
          <Achievements />
          <Projects />
          <Footer />
        </main>
      </Scroller>

      {/* Loader on top - window reveals site behind */}
      {loading && <Loader onComplete={() => setLoading(false)} />}
    </>
  );
}

export default App;
