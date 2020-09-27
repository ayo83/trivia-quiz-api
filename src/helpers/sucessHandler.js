const SuccessHandler = {
    successWithMessage(res, statusCode, message) {
        return res.status(statusCode).json({ message, status: 'success' });
    },
    successWithData(res, statusCode, data) {
        return res.status(statusCode).json({ data, status: 'success' });
    },
    successWithMessageAndData(res, statusCode, message, data) {
        return res.status(statusCode).json({
            data, message, status: 'success',
        });
    },
};
export default SuccessHandler;
