import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";

const Nav = () => {
  const navLinks = ["Tracks", "Mentorship", "Timeline", "Sponsors", "Gallery"];

  useGSAP(()=>{
    const navTime = gsap.timeline({
      scrollTrigger:{
        trigger: 'nav',
        start: "bottom top+=40",
        scrub: true,
      }
    });

    navTime.fromTo(
      "nav",
      {
        width: "60%"
      }
      ,{
        width: "40%",
        duration: 100,
        ease: "back.in",
        border: "1px solid black"
      }
    )
  })

  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 z-50 px-8 py-2 bg-white backdrop-blur-md rounded-full ">
      <ul className="flex items-center gap-8 justify-between font-geist text-[25px]">
        <li><img src="/images/logo.svg" alt="" className="h-5"/></li>
        {navLinks.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="text-foreground/90 hover:text-foreground transition-colors duration-200 text-sm font-medium"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
