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

        vis.margin = {top: 40, right: 40, bottom: 60, left: 80};
        //the dynamic sizing wasn't working so I hard coded it in the meantime
        vis.width = 400 - vis.margin.left - vis.margin.right;
        vis.height = 400 - vis.margin.top - vis.margin.bottom;

        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g").attr('id',"lineaninationg")
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

        vis.yAxis = d3.axisLeft().scale(vis.y);
        vis.yAxisGroup = vis.svg.append("g").attr("class", "y-axis axis");
        vis.xAxis = d3.axisBottom().scale(vis.x);
        vis.xAxisGroup = vis.svg.append("g")
            .attr("class", "x-axis axis").attr("transform", "translate(0," + vis.height + ")");


        vis.wrangledata()
    }

    wrangledata(){
        let vis = this;

        vis.listofCountries = [];
        vis.displayData = [];

        vis.datas = vis.data.filter(a =>  a.Year === vis.currentYear)

        vis.datas.forEach(d => {
            let country = d.Country;
            if (vis.listofCountries.includes(country)=== false){
                vis.listofCountries.push(country)
            }
        })

        vis.listofCountries.forEach( d =>
        {
            let instances = vis.datas.filter(a =>  a.Country === d)
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

        vis.ymin = d3.min(vis.displayData, d=>d.instances[0][vis.currentY]);
        vis.ymax = d3.max(vis.displayData, d=>d.instances[0][vis.currentY]);

        vis.xmin = d3.min(vis.displayData, d=>d.instances[0][vis.currentX]);
        vis.xmax = d3.max(vis.displayData, d=>d.instances[0][vis.currentX]);

        vis.y.domain([vis.ymin/2,vis.ymax]);
        vis.x.domain([vis.xmin/2,vis.xmax + vis.xmax/5]);

        let circles = vis.svg.selectAll("circle")
            .data(vis.displayData)

        circles.enter()
            .append("circle")
            .merge(circles)
            .attr("r", 15)
            .style("fill", "#69b3a2")
            .transition(800)
            .attr("cx", d => vis.x(d.instances[0][vis.currentX]) )
            .attr("cy", d => vis.y(d.instances[0][vis.currentY]) )


        circles.exit().remove();

        vis.svg.select(".y-axis").transition(800).call(vis.yAxis);
        vis.svg.select(".x-axis").transition(800).call(vis.xAxis);

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

        vis.currentYear = changed

        vis.wrangledata()
    }
}