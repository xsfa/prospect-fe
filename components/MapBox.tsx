import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { createPortal } from 'react-dom/cjs/react-dom.development';
import { useEffect, useState } from 'react';
import styles from 'components/map.module.css'
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
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

        // get events from supabase db
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
        var events = [];
        var features = []


        supabase.from('events')
            .select('title, desc, creator, location, time_start, time_end, longitude, latitude')
            .then(({ data, error }) => {
            console.log(data);
            console.log(error);
            
            // create array of data
            for (var i = 0; i < data.length; i++) {
                events.push(data[i]);
            }
        }).then(() => {
            for (var i = 0; i < events.length; i++) {
                var event = events[i];

                var feature_title = event.title;
                var feature_desc = event.desc;
                var feature_creator = event.creator;
                var feature_long = event.longitude;
                var feature_lat = event.latitude;

                var feature = {
                    'type': 'Feature',
                    'properties': {
                        'description': `<strong>${feature_title}</strong><p>${feature_desc}</p>`,
                        'icon': 'theatre'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [feature_long, feature_lat]
                    }
                };

                features.push(feature);
            }
            console.log(features);
        });
        
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ -122.305138, 47.655466],
            zoom: 9
        });

        map.on('load', function() {
            map.addSource('places', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': features
                }
            }).addLayer({
                'id': 'places',
                'type': 'symbol',
                'source': 'places',
                'layout': {
                    'icon-image': '{icon}-15',
                    'icon-allow-overlap': true,
                    'icon-size': 3
                }
            });

        // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        map.on('click', 'places', function(e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup( { className : styles.popup })
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map)

            // set popup style

        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'places', function() {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'places', function() {
            map.getCanvas().style.cursor = '';
        });
        });
    }, []);

    // render map absolute
    return (
        <div>
            <div id="map" className={styles.map}></div>
        </div>
    );
}

export default MapBox;
