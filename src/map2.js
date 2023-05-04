import * as d3 from 'd3'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoieXR0ZW4iLCJhIjoiY2xoMW03bXMzMTRreTNzcWhvMDZjbngxeSJ9.zqejo9sD3BqcxLbnKkB5yg';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v11',
    projection: 'winkelTripel',
    center: [-45, 0],
    zoom: 0.25
});

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

function filterBy(month) {
    const filters = ['==', 'month', month];
    map.setFilter('earthquake-circles', filters);
    map.setFilter('earthquake-labels', filters);

    // Set the label to the month
    document.getElementById('month').textContent = months[month];
}

map.on('load', () => {
    // Data courtesy of http://earthquake.usgs.gov/
    // Query for significant earthquakes in 2015 URL request looked like this:
    // http://earthquake.usgs.gov/fdsnws/event/1/query
    //    ?format=geojson
    //    &starttime=2015-01-01
    //    &endtime=2015-12-31
    //    &minmagnitude=6'
    //
    // Here we're using d3 to help us make the ajax request but you can use
    // Any request method (library or otherwise) you wish.
    d3.json(
        'https://docs.mapbox.com/mapbox-gl-js/assets/significant-earthquakes-2015.geojson',
        jsonCallback
    );
});

function jsonCallback(err, data) {
    if (err) {
        throw err;
    }

    // Create a month property value based on time
    // used to filter against.
    data.features = data.features.map((d) => {
        d.properties.month = new Date(d.properties.time).getMonth();
        return d;
    });

    map.addSource('earthquakes', {
        'type': 'geojson',
        data: data
    });

    map.addLayer({
        'id': 'earthquake-circles',
        'type': 'circle',
        'source': 'earthquakes',
        'paint': {
            'circle-color': [
                'interpolate',
                ['linear'],
                ['get', 'mag'],
                6,
                '#FCA107',
                8,
                '#7F3121'
            ],
            'circle-opacity': 0.75,
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['get', 'mag'],
                6,
                20,
                8,
                40
            ]
        }
    });

    map.addLayer({
        'id': 'earthquake-labels',
        'type': 'symbol',
        'source': 'earthquakes',
        'layout': {
            'text-field': ['concat', ['to-string', ['get', 'mag']], 'm'],
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 12
        },
        'paint': {
            'text-color': 'rgba(0,0,0,0.5)'
        }
    });

    // Set filter to first month of the year
    // 0 = January
    filterBy(0);

    document.getElementById('slider').addEventListener('input', (e) => {
        const month = parseInt(e.target.value, 10);
        filterBy(month);
    });
}

