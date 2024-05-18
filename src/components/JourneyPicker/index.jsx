import React, { useEffect, useState } from 'react';
import './style.css';

const CytiOptions = (cities) => {
  return (
    <>
      <option value="">Vyberte</option>
      {cities.cities.map((city) => (
        <option key={city.name} value={city.name}>
          {city.name}
        </option>
      ))}
    </>
  );
};

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCity = async () => {
      const response = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/cities',
      );
      const data = await response.json();
      setCities(data.results);
      // console.log('mesta nastavena');
    };
    fetchCity();
  }, []);

  // useEffect(() => {
  //   const fetchName = async () => {
  //     const response = await fetch('https://nameday.abalin.net/api/V1/today');
  //     const data = await response.json();
  //     setName(data.nameday.cz);
  //   };

  //   fetchName();
  // }, []);

  const selectFromCity = (city) => {
    setFromCity(city.target.value);
  };
  const selectToCity = (city) => {
    setToCity(city.target.value);
  };
  const selectDate = (date) => {
    setDate(date.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      'odesilam formular s cestou: from: ' +
        fromCity +
        ' to: ' +
        toCity +
        ' when? ' +
        date,
    );
  };

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form className="journey-picker__form" onSubmit={handleSubmit}>
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select value={fromCity} onChange={selectFromCity}>
              <CytiOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select value={toCity} onChange={selectToCity}>
              <CytiOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select value={date} onChange={selectDate}>
              <option value="">Vyberte</option>
              <option value="datum01">Datum 01</option>
              <option value="datum02">Datum 02</option>
              <option value="datum03">Datum 03</option>
              <option value="datum04">Datum 04</option>
              <option value="datum05">Datum 05</option>
            </select>
          </label>
          <div className="journey-picker__controls">
            <button className="btn" type="submit">
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};
