import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useRef } from "react";

const sponsorLogos = [
  {
    bgImage: "/images/Rectangle 7.svg",
    textColor: "text-[#002b00]",
  },
  {
    bgImage: "/images/Rectangle 7.svg",
    textColor: "text-white",
  },
  {
    bgImage: "/images/Rectangle 7.svg",
    textColor: "text-white",
  },
  {
    bgImage: "/images/Rectangle 7.svg",
    textColor: "text-white",
  },
  {
    bgImage: "/images/Rectangle 7.svg",
    textColor: "text-white",
  },
  {
    bgImage: "/images/Rectangle 7.svg",
    textColor: "text-white",
  },
  {
    bgImage: "/images/Rectangle 7.svg",
    textColor: "text-[#007060]",
  },
];

const Sponsor = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const marquee = marqueeRef.current;
    const items = marquee!.querySelectorAll(".marquee-item");

    // Clone items once to create seamless loop
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      marquee!.appendChild(clone);
    });

    // Get total width of one full set
    const totalWidth = marquee!.scrollWidth / 2;

    // Animate marquee using GSAP
    gsap.to(marquee, {
      x: -totalWidth,
      duration: 25, // Adjust for speed
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % -totalWidth),
      },
    });
  }, []);
  return (
    <div className="pb-12 overflow-hidden">
      <h1 className="text-[40px] text-black font-orbitron font-[600] text-center pb-12">
        Sponsored by
      </h1>
      <div className="flex items-center justify-center gap-0" ref={marqueeRef}>
        {sponsorLogos.map((logo, index) => (
          <div key={index} className="flex gap-[11px] pl-[11px] marquee-item">
            <div className="relative w-[254px] h-16">
              <img
                className="absolute w-full h-full top-0 left-0 object-contain"
                alt="Rectangle"
                src={logo.bgImage}
              />
              <div
                className={`absolute inset-0 flex items-center justify-center [font-family:'Geist',Helvetica] font-medium text-3xl text-center tracking-[0] leading-[normal] ${logo.textColor}`}
              >
                Logo
              </div>
            </div>
            <img
              className="w-[52px] h-16"
              alt="Rectangle"
              src="/images/rectangle-10.png"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsor;
