import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";

function GetIngredientCategories(ingredients) {
  let categories = [];

  ingredients.forEach(element => {
    if (!categories.some(c => c.type === element.type)) {
      categories.push({ type: element.type, header: element.header, li: [] });
    }
  });

  categories.forEach(i => {
    i.li = ingredients.filter(e => e.type === i.type);
  });

  return categories;
}

function Menu(props) {
  const FullMenu = props.menu.map((i, key) => {
    return (
      <Col key={key + 300}>
        <div className="menu-item-header">
          {i.name} - (${i.price})
        </div>
        <div className="menu-item-desc">
          {i.subtext}
        </div>
      </Col>
    );
  });

  const BuilderOptionCategories = GetIngredientCategories(props.ingredients);
  const BuilderOptions = (
    <Row>
      {BuilderOptionCategories.map((o, catKey) => {
        return (
          <Col key={catKey + 200}>
            <h4>
              {o.header}
            </h4>
            <ul>
              {o.li.map(l => {
                return (
                  <li key={l.id}>
                    {l.name}
                  </li>
                );
              })}
            </ul>
          </Col>
        );
      })}
    </Row>
  );

  return (
    <div>
      <Button color="success">
        <Link className="text-light" to="/burgerbuilder">
          Burger Builder
        </Link>
      </Button>
      <h3>All-time Favorites</h3>
      <Row md="3">
        {FullMenu}
      </Row>
      <h3>Build your own burger</h3>
      {BuilderOptions}
    </div>
  );
}

export default Menu;
