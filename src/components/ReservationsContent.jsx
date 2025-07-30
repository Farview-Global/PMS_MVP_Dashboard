import React from 'react';
import reservationCardsData from '../data/reservationCards.json';
import ArrivalsIcon from '../assets/Arrivals.svg';
import DeparturesIcon from '../assets/Departures.svg';
import StayOversIcon from '../assets/StayOvers.svg';
import GroupIcon from '../assets/Group.svg';
import DayUseIcon from '../assets/Day Use.svg';
import CancelledIcon from '../assets/Cancelled.svg';

const ReservationsContent = () => {
  const getIconSrc = (iconPath) => {
    switch (iconPath) {
      case "../assets/Arrivals.svg":
        return ArrivalsIcon;
      case "../assets/Departures.svg":
        return DeparturesIcon;
      case "../assets/StayOvers.svg":
        return StayOversIcon;
      case "../assets/Group.svg":
        return GroupIcon;
      case "../assets/Day Use.svg":
        return DayUseIcon;
      case "../assets/Cancelled.svg":
        return CancelledIcon;
      default:
        return null;
    }
  };

  return (
    <div className="mt-6 grid grid-cols-6 gap-4 ">
      {reservationCardsData.map((card) => (
        <div
        key={card.id}
        className="border border-black rounded-lg shadow-md p-4 flex flex-col items-center justify-center h-[310px] w-[240px] transform transition-transform duration-300 hover:scale-y-110 hover:bg-gradient-to-t from-[#4A2C82]/70 to-[#005C84]/80"
      >
          <img src={getIconSrc(card.icon)} alt={card.name} className="w-30 h-30 mb-2 font-thi" />
          <p className="text-lg font-semibold text-gray-800">{card.name}</p>
          <p className="text-3xl font-bold text-gray-900">{card.count}</p>
        </div>
      ))}
        <div className="col-span-6 flex justify-center mt-4">
          <button className="w-[300px] px-6 py-6 rounded-lg text-lg font-semibold flex justify-between items-center border border-black hover:bg-purple-50 transition-colors duration-200 hover:scale-y-110 hover:bg-gradient-to-t from-[#4A2C82]/70 to-[#005C84]/80">
            <span>View All</span>
            <span className="text-xl">&#8594;</span>
          </button>
        </div>
    </div>
  );
};

export default ReservationsContent; 