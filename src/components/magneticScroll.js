import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from '../styles/magneticScroll.css';
import Scroll from '../lib/scroll';
import debounce from '../lib/debounce';

import { vw, vh } from '../utils';

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
    disabled: PropTypes.bool,
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
    disabled: false,
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
    this.currentPageIndex = this.getCurrentPageIndex();
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
    const delta = e.wheelDelta || -e.deltaY;
    if (e.type === 'wheel' && this.checkAsc(delta)) {
      debounce(() => {
        this.scroll(e);
      }, 300);
    } else if (e.type === 'touchmove') {
      debounce(() => {
        this.scroll(e);
      }, 200);
    }
    this.asc = delta;
  }

  onTouch = (e) => {
    e.preventDefault();
    this.ts = e.touches[0].clientY;
  }

  onKeydown = (e) => {
    if (!this.scrolling && !this.props.disabled) {
      switch (e.which) {
        case 38: {
          e.preventDefault();
          if (this.currentPageIndex > 0) {
            this.scrolling = true;
            this.scrollUp(); // up
          }
          break;
        }
        case 40: {
          e.preventDefault();
          if (this.currentPageIndex < this.getNbPages()) {
            this.scrolling = true;
            this.scrollDown(); // down
          }
          break;
        }
        default: break; // exit this handler for other keys
      }
    } else if (e.which === 38 || e.which === 40) {
      e.preventDefault();
    }
  }

  onResize = e => this.resize(e)

  onScrollStart = () => {
    if (this.dir === 'up') {
      this.onScrollUpStart();
    } else {
      this.onScrollDownStart();
    }
    this.onPageChangeStart();
  }

  onScrollFinished = () => {
    if (this.dir === 'up') {
      this.onScrollUpEnd();
    } else {
      this.onScrollDownEnd();
    }
    this.onPageChangeEnd();
  }

  onScrollUpStart = () => {
    this.props.onScrollUpStart();
    this.getCurrentPage().props.onScrollUpStart();
  }

  onScrollDownStart = () => {
    this.props.onScrollDownStart();
    this.getCurrentPage().props.onScrollDownStart();
  }

  onScrollUpEnd = () => {
    this.props.onScrollUpEnd();
    this.getCurrentPage().props.onScrollUpEnd();
  }

  onScrollDownEnd = () => {
    this.props.onScrollDownEnd();
    this.getCurrentPage().props.onScrollDownEnd();
  }

  getCurrentPage = () => this.props.pages[this.currentPageIndex]

  getCurrentPageIndex = () => Math.ceil(window.pageYOffset / this.getTotalHeight());

  getTotalHeight = () =>
    this.props.pageHeight * this.getNbPages();

  getNbPages = () => this.props.pages.length;

  getScrollPosition(page) {
    return this.state.pageHeight * page;
  }

  getHeight() {
    return this.getNbPages() * this.state.pageHeight;
  }

  currentPageIndex = 0;
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
    this.currentPageIndex = page;
    this.scrollToCurrentPage();
  }

  scrollUp() {
    this.dir = 'up';
    this.onScrollStart();
    if (this.currentPageIndex > 0) {
      this.currentPageIndex -= 1;
      this.scrollToCurrentPage();
    }
  }

  scrollDown() {
    this.dir = 'down';
    this.onScrollStart();
    if (this.currentPageIndex < this.getNbPages()) {
      this.currentPageIndex += 1;
      this.scrollToCurrentPage();
    }
  }

  scrollToCurrentPage() {
    const position = this.getScrollPosition(this.currentPageIndex);
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

  scroll(e) {
    const threshold = 1;
    if (!this.scrolling && !this.props.disabled) {
      this.scrolling = true;
      if (e.type === 'wheel' && (e.wheelDelta|| e.deltaY)) {
        const wd = e.wheelDelta || -e.deltaY;
        if (wd > threshold && this.currentPageIndex > 0) {
          this.scrollUp();
        } else if (wd < -threshold && this.currentPageIndex < this.getNbPages() - 1) {
          this.scrollDown();
        } else {
          this.scrolling = false;
        }
      } else if (e.type === 'touchmove' && e.changedTouches) {
        const te = e.changedTouches[0].clientY;
        if (this.ts > te && this.currentPageIndex < this.getNbPages() - 1) {
          this.scrollDown();
        } else if (this.ts < te && this.currentPageIndex > 0) {
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
    const pageStyle = {
      width: this.state.pageWidth,
      height: this.state.pageHeight,
    };
    return (
      <div className={style.panda} style={panda}>
        <div className={style.magnetic}>
          {this.props.pages.map(page => (
            <div
              key={`_magneticPage${page.props.id}`}
              style={pageStyle}
              className={style.page}
            >
              {page}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MagneticScroll;
