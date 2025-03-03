import { Link, NavLink } from 'react-router-dom';
import './MenuPopUp.css'

function MenuPopUp({popOutLogin, isOpen}) {
  return (
    <main className='popup-container'>
      {isOpen && (
          <div className={`pop-up ${isOpen ? 'open' : ''}`}>
            <ul>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/executive-orders">All Executive Orders</NavLink>
              </li>
              <li>
                <NavLink to="/profile">User Profile</NavLink>
              </li>
              <li>
              <button onClick={popOutLogin} className="login-button">
              Login/Logout
              </button>
              </li>
            </ul>
          </div>
        )}
    </main>
  );
}

export default MenuPopUp;