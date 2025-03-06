import { useEffect, useState } from "react";
import './Ticker.css';
import BtnSlider from './BtnSlider';
import featherPenIcon from './icons/feather_pen_svg.svg';

function Ticker( { executiveOrders } ){

  const [tickerIndex, setTickerIndex] = useState(1)

  useEffect(() => {
    if (Array.isArray(executiveOrders) && executiveOrders.length > 0) {
      setTickerIndex(1);
      }
  }, [executiveOrders]);

  // if (!Array.isArray(executiveOrders) || executiveOrders.length === 0) {
  //   return (
  //     <div className="ticker">
  //       <div className="feather-icon">
  //         <img src={featherPenIcon} alt="Feather Pen" />
  //       </div>
  //       <div className="eo-label">EO#</div>
  //       <div className="slide active-anim">
  //         <h2>Loading latest executive orders...</h2>
  //       </div>
  //     </div>
  //   );
  // }

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

        <div className="eo-label"># {executiveOrders[tickerIndex-1]?.attributes?.document_number || executiveOrders[tickerIndex-1]?.document_number || ""}
        </div>

        { executiveOrders.map((order, index) => {

          const orderData = order.attributes || order;

          return (
            <div 
            key={order.id || index}
            className={tickerIndex === index + 1 ? "slide active-anim" : "slide"}>
               <p>{orderData.publication_date}</p>
               <h3>{orderData.title}</h3>
            </div>
          )
        })}
        <BtnSlider moveSlide={nextSlide} direction={"next"}/>
        <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
      </div>    
    )
  }

export default Ticker;