require('dotenv').config();  // Add this line at the top to load environment variables from a .env file

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 49890;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add CORS middleware to enable CORS for all routes
app.use(cors());

// Handle OPTIONS requests for the /sendSMS path
app.options('/sendSMS', cors());

// Handle POST requests for the /sendSMS path
app.post('/sendSMS', async (req, res) => {
    const { personNumber, textInput } = req.body;

    try {
        const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/' + process.env.TWILIO_ACCOUNT_SID + '/Messages.json', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(process.env.TWILIO_API_KEY + ':' + process.env.TWILIO_API_SECRET).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                From: process.env.TWILIO_PHONE_NUMBER,
                To: personNumber,
                Body: textInput
            })
        });

        const data = await response.json();
        if (response.ok) {
            res.json({ success: true, data });
        } else {
            res.status(response.status).json({ success: false, error: data });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



/*const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 49890;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add CORS middleware to enable CORS for all routes
app.use(cors());

// Handle OPTIONS requests for the /sendSMS path
app.options('/sendSMS', cors());

// Handle POST requests for the /sendSMS path
app.post('/sendSMS', async (req, res) => {
    const { personNumber, textInput } = req.body;

    const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/ACd2799421f889c5a61dc6dc8ed5c31dec/Messages.json', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from('SK14f4db5de3fb7021008833a93182f3c5:5Kox379UKKcXkZ9Bil3JCfs1PPQHwoc6').toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            From: '+16504259178',
            To: personNumber,
            Body: textInput
        })
    });

    const data = await response.json();
    if (response.ok) {
        res.json({ success: true, data });
    } else {
        res.status(response.status).json({ success: false, error: data });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
*/
