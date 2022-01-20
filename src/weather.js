import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap";

function formulario({ handleSubmit, handleChange, clicado }) {
  return (
    <form onSubmit={handleSubmit} className="weather__form">
      <input
        type="text"
        placeholder="Digite sua Cidade"
        className="city"
        value={clicado.value}
        onChange={handleChange}
        required
      />
      <button type="submit" value="Enviar" className="btn btn-primary">
        Verificar o clima
      </button>
    </form>
  );
}

const helloworld = () => {
  return <h1>Hello World</h1>;
};
function clima({ weather, setShow }) {
  return (
    <div className="weather">
      <div className="weather__header">
        <div className="title">
          <h2>
            {weather.name} {weather.sys.country}
          </h2>
          <h3>
            Clima atual <p>{weather["weather"][0]["description"]}</p>
          </h3>
        </div>
        <img
          className="img"
          src={`http://openweathermap.org/img/wn/${weather["weather"][0]["icon"]}@2x.png`}
        />
      </div>

      <ul>
        <li>{weather.description}</li>
        <li>
          Temperatura atual <p>{weather.main.temp}°</p>
        </li>
        <li>
          Temperatura máxima<p>{weather.main.temp_max}°</p>
        </li>
        <li>
          Temperatura minima<p>{weather.main.temp_min}°</p>
        </li>
        <li>
          Pressão<p>{weather.main.pressure} hpa</p>
        </li>
        <li>
          Humidade<p>{weather.main.humidity}%</p>
        </li>
      </ul>
      <button
        className="btn btn-primary"
        onClick={() => setShow({ exibirHome: true, exibirWeather: false })}
      >
        Voltar
      </button>
    </div>
  );
}

function Weather() {
  const [location, setLocation] = useState(false);
  const [weather, setweather] = useState(false);
  const [clicado, setClicado] = useState([]);
  const [show, setShow] = useState({ exibirHome: true, exibirWeather: false });
  console.log(clicado);

  function handleChange(name) {
    setClicado({ value: name.target.value });
  }

  function handleSubmit(event) {
    console.log(clicado);
    getTheWeather({
      q: clicado.value,
      appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
      lang: "pt",
      units: "metric",
    });
    event.preventDefault();
    setShow({ exibirHome: false, exibirWeather: true });
  }

  const getTheWeather = async (params) => {
    let res = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: params,
      }
    );
    setweather(res.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getTheWeather({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: "pt_br",
        units: "metric",
      });
      setLocation(true);
    });
  }, []);

  return (
    <div className="container-fluid">
      {(() => {
        if (show.exibirHome) {
          return formulario({
            handleSubmit: handleSubmit,
            clicado: clicado,
            handleChange: handleChange,
            setShow: setShow,
          });
        }

        if (show.exibirWeather) {
          return clima({
            weather: weather,
            setShow: setShow,
          });
        }
      })()}
    </div>
  );
}

export default Weather;
