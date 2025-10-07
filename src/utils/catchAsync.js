// Wrapper function to catch async errors and pass them to error handling middleware
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// 

module.exports = catchAsync;
