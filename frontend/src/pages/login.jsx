import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MfaVerification from '../components/MfaVerification';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [userId, setUserId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the location state to prevent the message from re-appearing on refresh
      window.history.replaceState({}, document.title)
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(''); // Clear success message on new login attempt

    const response = await fetch('/api/userData/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      if (json.token) {
        localStorage.setItem('token', json.token);
        navigate('/dashboard');
      } else if (json.mfaRequired) {
        setUserId(json.userId);
        setMfaRequired(true);
      }
    }
  };

  return (
    <div className='loginCardMaster'>
      <div className='loginCard'>
        <Link to='/'>
          <img className='navLogo' src='/pantrypalLogo2-cropped-transparent.png' alt="PantryPal Logo"></img>
        </Link>

        {!mfaRequired ? (
          <form className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>
            {successMessage && <div className="success">{successMessage}</div>}
            {error && <div className="error">{error}</div>}
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
        ) : (
          <MfaVerification userId={userId} />
        )}
      </div>
    </div>
  );
};

export default Login;