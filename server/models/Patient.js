import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  phone: String,
  languagePreference: String
});

export default mongoose.model("Patient", patientSchema);
