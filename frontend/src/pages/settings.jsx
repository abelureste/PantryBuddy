import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const [user, setUser] = useState(null);
    const [showMfaSetup, setShowMfaSetup] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [secret, setSecret] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // state for password change
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // state for pantry stats
    const [stats, setStats] = useState({ totalItemsAdded: 0, itemsExpired: 0 });

    const fetchUserData = async () => {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('/api/userData/user', {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            const json = await response.json();
            if (response.ok) {
                setUser(json);
            } else {
                navigate('/login');
            }
        } catch (err) {
            navigate('/login');
        }
    };
    
    const fetchPantryStats = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('/api/pantryStatsData', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const json = await response.json()

        if (response.ok) {
            setStats(json)
        }
    }


    useEffect(() => {
        fetchUserData();
        fetchPantryStats();
    }, [navigate]);

    const handleEnableMfaClick = async () => {
        setShowMfaSetup(true);
        const authToken = localStorage.getItem('token');
        try {
            const response = await fetch('/api/userData/mfa/setup', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${authToken}` },
            });

            if (response.ok) {
                const data = await response.json();
                setQrCode(data.qrCode);
                setSecret(data.secret);
            } else {
                setError('Failed to start MFA setup.');
                setShowMfaSetup(false);
            }
        } catch (err) {
            setError('An error occurred during MFA setup.');
            setShowMfaSetup(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage('');
        const authToken = localStorage.getItem('token');

        try {
            const response = await fetch('/api/userData/mfa/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setShowMfaSetup(false);
                fetchUserData(); // Re-fetch user data to update MFA status
            } else {
                setError(data.error || 'Invalid MFA token.');
            }
        } catch (err) {
            setError('An error occurred during MFA verification.');
        }
    };

    const handleDisableMfa = async () => {
        if (window.confirm('Are you sure you want to disable Multi-Factor Authentication?')) {
            const authToken = localStorage.getItem('token');
            try {
                const response = await fetch('/api/userData/mfa/disable', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${authToken}` },
                });

                const data = await response.json();

                if (response.ok) {
                    setMessage(data.message);
                    fetchUserData(); // Re-fetch user data to update MFA status
                } else {
                    setError(data.error || 'Failed to disable MFA.');
                }
            } catch (err) {
                setError('An error occurred while disabling MFA.');
            }
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage('');

        if (newPassword !== confirmPassword) {
            setError("New passwords don't match.");
            return;
        }

        const authToken = localStorage.getItem('token');
        try {
            const response = await fetch('/api/userData/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setShowChangePassword(false);
                // Clear password fields
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setError(data.error || 'Failed to change password.');
            }
        } catch (err) {
            setError('An error occurred while changing the password.');
        }
    };

    const handleResetStats = async () => {
        if (window.confirm("Are you sure you want to reset your statistics? This cannot be undone.")) {
            const token = localStorage.getItem('token')
            if (!token) {
                console.error('You must be logged in to reset stats.')
                return;
            }
    
            const response = await fetch('/api/pantryStatsData', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const json = await response.json();
    
            if (response.ok) {
                setStats(json);
                setMessage('Pantry statistics have been reset.');
            } else {
                setError(json.error || 'Failed to reset stats.');
            }
        }
    }


    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="settingsCard">
            <h1>Account Settings</h1>
            {error && <div className="error">{error}</div>}
            {message && <div className="success">{message}</div>}

            <p><strong>Email:</strong> {user.email}</p>

            {/* Change Password Section */}
            {!showChangePassword ? (
                <form><button onClick={() => setShowChangePassword(true)}>Change Password</button></form>
            ) : (
                <div className="changePasswordContainer">
                    <h2>Change Your Password</h2>
                    <form onSubmit={handleChangePassword}>
                        <label>Current Password:</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <label>Confirm New Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Update Password</button>
                        <button type="button" onClick={() => setShowChangePassword(false)} className="cancelButton">Cancel</button>
                    </form>
                </div>
            )}

            <hr style={{margin: '20px 0'}} />

            {/* MFA Section */}
            <p><strong>MFA Status:</strong> {user.mfaEnabled ? 'Enabled' : 'Disabled'}</p>
            {user.mfaEnabled ? (
                <form><button onClick={handleDisableMfa} className="disableButton">Disable Multi-Factor Authentication</button></form>
            ) : (
                !showMfaSetup && <form><button onClick={handleEnableMfaClick}>Enable Multi-Factor Authentication</button></form>
            )}

            {showMfaSetup && (
                <div className="mfaSetupContainer">
                    <h2>Set Up Multi-Factor Authentication</h2>
                    {qrCode && (
                        <div className="qrCodeContainer">
                            <p>1. Scan this QR code with your authenticator app:</p>
                            <img src={qrCode} alt="MFA QR Code" />
                            <p>Or manually enter this code: <strong>{secret}</strong></p>
                        </div>
                    )}
                    <form onSubmit={handleVerify}>
                        <label>2. Enter the code from your authenticator app:</label>
                        <input
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            required
                            placeholder="6-digit token"
                        />
                        <button type="submit">Verify & Enable MFA</button>
                        <button type="button" onClick={() => setShowMfaSetup(false)} className="cancelButton">Cancel</button>
                    </form>
                </div>
            )}

            <hr style={{margin: '20px 0'}} />

            {/* Pantry Statistics Section */}
            <div className="pantryStatsContainer">
                <p><strong>Pantry Statistics</strong></p>
                <form>
                    <button type="button" onClick={handleResetStats} className="disableButton">Reset Statistics</button>
                </form>
            </div>
        </div>
    );
};

export default Settings;