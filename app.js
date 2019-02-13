import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import router from './routes'
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
	uri = `mongodb://${user}:${pass}@${host}:${port}/${nconf.get('mongoDatabase')}?authSource=admin`
}

mongoose.connect(uri, { useNewUrlParser: true }).then(
	() => {
		console.log('連線成功', uri)
	},
	err => {
		console.log(err)
	}
)
const db = mongoose.connection
const app = express()

// Parse incoming requests data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // encode Content-Type: application/x-www-form-urlencoded
app.use(router)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`)
})
