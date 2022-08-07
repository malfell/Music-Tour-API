// DEPENDENCIES
// create router and save it to bands variable
const bands = require('express').Router()
// require models folder as db
// gives us access to all models at once
const db = require('../models')
const { Band } = db
// destructure the Op class from Sequelize package 
const { Op } = require('sequelize')

// INDEX ROUTE
// FIND ALL BANDS
bands.get('/', async (req, res) => {
    // call findAll on Band model and save it as variable
    // no need to pass arguments because we want all bands
    // send back foundBands as JSON response
    // for best practices, sent it back with a status of 200
    try {
        console.log("I'm here")
        const foundBands = await Band.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name? req.query.name: ''}%`}
            }
        })
        res.status(200).json(foundBands)
    // for catch, send back JSON error with status of 500
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET SPECIFIC BAND
bands.get('/:id', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { band_id: req.params.id}
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A BAND
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE A BAND
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE A BAND
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = bands