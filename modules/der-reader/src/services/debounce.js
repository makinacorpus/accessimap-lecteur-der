/**
 * Creates a debounced function 
 * that delays invoking func until 
 * after wait milliseconds have elapsed 
 * since the last time the debounced function was invoked. 
 * The func is invoked with the last arguments provided 
 * to the debounced function. 
 * Subsequent calls to the debounced function 
 * return the result of the last func invocation.
 * @param {function} fn 
 * @param {integer} wait 
 */
export default function debounce(fn, wait) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, wait);
  };
}
