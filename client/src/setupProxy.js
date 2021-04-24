// eslint-disable-next-line import/no-extraneous-dependencies
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:5000',
      // changeOrigin: true,
      ws: true,
      pathRewrite: { '^/api': '' },
    }),
  );
};
