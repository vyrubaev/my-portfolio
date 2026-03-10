const result= document.getElementById("result");
const select= document.getElementById("select");
const btn= document.getElementById("get-weather-btn");
const icon= document.getElementById("weather-icon");
const feels = document.getElementById("feels-like");
const temp = document.getElementById("main-temperature");
const hum = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");
const weatherMain = document.getElementById("weather-main");
const loc = document.getElementById("location");
const arrow = document.getElementById("arrow");
const compassCont = document.getElementById("compass-container");

async function getWeather(town) {
  try {
    if (town == 'paris') {
      alert('Something went wrong, please try again later');
    }
    const res = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${town}`);
    const data = await res.json();
    return data;
  } catch (err) {
      console.log(err);
  };
};

async function showWeather(town) {
  const data = await getWeather(town);

  const ids = ["location", "main-temperature", "weather-main", "feels-like", "humidity", "wind", "wind-gust", "weather-icon"];
    
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove("hidden");
    });
      
    icon.src = data.weather[0].icon;
    feels.innerText = data.main.feels_like?`Feels like: ${data.main.feels_like} °C`:"Feels like: ";
    temp.innerText = `Temperature: ${data.main.temp} °C`;
    hum.innerText = `Humidity: ${data.main.humidity}`;
    wind.innerText = `Wind: ${data.wind.speed} meter/sec`;
    windGust.innerText = data.wind.gust?`Gust : ${data.wind.gust}`:"Gust: N/A";
    weatherMain.innerText = `Weather: ${data.weather[0].main}, ${data.weather[0].description}`;
    loc.innerText = `Location: ${data.name}`

    if (data.wind && data.wind.deg !== undefined) {
      compassCont.classList.remove("hidden");
      arrow.style.transform = `rotate(${data.wind.deg}deg)`;
      document.getElementById("wind-direction").innerText = `${data.wind.deg}°`;
}
   
};

 btn.addEventListener('click', () => {
    const target = select.value;

    console.log(target);
    showWeather(target);
  });

