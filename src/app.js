require('dotenv').config()

let data = []
const winston = require('winston');

//winston setup for logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'info.log'})
  ]
});
if(NODE_ENV !== 'production'){
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const app = express()
const morganOption = (process.env.NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(function errorHandler(error, req, res, next) {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})
app.use(cors())
app.use(express.json())

app.post('/', (req,res) => {
  
  data.push(req.body.name)
  console.log(data)
  res
    .json(req.body)
    
});

app.get('/', (req, res) => {
  res.send('Hello, boilerplate!')
})


module.exports = app