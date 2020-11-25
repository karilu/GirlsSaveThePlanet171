class Bubblemap{
    constructor(parentElement,data){
        this.parentElement = parentElement
        this.data = data
        this.displayData = [];

        let colors = ['#AA4839', '#AA7239', '#265B6A', '#2A7E43', '#582B73', '#882D63','#7EA136', '#ACAB39']

        this.initvis()
    }

    initvis(){
        let vis = this

        vis.margin = {top: 40, right: 40, bottom: 40, left: 40};
        //the dynamic sizing wasn't working so I hard coded it in the meantime
        vis.width = $('#' + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $('#' + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;
        vis.innerRadius = 100;
        vis.outerRadius = Math.min(vis.width, vis.height)/2

        console.log(vis.data)


        // svg drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.width / 2 + "," + ( vis.height/2+100 )+ ")");

        // Xscale
        vis.x = d3.scaleBand()
            .range([0, 2 * Math.PI])
            .align(0)
            .domain(vis.data.map(function(d) {return d.Entity;}))

        //Yscale
        vis.y = d3.scaleRadial()
            .range([vis.innerRadius, vis.outerRadius])
            .domain([0, 10000]);

        //Add bars
        vis.svg.append("g")
            .selectAll("path")
            .data(vis.data)
            .enter()
            .append("path")
                .attr("fill", "#69b3a2") // subject to change later
                .attr("d", d3.arc()
                    .innerRadius(vis.innerRadius)
                    .outerRadius(function(d) { return vis.y(d['Value']); })// subject to change later
                    .startAngle(function(d) { return vis.x(d.Entity); })
                    .endAngle(function(d) { return vis.x(d.Entity) + vis.x.bandwidth(); })
                    .padAngle(0.01)
                    .padRadius(vis.innerRadius));

        //Add the labels
        vis.svg.append("g")
            .selectAll("g")
            .data(vis.data)
            .enter()
            .append("g")
            .attr("text-anchor", function(d) { return (vis.x(d.Entity) + vis.x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((vis.x(d.Entity) + vis.x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (vis.y(d['Value'])+10) + ",0)"; })
            .append("text")
            .text(function(d){return(d.Entity)})
            .attr("transform", function(d) { return (vis.x(d.Entity) + vis.x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "11px")
            .attr("alignment-baseline", "middle")

        vis.wrangleData();
    }

    wrangleData(){
        let vis = this;


        vis.updateVis();
    }

    updateVis(){
        let vis = this;

    }
}
