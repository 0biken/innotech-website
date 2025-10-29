const Card1 = () => {
  return (
    <div className="flex flex-col rounded-[20px] bg-[#0070604D] pt-[3%] pl-[3%] justify-center items-center">
      <div className="flex-1 flex flex-col gap-5">
        <h2 className="font-orbitron font-extrabold text-black text-[30px] tracking-[0] leading-[normal]">
          5,000+ attendees
        </h2>

        <p className="font-geist font-normal text-black text-2xl tracking-[0] leading-[normal]">
          Students, investors, and corporate leaders from across Nigeria
        </p>
      </div>

      <div className="flex-shrink-0 pr-4 pb-2 w-[70%]">
        <img className="w-full" alt="Undraw dev" src="/images/connect.svg " />
      </div>
    </div>
  );
};

export default Card1;
