const http = require("http")
const express = require("express")

const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
app.use(bodyParser.json());
const port = "8000";

app.set("view engine", "hbs")

app.get("/", (req, res)=>{
    res.render('home');
})

app.get("/predict", (req, res)=>{
    console.log(`${JSON.stringify(req.query)}`);
    
    
    const p1 = `${JSON.stringify(req.query)}`;
    console.log(typeof p1);
    
  let predictionVal = "Vishal";
  const python = spawn("python", ["predict.py", p1]);

  python.stdout.on("data", (data) => {
    console.log("python data: ", data.toString());
    predictionVal = data.toString();
  });

  python.on("close", (code, signal) =>{
      console.log(`process closed: code ${code} and signal ${signal}`);
      res.render('home', {prediction_text : `Price Value : ${predictionVal}`});
    }  
  );

})

app.get("/predict", (req, res)=>{
    res.end("Hello from the express server");
})

app.listen(port, ()=>{
    console.log(`You are listening the port ${port}`)
})


// http://localhost:8000/predict?Dep_Time=2023-05-02T18%3A36&Arrival_Time=2023-05-02T20%3A36
// &Source=Delhi&Destination=Cochin&stops=0&airline=Jet+Airways