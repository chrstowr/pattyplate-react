import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";
import Container from 'reactstrap/lib/Container';


const LocationMap = (props) => {

    const [locationData, updateLocationData] = useState([]);
    useEffect(() => {
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS);
        props.history.forEach(point => {
            const address = point.address + ", " + point.city + ", " + point.state + ", " + point.zip;
            console.log("Resolving address: " + address);
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


    const mapStyles = {
        height: "400px",
        width: "400px"
    };

    const defaultCenter = {
        lat: 29.422237479297216, lng: -98.48144546720194
    }

    return (
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS}>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={9}
                    center={defaultCenter}>
                    {
                        locationData.map((item, i) => {
                            return (
                                <Marker key={i} position={item} />
                            )
                        })
                    }
                </GoogleMap>
            </LoadScript>
    )
}

export default LocationMap;