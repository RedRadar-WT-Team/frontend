import { useState } from "react";
import './App.css'
import Ticker from '../Ticker/Ticker'

function App() {
  const dummyExecutiveOrders = [
    {title: "Zoo Dress Code", summary: "Walruses must wear pants."}, 
    {title: "Ice Scream", summary: "Mandatory screaming upon consumption of Mint Chocolate Chip Ice Cream on Thursdays."}, 
    {title: "Middle Name Penalty", summary: "Those with a middle 'L' initial must walk backwards all day on the Sabbath."},
    {title: "Bye Bye Cap'n Crunch", summary: "If you like Cap'n Crunch, no more Cap'n Crunch for you."},
    {title: "Cuz 'Mercuh", summary: "Fireworks at 3:30 am. Everyday. Even Saturdays."}
  ]
  const [executiveOrders, setExecutiveOrders] = useState(dummyExecutiveOrders);

  return (
    <main className='App'>
      <h1>RepRadar</h1>
      <Ticker executiveOrders={executiveOrders}/>
    </main>
  )
}

export default App; 