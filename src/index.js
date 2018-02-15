import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import animateScrollTo from 'animated-scroll-to';
// import { WindowResizeListener } from 'react-window-resize-listener';

import MagneticPage from './components/magneticPage';
import style from './styles/magneticScroll.css';
import Easing from './easing';

import { vw, vh } from './utils';

class MagneticScroll extends Component {
  static propTypes = {
    pages: PropTypes.arrayOf(PropTypes.Node).isRequired,
    pageHeight: PropTypes.number,
    pageWidth: PropTypes.number,
    onPageChangeStart: PropTypes.func,
    onPageChangeEnd: PropTypes.func,
    scrollOptions: PropTypes.shape(),
    easing: PropTypes.string,
    duration: PropTypes.number,
  }

  static defaultProps = {
    pageHeight: 100,
    pageWidth: 100,
    onPageChangeStart: () => {},
    onPageChangeEnd: () => {},
    scrollOptions: {},
    easing: 'linear',
    duration: 500,
  }

  constructor(props) {
    super(props);
    this.state = {
      pageWidth: vw(this.props.pageWidth),
      pageHeight: vh(this.props.pageHeight),
    };
    this.options = { ...this.options, ...this.props.scrollOptions };
    this.easing = new Easing();
  }

  componentWillMount() {
    this.resize();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('wheel', this.onScroll);
    window.addEventListener('touchmove', this.onScroll);
    window.addEventListener('touchstart', this.onTouch);
    window.addEventListener('keydown', this.onKeydown);
    this.currentPage = this.getCurrentPage();
    // scroll events
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
    this.props.onPageChangeEnd();
    setTimeout(() => {
      this.scrolling = false;
    }, 500);
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
    if (!this.scrolling) {
      switch (e.which) {
        case 38: this.scrollUp(); // up
          break;
        case 40: this.scrollDown(); // down
          break;
        default: break; // exit this handler for other keys
      }
    }
  }

  onResize = e => this.resize(e)

  getCurrentPage = () => Math.ceil(window.pageYOffset / this.getTotalHeight());

  getTotalHeight = () =>
    this.props.pageHeight * this.getNbPages();

  getNbPages = () => this.props.pages.length;

  getScrollPosition(page) {
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
    duration: 400,
    delay: 50,
    smooth: 'easeInOutQuint',
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
      this.scrollToCurrentPage();
    }
  }

  scrollDown() {
    if (this.currentPage < this.getNbPages()) {
      this.currentPage += 1;
      this.scrollToCurrentPage();
    }
  }

  scrollToCurrentPage() {
    const position = this.getScrollPosition(this.currentPage);
    this.onPageChangeStart();
    const { duration } = this.props;
    this.animateScrollTo(position, duration);
    // Scroll.animateScroll.scrollTo(position, this.options);
  }

  animateScrollTo = (position, duration) => {
    const start = window.pageYOffset;
    const change = position - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;
      const { easing } = this.props;
      // const val = this.easeInOutQuad(currentTime, start, change, duration);
      const val = this.easing.ease(easing, currentTime, start, change, duration);
      window.scrollTo(0, val);
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      } else {
        this.onPageChangeEnd();
      }
    };
    animateScroll();
  }

  scroll(event) {
    if (!this.scrolling) {
      this.scrolling = true;
      if (event.wheelDelta) {
        const wd = event.wheelDelta;
        if (wd > 0 && this.currentPage > 0) {
          this.scrollUp();
        } else if (wd < 0 && this.currentPage < this.getNbPages() - 1) {
          this.scrollDown();
        } else {
          this.scrolling = false;
        }
      } else if (event.changedTouches) {
        const te = event.changedTouches[0].clientY;
        if (this.ts > te && this.currentPage < this.getNbPages() - 1) {
          this.scrollDown();
        } else if (this.ts < te && this.currentPage > 0) {
          this.scrollUp();
        } else {
          this.scrolling = false;
        }
      } else {
        this.scrolling = false;
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
