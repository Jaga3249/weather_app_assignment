import React, { useState } from "react";
import styled from "styled-components";
import { useWeatherContext } from "../context/WeatherContext";

const SearchBar: React.FC = () => {
  const [input, setInput] = useState("");
  const { setCity } = useWeatherContext();

  const handleSearch = () => {
    if (input.trim()) {
      setCity(input.trim());
      setInput("");
    }
  };

  // Optional: allow Enter key to trigger search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Wrapper>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter city name"
        aria-label="Search city"
      />
      <Button onClick={handleSearch}>Search</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  padding: 0 1rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  padding: 0.75rem 1.25rem;
  font-size: 1.1rem;
  border: 1.8px solid #ddd;
  border-radius: 9999px; /* fully rounded pill shape */
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.05);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &::placeholder {
    color: #aaa;
    font-style: italic;
  }

  &:focus {
    outline: none;
    border-color: #0077b6;
    box-shadow: 0 0 8px rgba(0, 119, 182, 0.5);
  }
`;

const Button = styled.button`
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #0077b6 0%, #00b4d8 100%);
  color: white;
  border: none;
  border-radius: 9999px; /* match input pill shape */
  cursor: pointer;
  box-shadow: 0 4px 10px rgb(0 119 182 / 0.4);
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #005f8a 0%, #0093c4 100%);
    box-shadow: 0 6px 14px rgb(0 95 138 / 0.6);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 12px rgba(0, 119, 182, 0.8);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export default SearchBar;
