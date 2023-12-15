export const getMonths = (fromDate:Date, toDate:Date) => {
    const fromYear = fromDate.getFullYear();
    const fromMonth = fromDate.getMonth();
    const toYear = toDate.getFullYear();
    const toMonth = toDate.getMonth();
    const months = [];

    for(let year = fromYear; year <= toYear; year++) {
        let monthNum = year === fromYear ? fromMonth : 0;
        const monthLimit = year === toYear ? toMonth : 11;

        for(; monthNum <= monthLimit; monthNum++) {
            let month = monthNum + 1;
            months.push({ year, month });
        }
    }
    return months;
}