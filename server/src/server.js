  
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );
app.use(cors(
    {
        origin: '*',
    }
));


app.use(routes);

app.listen(3333);