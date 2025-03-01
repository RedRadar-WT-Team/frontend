import { useState } from "react";
// import TickerSlide from '../TickerSlide/TickerSlide'
import './Ticker.css';
import BtnSlider from './BtnSlider' 

function Ticker( { executiveOrders } ){

  const [tickerIndex, setTickerIndex] = useState(1)

  const nextSlide = () => {
    if(tickerIndex !== executiveOrders.length){
      setTickerIndex(tickerIndex + 1)
    }
    else if (tickerIndex === executiveOrders.length) {
      setTickerIndex(1)
    }
  }
 
  const prevSlide = () => {
     
  }

  return (
      <div className="ticker-container">
        { executiveOrders.map((order, index) => {
          return (
            <div 
            key={order.id}
            className={tickerIndex === index + 1 ? "slide active-anim" : "slide"}>
               <h3>{order.title}</h3>
               <p>{order.summary}</p>
               <button>🗑</button>
            </div>
          )
        })}
        <BtnSlider moveSlide={nextSlide} direction={"next"}/>
        <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
      </div>    
    )
  }

export default Ticker;