var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Event           = require("./Schema/EventSchema"),
    seedDB          = require("./Schema/seedDB");
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost/Events");

seedDB();

app.listen("5000", function(){
    console.log("Start ...");
});

app.post("/events/:id/participants",function(req,res){
    var temp_id = req.params.id;
    Event.findById(temp_id,function(err, resObj){
        if(err){
            console.log("Error!");
        }else{
            resObj.participants.push(req.body);
            console.log(resObj);
            Event.findByIdAndUpdate(temp_id,resObj,{new:true},function(err, newObj){
                if(err){
                    console.log("error");
                }else{
                    return res.json(newObj).status(200);
                }
            });
        }
    });
});