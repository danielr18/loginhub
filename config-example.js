//Token configuration.
module.exports = {
  // App Settings
  MONGO_URI: process.env.MONGO_URI || 'localhost',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'YOUR SECRET',

  // OAuth 2.0
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'YOUR_FACEBOOK_CLIENT_SECRET',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
  INSTAGRAM_SECRET: process.env.INSTAGRAM_SECRET || 'YOUR_INSTAGRAM_CLIENT_SECRET',


  // OAuth 1.0
  TWITTER_KEY: process.env.TWITTER_KEY || 'YOUR_TWITTER_KEY',
  TWITTER_SECRET: process.env.TWITTER_SECRET || 'YOUR_TWITTER_SECRET',

  //Database
  DATABASE_URL: "mongodb://user:pass@url:27017/database"

  //Mailing
  LOGINHUB_EMAIL: "GMAIL USERNAME",
  LOGINGUB_EMAIL_PASSWORD: "GMAIL PASSWORD"
};
