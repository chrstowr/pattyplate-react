import React from "react";
import LocationList from "./LocationListComponent";
import Map from "./MapComponent";
import Menu from "./MenuComponent";
import { Loading } from "./LoadingComponent";
import RequestStop from "./RequestStopComponent";
import About from "./AboutComponent";
import { baseUrl } from "../shared/baseUrl";

import logo from "../images/TBC-Logo.svg";

function Home(props) {
  const [bounceState, updateBounceState] = React.useState(
    props.history.map(i => {
      return false;
    })
  );

  const handleCardClick = index => {
    // Create a fully false state to prevent multiple markers from bouncing
    let freshState = bounceState.map(i => false);
    freshState[index] = !bounceState[index];
    updateBounceState([...freshState]);
  };

  const NavBar = ({ style }) => {
    return (
      <div className={style}>
        <a href="#sec1">Menu</a>
        <a href="#sec2">Where are we?</a>
        <a href="#sec3">Request a stop</a>
        <a href="#sec4">About Us</a>
      </div>
    );
  };

  const Logo = () => {
    return <img className="logo" src={logo} alt="logo" />;
  };

  return props.historyLoading && props.menuLoading && props.ingredientLoading
    ? <Loading />
    : <div className="home-container">
        <section className="section-0" style={styles.section0background}>
          <div>
          </div>
        </section>
        <section id="sec1" className="section-1 menu-svg">
          <div className="container">
            <Menu
              menu={props.menu}
              menuIsLoading={props.menuLoading}
              menuErrMess={props.menuFailed}
              ingredient={props.ingredient}
              ingredientIsLoading={props.ingredientLoading}
              ingredientErrMess={props.ingredientFailed}
            />
          </div>
        </section>
        <section id="sec2" className="section-2 req-stop-svg">
            <Map
              history={props.history}
              historyIsLoading={props.historyLoading}
              errMess={props.historyFailed}
            />
        </section>
        <section id="sec3" className="section-3">
          <div>
            <h1>Request a stop</h1>
            <RequestStop />
          </div>
        </section>
        <section id="sec4" className="section-4">
          <div>
            <About />
          </div>
        </section>
      </div>;
}

const styles = {
  section0background: {
    backgroundImage: `url(${baseUrl + "images/burger.webp"})`,
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  }
};

export default Home;
