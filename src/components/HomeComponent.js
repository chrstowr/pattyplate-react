import React from 'react';
import Map from './LocationMapComponent';
import { HISTORY } from '../shared/history';
import { Container, Row, Col } from 'reactstrap';

function Home(props) {

    return (
        <Container>
            <Row className="mt-5 mb-5">
                <Col>
                    <Map history={HISTORY} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <div />
                </Col>
            </Row>
        </Container>
    );
}

export default Home;