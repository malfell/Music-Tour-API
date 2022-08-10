// DEPENDENCIES
// create router and save it to stages variable
const stages = require('express').Router()
// require models folder as db
// gives us access to all models at once
const db = require('../models')
const { Stage } = db
// destructure the Op class from Sequelize package 
const { Op, Event } = require('sequelize')

// INDEX ROUTE
// FIND ALL STAGES
stages.get('/', async (req, res) => {
    // call findAll on Event model and save it as variable
    // no need to pass arguments because we want all events
    // send back foundEvents as JSON response
    // for best practices, sent it back with a status of 200
    try {
        const foundStages = await Stage.findAll({
            where: {
                stage_name: { [Op.like]: `%${req.query.stage_name ? req.query.stage_name : ''}%`}
            }
        })
        res.status(200).json(foundStages)
    // for catch, send back JSON error with status of 500
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET SPECIFIC STAGE
stages.get('/:name', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_name: req.params.name},
            include: {
                    model: Event,
                    as: "events",
                    through: { attributes: [] }
                },
                order: [
                    [{ model: Event, as: "events" }, 'date', 'ASC'],
                ]
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A STAGE
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new stage',
            data: newStage
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE A STAGE
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} stage(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE A STAGE
stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = stages