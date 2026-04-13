import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { hotelAPI } from "../services/api";

const HotelList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("location") || "");

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const data = await hotelAPI.getAll();
      setHotels(data.data || mockHotels);
    } catch (err) {
      console.error(err);
      setHotels(mockHotels);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      setSearchParams({ location: search });
      // Trigger search API
    }
  };

  const mockHotels = [
    {
      id: 1,
      name: "Taj Mahal Palace",
      location: "Mumbai",
      rating: 4.7,
      image: "https://via.placeholder.com/300x200?text=Taj",
    },
    {
      id: 2,
      name: "ITC Grand Chola",
      location: "Chennai",
      rating: 4.8,
      image: "https://via.placeholder.com/300x200?text=ITC",
    },
    {
      id: 3,
      name: "Oberoi",
      location: "Delhi",
      rating: 4.6,
      image: "https://via.placeholder.com/300x200?text=Oberoi",
    },
  ];

  if (loading) return <div className="loading">Loading hotels...</div>;

  return (
    <div className="hotel-list">
      <div className="search-section">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            Search
          </button>
        </form>
      </div>
      <div className="hotel-grid">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <img src={hotel.image} alt={hotel.name} />
            <div className="card-content">
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
              <span className="rating">{hotel.rating} ★</span>
              <Link to={`/hotels/${hotel.id}`} className="btn-primary">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
