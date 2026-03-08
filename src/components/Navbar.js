import React, { Component } from 'react'
import { Link } from "react-router-dom";


export default class Navbar extends Component {
  render(props) {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">{this.props.title}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/news">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tech">Tech</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/bitcoin">Bitcoin</Link>
        </li>
         <li className="nav-item">
          <Link className="nav-link" to="/business">Business</Link>
        </li>
      </ul>
    </div>
    <div className={`form-check form-switch text-${this.props.mode === 'light'?'dark':'light'}`}>
  <input className="form-check-input" onClick={this.props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{this.props.switch}</label>
</div>
  </div>
</nav>
      </div>
    )
  }
}
