import { useState, useEffect } from "react";
import { bookingAPI } from "../services/api";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await bookingAPI.getHistory();
      setBookings(data.data || mockBookings);
    } catch (err) {
      setBookings(mockBookings);
    } finally {
      setLoading(false);
    }
  };

  const mockBookings = [
    {
      id: 1,
      hotel: "Taj Palace",
      room: "Deluxe",
      checkIn: "2024-04-20",
      checkOut: "2024-04-25",
      total: 750,
      status: "Confirmed",
    },
    {
      id: 2,
      hotel: "ITC",
      room: "Suite",
      checkIn: "2024-05-01",
      checkOut: "2024-05-03",
      total: 800,
      status: "Cancelled",
    },
  ];

  if (loading) return <div className="loading">Loading history...</div>;

  return (
    <div className="booking-history">
      <h2>Your Booking History</h2>
      <div className="history-grid">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <h3>
              {booking.hotel} - {booking.room}
            </h3>
            <p>
              {booking.checkIn} to {booking.checkOut}
            </p>
            <p>Total: ${booking.total}</p>
            <span className={`status ${booking.status.toLowerCase()}`}>
              {booking.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
