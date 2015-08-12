/**
 * CalendarController
 *
 * @description :: Server-side logic for managing calendars
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs');
var readline = require('readline');
module.exports = {
  totalProfes: function(req, res){

    // Load client secrets from a local file.
    fs.readFile('api/services/client_secret.json', function processClientSecrets(err, content) {
      if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
      }

      // Authorize a client with the loaded credentials, then call the
      // Google gCalendar API.
      var horas = horasProfes.listEvents;
      var autorizaHoras = horasProfes.authorize(JSON.parse(content),horas );


    });
    res.send("listo");
  }

};
