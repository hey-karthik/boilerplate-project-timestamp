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

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/?:time?",(req,res,next)=>{
  let responseTime;
  let time = req.params.time;
  console.log(time);
  let checkValidDate = (d)=>{
    console.log(d instanceof Date && !isNaN(d));
    return d instanceof Date && !isNaN(d);
  }
  try{
    if(!time){
      responseTime = getformattedTime(false);
    }
      else if(!checkValidDate(new Date(parseInt(time))) && !checkValidDate(new Date(time))){
        throw 'invalid date';
      }
    else if(!isNum(time)){
      responseTime = getformattedTime(false,time);
    }else{
      responseTime = getformattedTime(true,time);
    }
  }
  catch(e){
   responseTime = { error : "Invalid Date" }
    console.log(e);
  }
  res.json(responseTime);
  next();
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let isNum = (val)=>{
  console.log('isnum',val)
  return /^\d+$/.test(val);
}
var getformattedTime = (isUnix,time=new Date())=>{
    if(isUnix){
      time = parseInt(time);
      return {
        "unix" : time,
        "utc": new Date(time).toGMTString()
      }
    }else{
    return {
      "unix" : Math.floor(new Date(time).getTime()),
      "utc": new Date(time).toGMTString()
    }  
    }
  }