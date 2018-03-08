const ObjectId = require('mongodb').ObjectId;

module.exports = (db) => ({
    getByEvent: async (eventId) => {
        return db.collection('participations').find({eventId: ObjectId(eventId)}).toArray();
    },
    add: async (participantList) => {
        return db.collection('participations').insertMany(
            participantList.map(p => ({...p, registrationDate: new Date(p.registrationDate)}))
        );
    }
});
