
const API = 'http://optibus-interview.herokuapp.com/';

async function buildDataset() {
    let response = await fetch(API);
    let data = await response.json();
    let buckets = [];
    let minStartTime = Math.min(...data.map(d => Date.parse(d.startTime)));
    data.forEach(d => {
        let index = Math.floor((Date.parse(d.startTime) - minStartTime) / 3600000);
        let durationInHours = (Date.parse(d.endTime) - Date.parse(d.startTime)) / 3600000;
        while (durationInHours >= 0) {
            if (!buckets[ index ]) {
                buckets[ index ] = { date: index, value: 1 };
            } else {
                buckets[ index ].value++;
            }
            durationInHours--;
            index++
        }
    });
    for (let i = 0; i < buckets.length; i++) {
        if (!buckets[ i ]) {
            buckets[ i ] = {date: i, value: 0};
        }    
    }
    return { dataset: buckets, minStartTime: minStartTime };
}

export default buildDataset;