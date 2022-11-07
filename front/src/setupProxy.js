const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(createProxyMiddleware("/api", {
        target: "https://server-cs340.herokuapp.com",
        changeOrigin: true
    }));
}