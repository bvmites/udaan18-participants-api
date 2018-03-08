const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

(async function () {
    const client = await MongoClient.connect(process.env.DB);
    const db = client.db('udaan18');
    const events = await db.collection('events').find({}).project({eventName: 1}).toArray();
    fs.writeFileSync('./config.json', JSON.stringify({events}));
    process.exit(0);
})();