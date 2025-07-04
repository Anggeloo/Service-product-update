const ApiResponse = (status, data, message) => {
  return {
    status,
    data,
    message,
  };
};
module.exports = ApiResponse;
