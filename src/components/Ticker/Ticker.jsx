import { useState } from "react";
import './Ticker.css';
import BtnSlider from './BtnSlider';
import featherPenIcon from './icons/feather_pen_svg.svg';

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
    if(tickerIndex !== 1){
      setTickerIndex(tickerIndex - 1)
    }
    else if (tickerIndex === 1) {
      setTickerIndex(executiveOrders.length)
    }
  }

  return (
      <div className="ticker">

        <div className="feather-icon">
          <img src={featherPenIcon} alt="Feather Pen" />
        </div>

        <div className="eo-label">EO#</div>

        { executiveOrders.map((order, index) => {
          return (
            <div 
            key={order.id}
            className={tickerIndex === index + 1 ? "slide active-anim" : "slide"}>
               <h2>{order.title}</h2>
               <p>{order.summary}</p>
            </div>
          )
        })}
        <BtnSlider moveSlide={nextSlide} direction={"next"}/>
        <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
      </div>    
    )
  }

export default Ticker;