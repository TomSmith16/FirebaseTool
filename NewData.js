


(function(){


	  // Initialize Firebase
	  var config = {
		apiKey: "AIzaSyC5bz0oEIo19U2rYoR3BqdvQqeF0ucqUGo",
		authDomain: "moral-dilemmas.firebaseapp.com",
		databaseURL: "https://moral-dilemmas.firebaseio.com",
		projectId: "moral-dilemmas",
		storageBucket: "moral-dilemmas.appspot.com",
		messagingSenderId: "915277643505"
	  };
	  firebase.initializeApp(config);


	  
	  //Set database data to text of the object.
}()) ;

window.onload = Load();



function Load() {
	var dataShow = document.getElementById("dataShow");
var firebaseBigRef = firebase.database().ref().child("users");

firebaseBigRef.on('value', function(datasnapshot){
	dataShow.innerHTML = datasnapshot;
});
	var firebaseRef = firebase.database().ref();
	
	
}