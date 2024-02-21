const express = require('express');
const app = express();
const cors = require('cors');
const postRoute = require('./routes/postRoute');
require('dotenv').config();
require('./database/db');

app.use(cors({
    origin: '*'
}));

app.use('/api', postRoute);

app.listen(3000, () => {
    console.log('Server started');
});