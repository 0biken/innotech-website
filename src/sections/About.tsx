import Inception from "../components/Inception";

const About = () => {
  return (
    <section className="pt-5 flex flex-col items-center w-full pb-[10%]">
      <h1 className="text-3xl text-black font-orbitron font-[600] text-center pb-9">
        About Innotech
      </h1>
      <div className="flex flex-col items-center flex-shrink-0 min-w-[60%] bg-[#B3D4CF] rounded-3xl text-white font-orbitron px-[] py-[2%] mb-6">
        <p className="text-4xl font-[700]">Empowering Innovation And Impact</p>
        <p className="text-4xl font-[700]">Across African Universities.</p>
      </div>

      <Inception />
    </section>
  );
};

export default About;
