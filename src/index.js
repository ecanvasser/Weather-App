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
  };

  return { getData };
};

const Display = () => {
    const setTitle = (name) => {
        document.getElementById('city').textContent = name;
    };

    const setStats = (obj) => {
        document.getElementById('temp').textContent = obj['temp'];
        document.getElementById('minmax').textContent = `${obj["temp_min"]} / ${obj['temp_max']}`;
        document.getElementById('vis').textContent = obj['visible'];
    }

    const build = (name, obj) => {
        setTitle(name);
        setStats(obj);
    }

    return { build };
};

const checkWeather = async () => {
    let city = document.getElementById('search').value;
    let display = Display();
    let weather = Weather();

    let pullWeather = await weather.getData(city);
    let setPage = await display.build(city, weatherObj);
    console.log(weatherObj);
}

document.getElementById('submit').addEventListener('click', (e) => {
    checkWeather();
    e.preventDefault();
})