import express from 'express'
import bodyParser from 'body-parser'
import router from './routes'

const mongodb = require('mongodb')
const http = require('http')
import nconf from 'nconf'

/**
 * mongoDB
 */
nconf
	.argv()
	.env()
	.file('./config/keys.json')

const user = nconf.get('mongoUser')
const pass = nconf.get('mongoPass')
const host = nconf.get('mongoHost')
const port = nconf.get('mongoPort')

let uri = `mongodb://${user}:${pass}@${host}:${port}`

if (nconf.get('mongoDatabase')) {
	uri = `${uri}/${nconf.get('mongoDatabase')}`
}
console.log(uri)

mongodb.MongoClient.connect(uri, { useNewUrlParser: true }, (err, db) => {
	if (err) {
		throw err
	}
	// Create a simple little server.
	http
		.createServer((req, res) => {
			if (req.url === '/_ah/health') {
				res.writeHead(200, {
					'Content-Type': 'text/plain'
				})
				res.write('OK')
				res.end()
				return
			}
			// Track every IP that has visited this site
			const collection = db.collection('IPs')

			const ip = {
				address: req.connection.remoteAddress
			}

			mongodb.MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
				if (err) {
					throw err
				}

				const db = client.db(nconf.get('mongoDatabase'))

				// push out a range
				let iplist = ''
				collection.find().toArray((err, data) => {
					if (err) {
						throw err
					}
					// Track every IP that has visited this site
					const collection = db.collection('IPs')

					const ip = {
						address: req.connection.remoteAddress
					}

					collection.insertOne(ip, err => {
						if (err) {
							throw err
						}

						// push out a range
						let iplist = ''
						collection.find().toArray((err, data) => {
							if (err) {
								throw err
							}
							data.forEach(ip => {
								iplist += `${ip.address}; `
							})

							res.writeHead(200, {
								'Content-Type': 'text/plain'
							})
							res.write('IPs:\n')
							res.end(iplist)
						})
					})

					res.writeHead(200, {
						'Content-Type': 'text/plain'
					})
					res.write('IPs:\n')
					res.end(iplist)
				})
			})
		})
		.listen(process.env.PORT || 8080, () => {
			console.log('started web process')
		})
})

const app = express()

// Parse incoming requests data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)

const PORT = 5000

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`)
})
