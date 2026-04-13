import { useParams, Link } from "react-router-dom";

const HotelDetails = () => {
  const { id } = useParams();
  // Mock data
  const hotel = {
    id: parseInt(id),
    name: "Taj Mahal Palace",
    location: "Mumbai",
    description: "Luxury hotel with 5-star amenities.",
    rating: 4.7,
    image: "https://via.placeholder.com/600x400?text=Hotel+Details",
  };

  return (
    <div className="hotel-details">
      <div className="hotel-header">
        <img src={hotel.image} alt={hotel.name} />
        <div className="hotel-info">
          <h1>{hotel.name}</h1>
          <p>{hotel.location}</p>
          <span className="rating">{hotel.rating} ★</span>
          <p>{hotel.description}</p>
        </div>
      </div>
      <div className="actions">
        <Link to={`/rooms/${id}`} className="btn-primary">
          View Rooms
        </Link>
        <Link to="/hotels" className="btn-secondary">
          Back to Hotels
        </Link>
      </div>
    </div>
  );
};

export default HotelDetails;
