"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  clockIn,
  clockOut,
  getLatestAttendanceEntry,
  getLatestAttendanceExit,
} from "@/lib/actions/attendance.actions";
import { usePathname } from "next/navigation";
import { useTheme } from "../app/themes/themeContext";

interface Props {
  currentUserId: string;
}

const AttendanceCard = ({ currentUserId }: Props) => {
  const pathname = usePathname();
  const { isDarkMode } = useTheme();
  const [time, setTime] = useState(
    new Date().toLocaleTimeString().toUpperCase()
  );
  const [clockedIntime, setclockedIntime] = useState("");
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isClockedOut, setisClockedOut] = useState(false);

  useEffect(() => {
    const checkClockedInStatus = async () => {
      try {
        const latestEntry = await getLatestAttendanceEntry(currentUserId);
        const latestExit = await getLatestAttendanceExit(currentUserId);
        // console.log(latestExit);
        if (
          latestExit &&
          latestExit?.clockOutTime &&
          Date.parse(latestExit?.clockOutTime) >
            Date.parse(latestEntry?.clockInTime)
        ) {
          setIsClockedIn(false);
          setisClockedOut(true);
          setclockedIntime(
            new Date(latestExit.clockOutTime).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })
          );
        } else if (
          latestEntry &&
          latestEntry.clockInTime &&
          Date.parse(latestEntry?.clockInTime) >
            Date.parse(latestExit?.clockOutTime)
          ) {
          // User is already clocked in

          setIsClockedIn(true);
          setclockedIntime(
            new Date(latestEntry.clockInTime).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })
          );
        }
      } catch (error: any) {
        console.error("Error checking clocked in status:", error);
      }
    };

    checkClockedInStatus();
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleClockIn = async () => {
    try {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      await clockIn(currentUserId, currentTime, pathname);
      setIsClockedIn(true);
      setclockedIntime(formattedTime);
      
    } catch (error:any) {
      console.error("Clock In error:", error);
    }
  };

  const handleClockOut = async () => {
    try {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      await clockOut(currentUserId, currentTime, pathname);
      setIsClockedIn(false);
      setisClockedOut(true);
      setclockedIntime(formattedTime);
      
    } catch (error:any) {
      console.error("Clock Out error:", error);
    }
  };

  return (
    <div className={isDarkMode?"flex flex-col justify-between items-center h-full rounded-xl bg-dark-2 text-light-1":"flex flex-col justify-between items-center h-full rounded-xl bg-light-2 text-dark-1"}>
      <div className="flex w-full align-baseline p-5 justify-between">
        {" "}
        <h1 className="sm:text-heading4-bold font-semibold sm:text-base text-xs">
          Time Card
        </h1>
        <p>
          {new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            weekday: "short",
          })}
        </p>
      </div>
      <div className={isDarkMode?"flex justify-between w-full p-5 items-center text-light-1":"flex justify-between w-full p-5 items-center text-dark-1"}>
        <div className="flex flex-col h-full justify-between gap-5 sm:gap-2">
          <div className="text-heading4-bold">Current time</div>
          <div className="text-heading4-bold sm:text-heading3-bold text-primary-500">
            {time}
          </div>

          {isClockedIn && (
            <div className="text-small-semibold mt-2">
              Clocked In -{">"} {""}
              {clockedIntime}{" "}
            </div>
          )}
          {isClockedOut && !isClockedIn && (
            <div className="text-small-semibold mt-2">
              Clocked Out -{">"} {""}
              {clockedIntime}{" "}
            </div>
          )}
        </div>

        {isClockedIn ? (
          <Button
            size="sm"
            className="community-card_btn"
            onClick={handleClockOut}
          >
            Clock Out
          </Button>
        ) : (
          <Button
            size="sm"
            className="community-card_btn"
            onClick={handleClockIn}
          >
            <p className="w-max">Work From Home</p>
          </Button>
        )}
      </div>
    </div>
  );
};

export default AttendanceCard;
