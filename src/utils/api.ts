import axios from "axios";
import type { WeatherData } from "../types/weather";

const API_KEY = "YOUR_API_KEY"; // Replace this

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await axios.get<WeatherData>(url);
  return response.data;
};
