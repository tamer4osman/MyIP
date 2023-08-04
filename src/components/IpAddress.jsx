import React from "react";

const IpAddress = ({ ipAddressData, userCountryFlag, userCountryName }) => {
  return (
    <div>
      {ipAddressData ? (
        <div className="container mt-4">
          <h2>Your IP Address: {ipAddressData.ip}</h2>
          {userCountryFlag && <img src={userCountryFlag} alt="Country Flag" />}
          
          <p>Country: {userCountryName}</p>
          <p>City: {ipAddressData.location.city}</p>
          <p>
            Geolocation: {ipAddressData.location.lat},{" "}
            {ipAddressData.location.lng}
          </p>
        </div>
      ) : (
        <p>Loading IP address information...</p>
      )}
    </div>
  );
};

export default IpAddress;
