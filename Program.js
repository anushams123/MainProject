import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
//import Navbar from "./Navbar";
import "./Program.css";
import Footer from "./Footer";

const Program = () => {
  const [programs, setPrograms] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/programs");
        setPrograms(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching programs:", error);
        setError("Failed to fetch programs. Please try again later.");
      }
    };
    fetchPrograms();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredPrograms = programs.filter((program) =>
    program.title.toLowerCase().includes(search)
  );

  if (error) {
    return (
      <div className="program-error-container">
        <div className="program-error-message">{error}</div>
      </div>
    );
  }

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="program-dashboard-layout">
      {/* Navigation Bar */}
      <nav className="program-navbar">
        <div className="program-nav-left">
          <Link to="/" className="logo-link">
            <img src="/logo.png" alt="StepIn Logo" className="program-nav-logo" />
          </Link>
        </div>
        <div className="program-nav-right">
          <Link to="/StudentDashboard" className="program-nav-link">Dashboard</Link>
          <Link to="/program" className="program-nav-link active">Programs</Link>
          <Link to="/about" className="program-nav-link">About</Link>
          <Link to="/StudentProfile" className="program-nav-link">Profile</Link>
          <button className="program-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div 
        className="program-hero-section"
        style={{
          backgroundImage: "url('/pic3.jpg')",
        }}
      >
        <div className="program-hero-overlay">
          <div className="program-hero-content">
            <h1 className="program-hero-title">
              Discover  Programs
            </h1>
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="program-search-container">
          <div className="program-search-input-wrapper">
            <span className="program-search-icon">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              type="text"
              className="program-search-input"
              placeholder="Search programs..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="program-grid">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <div key={program.id} className="program-card">
                <div className="program-card-header">
                  <h3 className="program-card-title">{program.title}</h3>
                </div>
                <div className="program-card-content">
                  <div className="program-detail">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value">{program.description}</span>
                  </div>
                  <div className="program-detail">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{program.date}</span>
                  </div>
                  <div className="program-detail">
                    <span className="detail-label">Time:</span>
                    <span className="detail-value">{program.time}</span>
                  </div>
                  <div className="program-detail">
                    <span className="detail-label">Venue:</span>
                    <span className="detail-value">{program.venue}</span>
                  </div>
                  <div className="program-detail">
                    <span className="detail-label">Organizer:</span>
                    <span className="detail-value">{program.organizer}</span>
                  </div>
                  <button
                    className="program-view-details-button"
                    onClick={() => navigate(`/ProgramDetails/${program.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center p-8">
              <p className="text-gray-500 text-lg">No programs found.</p>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Program;
