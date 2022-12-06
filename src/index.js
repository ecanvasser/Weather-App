import "./style.css";

const Weather = () => {
  var weatherObj = {};

  const getData = async (city) => {
    for (key in weatherObj) {
      delete weatherObj[key];
    }

    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=6461858adafc20c62e982c70265b6260&units=imperial`
    );
    let data = await response.json();
    weatherObj["temp"] = data.main.temp;
    console.log(weatherObj);
  };

  return { getData };
};
