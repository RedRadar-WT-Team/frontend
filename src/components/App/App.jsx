import './App.css'
import { Routes, Route, useNavigate, useLocation  } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header';
import MenuPopUp from '../MenuPopUp/MenuPopUp';
import LoginPopUp from '../LoginPopUp/LoginPopUp';
import Homepage from '../Homepage/Homepage';
import CreateAccount from '../CreateAccount/CreateAccount';

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
  const navigate = useNavigate()
  // const location = useLocation()

  function popOutLogin() {
    setIsLoginOpen(!isLoginOpen);
  }

  function popOutMenu() {
    setIsOpen(!isOpen);
  }

  function closeLogin() {
    setIsLoginOpen(!isLoginOpen);
  }

  function navigateToCreate() {
    setIsLoginOpen(!isLoginOpen);
    navigate('/create_account')
  }

  return (
    <main className='App'>
      <Header  popOutMenu={popOutMenu}/>
      <MenuPopUp popOutLogin={popOutLogin} isOpen={isOpen}/>
      <LoginPopUp isLoginOpen={isLoginOpen} closeLogin={closeLogin} navigateToCreate={navigateToCreate}/>

      <section className='content'>
        <Routes>
          <Route path="/" element={<Homepage executiveOrders={executiveOrders}  />} />
          <Route path="/create_account" element={<CreateAccount />} />
        </Routes>
      </section>
      
    </main>
  );
}

export default App
