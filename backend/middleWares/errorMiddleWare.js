export const errorMiddleWare = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    sucess: false,
    message: err.message,
  });
};
