import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY;
const api_url = import.meta.env.VITE_BASE_URL;

export const fetchWeatherData = (city?: string, lat?: number, lon?: number) => {
  console.log("api url", api_url);
  let url = `${api_url}/weather?appid=${api_key}&units=metric`;

  if (lat !== undefined && lon !== undefined) {
    url += `&lat=${lat}&lon=${lon}`;
  } else if (city) {
    url += `&q=${city}`;
  } else {
    return Promise.reject(new Error("No location provided"));
  }

  return axios.get(url).then((res) => res.data);
};

export const fetchForecastData = (
  city?: string,
  lat?: number,
  lon?: number
) => {
  console.log("api url", api_url);
  let url = `${api_url}/forecast?appid=${api_key}&units=metric`;
  console.log("url", url);

  if (lat !== undefined && lon !== undefined) {
    url += `&lat=${lat}&lon=${lon}`;
  } else if (city) {
    url += `&q=${city}`;
  } else {
    return Promise.reject(new Error("No location provided"));
  }

  return axios.get(url).then((res) => res.data);
};
