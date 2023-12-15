import './ContributionDate.css'

interface contributionDateProps extends React.PropsWithChildren{
    contributionCount: number,
    date: Date
}

export const ContributionDate = (props: contributionDateProps) => {
    let colorClassName = "";

    if(props.contributionCount === 0){
        colorClassName = "zero-count";
    }
    else if(props.contributionCount < 10){
        colorClassName = "one-bigger-count";
    }
    else if(props.contributionCount < 20){
        colorClassName = "ten-bigger-count";
    }
    else if(props.contributionCount < 30){
        colorClassName = "twenty-bigger-count";
    }
    else{
        colorClassName = "thirty-bigger-count";
    }


    return <span className={`tooltip ${colorClassName}`}>
        <span className='tooltiptext'>
            <p className='tooltip-contribution'>{props.contributionCount.toString()} Contributions</p>
            <p className='tooltip-date'>{props.date.toLocaleDateString("ru-RU", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })}</p>
            </span> 
        </span>
};