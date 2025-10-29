import Hero from "./sections/Hero";
import Nav from "./sections/Nav";
import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Sponsor from "./sections/Sponsor";
import OurImpact from "./sections/OurImpact";

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
    </div>
  );
};

export default App;
