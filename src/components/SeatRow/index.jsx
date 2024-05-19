import { Seat } from '../Seat';

export const SeatRow = ({ row, rowSelectedSeat, onSeatSelected }) => {
  // const sedadlo = 12;
  // rowSelectedSeat = sedadlo;
  const handleClick = () => {};

  return (
    <div className="seat-row">
      {row.map((seat) => (
        <Seat
          key={seat.number}
          number={seat.number}
          isOccupied={seat.isOccupied}
          isSelected={seat.number === rowSelectedSeat ? true : false}
          onSelect={onSeatSelected}
          // rowSelectedSeat={rowSelectedSeat}
        />
      ))}
    </div>
  );
};
