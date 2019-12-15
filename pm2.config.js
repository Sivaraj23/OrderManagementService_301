module.exports = {
    apps : [{
      name        : "app",
      script      : "./dist/server.js",
      watch       : true,
      exec_mode : "cluster",
      instances : 3
    }]
  }