import { Link, NavLink } from 'react-router-dom';
import './MenuPopUp.css'

function MenuPopUp({popOutLogin, isOpen, showAllExecutiveOrders}) {
  return (
    <main className={`popup-container ${!isOpen ? 'hidden' : ''}`}>
      {isOpen && (
          <div className={`pop-up ${isOpen ? 'open' : ''}`}>
            <ul>
              <li className="link">
                <NavLink to="/about">About</NavLink>
              </li>
              <li className="link">
                <NavLink onClick={showAllExecutiveOrders}>All Executive Orders</NavLink>
              </li>
              <li className="link">
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