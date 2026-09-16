import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import RequestFlow from "../sections/RequestFlow";
import DSAPreview from "../sections/DSAPreview";
import Timeline from "../sections/Timeline";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }, 60);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <RequestFlow />
      <DSAPreview />
      <Timeline />
      <Contact />
      <Footer />
    </>
  );
}
