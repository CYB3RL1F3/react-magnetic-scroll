import React, { Component } from 'react';
import MagneticScroll from 'react-magnetic-scroll';
import logo from './logo.svg';
import './App.css';
class App extends Component {

  pageEnd = () => {
    console.log('PAGE END');
  }

  renderPages = () => {
    const pages = [];
    const page = (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
    pages.push(page);
    pages.push(page);
    pages.push(page);
    pages.push(page);
    pages.push(page);
    pages.push(page);
    pages.push(page);
    pages.push(page);
    pages.push(page);
    pages.push(page);
    pages.push(page);
    pages.push(page);
    pages.push(page);
    pages.push(page);
    pages.push(page);
    pages.push(page);
    pages.push(page);
    pages.push(page);
    return pages;
  }

  render() {
    return (
      <div className="App">
        <MagneticScroll
          pages={this.renderPages()}
          onPageChangeEnd={this.pageEnd}
        />
      </div>
    );
  }
}
export default App;
