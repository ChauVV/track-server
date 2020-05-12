require('./models/User')
require('./models/Track')
require('./models/Item')

const path = require('path');
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const itemRoutes = require('./routes/itemRoutes')
const requireAuth = require('./middlewares/requireAuth')

var swaggerJSDoc = require('swagger-jsdoc');
const app = express()

app.use(bodyParser.json())

var swaggerDefinition = {
  
    "info": {
      "title": "Node Swagger API",
      "version": "1.0.0",
      "description": "Demonstrating how to describe a RESTful API with Swagger"
    },
    "host": "localhost:3000",
    "basePath": "/",
    "swagger": "2.0",
    "paths": { },
    "responses": { },
    "parameters": { },
    "securityDefinitions": { }
    
  
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(authRoutes)
app.use(trackRoutes)
app.use(itemRoutes)


const mongoUri = 'mongodb+srv://admin:passwordpassword@cluster0-2wsg9.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance')
})
mongoose.connection.on('error', (err) => {
  console.error('Error on connect Mongo: ', err);
})

app.get('/', (req, res) => {
  res.send(`Wellcome`)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})


app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});