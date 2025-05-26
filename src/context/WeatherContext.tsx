// import React, { createContext, useContext, useState, useEffect } from "react";
// import { fetchWeatherData, fetchForecastData } from "../services/weatherAPI";

// interface WeatherContextType {
//   city: string;
//   setCity: (city: string) => void;
//   weather: any;
//   forecast: any;
//   error: string;
// }

// const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [city, setCity] = useState<string | null>(null);
//   const [weather, setWeather] = useState<any>(null);
//   const [forecast, setForecast] = useState<any>(null);
//   const [error, setError] = useState<string>("");

//   // Helper to fetch weather and forecast by city or coords
//   const getData = async (cityParam?: string, lat?: number, lon?: number) => {
//     try {
//       let w, f;

//       if (lat !== undefined && lon !== undefined) {
//         // Assume your fetchWeatherData and fetchForecastData accept lat/lon optionally
//         w = await fetchWeatherData(undefined, lat, lon);
//         f = await fetchForecastData(undefined, lat, lon);
//         setCity(w?.name);
//         console.log(w, f);
//       } else if (cityParam) {
//         w = await fetchWeatherData(cityParam);
//         f = await fetchForecastData(cityParam);
//       } else {
//         throw new Error("No location provided");
//       }

//       setWeather(w);
//       setForecast(f);
//       setError("");

//       if (cityParam) {
//         setCity(cityParam);
//         localStorage.setItem("lastCity", cityParam);
//       }
//     } catch (err) {
//       setError("City not found or API error.");
//     }
//   };

//   // On initial mount: try to get location
//   useEffect(() => {
//     const storedCity = localStorage.getItem("lastCity");
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           getData(
//             undefined,
//             position.coords.latitude,
//             position.coords.longitude
//           );
//         },
//         () => {
//           // If location permission denied or error, fallback to stored city or default
//           getData(storedCity || "London");
//         }
//       );
//     } else {
//       // No geolocation support, fallback
//       getData(storedCity || "London");
//     }
//   }, []);

//   // Fetch weather whenever city changes manually
//   useEffect(() => {
//     // Only fetch if city is set and no lat/lon override
//     if (city) {
//       getData(city);
//     }
//   }, [city]);

//   // Optional: refresh every 30 seconds for current city
//   useEffect(() => {
//     if (!city) return;

//     const interval = setInterval(() => {
//       getData(city);
//     }, 30000);

//     return () => clearInterval(interval);
//   }, [city]);

//   console.log(city);

//   return (
//     <WeatherContext.Provider
//       value={{ city: city || "", setCity, weather, forecast, error }}
//     >
//       {children}
//     </WeatherContext.Provider>
//   );
// };

// export const useWeatherContext = () => {
//   const context = useContext(WeatherContext);
//   if (!context)
//     throw new Error("useWeatherContext must be used within WeatherProvider");
//   return context;
// };
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData, fetchForecastData } from "../services/weatherAPI";

// Define the shape of the context
interface WeatherContextType {
  city: string;
  setCity: (city: string) => void;
  weather: any;
  forecast: any;
  error: string;
  refetchWeather: () => void;
  refetchForecast: () => void;
  weatherLoading: boolean;
  forecastLoading: boolean;
}

// Create the context
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// Provider component
export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [city, setCity] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string>("");

  // Get user's current location or fallback
  useEffect(() => {
    const storedCity = localStorage.getItem("lastCity");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setCoords({ lat, lon });

          // 🔥 Fetch weather immediately to get city name
          try {
            const weatherData = await fetchWeatherData(undefined, lat, lon);
            setCity(weatherData.name); // <-- Set city from API
          } catch (err) {
            console.error("Failed to fetch city from coords:", err);
            setCity(storedCity || "London");
          }
        },
        () => {
          setCity(storedCity || "London");
        }
      );
    } else {
      setCity(storedCity || "London");
    }
  }, []);

  // Persist city to localStorage
  useEffect(() => {
    if (city) {
      localStorage.setItem("lastCity", city);
    }
  }, [city]);

  // Weather query
  const {
    data: weather,
    error: weatherError,
    refetch: refetchWeather,
    isLoading: weatherLoading,
  } = useQuery({
    queryKey: ["weather", city, coords],
    queryFn: () => {
      if (coords) {
        return fetchWeatherData(undefined, coords.lat, coords.lon);
      }
      if (city) {
        return fetchWeatherData(city);
      }
      return Promise.reject("No location");
    },
    enabled: !!city || !!coords,
    retry: false,
  });

  // Forecast query
  const {
    data: forecast,
    error: forecastError,
    refetch: refetchForecast,
    isLoading: forecastLoading,
  } = useQuery({
    queryKey: ["forecast", city, coords],
    queryFn: () => {
      if (coords) {
        return fetchForecastData(undefined, coords.lat, coords.lon);
      }
      if (city) {
        return fetchForecastData(city);
      }
      return Promise.reject("No location");
    },
    enabled: !!city || !!coords,
    retry: false,
  });

  // Handle query errors
  useEffect(() => {
    if (weatherError || forecastError) {
      setError("City not found or API error.");
    } else {
      setError("");
    }
  }, [weatherError, forecastError]);

  return (
    <WeatherContext.Provider
      value={{
        city: city || "",
        setCity,
        weather,
        forecast,
        error,
        refetchWeather,
        refetchForecast,
        weatherLoading,
        forecastLoading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

// Hook to consume the context
export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within WeatherProvider");
  }
  return context;
};
