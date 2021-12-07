import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card, CardHeader, CardImg, CardBody, Row, Col } from 'reactstrap';

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

    // Add an index that is used to track select state
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
    const [selectState, toggleSelect] = React.useState(CreateSelectState(ingredientState));
    const [orderState, updateOrder] = React.useState([]);

    const handleParentToggle = (obj) => {
        let newSelectState = [...selectState];
        newSelectState[obj.index] = !newSelectState[obj.index];
        toggleSelect([...newSelectState]);

        //send update to order state
        if(orderState.filter(i => i.id === obj.id).length < 1){
            console.log("Add");
            updateOrder(curr => [...curr, obj]);
        }else{
            console.log("Remove");
            let newOrderState = [...orderState];
            let indexToRemove = newOrderState.indexOf(obj);
            newOrderState.splice(indexToRemove, 1);
            updateOrder(newOrderState);
        }
    }

    useEffect(() => console.log("OrderState: " + JSON.stringify(orderState)), [orderState])

      {/*className="square-placeholder"*/}
    function RenderBuildersByCategory(cat, selectState) {
        let builders = null;
        ingredientState.forEach(i => {
            if (i.type === cat) {
                builders = i.li.map(j => {
                    return (
                        <Col key={j.index} >
                            <Card className={`builder-item-parent ${selectState[j.index] ? "builder-selected" : ""}`} onClick={() => handleParentToggle(j)}>
                                <CardImg src='./shared/assets/images/bb_placeholder.png' alt="placeholder.png" />
                                <CardBody>
                                    <div>
                                        {j.name}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>);
                })
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
                <Col key={99} >
                    <Card className="builder-item-parent">
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