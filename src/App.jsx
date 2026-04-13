import { useState, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import HotelList from "./pages/HotelList";
import HotelDetails from "./pages/HotelDetails";
import RoomList from "./pages/RoomList";
import BookingPage from "./pages/BookingPage";
import BookingHistory from "./pages/BookingHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

const AuthContext = createContext();

export { AuthContext };

const App = () => {
  const [user, setUser] = useState(null);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = { user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hotels" element={<HotelList />} />
              <Route path="/hotels/:id" element={<HotelDetails />} />
              <Route path="/rooms/:hotelId" element={<RoomList />} />
              <Route path="/book/:roomId" element={<BookingPage />} />
              <Route path="/bookings" element={<BookingHistory />} />
              <Route path="/history" element={<BookingHistory />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
