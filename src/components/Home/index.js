import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const {history} = props

  const logoutUser = () => {
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    history.replace('/ebank/login')
  }

  const home = (
    <div className="home-container">
      <nav className="nav-bar">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="app-logo"
        />
        <button type="button" className="log-out-btn" onClick={logoutUser}>
          Logout
        </button>
      </nav>
      <div className="card-container">
        <h1 className="home-head">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="card"
        />
      </div>
    </div>
  )
  return home
}

export default Home
