import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import { Calendar, Clock, PlusCircle } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bookingData, setBookingData] = useState({
    doctorId: '',
    appointmentDate: '',
    timeSlot: '10:00 AM - 10:30 AM',
    reasonForVisit: '',
  });
  const [bookMsg, setBookMsg] = useState({ type: '', text: '' });

  const fetchData = async () => {
    try {
      const resAppt = await API.get('/appointments/my');
      setAppointments(resAppt.data);

      if (user.role === 'patient') {
        const resDocs = await API.get('/auth/doctors');
        setDoctors(resDocs.data);
        if (resDocs.data.length > 0) {
          setBookingData((prev) => ({ ...prev, doctorId: resDocs.data[0]._id }));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookMsg({ type: '', text: '' });

    try {
      await API.post('/appointments', bookingData);
      setBookMsg({ type: 'success', text: 'Appointment booked successfully!' });
      setBookingData({ ...bookingData, reasonForVisit: '' });
      fetchData(); // refresh list
    } catch (err) {
      setBookMsg({
        type: 'error',
        text: err.response?.data?.message || 'Booking failed.',
      });
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.patch(`/appointments/${id}/status`, { status });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Status update failed.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}</h1>
        <p>Logged in as: <strong>{user.role.toUpperCase()}</strong></p>
      </div>

      <div className={user.role === 'patient' ? "dashboard-grid" : ""}>
        {/* Patient Only: Booking Form */}
        {user.role === 'patient' && (
          <div className="card">
            <h2 className="card-title"><PlusCircle size={20} /> Book Appointment</h2>
            {bookMsg.text && (
              <div className={bookMsg.type === 'error' ? "auth-error" : "badge-confirmed"} style={{ padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px' }}>
                {bookMsg.text}
              </div>
            )}
            <form onSubmit={handleBookingSubmit} className="auth-form">
              <div className="form-group">
                <label>Select Doctor</label>
                <select
                  value={bookingData.doctorId}
                  onChange={(e) => setBookingData({ ...bookingData, doctorId: e.target.value })}
                  required
                >
                  {doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.name} ({doc.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={bookingData.appointmentDate}
                  onChange={(e) => setBookingData({ ...bookingData, appointmentDate: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Time Slot</label>
                <select
                  value={bookingData.timeSlot}
                  onChange={(e) => setBookingData({ ...bookingData, timeSlot: e.target.value })}
                >
                  <option>10:00 AM - 10:30 AM</option>
                  <option>11:00 AM - 11:30 AM</option>
                  <option>02:00 PM - 02:30 PM</option>
                  <option>04:00 PM - 04:30 PM</option>
                </select>
              </div>

              <div className="form-group">
                <label>Reason for Visit</label>
                <input
                  type="text"
                  placeholder="e.g. Fever, dental pain"
                  value={bookingData.reasonForVisit}
                  onChange={(e) => setBookingData({ ...bookingData, reasonForVisit: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="auth-submit-btn">Confirm Booking</button>
            </form>
          </div>
        )}

        {/* Appointments List (Visible to both Patient & Doctor) */}
        <div className="card">
          <h2 className="card-title">
            <Calendar size={20} />
            {user.role === 'patient' ? 'My Booked Appointments' : 'Patient Appointments Schedule'}
          </h2>

          {loading ? (
            <p>Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p style={{ color: '#64748b' }}>No appointments scheduled yet.</p>
          ) : (
            appointments.map((appt) => (
              <div key={appt._id} className="appointment-item">
                <div className="appointment-header">
                  <strong>
                    {user.role === 'patient'
                      ? `Doctor: ${appt.doctor?.name}`
                      : `Patient: ${appt.patient?.name} (${appt.patient?.phone || 'No phone'})`}
                  </strong>
                  <span className={`badge badge-${appt.status}`}>{appt.status}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#475569', margin: '0.2rem 0' }}>
                  <Clock size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  {new Date(appt.appointmentDate).toLocaleDateString()} | {appt.timeSlot}
                </p>
                <p style={{ fontSize: '0.85rem', color: '#334155' }}>
                  <strong>Reason:</strong> {appt.reasonForVisit}
                </p>

                {/* Doctor Only Action Buttons */}
                {user.role === 'doctor' && appt.status === 'pending' && (
                  <div className="status-actions">
                    <button
                      onClick={() => handleStatusUpdate(appt._id, 'confirmed')}
                      className="btn-confirm"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(appt._id, 'cancelled')}
                      className="btn-cancel"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;