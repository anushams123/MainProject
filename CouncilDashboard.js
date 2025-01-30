import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Clock, MapPin, User, LogOut, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './CouncilDashboard.css';

const CouncilDashboard = () => {
  const [programs, setPrograms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProgram, setCurrentProgram] = useState({
    id: null,
    date: "",
    description: "",
    organizer: "",
    time: "",
    title: "",
    venue: "",
  });
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = () => {
    axios
      .get("http://localhost:8080/api/programs")
      .then((response) => setPrograms(response.data))
      .catch((error) => console.error("Error fetching programs:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProgram((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:8080/api/programs/${currentProgram.id}`,
          currentProgram
        );
      } else {
        await axios.post("http://localhost:8080/api/programs", currentProgram);
      }
      fetchPrograms();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving program:", error);
      alert("Failed to save program");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/programs/${id}`);
      fetchPrograms();
    } catch (error) {
      console.error("Error deleting program:", error);
      alert("Failed to delete program");
    }
  };

  const openEditModal = (program) => {
    setCurrentProgram(program);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setCurrentProgram({
      id: null,
      date: "",
      description: "",
      organizer: "",
      time: "",
      title: "",
      venue: "",
    });
    setIsEditMode(false);
  };

  return (
    <div className="dashboard-layout">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo-link">
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="StepIn Logo" className="nav-logo" />
          </Link>
        </div>
        <div className="nav-right">
          <Link to="/StudentDashboard" className="nav-link active">Dashboard</Link>
          <Link to="/Councilprogram" className="nav-link"><Calendar className="w-4 h-4 mr-2" />Programs</Link>
          <Link to="/Councilabout" className="nav-link "><Info className="w-4 h-4 mr-2" />About</Link>
          <Link to="/CouncilProfile" className="nav-link"><User className="w-4 h-4 mr-2" />Profile</Link>
          <button className="logout-btn" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Logout</button>
        </div>
      </nav>
      
      <div className="content">
        <div className="main-header">
          <h1>Council Dashboard</h1>
          <button
            className="create-program-btn"
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
          >
            Create New Program
          </button>
        </div>

        <div className="program-cards">
          {programs.map((program) => (
            <div key={program.id} className="program-card">
              <div className="program-card-header">
                <h3>{program.title}</h3>
              </div>
              <div className="program-card-body">
                <div className="info">
                  <Calendar className="w-4 h-4" />
                  <span>{program.date}</span>
                </div>
                <div className="info">
                  <Clock className="w-4 h-4" />
                  <span>{program.time}</span>
                </div>
                <div className="info">
                  <MapPin className="w-4 h-4" />
                  <span>{program.venue}</span>
                </div>
                <div className="info">
                  <User className="w-4 h-4" />
                  <span>{program.organizer}</span>
                </div>
                <p>{program.description}</p>
              </div>
              <div className="program-card-footer">
                <button onClick={() => openEditModal(program)}>Edit</button>
                <button onClick={() => handleDelete(program.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h2>{isEditMode ? "Edit Program" : "Create New Program"}</h2>
                <button onClick={() => setIsModalOpen(false)}>×</button>
              </div>
              <form onSubmit={handleSubmit} className="modal-form">
                {["title", "description", "date", "time", "venue", "organizer"].map((field) => (
                  <div key={field}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                    <input
                      type={field === "date" ? "date" : field === "time" ? "time" : "text"}
                      name={field}
                      value={currentProgram[field]}
                      onChange={handleInputChange}
                      required={["title", "date", "time", "venue", "organizer"].includes(field)}
                    />
                  </div>
                ))}
                <div className="modal-footer">
                  <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="submit-btn">
                    {isEditMode ? "Update Program" : "Create Program"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouncilDashboard;