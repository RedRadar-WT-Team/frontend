import './UserDetails.css'
import { NavLink } from 'react-router-dom';

function UserDetails( { userInfo }) {
    return(
        <div>
            <h2>User Information</h2>
            <div className="details">
                <div className="detail">
                    <label>Email:</label>
                    <p>{userInfo.data.attributes.email}</p>
                </div>
                <div className="detail">
                    <label>State:</label>
                    <p>{userInfo.data.attributes.state}</p>
                </div>
                <div className="detail">
                    <label>Zip Code:</label>
                    <p>{userInfo.data.attributes.zip}</p>
                </div>
            </div>
            <NavLink to="/update">
                <button>Edit Profile</button>
            </NavLink>
        </div>
    );
}

export default UserDetails;