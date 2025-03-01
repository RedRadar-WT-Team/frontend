import React from "react";
import './Ticker.css';
import rightArrow from './icons/right_arrow.png';
import leftArrow from './icons/left_arrow.png';

export default function Btn({direction, moveSlide}) {
  console.log("THE direction: ", direction);
  console.log("FUNCTION moveSlide: ", moveSlide);
  return (
    <button 
    onClick={moveSlide}
    className={direction === "next" ? "btn-slide next" : "btn-slide prev"}>
      <img src={direction === "next" ? rightArrow : leftArrow}/>
    </button>
  )
}