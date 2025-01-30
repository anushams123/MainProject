// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Signup.css"; // Ensure this is linked correctly.

// function Signup() {
//   const [step, setStep] = useState(1); // Track the step (1: Role selection, 2: Form)
//   const [usrFirstName, setFirstName] = useState("");
//   const [usrLastName, setLastName] = useState("");
//   const [usrEmailId, setEmailId] = useState("");
//   const [usrPhNo, setPhNo] = useState("");
//   const [usrBatch, setBatch] = useState("");
//   const [usrLoginPassword, setLoginPassword] = useState("");
//   const [usrCPassword, setCPassword] = useState("");
//   const [role, setRole] = useState(""); // Role selection state
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Email validation
//   function isValidEmail(email) {
//     const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return regex.test(email);
//   }

//   // Password validation with special character check
//   function isValidPassword(password) {
//     const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
//     return regex.test(password);
//   }

//   function handleRoleSelection(selectedRole) {
//     setRole(selectedRole);
//     setStep(2); // Move to the next step (registration form)
//   }

//   function addUser() {
//     setError("");

//     // Check if all fields are filled
//     if (!usrFirstName || !usrLastName || !usrEmailId || !usrPhNo || !usrBatch || !usrLoginPassword || !usrCPassword || !role) {
//       setError("Please fill out all fields.");
//       return;
//     }

//     // Check if phone number is exactly 10 digits
//     if (!/^\d{10}$/.test(usrPhNo)) {
//       setError("Phone number must be exactly 10 digits.");
//       return;
//     }

//     // Check if email is valid
//     if (!isValidEmail(usrEmailId)) {
//       setError("Please enter a valid email.");
//       return;
//     }

//     // Check if password meets the criteria
//     if (!isValidPassword(usrLoginPassword)) {
//       setError("Password must be at least 8 characters long and contain at least one number, one letter, and one special character.");
//       return;
//     }

//     // Check if password and confirm password match
//     if (usrLoginPassword !== usrCPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     // Prepare the user data (sending plain password)
//     const userData = {
//       firstName: usrFirstName,
//       lastName: usrLastName,
//       emailId: usrEmailId,
//       phNo: usrPhNo,
//       batch: usrBatch,
//       loginPassword: usrLoginPassword,
//       role: role,
//     };

//     console.log("User data being sent:", userData); // Debugging log

//     // Send user data to the backend
//     axios
//       .post("http://localhost:8080/api/save", userData)
//       .then((res) => {
//         navigate("/userdashboard");
//       })
//       .catch((error) => {
//         console.error("Error adding user:", error);
//         const serverError = error.response?.data?.message || "Failed to register user. Please try again later.";
//         setError(serverError);
//       });
//   }

//   function cancelForm() {
//     setStep(1); // Go back to the role selection step
//     setRole(""); // Reset role selection
//     resetForm();
//   }

//   function resetForm() {
//     setFirstName("");
//     setLastName("");
//     setEmailId("");
//     setPhNo("");
//     setBatch("");
//     setLoginPassword("");
//     setCPassword("");
//     setError("");
//   }

//   return (
//     <div className="container2">
//       <center>
//         <div id="form">
//           <h2>{step === 1 ? "Select Your Role" : "Register"}</h2>

//           {step === 1 ? (
//             // Step 1: Role Selection
//             <div>
//               <button className="role-button" onClick={() => handleRoleSelection("student")}>Student</button>
//               <button className="role-button" onClick={() => handleRoleSelection("council")}>Council Member</button>
//             </div>
//           ) : (
//             // Step 2: Registration Form
//             <form>
//               <div className="form-group">
//                 <label>First Name:</label>
//                 <input
//                   type="text"
//                   placeholder="Enter your first name"
//                   value={usrFirstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Last Name:</label>
//                 <input
//                   type="text"
//                   placeholder="Enter your last name"
//                   value={usrLastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Email ID:</label>
//                 <input
//                   type="text"
//                   placeholder="Enter your email ID"
//                   value={usrEmailId}
//                   onChange={(e) => setEmailId(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Phone Number:</label>
//                 <input
//                   type="number"
//                   placeholder="Enter your phone number"
//                   value={usrPhNo}
//                   onChange={(e) => setPhNo(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Batch:</label>
//                 <input
//                   type="text"
//                   placeholder="Enter your batch"
//                   value={usrBatch}
//                   onChange={(e) => setBatch(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Password:</label>
//                 <input
//                   type="password"
//                   placeholder="Enter a password"
//                   value={usrLoginPassword}
//                   onChange={(e) => setLoginPassword(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Confirm Password:</label>
//                 <input
//                   type="password"
//                   placeholder="Re-enter password"
//                   value={usrCPassword}
//                   onChange={(e) => setCPassword(e.target.value)}
//                 />
//               </div>
//               {error && <div style={{ color: "red" }}>{error}</div>}
//               <div className="form-buttons">
//                 <button type="button" onClick={addUser}>Register</button>
//                 <button type="button" onClick={cancelForm} style={{ marginLeft: "10px" }}>Cancel</button>
//               </div>
//             </form>
//           )}
//         </div>
//       </center>
//     </div>
//   );
// }

// export default Signup;




import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [batch, setBatch] = useState("");
  const [course, setCourse] = useState(""); // New course state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@mariancollege\.org$/;
    return regex.test(email);
  }

  function isValidPassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{10,}$/;
    return regex.test(password);
  }

  function addUser() {
    setError("");

    if (!firstName || !lastName || !email || !phoneNumber || !batch || !course || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please use a valid Marian College email (anusha.22ubc216@mariancollege.org).");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 10 characters long and contain at least one number, one letter, and one special character.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userData = {
      fullname: firstName,
      lastname: lastName,
      email: email,
      phNo: phoneNumber,
      batch: batch,
      course: course, // Added course to user data
      password: password,
    };

    console.log("User data being sent:", userData);

    axios
      .post("http://localhost:8080/api/save", userData)
      .then((res) => {
        setUsers([...users, res.data]);
        navigate("/StudentDashboard");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        const serverError = error.response?.data?.message || "Failed to register user. Please try again later.";
        setError(serverError);
      });
  }

  function cancelForm() {
    resetForm();
  }

  function resetForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setBatch("");
    setCourse(""); // Reset course field
    setPassword("");
    setConfirmPassword("");
    setError("");
  }

  return (
    <div className="container2"
    style={{
      background: `url('/pic2.jpg') no-repeat center center fixed`,
      backgroundSize: 'cover',
    }}>
      <center>
        <div id="form">
          <h2>Register</h2>

          <form>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email ID:</label>
              <input
                type="text"
                placeholder="Enter your Marian College email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="number"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Batch:</label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                required
              >
                <option value="">Select Batch</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <div className="form-group">
              <label>Course:</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              >
                <option value="">Select Course</option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="BSc">BSc</option>
                <option value="BCom">BCom</option>
                <option value="BA">BA</option>
              </select>
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div className="form-buttons">
              <button type="button" onClick={addUser}>Register</button>
              <button type="button" onClick={cancelForm} style={{ marginLeft: "10px" }}>Cancel</button>
            </div>
          </form>
        </div>
      </center>
    </div>
  );
}

export default Signup;