import "./Homepage.css";
import {useState} from 'react';
import Ticker from '../Ticker/Ticker';
import SearchBar from '../SearchBar/SearchBar';

function Homepage({executiveOrders, getRepData}) {
    return(
        <section className="homepage">
            <div className='searchbar-container' >
                <SearchBar getRepData={getRepData}/>
            </div>

            <div className='ticker-container'>
                <Ticker executiveOrders={executiveOrders}/>
            </div>
        </section>    
    );
}

export default Homepage;
