import "./Homepage.css";
import {useState} from 'react';
import Ticker from '../Ticker/Ticker';
// import SearchBar from '../SearchBar/SearchBar';

function Homepage({executiveOrders}) {
    return(
        <section className="homepage">
            <div className='searchbar-container'>
                <p>Search bar will go here.</p>
            </div>

            <div className='ticker-container'>
                <Ticker executiveOrders={executiveOrders}/>
            </div>
        </section>    
    );
}

export default Homepage