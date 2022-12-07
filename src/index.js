import "./style.css";

var weatherObj = {};

const Weather = () => {
  const getData = async (city) => {
    weatherObj = Object.create({});

    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=6461858adafc20c62e982c70265b6260&units=imperial`,
      { mode: "cors" }
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
    document.getElementById("city").textContent = name;
  };

  const setStats = (obj) => {
    document.getElementById("temp").textContent = obj["temp"];
    document.getElementById(
      "minmax"
    ).textContent = `${obj["temp_min"]} / ${obj["temp_max"]}`;
    document.getElementById("vis").textContent = obj["visible"];
  };

  const setGIF = async () => {
    var img = document.querySelector("img");
    let param;

    weatherObj["visible"].includes("cloud")
      ? (param = "clouds")
      : weatherObj["visible"].includes("mist")
      ? (param = "mist")
      : weatherObj["visible"].includes("fog")
      ? (param = "fog")
      : weatherObj["visible"].includes("rain")
      ? (param = "rain")
      : weatherObj["visible"].includes("thunder")
      ? (param = "thunder")
      : (param = "sunny");

    let response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=IOUD8smzD9Ir16zebOKAYlxMWSOjLkHt&s=${param}`,
      { mode: "cors" }
    );
    let data = await response.json();
    img.src = data.data.images.original.url;
  };

  const build = async (name, obj) => {
    await setGIF();
    setTitle(name);
    setStats(obj);
  };

  return { build };
};

const checkWeather = async () => {
  let city = document.getElementById("search").value;
  let display = Display();
  let weather = Weather();

  let pullWeather = await weather.getData(city);
  let setPage = await display.build(city, weatherObj);
};

document.getElementById("submit").addEventListener("click", (e) => {
  checkWeather();
  e.preventDefault();
});
