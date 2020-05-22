import React from 'react';
import { Container, Row, Col, Navbar, Card, Form, FormGroup, Button } from 'react-bootstrap';

const Home = ()=>{
    return(
        <React.Fragment>
            <Navbar bg="dark" expand="lg" variant="dark" className="mb-2">
                <Navbar.Brand href="#home">O</Navbar.Brand>                
            </Navbar> 
            <Container>
                <Row className="pt-3">
                    <Col md="9">
                        <Row className="pb-3">
                            <Col md="12">
                                <Card style={{borderTop:"solid 3px #2461b2"}} className="rounded-0">
                                    <Card.Body>
                                        <h5>Usuarios destacados</h5>
                                        <Card>
                                            ffff
                                        </Card>
                                    </Card.Body>
                                </Card>
                            </Col>                         
                        </Row>
                        <Row className="pb-3">
                            <Col>
                                <Card className="rounded-0">
                                    <Card.Body>
                                        <Form>
                                            <FormGroup>
                                                <label>Buscá lo que necesites, encontrá los proveedores</label>
                                                <input className="form form-control rounded-0" placeholder='herrería, obra, metal' />
                                                <small className="text-muted">Ingresa las palabras claves separadas por comas ,</small>
                                            </FormGroup>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="3">                     
                        <Row>
                            <Col>
                                <Card style={{borderTop:"solid 3px #2461b2"}} className="rounded-0">
                                    <Card.Header>
                                        <h5> Buscás trabajo?</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <a href='/#cargarcv' className="btn btn-danger rounded-0">Publicá tu CV acá!</a><br></br>
                                        <small>Se lo haremos llegar directamente a las empresas que forman parte de nuestro equipo</small>
                                    </Card.Body>
                                </Card> 
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Home;