
class WorldMap {
    constructor(parentElement,geoData,visData) {
        this.parentElement = parentElement
        this.geo = geoData
        this.data = visData

        this.initvis()
    }

    initvis(){
        let vis = this

        console.log("map")
        console.log(this.geo)

        L.Icon.Default.imagePath = 'img/images/';

        vis.map = L.map(vis.parentElement).setView([30,0], 2);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(vis.map);

      // L.geoJson(vis.geo).addTo(vis.map);

        vis.wrangledata()
    }

    wrangledata(){
        let vis = this

        vis.updatevis()
    }

    updatevis(){
        let vis = this
    }
}