import { useParams } from 'react-router-dom';
import './style.css';
import { useState, useEffect } from 'react';

export const ReservationPage = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      const response = await fetch(
        `https://apps.kodim.cz/daweb/leviexpress/api/reservation?id=${id}`,
      );
      const data = await response.json();
      console.log(data);
      setReservation(data.results);
    };
    fetchReservation();
  }, []);

  return (
    <main>
      <div className="reservation container">
        <h2>Vaše e-jízdenka č. {reservation && reservation.reservationId}</h2>
        <div className="reservation__body">
          <div className="reservation__headings">
            <p>Datum cesty:</p>
            <p>Odjezd:</p>
            <p>Příjezd:</p>
            <p>Sedadlo:</p>
          </div>
          <div className="reservation__info">
            <p>{reservation && reservation.date}</p>
            <p>
              {reservation && reservation.fromCity.name},
              {reservation && reservation.fromCity.time}
            </p>
            <p>
              {reservation && reservation.toCity.name},
              {reservation && reservation.toCity.time}
            </p>
            <p> {reservation && reservation.seatNumber}</p>
          </div>
        </div>
      </div>
    </main>
  );
};
