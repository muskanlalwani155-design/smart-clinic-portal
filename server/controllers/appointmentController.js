const Appointment = require('../models/Appointment');
const User = require('../models/User');


const bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, timeSlot, reasonForVisit } = req.body;

    const doctorExists = await User.findOne({ _id: doctorId, role: 'doctor' });
    if (!doctorExists) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const existingSlot = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      status: { $ne: 'cancelled' },
    });

    if (existingSlot) {
      return res.status(400).json({ message: 'This slot is already booked for this doctor' });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      appointmentDate,
      timeSlot,
      reasonForVisit,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getMyAppointments = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === 'patient') {
      filter.patient = req.user._id;
    } else if (req.user.role === 'doctor') {
      filter.doctor = req.user._id;
    }

    const appointments = await Appointment.find(filter)
      .populate('doctor', 'name email phone specialization')
      .populate('patient', 'name email phone')
      .sort({ appointmentDate: 1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (status) appointment.status = status;
    if (notes) appointment.notes = notes;

    await appointment.save();
    res.status(200).json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  updateAppointmentStatus,
};