const Inception = () => {
  return (
    <section className="w-full p-[1%]">
      <div className="relative">
        <img src="/images/about.svg" alt="" />
          <p className="absolute top-[25%] left-[5%]  font-geist font-normal text-white text-2xl tracking-[0] leading-[normal] ">
            Since its inception, innotech has been a catalyst for student-led
            innovation. The 4.0 Edition brings together undergraduates, mentors and
            investors for hands-on learning, hackathons, and acceleration programs
            that transform into scalable solutions. Through mentorship, technical
            workshops, and exhibitions, we help student innovators build products
            that solve real-world challenges.
          </p>
          <a href="/register" className="absolute bottom-1 left-[4%] cursor-pointer max-w-[230px]">
            <img src="/images/recgr.svg" alt="" className="" />
            <p className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] font-geist text-xl font-[500] text-white">
              Register
            </p>
          </a>
      </div>
    </section>
  );
};

export default Inception;
