import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, LogOut, Menu, X } from 'lucide-react';
import './StudentDashboard.css';
import Footer from "./Footer";

const StudentDashboard = () => {
  // State management
  const [programs, setPrograms] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch programs data
  const fetchPrograms = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/programs');
      if (!response.ok) {
        throw new Error('Failed to fetch programs');
      }
      const data = await response.json();
      setPrograms(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching programs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  // Handle search
  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  // Filter programs based on search
  const filteredPrograms = programs.filter((program) =>
    program.title.toLowerCase().includes(search) ||
    program.description.toLowerCase().includes(search)
  );

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  // Loading state
  if (loading) {
    return (
      <div className="student-dashboard__error-container">
        <div className="student-dashboard__loading-spinner" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="student-dashboard__error-container">
        <div className="student-dashboard__error-message">
          {error}
          <button 
            onClick={fetchPrograms}
            className="student-dashboard__view-details-btn"
            style={{ marginTop: '1rem' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      {/* Navigation */}
      <nav className={`student-dashboard__navbar ${isNavScrolled ? 'student-dashboard__navbar--scrolled' : ''}`}>
        <div className="student-dashboard__nav-content">
          <div className="student-dashboard__nav-inner">
            <div className="student-dashboard__logo-container">
              <Link to="/">
                <img src="/logo.png" alt="StepIn Logo" className="student-dashboard__logo" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="student-dashboard__desktop-nav">
              <Link to="/dashboard" className="student-dashboard__nav-link student-dashboard__nav-link--active">
                Dashboard
              </Link>
              <Link to="/program" className="student-dashboard__nav-link">
                Programs
              </Link>
              <Link to="/about" className="student-dashboard__nav-link">
                About
              </Link>
              <Link to="/StudentProfile" className="student-dashboard__nav-link">
                Profile
              </Link>
              <button className="student-dashboard__logout-btn" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="student-dashboard__mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="student-dashboard__mobile-menu student-dashboard__mobile-menu--open">
              <Link to="/dashboard" className="student-dashboard__mobile-menu-item">
                Dashboard
              </Link>
              <Link to="/program" className="student-dashboard__mobile-menu-item">
                Programs
              </Link>
              <Link to="/about" className="student-dashboard__mobile-menu-item">
                About
              </Link>
              <Link to="/StudentProfile" className="student-dashboard__mobile-menu-item">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="student-dashboard__mobile-menu-item student-dashboard__logout-btn"
                style={{ width: '100%', textAlign: 'left' }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Video */}
      <div className="student-dashboard__hero">
        <video
          className="student-dashboard__hero-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/V1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="student-dashboard__hero-overlay">
          <div className="student-dashboard__hero-content">
            <h1 className="student-dashboard__hero-title">Welcome to StepIn</h1>
            <p className="student-dashboard__hero-subtitle">
              Discover and participate in amazing programs tailored for students
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="student-dashboard__main">
        {/* Search Section */}
        <div className="student-dashboard__search-container">
          <div className="student-dashboard__search-wrapper">
            <Search className="student-dashboard__search-icon" />
            <input
              type="text"
              className="student-dashboard__search-input"
              placeholder="Search programs by title or description..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Programs Grid */}
        <div className="student-dashboard__program-grid">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <div key={program.id} className="student-dashboard__program-card">
                <div className="student-dashboard__card-header">
                  <h3 className="student-dashboard__card-title">{program.title}</h3>
                </div>
                <div className="student-dashboard__card-content">
                  <div className="student-dashboard__card-section">
                    <div className="student-dashboard__card-label">Description</div>
                    <div className="student-dashboard__card-value">{program.description}</div>
                  </div>
                  <div className="student-dashboard__card-section">
                    <div className="student-dashboard__card-label">Date & Time</div>
                    <div className="student-dashboard__card-value">
                      {program.date} at {program.time}
                    </div>
                  </div>
                  <div className="student-dashboard__card-section">
                    <div className="student-dashboard__card-label">Venue</div>
                    <div className="student-dashboard__card-value">{program.venue}</div>
                  </div>
                  <div className="student-dashboard__card-section">
                    <div className="student-dashboard__card-label">Organizer</div>
                    <div className="student-dashboard__card-value">{program.organizer}</div>
                  </div>
                  <button
                    className="student-dashboard__view-details-btn"
                    onClick={() => navigate(`/ProgramDetails/${program.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="student-dashboard__empty-state">
              <p>No programs found matching your search criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer/> 
    </div>
  );
};

export default StudentDashboard;