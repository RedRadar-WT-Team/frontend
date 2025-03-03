// Header.js
import { Link, NavLink } from 'react-router-dom';
import Logo from '/src/assets/logo.webp';
import BurgerMenu from '/src/assets/burger_menu.svg';
import './Header.css';

function Header({popOutMenu}) {
  return (
    <main className='header-container'>
      <header>
        <Link to="/">
          <img className='logo' src={Logo} alt="repRadar logo" />
        </Link>

        <h1>RepRadar</h1>
          
        <section className='pop-out-container'>
          <button className='burger-button'>
            <img className='burger-img' src={BurgerMenu} alt="Menu" onClick={popOutMenu}></img>
          </button>
        </section>
      </header>
    </main>
  );
}

export default Header;
