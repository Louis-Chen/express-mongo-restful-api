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

console.log(uri)

mongoose.connect(uri, { useNewUrlParser: true }).then(
	() => {
		console.log('連線成功')
	},
	err => {
		console.log(err)
	}
)

const app = express()

// Parse incoming requests data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)

const PORT = 5000

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`)
})
