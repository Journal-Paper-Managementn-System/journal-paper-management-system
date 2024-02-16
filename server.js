const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
require('./database/db');

const authRoute = require('./routes/authRoute');
app.use('/auth', authRoute);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});