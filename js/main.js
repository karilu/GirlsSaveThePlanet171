let lineChart;
let map;
let worldData;

d3.json("data/world.geo.json").then(data=>{
    worldData = data;
    console.log(data)
})

console.log(worldData)

d3.csv("data/fossilfuelEmissions.csv").then(data=>{
    console.log(data);
    lineChart = new LineChart("linechartinyourare",data)
});

d3.csv("data/crops.csv").then(data=>{
    console.log(data);
    map = new WorldMap("MapSite",worldData,data)
});

