const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message = document.getElementById("message");
const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");
const message3 = document.getElementById("message-3");


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;
    message.textContent = "Loading...";
    message2.textContent = "";
    message1.textContent = "";
    message3.textContent = "";

    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                message.textContent = data.error;
            } else {
                message.textContent = "Location : " + data.location;
                message1.textContent = "Current temperature is " + data.temperature;
                message2.textContent = "Feels like " + data.feelsLike;
                message3.textContent = "Humidity : " + data.humidity + "%";
            }

        });

    });

})