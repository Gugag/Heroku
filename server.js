const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/sendSMS', async (req, res) => {
    const { personNumber, textInput } = req.body;

    const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/ACd2799421f889c5a61dc6dc8ed5c31dec/Messages.json', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from('ACd2799421f889c5a61dc6dc8ed5c31dec:2d662aaf6b325c9fb9dfce76f356de15').toString('base64'),
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
