import React from "react";
import './Ticker.css';
import rightArrow from './icons/right_arrow.png';
import leftArrow from './icons/left_arrow.png';

export default function Btn() {
  return (
    <button className="btn-slide">
      <img src={rightArrow} />
    </button>
  )
}