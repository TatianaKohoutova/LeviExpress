import { useState } from 'react';
import { JourneyPicker } from '../../components/JourneyPicker';
import { JourneyDetail } from '../../components/JourneyDetail';
import { SeletedSeat } from '../../components/SelectedSeat';
import { useNavigate } from 'react-router-dom';
import { SeatPicker } from '../../components/SeatPicker';

export const HomePage = () => {
  const [journey, setJourney] = useState(null);
  const navigate = useNavigate();
  const [userSeat, setUserSeat] = useState(null);

  const handleJourneyChange = (journeyData) => {
    const { stops } = journeyData;
    console.log(journeyData, stops);
    setJourney(journeyData);
    setUserSeat(journeyData.autoSeat);
  };

  const setUserSeatFunkce = (seat) => {
    setUserSeat(seat);
  };

  // const navigate = (where) => {
  //   useNavigate(where);
  // };

  const handleBuy = async () => {
    const response = await fetch(
      'https://apps.kodim.cz/daweb/leviexpress/api/reservation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          seat: userSeat,
          journeyId: journey.journeyId,
        }),
      },
    );
    const data = await response.json();
    const myReservation = data.results.reservationId;
    // console.log(data.results.reservationId);
    navigate(`/reservation/${myReservation}`);
  };

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {/* <p>Nalezeno spojení s id {journey && journey.journeyId}</p> */}
      {journey && <JourneyDetail journey={journey.stops} />}

      {journey && (
        <SeatPicker
          seats={journey.seats}
          selectedSeat={userSeat}
          onSeatSelected={setUserSeatFunkce}
        />
      )}

      {/* <SeletedSeat number={journey && journey.autoSeat} /> */}

      <div className="controls container">
        <button className="btn btn--big" type="button" onClick={handleBuy}>
          Rezervovat
        </button>
      </div>
    </main>
  );
};
