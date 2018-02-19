import React, { Component } from 'react';
import MagneticScroll from 'react-magnetic-scroll';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  pageEnd = () => {
    console.log('PAGE END');
  }

  pageStart = () => {
    console.log('PAGE START');
  }

  scrollUp = () => {
    console.log('SCROLL UP');
  }

  scrollDown = () => {
    console.log('SCROLL DOWN');
  }

  navigateToPage = (e) => {
    e.preventDefault();
    console.log(this.magneticScroll);
    this.magneticScroll.scrollTo(4);
  }


  renderPages = () => {
    const pages = [];
    const n = Math.random() * (15 - 5) + 5;
    for (let i = 0; i < n; i++) {
      const page = (
        <div>
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>React magnetic scrolled page #{i + 1}</h2>
          </div>
          <p className="App-intro">
            Enjoy this component as I do.
          </p>
        </div>
      );
      pages.push(page);
    }
    return pages;
  }

  render() {
    return (
      <div className="App">
        <a className="goto" href="" onClick={this.navigateToPage}>Go to page 4</a>
        <MagneticScroll
          pages={this.renderPages()}
          onPageChangeEnd={this.pageEnd}
          onPageChangeStart={this.pageStart}
          onScrollUp={this.scrollUp}
          onScrollDown={this.scrollDown}
          easing="easeInOutQuad"
          withRef
          ref={(magneticScroll) => { this.magneticScroll = magneticScroll; }}
        />
      </div>
    );
  }
}
export default App;
