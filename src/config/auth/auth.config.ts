export default () => ({
  app: {
    port: process.env.PORT,
    production: process.env.PRODUCTION === 'true',
  },
  auth: {
    cookieName: process.env.COOKIE_NAME,
    cookieMaxAge: parseInt(process.env.COOKIE_MAX_AGE!),
    cookieSecure: process.env.COOKIE_SECURE === 'true',
    cookieHttpOnly: process.env.COOKIE_HTTP_ONLY !== 'false',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN!),
  },
});
