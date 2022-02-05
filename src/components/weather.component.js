import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getTheWeatherAsync } from "../services/clima.service";
import LayoutComponent from "./layout.component";
import Loading from "./loading.component";
function WeatherComponent() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(async () => {
    var geo = searchParams.get("geo");
    let params = {};
    if (geo) {
      const lat = searchParams.get("lat");
      const lng = searchParams.get("lng");
      params = {
        lat: lat,
        lon: lng,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: "pt_br",
        units: "metric",
      };
    } else {
      params = {
        q: searchParams.get("city"),
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: "pt",
        units: "metric",
      };
    }

    let res = await getTheWeatherAsync(params);

    setWeather(res);
    setLocation(true);
  }, []);

  if (weather == null) {
    return <Loading />;
  } else {
    return <LayoutComponent result={weather} />;
  }
}

export default WeatherComponent;
