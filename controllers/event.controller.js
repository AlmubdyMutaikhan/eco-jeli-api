const Event = require('../models/Event.model'); 

const getAllEvents = async (req, res) => {
    try {
        const eventDocs = await Event.find({});
        res.status(200).send({"msg":'ok', "events":eventDocs});
    } catch(err) {
        res.status(400).send({"msg":'nok', "err":err.message});
    }
}

const getEvent = async (req, res) => {
    try {
        const eventDoc = await Event.findById(req.params.eventID);
        res.status(200).send({"msg":'ok', "event":eventDoc});
    } catch(err) {
        res.status(400).send({"msg":'nok', "err":err.message});
    }
}

const postEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).send({'msg':"ok", 'eventID' : event._id});
    } catch(err) {
        res.status(400).send({"msg":'nok', "err":err.message});
    }
}

const updateEvent = async (req, res) => {
    try {
        const eventID = req.params.eventID;
        if(!eventID) {throw new Error('no event id!')}

        await Event.findByIdAndUpdate(eventID, req.body);
        res.status(201).send({msg:'ok'});
    } catch(err) {
        res.status(400).send({"msg":'nok', "err":err.message});
    }
}

const deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.eventID);
        res.status(201).send({'msg':"ok"});
    } catch(err) {
        res.status(400).send({"msg":'nok', "err":err.message});
    }
}



module.exports = {
    postEvent,
    deleteEvent,
    getAllEvents,
    updateEvent,
    getEvent
}