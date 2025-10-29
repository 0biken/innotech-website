

const Card3 = () => {
  return (
    <div className="flex rounded-[20px] bg-[#0070604D] pt-[15%] pl-[7%] justify-center items-center">
          <div className="flex-1 flex flex-col gap-5">
            <h2 className="font-orbitron font-extrabold text-black text-[30px] tracking-[0] leading-[normal]">
              100+ developers
              <br />
              competing
            </h2>

            <p className="font-geist font-normal text-black text-2xl tracking-[0] leading-[normal]">
              In hackathons and
              <br />
              accelerator challenges
            </p>
          </div>

          <div className="flex-shrink-0 pr-4 pb-2 w-[50%]">
            <img
              className="w-full"
              alt="Undraw dev"
              src="/images/laptop.svg "
            />
          </div>
        </div>
  )
}

export default Card3