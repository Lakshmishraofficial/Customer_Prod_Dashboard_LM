import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true,
  },
  clockInTime: {
    type: Date||null,
    required: true,
  }
});

const AttendanceEntryModel = mongoose.models?.AttendanceModel || mongoose.model("AttendanceModel", attendanceSchema);

export default AttendanceEntryModel;
