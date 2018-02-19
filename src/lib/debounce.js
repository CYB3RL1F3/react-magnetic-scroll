window.dbnc = false;
const debounce = (func, duration) => {
  if (window.dbnc === false) {
    window.dbnc = true;
    func();
    setTimeout(() => {
      window.dbnc = false;
    }, duration);
  }
};

export default debounce;
