const Card4 = () => {
  return (
    <div className="flex flex-col rounded-[20px] bg-[#0070604D] pt-[7%] px-[7%] justify-center items-center h-full">
      <div className="flex-1 flex flex-col gap-5">
        <h2 className="font-orbitron font-extrabold text-black text-[30px] tracking-[0] leading-[normal]">
          7,000+ student
registrations
        </h2>

        <p className="font-geist font-normal text-black text-2xl tracking-[0] leading-[normal]">
          Across multiple cohorts
and universities
        </p>
      </div>

      <div className="flex-shrink-0 pr-4 pb-2 w-[70%]">
        <img className="w-full" alt="Undraw dev" src="/images/email.svg " />
      </div>
    </div>
  );
};

export default Card4;
