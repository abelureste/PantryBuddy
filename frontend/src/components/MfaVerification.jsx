import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MfaVerification = ({ userId }) => {
    const [token, setToken] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const response = await fetch('/api/userData/login/mfa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, token }),
        });

        const json = await response.json();

        if (response.ok) {
            localStorage.setItem('token', json.token);
            navigate('/dashboard');
        } else {
            setError(json.error || 'Invalid MFA token.');
        }
    };

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Enter Your MFA Token</h3>
            <label>Authentication Code:</label>
            <input
                type="text"
                onChange={(e) => setToken(e.target.value)}
                value={token}
                placeholder="6-digit code"
            />
            <button type="submit">Verify</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default MfaVerification;