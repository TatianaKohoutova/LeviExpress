import React, { useEffect, useState } from 'react';
import './style.css';

const CytiOptions = ({ cities }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {cities.map((city) => (
        <option key={city.code} value={city.code}>
          {city.name}
        </option>
      ))}
    </>
  );
};

// const CytiOptions = (props) => {
//   return (
//     <>
//       <option value="">Vyberte</option>
//       {props.cities.map((city) => (
//         <option key={city.code} value={city.code}>
//           {city.name}
//         </option>
//       ))}
//     </>
//   );
// };

const DatesOptions = ({ dates }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {dates.map((date) => (
        <option key={date.dateBasic} value={date.dateBasic}>
          {date.dateCs}
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
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchCity = async () => {
      const response = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/cities',
      );
      const data = await response.json();
      setCities(data.results);
      // console.log('mesta nastavena');
    };

    const fetchDates = async () => {
      const response = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/dates',
      );
      const data = await response.json();
      setDates(data.results);
      // console.log('mesta nastavena');
    };

    fetchCity();
    fetchDates();
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

    const fetchJournew = async () => {
      const response = await fetch(
        `https://apps.kodim.cz/daweb/leviexpress/api/journey?fromCity=${fromCity}&toCity=${toCity}&date=${date}`,
      );
      const data = await response.json();
      onJourneyChange(data.results);
      // console.log(data);
    };
    fetchJournew();
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
              <DatesOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button
              className="btn"
              type="submit"
              disabled={fromCity && toCity && date ? false : true}
            >
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};
