import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import AnimatedStats from "@/components/AnimatedStats";
import About from "@/components/About";
import SkillsOrbit from "@/components/SkillsOrbit";
import BentoGrid from "@/components/BentoGrid";
import StackedCards from "@/components/StackedCards";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <AnimatedStats />
      <About />
      <SkillsOrbit />
      <BentoGrid />
      <StackedCards />
      <Contact />

      <footer className="text-center py-16 border-t border-white/10 bg-[#0a0a0a]">
        <p className="text-white text-base mb-2">© {new Date().getFullYear()} Portfolio. Crafted with passion.</p>
        <p className="text-gray-500 text-sm">Designed & Developed by Samran Zahid and Karimullah</p>
      </footer>
    </main>
  );
}
