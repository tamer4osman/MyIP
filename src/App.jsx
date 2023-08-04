import React, { useState, useEffect } from "react";
import IpAddress from "./components/IpAddress";
import Map from "./components/Map";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { DateTime } from "luxon";

function App() {
  const [ipAddressData, setIpAddressData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userCountryFlag, setUserCountryFlag] = useState(null);
  const [userCountryName, setUserCountryName] = useState(null);
  const [localDateTime, setLocalDateTime] = useState(null);

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get(
          `https://geo.ipify.org/api/v1?apiKey=${
            import.meta.env.VITE_REACT_APP_IPIFY_API_KEY
          }`
        );
        const data = response.data;
        setIpAddressData(data);
        setUserLocation([data.location.lat, data.location.lng]);
        fetchCountryFlag(data.location.country);
        const timezoneOffsetMinutes = data.location.timezone_offset;
        const localDateTime = DateTime.now().plus({
          minutes: timezoneOffsetMinutes,
        });
        setLocalDateTime(localDateTime);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    const fetchCountryFlag = async (countryCode) => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3/alpha/${countryCode}`
        );
        const data = response.data[0];
        console.log(data);
        setUserCountryFlag(data.flags[1]);
        setUserCountryName(data.name.official);
      } catch (error) {
        console.error("Error fetching country flag:", error);
      }
    };

    fetchIpAddress();
  }, []);

  return (
    <div className="container mt-4">
      <div className="my-4">
        <div className="card">
          <div className="card-body">
            <h1>IP Address Information</h1>
            <IpAddress
              ipAddressData={ipAddressData}
              userCountryFlag={userCountryFlag}
              userCountryName={userCountryName}
            />
            {localDateTime && (
              <div>
                <h2 className="card-title">Your Local Date and Time</h2>
                <p className="card-text">
                  Date: {localDateTime.toFormat("yyyy-MM-dd")}
                </p>
                <p className="card-text">
                  Time: {localDateTime.toFormat("HH:mm:ss")}
                </p>
              </div>
            )}
            <div className="my-4">
              {userLocation && <Map userLocation={userLocation} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
