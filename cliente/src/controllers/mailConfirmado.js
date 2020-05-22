import React from 'react';
import { Row, Container, Card, Col, Navbar } from 'react-bootstrap';

const MailConfirmado = ()=>{
    return(
        <React.Fragment>
            <Navbar bg="dark" expand="lg" variant="dark" className="mb-2">
                <Navbar.Brand href="#home">O</Navbar.Brand>                
            </Navbar>
            <Container className='mt-5'>
                <Row>
                    <Col>
                        <Card className='rounded-0'>
                            <Card.Body>
                                <Card.Title>
                                    Hemos validado tu email correctamente.
                                </Card.Title>
                                <Card.Text>
                                    Tu cuenta ya se encuentra activada para ingresar.
                                </Card.Text>
                                <a className='btn btn-primary rounded-0' href='/#login'>
                                    Ir al login
                                </a>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default MailConfirmado;