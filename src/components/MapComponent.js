import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Geocode from "react-geocode";
import truck_icon from "../images/food-truck.png";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill
} from "react-icons/bs";
import { Loading } from "./LoadingComponent";


const red_marker = "https://maps.google.com/mapfiles/ms/icons/red.png";

const ListItems = ({ history, historyIsLoading, errMess }) => {
  if (historyIsLoading) {
    return <div />;
  }

  if (history) {
    return history.map(i => {
      return (
        <li key={"location-list-" + i.id}>
          <Card className="ll-card">
            <CardBody className="ll-card-body">
              <CardTitle className="ll-card-title">
                {i.title}
              </CardTitle>
              <CardText className="ll-card-text">
                {i.address + "\n" + i.city + ", " + i.state + " " + i.zip}
              </CardText>
              <CardText className="ll-card-text">
                {"Date: " + i.date}
              </CardText>
              <CardText className="ll-card-text">
                {"Hours: " + i.hours}
              </CardText>
            </CardBody>
          </Card>
        </li>
      );
    });
  }
};

const LocationList = props => {
  const scrollRef = useRef();
  const isScrollRef = useRef();
  const scrollScale = 100;
  const [bounceState, setBounce] = useState(0);

  const setMove = scrollState => {
    isScrollRef.current = scrollState;
  };

  const moveLeft = () => {
    if (isScrollRef.current) {
      scrollRef.current.scrollLeft += scrollScale;
      requestAnimationFrame(moveLeft);
    }
  };

  const moveRight = () => {
    if (isScrollRef.current) {
      scrollRef.current.scrollLeft -= scrollScale;
      requestAnimationFrame(moveRight);
    }
  };

  return (
    <div className="location-list-container">
      <button
        className="prev"
        onMouseDown={() => {
          setMove(true);
          moveRight();
        }}
        onMouseUp={() => setMove(false)}
        onContextMenu={e => e.preventDefault()}
      >
        <BsFillArrowLeftSquareFill />
      </button>
      <ul ref={scrollRef}>
        <ListItems
          history={props.history}
          historyIsLoading={props.historyLoading}
          errMess={props.historyFailed}
        />
      </ul>
      <button
        className="next"
        onMouseDown={() => {
          setMove(true);
          moveLeft();
        }}
        onMouseUp={() => setMove(false)}
        onContextMenu={e => e.preventDefault()}
      >
        <BsFillArrowRightSquareFill />
      </button>
    </div>
  );
};

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
    gestureHandling: "none"
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
    ? <div
        style={{
          width: "100vw",
          maxWidth: "750px",
          position: "relative",
          boxShadow: "0px 0px 8px 0px #888888"
        }}
      >
        <div>
          <GoogleMap
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
        </div>
        <LocationList props={props} />
      </div>
    : <Loading />;
};

export default Map;
