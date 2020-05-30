import React from 'react';
import { Container, Navbar, Row, Col } from 'react-bootstrap';

const Info = ()=>{
    return(
        <React.Fragment>
            <Navbar bg="dark" expand="lg" variant="dark" className="mb-2">
                <Navbar.Brand href="#home">O</Navbar.Brand>                
            </Navbar> 
            <Container>
                <Row className='d-flex justify-content-center'>
                    <Col>
                        <img width='100%' src='https://i.ibb.co/nsHYB8s/Quienes-somos-04.jpg'></img>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Info;