import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function LayoutComponent(props) {
  const [weather, setWeather] = useState(props.result);
  let navigate = useNavigate();

  if (weather == null) {
    return (
      <>
        <h1>testando</h1>
      </>
    );
  } else {
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
          onClick={() => navigate("/weather")}
        >
          Voltar
        </button>
      </div>
    );
  }
}
export default LayoutComponent;
