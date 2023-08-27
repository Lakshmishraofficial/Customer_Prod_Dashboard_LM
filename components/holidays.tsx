'use client' 
import React, { useEffect, useState } from 'react'; 
import HolidayCard from './cards/HolidayCard'; 
import { fetchAllHolidays } from "@/lib/actions/user.actions"; 
 
interface Holiday { 
  name: string; 
  date: string; 
} 
 
const HolidaysPage: React.FC = () => { 
  const [upcomingHoliday, setUpcomingHoliday] = useState<Holiday | null>(null); 
  const [showAllHolidays, setShowAllHolidays] = useState(false); 
  const [allHolidays, setAllHolidays] = useState<Holiday[]>([]); 
 
  useEffect(() => { 
    // Fetch the upcoming holiday data when the component mounts 
    async function fetchUpcomingHoliday() { 
      try { 
        const holidays = await fetchAllHolidays(); 
        const today = new Date(); 
        const currentMonth = today.getMonth() + 1; 
        const currentDay = today.getDate(); 
 
        const upcomingHolidays = holidays.filter(holiday => { 
          const holidayDate = new Date(holiday.date); 
          const holidayMonth = holidayDate.getMonth() + 1; 
          const holidayDay = holidayDate.getDate(); 
 
          return holidayMonth === currentMonth && (holidayDay >= currentDay); 
        }); 
 
        upcomingHolidays.sort((a: Holiday, b: Holiday) => { 
          const dateA = new Date(a.date).getTime(); 
          const dateB = new Date(b.date).getTime(); 
          return dateA - dateB; 
        }); 
 
        const allOtherHolidays = holidays.filter(holiday => { 
          const holidayDate = new Date(holiday.date); 
          const holidayMonth = holidayDate.getMonth() + 1; 
          return holidayMonth !== currentMonth; 
        }); 
 
        setUpcomingHoliday(upcomingHolidays.length > 0 ? upcomingHolidays[0] : null); 
        setAllHolidays(allOtherHolidays); 
      } catch (error) { 
        console.error('Error fetching holidays:', error); 
      } 
    } 
 
    fetchUpcomingHoliday(); 
  }, []); 
 
  const handleToggleShowAllHolidays = () => { 
    setShowAllHolidays(!showAllHolidays); 
  }; 
 
  return ( 
    <div className="flex flex-col justify-center items-center h-1/2 rounded-xl bg-dark-2 text-light-1"> 
      <div className="flex items-center w-full justify-between p-5"> 
        <h1 className="sm:text-heading4-bold font-semibold sm:text-base text-xs">Upcoming Holiday</h1> 
        <button className="text-indigo-400 underline" onClick={handleToggleShowAllHolidays}> 
          View All Holidays 
        </button> 
      </div> 
      <div className="max-w-md p-6 space-y-4 flex items-center justify-center"> 
        {upcomingHoliday && !showAllHolidays ? ( 
          <HolidayCard holiday={upcomingHoliday} /> 
        ) : ( 
          <div className='flex flex-col justify-center text-center'> 
            <p>No upcoming holidays this month.</p> 
            {showAllHolidays && ( 
              <div className="mt-10"> 
              <p className="underline m-5">List Of Holidays</p>
                {allHolidays.map(holiday => ( 
                  <HolidayCard key={holiday.date} holiday={holiday} /> 
                ))} 
              </div>     
            )} 
          </div> 
        )} 
      </div> 
    </div> 
  ); 
}; 
 
export default HolidaysPage;