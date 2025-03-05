// Header.js
import { Link, NavLink } from 'react-router-dom';
import Logo from '/src/assets/logo_transparent_bg.svg';
import BurgerMenu from '/src/assets/burger_menu.svg';
import './Header.css';

function Header({popOutMenu, isOpen}) {
  return (
    <main className='header-container'>
      <header>
        <Link to="/">
          <img className='logo' src={Logo} alt="repRadar logo" />
        </Link>

        <h1>RepRadar</h1>
          
        <section className='pop-out-container'>
          <div className={`${isOpen ? 'slope' : ''}`}></div>
          <button className={`burger-button ${isOpen ? 'open' : ''}`}>
            <img className='burger-img' src={BurgerMenu} alt="Menu" onClick={popOutMenu}></img>
          </button>
          <div className={`${isOpen ? 'slope' : ''}`}></div>
        </section>
      </header>
    </main>
  );
}

export default Header;
