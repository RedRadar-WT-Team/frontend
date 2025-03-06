import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Homepage from '../Homepage/Homepage';
import Header from '../Header/Header';
import MenuPopUp from '../MenuPopUp/MenuPopUp';
import LoginPopUp from '../LoginPopUp/LoginPopUp';
import CreateAccount from '../CreateAccount/CreateAccount';
import UserProfile from '../UserProfile/UserProfile';
import AllExecutiveOrdersPage from '../AllExecutiveOrdersPage/AllExecutiveOrdersPage';
import EditProfile from '../EditProfile/EditProfile';
import SearchResultsContainer from '../SearchResultsContainer/SearchResultsContainer';
import RepDetails from '../RepDetailsPage/RepDetailsPage.jsx';
import ExecutiveOrderDetailsPage from '../ExecutiveOrderDetailsPage/ExecutiveOrderDetailsPage.jsx';
import AboutPage from '../AboutPage/AboutPage.jsx';

function App() {
  const navigate = useNavigate();

  const [executiveOrders, setExecutiveOrders] = useState([]);
  const [ allExecutiveOrders, setAllExecutiveOrders ] = useState({});
  const [repData, setRepData] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [detailTarget, setDetailTarget] = useState(""); // Set target based on returned click in EOs or Reps
  const [repDetails, setRepDetails] = useState({});

  useEffect(() => {
    showFiveMostRecentExecutiveOrders();
  }, [])

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

  function getRepDetails(id, location) {
   if (detailTarget === "rep") {
      fetchRepDetails(id, location, "false")
    } else if (detailTarget === "repDB") {
      fetchRepDetails(id, location, "true")
    }
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
  
   function showAllExecutiveOrders() {
    fetch('http://localhost:3000/api/v1/executive_orders')
      .then(response => response.json())
      .then(data => {
        setAllExecutiveOrders(data);
        navigate("/executive_orders")
      })
      .catch(error => console.log(error.message)
      )
  }

  function showFiveMostRecentExecutiveOrders() {
    fetch('http://localhost:3000/api/v1/executive_orders/recent')
      .then(response => response.json())
      .then(data => {
        console.log("five most recent data: ", data);
        
        if (Array.isArray(data)) {
          setExecutiveOrders(data);
          return;
        }
        
        if (data && typeof data === 'object') {
          const possibleArray = Object.values(data).find(val => Array.isArray(val));
          setExecutiveOrders(possibleArray || []);
          return;
        }
        
        setExecutiveOrders([]);
      })
      .catch(error => {
        console.error("Error fetching executive orders:", error.message);
        setExecutiveOrders([]);
      });
  }

  function fetchRepDetails(id, location, source) {
    fetch(`http://localhost:3000/api/v1/representatives/details?db=${source}&query=${location}&id=${id}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setRepDetails(data)
      navigate("/repDetails")
    })
    .catch(error => console.log('error message: ', error.message))
  }

  return (
    <main className='App'>
      <Header  popOutMenu={popOutMenu} isOpen={isOpen}/>
      <MenuPopUp popOutLogin={popOutLogin} isOpen={isOpen} showAllExecutiveOrders={showAllExecutiveOrders}/>
      <section className="login_container">
        <LoginPopUp isLoginOpen={isLoginOpen} closeLogin={closeLogin} navigateToCreate={navigateToCreate}/>
      </section>
      
      <section className='content'>
        <Routes>
          <Route path="/" element={<Homepage executiveOrders={executiveOrders} getRepData={getRepData}/>}/>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/executive_orders" element={<AllExecutiveOrdersPage allExecutiveOrders={allExecutiveOrders}/>} />
          <Route path="/create_account" element={<CreateAccount />} />
          <Route path="/update" element={<EditProfile />} />
          <Route path="/results" element={<SearchResultsContainer reps={repData} setDetailsTarget={handleDetailsTarget} getDetails={getRepDetails} />} />
          <Route path="/repDetails" element={<RepDetails repDetails={repDetails}/>} />
          <Route path="/executive_orders/:eoId" element={<ExecutiveOrderDetailsPage />} />
          <Route path="/about" element={<AboutPage/>} />
        </Routes>
      </section>
    </main>
  );
}

export default App