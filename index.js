// Data from: https://data.giss.nasa.gov/gistemp/

document.addEventListener('DOMContentLoaded', () => {

    async function chartIt(){
        const data = await getData();

        let ctx = document.getElementById('chart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.xValues,
                datasets: [{
                    label: 'Global Average Temperature',
                    data: data.yValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 2,
                    fill: false
                }]
            }
        });
    }

    chartIt();
})



async function getData(){
    const resp = await fetch("./nasa_data.csv", { mode: "no-cors" });
    const data = await resp.text();
    const table = data.split('\n').slice(2);

    let xValues = [];
    let yValues = [];

    table.forEach(row => {
        const columns = row.split(',');
        const year = columns[0];
        xValues.push(year);
        const temp = columns[1];
        yValues.push(parseFloat(temp) + 14);
    })

    return { xValues, yValues };
}