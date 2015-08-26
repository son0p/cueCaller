var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var S = require('string');
//var _= require('lodash');
var calendars = ["0f0n9volku8u02t6dc185uvv24@group.calendar.google.com","d7ndgg3orqrt4nfqtp280ekuio@group.calendar.google.com","10l5sgmgtqmvj39rslh6fjbceg@group.calendar.google.com" ];
var calendarNames =["Buen Comienzo", "Casas y Nodos", "Instituciones Educativas"];



var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR =  '/home/ff/projects/cueCaller/.credentials/';
//var TOKEN_DIR = '/home/fede2001/webapps/cuecaller_son0p/cueCaller/.credentials/';  //server
var TOKEN_PATH = TOKEN_DIR + 'calendar-api-quickstart.json';
var today = new Date();
var weekAhead = new Date(today);
weekAhead.setDate(today.getDate()+7);


// // Load client secrets from a local file.
// fs.readFile('api/services/client_secret.json', function processClientSecrets(err, content) {
//   if (err) {
//     console.log('Error loading client secret file: ' + err);
//     return;
//   }
//   // Authorize a client with the loaded credentials, then call the
//   // Google gCalendar API.
//   module.exports.authorize(JSON.parse(content), module.exports.listEvents);
// });

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
module.exports = {
authorize:function (credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      module.exports.getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
},

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
 getNewToken : function (oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      module.exports.storeToken(token);
      callback(oauth2Client);
    });
  });
},

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
storeToken:function (token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
},

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */


  listEvents: function (auth) {
    fs.writeFile(".tmp/public/profes.txt", '');//limpia el archivo
    calendars.forEach(function(calendarItem, i){
      console.log(calendars[i]);
      console.log(calendarNames[i]);
      var calendarName = calendarNames[i];
      var calendar = google.calendar('v3');
      calendar.events.list({
        auth: auth,
        calendarId: calendars[i],
        //timeMin: (new Date()).toISOString(),
        timeMin: today.toISOString(),
        timeMax: weekAhead.toISOString(),
        maxResults: 30,
        singleEvents: true,
        orderBy: 'startTime'
      }, function(err, response) {
        if (err) {
          console.log('The API returned an error: ' + err);
          return;
        }
        var events = response.items;
        // voy a http://jsonviewer.stack.hu/ y veo los nombres de lo que tengo que restar
        fs.appendFile(".tmp/public/todo.json", JSON.stringify(events));
        if (events.length == 0) {
          console.log('No upcoming events found.');
        } else {
          console.log('Totales profesores'+ " "+ calendarName);
          var todosLosEventos = "";
          for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var start = event.start.dateTime || event.start.date;
            //console.log('%s - %s', start, event.summary);
//            console.log(event);
            //console.log(event.summary);
            // mas igual es incluyame a mi mismo en la suma
            todosLosEventos += " " + event.summary;
          }
          //console.log(todosLosEventos);
          var adri =  S(todosLosEventos).count("Adri");
          // aca puedo multiplicar por el numero de horas
          // console.log("Adri = ",adri);

          function cuentaNombres(nombre){
            // con el paquete string cuenta el nombre de todos los eventos
            return S(todosLosEventos).count(nombre);
          }
          var arregloProfes = ["Adri","Alejo", "AnaLu","AnaMa", "Andre","Cami", "Carlos", "Clau","EBeta","Edwar", "Eider", "EPoga", "Jose", "JRafael","Julian", "JuliC","Laura","Leo","Ligia","MClara", "Meli","Tiby", "Tomy", "Yeisme", "Yeison"];
          // map me sirve para que a cada item del array arreglo profes hagale la fcunción cuentaNomres
          var conteo = _.map(arregloProfes, cuentaNombres);

          fs.appendFile(".tmp/public/profes.txt", "Profe" + "," + calendarName + "\n");
          arregloProfes.forEach(function(profe, i){
            console.log(profe,conteo[i]);
            fs.appendFile(".tmp/public/profes.txt", profe + ","+ conteo[i]+"\n", function(err){
              if(err) {
                return console.log(err);
              }
            });
          });
          console.log("Hecho!");
        }
      });
    });
  }
};
