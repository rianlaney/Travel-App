require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const {SERVER_PORT} = process.env
const {
    getHomePage,
    getStates,
    getActivities,
    updateVisited,
    updateActivity,
    createActivity,
    deleteActivity,
    
} = require('./controller.js')

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

// DEV
// app.post('/seed', seed)

// states
app.get('/states', getStates)
app.put('/states/:id', updateVisited)

// activites
app.get('/states/:id', getActivities)
app.post('/states/:id', createActivity)
app.put('/states/activities/:id', updateActivity)
app.delete('/states/activities/:id', deleteActivity)



app.get('/', getHomePage)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))