import './App.css';

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import Tech from './components/Tech';
import Bitcoin from './components/Bitcoin';
import Business from './components/Business';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from './components/Welcome';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'light',
      alert: null
    };
  }

  showAlert = (message, type) => {
    this.setState({
      alert: {
        type: type
      }
    });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 2500);
  }

  toggleMode = () => {
    if(this.state.mode === 'light'){
      this.setState({ mode: 'dark' });
      document.body.style.backgroundColor = '#111111';
      this.showAlert("Dark mode has been enabled", "success");
    }
    else{
      this.setState({ mode: 'light' });
      document.body.style.backgroundColor = 'white';
      this.showAlert("Light mode has been enabled", "success");
    }
  }

  render() {
    return (
      <div>
      <Router>
        {/* using PUBLIC_URL ensures routes work when the app is hosted under a sub‑path (GitHub Pages) */}
        <Navbar title="Quick News" mode={this.state.mode} toggleMode={this.toggleMode} switch="Dark mode" />
        <Routes>
          <Route path="/" element={<Welcome mode={this.state.mode} />} />
          <Route path="/news" element={<News />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/bitcoin" element={<Bitcoin />} />
          <Route path="/business" element={<Business />} />
        </Routes>
      </Router>
      </div>
    );
  }
}