function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement =
    document.querySelector("#temperature");
  let descriptionElement =
    document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(
    fahrenheitTemperature
  );
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML =
    response.data.condition.description;
  windElement.innerHTML = Math.round(
    response.data.wind.speed
  );
  humidityElement.innerHTML =
    response.data.temperature.humidity;
  dateElement.innerHTML = formatDate(
    response.data.time * 1000
  );
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute(
    "alt",
    response.data.condition.description
  );
  getForecast(response.data.city);
}

function search(city) {
  let apiKey = "fbf3f590d8fa5cdo2b6a6d68f4tc4ef2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement =
    document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement =
    document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature =
    ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(
    celsiusTemperature
  );
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement =
    document.querySelector("#temperature");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(
    fahrenheitTemperature
  );
}

function getForecast(city) {
  let apiKey = "fbf3f590d8fa5cdo2b6a6d68f4tc4ef2";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat",
  ];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatForecastDay(
        day.time
      )}</div>
      <div class="weather-forecast-icon"><img
        src="${day.condition.icon_url}"/></div>
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperatures-max">
          ${Math.round(day.temperature.maximum)}°
        </span>
        <span class="weather-forecast-temperatures-min">
          ${Math.round(day.temperature.minimum)}°
        </span>
    </div>
  </div>
`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector(
  "#fahrenheit-link"
);
fahrenheitLink.addEventListener(
  "click",
  displayFahrenheitTemp
);

search("Los Angeles");
