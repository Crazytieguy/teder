const { API_HOST, API_PORT } = process.env;
// eslint-disable-next-line import/no-extraneous-dependencies
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/api', {
      target: `http://${API_HOST}:${API_PORT}`,
      changeOrigin: true,
      ws: true,
      pathRewrite: { '^/api': '' },
    }),
  );
};
