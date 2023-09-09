function formatDate(date) {
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let dayOfWeek = days[date.getDay()];
	let timeHour = date.getHours();
	let timeMinutes = date.getMinutes();
	if (timeHour < 10) {
		timeHour = `0${timeHour}`;
	}
	if (timeMinutes < 10) {
		timeMinutes = `0${timeMinutes}`;
	}
	return `${dayOfWeek} ${timeHour}: ${timeMinutes}`;
}

let currentDate = document.querySelector("#date-time");
let date = new Date();
currentDate.innerHTML = formatDate(date);
///

//CITY SEARCH TO CORRECTLY PULL WEATHER DATA FROM API
function displayWeather(response) {
	console.log(response);
	document.querySelector("#current-city").innerHTML =
		response.data.name;
	document.querySelector("#current-temperature").innerHTML =
		Math.round(response.data.main.temp);
	document.querySelector("#wind-speed").innerHTML =
		Math.round(response.data.wind.speed);
	document.querySelector("#humidity").innerHTML =
		response.data.main.humidity;
}

function search(city) {
	let apiKey = "8944afa6845bd7c413a687258d3211ef";
	let units = "imperial";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
	axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
	event.preventDefault();
	let city = document.querySelector("#city-input").value;
	search(city);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", handleSubmit);

search("Los Angeles");

// -----------------  BONUS HOMEWORK CHALLENGE -----------
//   Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit.
//   When clicking on it, it should convert the temperature to Fahrenheit. When clicking on
//   Celsius, it should convert it back to Celsius.

//fahrenheit temp = (celsius * 9/5) + 32;
//celsius temp = (fahrenheit − 32) × 5/9

function convertToCelsius(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector(
		"#current-temperature"
	);
	let temperature = temperatureElement.innerHTML;
	temperatureElement.innerHTML = Math.round(
		((temperature - 32) * 5) / 9
	);
}
function converToFahrenheit(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector(
		"#current-temperature"
	);
	let temperature = temperatureElement.innerHTML;
	temperatureElement.innerHTML = Math.round(
		(temperature * 9) / 5 + 32
	);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector(
	"#fahrenheit-link"
);
fahrenheitLink.addEventListener(
	"click",
	converToFahrenheit
);
