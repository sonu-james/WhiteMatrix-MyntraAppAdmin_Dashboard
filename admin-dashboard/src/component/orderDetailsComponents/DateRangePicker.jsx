// DateRangePicker.js
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import '../../pages/Orders.css'
const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const startInputRef = useRef(null);
  const endInputRef = useRef(null);

  return (
    <div className="d-flex align-items-center gap-2 date-filter">
      <div className="date-picker-wrapper">
        <input
          type="date"
          className="date-input"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          ref={startInputRef}
        />
        <FontAwesomeIcon
          icon={faCalendarDays}
          className="calendar-icon"
          onClick={() => startInputRef.current?.showPicker?.() || startInputRef.current?.click()}
        />
      </div>
      <span className="mx-1 text-dark">to</span>
      <div className="date-picker-wrapper">
        <input
          type="date"
          className="date-input"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          ref={endInputRef}
        />
        <FontAwesomeIcon
          icon={faCalendarDays}
          className="calendar-icon"
          onClick={() => endInputRef.current?.showPicker?.() || endInputRef.current?.click()}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
