import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { createPortal } from 'react-dom/cjs/react-dom.development';
import { useEffect, useState } from 'react';
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');


// var curr_lat = 0;
// var curr_long = 0;

// // get current coordinates
// function getCoordinates() {
//     navigator.geolocation.getCurrentPosition(function(position) {
//         console.log(position.coords.latitude);
//         console.log(position.coords.longitude);

//         curr_lat = position.coords.latitude;
//         curr_long = position.coords.longitude;
//     });
// }

// getCoordinates();

function MapBox() {
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoidGVzZmFzIiwiYSI6ImNsOWttbDVkeTA4b200MGxpNG55N3J2ZDcifQ.YA4R-iT5UrhLEURMqILmHg'

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ -122.305138, 47.655466],
            zoom: 9
        });

        // map.on('load', function() {
        //     map.addSource('places', {
        //         'type': 'geojson',
        //         'data': {
        //             'type': 'FeatureCollection',
        //             'features': [
        //                 {
        //                     'type': 'Feature',
        //                     'properties': {
        //                         'description':
        //                             '<strong>Mapbox DC</strong><p>Our DC office is located in the heart of Dupont Circle.</p>',
        //                         'icon': 'theatre'
        //                     },
        //                     'geometry': {
        //                         'type': 'Point',
        //                         'coordinates': [-77.031706, 38.914581]
        //                     }
        //                 },
                        
        //             ]
        //         }
        //     });
        // });
        // map.addLayer({
        //     'id': 'places',
        //     'type': 'symbol',
        //     'source': 'places',
        //     'layout': {
        //         'icon-image': '{icon}-15',
        //         'icon-allow-overlap': true
        //     }
        // });

        // // When a click event occurs on a feature in the places layer, open a popup at the
        // // location of the feature, with description HTML from its properties.
        // map.on('click', 'places', function(e) {
        //     var coordinates = e.features[0].geometry.coordinates.slice();
        //     var description = e.features[0].properties.description;

        //     // Ensure that if the map is zoomed out such that multiple
        //     // copies of the feature are visible, the popup appears
        //     // over the copy being pointed to.
        //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //     }

        //     new mapboxgl.Popup()
        //         .setLngLat(coordinates)
        //         .setHTML(description)
        //         .addTo(map);
        // });

        // // Change the cursor to a pointer when the mouse is over the places layer.
        // map.on('mouseenter', 'places', function() {
        //     map.getCanvas().style.cursor = 'pointer';
        // });

        // // Change it back to a pointer when it leaves.
        // map.on('mouseleave', 'places', function() {
        //     map.getCanvas().style.cursor = '';
        // });
    }, []);

    // render map
    return (
        <div>
            <div id="map" style={{ width: '100%', height: '100vh' }}></div>
        </div>
    );
}

export default MapBox;