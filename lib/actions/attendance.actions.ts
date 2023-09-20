"use server";
import AttendanceEntryModel from "../models/clockin.model";
import AttendanceExitModel from "../models/clockout.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import { getUserDetails } from "./user.actions";

export async function fetchAttendanceEntriesForTodayWithUserDetails() {
  try {
    connectToDB();
    const currentDate = new Date();
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59
    );

    const entries = await AttendanceEntryModel.find({
      clockInTime: { $gte: startOfDay, $lte: endOfDay },
    });

    // Fetch user details for each attendance entry
    const entriesWithUserDetails = await Promise.all(
      entries.map(async (entry) => {
        const user = await getUserDetails(entry.userId);
        return { ...entry.toObject(), user };
      })
    );

    return entriesWithUserDetails;
  } catch (error: any) {
    console.error("Fetch Attendance Entries for Today failed:", error);
    throw new Error(`Fetch Attendance Entries for Today failed: ${error.message}`);
  }
}

export async function clockIn(userId: string, clockInTime: Date, path: string) {
  try {
    connectToDB();
    await AttendanceEntryModel.create({
      userId,
      clockInTime,
    });

    revalidatePath(path);
  } catch (error: any) {
    console.error("Clock In failed:", error);
    throw new Error(`Clock In failed: ${error.message}`);
  }
}

export async function getLatestAttendanceEntry(userId: string) {
  try {
    connectToDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    // Find the latest attendance entry for the given userId for today
    const latestEntry = await AttendanceEntryModel.findOne({
      userId,
      clockInTime: { $gte: today }, // Filter for today's entries
    }).sort({ clockInTime: -1 });

    return latestEntry ? latestEntry.clockInTime : null;
  } catch (error: any) {
    console.error("Get Latest Attendance Entry failed:", error);
    throw new Error(`Get Latest Attendance Entry failed: ${error.message}`);
  }
}

export async function getLatestAttendanceExit(userId: string) {
  try {
    connectToDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    // Find the latest attendance exit for the given userId for today
    const latestExit = await AttendanceExitModel.findOne({
      userId,
      clockOutTime: { $gte: today }, // Filter for today's exits
    }).sort({ clockOutTime: -1 });

    return latestExit ? latestExit.clockOutTime : null;
  } catch (error: any) {
    console.error("Get Latest Attendance Exit failed:", error);
    throw new Error(`Get Latest Attendance Exit failed: ${error.message}`);
  }
}


export async function clockOut(
  userId: string,
  clockOutTime: Date,
  path: string
) {
  try {
    connectToDB();
    await AttendanceExitModel.create({
      userId,
      clockOutTime,
    });

    revalidatePath(path);
  } catch (error: any) {
    console.error("Clock Out failed:", error);
    throw new Error(`Clock Out failed: ${error.message}`);
  }
}
