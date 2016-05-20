var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyDNOBo6oB1SdBHfhe3x5ECljo5z1QWVrgc",
    authDomain: "bird-alert.firebaseapp.com",
    databaseURL: "https://bird-alert.firebaseio.com",
    storageBucket: "bird-alert.appspot.com",
};
firebase.initializeApp(config);

module.exports = firebase;
