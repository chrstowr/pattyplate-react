import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Geocode from "react-geocode";
import truck_icon from "../images/food-truck.png";

const red_marker = "https://maps.google.com/mapfiles/ms/icons/red.png";

const Map = props => {
  const defaultCenter = {
    lat: 29.422237479297216,
    lng: -98.48144546720194
  };

  const defaultOptions = {
    zoomControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    gestureHandling: "none",
    
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS
  });

  const [locationData, updateLocationData] = useState([]);
  useEffect(
    () => {
      //console.log(props.history);

      // Resolve addresses to lat/lng for use in map
      Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS);
      props.history.forEach(point => {
        const address =
          point.address +
          ", " +
          point.city +
          ", " +
          point.state +
          ", " +
          point.zip;
        //console.log("Resolving address: " + address);
        //Flush location state
        updateLocationData([]);
        Geocode.fromAddress(address).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            updateLocationData(current => [
              ...current,
              { id: point.id, position: { lat, lng } }
            ]);
            //console.log(`Adding: {${lat}, ${lng}}`);
          },
          error => {
            console.error(error);
          }
        );
      });
    },
    [props.history]
  );

  if (props.historyIsLoading || props.errMess) return <div />;

  return isLoaded
    ? <GoogleMap
        className="mx-auto"
        mapContainerClassName="map"
        zoom={9}
        center={defaultCenter}
        options={defaultOptions}
      >
        {locationData.map(item => {
          let i = locationData.indexOf(item);
          return (
            <Marker
              key={i}
              icon={item.id === 0 ? truck_icon : red_marker}
              position={item.position}
              animation={props.bounce[i] ? 1 : 0}
            />
          );
        })}
      </GoogleMap>
    : <div />;
};

export default Map;
