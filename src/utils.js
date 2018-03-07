/**
 * @description returns the pixel value of a number expressed in vw
 * @method vw
 * @params value : number
 * @returns number
*/
export const vw = value => document.documentElement.clientWidth * (value / 100);

/**
 * @description returns the pixel value of a number expressed in vh
 * @method vh
 * @params value : number
 * @returns number
*/
export const vh = value => document.documentElement.clientHeight * (value / 100);

export const isMobile = () => document.documentElement.clientWidth < 780 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
