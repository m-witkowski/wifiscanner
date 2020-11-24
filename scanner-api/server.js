const express = require("express");
const app = express();
const port = 5000;
const {exec} = require("child_process");
const { stderr } = require("process");

exec("ls", (error, stdout, stderr) =>{
    if (error){
        console.log(`Error: ${error.message}`);
        return;
    }
    if (stderr){
        console.log(`Stderr: ${stderr}`);
        return;
    }
    app.get("/data", (req,res) => res.send(stdout));
});

app.get("/", (req,res)=> res.send("Hello World!"));

app.listen(port, ()=> console.log(`Server working on port ${port}`));