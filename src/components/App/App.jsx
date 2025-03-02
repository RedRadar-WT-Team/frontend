import { useState } from 'react'
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Logo from '/src/assets/logo.webp'
import burger from '/src/assets/burger_menu.svg'
import './App.css'

// import SearchBar from './components/SearchBar';
// import Ticker from './components/Ticker';

function App() {
  const [isOpen, setIsOpen] = useState(false)

  function popOutMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <main className='App'>
      <header>
        <img src={Logo} alt='repRadar logo'></img>
        <h1>RepRadar</h1>
        <section className='pop-out-container'>
          <button className='burger-button'>
          <img className='burger-img' src={burger} alt="Menu" onClick={popOutMenu}></img>
          </button>
          {isOpen && (
            <div className={`pop-up ${isOpen ? 'open' : ''}`}>
              <ul>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink to="/all-eos">All EO's</NavLink>
                </li>
                <li>
                  <NavLink to="/profile">My Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login/Logout</NavLink>
                </li>
              </ul>

            </div>
          )}
        </section>
      </header>
      
      <div className='main-content'>
        <div className='searchbar-container'>
          <p>Search bar will go here.</p>
        </div>

        <div className='ticker-container'>
          <p>Ticker will go here.</p>
        </div>
      </div>

      <Routes>
        {/* <Route path="/about" element={<About />} />
        <Route path="/eos" element={<AllEos />} />
        <Route path="/user" element={<Profile />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>

    </main>
  );
}

export default App
