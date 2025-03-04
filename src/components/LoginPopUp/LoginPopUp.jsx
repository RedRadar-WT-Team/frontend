import './LoginPopUp.css';


function LoginPopUp({isLoginOpen, closeLogin, navigateToCreate}) {
  return (
    <main>
      {isLoginOpen && (
        <div className='overlay'>
          <div className={`pop-up-login ${isLoginOpen ? 'open' : ''}`}>
          <ul>
            <button className='exit-button' onClick={closeLogin} >X</button>
            <p>Welcome!</p>
            <input type="text" placeholder="Enter your username" className="username-input" />
            <button className='signin-button'>Sign In</button>
            <p>Dont have an account? Create one<button className='to-create-page' onClick={navigateToCreate}>here!</button> </p>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}

export default LoginPopUp;