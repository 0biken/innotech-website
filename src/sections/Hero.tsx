export default function Hero() {
  return (
    <section className="relative xl:h-screen w-full overflow-hidden flex justify-center rounded-2xl px-[10%] py-[7%] bg-[#0A1F1C]">
      {/* Main content */}
      <div 
      className="relative z-10 flex flex-col justify-end text-white w-full">
        <h3 className=" font-[600] font-geist text-2xl tracking-widest text-white">
          Innotech 4.0
        </h3>
        <h1 className="mt-2 text-4xl font-extrabold font-orbitron">
          Building solutions for tomorrow
        </h1>
        <p className="mt-4 text-white leading-relaxed font-geist font-[500] w-full te">
          The premier innovation and science festival uniting students,
          founders, and industry leaders to design, build, and launch impactful
          technology solutions.
        </p>

        <div className="mt-6 flex gap-4">
          <a href="/register" className="relative cursor-pointer">
            <img src="/images/recg.svg" alt="" className="" />
            <p className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] font-geist text-xl font-[500]">
              Register
            </p>
          </a>
          <a href="#tracks" className="relative cursor-pointer">
            <img src="/images/recw.svg" alt="" />
            <p className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] font-geist text-xl font-[500]">
              See Tracks
            </p>
          </a>
        </div>

        {/* Right-side solid decorative block */}
        <div className="absolute right-[8%] top-[15%] hidden xl:block" aria-hidden="true">
          <div className="w-[340px] h-[340px] bg-[#14B8A6] rounded-[28px] [clip-path:polygon(8%_12%,88%_8%,96%_18%,96%_82%,84%_92%,18%_92%,8%_84%,8%_24%)] opacity-90"></div>
        </div>
      </div>
    </section>
  );
}
