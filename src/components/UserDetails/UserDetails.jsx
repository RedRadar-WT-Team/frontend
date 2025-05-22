import './UserDetails.css'
import { NavLink } from 'react-router-dom';

function UserDetails( { userInfo }) {
    return(
        <div className="details-container">
            <h2>User Information</h2>
            <div className="details">
                <div className="detail">
                    <label>Email:</label>
                    <p>{userInfo?.data?.attributes?.email || "Loading... "}</p>
                </div>
                <div className="detail">
                    <label>State:</label>
                    <p>{userInfo?.data?.attributes?.state || "Loading... "}</p>
                </div>
                <div className="detail">
                    <label>Zip Code:</label>
                    <p>{userInfo?.data?.attributes?.zip || "Loading... "}</p>
                </div>
            </div>
            <NavLink to="/update">
                <button>Edit Profile</button>
            </NavLink>
        </div>
    );
}

export default UserDetails;