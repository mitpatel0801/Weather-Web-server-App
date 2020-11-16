const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message = document.getElementById("message");
const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;
    fetch("/weather?address=" + location).then((response) => {

        message.textContent = "Loading...";
        message2.textContent = "";
        message1.textContent = "";
        response.json().then((data) => {

            if (data.error) {
                message.textContent = data.error;
            } else {
                message.textContent = "Location : " + data.location;
                message1.textContent = "Current temperature is " + data.temperature;
                message2.textContent = "Feels like " + data.feelsLike;
            }

        });

    });

})