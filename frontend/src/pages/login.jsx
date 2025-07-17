import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const response = await fetch('/api/userData/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      // Handle successful login
      if (json.token) {
        // Store the token (e.g., in localStorage) and update the UI
        localStorage.setItem('token', json.token)
        console.log('Login successful')
        navigate('/dashboard')
        // Redirect to the dashboard or another protected page
      } else if (json.mfaRequired) {
        // Handle MFA flow
        console.log('MFA required')
        // Redirect to an MFA verification page
      }
    }
  };

  return (
    <div className='loginCardMaster'>
      <div className='loginCard'>
        <Link to='/'>
          <img className='navLogo' src='/public/pantrypalLogo2-cropped-transparent.png'></img>
        </Link>

        <form className="login" onSubmit={handleSubmit}>
          <h3>Log In</h3>

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

          <button>Log in</button>
          <hr/>
          <p>New to PantryPal?</p>
          <Link to='/register'>
            <p>Create an account</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;