import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card, CardImg, CardBody, Row, Col } from 'reactstrap';
import CardHeader from 'reactstrap/lib/CardHeader';

function GetIngredientByCategory(ingredients) {
    let categories = [];
    let catIndex = 0
    let ingredientIndex = 0;

    // Create object for each category
    ingredients.forEach(element => {
        if (!categories.some(c => c.type === element.type)) {
            categories.push({ catIndex: catIndex, type: element.type, header: element.header, li: [] });
            catIndex++;
        }
    });

    // Get items for each category
    categories.forEach(i => {
        i.li = ingredients.filter(e => e.type === i.type);
    });

    // Add state data to track whether an item is selected
    categories.forEach(i => {
        i.li.forEach(j => {
            j['index'] = ingredientIndex;
            ingredientIndex++;
        })
    });

    return categories;
}

function CreateSelectState(iState) {
     let selectQuantity = iState.reduce((sum, curr) => {
        return curr.li.length + sum;
    }, 0);

    let selectState = [];
    while( (selectQuantity - 1) >= 0){
        selectState.push(false);
        selectQuantity--;
    }

    return selectState;
}

function BurgerBuilder(props) {
    const [ingredientState, updateIngredientState] = React.useState(GetIngredientByCategory(props.ingredients));
    const [orderState, updateOrder] = React.useState({});
    const [selectState, toggleSelect] = React.useState(CreateSelectState(ingredientState));

    const handleParentToggle = (obj) => {
        let oldState = [...selectState];
        oldState[obj.index] = !oldState[obj.index];
        toggleSelect([...oldState]);

        //send update to order state
    }


    function RenderBuildersByCategory(cat, selectState) {
        let builders = null;
        ingredientState.forEach(i => {
            if (i.type === cat) {
                builders = i.li.map(j => {
                    return (
                        <Col>
                            <Card key={j.index} className={`builder-item-parent ${selectState[j.index] ? "builder-selected" : ""}`} onClick={() => handleParentToggle(j)}>
                                <CardImg className="square-placeholder" alt="placeholder.png" />
                                <CardBody>
                                    <div>
                                        {j.name}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>);
                })
                console.log(builders);
            }
        })

        return builders;
    }

    return (
        <Container>
            <Button color="success">
                <Link className="text-light" to="/menu">Full Menu</Link>
            </Button>
            <h3>Buns</h3>
            <Row>
                {RenderBuildersByCategory("bun", selectState)}
            </Row>
            <h3>Patties</h3>
            <Row>
                {RenderBuildersByCategory("patty", selectState)}
            </Row>
            <h3>Cheese</h3>
             <Row>
                {RenderBuildersByCategory("cheese", selectState)}
            </Row>
            <h3>Condiments</h3>
            <Row>
                {RenderBuildersByCategory("condiment", selectState)}
            </Row>
            <h3>Toppings </h3>
            <Row>
                {RenderBuildersByCategory("topping", selectState)}
            </Row>
            <Row>
                <Col>
                    <Card key={99} className="builder-item-parent">
                        <CardBody>
                            <CardHeader>Your Order:</CardHeader>
                            <CardBody></CardBody>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
}

export default BurgerBuilder;