export default () => ({
  auth: {
    cookieName: process.env.COOKIE_NAME,
    cookieMaxAge: parseInt(process.env.COOKIE_MAX_AGE!),
    cookieSecure: process.env.COOKIE_SECURE === 'true',
    cookieHttpOnly: process.env.COOKIE_HTTP_ONLY !== 'false',
  },
});
