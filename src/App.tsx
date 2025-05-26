import React from "react";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import { useWeatherContext } from "./context/WeatherContext";
import ErrorMessage from "./components/ErrorMessage";
import ForecastDisplay from "./components/ForecastDisplay";

const App: React.FC = () => {
  const { error } = useWeatherContext();
  return (
    <Container>
      <GlobalStyle />
      <SearchBar />
      {error ? (
        <ErrorMessage />
      ) : (
        <>
          <WeatherDisplay />
          <ForecastDisplay />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to top, #3a6186, #89253e);
  color: white;
  padding: 2rem;
  font-family: sans-serif;
`;

export default App;
