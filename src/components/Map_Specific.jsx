import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import location_tag from "../assets/loc1.svg";

export default function MapView({ latitude, longitude }) {
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude], // Starting position
      zoom: 12,
    });

    map.on("load", () => {
      const start = [longitude, latitude];

      // Example for getting route (you can adjust `end` coordinates as needed)
      async function getRoute(end) {
        const query = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
        );
        const json = await query.json();
        const data = json.routes[0];
        const route = data.geometry.coordinates;

        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        };

        if (map.getSource("route")) {
          map.getSource("route").setData(geojson);
        } else {
          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: geojson,
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "green",
              "line-width": 5,
              "line-opacity": 1,
            },
          });
        }

        // Place the SVG at the start point of the route
        const img = new Image();
        img.onload = () => {
          map.addImage("custom-icon", img);

          // Add marker for start point
          map.addLayer({
            id: "point",
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Point",
                      coordinates: start, // Starting point
                    },
                  },
                ],
              },
            },
            layout: {
              "icon-image": "custom-icon",
              "icon-size": 0.3,
              "icon-allow-overlap": true,
            },
            paint: {
              "circle-radius": 10,
              "circle-color": "blue",
            },
          });

          // Add marker for end point
          const endPoint = route[route.length -1]; // Last point in the route
          map.addLayer({
            id: "symbol-layer-end",
            type: "symbol",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Point",
                      coordinates: endPoint, // End point
                    },
                  },
                ],
              },
            },
            layout: {
              "icon-image": "custom-icon",
              "icon-size": 0.3,
              "icon-allow-overlap": true,
            },
          });
        };
        img.src = location_tag; // Use the imported asset here
      }

      // Example destination
      const end = [longitude + 0.01, latitude + 0.01];
      getRoute(end);
    });

    return () => map.remove(); // Cleanup on component unmount
  }, [latitude, longitude]);

  return <div id="map" className="flex flex-col mt-12 " style={{ width: "", height: "500px" }} />;
}
