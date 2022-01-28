import React from "react";
import {
  GoogleMap,
  LoadScript,
  // Marker,
  Circle,
  // InfoBox,
  // InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 56.9566376,
  lng: 24.119435,
};

const options = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  clickable: true,
  draggable: false,
  editable: false,
  // visible: true,
  // radius: 30000,
  // zIndex: 1,
};

export default function Map({ latlng }) {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {/* Child components, such as markers, info windows, etc. */}
        {latlng.map((item, index) => {
          const position = {
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
          };
          return (
            <div key={index}>
              <Circle
                center={position}
                radius={50}
                options={options}
                onMouseOver={(e) => {
                  return console.log(item.price);
                }}
              />
            </div>
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
}
