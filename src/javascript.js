// Date and time
let currentDate = new Date();
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let dayOfWeek = daysOfWeek[currentDate.getDay()];
let hour = currentDate.getHours();
let minute = currentDate.getMinutes();
if (hour < 10) {
  hour = "0" + hour;
}
if (minute < 10) {
  minute = "0" + minute;
}
let time = hour + ":" + minute;
let dateTime = dayOfWeek + " " + time;
document.getElementById("current-time").innerHTML = dateTime;

// Convert temperature to farenheit
let temp = document.querySelector(".temp strong");
let tempValueCelsius = null;
let tempUnit = "C";
temp.addEventListener("click", () => {
  if (tempUnit === "C") {
    let tempF = Math.round((tempValueCelsius * 9) / 5 + 32);
    temp.innerHTML = `<strong>${Math.round(tempF)}&deg;F</strong>`;
    tempUnit = "F";
  } else {
    temp.innerHTML = `<strong>${Math.round(tempValueCelsius)}&deg;C</strong>`;
    tempUnit = "C";
  }
});

// Weather info
function weatherInfo(response) {
  document.querySelector("#city").innerHTML = `${response.data.name} Today:`;
  tempValueCelsius = response.data.main.temp;
  document.querySelector(".temp strong").innerHTML = `${Math.round(
    tempValueCelsius
  )}°C`;
  document.querySelector(
    ".humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector(".wind-speed").innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  //to change icon??//
  //document.querySelector(
  // ".weather-info .icon img"
  // ).src = `images/icons8-${response.data.weather[0].icon}-64.png`;

  // To make icons different by api?
  let iconCode = response.data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  let icon = document.querySelector(".weather-info .icon img");
  icon.src = iconUrl;

  document.querySelector(
    ".weather-info .rainy"
  ).innerHTML = `${response.data.weather[0].description}`;
}

// Search city
function searchCity(city) {
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(weatherInfo)
    .catch(function (error) {
      console.log(error);
      alert(
        "Sorry, we could not find the weather for that city. Please try again."
      );
    });
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherInfo);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function retrievePosition(position) {
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(weatherInfo);
}

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(retrievePosition);
});
searchCity("Luhansk");
