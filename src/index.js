import React, { Component } from 'react';
import PropTypes from 'prop-types';
import animateScrollTo from 'animated-scroll-to';
// import { WindowResizeListener } from 'react-window-resize-listener';

import MagneticPage from './components/magneticPage';
import style from './styles/magneticScroll.css';

import { vw, vh } from './utils';

class MagneticScroll extends Component {
  static propTypes = {
    pages: PropTypes.arrayOf(PropTypes.Node).isRequired,
    pageHeight: PropTypes.number,
    pageWidth: PropTypes.number,
    onPageChangeStart: PropTypes.func,
    onPageChangeEnd: PropTypes.func,
    scrollOptions: PropTypes.shape(),
  }

  static defaultProps = {
    pageHeight: 100,
    pageWidth: 100,
    onPageChangeStart: () => {},
    onPageChangeEnd: () => {},
    scrollOptions: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      pageWidth: vw(this.props.pageWidth),
      pageHeight: vh(this.props.pageHeight),
    };
    this.options = { ...this.options, ...this.props.scrollOptions };
    console.log(this.state.pageHeight);
  }

  componentWillMount() {
    this.resize();
  }

  componentDidMount() {
    window.addEventListener('wheel', this.onScroll);
    window.addEventListener('touchmove', this.onScroll);
    window.addEventListener('touchstart', this.onTouch);
    window.addEventListener('keydown', this.onKeydown);
  }

  componentWillUpdate() {
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.onScroll);
    window.removeEventListener('touchmove', this.onScroll);
    window.removeEventListener('touchstart', this.onTouch);
    window.removeEventListener('keydown', this.onKeydown);
  }

  onPageChangeStart = () => {
    this.props.onPageChangeStart();
  }

  onPageChangeEnd = () => {
    console.log('scroll end');
    this.props.onPageChangeEnd();
    this.scrolling = false;
  }

  onScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.scroll(e);
  }

  onTouch = (e) => {
    e.preventDefault();
    this.ts = e.touches[0].clientY;
  }

  onKeydown = (e) => {
    switch (e.which) {
      case 38: this.scrollUp(); // up
        break;
      case 40: this.scrollDown(); // down
        break;
      default: break; // exit this handler for other keys
    }
  }

  onResize = e => this.resize(e)

  getTotalHeight = () =>
    this.props.pageHeight * this.getNbPages();

  getNbPages = () => this.props.pages.length;

  getScrollPosition(page) {
    console.log('rend l\'argent, ', this.state.pageHeight, page);
    return this.state.pageHeight * page;
  }

  getHeight() {
    return this.getNbPages() * this.state.pageHeight;
  }

  currentPage = 0;
  ts = null;
  animating = false;
  pageHeight = 0;
  pageWidth = 0;
  scrolling = false;

  options = {
    // duration of the scroll per 1000px, default 500
    speed: 500,

    // minimum duration of the scroll
    minDuration: 250,

    // maximum duration of the scroll
    maxDuration: 1500,

    // DOM element to scroll, default window
    // Pass a reference to a DOM object
    // Example: document.querySelector('#element-to-scroll'),
    element: window,
    onComplete: this.onPageChangeEnd,
  }

  resize() {
    this.setState({
      pageWidth: vw(this.props.pageWidth),
      pageHeight: vh(this.props.pageHeight),
    });
  }

  scrollUp() {
    if (this.currentPage > 0) {
      this.currentPage -= 1;
    }
    this.scrollToCurrentPage();
  }

  scrollDown() {
    console.log(`this.currentPage == ${this.currentPage}`, `nbPage = ${this.getNbPages()}`);
    if (this.currentPage < this.getNbPages()) {
      this.currentPage += 1;
    }
    console.log('currentPage => ', this.currentPage);
    this.scrollToCurrentPage();
  }

  scrollToCurrentPage() {
    console.log(`scroll to current page => scrolling === ${this.scrolling}`);
    const position = this.getScrollPosition(this.currentPage);
    console.log('position === ', position);
    this.onPageChangeStart();
    console.log('options ==> ', this.options);
    animateScrollTo(position, this.options);
  }

  scroll(event) {
    console.log(`scrolling === ${this.scrolling}`);
    if (!this.scrolling) {
      this.scrolling = true;
      console.log(`scrolling === ${this.scrolling}`);
      console.log('get nb pages', this.getNbPages());
      if (event.wheelDelta) {
        const wd = event.wheelDelta;
        console.log('wheeldelta = ', wd);
        if (wd > 0 && this.currentPage > 0) {
          this.scrollUp();
        } else if (this.currentPage < this.getNbPages()) {
          console.log('SCROLL DOWN');
          this.scrollDown();
        }
      } else if (event.changedTouches) {
        const te = event.changedTouches[0].clientY;

        if (this.ts > te && this.currentPage < this.getNbPages()) {
          this.scrollDown();
        } else if (this.currentPage > 0) {
          this.scrollUp();
        }
      }
    }
  }

  render() {
    const panda = {
      width: this.state.pageWidth,
      height: this.getHeight(),
    };
    return (
      <div className={style.panda} style={panda}>
        <div className={style.magnetic}>
          {this.props.pages.map(page => (
            <MagneticPage page={page} pageHeight={this.state.pageHeight} />
          ))}
        </div>
      </div>
    );
  }
}

export default MagneticScroll;
