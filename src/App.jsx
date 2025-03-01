import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Logo from './assets/logo.webp'
import burger from './assets/burger_menu.svg'
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
      <Routes>
          {/* <Route path="/" element={<Home />}/> */}
        </Routes>
    </main>
  )
}

export default App
