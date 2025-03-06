import './App.css'
import { Routes, Route, useNavigate  } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header';
import MenuPopUp from '../MenuPopUp/MenuPopUp';
import LoginPopUp from '../LoginPopUp/LoginPopUp';
import Homepage from '../Homepage/Homepage';
import CreateAccount from '../CreateAccount/CreateAccount';
import SearchResultsContainer from '../SearchResultsContainer/SearchResultsContainer'
import UserProfile from '../UserProfile/UserProfile';
import EditProfile from '../EditProfile/EditProfile';
import SearchResultsCardDetails from '../SearchResultsCardDetail/SearchResultsCardDetail';

export const dummyExecutiveOrders = [
  {id: 1000, title: "Zoo Dress Code", summary: "Walruses must wear pants."}, 
  {id: 2000, title: "Ice Scream", summary: "Mandatory screaming upon consumption of Mint Chocolate Chip Ice Cream on Thursdays."}, 
  {id: 3000, title: "Middle Name Penalty", summary: "Those with a middle 'L' initial must walk backwards all day on the Sabbath."},
  {id: 4000, title: "Bye Bye Cap'n Crunch", summary: "If you like Cap'n Crunch, no more Cap'n Crunch for you."},
  {id: 5000, title: "Cuz 'Mercuh", summary: "Fireworks at 3:30 am. Everyday. Even Saturdays."}
]

function App() {
  const [executiveOrders] = useState(dummyExecutiveOrders);
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  // const location = useLocation()
  const [repData, setRepData] = useState(null);

  function getRepData(query) {
    fetch(`http://localhost:3000/api/v1/representatives/search?db=false&query=${query}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setRepData(data)
      navigate('/results')
    })
    .catch(error => console.log('error message: ', error.message))
  }

  function popOutLogin() {
    setIsLoginOpen(!isLoginOpen);
  }

  function popOutMenu() {
    setIsOpen(!isOpen);
  }

  function closeLogin() {
    setIsLoginOpen(!isLoginOpen);
  }

  function navigateToCreate() {
    setIsLoginOpen(!isLoginOpen);
    navigate('/create_account')
  }

  return (
    <main className='App'>
      <Header  popOutMenu={popOutMenu} isOpen={isOpen}/>
      <MenuPopUp popOutLogin={popOutLogin} isOpen={isOpen}/>
      <section className="login_container">
        <LoginPopUp isLoginOpen={isLoginOpen} closeLogin={closeLogin} navigateToCreate={navigateToCreate}/>
      </section>
      
      <section className='content'>
        <Routes>
          <Route path="/" element={<Homepage executiveOrders={executiveOrders} getRepData={getRepData}/>}/>
          <Route path="/create_account" element={<CreateAccount />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/update" element={<EditProfile />} />
          <Route path="/results" element={<SearchResultsContainer reps={repData}/>} />
          <Route path="/results/:repId" element={<SearchResultsCardDetails />} />
        </Routes>
      </section>
    </main>
  );
}
export default App