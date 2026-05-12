import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils'; // Check kariyega aapka path yahi hai na
function Navbar({ user }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };
    return (
        <nav style={navStyle}>
            <div className="nav-logo">
                <h2 style={{ margin: 0, color: '#8b3dff' }}>Expensify</h2>
            </div>
            <div style={navLinks}>
               <span
    style={{
        marginRight: '20px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        fontSize: '28px'
    }}
>
                    Welcome, {user}
                </span>
                <button onClick={handleLogout} style={logoutBtn}>Logout</button>
            </div>
        </nav>
    );
}

// Chhote se inline styles (Aap baad mein CSS mein move kar sakte hain)

const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
};

const navLinks = {
    display: 'flex',
    alignItems: 'center'
};

const logoutBtn = {
    backgroundColor: '#8b3dff',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer'
};

export default Navbar;