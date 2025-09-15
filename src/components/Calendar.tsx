import { FunctionComponent } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";
import "./calendar.scss";

const Calendar: FunctionComponent = () => {
    const currentMonth = new Date(2025, 7, 1);
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });

    const days = eachDayOfInterval({ start, end });

    const weekDays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                {weekDays.map((day) => (
                    <div key={day} className="calendar-block header">
                        {day}
                    </div>
                ))}
            </div>
            <div className="calendar-grid">
                {days.map((day) => (
                    <div key={day.toString()} className="calendar-block day">
                        <span className="date">{format(day, "d")}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
