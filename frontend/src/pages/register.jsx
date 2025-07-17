import { useState } from 'react';
import { Link } from 'react-router-dom'


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To display errors from the backend

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    const response = await fetch('/api/userData/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      // Handle successful registration, e.g., redirect to the login page
      console.log('Registration successful', json);
      // You can redirect the user to the login page here
    }
  };


  return (
    <div className='loginCardMaster'>
      <div className='loginCard'>
        <Link to='/'>
          <img className='navLogo' src='/public/pantrypalLogo2-cropped-transparent.png'></img>
        </Link>

        <form className="signup" onSubmit={handleSubmit}>
          <h3>Sign Up</h3>

          <label>Email address:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button>Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;