import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MagneticPage from './components/magneticPage';
import style from './styles/magneticScroll.css';
import Scroll from './lib/scroll';
import debounce from './lib/debounce';

import { vw, vh } from './utils';

class MagneticScroll extends Component {
  static propTypes = {
    pages: PropTypes.arrayOf(PropTypes.Node).isRequired,
    pageHeight: PropTypes.number,
    pageWidth: PropTypes.number,
    onPageChangeStart: PropTypes.func,
    onPageChangeEnd: PropTypes.func,
    onScrollUpStart: PropTypes.func,
    onScrollUpEnd: PropTypes.func,
    onScrollDownStart: PropTypes.func,
    onScrollDownEnd: PropTypes.func,
    scrollOptions: PropTypes.shape(),
    easing: PropTypes.string,
    duration: PropTypes.number,
    delay: PropTypes.number,
  }

  static defaultProps = {
    pageHeight: 100,
    pageWidth: 100,
    onPageChangeStart: () => {},
    onPageChangeEnd: () => {},
    onScrollUpStart: () => {},
    onScrollUpEnd: () => {},
    onScrollDownStart: () => {},
    onScrollDownEnd: () => {},
    scrollOptions: {},
    easing: 'linear',
    duration: 500,
    delay: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      pageWidth: vw(this.props.pageWidth),
      pageHeight: vh(this.props.pageHeight),
    };
    this.options = { ...this.options, ...this.props.scrollOptions };
    this.animateScroll = new Scroll();
  }

  componentWillMount() {
    this.resize();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('wheel', this.onScroll);
    window.addEventListener('touchmove', this.onScroll, { passive: false });
    window.addEventListener('touchstart', this.onTouch, { passive: false });
    window.addEventListener('keydown', this.onKeydown);
    window.addEventListener('resize', this.onResize);
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
    }, 40);
  }

  onScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'wheel' && this.checkAsc(e.wheelDelta)) {
      debounce(() => {
        this.scroll(e);
      }, 300);
    }
    this.asc = e.wheelDelta;
  }

  onTouch = (e) => {
    e.preventDefault();
    this.ts = e.touches[0].clientY;
  }

  onKeydown = (e) => {
    if (!this.scrolling) {
      switch (e.which) {
        case 38: {
          e.preventDefault();
          if (this.currentPage > 0) {
            this.scrolling = true;
            this.scrollUp(); // up
          }
          break;
        }
        case 40: {
          e.preventDefault();
          if (this.currentPage < this.getNbPages()) {
            this.scrolling = true;
            this.scrollDown(); // down
          }
          break;
        }
        default: break; // exit this handler for other keys
      }
    }
  }

  onResize = e => this.resize(e)

  onScrollFinished = () => {
    if (this.dir === 'up') {
      this.props.onScrollUpEnd();
    } else {
      this.props.onScrollDownEnd();
    }
    this.onPageChangeEnd();
  }

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
  asc=0;
  dir=null;

  options = {
    // duration of the scroll per 1000px, default 500
    duration: 400,
    delay: 50,
    smooth: 'easeInOutQuint',
  }

  checkAsc = delta => (this.asc > 0 && this.asc < delta) || (this.asc < 0 && this.asc > delta)

  resize() {
    if (!this.scrolling) {
      debounce(() => {
        this.setState({
          pageWidth: vw(this.props.pageWidth),
          pageHeight: vh(this.props.pageHeight),
        });
      }, 300);
    }
  }

  scrollTo(page) {
    this.currentPage = page;
    this.scrollToCurrentPage();
  }

  scrollUp() {
    this.props.onScrollUpStart();
    this.dir = 'up';
    if (this.currentPage > 0) {
      this.currentPage -= 1;
      this.scrollToCurrentPage();
    }
  }

  scrollDown() {
    this.props.onScrollDownStart();
    this.dir = 'down';
    if (this.currentPage < this.getNbPages()) {
      this.currentPage += 1;
      this.scrollToCurrentPage();
    }
  }

  scrollToCurrentPage() {
    const position = this.getScrollPosition(this.currentPage);
    this.onPageChangeStart();
    this.animateScrollTo(position);
    // Scroll.animateScroll.scrollTo(position, this.options);
  }

  animateScrollTo = (position) => {
    const { duration, delay, easing } = this.props;
    this.animateScroll.to({
      position,
      duration,
      delay,
      easing,
      callback: this.onScrollFinished,
    });
  }
  /*
  animateScrollTo = (position) => {
    const { duration } = this.props;
    const start = window.pageYOffset;
    const change = position - start;
    const increment = 10;
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
        if (this.dir === 'up') {
          this.props.onScrollUpEnd();
        } else {
          this.props.onScrollDownEnd();
        }
        this.onPageChangeEnd();
      }
    };
    setTimeout(animateScroll, this.props.delay);
  } */

  scroll(e) {
    const threshold = 1;
    if (!this.scrolling) {
      this.scrolling = true;
      if (e.type === 'wheel' && e.wheelDelta) {
        const wd = e.wheelDelta;
        if (wd > threshold && this.currentPage > 0) {
          this.scrollUp();
        } else if (wd < -threshold && this.currentPage < this.getNbPages() - 1) {
          this.scrollDown();
        } else {
          this.scrolling = false;
        }
      } else if (e.type === 'touchmove' && e.changedTouches) {
        const te = e.changedTouches[0].clientY;
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
