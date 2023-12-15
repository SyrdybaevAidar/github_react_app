import format from 'date-fns/format'
import addDays from 'date-fns/addDays'
import startOfWeek from 'date-fns/startOfWeek'
import isMonday from 'date-fns/isMonday';
import isTuesday from 'date-fns/isTuesday'
import isWednesday from 'date-fns/isWednesday'
import isThursday from 'date-fns/isThursday'
import isFriday from 'date-fns/isFriday'
import isSaturday from 'date-fns/isSaturday'
import isSunday from 'date-fns/isSunday'
import { ContributionDate } from './ContributionDate';
import { getMonths } from './Common';
import "./Panel.css";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const mounths = ["Янв.", "Фев.", "Март", "Апр.", "Май.", "Июнь", "Июль", "Авг.", "Сент.", "Окт.", "Ноя.", "Дек."];

let result = await fetch("https://dpg.gg/test/calendar.json");
let json = await result.json();

let currentDate = new Date();
let firstDate = addDays(currentDate, -357);
let firstDateOfWeek = startOfWeek(firstDate, { weekStartsOn: 1 });
let datesByWeekDays: Array<Array<Date>> = [[], [], [], [], [], [], []];
let allFirstDaysMounths = getMonths(firstDateOfWeek, currentDate);
console.log(allFirstDaysMounths);

[...Array(357).keys()].forEach(element => {
    let iterationDate = addDays(firstDateOfWeek, element);
    if (isMonday(iterationDate)) {
        datesByWeekDays[0].push(iterationDate);
    } else if (isTuesday(iterationDate)) {
        datesByWeekDays[1].push(iterationDate);
    }
    else if (isWednesday(iterationDate)) {
        datesByWeekDays[2].push(iterationDate);
    }
    else if (isThursday(iterationDate)) {
        datesByWeekDays[3].push(iterationDate);
    }
    else if (isFriday(iterationDate)) {
        datesByWeekDays[4].push(iterationDate);
    }
    else if (isSaturday(iterationDate)) {
        datesByWeekDays[5].push(iterationDate);
    }
    else if (isSunday(iterationDate)) {
        datesByWeekDays[6].push(iterationDate);
    }
});

const convertDateByComponent = (dates: Date[]) => {
    return dates.map(date => {
        const contributionCount = json[format(date, "yyyy-MM-dd")] ?? 0;
        return <ContributionDate contributionCount={contributionCount} date={date} />
    })
}

export const Panel = () => {

    return <div className='container'>
        <div className='month-container'>
            {allFirstDaysMounths.map(it => <span className='month'>{mounths[it.month-1]}</span>)}
        </div>
        <div className="contribution-container">
            <div className='week-container'>
                {weekDays.map(it => <span>{it}</span>)}
            </div>
            <div className='panel-container'>
                {convertDateByComponent(datesByWeekDays[0])}
                {convertDateByComponent(datesByWeekDays[1])}
                {convertDateByComponent(datesByWeekDays[2])}
                {convertDateByComponent(datesByWeekDays[3])}
                {convertDateByComponent(datesByWeekDays[4])}
                {convertDateByComponent(datesByWeekDays[5])}
                {convertDateByComponent(datesByWeekDays[6])}
            </div>
        </div>
        <div className="contribution-rate-container">
            <span>меньше</span>
            <div className='contribution-rate'>
                <span className={`tooltip zero-count`}>
                    <span className='tooltiptext'>
                        No contributions
                    </span>
                </span>
                <span className={`tooltip one-bigger-count`}>
                    <span className='tooltiptext'>
                        1-9 contributions
                    </span>
                </span>
                <span className={`tooltip ten-bigger-count`}>
                    <span className='tooltiptext'>
                        10-19 contributions
                    </span>
                </span>
                <span className={`tooltip twenty-bigger-count`}>
                    <span className='tooltiptext'>
                        20-29 contributions
                    </span>
                </span>
                <span className={`tooltip thirty-bigger-count`}>
                    <span className='tooltiptext'>
                        30+ contributions
                    </span>
                </span>
            </div>
            <span>больше</span>
        </div>
    </div>
};
