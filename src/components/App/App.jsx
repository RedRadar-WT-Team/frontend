import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import { useState } from 'react';
// import SearchBar from '../SearchBar/SearchBar';
import Ticker from '../Ticker/Ticker';
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
  
  return (
    <main className='App'>
      <Header />

      <div className='main-content'>
        <div className='searchbar-container'>
          <p>Search bar will go here.</p>
        </div>

        <div className='ticker-container'>
          <Ticker executiveOrders={executiveOrders}/>
        </div>
      </div>
      <Routes>
        {/* Routes will go here */}
        <Route path="/create_account" element={<CreateAccount />} />
      </Routes>
    </main>
  );
}

export default App
