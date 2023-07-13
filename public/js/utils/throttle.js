
export default function throttle(func, wait) {
  let timeout;
  let lastArgs;
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();
    const remaining = wait - (now - lastTime);
    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastTime = now;
      func.apply(this, args);
    } else if (!timeout) {
      lastArgs = args;
      timeout = setTimeout(() => {
        lastTime = Date.now();
        timeout = null;
        func.apply(this, lastArgs);
      }, remaining);
    }
  };
}