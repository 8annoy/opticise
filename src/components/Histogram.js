import React from "react";
import moment from 'moment';

var LineChart = require("react-chartjs").Line;

const Histogram = (props) => {
    if (!props.data.dataset) {
        return <div></div>;
    }
    let labels = props.data.dataset.map(d => moment(props.data.minStartTime).add(d.date, 'hours').format('DD.MM.YY - h a'));
    let datasetData = props.data.dataset.map(d => d.value);
    return (
    <LineChart data={{
        labels: labels,
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: datasetData
            },
        ]
    }} options={{
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        bezierCurve: false,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 5,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        offsetGridLines: true
    }} width="800" height="450" />
);}

export default Histogram;
