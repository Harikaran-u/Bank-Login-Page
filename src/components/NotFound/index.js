import './index.css'

const NotFound = () => {
  const notfound = (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"
        alt="not found"
        className="notfound-img"
      />
      <h1 className="notfound-head">Page Not Found</h1>
      <p className="notfound-text">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  )
  return notfound
}

export default NotFound
