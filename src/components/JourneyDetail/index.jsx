import './style.css';
import { BusStop } from '../BusStop';

export const JourneyDetail = ({ journey }) => {
  return (
    <div className="journey-detail container">
      <h2>Podrobnosti cesty</h2>
      <div className="stops">
        {journey.map((myJourney) => (
          <BusStop
            key={myJourney.code}
            name={myJourney.name}
            station={myJourney.station}
            time={myJourney.time}
          />
        ))}
      </div>
    </div>
  );
};
