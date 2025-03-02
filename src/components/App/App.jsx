import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
// import SearchBar from '../SearchBar/SearchBar';
// import Ticker from '../Ticker/Ticker';

function App() {
  return (
    <main className='App'>
      <Header />

      <div className='main-content'>
        <div className='searchbar-container'>
          <p>Search bar will go here.</p>
        </div>

        <div className='ticker-container'>
          <p>Ticker will go here.</p>
        </div>
      </div>

      <Routes>
        {/* Routes will go here */}
      </Routes>
    </main>
  );
}

export default App
