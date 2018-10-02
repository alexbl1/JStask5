/*
var members = senatedata.results[0].members; 
*/
var app = new Vue({
    el: '#app',
    data: {
        titleGlance: "House at a glance",
        titleLeast: "Least Loyal (Bottom 10% Party)",
        titleMost: "Most Loyal (Top 10% Party)",
        theadsG: ["Party", "Number of Representants", "% Vote with Party"],
        theadsE: ["Name", "N. Party Votes", "% Party Votes"],
        members: [],
        statisticsVue: {},
        bottomTen: [],
        topTen: []


    }
});


var members;

/* I have created an OBJECT called "statistics"
    with OBJECTS inside. Each objects contains KEYS and VALUES
    at the end I send it to app.statisticsVue wich is an
    objects inside app.data*/

var statistics = {

    republicans: {
        total: 0,
        avg: 0,
    },
    democrats: {
        total: 0,
        avg: 0,
    },
    independents: {
        total: 0,
        avg: 0,
    },
    total_members: {
        total: 0,
        avg: 0,
    }
}

app.statisticsVue = statistics;





/*Fetch it's a request of information to 
the server, pointing to a url direction.
then Javascript continue running
converting data to JSON and then calling the functions.
The functions are inside Fetch because it's asynchron.
*/


fetch("https://api.propublica.org/congress/v1/113/house/members.json", {

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





    getStatistics();



    //funciones dentro de fetch porque fetch asincron y javascript es sincron


}).catch(function (error) {
    // called when an error occurs anywhere in the chain
    console.log("Request failed: " + error.message);
});
/* el fetch es una orden de accion
"/users"  es la ruta de acceso a los datos, el API*/








function getStatistics() {

    var totalMembersR = 0; // aqui acumulo los miembros del partido R
    var Ravg = 0;
    var totalMembersD = 0;
    var Davg = 0;
    var totalMembersI = 0;
    var Iavg = 0;
    var totalMembers = 0;
    var totalAvg = 0;
    var party_votes = 0;

    for (i = 0; i < members.length; i++) {
        if (members[i].party == "R") {
            totalMembersR = totalMembersR + 1; //sumo los miembros del partido R
            Ravg = Ravg + members[i].votes_with_party_pct; // sumo los porcentages de votos de cada miembro del partido R

        }
        if (members[i].party == "D") {
            totalMembersD = totalMembersD + 1;
            Davg = Davg + members[i].votes_with_party_pct;
        }
        if (members[i].party == "I") {
            totalMembersI = totalMembersI + 1;
            Iavg = Iavg + members[i].votes_with_party_pct;

        }

        totalMembers = totalMembers + 1;
        totalAvg = totalAvg + members[i].votes_with_party_pct;
        total_votes = members[i].total_votes;
    }




    Ravg = Ravg / totalMembersR; // calculo la media de porcentage de votos
    statistics.republicans.total = totalMembersR; // coloco el total de miembros del partido R en statistics
    statistics.republicans.avg = Ravg.toFixed(2); // coloco la media de porcentages en statistics

    Davg = Davg / totalMembersD;
    statistics.democrats.total = totalMembersD;
    statistics.democrats.avg = Davg.toFixed(2); // toFixed limita los decimales a 2 numeros

    function evitaNan() {
        if (Iavg == 0 || totalMembersI == 0) {

            return 0;
        } else {
            Iavg = Iavg / totalMembersI;
            statistics.independents.total = totalMembersI;
            statistics.independents.avg = Iavg.toFixed(2);
        }
    };


    totalAvg = totalAvg / totalMembers;
    statistics.total_members.total = totalMembers;
    statistics.total_members.avg = totalAvg.toFixed(2);





    var tenBottomEngage = [];

    var votes_miss_pct = [];

    votes_miss_pct = members.sort(function (mem1, mem2) {
        return mem1.votes_with_party_pct - mem2.votes_with_party_pct;
    });

    var ten_lessEngage = Math.round(((votes_miss_pct.length * 10) / 100));

    for (i = 0; i < ten_lessEngage; i++) {
        tenBottomEngage.push(votes_miss_pct[i]);
    }
    /*console.log(tenBottomEngage);*/

    app.bottomTen = tenBottomEngage;

    var tenTopEngage = [];

    var votes_miss_pct = [];

    votes_miss_pct = members.sort(function (mem1, mem2) {
        return mem2.votes_with_party_pct - mem1.votes_with_party_pct;
    });

    var tenMostEngage = Math.round(((votes_miss_pct.length * 10) / 100));

    for (i = 0; i < tenMostEngage; i++) {
        tenTopEngage.push(votes_miss_pct[i]);
    }
    console.log(tenTopEngage);
    app.topTen = tenTopEngage;



}
