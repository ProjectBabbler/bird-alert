var firebase = require('firebase');
var serviceAccount = require('./firebaseKey.js');
var config = {
    apiKey: "AIzaSyDNOBo6oB1SdBHfhe3x5ECljo5z1QWVrgc",
    authDomain: "bird-alert.firebaseapp.com",
    databaseURL: "https://bird-alert.firebaseio.com",
    storageBucket: "bird-alert.appspot.com",
    serviceAccount: serviceAccount,
};
let app = firebase.initializeApp(config);

module.exports = app;