import format from 'date-fns/format'
import addDays from 'date-fns/addDays'
import startOfWeek from 'date-fns/startOfWeek'
import "./Panel.css";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const mounths = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль","Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

let result = await fetch("https://dpg.gg/test/calendar.json");
let json = await result.json();
console.log(json);

var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

var currentDate = new Date();
var firstDate = addDays(currentDate, -357);
var firstDateOfWeek = startOfWeek(firstDate, { weekStartsOn: 1 });
export const Panel = () => {
    
    return <div className='panel-container'>
        {[...Array(357).keys()].map((value) => {
        let iterationDate = addDays(firstDateOfWeek, value);
        let contributionCount = json[format(iterationDate, "yyyy-MM-dd")] === undefined ? 0 : json[format(iterationDate, "yyyy-MM-dd")];

        return <span className='tooltip'>
                    <span className='tooltiptext'>
                        <p className='tooltip-contribution'>{contributionCount} Contributions</p>
                        <p className='tooltip-date'>{iterationDate.toLocaleDateString("ru-RU", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}</p>
                        </span> 
               </span>;})}
    </div>
};
