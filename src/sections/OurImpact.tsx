import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import Card3 from "../components/card3";
// {
//                 opacity:0, duration:1, ease: "power1.inOut", stagger:0.04
//             }
const OurImpact = () => {
  return (
    <div className="overflow-hidden">
      <h1 className="text-[40px] text-black font-orbitron font-[600] text-center pb-15">
        Our Impact
      </h1>
      <section className="grid grid-cols-[2fr_1fr] px-[5%] gap-[22px]">
        <div><Card3 /></div>
        <div><Card3 /></div>
      </section>
    </div>
  );
};

export default OurImpact;
