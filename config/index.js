var firebase=require("firebase");

var config = {
    apiKey: "AIzaSyCYPKHQ0JBExN9GQ2ovfJeJD8BedAyqZ1c",
    authDomain: "indal-1814f.firebaseapp.com",
    databaseURL: "https://indal-1814f.firebaseio.com",
    projectId: "indal-1814f",
    storageBucket: "indal-1814f.appspot.com",
    messagingSenderId: "18759806499"
  };
  firebase.initializeApp(config);
  module.exports = firebase;
