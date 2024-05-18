function sendSMS() {
    console.log("Sending SMS...");
    const personNumber = document.getElementById('numberInput').value;
    const textInput = document.getElementById('textInput').value;

    fetch('https://agile-forest-00225.herokuapp.com/sendSMS', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            personNumber: personNumber,
            textInput: textInput
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("SMS sent successfully");
            displayAlert("SMS sent successfully", "success");
        } else {
            console.error("Failed to send SMS", data.error);
            displayAlert("Failed to send SMS", "error");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        displayAlert("Error occurred while sending SMS", "error");
    });
}

function displayAlert(message, type) {
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message;
    alertMessage.classList.add(type);
    alertMessage.style.display = "block";

    setTimeout(() => {
        alertMessage.style.display = "none";
        alertMessage.classList.remove(type);
    }, 3000);
}
