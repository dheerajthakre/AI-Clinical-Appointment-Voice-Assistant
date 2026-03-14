import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctor: String,
  patientId: String,
  time: Date,
  status: {
    type: String,
    default: "booked"
  }
});

export default mongoose.model("Appointment", appointmentSchema);
