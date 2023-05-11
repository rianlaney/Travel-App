require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const path = require('path')
const {SERVER_PORT} = process.env
const {
    getHomePage,
    getDropdown,
    getStates,
    getSpecificState,
    getActivities,
    updateVisited,
    updateActivity,
    createActivity,
    deleteActivity,
    seed

} = require('./controller.js')

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

// DEV
app.post('/seed', seed)

// states
app.get('/dropdown', getDropdown)
app.get(`/states/:state`, getSpecificState)
app.get('/states', getStates)
app.put('/states', updateVisited)

// activites
app.get('/activities', getActivities)
app.post('/activities', createActivity)
app.put('activities/:id', updateActivity)
app.delete('/activities/:id', deleteActivity)



app.get('/home', getHomePage)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))