import React, { useState } from 'react';

import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from '@deck.gl/layers';

// Initial viewport settings
const initialViewState = {
  longitude: 139.051,
  latitude: 35.493,
  zoom: 14,
  pitch: 0,
  bearing: 0
};


export default function Map() {
  const [points, setPoints] = useState([]);

  const handleMapClick = event => {
    setPoints([...points, { coordinates: event.lngLat }]);
  };

  return (
    <>
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        onClick={handleMapClick}
        style={{
          top: 0,
          height: "100vh",
          width: "100vw",
          position: "fixed",
          zIndex: 0
        }}
      >
        <StaticMap mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} />
        <ScatterplotLayer
          id="points"
          data={points}
          opacity={0.8}
          radiusMinPixels={5}
          radiusMaxPixels={50}
          getPosition={d => d.coordinates}
          getRadius={d => 10}
          getFillColor={d => [255, 140, 0]}
        />
      </DeckGL>
      <div style={{
        zIndex: 1,
        position: "absolute",
        top: "100px",
        left: "200px",
      }}> Hello, world! </div>
    </>
  );
}
