const ErrorHandler = {
    validationError: (res, error) => res.status(400).json({
        status: 'error',
        error: {
            message: error.details[0].message,
        },
    }),
    serverResponse: (res, message, status) => res.status(status).json({
        status: 'error',
        message,
    }),
};
export default ErrorHandler;
