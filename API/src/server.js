const express = require('express');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors({origin:'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

requireDir('./app/models')
require('./app/controllers/index')(app);

app.listen(3001);

console.log("Now listening on localhost:3001");