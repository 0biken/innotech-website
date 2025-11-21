export default function Hero() {
  return (
    <section className="relative lg:h-screen w-full overflow-hidden flex justify-center rounded-2xl px-[10%] py-[7%]">
      <div className="absolute inset-0 w-full">
        <img 
          src="/images/hero.png" 
          alt="hero background" 
          className="w-full" 
        />
      </div>
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
          <button className="relative cursor-pointer">
            <img src="/images/recg.svg" alt="" className="" />
            <p className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] font-geist text-xl font-[500]">
              Register
            </p>
          </button>
          <button className="relative cursor-pointer">
            <img src="/images/recw.svg" alt="" />
            <p className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] font-geist text-xl font-[500]">
              See Tracks
            </p>
          </button>
        </div>

        
      </div>
    </section>
  );
}