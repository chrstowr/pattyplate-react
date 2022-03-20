import React from "react";
import { baseUrl } from "../shared/baseUrl"

function About() {
  return (
    <div>
      <img style={styles.img} src={baseUrl + "images/business-owner.webp"} alt="logo" />
      <p style={styles.text}>
        Established in 2021, Torres Burger Co. has been serving incredible
        grilled patty burgers for the San Antonio Area. With fresh ingredients,
        popular toppings and condiments, and streamlined experience. It has
        never been easier to order your favorite burger of choice. This family
        owned business owes it's success to the many generous patrons of San
        antonio. From my family to yours, thank you for the incredible reviews
        and feedback. We will see you at the next stop!
      </p>
    </div>
  );
}

const styles = {
  text: {
    fontSize: 22,
    marginTop: "20px",
    maxWidth: "800px",
    width: "90vw",
  },
  img: {
    maxWidth: "500px",
    width: "90vw",
    height: "auto",
    objectFit: "contain",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  }
};

export default About;
