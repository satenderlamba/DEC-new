 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDplLLhMHEPyILl0Q3Em9Fw6e1qmYhICfI",
    authDomain: "login-312e5.firebaseapp.com",
    databaseURL: "https://login-312e5.firebaseio.com",
    projectId: "login-312e5",
    storageBucket: "login-312e5.appspot.com",
    messagingSenderId: "1054556560926",
    appId: "1:1054556560926:web:b8ca73b9b81824d8bc180f",
    measurementId: "G-K23DBX40W2"
  };


  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
function signInUsers(){
    var email = document.getElementById('txtemail').value
    var pass = document.getElementById('txtpassword').value
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(function(data){
        console.log(data)
      })


      .catch(function(error) {
            // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.MESSAGE;
        console.log(errorCode);
        console.log(errorMessage);
        })
      
}


//check if user is logged in or not
function checkIfLogedIn(){
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) { // if the user is logged in
        console.log(user)
        var emailv =user.email;


        console.log("User is signed in. with email: "+ emailv);
      } else { // if the user is not logged in
          console.log("No user is signed in.");
      }
  });
}


/*
          to tweak for forgot password
var actionCodeSettings = {
  url: 'https://www.example.com/?email=user@example.com',
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  handleCodeInApp: true
};
firebase.auth().sendPasswordResetEmail(
    'user@example.com', actionCodeSettings)
    .then(function() {
      // Password reset email sent.
    })
    .catch(function(error) {
      // Error occurred. Inspect error.code.
    });
    */
window.onload=function(){
  checkIfLogedIn()
}
function logout(){
  firebase.auth().signOut();
  checkIfLogedIn()
}