'use client'
import React from 'react'; 
import { useTheme } from "../../app/themes/themeContext"
interface Holiday { 
  name: string; 
  date: string; 
} 
 
interface HolidayCardProps { 
  holiday: Holiday; 
} 
 
const HolidayCard: React.FC<HolidayCardProps> = ({ holiday }) => { 
  const { isDarkMode } = useTheme();
  return ( 
    <div className={isDarkMode?"rounded-lg overflow-hidden shadow-md bg-dark-2 text-light-1":"rounded-lg overflow-hidden shadow-md bg-light-2 text-dark-1"}> 
      <div className="p-4 flex items-center flex-col"> 
        <h2 className="sm:text-heading2-bold font-semibold">{holiday.name}</h2> 
        <p className="text-gray-500">{holiday.date}</p> 
      </div> 
    </div> 
  ); 
}; 
 
export default HolidayCard;