import { useState } from "react";
// import TickerSlide from '../TickerSlide/TickerSlide';
import './Ticker.css';
import BtnSlider from './BtnSlider' 

function Ticker( { executiveOrders } ){
  return (
      <div className="ticker-container">
        { executiveOrders.map((order, index) => {
          return (
            <div className="slide">
               <h3>{order.title}</h3>
               <p>{order.summary}</p>
               <button>🗑</button>
            </div>
          )
        })}
        <BtnSlider />
        <BtnSlider />
      </div>    
    )
  }

export default Ticker;