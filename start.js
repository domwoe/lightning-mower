// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require("babel-polyfill");
require('babel-register')({
    presets: [ 'env' ]
})
require("babel-core").transform("code", {
    plugins: ["transform-async-to-generator"]
});


// Import the rest of our application.
module.exports = require('./app.js')
