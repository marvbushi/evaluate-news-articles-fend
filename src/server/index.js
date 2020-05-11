// Require dependencies
const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

// Start up an instance of app
const app = express();

// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Set up Aylien API 
const aylienAPI = require('aylien_textapi');

var textapi = new aylienAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

// var textapi = new aylienAPI({
//     application_id: "update me",
//     application_key: "update me"
// })

// Configure GET Route
app.get('/', function (req, res) {
  res.sendFile(path.resolve('./dist/index.html')) 
});

app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
});

// API request sent to Aylien API
app.post('/article', function (req, res) {
  console.log('POST request received');
  console.log(req.body)
  textapi.sentiment({
    url: req.body.text,
    mode: 'document'
  }, function (error, response) {
    console.log('inside post function');
    console.log(response);
    res.send(response)
    if (error === null) {
      console.log('inside error');
      console.log(response);
    }
  })
});

// Setup Server
const port = 8080
app.listen(port, listening);

function listening() { console.log(`Server running on port: ${port}`)};

// Exports object that will be exposed as a module
module.exports = app;