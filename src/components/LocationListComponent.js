import React from 'react';
import { Row, Col, Container, Card, CardBody } from 'reactstrap';

function LocationList(props) {

    const historyList = props.history.map(i => {
        return (
            <Card className="mx-auto" onClick={}>
                <Container>
                <Row>
                    <Col xs="2" className="mx-auto my-auto" style={{backgroundColor: 'yellow'}}>
                        1
                    </Col>
                    <Col xs="10" >
                        <CardBody>
                            <div>{i.title}</div>
                            <address>{i.address}<br /> {i.city}, {i.state} {i.zip}</address>
                            <div>On {i.date}</div>
                            <div> @ {i.hours}</div>
                        </CardBody>
                    </Col>
                </Row>
                </Container>
            </Card>
        );
    });

    return (
        <>
            {historyList}
        </>
    );
}

export default LocationList;