import "./style.css";

var weatherObj = {};

const Weather = () => {
  const getData = async (city) => {
    for (key in weatherObj) {
      delete weatherObj[key];
    }

    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=6461858adafc20c62e982c70265b6260&units=imperial`
    );
    let data = await response.json();
    weatherObj["temp"] = data.main.temp;
    weatherObj["temp_max"] = data.main.temp_max;
    weatherObj["temp_min"] = data.main.temp_min;
    weatherObj["visible"] = data.weather[0].description;
    console.log(weatherObj);
  };

  return { getData };
};

const Display = () => {
    const setTitle = (name) => {
        document.getElementById('city').textContent = name;
    };

    const setStats = () => {
        
    }

    return { setTitle };
};

document.getElementById('submit').addEventListener('click', (e) => {
    let city = document.getElementById('search').value;
    let display = Display();
    display.setTitle(city);
    e.preventDefault();
})