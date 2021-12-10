import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Geocode from "react-geocode";


const Map = (props) => {

    const mapStyles = {
        height: "400px",
        width: "auto"
    };

    const defaultCenter = {
        lat: 29.422237479297216, lng: -98.48144546720194
    }


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS
    });

    const [locationData, updateLocationData] = useState([]);
    useEffect(() => {
        //Flush location state
        updateLocationData([]);
        // Resolve addresses to lat/lng for use in map
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS);
        props.history.forEach(point => {
            const address = point.address + ", " + point.city + ", " + point.state + ", " + point.zip;
            //console.log("Resolving address: " + address);
            return Geocode.fromAddress(address).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    updateLocationData(current => [...current, { lat, lng }]);
                    console.log(`Adding: {${lat}, ${lng}}`);
                },
                (error) => {
                    console.error(error);
                }
            )
        });
    }, [props.history])


    if(props.historyIsLoading || props.errMess) 
        return <div/>;

    return isLoaded ? (
        <GoogleMap
            className="mx-auto"
            mapContainerStyle={mapStyles}
            zoom={9}
            center={defaultCenter}>
            {
                locationData.map((item) => {
                    let i = locationData.indexOf(item);
                    return (
                        <Marker key={i} position={item} label={props.bounce[i] ? null : `${i}`} animation={props.bounce[i] ? 1 : 0}/>
                    )
                })
            }
        </GoogleMap>
    ) : <div/>
}

export default Map;