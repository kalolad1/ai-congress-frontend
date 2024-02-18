"use client"

import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const people = [
  {
    name: "Eddie Zhang", coordinates: [-90.1193, 40.4897]
  },
]

function MapChart () {
  return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{
        scale: 800,
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#EAEAEC"
              stroke="#D6D6DA"
            />
          ))
        }
      </Geographies>
      {people.map(({ name, coordinates }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={8} fill="#3498db" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            y={-15}
            style={{ fill: "#5D5A6D", fontSize: "12px" }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default MapChart;
