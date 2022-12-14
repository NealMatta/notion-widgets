const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('node:path');
const axios = require('axios');
const app = express();
// app.use(cors());

// Setting up the path for the ENV file
dotenv.config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});

// Setting the Port to be used
let port = process.env.PORT;
if (port == null || port == '') {
    port = 3002;
}

// List of whitelisted CORS Origin Values
var corsWhitelist = [
    `http://localhost:3000`,
    'https://cta-api-v1--mellow-figolla-a02b1d.netlify.app',
    'https://mellow-figolla-a02b1d.netlify.app',
];

// Setting up CORS
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            if (corsWhitelist.indexOf(origin) === -1) {
                var msg =
                    'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
    })
);

const requestEndpoint =
    'https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=' +
    process.env.CTA_API +
    '&mapid=41450&max=4&outputType=JSON';

app.get('/getCTA', async (req, res) => {
    const response = await axios.get(requestEndpoint);
    let cleanData = {};

    // Removing the root level object before passing it off to make it easier to send the data
    Object.values(response.data).map(item => {
        cleanData = item;
    });

    res.json(cleanData);
});

app.get('/api', (req, res) => {
    res.json({ users: ['u1', 'u2', 'u3'] });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
