import axios from "axios";

const getTheWeatherAsync = async (params) => {
  let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: params,
  });

  return res.data;
};

export { getTheWeatherAsync };
