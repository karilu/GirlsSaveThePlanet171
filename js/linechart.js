class LineChart {

    constructor(parentElement,data) {
        this.parentElement = parentElement
        this.data = data
        this.displayData = data

        this.initvis()
    }

    initvis(){
        let vis = this

        vis.margin = {top: 40, right: 40, bottom: 60, left: 130};
        //the dynamic sizing wasn't working so I hard coded it in the meantime
        vis.width = $('#' + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = 300 - vis.margin.top - vis.margin.bottom;

        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        vis.path = vis.svg.append("path").attr("stroke", "steelblue")
            .attr("fill", "none")
            .attr("stroke-width", 1.5);

        vis.x = d3.scaleTime()
            .range([0,vis.width])

        vis.y = d3.scaleLinear()
            .range([vis.height, 0]);

        vis.yAxis = d3.axisLeft().scale(vis.y);
        vis.yAxisGroup = vis.svg.append("g").attr("class", "y-axis axis");
        vis.xAxis = d3.axisBottom().scale(vis.x);
        vis.xAxisGroup = vis.svg.append("g")
            .attr("class", "x-axis axis").attr("transform", "translate(0," + vis.height + ")");

        this.wrangledata()
    }

    wrangledata(){
        let vis = this

        vis.sorted = []
        vis.final = []

        vis.displayData.forEach( d => {
            let p = d.Year;
            if (!vis.sorted[p]){vis.sorted[p] = []}
            vis.sorted[p].push(d);
        })

        vis.sorted.forEach(d => {
            let c = d.map(d => d.Total);
            let b = c.reduce((a,b) => parseInt(a) + parseInt(b),0)
            vis.final.push([d[0].Year, b])
        })

        this.updatevis()
    }

    updatevis(){
        let vis = this

        vis.ymin = d3.min(vis.final, d=>d[1]);
        vis.ymax = d3.max(vis.final, d=>d[1]);

        vis.x.domain([d3.min(vis.final, d=>d[0]),d3.max(vis.final, d=>d[0])])
        vis.y.domain([vis.ymin/2,vis.ymax + vis.ymax/5]);

        vis.path.data([vis.final])
            .attr("d", d3.line().x(d => vis.x(d[0]))
                .y(d => vis.y(d[1])));

        vis.svg.select(".y-axis").call(vis.yAxis);
        vis.svg.select(".x-axis").call(vis.xAxis);

    }
}