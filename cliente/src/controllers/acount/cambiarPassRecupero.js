import React, { useState } from 'react';
import { Container, Navbar, Card, Form, Button, Col, Row } from 'react-bootstrap';
import config from '../../config';

const CambiarPassRecupero = props =>{
    const [newPass, setNewPass] = useState("");
    const [rptNewPass, setRptNewPass] = useState("");
    const [borde,setBorde] = useState("");


    const sendPass = e=>{
        e.preventDefault();
        if(newPass == rptNewPass)
        //fetch(config.url+`/api/acount/cambiarclaverecupero?id=1&clave=asd54`,{
            fetch(config.url+`/api/acount/cambiarclaverecupero?id=${props.userId}&clave=${props.clave}`,{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:"post",
            body: JSON.stringify({newPass})
        })
        .then(data => {
            if(data.status == 200)
            {
                window.location = "/#login"
            }
        })
        else 
            setBorde("border-danger")
    }

    return(
        <React.Fragment>
            <Navbar bg="dark" expand="lg" variant="dark" className="mb-2">
                <Navbar.Brand href="#home">O</Navbar.Brand>                
            </Navbar>
            <Container>
                <Row className='d-flex justify-content-center mt-5'>
                    <Col md='6'>
                        <Card className='rounded-0'>
                            <Card.Body>
                                <Card.Title className='text-success'>
                                    <b>Crear una nueva contraseña</b>
                                </Card.Title>
                                <Form onSubmit={sendPass}>
                                    <Form.Group>
                                        <label htmlFor='newPass'>Contraseña</label>
                                        <Form.Control minLength='6' className='rounded-0' onChange={e=>{
                                            setNewPass(e.target.value)
                                            setBorde("")
                                        }} value={newPass} type='password' />
                                    </Form.Group>
                                    <Form.Group>
                                        <label htmlFor='newPass'>Repetir Contraseña</label>
                                        <Form.Control minLength='6' className={'rounded-0 '+borde} onChange={e=>setRptNewPass(e.target.value)} value={rptNewPass} type='password' />
                                        {borde ? <small className='text-danger'>Las contraseñas deben coincidir</small>:null}
                                    </Form.Group>
                                    <Button type='submit' className='rounded-0'>Enviar</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default CambiarPassRecupero;