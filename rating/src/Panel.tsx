import {useState} from 'react';
import setDayOfYear from 'date-fns/setDayOfYear';
import startOfWeek from 'date-fns/startOfWeek'
import "./Panel.css";
import { Tooltip } from 'react-tooltip';

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const mounths = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль","Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

class mounth{
    days: number[] = [];
    mounth: number = 0;
    year: number = 0;
}

var currentDate = new Date();
var firstDate = setDayOfYear(currentDate, -357);
var firstDateOfWeek = startOfWeek(firstDate);

export const Panel = () => {
    const [isHovered, setIsHovered] = useState("")
    const handleMouseOver = (e: React.MouseEvent) => {
        setIsHovered(e.currentTarget.id)
    }
    
    return <div className='panel-container'>
        {[...Array(357).keys()].map((value) => <span id={value.toString()} onMouseOver={handleMouseOver} onMouseOut={() => setIsHovered("")}>
        {isHovered === value.toString() && value}
        </span>)}
    </div>
};
