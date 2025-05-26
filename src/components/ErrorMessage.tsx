import React from "react";
import styled from "styled-components";
import { useWeatherContext } from "../context/WeatherContext";

const ErrorMessage: React.FC = () => {
  const { error } = useWeatherContext();
  return <Error>{error}</Error>;
};

const Error = styled.div`
  color: red;
  font-weight: bold;
  text-align: center;
`;

export default ErrorMessage;
