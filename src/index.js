import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import animateScrollTo from 'animated-scroll-to';
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
    this.animateScrollTo(position, 500);
    // Scroll.animateScroll.scrollTo(position, this.options);
  }

  easeInOutQuad = (t2, b, c, d) => {
    let t = t2;
    t /= d / 2;
  	if (t < 1) return c / 2 * t * t + b; //eslint-disable-line
    t -= 1; // eslint-disable-lint
  	return -c/2 * (t*(t-2) - 1) + b; // eslint-disable-line
  };

  animateScrollTo = (position, duration) => {
    const start = window.pageYOffset;
    const change = position - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;
      const val = this.easeInOutQuad(currentTime, start, change, duration);
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
