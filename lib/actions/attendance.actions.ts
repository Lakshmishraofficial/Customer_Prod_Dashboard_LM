"use server";
import AttendanceEntryModel from "../models/clockin.model";
import AttendanceExitModel from "../models/clockout.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

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

    // Find the latest attendance entry for the given userId
    const latestEntry = await AttendanceEntryModel.findOne({ userId }).sort({
      clockInTime: -1,
    });

    return latestEntry;
  } catch (error: any) {
    console.error("Get Latest Attendance Entry failed:", error);
    throw new Error(`Get Latest Attendance Entry failed: ${error.message}`);
  }
}

export async function getLatestAttendanceExit(userId: string) {
  try {
    connectToDB();

    // Find the latest attendance entry for the given userId
    const latestEntry = await AttendanceExitModel.findOne({ userId }).sort({
      clockOutTime: -1,
    });

    return latestEntry;
  } catch (error: any) {
    console.error("Get Latest Attendance Entry failed:", error);
    throw new Error(`Get Latest Attendance Entry failed: ${error.message}`);
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
