
import Card3 from "../components/card3";
import Card1 from "../components/card1";
import Card2 from "../components/Card2";
import Card4 from "../components/Card4";

const OurImpact = () => {
  return (
    <div className="overflow-hidden">
      <h1 className="text-[40px] text-black font-orbitron font-[600] text-center pb-15">
        Our Impact
      </h1>
      <section className="grid grid-cols-[2fr_1fr] px-[5%] gap-5">
        <div>
          <div className="flex gap-5 mb-5">
            <Card1 />
            <Card2 />
          </div>
          <Card3 />
        </div>
        <div>
          <Card4 />
        </div>
      </section>
    </div>
  );
};

export default OurImpact;
