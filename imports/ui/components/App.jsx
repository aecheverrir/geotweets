import React, { Component } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { mapGenerator } from "../../world-110m";

class App extends Component {

    constructor() {
        super()
        this.state = {
            worlddata: [],
            tweets: [
                { name: "Tokyo", coordinates: [139.6917, 35.6895], tweetNumber: 37843 },
                { name: "Jakarta", coordinates: [106.8650, -6.1751], tweetNumber: 30539 },
                { name: "Delhi", coordinates: [77.1025, 28.7041], tweetNumber: 24998 },
                { name: "Manila", coordinates: [120.9842, 14.5995], tweetNumber: 24123 },
                { name: "Seoul", coordinates: [126.9780, 37.5665], tweetNumber: 23480 },
                { name: "Shanghai", coordinates: [121.4737, 31.2304], tweetNumber: 23416 },
                { name: "Karachi", coordinates: [67.0099, 24.8615], tweetNumber: 22123 },
                { name: "Beijing", coordinates: [116.4074, 39.9042], tweetNumber: 21009 },
                { name: "New York", coordinates: [-74.0059, 40.7128], tweetNumber: 20630 },
                { name: "Guangzhou", coordinates: [113.2644, 23.1291], tweetNumber: 20597 },
                { name: "Sao Paulo", coordinates: [-46.6333, -23.5505], tweetNumber: 20365 },
                { name: "Mexico City", coordinates: [-99.1332, 19.4326], tweetNumber: 20063 },
                { name: "Mumbai", coordinates: [72.8777, 19.0760], tweetNumber: 17712 },
                { name: "Osaka", coordinates: [135.5022, 34.6937], tweetNumber: 17444 },
                { name: "Moscow", coordinates: [37.6173, 55.7558], tweetNumber: 16170 },
                { name: "Dhaka", coordinates: [90.4125, 23.8103], tweetNumber: 15669 },
                { name: "Greater Cairo", coordinates: [31.2357, 30.0444], tweetNumber: 15600 },
                { name: "Los Angeles", coordinates: [-118.2437, 34.0522], tweetNumber: 15058 },
                { name: "Bangkok", coordinates: [100.5018, 13.7563], tweetNumber: 14998 },
                { name: "Kolkata", coordinates: [88.3639, 22.5726], tweetNumber: 14667 },
                { name: "Buenos Aires", coordinates: [-58.3816, -34.6037], tweetNumber: 14122 },
                { name: "Tehran", coordinates: [51.3890, 35.6892], tweetNumber: 13532 },
                { name: "Istanbul", coordinates: [28.9784, 41.0082], tweetNumber: 13287 },
                { name: "Lagos", coordinates: [3.3792, 6.5244], tweetNumber: 13123 },
                { name: "Shenzhen", coordinates: [114.0579, 22.5431], tweetNumber: 12084 },
                { name: "Rio de Janeiro", coordinates: [-43.1729, -22.9068], tweetNumber: 11727 },
                { name: "Kinshasa", coordinates: [15.2663, -4.4419], tweetNumber: 11587 },
                { name: "Tianjin", coordinates: [117.3616, 39.3434], tweetNumber: 10920 },
                { name: "Paris", coordinates: [2.3522, 48.8566], tweetNumber: 10858 },
                { name: "Lima", coordinates: [-77.0428, -12.0464], tweetNumber: 10750 },
                { name: "ciudad", coordinates: [-105.64453124999999, 31.653381399664], tweetNumber: 12340 },
                { name: "ciudad", coordinates: [-72.421875, 7.885147283424331], tweetNumber: 20000 },
                { name: "ciudad", coordinates: [-48.8671875, -7.362466865535738], tweetNumber: 20001 },
                { name: "ciudad", coordinates: [-63.80859374999999, -27.994401411046148], tweetNumber: 20002 },
                { name: "ciudad", coordinates: [-83.3203125, 36.31512514748051], tweetNumber: 20003 },
                { name: "ciudad", coordinates: [79.1015625, 11.178401873711785], tweetNumber: 20004 },
                { name: "ciudad", coordinates: [87.1875, 69.90011762668541], tweetNumber: 20005 },
                { name: "ciudad", coordinates: [-129.0234375, 62.2679226294176], tweetNumber: 20005  },
                { name: "ciudad", coordinates: [87.1875, 66.79190947341796], tweetNumber: 20006 },
                { name: "ciudad", coordinates: [87.5390625, 63.23362741232569], tweetNumber: 20007 },
                { name: "ciudad", coordinates: [87.1875, 59.17592824927136], tweetNumber: 20008 },
                { name: "ciudad", coordinates: [79.8046875, 62.2679226294176], tweetNumber: 20008 },
                { name: "ciudad", coordinates: [95.97656249999999, 62.2679226294176], tweetNumber: 20008  },
                { name: "ciudad", coordinates: [87.36328125, 65.44000165965534], tweetNumber: 20009 }
            ],
        }

        this.handleCountryClick = this.handleCountryClick.bind(this)
        this.handleMarkerClick = this.handleMarkerClick.bind(this)
    }
    projection() {
        return geoMercator()
            .scale(100)
            .translate([800 / 2, 450 / 2])
    }
    handleCountryClick(countryIndex) {
        console.log("Pais Seleccionado <Coordenadas>: ", this.state.worlddata[countryIndex])
    }
    handleMarkerClick(i) {
        alert("Marcador seleccionado: " + this.state.tweets[i].name + " - #Tweets = " + this.state.tweets[i].tweetNumber)
    }
    componentDidMount() {
        let worlddata = mapGenerator();
        console.log(worlddata);
        this.setState({
            worlddata: feature(worlddata, worlddata.objects.countries).features,
        })
    }


    render() {
        return (
            <div className='App'>

                <svg width={800} height={450} viewBox="0 0 800 450">
                    <g className="countries">
                        {
                            this.state.worlddata.map((d, i) => (
                                <path
                                    key={`path-${i}`}
                                    d={geoPath().projection(this.projection())(d)}
                                    className="country"
                                    fill={`rgb(0,132,180)`}
                                    stroke="#FFFFFF"
                                    strokeWidth={0.5}
                                    onClick={() => this.handleCountryClick(i)}
                                />
                            ))
                        }
                    </g>
                    <g className="markers">
                        {
                            this.state.tweets.map((tweet, i) => (
                                <circle
                                    key={`marker-${i}`}
                                    cx={this.projection()(tweet.coordinates)[0]}
                                    cy={this.projection()(tweet.coordinates)[1]}
                                    r={tweet.tweetNumber/5000}
                                    fill={`rgb(255,30,${tweet.tweetNumber / 30000})`}
                                    stroke="#FFFFFF"
                                    className="marker"
                                    onClick={() => this.handleMarkerClick(i)}
                                />
                            ))
                        }
                    </g>
                </svg>

            </div>
        );
    }
}

export default App;

