import React from "react";
import ReactLoading from "react-loading";
import Container from "reactstrap/lib/Container";

export const Loading = props => {
  return (
    <Container className="loader-container">
      <div className="loader">
        <ReactLoading
          type={props.type ? props.type : "balls"}
          color={props.color ? props.color : "#084C61"}
          height={props.height ? props.height : 300}
          width={props.width ? props.width : 175}
        />
      </div>
    </Container>
  );
};
