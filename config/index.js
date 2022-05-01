'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    FB: {
      pageAccessToken: process.env.PAGE_ACCESS_TOKEN,
      verifyToken: process.env.VERIFY_TOKEN,
      appSecret: process.env.APP_SECRET,
    },
    witToken: process.env.WIT_TOKEN,
    LASTFM : process.env.LASTFM
  }
} else {
  module.exports = require('./development.json') ;
}
