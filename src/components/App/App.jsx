import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import { useState } from 'react';
// import SearchBar from '../SearchBar/SearchBar';
import Ticker from '../Ticker/Ticker';
import { Link, NavLink } from 'react-router-dom';

function App() {
  const dummyExecutiveOrders = [
    {id: 1000, title: "Zoo Dress Code", summary: "Walruses must wear pants."}, 
    {id: 2000, title: "Ice Scream", summary: "Mandatory screaming upon consumption of Mint Chocolate Chip Ice Cream on Thursdays."}, 
    {id: 3000, title: "Middle Name Penalty", summary: "Those with a middle 'L' initial must walk backwards all day on the Sabbath."},
    {id: 4000, title: "Bye Bye Cap'n Crunch", summary: "If you like Cap'n Crunch, no more Cap'n Crunch for you."},
    {id: 5000, title: "Cuz 'Mercuh", summary: "Fireworks at 3:30 am. Everyday. Even Saturdays."}
  ]
  const [executiveOrders, setExecutiveOrders] = useState(dummyExecutiveOrders);
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  function popOutLogin() {
    setIsLoginOpen(!isLoginOpen);
  }

  function popOutMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <main className='App'>
      <Header  popOutMenu={popOutMenu}/>
      
      <div className='main-content'>
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
      {isLoginOpen && (
          <div className={`pop-up-login ${isLoginOpen ? 'open' : ''}`}>
           <ul>
             <p>Welcome!</p>
             <input type="text" placeholder="Enter your username" className="username-input" />
             <button className='signin-button'>Sign In</button>
             <p>Dont have an account? Create one here!</p>
            </ul>
          </div>
        )}
        <div className='searchbar-container'>
          <p>Search bar will go here.</p>
        </div>

        <div className='ticker-container'>
          <Ticker executiveOrders={executiveOrders}/>
        </div>
      </div>
      <Routes>
        {/* Routes will go here */}
      </Routes>
    </main>
  );
}

export default App
