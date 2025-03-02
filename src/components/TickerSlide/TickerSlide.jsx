import './TickerSlide.css';

function TickerSlide({ title, summary, id }){
  return(
    <div className='tickerslide'>
      <h3>{title}</h3>
      <p>{summary}</p>
      <button>🗑</button>
    </div>
  )
}

export default TickerSlide;