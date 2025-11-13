
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";



export default function CountUp({ end = 1000, duration = 2, suffix = "", start = 0 }) {
  const el = useRef<HTMLSpanElement | null>(null);
  const counter = useRef({ val: start });

  useGSAP(() => {
    const anim = gsap.to(counter.current, {
      val: end,
      duration,
      ease: "power1.out",
      onUpdate: () => {
        el.current!.textContent =
          Math.floor(counter.current.val).toLocaleString() + suffix;
      },
      scrollTrigger: {
        trigger: el.current,
        start: "top 85%",
        once: true,
      },
    });

    return () => anim.kill();
  }, [end, duration, suffix, start]);

  return <span ref={el}>{start.toLocaleString() + suffix}</span>;
}
