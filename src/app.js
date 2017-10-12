import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { MongoClient as mongo } from 'mongodb'
import logger from 'morgan'

// Set env variable NODE_ENV to 'prod' for production env
let env = process.env.NODE_ENV || 'dev'

// Port at which the server should listen to, set environment variable PORT to whatever port you want to start with
let port = process.env.PORT || 3000

// Connect to mongo db
mongo.connect('mongodb://mongo:27017/autocomplete', (err, data) => {
	if (err) {
		console.error(err)
	} else {
		console.log('Connected to mongo server')
	}	
})

// the variable app is the hook to express framework
let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.listen(port, () => {
	console.log('Server started successfuly on port: ', port)
})

app.get('/search/:searchTerm', (req, res) => {
	let searchTerm = req.params.searchTerm
	console.log(searchTerm)
	// TODO implement search algorithm with the searchTerm
	res.json({
		searchTerm: searchTerm
	}, { status: 200})
})
