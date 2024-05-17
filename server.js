const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 49890;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Handle OPTIONS requests for the /sendSMS endpoint
app.options('/sendSMS', cors());

// Handle POST requests for the /sendSMS endpoint
app.post('/sendSMS', async (req, res) => {
    const { personNumber, textInput } = req.body;

    const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/ACd2799421f889c5a61dc6dc8ed5c31dec/Messages.json', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from('ACd2799421f889c5a61dc6dc8ed5c31dec:2225af7e5b6ab7a039111f419b806814').toString('base64'),
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
