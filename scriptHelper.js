// setting up for autograder

try {
require('isomorphic-fetch');
} catch (e) {
    // do nothing
   }

//Creating the section for a random planet at the top of the page.

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
   let target = document.getElementById("missionTarget");
   
   target.innerHTML = `
   <h2>Mission Destination</h2>
   <ol>
       <li>Name: ${name}</li>
       <li>Diameter: ${diameter}</li>
       <li>Star: ${star}</li>
       <li>Distance from Earth: ${distance}</li>
       <li>Number of Moons: ${moons}</li>
   </ol>
   <img src="${imageUrl}">`;
}

//Checks the form input and returns a string of what the values are.

function validateInput(testInput) {
    if (testInput === ""){
        return "Empty";
    }else if (isNaN(testInput)){
        return "Not a Number";
    }else {
        return "Is a Number";
    }
}

//Validates the form values and updates the status for launching.

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    //Form validation and gives user alerts if the form is not filled out correctly
    if ((validateInput(pilot) === "Empty") || (validateInput(copilot) === "Empty") || (validateInput(fuelLevel) === "Empty") || (validateInput(cargoLevel) === "Empty")){
         window.alert("All fields need to be filled out.");
         return;
    }
    if (validateInput(Number(fuelLevel)) === "Not a Number"){
        window.alert("Fuel Level must be a number.");
        return;
    }
    if (validateInput(Number(cargoLevel)) === "Not a Number"){
        window.alert("Cargo Mass must be a number.");
        return;
    }

    //Setting the status variables
    let launchStatus = document.getElementById("launchStatus");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    //default status report
    launchStatus.style.color = "rgb(65, 159, 106)";
    launchStatus.innerHTML = "Shuttle is Ready for Launch";
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    fuelStatus.innerHTML = "Fuel level high enough for launch";
    cargoStatus.innerHTML = "Cargo mass low enough for launch";    
    
    //checks to see if the launch is not ready.
    if (fuelLevel < 10000) {
        launchStatus.style.color = "rgb(199, 37, 78)";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";  
        fuelStatus.innerHTML = "Fuel level too low for launch";
    }

    if (cargoLevel > 10000) {
        launchStatus.style.color = "rgb(199, 37, 78)";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";  
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
    }
    
    //displaying the launch status.
    list.style.visibility = "visible";
}

//Get the JSON file from the Launchcode website.

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()        
});

    return planetsReturned;
}

//Picking a random planet from the JSON file

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * (planets.length))];

}

try {
module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
} catch (e) {
    // do nothing
   }