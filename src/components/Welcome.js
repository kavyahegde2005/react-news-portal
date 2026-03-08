import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class Welcome extends Component {
  render() {
    return (
      <div
        className="container text-center"
        style={{
          marginTop: "150px",
          color: this.props.mode === "dark" ? "white" : "black"
        }}
      >

        <h1 className="display-4">Welcome to Quick News 📰</h1>

        <p className="lead mt-3">
          Stay updated with the latest Technology, Sports, Business and more.
        </p>

        <Link to="/news">
          <button className="btn btn-primary btn-lg mt-4">
            Explore News
          </button>
        </Link>

      </div>
    )
  }
}