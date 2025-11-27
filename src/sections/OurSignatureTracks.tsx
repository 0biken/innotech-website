import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";

const tracks =[
  {
    title: "Hackathon",
    description: "A 48-hours sprint where,student teams design and prototype real solutions to real problems",
    button: "Join",
    img: "/images/join.svg",
    main: "/images/Hackathon.png"
  },
  {
    title: "Startup Accelerator",
    description: "An intensive bootcamp for early stage founders that are preparing to take their MVPs’ to market.",
    button: "Apply",
    img: "/images/apply.svg",
    main: "/images/Accelerator.png"
  },
  {
    title: "Mentorship Program",
    description: "Personalized guidance from experienced industry mentors to help refine your skills and strategy.",
    button: "Meet Mentors",
    img: "/images/meet.svg",
    main: "/images/Mentership.png"
  },
]

const OurSignatureTracks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = tracks.length

  const goToSlide = (index:number)=>{
    const newIndex = (index + totalSlides) % totalSlides
    setCurrentIndex(newIndex)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  useGSAP(() => {
    gsap.fromTo("#title", { opacity:0}, { opacity:1, duration:1, ease:"expo.out"});
    gsap.fromTo(".description", { opacity:0, xPercent:-100}, { opacity:1, xPercent:0, duration:1, ease:"power1,inOut"});
    gsap.fromTo(".main", { opacity:0, yPercent:100}, { opacity:1, yPercent:0, duration:1, ease:"power1,inOut", delay:0.3});
    gsap.fromTo(".but", { opacity:0, xPercent:-100}, { opacity:1, xPercent:0, duration:1, ease:"power1,inOut"});
  },[currentIndex]);
  
  return (
    <section className="pb-30">
      <h1 className="text-3xl text-black font-orbitron font-[600] text-center">
        Our Signature Tracks
      </h1>
      |
      <h1 className="text-3xl text-black font-geist font-medium text-center pb-9">
        Three ways to Build, Learn and Launch
      </h1>
      <div className="px-[10%] w-full pt-[5%] flex justify-between items-center ">
        <section className="max-w-[50%] flex flex-col gap-7">
          <h1 id="title" className="font-orbitron font-bold text-3xl ">{tracks[currentIndex].title}</h1>
          <p className="font-geist font-normal text-2xl description">
            {tracks[currentIndex].description}
          </p>
          <div className={`relative  cursor-pointer but ${currentIndex==2 ? "max-w-[280px]": "max-w-[140px]"}`}>
            <img src={`${tracks[currentIndex].img}`} alt="" />
            <p className={`font-geist font-normal  ${currentIndex==2 ? "text-[27px] left-[30%] translate-x-[-20%]": "text-3xl left-[50%] translate-x-[-50%]"}  absolute text-white text-left  top-[50%] translate-y-[-50%] `}>{tracks[currentIndex].button}</p>
          </div>

          <ul className="flex max-w-[260px] gap-[10px] items-center">
            {tracks.map((track, index) => (
              <li 
              onClick={()=>goToSlide(index)}
              key={track.title} className={` w-full rounded-full h-2 cursor-pointer transition-all duration-300 ${index == currentIndex ? "bg-[#007060]":"bg-[#007060]/40"}`}></li>
            ))}
          </ul>
        </section>
        <section className="max-w-[50%] main">
          <img className="max-w-[470px] max-h-[365px]" src={tracks[currentIndex].main} alt="" />
        </section>
      </div>
    </section>
  );
};

export default OurSignatureTracks;
