let d = false;
const debounce = (func, duration) => {
  if (d === false) {
    d = true;
    func();
    setTimeout(() => {
      d = false;
    }, duration);
  }
};

export default debounce;
