var express = require('express');
var bodyParser = require("body-parser");
var csv = require('express-csv');

// serveur html
var server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.listen(3200);

server.get('/index.html', function(request, response) {
    response.sendFile( __dirname  + '/app/src/templates/index.html');
});

server.post('/index.html', function(request, response) {

    var lastname = request.body.lastname;

    var firstname = request.body.firstname;

    var email = request.body.email;

    var pseudo = request.body.pseudo;

    var adress = request.body.adress

    var dataCSV = lastname + " ; " + firstname + " ; " + email + " ; " + pseudo + " ; " + adress + "\n";

    downloadCSV(dataCSV);
});

function downloadCSV(args, dataCSV) {


    var filename, link;
    var csv = dataCSV;

    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }

    encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', csv);
    link.setAttribute('download', filename);
    link.click();
}


