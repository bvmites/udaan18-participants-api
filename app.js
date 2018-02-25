var express = require("express"),
    bodyParser = require("body-parser"),
    mongo = require("mongoose"),
    methodOverride = require("method-override");

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));


mongo.connect("mongodb://localhost/participants");
var participantsSchema = new mongo.Schema({
    name:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"test"
    }
});
var participants = mongo.model("participant", participantsSchema);

app.listen("4000", ()=>{
    console.log("Start ...");
});
app.post("/event/:id/participants",(req,res)=>{
    participants.create(req.body,(err,participant)=>{
        if(err){
            res.status(400).send("Internal Server Error");
        }else{
            console.log(participant);
            res.status(200).json(participant);
        }
    });
});
app.put("/event/:id/participants",(req,res)=>{
        var test= parseInt(req.body.phone);
        if(isNaN(test))
        {
            console.log(test);
            return res.status(405).send("Internal Server Error");            
        }

        participants.findByIdAndUpdate(req.body.p_id,req.body,(err,participant)=>{
            if(err){
                console.log(err);
                return res.status(400).send("Internal Server Error");
            }else{
                return res.status(200).json(participant);
            }
        });
});