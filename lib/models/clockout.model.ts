import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true,
  },
  clockOutTime: {
    type: Date||null,
    required: true,
  }
});

const AttendanceExitModel = mongoose.models?.ExitAttendanceModel || mongoose.model("ExitAttendanceModel", attendanceSchema);

export default AttendanceExitModel;
