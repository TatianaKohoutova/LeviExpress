import { useState } from 'react';
import { JourneyPicker } from '../../components/JourneyPicker';
import { JourneyDetail } from '../../components/JourneyDetail';

export const HomePage = () => {
  const [journey, setJourney] = useState(null);

  const handleJourneyChange = (journeyData) => {
    const { stops } = journeyData;
    console.log(journeyData, stops);
    setJourney(journeyData);
  };

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {/* <p>Nalezeno spojení s id {journey && journey.journeyId}</p> */}
      {journey && <JourneyDetail journey={journey.stops} />}
    </main>
  );
};
