import React, { useState, useEffect } from 'react';
import {Container, Row, Form, Col, Card, Navbar, Button, Modal} from 'react-bootstrap'; 
import config from '../../config';

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
                    window.location = "/#profile/"+data.id
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
                                            <RecuperarCuenta/>
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

const RecuperarCuenta = ()=>{
    const [show, setShow] = useState(false);
    const [userName, setUserName] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [enviado, setEnviado] = useState(false);

    const solicitarRecupero = e=>{
        e.preventDefault();
        fetch(config.url+"/api/acount/solicitarrecupero?userName="+userName,{
            method:"post"
        })
        .then(data =>{
            if(data.status == 200)
            {
                setEnviado(true)
                return data.json()
            }
        }).then(data => setUserName(data.email))
    }

    return(
        <React.Fragment>
            <Button variant='link' onClick={handleShow} size='sm'>recuperar cuenta</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    {
                        !enviado ? <React.Fragment>
                        <Modal.Title>Ingresar nombre de usuario</Modal.Title>
                            <Form.Control  onChange={e=> setUserName(e.target.value)}/>
                            <small>Te enviaremos un email para el recupero de contraseña a la dirección asociada con este usuario</small>
                        </React.Fragment>
                        :
                        <Modal.Title>
                            Hemos enviado un email a una dirección similar a {userName}
                        </Modal.Title>
                    }
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={solicitarRecupero}>
                    Enviar
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default Login;