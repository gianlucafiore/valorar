import React from 'react';
import {Container, Row, Form, Col, Card, Navbar, Button} from 'react-bootstrap'; 

const Login = ()=>{
    return(
        <div>
            <Navbar bg="dark" expand="lg" variant="dark" className="mb-2">
                <Navbar.Brand href="#home">O</Navbar.Brand>                
            </Navbar> 
            <Container>
                <Row className="d-flex justify-content-center mt-5">
                    <Col md="6">
                        <Card className="rounded-0">
                            <Card.Body >
                                <Card.Title>
                                    Ingresar
                                </Card.Title>
                                <form>
                                    <Form.Group>
                                        <small>Email</small>
                                        <input type="email" className="form form-control rounded-0"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <small>Contraseña</small>
                                        <input type='password' className="form form-control rounded-0"/>
                                    </Form.Group>
                                </form>
                                <Row>
                                    <Col>
                                        <Button className="rounded-0">Enviar</Button>
                                    </Col>
                                    <Col>
                                        <a href="/#">recuperar cuenta</a>
                                    </Col>
                                    <Col>
                                        <a href="/#">registrarse</a>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;