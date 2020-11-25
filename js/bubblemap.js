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

        vis.margin = {top: 40, right: 40, bottom: 60, left: 60};
        //the dynamic sizing wasn't working so I hard coded it in the meantime
        vis.width = $('#' + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $('#' + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // svg drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

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
