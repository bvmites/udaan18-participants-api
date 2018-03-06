const router = require('express').Router();

const uuid = require('uuid/v1');
const uuidToHex = require('uuid-to-hex');

const participantSchema = require('../../schema/participant');

const ObjectId = require('mongodb').ObjectId;

const Validator = require('jsonschema').Validator;
const validator = new Validator();

const validEventIds = require('../../config').events.map(p => p._id);
const validateParticipant = (participant) =>
    validator.validate(participant, participantSchema).valid && validEventIds.includes(participant.eventId);

module.exports = (db) => {
    const Participants = require('../../db/participant')(db);
    router.post('/participants', async (request, response) => {
        try {
            const participants = request.body;
            const error = new Error();

            if (!(participants instanceof Array)) {
                error.message = 'Invalid input';
                error.code = 'ValidationException';
                throw error;
            }

            // const {valid, invalid} = participants.reduce(
            //     (acc, p) =>
            //         validateParticipant(p)
            //             ? {...acc, valid: [...acc.valid, p]}
            //             : {...acc, invalid: [...acc.invalid, p]},
            //     {valid: [], invalid: []}
            // );

            const invalid = participants.filter(p => !validateParticipant(p));
            if (invalid.length !== 0) {
                error.message = 'Event doesn\'t exist';
                error.code = 'EventNotFound';
                throw error;
            }

            const result = await Participants.add(participants.map(p => ({...p, eventId: ObjectId(p.eventId)})));
            response.status(200).json({message: 'Participants added.', invalid});

        } catch (e) {
            if (e.code === 'EventNotFound') {
                response.status(404);
            }
            else if (e.code === 'ValidationException') {
                response.status(405);
            }
            else {
                response.status(500);
            }
            response.json({message: e.message});
        }
    });

    return router;
};
