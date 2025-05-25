import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', gap: 20, padding: 16, borderBottom: '1px solid #eee', alignItems: 'center' }}>
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
      {user && <Link to="/orders">Orders</Link>}
      <div style={{ marginLeft: 'auto' }}>
        {user ? (
          <>
            <span style={{ marginRight: 12 }}>Hello, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" style={{ marginLeft: 12 }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 