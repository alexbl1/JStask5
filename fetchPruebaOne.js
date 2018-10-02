var data;

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
}).then(function (json) {

    // do something with json data

    data = json;

    console.log(data);

}).catch(function (error) {
    // called when an error occurs anywhere in the chain
    console.log("Request failed: " + error.message);
});
/* el fetch es una orden de accion
"/users"  es la ruta de acceso a los datos, el API*/