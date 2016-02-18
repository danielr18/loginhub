//Token configuration.
module.exports = {
  // App Settings
  MONGO_URI: process.env.MONGO_URI || 'localhost',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'P08KEQ4MSITn9YL',

  // OAuth 2.0
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'fb429818ad01467b5a3d45324999a8f4',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
  INSTAGRAM_SECRET: process.env.INSTAGRAM_SECRET || 'YOUR_INSTAGRAM_CLIENT_SECRET',


  // OAuth 1.0
  TWITTER_KEY: process.env.TWITTER_KEY || 'gbe5shiQPZX2NnJXsZAU8saWS',
  TWITTER_SECRET: process.env.TWITTER_SECRET || 'ooR5gNfLM4GPdzDAOZAV8q3tPn2w49rMgQTMyrJRtL5MI8JplG'
};
