const winston =  require('winston');
const express = require("express");
const app = express(); 
const cors = require('cors');

app.use(cors())

require('./startup/validation')
require('./startup/config')
require('./startup/logging')
require("./startup/routes")(app);
require('./startup/db')()

const port = 8000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
