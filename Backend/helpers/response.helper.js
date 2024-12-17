exports.SendFailureResponse = (
  response,
  statusCode = 500,
  message = "Something went wrong"
) => {
  return response.status(statusCode).send({
    success: false,
    data: null,
    message,
  });
};

exports.SendSuccessResponse = (response, statusCode = 200, data, message) => {
  return response.status(statusCode).send({
    success: true,
    data,
    message,
  });
};
