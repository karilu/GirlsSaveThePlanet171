let margin = {top: 40, right: 40, bottom: 40, left: 40};
        //the dynamic sizing wasn't working so I hard coded it in the meantime
let width = 660 - margin.left - margin.right;
let height = 600 - margin.top - margin.bottom;
let innerRadius = 100;
let outerRadius = Math.min(width, height)/1.6

// draw svg area
let svg = d3.select('#bubbleMap').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + ( height/2+140 )+ ")");

// Year parser
let formatDate = d3.timeFormat("%Y");
let parseDate = d3.timeParse("%Y");
let x;
let y;
let selectValue;
let data;

// Initialize data
loadData();

// Load CSV file
function loadData() {
    d3.csv("data/energyconsumption.csv").then(function(csv) {

        csv.forEach(function(d){
            // Convert string to 'date object'
            d.year = parseDate(d.year);

            // Convert numeric values to 'numbers'

            d.coal_consumption_EJ = +d.coal_consumption_EJ;
            d.gas_consumption_EJ = +d.gas_consumption_EJ;
            d.geo_biomass_other_TWh = +d.geo_biomass_other_TWh;
            d.hydro_generation_TWh = +d.hydro_generation_TWh;
            d.nuclear_generation_TWh = +d.nuclear_generation_TWh;
            d.oil_consumption_EJ = +d.oil_consumption_EJ;
            d.solar_generation_TWh = +d.solar_generation_TWh;
            d.wind_generation_TWh = +d.wind_generation_TWh;
        });

        // Store csv data in global variable
        data = csv;
        console.log(data);
            
        // define x scale 
        x = d3.scaleBand()
            .range([0, 2 * Math.PI])
            .align(0)

        // define y scale
        y = d3.scaleRadial()
            .range([innerRadius, outerRadius])

        // Draw the visualization for the first time
        updateVisualization();
    });
}


function updateVisualization() {
    // define select value as what's chosen
    selectValue = d3.select("#data-type").property("value");
    console.log(selectValue);

    // set year
    const time = document.getElementById("year").value;

    //return filtered data
    let filteredData = data.filter(function (d) {
        return formatDate(d.year) === time
    });
    // sort by continent
    function Comparator(a, b) {
        if (a.continent < b.continent) return 1;
        if (a.continent < b.continent) return -1;
        return 0;
    }
    filteredData = filteredData.sort(Comparator);
    // filteredData.continent.sort()
    console.log(filteredData);

    // update scales
    x.domain(filteredData.map(function(d) {return d.country;}));
    y.domain([0, d3.max(filteredData, d =>d[selectValue])]);
        
    // define bubblegraph 
    let bubbleGraph = svg.selectAll(".path")
        .data(filteredData)

        bubbleGraph.enter()
        .append("path")
            .attr("class", "path")
        // need to add merge to make exit and remove work
        .merge(bubbleGraph)
        .attr("fill", "#69b3a2")
        .attr("d", d3.arc()     // imagine your doing a part of a donut plot
            .innerRadius(innerRadius)
            .outerRadius(function(d) { return y(d[selectValue]); })
            .startAngle(function(d) { return x(d.country); })
            .endAngle(function(d) { return x(d.country) + x.bandwidth(); }) // make sure every country takes the same angle
            .padAngle(0.01)
            .padRadius(innerRadius))

    let bubbleText = svg.selectAll(".label")
        .data(filteredData)

        bubbleText.enter()
        .append("g")
            .attr("class", "label")
        .merge(bubbleText)
        // anchor the texts right outside of their slices
        .attr("text-anchor", function(d) { return (x(d.country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.country) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d[selectValue])+10) + ",0)"; })
        .append("text")
        .text(function(d){return(d.country)})
        .attr("transform", function(d) { return (x(d.country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")
        
// change graph everytime when new selections are made
    bubbleGraph.exit().remove();
    bubbleText.exit().remove();

}
