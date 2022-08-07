// DEPENDENCIES
// create router and save it to bands variable
const events = require('express').Router()
// require models folder as db
// gives us access to all models at once
const db = require('../models')
const { Event } = db
// destructure the Op class from Sequelize package 
const { Op } = require('sequelize')

// INDEX ROUTE
// FIND ALL BANDS
events.get('/', async (req, res) => {
    // call findAll on Event model and save it as variable
    // no need to pass arguments because we want all events
    // send back foundEvents as JSON response
    // for best practices, sent it back with a status of 200
    try {
        const foundEvents = await Event.findAll({
            order: [ [ 'date', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        })
        res.status(200).json(foundEvents)
    // for catch, send back JSON error with status of 500
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET SPECIFIC EVENT
events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id}
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE AN EVENT
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE AN EVENT
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE A BAND
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = events