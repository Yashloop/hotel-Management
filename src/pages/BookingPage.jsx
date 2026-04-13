import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookingAPI } from "../services/api";

const BookingPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    guestCount: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const mockRoom = {
    id: parseInt(roomId),
    type: "Premium Double",
    price: 250,
  };

  const calculateTotal = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;
    const days =
      (new Date(formData.checkOutDate) - new Date(formData.checkInDate)) /
      (1000 * 60 * 60 * 24);
    return days * mockRoom.price;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const bookingData = {
        ...formData,
        roomId: mockRoom.id,
        totalPrice: calculateTotal(),
      };
      await bookingAPI.create(bookingData);
      alert("Booking confirmed! (Mock)");
      navigate("/history");
    } catch (err) {
      setError("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <h2>Book {mockRoom.type}</h2>
      <div className="booking-summary">
        <p>${mockRoom.price}/night</p>
      </div>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Check-in Date</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Check-out Date</label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Guests</label>
          <input
            type="number"
            name="guestCount"
            min="1"
            value={formData.guestCount}
            onChange={handleChange}
          />
        </div>
        <div className="total">
          <strong>Total: ${calculateTotal()}</strong>
        </div>
        <button type="submit" disabled={loading} className="btn-primary large">
          {loading ? "Booking..." : `Confirm Booking $${calculateTotal()}`}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
