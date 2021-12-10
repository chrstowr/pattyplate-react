import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card, CardHeader, CardImg, CardBody, Row, Col } from 'reactstrap';

function currencyFormat(number) {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return formatter.format(number);
}

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
    while ((selectQuantity - 1) >= 0) {
        selectState.push(false);
        selectQuantity--;
    }

    return selectState;
}

function BurgerBuilder(props) {
    // State for ingredient data
    const [ingredientState, updateIngredientState] = React.useState(GetIngredientByCategory(props.ingredients));
    // State for card selections
    const [selectState, toggleSelect] = React.useState(CreateSelectState(ingredientState));
    // State for order summary
    const [orderState, updateOrder] = React.useState([]);
    // State to track subtotal of order
    const [subtotal, updateSubtotal] = React.useState(0);

    // Update subtotal when order is updated
    useEffect(() => {
        const newSubtotal = orderState.reduce((sum, curr) => { return (curr.price + sum); }, 0);
        updateSubtotal(newSubtotal);

    }, [orderState]);

    const handleParentToggle = (obj) => {
        let newSelectState = [...selectState];
        newSelectState[obj.index] = !newSelectState[obj.index];
        toggleSelect([...newSelectState]);

        //send update to order state
        if (orderState.filter(i => i.id === obj.id).length < 1) {
            updateOrder(curr => [...curr, obj]);
        } else {
            let newOrderState = [...orderState];
            let indexToRemove = newOrderState.indexOf(obj);
            newOrderState.splice(indexToRemove, 1);
            updateOrder(newOrderState);
        }
    }

    //useEffect(() => console.log("OrderState: " + JSON.stringify(orderState)), [orderState])

    const RenderBuildersByCategory = (cat) => {
        let builders = null;
        ingredientState.forEach(i => {
            if (i.type === cat) {
                builders = i.li.map(j => {
                    return (
                        <Col key={j.index} col="2">
                            <Card className={`mb-2 builder-item-parent ${selectState[j.index] ? "builder-selected" : ""}`} onClick={() => handleParentToggle(j)}>
                                <CardImg top width="100%" height="auto" src='./shared/assets/images/bb_placeholder_crop.png' alt="placeholder.png" />
                                <CardBody>
                                    <div>
                                        {j.name}
                                        <br/>
                                        +{currencyFormat(j.price)}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    );
                })
            }
        })

        return builders;
    }

    const RenderOrderSummary = () => {
        return (
            <Col key={99} >
                <Card className="order-summary-parent">
                    <CardHeader>Your Order:</CardHeader>
                    <CardBody>
                        {
                            orderState.map((i, index) => {
                                return (
                                    <div key={index} >
                                        1x  {i.name}    {currencyFormat(i.price)}
                                    </div>
                                )
                            })
                        }
                        <br />
                        <div>
                            <div>
                                Subtotal: {currencyFormat(subtotal)}
                            </div>
                            <div>
                                Tax: {currencyFormat(subtotal * .0825)}
                            </div>
                            <div>
                                Total: {currencyFormat(subtotal * 1.0825)}
                            </div>
                        </div>

                    </CardBody>
                </Card>
            </Col>
        );
    }


    return (
        <Container>
            <Button color="success">
                <Link className="text-light" to="/menu">Full Menu</Link>
            </Button>
            <h3>Buns</h3>
            <Row sm="2" className="mb-4">
                {RenderBuildersByCategory("bun")}
            </Row>
            <h3>Patties</h3>
            <Row className="mb-4">
                {RenderBuildersByCategory("patty")}
            </Row>
            <h3>Cheese</h3>
            <Row className="mb-4">
                {RenderBuildersByCategory("cheese")}
            </Row>
            <h3>Condiments</h3>
            <Row className="mb-4">
                {RenderBuildersByCategory("condiment")}
            </Row>
            <h3>Toppings </h3>
            <Row className="mb-5">
                {RenderBuildersByCategory("topping")}
            </Row>
            <Row className="mb-5">
                {RenderOrderSummary()}
            </Row>

        </Container>
    );
}

export default BurgerBuilder;