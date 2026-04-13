import heroImg from "../assets/hero.png";

const Home = () => {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect Stay</h1>
          <p>Book hotels with best prices and amazing deals</p>
          <div className="search-bar">
            <input type="text" placeholder="Search locations..." />
            <button className="btn-primary">Search</button>
          </div>
        </div>
        <img src={heroImg} alt="Hero" className="hero-img" />
      </section>
      <section className="featured">
        <h2>Featured Hotels</h2>
        <div className="hotel-grid">
          {/* Mock hotels */}
          <div className="hotel-card">
            <img src="https://via.placeholder.com/300x200" alt="Hotel" />
            <h3>Taj Hotel</h3>
            <p>Chennai</p>
            <span className="rating">4.5 ★</span>
            <div className="price">$150/night</div>
          </div>
          {/* Repeat for 3-4 cards */}
          <div className="hotel-card">
            <img src="https://via.placeholder.com/300x200" alt="Hotel" />
            <h3>ITC Grand</h3>
            <p>Mumbai</p>
            <span className="rating">4.8 ★</span>
            <div className="price">$200/night</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
