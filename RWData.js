//Wide usage variables
var usersRef;
var datashow = document.getElementById("datashow");
var rwmoral = true;
var charloaded = false;
var rwloaded = false;
var lastpressed = 0;
//HTML ID variables
var heading = document.getElementById("heading");
var charbutton = document.getElementById("charbutton");
var total = document.getElementById("total");

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
	updateData();
}
function RWData()
{
	usersRef = firebase.database().ref().child("users");
	rwmoral = true;
	webFormatting();
	//console.log("RW" + usersRef);
	usersRef.on('value', gotData, errData);
	updateData();
}

function updateData()
{
	switch(lastpressed)
	{
		case 0:
			LoadAge();
		break;
		case 1:
			LoadGenders();
		break;
		case 2:
			LoadGames();
		break;
		case 3:
			LoadIRL();
		break;
		case 4:
			LoadVG();
		break;
		case 5:
			if(rwmoral)
				LoadAge();
			else
				LoadChar();
		break;
		case 6:
			LoadResponses();
		break;
		default:
			LoadAge();
		break;
	}
}

//Data variables
var irlTemp = [];
var vgTemp = [];
var tempPush1 = [];
var tempPush2 = [];
var responseMass = [];
var responseOut = [];
var responseCompare = [];


var userIDs = [];
var userAges = [];
var userGenders = [];
var userRoles = [];
var userGames = [];
var userChars = [];

var characters = [];
var games = [];
var irlmfq = [];
var vgmfq = [];
var mfq = [];

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
	responseMass = [];
	responseOut = [];
	responseCompare = [];
	
	characters = [];
	games = [];
	irlmfq = [];
	vgmfq = [];
	mfq = [];

	less20 = [];
	less26 = [];
	less30 = [];
	plus30 = [];
	
	//console.log(data.val());
	var users = data.val();
	var keys = Object.keys(users);
	//console.log(keys);
	
	//For each response
	for(var i = 0; i < keys.length; i++)
	{
		//mfq[i] = "";
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
					//console.log(characters[j]);
					userChars.push(characters[j]);
				}
				
			}		
			//console.log(participant['vg mfq']);
			irlTemp = participant['irl mfq'];
			vgTemp = participant['vg mfq'];
			//console.log("--------");
			
			
			
			
			tempPush1 = [];
			//IRLMFQ
			for(var j=0; j<irlTemp[1].length;j++)
			{
				irlmfq[j] = irlTemp[1][j];
					//console.log("IRLMFQ " + j + ": " + irlmfq[j]);
					tempPush1.push(irlmfq[j]);
								
				
			}
			//console.log(tempPush1);
			//mfq[i] += tempPush1;
			
			
			
			tempPush2 = [];
			//console.log(vgTemp);
			//VGMFQ
			for(var j=0; j<vgTemp[1].length;j++)
			{
				vgmfq[j] = vgTemp[1][j];
				tempPush2.push(vgmfq[j]);
				//mfq.push(vgmfq);
					//console.log("VGMFQ " + j + ": " + vgmfq[j]);
			}
			//console.log(tempPush2);
			mfq.push([tempPush1, tempPush2])
			//mfq[i] += "|||" + tempPush2;
			//mfq.push(vgmfq);
		// 
		//console.log(mfq);
		 
		
		
		var responses = users[k].responses;
		
			//console.log(responses);
			for(var l=0; l < responses.length; l++)
			{
				//Mass response array
				
				/*response[l].characterL/R = Either side
				  response[l].dilemma = dilemma name and string
				  response[l].outcome = Death result of outcome.
				*/
				responseMass.push(responses[l]);
				//responseOut.push(responses[l].dilemma);
				responseOut.push(responses[l].outcome);
				responseCompare.push(responses[l].characterL);
				responseCompare.push(responses[l].characterR);
				responseCompare.push(responses[l].outcome);
				
				
				
				
				
			}
		
	}
	
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
	total.innerHTML = "<div>Total Responses:</div><div>" + userAges.length + "</div>";
	
	if(rwmoral)
	rwloaded = true;

	if(!rwmoral)
	charloaded = true;
//console.log(responseCompare);
//console.log(responseOut);
//console.log(responseMass)
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
	datashow.innerHTML = "<div>Age Distribution</div><br><div>< 20:</div><div> " + less20.length + "</div><br><div>20 - 25:</div><div> " + less26.length + "</div><br><div>26-30:</div><div> " + less30.length + "</div><br><div>30+:</div><div> " + plus30.length + "</div>";
	
	lastpressed = 0;
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
	
	datashow.innerHTML = "<div>Gender Distribution</div><br><div>Male:</div><div> " + maleCount.length + "</div><br><div>Female: </div><div>" + femaleCount.length + "</div><br><div>Other: </div><div>" + otherCount.length + "</div><br><div>N/A:</div><div>" + noCount.length + "</div>";
	
	lastpressed = 1;
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
	
	datashow.innerHTML = "<div>Game Genres</div><br><div>Shooter:</div><div> " + shooterCount.length + "</div><br><div>MOBA:</div><div>" + mobaCount.length + "</div><br><div>RPG:</div><div>" + rpgCount.length + "</div><br><div>Strategy:</div><div> " + strategyCount.length + "</div><br><div>Fighting:</div><div> " + fightingCount.length +
	"</div><br><div>Sports: </div><div>" + sportsCount.length + "</div><br><div>Racing: </div><div>" + racingCount.length + "</div><br><div>TCG: </div><div>" + tcgCount.length + "</div><br><div>Survival:</div><div> " + survivalCount.length + "</div><br><div>Puzzle:</div><div> " + puzzleCount.length + "</div><br><div>Other: </div><div>" + otherCount.length + "<br> (" + otherCount + ")</div>";
	
	lastpressed = 2;
}


function LoadIRL(){
	checkLoaded();
	var loadirl= 0;
	
	var harmcare = 0;
	var fairrecip= 0;
	var grouployalty= 0;
	var authresp= 0;
	var puresanc= 0;
	
	
	for(var i=0; i<mfq.length; i++)
	{
		loadirl = mfq[i][0];
				harmcare += loadirl[0];
		//console.log("Harmcare: " + harmcare);
				fairrecip += loadirl[1];
		//console.log("Fair: " + fairrecip);
				grouployalty += loadirl[2];
		//console.log("Group: " + grouployalty);
				authresp += loadirl[3];
		//console.log("Auth: " + authresp);
				puresanc += loadirl[2];
		//console.log("Purity: " + puresanc);
	}
	//console.log(mfq.length);
	harmcare /= mfq.length;
	fairrecip /= mfq.length;
	grouployalty /= mfq.length;
	authresp /= mfq.length;
	puresanc /= mfq.length;
	
	datashow.innerHTML = "<div>Averages </div><br>";
	datashow.innerHTML += "<div>Harm/Care: </div><div>" + harmcare.toFixed(2) + "</div><br>";
	datashow.innerHTML += "<div>Fairness/Reciprocity: </div><div>" + fairrecip.toFixed(2) + "</div><br>";
	datashow.innerHTML += "<div>In-group/Loyalty: </div><div>" + grouployalty.toFixed(2)+ "</div><br>";
	datashow.innerHTML += "<div>Authority/Respect: </div><div>" + authresp.toFixed(2)+ "</div><br>";
	datashow.innerHTML += "<div>Purity/Sanctity: </div><div>" + puresanc.toFixed(2)+ "</div><br>";
	
	/*
	console.log(harmcare);
	console.log(fairrecip);
	console.log(grouployalty);
	console.log(authresp);
	console.log(puresanc);
*/	lastpressed = 3;

}

function LoadVG(){
	var loadirl= 0;
	
	var harmcare = 0;
	var fairrecip= 0;
	var grouployalty= 0;
	var authresp= 0;
	var puresanc= 0;
	
	
	
	//Average
	for(var i=0; i<mfq.length; i++)
	{
		loadirl = mfq[i][1];
				harmcare += loadirl[0];
		//console.log("Harmcare: " + harmcare);
				fairrecip += loadirl[1];
		//console.log("Fair: " + fairrecip);
				grouployalty += loadirl[2];
		//console.log("Group: " + grouployalty);
				authresp += loadirl[3];
		//console.log("Auth: " + authresp);
				puresanc += loadirl[2];
		//console.log("Purity: " + puresanc);
	}
	//console.log(mfq.length);
	harmcare /= mfq.length;
	fairrecip /= mfq.length;
	grouployalty /= mfq.length;
	authresp /= mfq.length;
	puresanc /= mfq.length;
	
	datashow.innerHTML = "<div>Averages </div><br>";
	datashow.innerHTML += "<div>Harm/Care: </div><div>" + harmcare.toFixed(2) + "</div><br>";
	datashow.innerHTML += "<div>Fairness/Reciprocity: </div><div>" + fairrecip.toFixed(2) + "</div><br>";
	datashow.innerHTML += "<div>In-group/Loyalty: </div><div>" + grouployalty.toFixed(2)+ "</div><br>";
	datashow.innerHTML += "<div>Authority/Respect: </div><div>" + authresp.toFixed(2)+ "</div><br>";
	datashow.innerHTML += "<div>Purity/Sanctity: </div><div>" + puresanc.toFixed(2)+ "</div><br>";
	
	/*console.log(harmcare);
	console.log(fairrecip);
	console.log(grouployalty);
	console.log(authresp);
	console.log(puresanc);
*/
	lastpressed = 4;
}



function LoadResponses(){
	checkLoaded();
	var responseTemp;
	var adultDeathCount = 0;
	var adultnpcDeath = 0;
	var adulthumanDeath = 0;
	var kidDeathCount = 0;
	var kidnpcDeath = 0;
	var kidhumanDeath = 0;

	var femaCount = 0;
	var maleCount = 0;
	var npcCount = 0;
	var friendCount = 0;
	var strangerCount = 0;
	
	
	for(var i=0; i<responseOut.length; i++)
	{
		responseTemp = responseOut[i];
		//console.log(responseOut[i]);
		for(var j=0; j<responseTemp.length; j++)
		{
			
			
			
			//console.log(responseTemp[j]);
			if(responseTemp[j].includes("Female"))
				femaCount += 1;
			//console.log("Fema Add: " +responseTemp[j]);
			else if(responseTemp[j].includes("Male") || responseTemp[j].includes("man"))
				maleCount +=1;
			//console.log("Male Add: " +responseTemp[j]);
			//else //Extra includes Large man, quest failed and "everybody"
				//console.log("EXTRA   : " + responseTemp[j]);
			
			/*
			if(responseTemp[j].includes("child"))
				kidCount += 1;
			else
				adultCount += 1;
			*/
			
			if(responseTemp[j].includes("NPC"))
				npcCount += 1;
			//console.log("NPC Add: " +responseTemp[j]);
			else if(responseTemp[j].includes("Friend"))
				friendCount+=1;
			else if(responseTemp[j].includes("Stranger"))
				strangerCount+=1;
			//console.log("Fri Add: " +responseTemp[j]);
			//else
				//console.log("EXTRA  : " + responseTemp[j]);
		}
	}
	
	
	datashow.innerHTML = "<div>Total Death Counts</div><br><div>Female Death Count:</div><div> " + femaCount + "</div><br><div>Male Death Count:</div><div> " + maleCount + "</div><br><div>NPC Death Count:</div><div>" + npcCount + "</div><br><div>Friend Death Count:</div><div> " + friendCount + "</div><br>";
	if(rwmoral)
		datashow.innerHTML += "<div>Stranger Death Count:</div><div> " + strangerCount + "</div><br>";
	
	
	var highestTemp;
	var mostKilled = 0;
	var mostSaved = 0;
	var equalLength = false;
	var childinleft = false;
	var childinright = false;
	var childindilemma = false;
	//console.log(responseCompare.length);
	for(var i=0; i<responseCompare.length; i+=3)
	{
		
		if(responseCompare[i].length > responseCompare[i+1].length)
		{
			equalLength = false;
			highestTemp = responseCompare[i].length;
			//console.log(responseCompare[i].length + ">" + responseCompare[i+1].length);
		}
		else if(responseCompare[i+1].length > responseCompare[i].length)
		{
			equalLength = false;
			highestTemp = responseCompare[i+1].length;
			//console.log(responseCompare[i].length + "<" + responseCompare[i+1].length);
			//console.log(highestTemp);
		}
		else
		{
			equalLength = true;
			//console.log(responseCompare[i].length + "==" + responseCompare[i+1].length);
			//console.log("Equal length");
		}
		
		if(responseCompare[i+2].length == highestTemp && !equalLength)
		{
			//console.log("Result (killed): " + responseCompare[i+2].length + "==" + highestTemp);
			//console.log("Killed the most");
			mostKilled += 1;
		}
		else if(responseCompare[i+2].length < highestTemp && !equalLength)
		{
			//console.log("Result (killed): " + responseCompare[i+2].length + ">" + highestTemp);
			//console.log("Saved the most");
			mostSaved += 1;
		}
		/*else
			console.log("Difference is 0");
			//console.log("Equal Length");
			*/
		console.log("///////////////////////////////////");
		childinleft = false;
		childinright = false;
			for(var j=0; j<responseCompare[i].length; j++)
			{
				
				//console.log(responseCompare[i+2][j]);
				if(responseCompare[i][j].includes("child"))
				{
					console.log("Left: " + responseCompare[i][j]);
					/*for(var k=0; k<responseCompare[i+2].length; k++)
					{
						if(!(responseCompare[i+2][k].includes("child")))
						{
							//console.log(" Outcome: " + responseCompare[i+2][k]);
							adultDeathCount += 1;
						}
						else
							kidDeathCount +1 ;
						*/
					//}
					//childindilemma = true;
					childinleft = true;
					
				}
				else
					console.log("No child in left (" + responseCompare[i][j] + ")");
			}
			
			
		if(!childinleft)
		{
			for(var j=0; j<responseCompare[i+1].length; j++)
			{
				//console.log(responseCompare[i+2][j]);
				if(responseCompare[i+1][j].includes("child"))
				{
					console.log("Right: " + responseCompare[i+1][j]);
					/*for(var k=0; k<responseCompare[i+2].length; k++)
					{
						if(!(responseCompare[i+2][k].includes("child")))
						{
							//console.log(" Outcome: " + responseCompare[i+2][k]);
							adultDeathCount += 1;
						}
						else
							kidDeathCount +1 ;
					}*/
					childinright = true;
					
				}
				else
					console.log("No child in right (" + responseCompare[i+1][j] + ")");
				
			}
		}
			
			if(!childinleft && !childinright)
				console.log("No child in dilemma");
			else
			{
					for(var j=0; j<responseCompare[i+2].length; j++)
				{
					if(responseCompare[i+2][j].includes("child"))
					{
						console.log("(Kid died) Outcome: " + responseCompare[i+2][j]);
						kidDeathCount+=1;
						if(responseCompare[i+2][j].includes("NPC"))
							kidnpcDeath+=1;
						else
							kidhumanDeath+=1;
						
					}
					else
					{
						console.log("(Adult died) Outcome: " + responseCompare[i+2][j]);
						adultDeathCount+=1;
						if(responseCompare[i+2][j].includes("NPC"))
							adultnpcDeath+=1;
						else
							adulthumanDeath+=1;
					}
					
				}
			}
			
			/*for(var j=0; j<responseCompare[i+1].length; j++)
			{
				if(responseCompare[i+1][j].includes("child") && !responseCompare[i+2][j].includes("child"))
				{
					console.log(" Right: " + responseCompare[i+1][j] + " Outcome: " + responseCompare[i+2][j]);
					adultDeathCount += 1;
				}
			}
		*/

		
		/*
		for(var j=0; j<responseCompare[i+2].length; j++)
		{
			//If the scenario has resulted in a childs death, increase kiddeathcount
			if(responseCompare[i+2][j].includes("child"))
			{
				//console.log(responseCompare[i+2][j]);
				kidDeathCount += 1;
			}
			//Check if the dilemma has a child in i or i+1 but i+2 does not, increase adultdeathcount by 1
			//else
				//console.log("NO CHILD:       " + responseCompare[i+2][j]);
		}
		*/
		
	}
	
	datashow.innerHTML += "<div> Age preference* </div><br> <div>Total kid deaths:</div><div>" + kidDeathCount + "</div><br><div>NPC kid deaths:</div><div> " + kidnpcDeath + "</div><br><div>Human kid deaths:</div><div> " + kidhumanDeath + "</div><br><div>Total adult deaths:</div><div> " + adultDeathCount + "</div><br><div>NPC adult deaths:</div><div> " + adultnpcDeath + "</div><br><div>Human adult deaths:</div><div> " + adulthumanDeath + "</div><br>";
	
	/*
	console.log("Total kid deaths: " + kidDeathCount);
	console.log("Child NPC deaths: " +kidnpcDeath);
	console.log("Child human deaths: " + kidhumanDeath);
	
	console.log("Total adult deaths: " + adultDeathCount);
	console.log("Adult NPC deaths: " +adultnpcDeath);
	console.log("Adult human deaths: " + adulthumanDeath);
	*/

	//console.log("Times highest amount was killed: " + mostKilled);
	//console.log("Times highest amount was saved: " + mostSaved);
	
	datashow.innerHTML += "<br><div>Saving more lives**</div><br><div>More people were saved:</div><div> " + mostSaved + "</div><br><div>More people were killed:</div><div>" + mostKilled + "</div>";

	
	datashow.innerHTML += "<br><br>* where both adults and children were involved in the dilemma <br><br>** where the dilemma presented options of different death counts"
	lastpressed = 6;
	
	
}


function LoadChar(){
	checkLoaded();
	if(!rwmoral)
	{
		if(datashow.innerHTML !== "")
			datashow.innerHTML = "<div>Characters and Games</div><br>";
		for(var k=0; k<userChars.length-1; k+=2)
		{
			datashow.innerHTML += "<div>" + userChars[k] + "</div> <div>" + userChars[k+1] + "</div><br>";
		}
		console.log(userChars);
	}
	else
		alert("Requires Character Firebase");
	
	lastpressed = 5;
	
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
