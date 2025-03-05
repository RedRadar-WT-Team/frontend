import './LoginPopUp.css';
import X from '../../assets/x-symbol-svgrepo-com.svg';


function LoginPopUp({isLoginOpen, closeLogin, navigateToCreate}) {
  return (
    <main>
      {isLoginOpen && (
        <div className='overlay'>
          <div className={`pop-up-login ${isLoginOpen ? 'open' : ''}`}>
            <div className='welcome_exit'>
              <h2>Welcome!</h2>
              <button className='exit-button' onClick={closeLogin} ><img src={X}/></button>
            </div>
            <div className="login_create">
              <input type="text" placeholder="Enter your username" className="username-input" />
              <button className='signin-button'>Sign In</button>
              <p>Dont have an account?</p>
              <button className='to-create-page' onClick={navigateToCreate}>Create one here!</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default LoginPopUp;