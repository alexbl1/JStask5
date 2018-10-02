var app = new Vue({
  el: '#app',
  data: {
      title: "Senators",
      theads: ["Members", "Party", "State", "Seniority", "Votes"],
      members:[],
      states:[]
      
  }
});



var members;


var cbR = document.getElementById('cbR');
var cbD = document.getElementById('cbD');
var cbI = document.getElementById('cbI');


/*Fetch it's a request of information to 
the server, pointing to a url direction.
then Javascript continue running
converting data to JSON and then calling the functions.
The functions are inside Fetch because it's asynchron.
*/

var chamber;



if (document.body.getAttribute("data-chamber")=="house"){
    
chamber="house";
}
 if(document.body.getAttribute("data-chamber")=="senate"){
     chamber="senate";
 }

fetch("https://api.propublica.org/congress/v1/113/"+chamber+"/members.json", {

    method: "GET",
    headers: {
        'X-API-Key': 'dWIBajIpJ2M4ZVVWGYyNmW8h6xvYaQxU2QaCXSGf'
    }
}).then(function (response) {

    if (response.ok) {

        return response.json();
    }

    throw new Error(response.statusText);
}).then(function (json) { //respuesta convertida en JSON

    // do something with json data

    members = json.results[0].members;
    
    app.members = json.results[0].members;
    
    
    
   
    
    filtered(members);  //functions placed inside FETCH are asynchronouse.


    myDropDown(members);


}).catch(function (error) {
    // called when an error occurs anywhere in the chain
    console.log("Request failed: " + error.message);
});
/* el fetch es una orden de accion
"/users"  es la ruta de acceso a los datos, el API*/




    


/*Here we bind an event to an element using an event listener,
and indicate which function should execute when that event fires.
*/

cbR.addEventListener("click", function () {
  
    filtered(members);
});
/*
If you need to pass arguments to a function that is called by an eventListener, 
you wrap the function in an anonymous function*/

cbD.addEventListener("click", function () {
   
    filtered(members);
});

cbI.addEventListener("click", function () {
   
    filtered(members);
    
});

document.getElementById("dropdown").addEventListener("change", function () {
   
    filtered(members);
});



function filtered(members) {
    
    var cbR = document.getElementById('cbR');
    var cbD = document.getElementById('cbD');
    var cbI = document.getElementById('cbI');
    var checkboxes = document.getElementById("checkboxes");
    var dropdown =  document.getElementById("dropdown");
    
    selected = [];
    app.members=selected;
   
    for (var i = 0; i < members.length; i++) {
        if (cbR.checked && members[i].party == 'R' && (dropdown.value == "All states" || dropdown.value == members[i].state)) {
            selected.push(members[i]);
        } if (cbD.checked && members[i].party == 'D' && (dropdown.value == "All states" || dropdown.value == members[i].state)) {
            selected.push(members[i]);
        }  if (cbI.checked && members[i].party == 'I'&& (dropdown.value == "All states" || dropdown.value == members[i].state)) {
            selected.push(members[i]);
            
        }else if (!cbR.checked && !cbD.checked && !cbI.checked && (dropdown.value == "All states" || dropdown.value == members[i].state)) {
            selected.push(members[i]);
        }
         
    }
  
  if(selected.length==0){
        tbodyMesage.textContent="Sorry, there is no matches";
    }if(selected.length>0){
        tbodyMesage.textContent="";
    }
}


function myDropDown(members) {
    var states = [];
   app.states = states;
    
   for (var i = 0; i < members.length; i++) {
        if (!states.includes(members[i].state) ){
        states.push(members[i].state);  
      }
    }
    states.sort();
    
    
    }  
    
 

  

