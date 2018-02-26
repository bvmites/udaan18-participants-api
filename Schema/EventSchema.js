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

// var EventSchema = new mongoose.Schema({
//     id: {
//         type: String,
//         required: true
//     },
//     eventName: {
//         type: String,
//         required: true
//     },
//     eventType: {
//         type: String,
//         required: true
//     },
//     department: {
//         type: String,
//         required: true
//     },
//     tagline: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     teamSize: {
//         type: Number,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     managers: [{
//         name: {type: String, required: true},
//         phone: {type: String, required: true}, 
//         required: true
//     }],
//     rounds: [{
//         description:{type:String},
//         require:true
//     }],
//     participants: [{
//         id:{
//             type: String,
//             unique: true 
//         },
//         name: String,
//         phone: String,
//         status: String
//     }]
// });

module.exports = mongoose.model("Event",EventSchema);