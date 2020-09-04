//~Mocha version 1.0.1 User Data Collection and Managment Script
//Copyright 2020 All rights reserved®
//Backstore: Firebase Firestore
//Author: Manav Bhatia
//Contact: manav@ucsc.edu

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBP5kvYKeKJzRRPD6VOTrW1wGfbf01swtE",
  authDomain: "kitchen-menu-sc.firebaseapp.com",
  databaseURL: "https://kitchen-menu-sc.firebaseio.com",
  projectId: "kitchen-menu-sc",
  storageBucket: "kitchen-menu-sc.appspot.com",
  messagingSenderId: "850473897616",
  appId: "1:850473897616:web:76ec4bbd36e4d590641215",
  measurementId: "G-14Q61JQ1NZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();


var db = firebase.firestore(); 

function addUser() {
    var days = []; 
    var inputs = document.getElementsByClassName("checkbox"); 
    for(i = 0; i < inputs.length; i++){
        if(inputs[i].checked){
            days.push(inputs[i].getAttribute("id"))
        }
    }
    db.collection("guests").add({
        name: document.getElementById("guest-name").value,
        dates: days
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        window.alert("Successfully Checked In!")
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

function getUserDays() {
    foundFlag = false; 
    db.collection("guests").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().name == document.getElementById("guest-name-confirm").value){
                window.alert("Days are: " + doc.data().dates)
                foundFlag = true; 
            }
        });
        if(!foundFlag){
            window.alert("Error 127: Name not found in system, Please Contact Admin (bottom of page) or re-register")
        }
    });

}

function deleteData(){
    db.collection("guests").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc)
            doc.ref.delete()
        });
        window.alert("Database Successfully Cleared")
    }); 
}

function verifyAdmin(){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(
    function(){
      firebase.auth().signInWithEmailAndPassword(document.getElementById("admin-email").value, document.getElementById("admin-password").value).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error: " + errorCode + errorMessage); 
      });
      document.getElementById("admin-password").value = '';
     var user = firebase.auth().currentUser;
      if(user){

      } else {
          console.log("ur a failure");
      }

    })
}

function signOutAdmin(){
    firebase.auth().signOut().then(function() {
      console.log("sign out Successful");
      document.getElementById("sign-out").style.display = "none";
      document.getElementById("ad-log").style.display = "block";
      document.getElementById("clear-db").style.display = "none";
    }).catch(function(error) {
      window.alert(error); 
    });

}


function verifyUser(){
      firebase.auth().signInWithEmailAndPassword(document.getElementById("user-email").value, document.getElementById("user-password").value).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorCode + errorMessage);
      });
      setTimeout(function(){
        var user = firebase.auth().currentUser;
        if(user){
          document.getElementById("user-password").value = '';
          window.location.href = "userIndex.html"
          console.log("sign-in successful")
        } else {
            console.log("reattempting login");
        }
      }, 2000);
}
                                            
function signOutUser(){
    firebase.auth().signOut().then(function() {
      console.log("sign out Successful");
      window.location.href = "index.html"
    }).catch(function(error) {
      window.alert(error); 
    });

}

function getUserName(){
  setTimeout(function(){
    var user = firebase.auth().currentUser;
    if(user){
          document.getElementById("guest-name").value = user.email;
          document.getElementById("guest-name-confirm").value = user.email;
          document.getElementById("user-name").innerHTML = user.email;
          console.log(user.email);
        } else {
          console.log("ur a failure");
        }
  }, 2000);
}

function newUser(){
  firebase.auth().createUserWithEmailAndPassword(document.getElementById("user-email").value, document.getElementById("user-password").value).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error: " + errorCode + errorMessage);
  });
  setTimeout(function(){
        var user = firebase.auth().currentUser;
        if(user){
          user.updateProfile({
            displayName: document.getElementById("user-name").value
          })
          window.location.href = "userIndex.html"
          console.log("sign-up successful")
          window.alert("Sign up Successful");
        } else {
            console.log("signup failure");
        }
      }, 3000);
}

