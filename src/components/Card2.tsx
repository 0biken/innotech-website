const Card2 = () => {
  return (
    <div className="flex flex-col rounded-[20px] bg-[#0070604D] pt-[3%] pl-[3%] justify-center items-center w-full">
      <div className="flex-1 flex flex-col gap-1">
        <h2 className="font-orbitron font-extrabold text-black text-[30px] tracking-[0] leading-[normal]">
          1,000+ students trained
        </h2>

        <p className="font-geist font-normal text-black text-2xl tracking-[0] leading-[normal]">
          In innovation, leadership, and emerging <br /> technologies
        </p>
      </div>

      <div className="flex-shrink-0 pr-4 pb-2 w-full relative">
        <img className="w-[40%] absolute bottom-0 right-[10%]" alt="Undraw dev" src="/images/cert.svg " />
      </div>
    </div>
  );
};

export default Card2;
