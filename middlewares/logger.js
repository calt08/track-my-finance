module.exports = function (req, res, next) {
    console.log(
        `${req.method} ${req.url} ${new Date(Date.now()).toISOString()}`
    );
    next();
};
