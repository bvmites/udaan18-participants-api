var mongoose = require("mongoose");

var EventSchema = mongoose.Schema({
"type": "object",
"properties": {
    "id": {
        "type": "string"
    },
    "eventName": {
        "type": "string"
    },
    "eventType": {
        "type": "string"
    },
    "department": {
        "type": "string"
    },
    "tagline": {
        "type": "string"
    },
    "description": {
        "type": "string"
    },
    "teamSize": {
        "type": "number"
    },
    "price": {
        "type": "number"
    },
    "managers": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "phone": {
                    "type": "string"
                }
            }
        }
    },
    "rounds": {
        "type": "array",
        "items": {
            "type": "string"
        }
    }
},
"required": [
    "id",
    "eventName",
    "eventType",
    "department",
    "tagline",
    "description",
    "teamSize",
    "price",
    "managers",
    "rounds"
    ]
})

module.exports = mongoose.model("Event",EventSchema);