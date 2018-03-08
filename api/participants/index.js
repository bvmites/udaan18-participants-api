const router = require('express').Router();

const participantSchema = require('../../schema/participant');

const ObjectId = require('mongodb').ObjectId;

const Validator = require('jsonschema').Validator;
const validator = new Validator();

const validEventIds = require('../../config').events.map(p => p._id);

const validateEventIds = (participant) =>
    validEventIds.includes(participant.eventId);

const validateParticipant = (participant) =>
    validator.validate(participant, participantSchema).valid;

module.exports = (db) => {
    const Participants = require('../../db/participant')(db);
    router.post('/participants', async (request, response) => {
        try {
            const participants = request.body;
            const error = new Error();
            console.log(participants);
            if (!(Array.isArray(participants)) || participants.length === 0) {
                error.message = 'Empty input';
                error.code = 'EmptyInput';
                throw error;
            }

            let invalidIndexes = [];
            let invalid = participants.filter((p, i) => {
                if (!validateParticipant(p)) {
                    invalidIndexes.push(i);
                    return true;
                }
            });

            if (invalid.length !== 0) {
                error.message = 'Invalid input';
                error.code = 'ValidationException';
                error.invalidIndexes = invalidIndexes;
                throw error;
            }

            invalid = participants.filter((p, i) => {
                if (!validateEventIds(p)) {
                    invalidIndexes.push(i);
                    return true;
                }
            });

            if (invalid.length !== 0) {
                error.message = 'Event not found';
                error.code = 'EventNotFound';
                error.invalidIndexes = invalidIndexes;
                throw error;
            }

            const result = await Participants.add(
                participants.map(p =>
                    ({...p, eventId: ObjectId(p.eventId)})
                )
            );
            response.status(200).json({message: 'Participants added.'});

        } catch (e) {
            if (e.code === 'EventNotFound') {
                response.status(404);
            }
            else if (e.code === 'ValidationException') {
                response.status(405);
            }
            else if (e.code === 'EmptyInput') {
                response.status(406);
            }
            else {
                console.log(e);
                response.status(500);
            }
            response.json({message: e.message, invalid: e.invalidIndexes});
        }
    });

    return router;
};
