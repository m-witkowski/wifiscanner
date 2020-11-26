const express = require("express");
const app = express();
const port = 5000;
const {exec} = require("child_process");
let data = "test";

const runCommand = (command, callback) => {
    exec(command, (err,stdout,stderr)=>{
        err? callback(stderr):callback(stdout)
    })
}

app.use(function(req,res,next){
    runCommand('./iwtojson.sh wlan0', (result) => setTimeout(()=>{
        data=result;
        next();}, 1));
})
app.get("/data", (req,res)=> res.send(data));
app.listen(port, ()=> console.log(`Server working on port ${port}`));