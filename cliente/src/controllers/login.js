import React, { useState, useEffect } from 'react';
import {Container, Row, Form, Col, Card, Navbar, Button} from 'react-bootstrap'; 
import config from '../config';

const Login = (props)=>{
    const [userName,setUserName] = useState("");
    const [pass,setPass] = useState("");
    const [alert,setAlert] = useState("");

    const sendForm = e=>{
        e.preventDefault();
        fetch(config.url+"/api/acount/login",{
            method:"post",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                userName,
                pass
            })
        })
        .then(data => {
            if(data.status == 403)
            {
                setAlert(<h6 className="text-danger">Datos incorrectos</h6>)
            }
            else if(data.status == 200)
            {
                data.json()
                .then(data => {
                    localStorage.session =  `Bearer ${data.token}`;
                    //props.setUser({id:data.id,razonSocial:data.razonSocial})
                    window.location = "/"
                })
            }
        })
        .catch(err => console.log(err))
    }

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
                                {alert}
                                <form onSubmit={sendForm}>
                                    <Form.Group>
                                        <small>Nombre de usuario</small>
                                        <input onChange={e=>setUserName(e.target.value)} value={userName}
                                            required type="text" className="form form-control rounded-0"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <small>Contraseña</small>
                                        <input onChange={e=>setPass(e.target.value)} value={pass}
                                            required type='password' className="form form-control rounded-0"/>
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Button type="submit" className="rounded-0">Enviar</Button>
                                        </Col>
                                        <Col>
                                            <Button variant='link' size='sm'>recuperar cuenta</Button>
                                        </Col>
                                        <Col>
                                            <Button href='/#registro' variant='link' size='sm'>registrarse</Button>
                                        </Col>
                                    </Row>
                                </form>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;