// ==============================
// SKYATTACK MAIN JAVASCRIPT
// PART 1
// ==============================



// ==============================
// MOBILE MENU
// ==============================


const menuButton =
document.querySelector(".menu-button");


const nav =
document.querySelector(".nav");



if(menuButton && nav){


menuButton.addEventListener(
"click",
()=>{


nav.classList.toggle("active");


const expanded =
menuButton.getAttribute(
"aria-expanded"
) === "true";



menuButton.setAttribute(
"aria-expanded",
!expanded
);



});


}








// ==============================
// FLASHCARD SYSTEM
// ==============================


const questionElement =
document.querySelector("#question");


const answerElement =
document.querySelector("#answer");


const showAnswerButton =
document.querySelector("#show-answer");


const nextCardButton =
document.querySelector("#next-card");


const correctButton =
document.querySelector("#correct");


const wrongButton =
document.querySelector("#wrong");


const resetButton =
document.querySelector("#reset-score");


const categorySelect =
document.querySelector("#category");


const progressElement =
document.querySelector("#card-progress");


const scoreElement =
document.querySelector("#score");






const flashcards = [


{
category:"aerodynamics",
question:"What are the four forces of flight?",
answer:"Lift, weight, thrust, and drag."
},


{
category:"aerodynamics",
question:"What is a stall?",
answer:"A stall occurs when the wing exceeds its critical angle of attack."
},


{
category:"weather",
question:"What does METAR provide?",
answer:"Current aviation weather observations."
},


{
category:"weather",
question:"What does TAF stand for?",
answer:"Terminal Aerodrome Forecast."
},


{
category:"airspace",
question:"What is Class B airspace?",
answer:"Controlled airspace around the busiest airports."
},


{
category:"regulations",
question:"What is FAR Part 91?",
answer:"General operating and flight rules."
}


];







let currentCards = [];


let currentIndex = 0;



let score =
Number(
localStorage.getItem(
"skyAttackScore"
)
) || 0;







function updateScore(){


if(scoreElement){


scoreElement.textContent =
`Score: ${score}`;


}



localStorage.setItem(
"skyAttackScore",
score
);


}








function loadCard(){


if(!questionElement) return;



const card =
currentCards[currentIndex];



if(!card) return;




questionElement.textContent =
card.question;



answerElement.textContent =
card.answer;



answerElement.style.display =
"none";




if(progressElement){


progressElement.textContent =
`Card ${currentIndex + 1} of ${currentCards.length}`;


}



}









function createDeck(){


if(!categorySelect) return;



const category =
categorySelect.value;



if(category === "all"){


currentCards =
[...flashcards];


}

else{


currentCards =
flashcards.filter(
card =>
card.category === category
);


}



currentCards.sort(
()=>Math.random() - 0.5
);



currentIndex = 0;



loadCard();



}








if(showAnswerButton){


showAnswerButton.addEventListener(
"click",
()=>{


answerElement.style.display =
"block";


});

}







if(nextCardButton){


nextCardButton.addEventListener(
"click",
()=>{


currentIndex++;



if(
currentIndex >= currentCards.length
){

currentIndex = 0;

}



loadCard();



});


}







if(correctButton){


correctButton.addEventListener(
"click",
()=>{


score++;


updateScore();


});


}







if(wrongButton){


wrongButton.addEventListener(
"click",
()=>{


updateScore();


});


}








if(resetButton){


resetButton.addEventListener(
"click",
()=>{


score = 0;


updateScore();


});


}







if(categorySelect){


categorySelect.addEventListener(
"change",
createDeck
);


}






updateScore();


createDeck();

// ==============================
// AIRCRAFT DATA
// ==============================


const aircraftData = [


{
name:"Cessna 172",
category:"trainer single-engine",
image:"cessna172.jpg",
page:"cessna172.html",
description:
"One of the world's most popular training aircraft known for stability and reliability."
},



{
name:"Piper PA-28",
category:"trainer single-engine",
image:"piperpa28.jpg",
page:"piperpa28.html",
description:
"A low-wing trainer aircraft used by many flight schools around the world."
},



{
name:"Diamond DA40",
category:"trainer single-engine glass-cockpit",
image:"diamondda40.jpg",
page:"diamondda40.html",
description:
"A modern composite aircraft featuring advanced avionics and efficient performance."
}


];








// ==============================
// AIRCRAFT CARD GENERATOR
// ==============================


const aircraftContainer =
document.querySelector("#aircraft-container");



let aircraftCards = [];





function displayAircraft(list){


if(!aircraftContainer) return;



aircraftContainer.innerHTML = "";




list.forEach(aircraft=>{



const card =
document.createElement("article");



card.classList.add(
"aircraft-card"
);





card.dataset.name =
aircraft.name.toLowerCase();



card.dataset.category =
aircraft.category;






card.innerHTML = `


<img

src="../images/${aircraft.image}"

alt="${aircraft.name} aircraft"

loading="lazy"

>


<div class="aircraft-content">


<h2>
${aircraft.name}
</h2>


<p>
${aircraft.description}
</p>


<a
href="${aircraft.page}"
class="btn"
>
View Aircraft
</a>


</div>


`;





aircraftContainer.appendChild(card);



});





aircraftCards =
document.querySelectorAll(
".aircraft-card"
);



}







displayAircraft(aircraftData);









// ==============================
// AIRCRAFT SEARCH + FILTER
// ==============================


const aircraftSearch =
document.querySelector("#aircraft-search");



const aircraftFilter =
document.querySelector("#aircraft-filter");







function filterAircraft(){



if(!aircraftCards.length) return;




const searchText =
aircraftSearch.value.toLowerCase();




const selectedCategory =
aircraftFilter.value;







aircraftCards.forEach(card=>{


const name =
card.dataset.name;


const category =
card.dataset.category;





const matchesSearch =
name.includes(searchText);




const matchesCategory =

selectedCategory === "all" ||

category.includes(
selectedCategory
);






if(
matchesSearch &&
matchesCategory
){


card.style.display =
"block";


}

else{


card.style.display =
"none";


}



});



}








if(aircraftSearch){


aircraftSearch.addEventListener(
"input",
filterAircraft
);


}





if(aircraftFilter){


aircraftFilter.addEventListener(
"change",
filterAircraft
);


}









// ==============================
// AIRCRAFT COMPARISON TABLE
// ==============================


const comparisonContainer =
document.querySelector(
"#comparison-container"
);






const comparisonData = [


{
aircraft:"Cessna 172",
engine:"Lycoming IO-360",
seats:"4",
cruise:"122 knots",
avionics:"Garmin G1000"
},



{
aircraft:"Piper PA-28",
engine:"Lycoming O-360",
seats:"4",
cruise:"128 knots",
avionics:"Garmin G500 / Analog"
},



{
aircraft:"Diamond DA40",
engine:"Lycoming IO-360",
seats:"4",
cruise:"126 knots",
avionics:"Garmin G1000"
}


];








function displayComparison(){



if(!comparisonContainer) return;




comparisonContainer.innerHTML = "";




comparisonData.forEach(aircraft=>{



const row =
document.createElement("tr");



row.innerHTML = `

<td>${aircraft.aircraft}</td>

<td>${aircraft.engine}</td>

<td>${aircraft.seats}</td>

<td>${aircraft.cruise}</td>

<td>${aircraft.avionics}</td>

`;



comparisonContainer.appendChild(row);



});



}







displayComparison();

// ==============================
// QUIZ SYSTEM
// ==============================


const quizQuestion =
document.querySelector("#quiz-question");


const quizOptions =
document.querySelector("#quiz-options");


const quizResult =
document.querySelector("#quiz-result");


const quizNextButton =
document.querySelector("#quiz-next");


const quizScoreElement =
document.querySelector("#quiz-score");





const quizQuestions = [


{
question:
"What are the four forces of flight?",

options:[
"Lift, weight, thrust, drag",
"Speed, fuel, altitude, pressure",
"Engine, wings, tail, wheels",
"Pitch, roll, yaw, trim"
],

answer:
"Lift, weight, thrust, drag"

},



{
question:
"What does Vx represent?",

options:[
"Best rate of climb",
"Best angle of climb",
"Maximum speed",
"Stall speed"
],

answer:
"Best angle of climb"

},




{
question:
"What weather report gives current airport conditions?",

options:[
"TAF",
"METAR",
"NOTAM",
"FAR"
],

answer:
"METAR"

},



{
question:
"What is a stall?",

options:[
"Engine failure",
"Loss of lift caused by exceeding critical angle of attack",
"Landing too fast",
"Flying too high"
],

answer:
"Loss of lift caused by exceeding critical angle of attack"

}



];







let currentQuizIndex = 0;


let quizScore =
Number(
localStorage.getItem(
"skyAttackQuizScore"
)
) || 0;









function updateQuizScore(){


if(quizScoreElement){


quizScoreElement.textContent =
`Score: ${quizScore}`;


}



localStorage.setItem(
"skyAttackQuizScore",
quizScore
);



}








function loadQuizQuestion(){


if(!quizQuestion || !quizOptions)
return;





const question =
quizQuestions[currentQuizIndex];





quizQuestion.textContent =
question.question;



quizOptions.innerHTML = "";





question.options.forEach(option=>{



const button =
document.createElement("button");



button.textContent =
option;



button.classList.add(
"quiz-option"
);





button.addEventListener(
"click",
()=>{


checkQuizAnswer(
option
);


});




quizOptions.appendChild(
button
);



});





if(quizResult){

quizResult.textContent = "";

}



}









function checkQuizAnswer(selected){



const correct =
quizQuestions[currentQuizIndex]
.answer;





if(selected === correct){


quizResult.textContent =
"✅ Correct!";


quizScore++;


}



else{


quizResult.textContent =
`❌ Incorrect. Answer: ${correct}`;


}





updateQuizScore();



}









if(quizNextButton){


quizNextButton.addEventListener(
"click",
()=>{


currentQuizIndex++;



if(
currentQuizIndex >= quizQuestions.length
){


currentQuizIndex = 0;


}



loadQuizQuestion();



});


}






updateQuizScore();


loadQuizQuestion();

// ==============================
// V-SPEED REFERENCE SYSTEM
// ==============================


const vspeedAircraft =
document.querySelector("#vspeed-aircraft");


const vx =
document.querySelector("#vx");


const vy =
document.querySelector("#vy");


const va =
document.querySelector("#va");


const vne =
document.querySelector("#vne");


const glide =
document.querySelector("#glide");







const vspeedData = {


cessna172:{

vx:"62 KIAS",
vy:"74 KIAS",
va:"105 KIAS",
vne:"163 KIAS",
glide:"68 KIAS"

},



piperpa28:{

vx:"64 KIAS",
vy:"76 KIAS",
va:"113 KIAS",
vne:"154 KIAS",
glide:"76 KIAS"

},



diamondda40:{

vx:"60 KIAS",
vy:"79 KIAS",
va:"108 KIAS",
vne:"154 KIAS",
glide:"76 KIAS"

}


};








function updateVspeeds(){


if(!vspeedAircraft)
return;



const aircraft =
vspeedAircraft.value;



const data =
vspeedData[aircraft];




if(vx) vx.textContent = data.vx;

if(vy) vy.textContent = data.vy;

if(va) va.textContent = data.va;

if(vne) vne.textContent = data.vne;

if(glide) glide.textContent = data.glide;



}







if(vspeedAircraft){


vspeedAircraft.addEventListener(
"change",
updateVspeeds
);


}









// ==============================
// WEIGHT & BALANCE CALCULATOR
// ==============================


const calculateWeightButton =
document.querySelector("#calculate-weight");



const weightResult =
document.querySelector("#weight-result");



const cgResult =
document.querySelector("#cg-result");



const limitResult =
document.querySelector("#limit-result");



const wbAircraft =
document.querySelector("#wb-aircraft");







const aircraftLimits = {


cessna172:{

maxWeight:2550,

minCG:35,

maxCG:47.3

},



piperpa28:{

maxWeight:2550,

minCG:34,

maxCG:47

},



diamondda40:{

maxWeight:2535,

minCG:35,

maxCG:47.5

}


};








function calculateCG(){



const weights = [


Number(document.querySelector("#empty-weight")?.value || 0),

Number(document.querySelector("#pilot-weight")?.value || 0),

Number(document.querySelector("#passenger-weight")?.value || 0),

Number(document.querySelector("#fuel-weight")?.value || 0),

Number(document.querySelector("#baggage-weight")?.value || 0)


];





const arms = [


Number(document.querySelector("#empty-arm")?.value || 0),

Number(document.querySelector("#pilot-arm")?.value || 0),

Number(document.querySelector("#passenger-arm")?.value || 0),

Number(document.querySelector("#fuel-arm")?.value || 0),

Number(document.querySelector("#baggage-arm")?.value || 0)


];






const totalWeight =
weights.reduce(
(total,value)=>total+value,
0
);






let totalMoment = 0;



for(let i = 0; i < weights.length; i++){


totalMoment +=
weights[i] * arms[i];


}






const cg =
totalMoment / totalWeight;







if(weightResult){


weightResult.textContent =
`Total Weight: ${totalWeight.toFixed(0)} lbs`;


}






if(cgResult){


cgResult.textContent =
`Center of Gravity: ${cg.toFixed(2)} inches`;


}






checkAircraftLimits(
totalWeight,
cg
);



}









function checkAircraftLimits(
totalWeight,
cg
){



if(
!wbAircraft ||
!limitResult
)
return;






const limits =
aircraftLimits[
wbAircraft.value
];





if(
totalWeight <= limits.maxWeight &&
cg >= limits.minCG &&
cg <= limits.maxCG
){


limitResult.textContent =
"Aircraft Status: ✅ Within Limits";


}



else{


limitResult.textContent =
"Aircraft Status: ⚠️ Outside Limits";


}



}








if(calculateWeightButton){


calculateWeightButton.addEventListener(
"click",
calculateCG
);


}

// ==============================
// FLIGHT PLANNER CALCULATOR
// ==============================


const calculateFlightButton =
document.querySelector("#calculate-flight");


const flightDistance =
document.querySelector("#flight-distance");


const cruiseSpeed =
document.querySelector("#cruise-speed");


const fuelBurn =
document.querySelector("#fuel-burn");


const flightTime =
document.querySelector("#flight-time");


const fuelRequired =
document.querySelector("#fuel-required");






function calculateFlight(){


if(
!flightDistance ||
!cruiseSpeed ||
!fuelBurn
)
return;





const distance =
Number(flightDistance.value);



const speed =
Number(cruiseSpeed.value);



const burn =
Number(fuelBurn.value);






if(
distance <= 0 ||
speed <= 0 ||
burn <= 0
){

if(flightTime){

flightTime.textContent =
"Please enter valid numbers.";

}


return;

}






// TIME CALCULATION

const hours =
distance / speed;



const minutes =
Math.round(hours * 60);






// FUEL CALCULATION

const gallons =
hours * burn;






if(flightTime){


flightTime.textContent =
`Time Enroute: ${minutes} minutes`;


}





if(fuelRequired){


fuelRequired.textContent =
`Fuel Required: ${gallons.toFixed(1)} gallons`;


}





}








if(calculateFlightButton){


calculateFlightButton.addEventListener(
"click",
calculateFlight
);


}