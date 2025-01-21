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

app.use("/api/:date?", (req, res) => {
  let date = req.params.date;
  // Check if date parameter is empty
  if (date === undefined) {
    res.json({"unix": Date.now(), "utc": new Date().toUTCString()});
  }

  let isValidDate = Date.parse(date); 

  // Case normal format + Case UNIX + Other case
  if (isValidDate) {
    let ndate = new Date(date);
    res.json({"unix": ndate.getTime(), "utc": ndate.toUTCString()});
  } else if (isNaN(isValidDate) && moment.unix(date).isValid()) {
    res.json({"unix": Number(date), "utc": new Date(Number(date)).toUTCString()});
  } else {
    res.json({"error": "Invalid Date"});
  }

});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
