//Wide usage variables
var usersRef;
var datashow = document.getElementById("datashow");
var rwmoral = true;
var charloaded = false;
var rwloaded = false;
//HTML ID variables
var heading = document.getElementById("heading");
var charbutton = document.getElementById("charbutton");

//Initialising both firebases
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
	  rwmoral = true;
	
		console.log(firebase.app().name);

	usersRef = firebase.database().ref().child("users");
	usersRef.on('value', gotData, errData);
	rwloaded = true;
	webFormatting();
	  
	  //Set database data to text of the object.
})();

(function(){

	// Initialize Firebase
	  // Initialize Firebase
	  var config = {
		apiKey: "AIzaSyAgoycgZYdFJBnzTqS8ZZuBDQfVu6CUpFE",
		authDomain: "moral-dilemmas-char.firebaseapp.com",
		databaseURL: "https://moral-dilemmas-char.firebaseio.com",
		projectId: "moral-dilemmas-char",
		storageBucket: "moral-dilemmas-char.appspot.com",
		messagingSenderId: "146665727993"
	  };
		charapp = firebase.initializeApp(config, "charapp");
		rwmoral = false;
		
	  console.log(charapp.name);
	  
	usersRef = charapp.database().ref().child("users");
	usersRef.on('value', gotData, errData);
	
	webFormatting();
	  //console.log("Char data!");
})();

//Button presses for each firebase
function CharData()
{
	usersRef = charapp.database().ref().child("users");
	rwmoral = false;
	webFormatting();
	//console.log("Char" + usersRef);
	usersRef.on('value', gotData, errData);
}
function RWData()
{
	usersRef = firebase.database().ref().child("users");
	rwmoral = true;
	webFormatting();
	//console.log("RW" + usersRef);
	usersRef.on('value', gotData, errData);
}


//Data variables
var userIDs = [];
var userAges = [];
var userGenders = [];
var userRoles = [];
var userGames = [];
var userChars = [];

var characters = [];
var games = [];
var irlmfq = [];
var vgfmfq = [];

var less20 = [];
	var less26 = [];
	var less30 = [];
	var plus30 = [];
	
	
function webFormatting()
{
	if(rwmoral)
	{

	document.body.style.backgroundImage ="url('bg.png')";
	heading.innerHTML = "Personal Moral Dilemmas";
	charbutton.style.visibility = "hidden";

	}
	else
	{
	document.body.style.backgroundImage ="url('bg1.png')";
	charbutton.style.visibility = "visible";
	heading.innerHTML= "Character Moral Dilemmas";

	}
}
	
function gotData(data)
{
	
	userIDs = [];
	userAges = [];
	userGenders = [];
	userRoles = [];
	userGames = [];
	userChars = [];
	
	characters = [];
	games = [];
	irlmfq = [];
	vgfmfq = [];

	less20 = [];
	less26 = [];
	less30 = [];
	plus30 = [];
	
	//console.log(data.val());
	var users = data.val();
	var keys = Object.keys(users);
	//console.log(keys);
	for(var i = 0; i < keys.length; i++)
	{
		//All users
		var k = keys[i];
			//console.log("K: " + k);
			//Participant
			
		var participant = users[k].participant;
			//console.log(participant);
			
			//UserID check for any duplicates
			var userID = participant.userID;
			userIDs[i] = userID;
				//console.log("UserID: " + userIDs[i]);
				
			//Age
			var age = participant.age;
			userAges[i] = age;
				//console.log("Age: " + userAges[i]);
			
			//Gender
			var gender = participant.gender;
			userGenders[i] = gender;
				//console.log("Gender: " + userGenders[i]);
				
			//Games
			for(var j=0; j<participant.games.length;j++)
			{
				games[j] = participant.games[j];
				userGames.push(games[j]);
				
					//console.log("Game " + j + ": " + games[j]);
			}
			
				//console.log("Games: " + userGames);
			
			//Roles - eventually group by keyword
			var roles = participant.roles;
			userRoles[i] = roles;
				//console.log("Roles: " + userRoles[i]);

			if(!rwmoral && participant.character)
			{
				for(var j=0; j<participant.character.length-1;j++)
				{
					characters[j] = participant.character[j];
					userChars.push(characters[j]);
				}
				//console.log(userChars);
			}		
		
			/*
			//IRLMFQ
			for(var j=0; j<participant.irlmfq.length;j++)
			{
				irlmfq[j] = participant.irlmfq.child[j];
					console.log("IRLMFQ " + j + ": " + irlmfq[j].child);
			}
			
			//VGMFQ
			for(var j=0; j<participant.vgmfq.length;j++)
			{
				vgmfq[j] = participant.vgmfq[j];
					console.log("VGMFQ " + j + ": " + vgmfq[j]);
			}
		// */
		
		
		/*
		var responses = users[k].responses;
			console.log(responses);
			for(var l=0; l < responses.length; l++)
			{
				//console.log(responses[l]);
				var responseInstance = responses[l];
				responseInstance.
			}
		*/
	}
	//console.log(userChars);
	//console.log(userGames);
	

	for(var i=0; i<userAges.length; i++)
	{
		
		if(userAges[i] <=20 && userAges[i] !== null)
		{
			less20.push(userAges[i]);
			//console.log("<20: " + less20);
		}
		else if (userAges[i] >20 && userAges[i] <=25)
		{
			less26.push(userAges[i]);
		}
		else if(userAges[i] <= 30)
		{
			less30.push(userAges[i]);
			//console.log("20 - 30: " + to30);
		}
		else
		{
			plus30.push(userAges[i]);
			//console.log("30+: " + plus30);
			
		}
	}
	//console.log("<20: " + less20);
	//console.log("20 - 25: " + less26);
	//console.log("26-30: " + less30);
	//console.log("30+: " + plus30);
	//Repeat same process for responses.responses, go through each response and have a switch to check for what answer is saved, as well as saving answers that were offered. Gather in several arrays so can check who is saved the most, the least, look for indexes in each answer (male, female, boy, girl) can gather data similar to MIT moral machine. Then gather data for each response (out of each option, a majority of people chose to finish the quest rather than save their companion, inside of this it was more favoured to sacrifice the NPC companion over the Human companion, etc etc.
	if(rwmoral)
	rwloaded = true;

	if(!rwmoral)
	charloaded = true;
}

function errData(err) {
	console.log("Error!");
	console.log(err);
}

function checkLoaded()
{
	if(rwloaded && charloaded)
	{
		
	}
	else
	{
		alert("Loading firebase data");
	}
}

function LoadAge() {
	checkLoaded();
	datashow.innerHTML = "<div>Total:</div><div>" + userAges.length + "</div></br><div>< 20:</div><div> " + less20.length + "</div><br><div>20 - 25:</div><div> " + less26.length + "</div><br><div>26-30:</div><div> " + less30.length + "</div><br><div>30+:</div><div> " + plus30.length + "</div>";
}

function LoadGenders() {	
	var maleCount = [];
	var femaleCount = [];
	var otherCount = [];
	var noCount = [];
	for(var i=0; i<userGenders.length; i++)
	{
			if(userGenders[i] == "Male")
			{
				maleCount.push(userGenders[i]);
			}
			else if(userGenders[i] == "Female")
			{
				femaleCount.push(userGenders[i]);
			}
			else if(userGenders[i] == "Other")
			{
				otherCount.push(userGenders[i]);
			}
			else
				noCount.push(userGenders[i]);
			
	}
	
	datashow.innerHTML = "<div>Total:</div><div>" + userGenders.length + "</div></br><div>Male:</div><div> " + maleCount.length + "</div><br><div>Female: </div><div>" + femaleCount.length + "</div><br><div>Other: </div><div>" + otherCount.length + "</div><br><div>N/A:</div><div>" + noCount.length + "</div>";
}

function LoadGames() {
	checkLoaded();
	//console.log(userGames);
	var shooterCount = [];
	var mobaCount = [];
	var rpgCount = [];
	var strategyCount = [];
	var fightingCount = [];
	var sportsCount = [];
	var racingCount = [];
	var tcgCount = [];
	var survivalCount = [];
	var puzzleCount = [];
	var otherCount = [];
	
	for(var i=0; i<userGames.length; i++)
	{
		switch(userGames[i])
		{
			case "Shooters":
				shooterCount.push(userGames[i]);
				break;

			case "MOBA":
				mobaCount.push(userGames[i]);
				break;
				
			case "RPG":
			rpgCount.push(userGames[i]);
				break;
				
			case "Strategy":
			strategyCount.push(userGames[i]);
				break;
				
			case "Fighting":
			fightingCount.push(userGames[i]);
				break;
				
			case "Sports":
			sportsCount.push(userGames[i]);
				break;
				
			case "Racing":
			racingCount.push(userGames[i]);
				break;
				
			case "TCG":
			tcgCount.push(userGames[i]);
				break;
				
			case "Survival":
			survivalCount.push(userGames[i]);
				break;
				
			case "Puzzle":
			puzzleCount.push(userGames[i]);
				break;
				
			default:
			otherCount.push(userGames[i]);
				break;
		}
	}
	
	datashow.innerHTML = "<div>Total:</div><div>" + userGames.length + "</div></br><div>Shooter:</div><div> " + shooterCount.length + "</div><br><div>MOBA:</div><div>" + mobaCount.length + "</div><br><div>RPG:</div><div>" + rpgCount.length + "</div><br><div>Strategy:</div><div> " + strategyCount.length + "</div><br><div>Fighting:</div><div> " + fightingCount.length +
	"</div><br><div>Sports: </div><div>" + sportsCount.length + "</div><br><div>Racing: </div><div>" + racingCount.length + "</div><br><div>TCG: </div><div>" + tcgCount.length + "</div><br><div>Survival:</div><div> " + survivalCount.length + "</div><br><div>Puzzle:</div><div> " + puzzleCount.length + "</div><br><div>Other: </div><div>" + otherCount.length + "<br> (" + otherCount + ")</div>";
}

function LoadChar(){
	checkLoaded();
	if(!rwmoral)
	{
		if(datashow.innerHTML !== "")
			datashow.innerHTML = "";
		for(var k=0; k<userChars.length-1; k+=2)
		{
			datashow.innerHTML += "<div>Total:</div><div>" + userChars.length + "</div></br><div>Character: </div>      <div>" + userChars[k] + "</div>      <div> Game: </div>      <div>" + userChars[k+1] + "</div><br>";
		}
		console.log(userChars);
	}
	else
		alert("Requires Character Firebase");
	
}
/*
function Load()
{
	usersRef.on('value', function(userlistsnapshot){
		//console.log(userlistsnapshot.val());
		var i = 0;
		userlistsnapshot.forEach(function(userlistsnapshot2) {
			//console.log(userlistsnapshot2.val());
			userlist.push(userlistsnapshot2.val());
			
			i++;			
		});
		//console.log(userlist.length);
		//console.log("I: " + i);
		datashow.innerHTML = datasnapshot.val();
		
	});
}
*/
