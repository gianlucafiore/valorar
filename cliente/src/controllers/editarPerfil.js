import React from 'react';
import { Card, Row, Col, Container, Navbar, Form } from 'react-bootstrap';

const EditarPerfil = ()=>{
    return(
        <React.Fragment>
            <Navbar bg="dark" expand="lg" variant="dark" className="mb-2">
                <Navbar.Brand href="#home">O</Navbar.Brand>                
            </Navbar> 
            <Container>
                <Row className="d-flex justify-content-center pt-3">
                    <Col md="8">
                        <Card>
                            <Card.Body>
                                <Card.Title>Editar la información del negocio</Card.Title>
                                <form>
                                    <Form.Group>
                                        <label htmlFor='portada'>Imagen de portada</label>
                                        <input id='portada' className="form form-control" type='file'></input>
                                        <img alt='preview'></img>
                                    </Form.Group>
                                    <Form.Group>
                                        <label htmlFor='perfil'>Imagen de perfil</label>
                                        <input id='perfil' className="form form-control" type='file'></input>
                                        <img alt='preview'></img>
                                    </Form.Group>
                                    <Form.Group>
                                        <label htmlFor='razonSocial'>Nombre de empresa</label>
                                        <input id="razonSocial" className="form form-control" type='text' /> 
                                        <small>Como te verán publicamente</small>
                                    </Form.Group>
                                    <Form.Group>
                                        <label htmlFor='telefono'>Teléfono</label>
                                        <input id="telefono" className="form form-control" type='text' />
                                    </Form.Group>
                                    <Form.Group>
                                        <label htmlFor='email'>Email</label>
                                        <input id="email" className="form form-control" type='text' />
                                    </Form.Group>
                                    <Form.Group>
                                        <label htmlFor='web'>Sitio Web</label>
                                        <input id="web" className="form form-control" type='text' />  
                                    </Form.Group>
                                    <Form.Group>
                                        <label htmlFor='razonSocial'>Palabras clave para la búsqueda</label>
                                        <input id="razonSocial" className="form form-control" type='text' />
                                        <small>Servirá para que te encuentren, tipear y presionar enter para agregar</small>
                                    </Form.Group>
                                    <Form.Group>
                                        <label htmlFor='info'>Redacción sobre el negocio</label>
                                        <textarea className="form form-control" id="info"></textarea>
                                        <small>podés explicar a qué se dedican y contar sobre sus productos y/o servicios</small>
                                    </Form.Group>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default EditarPerfil;