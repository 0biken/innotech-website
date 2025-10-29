import Hero from "./sections/Hero";
import Nav from "./sections/Nav";
import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Sponsor from "./sections/Sponsor";
import OurImpact from "./sections/OurImpact";
import About from "./sections/About";
import OurSignatureTracks from "./sections/OurSignatureTracks";

gsap.registerPlugin(ScrollTrigger);
const App = () => {
  return (
    <div>
      <div className="p-3 overflow-hidden">
        <Nav />
        <Hero />
      </div>
      <Sponsor />
      <OurImpact />
      <About />
      <OurSignatureTracks />
    </div>
  );
};

export default App;
