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
import RepDetailsPage from '../RepDetailsPage/RepDetailsPage.jsx';
import ExecutiveOrderDetailsPage from '../ExecutiveOrderDetailsPage/ExecutiveOrderDetailsPage.jsx';
import AboutPage from '../AboutPage/AboutPage.jsx';


function App() {
  const baseURL = "http://localhost:3000"; // Use server locally
  // const baseURL = "https://repradar-backend.onrender.com";
  const navigate = useNavigate();
  
  const [executiveOrders, setExecutiveOrders] = useState([]);
  const [allExecutiveOrders, setAllExecutiveOrders ] = useState({});
  const [repData, setRepData] = useState(null);
  const [localRepresentatives, setLocalRepresentatives] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [detailTarget, setDetailTarget] = useState(""); 
  const [repDetails, setRepDetails] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState('')

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
  function getRepData(query, page = "") {
    fetch(`${baseURL}/api/v1/representatives/search?db=false&query=${query}`)
    .then(response => {
      console.log(response)
      console.log(query)
      return response.json();
    })
    .then(data => {
      if ( page === "local" ) {
        setLocalRepresentatives(data);
      } else {
        setRepData(data)
        navigate('/results')
      }
    })
    .catch(error => console.log('error message: ', error.message))
  }
  
   function showAllExecutiveOrders() {
      fetch(`${baseURL}/api/v1/executive_orders`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
        .then(data => {
          setAllExecutiveOrders(data);
          navigate("/executive_orders")
        })
        .catch(error => {
          console.log(error)
          setError('Oops! Something went wrong while fetching the executive orders. Please wait and try again later.')
        }
      )
    }

  function showFiveMostRecentExecutiveOrders() {
    fetch(`${baseURL}/api/v1/executive_orders/recent`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
      .then(data => {
        
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
        console.log(error)
        setError('Oops! Something went wrong while fetching the executive orders. Please wait and try again later.')
        setExecutiveOrders([]);
      }
    )
  }

  function fetchRepDetails(id, location, source) {
    fetch(`${baseURL}/api/v1/representatives/details?db=${source}&query=${location}&id=${id}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setRepDetails(data)
      navigate("/repDetails")
    })
    .catch(error => console.log('error message: ', error.message))
  }

  function saveEos(EoNum) {
    console.log("EO NUM: ", EoNum)
    
    setError('');  
    
    fetch(`${baseURL}/api/v1/executive_orders_users?executive_order_number=${EoNum}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save executive order');
      }
      return response.json();
    })
    .then(data => {

      console.log("DATA: ", data)

      navigate("/profile");
    })
    .catch(error => {
      console.error('Error saving executive order:', error);
      setError(error.message || 'Failed to save executive order');
    });
  }

  function handleSavedEos(EoNum) {
    if (!EoNum) {
      console.error('No executive order number provided');
      return;
    } else {
      saveEos(EoNum);
    }
  }

  function saveReps(id, location) {
    fetch(`${baseURL}/api/v1/representatives_users?query=${location}&id=${id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      navigate("/profile")
    })
    .catch(error => console.log('error message: ', error.message))
  }


  function handleSavedReps(id, location) {
    if (!id && !location) {
      console.error('No Rep data provided');
      return;
    } else {
      saveReps(id, location);
    }
  }
  return (
    <main className='App'>
      <Header  popOutMenu={popOutMenu} isOpen={isOpen}/>
      <MenuPopUp popOutLogin={popOutLogin} isOpen={isOpen} showAllExecutiveOrders={showAllExecutiveOrders}/>
      <section className="login_container">
        <LoginPopUp isLoginOpen={isLoginOpen} closeLogin={closeLogin} navigateToCreate={navigateToCreate} setCurrentUser={setCurrentUser} baseURL={baseURL} />
      </section>
      
      <section className='content'>
        <Routes>
          <Route path="/" element={<Homepage executiveOrders={executiveOrders} getRepData={getRepData}/>}/>
          <Route path="/login" element={<LoginPopUp />} /> 
          <Route path="/profile" element={<UserProfile baseURL={baseURL} getRepData={ getRepData } localReps={ localRepresentatives } setDetailsTarget={handleDetailsTarget} getRepDetails={getRepDetails}/>} />
          <Route path="/executive_orders" element={<AllExecutiveOrdersPage allExecutiveOrders={allExecutiveOrders}  handleSavedEos={handleSavedEos}/>} />
          <Route path="/create_account" element={<CreateAccount baseURL={baseURL} />} />
          <Route path="/update" element={<EditProfile baseURL={baseURL} />} />
          <Route path="/results" element={<SearchResultsContainer reps={repData} setDetailsTarget={handleDetailsTarget} getDetails={getRepDetails} handleSavedReps={handleSavedReps} />} />
          <Route path="/repDetails" element={<RepDetailsPage repDetails={repDetails}/>} />
          <Route path="/executive_orders/:eoId" element={<ExecutiveOrderDetailsPage baseURL={baseURL} />} />
          <Route path="/about" element={<AboutPage/>} />
        </Routes>
      </section>
    </main>
  );
}

export default App
