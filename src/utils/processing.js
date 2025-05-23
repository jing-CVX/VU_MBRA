/**
 *
 * @param {Number} timeout Thời gian chờ trước khi thực hiện công việc tiếp theo
 */

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

/**
 *
 * @param {Function} func Hàm cần xử lý mà không gây ảnh hưởng đến UI, animation
 * @param {Number} timeout Thời gian (ms) waiting trước khi gọi các hàm (optional)
 *
 * @returns {smoothJSProcessing} Các hàm JS được thực thi bất đồng bộ bên trong hàm smoothJSProcessing một các mượt mà, không ảnh hưởng tới các UI, process khác
 */

const smoothJSProcessing = (func, timeout = 10) => {
  const Processing = new Promise((resolve) => setTimeout(resolve, timeout));
  Processing.then(() => func());
};

export { wait, smoothJSProcessing };
