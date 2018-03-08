const ObjectId = require('mongodb').ObjectId;

module.exports = (db) => ({
    getByEvent: async (eventId) => {
        return db.collection('participations').find({eventId: ObjectId(eventId)}).toArray();
    },
    add: async (participantList) => {
        return db.collection('participations').insertMany(
            participantList.map(p => {
                const d = Number(p.registrationDate.slice(0, 2));
                const m = Number(p.registrationDate.slice(3, 5));
                const y = Number(p.registrationDate.slice(5));
                console.log('DATE', y, m, d);
                return {
                    ...p,
                    registrationDate: new Date(y, m - 1, d)
                }
            })
        );
    }
});
