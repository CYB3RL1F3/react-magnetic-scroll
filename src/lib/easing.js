class Easing {
  getMethod(method) {
    switch (method) {
      // linear
      case 'linear':
        return this.linear;

      // classic
      case 'easeInOut':
        return this.easeInOut;

      // quadratic
      case 'easeInQuad':
        return this.easeInQuad;
      case 'easeOutQuad':
        return this.easeOutQuad;
      case 'easeInOutQuad':
        return this.easeInOutQuad;

      // cubic
      case 'easeInCubic':
        return this.easeInCubic;
      case 'easeOutCubic':
        return this.easeOutCubic;
      case 'easeInOutCubic':
        return this.easeInOutCubic;

      // circular
      case 'easeInCirc':
        return this.easeInCirc;
      case 'easeOutCirc':
        return this.easeOutCirc;
      case 'easeInOutCirc':
        return this.easeInOutCirc;

      // quintic
      case 'easeInQuint':
        return this.easeInExpo;
      case 'easeOutQuint':
        return this.easeOutExpo;
      case 'easeInOutQuint':
        return this.easeInOutQuint;

      // sinusoidal
      case 'easeInSin':
        return this.easeInSin;
      case 'easeOutSin':
        return this.easeOutSin;
      case 'easeInOutSin':
        return this.easeInOutSin;

      // exponential
      case 'easeInExpo':
        return this.easeInExpo;
      case 'easeOutExpo':
        return this.easeOutExpo;
      case 'easeInOutExpo':
        return this.easeInOutExpo;

      default:
        throw new Error('inexisting easing function');
    }
  }

  // currentTime, start, change, duration
  ease(func, time, start, change, duration) {
    const method = this.getMethod(func);
    return method(time, start, change, duration);
  }

  // linear
  linear = (t, b, c, d) => c * t / d + b;

  // quadratic
  easeInQuad = (t, b, c, d) => {
    t /= d;
    return c * t * t + b;
  };

  easeOutQuad = (t, b, c, d) => {
    t /= d;
    return -c * t * (t - 2) + b;
  };

  easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t-2) - 1) + b;
  };

  // cubic
  easeInCubic = (t, b, c, d) => {
    t /= d;
    return c * t *t * t + b;
  };


  easeOutCubic = (t, b, c, d) => {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  };

  easeInOutCubic = (t, b, c, d) => {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t + 2) + b;
  };

  // quart
  easeInQuart = (t, b, c, d) => {
    t /= d;
    return c*t*t*t*t + b;
  };

  easeOutQuart = (t, b, c, d) => {
    t /= d;
    t--;
    return -c * (t*t*t*t - 1) + b;
  };

  easeInOutQuart = (t, b, c, d) => {
    t /= d/2;
    if (t < 1) return c/2*t*t*t*t + b;
    t -= 2;
    return -c/2 * (t*t*t*t - 2) + b;
  };

  // quintic
  easeInQuint = (t, b, c, d) => {
    t /= d;
    return c * t * t * t * t * t + b;
  };

  easeOutQuint = (t, b, c, d) => {
    t /= d;
    t--;
    return c * (t * t * t * t * t + 1) + b;
  };

  easeInOutQuint = (t, b, c, d) => {
    t /= d/2;
    if (t < 1) return c/2*t*t*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t*t*t + 2) + b;
  };

  // sinusoidal
  easeInSin = (t, b, c, d) => -c * Math.cos(t/d * (Math.PI/2)) + c + b;

  easeOutSine = (t, b, c, d) => c * Math.sin(t/d * (Math.PI/2)) + b;

  easeInOutSine = (t, b, c, d) => -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;

  // exponential
  easeInExpo = (t, b, c, d) =>
    c * Math.pow(2, 10 * (t/d - 1)) + b;

  easeOutExpo = (t, b, c, d) =>
    c * (-Math.pow(2, -10 * t/d) + 1) + b;

  easeInOutExpo = (t, b, c, d) => {
    t /= d/2;
    if (t < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    t--;
    return c/2 * (-Math.pow(2, -10 * t) + 2) + b;
  };

  // circular
  easeInCirc = (t, b, c, d) => {
    t /= d;
    return -c * (Math.sqrt(1 - t*t) - 1) + b;
  };

  easeOutCirc = (t, b, c, d) => {
    t /= d;
    t--;
    return c * Math.sqrt(1 - t*t) + b;
  };

  easeInOutCirc = (t, b, c, d) => {
    t /= d/2;
    if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    t -= 2;
    return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
  };
}

export default Easing;
