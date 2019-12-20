var passport=require("passport")
var GitHubStrategy = require('passport-github2').Strategy;

var GITHUB_CLIENT_ID = "855af839efabd2e48f8a";
var GITHUB_CLIENT_SECRET = "0ce821a131a216abbeb2b396af3cd4c776514710";





passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  
  

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3002/"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        console.log(JSON.stringify(profile))
      return done(null, profile);
    });
  }
));



exports.gitHubAuthVerify = passport.authenticate('github', { scope: [ 'user:email' ] });