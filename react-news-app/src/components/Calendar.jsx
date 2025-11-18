import React, { useState } from 'react'
import './Calendar.css'

const Calendar = () => {
  // Weekday and month labels used for rendering
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  // Today's real date (used for highlighting current day)
  const currentDate = new Date()

  // Track the month & year currently being displayed
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // Total number of days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Day of the week the month starts on (0 = Sunday)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();


  {/*console.log(currentMonth, currentYear, daysInMonth, firstDayOfMonth)*/ }


  // Go to previous month (if January → go to December and reduce year)
  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
  }

  // Go to next month (if December → go to January and increase year)
  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
  }

  return (
    <div className='calendar'>
      {/* Header with month, year and navigation buttons */}
      <div className="navigate-date">
        <h2 className="month">{monthsOfYear[currentMonth]}</h2>
        <h2 className="year">{currentYear}</h2>
        <div className="buttons">
          <i className="bx bx-chevron-left" onClick={prevMonth}></i>
          <i className="bx bx-chevron-right" onClick={nextMonth}></i>
        </div>
      </div>

      {/* Display weekday names */}
      <div className="weekdays">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="days">
        {/* Empty boxes before the 1st day */}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <span key={`empty-${i}`}></span>
        ))}

        {/* Actual days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const dayNumber = i + 1;
          const isToday =
            dayNumber === currentDate.getDate() &&
            currentMonth === currentDate.getMonth() &&
            currentYear === currentDate.getFullYear();

          return (
            <span key={dayNumber} className={isToday ? 'current-day' : ''}>
              {dayNumber}
            </span>
          );
        })}
      </div>

    </div>
  )
}

export default Calendar