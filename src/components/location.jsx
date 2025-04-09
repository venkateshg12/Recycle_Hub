import React, { useState, useEffect } from "react";
import MapView from "./Map_Specific";

function CurrentLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError("Geolocation access denied or unavailable");
          console.error(err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      {location ? (
        <MapView latitude={location.latitude} longitude={location.longitude} />
      ) : (
        <p>{error || "Loading current location..."}</p>
      )}
    </div>
  );
}

export default CurrentLocation;
