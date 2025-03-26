import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">MERN App</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/create-post">Create Post</Link>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
