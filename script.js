// Write your JavaScript code here!



window.addEventListener("load", function() {
    let form = document.querySelector("form");
    let list = document.getElementById("faultyItems");
    list.style.visibility ="hidden";  

    
  
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (json) {
    let newPlanet = pickPlanet(json);
    addDestinationInfo(document, newPlanet.name, newPlanet.diameter, newPlanet.star, newPlanet.distance, newPlanet.moons, newPlanet.image) 
    
   })
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
   

   form.addEventListener("submit", function(event) {
    event.preventDefault();
       let pilot = document.getElementById("pilot").value
       let copilot = document.getElementById("copilot").value
       let fuel = document.getElementById("fuel").value
       let cargo = document.getElementById("cargo").value
       formSubmission(document, list, pilot, copilot, fuel, cargo);
       
   });
   
});