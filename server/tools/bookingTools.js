import Appointment from "../models/Appointment.js";

export async function checkAvailability(doctor, time) {

  const existing = await Appointment.findOne({
    doctor,
    time
  });

  if (existing) {
    return {
      available: false,
      message: "Slot unavailable"
    };
  }

  return {
    available: true
  };
}

export async function bookAppointment(patientId, doctor, time) {

  /*const slot = await checkAvailability(doctor, time);

  if (!slot.available) {
    return "Slot already booked. Try another time.";
  }

  await Appointment.create({
    patientId,
    doctor,
    time
  });

  return `Appointment booked with ${doctor} at ${time}`;*/
  const existing = await Appointment.findOne({
    doctor,
    time
  });

  if (existing) {

    return {
      text: "Slot unavailable. Try another time."
    };

  }

  const appointment = new Appointment({
    patientId,
    doctor,
    time
  });

  await appointment.save();

  return {
    text: `Appointment booked for ${doctor} at ${time.toLocaleString()}`
  };
}
