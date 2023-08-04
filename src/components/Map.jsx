import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import icon from "./constants";

const Map = ({ userLocation }) => {
  return (
    <div className="container mt-4">
      <MapContainer
        center={userLocation}
        zoom={5}
        style={{ height: "50vh", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && (
          <Marker position={userLocation} icon={icon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
