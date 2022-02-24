import React, { useState, useRef } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill
} from "react-icons/bs";
import Map from "./MapComponent";

const ListItems = ({ history, historyIsLoading, errMess }) => {
  if (historyIsLoading) {
    return <div />;
  }

  if (history) {
    return history.map(i => {
      return (
        <li key={"location-list-" + i}>
          <Card>
            <CardBody className="ll-card-body">
              <CardTitle className="ll-card-title">{i.title}</CardTitle>
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
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const [bounceState, setBounce] = useState(0);

  //Slide click
  const slide = shift => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        maxWidth: "750px",
        position: "relative",
        boxShadow: "0px 0px 8px 0px #888888"
      }}
    >
      <div>
        <Map
          history={props.history}
          historyIsLoading={props.historyLoading}
          errMess={props.historyFailed}
          bounce={bounceState}
        />
      </div>
      <div className="location-list-container">
        <button
          className="prev"
          onClick={() => slide(-125)}
          onContextMenu={e => e.preventDefault()}
        >
          <BsFillArrowLeftSquareFill />
        </button>
        <ul ref={scrl} onScroll={scrollCheck}>
          <ListItems
            history={props.history}
            historyIsLoading={props.historyLoading}
            errMess={props.historyFailed}
          />
        </ul>
        <button
          className="next"
          onClick={() => slide(+125)}
          onContextMenu={e => e.preventDefault()}
        >
          <BsFillArrowRightSquareFill />
        </button>
      </div>
    </div>
  );
};

export default LocationList;
