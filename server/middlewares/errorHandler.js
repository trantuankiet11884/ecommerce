const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found!`);
  res.status(404).json({
    success: false,
    message: error.message,
  });
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
