import React, { Component } from 'react';
import { MagneticScroll, MagneticPage } from 'react-magnetic-scroll';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  pageEnd = () => {
    console.log('PAGE END');
  }

  pageStart = () => {
    console.log('PAGE START');
  }

  scrollUpStart = () => {
    console.log('SCROLL UP START');
  }

  scrollUpEnd = () => {
    console.log('SCROLL UP END');
  }

  scrollDownStart = () => {
    console.log('SCROLL DOWN START');
  }

  scrollDownEnd = () => {
    console.log('SCROLL DOWN END');
  }

  navigateToPage = (e) => {
    e.preventDefault();
    console.log(this.magneticScroll);
    this.magneticScroll.scrollTo(3);
  }


  renderPages = () => {
    const pages = [];
    const n = Math.random() * (15 - 5) + 5;
    for (let i = 0; i < n; i++) {
      const page = (
        <MagneticPage
          key={`page__${i}`}
        >
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>React magnetic scrolled page #{i + 1}</h2>
          </div>
          <p className="App-intro">
            Scroll {i > 0 && 'up'} {i > 0 && i < n && ' or '} {i < n && 'down'}<br />
            To see how it works very well !!
          </p>
        </MagneticPage>
      );
      pages.push(page);
    }
    console.log(pages);
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
          onScrollUpStart={this.scrollUpStart}
          onScrollUpEnd={this.scrollUpEnd}
          onScrollDownEnd={this.scrollDownEnd}
          onScrollDownStart={this.scrollDownStart}
          easing="easeInOutQuad"
          withRef
          ref={(magneticScroll) => { this.magneticScroll = magneticScroll; }}
        />
      </div>
    );
  }
}
export default App;
