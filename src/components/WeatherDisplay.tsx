import React from "react";
import styled from "styled-components";
import { useWeatherContext } from "../context/WeatherContext";

const WeatherDisplay: React.FC = () => {
  const { weather, city } = useWeatherContext();
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  console.log("weather", weather);

  return (
    <Card>
      <City>{city}</City>
      <MainInfo>
        <Temp>{weather.main.temp.toFixed(1)}°C</Temp>
        <Icon src={iconUrl} alt={weather.weather[0].description} />
      </MainInfo>
      <Condition>{weather.weather[0].main}</Condition>
      <Details>
        <DetailItem>
          <Label>Humidity</Label>
          <Value>{weather.main.humidity}%</Value>
        </DetailItem>
        <DetailItem>
          <Label>Wind</Label>
          <Value>{weather.wind.speed} m/s</Value>
        </DetailItem>
      </Details>
    </Card>
  );
};

const Card = styled.div`
  max-width: 360px;
  margin: 0 auto 2rem;
  background: linear-gradient(145deg, #e0f7fa, #ffffff);
  border-radius: 18px;
  padding: 2rem 1.5rem;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1), inset 0 -3px 8px #a3d9f0;
  text-align: center;
`;

const City = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: #0077b6;
  margin-bottom: 0.8rem;
`;

const MainInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.7rem;
`;

const Temp = styled.h2`
  font-size: 4rem;
  font-weight: 800;
  color: #023e8a;

  @media (max-width: 480px) {
    font-size: 3rem;
  }
`;

const Icon = styled.img`
  width: 80px;
  height: 80px;

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

const Condition = styled.p`
  font-size: 1.3rem;
  color: #0096c7;
  font-weight: 600;
  margin-bottom: 1.2rem;
  text-transform: capitalize;
`;

const Details = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 1rem;
  color: #555;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.span`
  font-weight: 500;
  margin-bottom: 0.3rem;
  color: #0077b6;
`;

const Value = styled.span`
  font-weight: 700;
  color: #023e8a;
`;

export default WeatherDisplay;
