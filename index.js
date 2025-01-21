var moment = require('moment');

// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  console.log(req.path);
  res.json({greeting: 'hello API'});
});

app.use("/api", (req, res) => {
  console.log(req.path);
  // Check if date parameter is empty
  if (req.path === "/") {
    res.json({"unix": Date.now(), "utc": new Date().toUTCString()});
  }
  
  // Convert date parameter to optimal format
  let pathCheck = req.path.replace("/", "");

  function isDateValid(dateStr) {
    return !isNaN(new Date(dateStr));
  }

  // Case normal format + Case UNIX + Other case
  if (isDateValid(pathCheck)) {
    let date = new Date(pathCheck);
    res.json({"unix": date.getTime(), "utc": date.toUTCString()});
  } else if (moment.unix(Number(pathCheck)).isValid()) {
    res.json({"unix": Number(pathCheck), "utc": new Date(Number(pathCheck)).toUTCString()});
  } else {
    res.json({"error": "Invalid Date"});
  }

});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
