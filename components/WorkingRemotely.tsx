"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  // getLatestAttendanceEntry,
  // getLatestAttendanceExit,
  fetchAttendanceEntriesForTodayWithUserDetails,
} from "@/lib/actions/attendance.actions";
import Link from "next/link";
import { useTheme } from "../app/themes/themeContext";



interface AttendanceEntry {
  id: string;
  image: string;
  userId: string;
  clockInTime: Date;
  name: string;
}
interface Props {
  currentUserId: string;
}
const WorkingRemotely = ({ currentUserId }: Props) => {
  const { isDarkMode } = useTheme();
  const [remoteWorkers, setRemoteWorkers] = useState<AttendanceEntry[] | null>(
    null
  );

  // const [currentStatus, setcurrentStatus] = useState(false);

  useEffect(() => {
    const fetchRemoteWorkersForToday = async () => {
      try {
        // const latestEntry = await getLatestAttendanceEntry(currentUserId);
        // const latestExit = await getLatestAttendanceExit(currentUserId);
        // if (
        //   Date.parse(latestExit?.clockOutTime) >
        //   Date.parse(latestEntry?.clockInTime)
        // ) {
        //   setcurrentStatus(false);
        // } else if (
        //   Date.parse(latestEntry?.clockInTime) >
        //   Date.parse(latestExit?.clockOutTime)
        // ) {
        //   setcurrentStatus(true);
        // }
        const entriesForToday =
          await fetchAttendanceEntriesForTodayWithUserDetails();
        const userImage = entriesForToday.map((item) => item.user);
        const uniqueValues = Array.from(
          new Set(userImage.map((item) => item.id))
        );

        // Convert the unique values back to objects if needed
        const uniqueObjects = uniqueValues.map((uniqueId) => {
          return userImage.find((item) => item.id === uniqueId);
        });
        setRemoteWorkers(uniqueObjects);
      } catch (error: any) {
        console.error("Error fetching remote workers for today:", error);
      }
    };

    fetchRemoteWorkersForToday();
  }, []);

  if (remoteWorkers === null) {
    // Loading state or you can display an error message here
    return (
      <div className={isDarkMode?"sm:text-heading4-bold font-semibold sm:text-base text-xs text-light-1":"sm:text-heading4-bold font-semibold sm:text-base text-xs text-dark-1"}>
        Fetching...
      </div>
    );
  }

  return (
    <div className={isDarkMode?"flex flex-col justify-between items-center h-full rounded-xl bg-dark-2 text-light-1":"flex flex-col justify-between items-center h-full rounded-xl bg-light-2 text-dark-1"}>
      <div className="flex items-center w-full justify-between p-5">
        <h1 className="sm:text-heading4-bold font-semibold sm:text-base text-xs">
         Clocked In Users Today
        </h1>
      </div>
      <div className={isDarkMode?"flex justify-between w-full p-5 items-center text-light-1":"flex justify-between w-full p-5 items-center text-dark-1"}>
        <div className="flex flex-col h-full justify-between">
          {remoteWorkers.length > 0 ? (
            <div className="flex w-full md:w-96 md:gap-3 ">
              {remoteWorkers.map((item) => (
                <div key={item.id}>
                  <Link
                    href={`/profile/${item.id}`}
                    className="w-fit cursor-pointer"
                  >
                    <div className="relative">
                      <Image
                        src={item.image}
                        alt="user_logos"
                        width={40}
                        height={40}
                        style={{ border: "2px skyblue solid" }}
                        className="object-cover p-0 rounded-full hover:p-1 hover:ease-in-out"
                      />
                      <Image
                        src="/assets/homy.svg"
                        alt="user_home"
                        width={25}
                        height={25}
                        className="absolute bottom-0 left-0 transform -translate-x-0 translate-y-1"
                      />
                      <p className="text-x-small-semibold ml-8">
                        {item?.name.split(" ")[0]}
                      </p>
                     {/* <> {currentStatus?(<p className="w-2 h-2 bg-green-500 ml-6 rounded-full"></p>):
                      (<p className="w-2 h-2 bg-slate-500 ml-6 rounded-full"></p>)}</> */}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <>
              <h1 className="text-heading4-bold">Everyone is at the office!</h1>
              <h3>No one is working from home today.</h3>
            </>
          )}
        </div>
        <Image
          src="/assets/remoteWork.svg"
          alt="user_logo"
          style={{ filter: "hue-rotate(45deg)" }}
          width={100}
          height={100}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default WorkingRemotely;
