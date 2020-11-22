let lineChart;
let map;
let worldData;

let promises = [
    d3.json("data/world.geo.json"),
    d3.csv("data/fossilfuelEmissions.csv"),
    d3.csv("data/crops.csv")

];

Promise.all(promises)
    .then( function(data){ main(data) })
    .catch( function (err){console.log(err)} );

function main(data){
    console.log(data)
    lineChart = new LineChart("linechartinyourare",data[1])
    map = new WorldMap("MapSite",data[0],data[2])
}


