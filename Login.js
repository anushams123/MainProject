// import React, { useState } from 'react';
// import axios from 'axios';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

// //   // Async function to hash password
// //   const hashPassword = async (password) => {
// //     const encoder = new TextEncoder();
// //     const data = encoder.encode(password);
// //     const hashBuffer = await crypto.subtle.digest('SHA-256', data);
// //     const hashArray = Array.from(new Uint8Array(hashBuffer));
// //     return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
// //   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
  
//     if (!email || !password) {
//       setError('Please enter both email and password');
//       return;
//     }
  
//     try {
//       const response = await axios.post('http://localhost:8080/api/login', {
//         email,
//         password, // Send the raw password directly
//       });
  
//       const { role, token } = response.data;
  
//       // Save the auth token
//       localStorage.setItem('authToken', token);
  
//       // Navigate based on user role
//       if (role.toLowerCase() === 'student') {
//         navigate('/StudentDashboard');
//       } else if (role.toLowerCase() === 'council') {
//         navigate('/council-dashboard');
//       } else {
//         setError('Invalid user role');
//       }
//     } catch (err) {
//       setError(err.response?.data || 'Login failed. Please try again.');
//     }
//   };
  

//   return (
//     <div className="login-container" style={{ background: url('Marian_College_Kuttikanam.jpg')}}>
//       <form onSubmit={handleLogin}>
//         <h2>Login</h2>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             required
//           />
//         </div>
//         {error && <div className="error-message">{error}</div>}
//         <button type="submit">Login</button>
//         <div className="signup-link">
//           Don't have an account? <a href="/signup">Sign Up</a>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
      });

      const { role, token, userId } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);

      if (role.toLowerCase() === 'student') {
        navigate('/StudentDashboard');
      } else if (role.toLowerCase() === 'council') {
        navigate('/councilDashboard');
      } else {
        setError('Invalid user role');
      }
    } catch (err) {
      setError(err.response?.data || 'Login failed. Please try again.');
    }
  };

  return (
    <div
      className="login-container"
      style={{
        background: `url('/pic.jpg') no-repeat center center fixed`,
        backgroundSize: 'cover',
      }}
    >
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <img src="logo.png" alt="Logo" className="logo" />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
        <div className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
        <div className="forgot-password">
          <a href="/ForgetPassword">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
