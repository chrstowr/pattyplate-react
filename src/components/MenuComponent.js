import React from "react";
import { Card } from "react-bootstrap";
import { baseUrl } from "../shared/baseUrl";
import {
  LazyLoadImage,
  trackWindowScroll
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

function currencyFormat(number) {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  return formatter.format(number);
}

const BuilderCards = ({ ingredients, isLoading, errMess }) => {
  if (!isLoading) {
    console.log(ingredients);
    let categories = [];
    const indexMap = {};
    ingredients.forEach(element => {
      if (!categories.some(c => c.index === element.type.index)) {
        const newCategory = {
          title: element.type.text,
          name: element.type.name,
          image: element.type.image,
          index: element.type.index,
          data: [element]
        };
        categories.push(newCategory);
        indexMap[newCategory.name] = categories.indexOf(newCategory);
      } else {
        const index = indexMap[element.type.name];
        categories[index].data.push(element);
      }
    });

    return categories.map((category, index) => {
      return (
        <Card
          style={{
            width: "70vw",
            maxWidth: "20rem",
            backgroundColor: "#fff",
            border: "1px solid #000"
          }}
          key={category.name + "-card-" + index}
        >
          {/* <Card.Img
            style={{
              width: "100%",
              height: "12em",
              objectFit: "cover",
              objectPosition: "center",
              borderBottom: "1px solid #888"
            }}
            variant="top"
            src={baseUrl + category.image}
          /> */}
          <LazyLoadImage
            src={baseUrl + category.image}
            alt={"image alt"}
            wrapperClassName="Card.Img"
            wrapperProps={{ variant: "top" }}
            effect="opacity"
            delayTime={3000}
            style={{
              width: "100%",
              height: "12em",
              objectFit: "cover",
              objectPosition: "center",
              borderBottom: "1px solid #888"
            }}
          />
          <Card.ImgOverlay
            style={{
              height: "12em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Card.Title
              style={{
                fontSize: "calc(2vw + 2vh)",
                color: "white",
                fontWeight: "bold",
                colorBackground: "rgb(0,0,0,50)",
                textShadow:
                  "-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000,-1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000"
              }}
            >
              {category.name}
            </Card.Title>
          </Card.ImgOverlay>
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              gap: "15px"
            }}
          >
            {category.data.map((d, index) => {
              return (
                <div
                  key={"ingredient-item-" + d.id + "-" + index}
                  style={{ fontSize: "1.25rem", color: "black" }}
                >
                  {d.name} - {currencyFormat(d.price)}
                </div>
              );
            })}
          </Card.Body>
        </Card>
      );
    });
  }

  return <div />;
};

function Menu(props) {
  const FullMenu = props.menu.map((i, key) => {
    return (
      <div
        style={{
          display: "flex",
          padding: 0,
          margin: 0,
          marginBottom: "15px",
          maxWidth: "425px",
          alignItems: "center",
          //border: "1px solid black",
          backgroundColor: "#fff"
        }}
        key={"menu-item-" + key}
      >
        <LazyLoadImage
          src={baseUrl + i.image}
          alt={"image alt"}
          effect="opacity"
          delayTime={3000}
          style={{
            margin: 0,
            padding: 0,
            objectFit: "cover",
            objectPosition: "center",
            maxWidth: "145px",
            width: "auto",
            height: "auto",
            aspectRatio: "1/1"
          }}
        />
        <div style={{ flexDirection: "column", padding: "5px" }}>
          <h3
            style={{ fontSize: "1.2rem", color: "black", fontWeight: "bold" }}
          >
            {i.name} - (${i.price})
          </h3>
          <div style={{ fontSize: "1rem", color: "black" }}>
            {i.subtext}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1 style={{ color: "rgb(255,255,255, 70)", textAlign: "center" }}>
        Menu
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignContent: "flex-start",
          rowGap: "15px",
          width: "100%"
        }}
      >
        {FullMenu}
      </div>
      <h1 style={{ color: "rgb(255,255,255, 70)", textAlign: "center" }}>
        B.Y.O.B
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignContent: "flex-start",
          rowGap: "20px"
        }}
      >
        <BuilderCards
          ingredients={props.ingredient}
          isLoading={props.ingredientIsLoading}
          errMess={props.ingredientErrMess}
        />
      </div>
    </div>
  );
}

export default trackWindowScroll(Menu);
