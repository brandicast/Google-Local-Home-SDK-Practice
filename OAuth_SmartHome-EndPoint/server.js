const os = require('os');
const path = require('path');

var express = require('express');
var bodyParser = require ('body-parser');
var app = express();


var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended : false}) ;

const aog_handler = require('./smarthome_handler') ;

const util = require('util');


let PROJECT_ID = 'hello_trump';
var AUTHORIZATION_CODE = '1234567890';

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
 
app.get('/', function (req, res) {
    console.log (req.ip + " is requesting.....")
   res.send('Hello World');
})

app.get('/auth', function (req, res) {
    //res.send('Hi, I am auth');
    console.log ("Receiving /auth request");
    console.log (req.originalUrl );
    
    
    redirect_url = `https://oauth-redirect.googleusercontent.com/r/${PROJECT_ID}?code=${AUTHORIZATION_CODE}&state=${req.query.state}` ;
    res.redirect (redirect_url);
    console.log ('redirect to : ' + redirect_url )
    //https://oauth-redirect.googleusercontent.com/r/YOUR_PROJECT_ID?code=AUTHORIZATION_CODE&state=STATE_STRING
 });
 
app.post('/token', function (req, res) {
    console.log ("Receiving /token request");
    console.log ("body: " + util.inspect(req.body))
    /*res.type('application/json')
    //res.send ('{"token_type": "Bearer",  '+
              ' "access_token": "ACCESS_TOKEN", '+
              ' "refresh_token": "REFRESH_TOKEN", '+
              ' "expires_in": SECONDS_TO_EXPIRATION '+
              '}') ;
              */
    res.json ({token_type: 'Bearer', 
               access_token: '1234567890', 
               refresh_token: '0987654321', 
               expires_in: 86400});

});

app.post ('/smarthome', aog_handler);

app.get('/web/bundle.js', (req, res) => {
    console.log (req.ip +' requests /web/bundle.js ');
    res.sendFile(path.join(__dirname, 'dist/web/bundle.js'));
});

app.get('/web/index.html', (req, res) => {
    var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress
    console.log (ip +' requests index.html ');
    res.sendFile(path.join(__dirname, 'index.html'));
});
    
app.get('/node/bundle.js', (req, res) => {
    console.log (req.ip +' requests /node/bundle.js ');
    res.sendFile(path.join(__dirname, 'dist/node/bundle.js'));
});




/*
app.all ('/smarthome', jsonParser,function (req, res) {
    console.log('Receiving /smarthome request');
    console.log(' Mehtod: ' + req.method) ;
    console.log(' Token: ' + req.get ('Authorization')) ;
    console.log ('body: ' + util.inspect(req.body));
    res.json ({
        "requestId": "ff36a3cc-ec34-11e6-b1a0-64510650abcf",
        "payload": {
          "agentUserId": "1836.15267389",
          "devices": [
            {
              "id": "123",
              "type": "action.devices.types.OUTLET",
              "traits": [
                "action.devices.traits.OnOff"
              ],
              "name": {
                "defaultNames": [
                  "My Outlet 1234"
                ],
                "name": "Night light",
                "nicknames": [
                  "wall plug"
                ]
              },
              "willReportState": false,
              "roomHint": "kitchen",
              "deviceInfo": {
                "manufacturer": "lights-out-inc",
                "model": "hs1234",
                "hwVersion": "3.2",
                "swVersion": "11.4"
              },
              "otherDeviceIds": [
                {
                  "deviceId": "local-device-id"
                }
              ],
              "customData": {
                "fooValue": 74,
                "barValue": true,
                "bazValue": "foo"
              }
            },
            {
              "id": "456",
              "type": "action.devices.types.LIGHT",
              "traits": [
                "action.devices.traits.OnOff",
                "action.devices.traits.Brightness",
                "action.devices.traits.ColorSetting"
              ],
              "name": {
                "defaultNames": [
                  "lights out inc. bulb A19 color hyperglow"
                ],
                "name": "lamp1",
                "nicknames": [
                  "reading lamp"
                ]
              },
              "willReportState": false,
              "roomHint": "office",
              "attributes": {
                "colorModel": "rgb",
                "colorTemperatureRange": {
                  "temperatureMinK": 2000,
                  "temperatureMaxK": 9000
                },
                "commandOnlyColorSetting": false
              },
              "deviceInfo": {
                "manufacturer": "lights out inc.",
                "model": "hg11",
                "hwVersion": "1.2",
                "swVersion": "5.4"
              },
              "customData": {
                "fooValue": 12,
                "barValue": false,
                "bazValue": "bar"
              }
            }
          ]
        }
      });
  
  });
*/

var server = app.listen(9999, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("test", host, port)
  
 
})