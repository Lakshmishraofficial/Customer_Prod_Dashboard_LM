import React from 'react'; 
 
interface Holiday { 
  name: string; 
  date: string; 
} 
 
interface HolidayCardProps { 
  holiday: Holiday; 
} 
 
const HolidayCard: React.FC<HolidayCardProps> = ({ holiday }) => { 
  return ( 
    <div className="rounded-lg overflow-hidden shadow-md bg-dark-2 text-light-1"> 
      <div className="p-4 flex items-center flex-col"> 
        <h2 className="sm:text-heading2-bold font-semibold">{holiday.name}</h2> 
        <p className="text-gray-500">{holiday.date}</p> 
      </div> 
    </div> 
  ); 
}; 
 
export default HolidayCard;