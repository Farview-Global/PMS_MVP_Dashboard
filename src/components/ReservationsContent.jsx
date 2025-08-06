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
    <div className="mt-4 lg:mt-6 p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {reservationCardsData.map((card) => (
          <div
            key={card.id}
            className="group flex flex-col items-center gap-3 py-14 px-10 rounded-[10px] border border-black shadow-md w-full transform transition-transform duration-300 hover:scale-y-110 hover:bg-gradient-to-t from-[#3A1F6B]/70 to-[#005C84]/80 hover:border-white"
          >
            <img 
              src={getIconSrc(card.icon)} 
              alt={card.name} 
              className="w-20 h-20 transition-all duration-300 group-hover:brightness-0 group-hover:invert" 
            />
            <p className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-white transition-colors duration-300 text-center">{card.name}</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">{card.count}</p>
          </div>
          ))}
      </div>
      <div className="flex justify-center mt-6">
        <button className="flex justify-between items-center text-lg font-semibold transition-colors duration-200 hover:scale-y-110 hover:bg-gradient-to-t from-[#3A1F6B]/70 to-[#005C84]/80 hover:border-white hover:text-white" 
                style={{ 
                  width: '250px', 
                  padding: '20px', 
                  borderRadius: '10px', 
                  border: '1.5px solid #005C84' 
                }}>
          <span>View All</span>
          <span className="text-2xl">&#8594;</span>
        </button>
      </div>
    </div>
  );
};

export default ReservationsContent;