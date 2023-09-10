"use server"
import Image from "next/image";

const WorkingRemotely = () => {
  return (
    <div className="flex flex-col justify-between items-center h-full rounded-xl bg-dark-2 text-light-1">
      <div className="flex items-center w-full justify-between p-5">
        {" "}
        <h1 className="sm:text-heading4-bold font-semibold sm:text-base text-xs">
          Working Remotely
        </h1>
      </div>
      <div className="flex justify-between w-full p-5 items-center text-light-1">
        <div className="flex flex-col h-full justify-between">
          <h1 className="text-heading4-bold">Everyone is at office!</h1>
          <h3>No one is working from home today.</h3>
        </div>
        <Image
          src="/assets/remoteWork.svg"
          alt="user_logo"
          style={{filter:"hue-rotate(45deg)"}}
          width={200}
          height={200}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default WorkingRemotely;
