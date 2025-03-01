import { useState } from 'react'
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Logo from '/src/assets/logo.webp'
import burger from '/src/assets/burger_menu.svg'
import './App.css'

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
          <img className='burger-img' src={burger} onClick={popOutMenu}></img>
          </button>
          {isOpen && (
            <div className='pop-up'>
              <ul>
                <li>About</li>
                <li>All EO's</li>
                <li>My Profile</li>
                <li>Login/Logout</li>
              </ul>
            </div>
          )}
        </section>
      </header>
      
      <div className='searchbar-container'></div>

      <div className='ticker-container'></div>


      <Routes>
          {/* routes will go here once set up */}
      </Routes>
    </main>
  );
}

export default App
