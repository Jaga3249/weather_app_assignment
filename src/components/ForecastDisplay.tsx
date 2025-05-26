import React from "react";
import styled from "styled-components";
import { useWeatherContext } from "../context/WeatherContext";

const ForecastDisplay: React.FC = () => {
  const { forecast } = useWeatherContext();
  if (!forecast) return null;

  const daily = forecast?.list
    .filter((_: any, index: number) => index % 8 === 0)
    .slice(0, 5);

  return (
    <Grid>
      {daily?.map((day: any, i: number) => (
        <Card key={i}>
          <h4>
            {new Date(day.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </h4>
          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
          />
          <p>{day.main.temp.toFixed(1)}°C</p>
        </Card>
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 0 1rem;
`;

const Card = styled.div`
  flex: 1 1 120px;
  max-width: 150px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(6px);
  border-radius: 12px;
  text-align: center;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h4 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  img {
    width: 50px;
    height: 50px;
  }

  p {
    font-size: 1.1rem;
    color: #0077b6;
    font-weight: bold;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;

    h4 {
      font-size: 0.9rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

export default ForecastDisplay;
