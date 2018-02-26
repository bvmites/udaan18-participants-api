var mongoose = require("mongoose");
var Event = require("./EventSchema");

var data =[{
    id:"111",
    eventName:"MyEvent",
    eventType:"MyType",
    department:"Mydepartment",
    tagline:"MyTagline",
    description:"MyDesc",
    teamSize: 2,
    price: 20,
    managers:[
        {
            name:"Manager",
            phone:"23213123"
        },
        {
            name: "Manager",
            phone: "23213123"
        }
    ],
    rounds:[{
        description:"Mydesc"
    }],
    participants: []
}] 

function seedDB() {
    Event.remove({}, function (err) {
        if (err) {
            console.log("Error");
        } else {
            console.log('All the data is been removed');
        }
        data.forEach(function (seed) {
            Event.create(seed, function (err, newObj) {
                if (err) {
                    console.error('Error');
                } else {
                    console.log(newObj);
                }
            });
        });
    });
}

module.exports = seedDB;