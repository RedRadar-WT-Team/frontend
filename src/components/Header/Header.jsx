// Header.js
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '/src/assets/logo.webp';
import BurgerMenu from '/src/assets/burger_menu.svg';
import './Header.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  function popOutMenu() {
    setIsOpen(!isOpen);
  }

  return (
      <header>
        <Link to="/">
          <img className='logo' src={Logo} alt="repRadar logo" />
        </Link>

        <h1>RepRadar</h1>
          
        <section className='pop-out-container'>
          <button className='burger-button'>
            <img className='burger-img' src={BurgerMenu} alt="Menu" onClick={popOutMenu}></img>
          </button>

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
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              </ul>
            </div>
          )}
        </section>
      </header>
  );
}

export default Header;