let lineChart;
let map;
let stackedAreaChart;
let worldData;
let investmentData;
let scatterAnimation

let promises = [
    d3.json("data/world.geo.json"),
    d3.csv("data/fossilfuelEmissions.csv"),
    d3.csv("data/crops.csv"),
    d3.csv("data/renewableInvestment.csv")
];

Promise.all(promises)
    .then( function(data){ main(data) })
    .catch( function (err){console.log(err)} );

function main(data){
    console.log(data)
    lineChart = new LineChart("linechartinyourarea",data[1])
    map = new WorldMap("MapSite",data[0],data[2])
    stackedAreaChart = new StackedAreaChart('stackedAreaChart', data[3])
    scatterAnimation = new LineAnimation('lineAnimation', data[1])
}


