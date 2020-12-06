//this is the second visualization and focused on global carbon emissions
//I wasn't sure what to call it

class LineAnimation {

    constructor(parentElement,data) {
        this.parentElement = parentElement;
        this.data = data
        this.displayData = [];

        this.initvis()
    }

    initvis(){
        let vis = this;

        vis.margin = {top: 30, right: 30, bottom: 40, left: 70};
        vis.width = 500 - vis.margin.left - vis.margin.right;
        vis.height = 400 - vis.margin.top - vis.margin.bottom;

        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        vis.x = d3.scaleLinear()
            .range([0,vis.width])

        vis.y = d3.scaleLinear()
            .range([vis.height, 0]);

        vis.listofYears = []

        vis.data.forEach(d => {
            let year = d.Year;
            if (vis.listofYears.includes(year)=== false){
                vis.listofYears.push(year)
            }
        })

        vis.listofContent = ['Total','Solid Fuel','Liquid Fuel','Gas Fuel','Cement']

        vis.currentYear = vis.listofYears[Math.floor(Math.random() * vis.listofYears.length)];
        vis.currentX = vis.listofContent[Math.floor(Math.random() * vis.listofContent.length)];
        vis.currentY= vis.listofContent[Math.floor(Math.random() * vis.listofContent.length)];;

        vis.yAxisGroup = vis.svg.append("g").attr("class", "y-axis axis");
        vis.xAxisGroup = vis.svg.append("g").attr("class", "x-axis axis");

        vis.tooltip = d3.select("#" + vis.parentElement).append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        vis.svg.append("text")
            .attr("id", "y-axis-title")
            .attr("x", 10)
            .attr("y", -15)
            .attr("dy", ".1em")
            .style("text-anchor", "end")
            .text(vis.currentY);

        vis.svg.append("text")
            .attr("id", "x-axis-title")
            .attr("x", vis.width/2 + 50)
            .attr("y", vis.height + 30)
            .attr("dy", ".1em")
            .style("text-anchor", "end")
            .text(vis.currentX);

        console.log("CURRENT YEAR")
        console.log(vis.currentYear)

        vis.wrangledata()
    }

    wrangledata(){
        let vis = this;

        vis.listofCountries = [];
        vis.displayData = [];

        vis.yearRevelantData = vis.data.filter(a =>  a.Year === vis.currentYear)

        console.log(vis.yearRevelantData)

        vis.yearRevelantData.forEach(d => {
            let country = d.Country;
            if (vis.listofCountries.includes(country)=== false){
                vis.listofCountries.push(country)
            }
        })

        vis.listofCountries.forEach( d =>
        {
            let instances = vis.yearRevelantData.filter(a =>  a.Country === d)
            let country = {
                name: d,
                instances: instances
            }
            vis.displayData.push(country)
        })

        console.log(vis.displayData)


        vis.updatevis()
    }

    updatevis(){
        let vis = this;

        vis.svg.select("#y-axis-title").remove();
        vis.svg.select("#x-axis-title").remove();

        console.log(vis.displayData)
        console.log(vis.currentX)
        console.log(vis.currentY)

        vis.ymin = d3.min(vis.displayData, d=>d.instances[0][vis.currentY]);
        vis.ymax = d3.max(vis.displayData, d=>d.instances[0][vis.currentY]);

        vis.xmin = d3.min(vis.displayData, d=>d.instances[0][vis.currentX]);
        vis.xmax = d3.max(vis.displayData, d=>d.instances[0][vis.currentX]);

        vis.y.domain([vis.ymin,vis.ymax]);
        vis.x.domain([vis.xmin,vis.xmax]);

        let tipMouseover = function(d,event) {
            let html  = '<b>'+ d.name + ' ' + vis.currentYear + '</b>' + "<br/>" +
                vis.currentY + ': ' + d.instances[0][vis.currentY] + "<br/>" +  vis.currentX + ': ' + d.instances[0][vis.currentX];
            console.log(html)
            vis.tooltip.html(html)
                .style("left", (event.pageX - 210) + "px")
                .style("top", (event.pageY - 130) + "px")
                .transition()
                .duration(200) // ms
                .style("opacity", .9) // started as 0!

        };
        // tooltip mouseout event handler
        let tipMouseout = function() {
            vis.tooltip.transition()
                .duration(300) // ms
                .style("opacity", 0); // don't care about position!
        };

        let circles = vis.svg.selectAll("circle")
            .data(vis.displayData)

        circles.enter()
            .append("circle")
            .merge(circles)
            .attr("r", 5)
            .style("fill", "#69b3a2")
            .on("mouseover", (event,d) => {tipMouseover(d,event)})
            .on("mouseout", tipMouseout)
            .transition(800)
            .attr("cx", d => vis.x(d.instances[0][vis.currentX]))
            .attr("cy", d => vis.y(d.instances[0][vis.currentY]));

        circles.exit().remove();

        vis.yAxis = d3.axisLeft().scale(vis.y);
        vis.xAxis = d3.axisBottom().scale(vis.x);
        vis.svg.select(".y-axis").transition(800).call(vis.yAxis);
        vis.svg.select(".x-axis").attr("transform", "translate(0," + vis.height + ")").transition(800).call(vis.xAxis);

        vis.svg.append("text")
            .attr("id", "y-axis-title")
            .attr("x", 10)
            .attr("y", -15)
            .attr("dy", ".1em")
            .style("text-anchor", "end")
            .text(vis.currentY);

        vis.svg.append("text")
            .attr("id", "x-axis-title")
            .attr("x", vis.width/2 + 50)
            .attr("y", vis.height + 30)
            .attr("dy", ".1em")
            .style("text-anchor", "end")
            .text(vis.currentX);

    }

    changedX(changed){
        let vis = this;

        vis.currentX = changed

        vis.updatevis()
    }

    changedY(changed){
        let vis = this;

        vis.currentY = changed

        vis.updatevis()
    }

    changedYear(changed){
        let vis = this;

        vis.currentYear = changed.toString()

        console.log(vis.currentYear)

        vis.wrangledata()
    }
}