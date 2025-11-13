const About = () => {
  return (
    <section className="pt-15 flex flex-col items-center w-full pb-[10%]">
      <h1 className="text-3xl text-black font-orbitron font-[600] text-center pb-9">
        About Innotech
      </h1>
      <section className="flex px-[10%] gap-[10%]">
        <div className="font-geist w-[50%] flex flex-col gap-5 pr-10">
          <h1 className="text-3xl">Empowering Innovation And Impact</h1>
          <p className="text-xl">
            Since its inception, innotech has been a catalyst for student-led
            innovation. The 4.0 Edition brings together undergraduates, mentors
            and investors for hands-on learning, hackathons, and acceleration
            programs that transform into scalable solutions.Through mentorship,
            technical workshops, and exhibitions, we help student innovators
            build products that solve real-world challenges.
          </p>
          <button className="relative cursor-pointer max-w-[250px]">
            <img src="/images/learn.svg" alt="" />
            <p className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] font-geist text-xl font-[500] text-white">
              Learn More
            </p>
          </button>
        </div>
        <div className="relative w-[50%]">
          <img src="/images/about.svg" alt="" />
          <img
            src="/images/About-img.svg"
            alt=""
            className="absolute bottom-[17%] right-8 w-[40%]"
          />
        </div>
      </section>
    </section>
  );
};

export default About;
