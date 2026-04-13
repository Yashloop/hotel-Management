import { useParams, Link } from "react-router-dom";

const RoomList = () => {
  const { hotelId } = useParams();
  const mockRooms = [
    {
      id: 1,
      type: "Deluxe Single",
      price: 150,
      capacity: 1,
      availability: true,
      amenities: "AC, WiFi",
      image: "https://via.placeholder.com/300x200?text=Deluxe",
    },
    {
      id: 2,
      type: "Premium Double",
      price: 250,
      capacity: 2,
      availability: true,
      amenities: "AC, WiFi, Breakfast",
      image: "https://via.placeholder.com/300x200?text=Premium",
    },
    {
      id: 3,
      type: "Suite",
      price: 400,
      capacity: 4,
      availability: false,
      amenities: "Full amenities",
      image: "https://via.placeholder.com/300x200?text=Suite",
    },
  ];

  return (
    <div className="room-list">
      <h2>Available Rooms</h2>
      <div className="room-grid">
        {mockRooms.map((room) => (
          <div key={room.id} className="room-card">
            <img src={room.image} alt={room.type} />
            <div className="room-info">
              <h3>{room.type}</h3>
              <p>
                Capacity: {room.capacity} | ${room.price}/night
              </p>
              <p>{room.amenities}</p>
              {room.availability ? (
                <Link to={`/book/${room.id}`} className="btn-primary">
                  Book Now
                </Link>
              ) : (
                <span className="unavailable">Not Available</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
