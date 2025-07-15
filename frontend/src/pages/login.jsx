import { useState } from 'react';
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform login logic here, e.g., send a request to your backend
    console.log(email, password);
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