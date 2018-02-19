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
    console.log(this.easing);
  }

  to({ position, duration, delay, easing, callback }) {
    this.currentTime = 0;
    this.start = window.pageYOffset;
    this.change = position - this.start;
    this.easing = easing;
    this.duration = duration;
    this.callback = callback;
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
      this.callback();
    }
  }

}

export default Scroll;
