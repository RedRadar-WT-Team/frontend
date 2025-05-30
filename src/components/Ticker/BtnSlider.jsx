import React from "react";
import './Ticker.css';
import rightArrow from './icons/right_arrow_207.svg';
import leftArrow from './icons/left_arrow_208.svg';

export default function Btn({direction, moveSlide}) {

  return (
    <button 
    onClick={moveSlide}
    className={direction === "next" ? "btn-slide next" : "btn-slide prev"}>
      <img src={direction === "next" ? rightArrow : leftArrow} alt={direction}/>
    </button>
  )
}