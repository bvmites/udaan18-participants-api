var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
    id:String,
    eventName:String,
    eventType:String,
    department:String,
    tagline:String,
    description:String,
    teamSize:Number,
    price:Number,
    managers: [{
        name: String,
        phone: String
    }],
    rounds: [{
        description: String,
    }],
    participants: [{
        id: {
            type: String,
            unique: true
        },
        name: String,
        phone: String,
        status: String
    }]
});

module.exports = mongoose.model("Event",EventSchema);