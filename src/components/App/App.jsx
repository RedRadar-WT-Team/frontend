import './App.css'
import { Routes, Route, useNavigate  } from 'react-router-dom';
import { useState } from 'react';
import Homepage from '../Homepage/Homepage';
import Header from '../Header/Header';
import MenuPopUp from '../MenuPopUp/MenuPopUp';
import LoginPopUp from '../LoginPopUp/LoginPopUp';
import CreateAccount from '../CreateAccount/CreateAccount';
import UserProfile from '../UserProfile/UserProfile';
import EditProfile from '../EditProfile/EditProfile';
import SearchResultsContainer from '../SearchResultsContainer/SearchResultsContainer';
import DetailsPage from '../DetailsPage/DetailsPage.jsx';

export const dummyExecutiveOrders = [
  {id: 1000, title: "Zoo Dress Code", summary: "Walruses must wear pants."}, 
  {id: 2000, title: "Ice Scream", summary: "Mandatory screaming upon consumption of Mint Chocolate Chip Ice Cream on Thursdays."}, 
  {id: 3000, title: "Middle Name Penalty", summary: "Those with a middle 'L' initial must walk backwards all day on the Sabbath."},
  {id: 4000, title: "Bye Bye Cap'n Crunch", summary: "If you like Cap'n Crunch, no more Cap'n Crunch for you."},
  {id: 5000, title: "Cuz 'Mercuh", summary: "Fireworks at 3:30 am. Everyday. Even Saturdays."}
]

function App() {
  const navigate = useNavigate();

  const [executiveOrders, setExecutiveOrders] = useState(dummyExecutiveOrders);
  const [repData, setRepData] = useState({});
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [detailTarget, setDetailTarget] = useState(""); // Set target based on returned click in EOs or Reps
  const [details, setDetails] = useState({});


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

  function handleDetailsTarget(type) {
    setDetailTarget(type);
  }

  // Fetches to backend
  function getRepData(query) {
    fetch(`http://localhost:3000/api/v1/representatives/search?db=false&query=${query}`)
    .then(response => {
      console.log(response)
      return response.json();
    })
    .then(data => {
      setRepData(data)
      navigate('/results')
    })
    .catch(error => console.log('error message: ', error.message))
  }

  function getDetails(id, location) {
    if (detailTarget === "EO") {
      fetchEODetails(id)
    } else if (detailTarget === "rep") {
      fetchRepDetails(id, location, "false")
    } else if (detailTarget === "repDB") {
      fetchRepDetails(id, location, "true")
    }
  }

  function fetchEODetails(id) {
    // Fetch for single EO
  }

  function fetchRepDetails(id, location, source) {
    fetch(`http://localhost:3000/api/v1/representatives/details?db=${source}&query=${location}&id=${id}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setDetails(data)
      navigate("/details")
    })
    .catch(error => console.log('error message: ', error.message))
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
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/create_account" element={<CreateAccount />} />
          <Route path="/update" element={<EditProfile />} />
          <Route path="/results" element={<SearchResultsContainer reps={repData} setDetailsTarget={handleDetailsTarget} getDetails={getDetails} />} />
          <Route path="/details" element={<DetailsPage target={detailTarget} details={details}/>} />
        </Routes>
      </section>
    </main>
  );
}
export default App