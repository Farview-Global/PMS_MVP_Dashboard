import sunIcon from '../assets/sun.svg';
import hotelIcon from '../assets/hotel.svg';

const GreetingWeatherHotelCard = () => {
  return (
    <div className="flex justify-between items-center w-[1678px] h-[96px] bg-white rounded-[10px] p-[10px] shadow-lg">
      {/* Left Section - Greeting and Weather */}
      <div className="flex items-center space-x-4">
        {/* Sun Icon */}
        <img src={sunIcon} alt="Sun" className="w-[36px] h-[37px]" />

        {/* Greeting and weather info */}
        <div>
          <h2 className="text-xl font-bold text-[#374151] ">
            Good afternoon, Alex
          </h2>
          <p className="text-[18px] text-[#6B7280] font-semibold  pt-[12px]">72°F, Sunny</p>
        </div>
      </div>

      {/* Right Section - Hotel Card with Gradient Border */}
      <div className="relative group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-600 rounded-[10px] p-[1px] group-hover:from-white group-hover:to-white transition-all duration-300">
          <div className="bg-white rounded-[9px] h-full w-full"></div>
        </div>
        <div className="relative flex items-center gap-3 px-4 py-2 rounded-[10px]">
          <img src={hotelIcon} alt="Hotel" className="w-[40px] h-[64px]" />
          <div className="text-sm text-black">
            <p className="font-medium">Hotel Name Here</p>
            <p>Location Here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingWeatherHotelCard;
