import Easing from './easing';

class Scroll {
  constructor() {
    this.start = 0;
    this.change = 0;
    this.increment = 10;
    this.currentTime = 0;
    this.delay = 0;
    this.callback = () => {};
    this.transitionner = new Easing();
  }

  to({ position, duration, delay, easing, increment, callback }) {
    this.currentTime = 0;
    this.increment = increment;
    this.easing = easing;
    this.duration = duration;
    this.callback = callback;
    this.start = window.pageYOffset;
    this.change = position - this.start;
    setTimeout(() => {
      this.animate();
    }, delay);
  }

  animate() {
    this.currentTime += this.increment;
    // const val = this.easeInOutQuad(currentTime, start, change, duration);
    const val = this.transitionner.ease(
      this.easing,
      this.currentTime,
      this.start,
      this.change,
      this.duration,
    );
    window.scrollTo(0, val);
    if (this.currentTime < this.duration) {
      setTimeout(() => {
        this.animate();
      }, this.increment);
    } else {
      setTimeout(() => {
        this.callback();
      }, 65);
    }
  }

}

export default Scroll;
