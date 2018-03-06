let dbnc = false;
const debounce = (func, duration) => {
  if (dbnc === false) {
    dbnc = true;
    func();
    setTimeout(() => {
      dbnc = false;
    }, duration);
  }
};

export default debounce;
