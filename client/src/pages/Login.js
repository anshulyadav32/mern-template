import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Demo login - in a real app this would be an API call
    setTimeout(() => {
      // Mock successful login
      const userData = {
        id: '123',
        name: 'Demo User',
        email,
        token: 'mock-jwt-token',
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Logged in successfully');
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-page">
      <section className="heading">
        <h1>Login</h1>
        <p>Sign in to your account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
