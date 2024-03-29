import React, { useState } from 'react';
import {Container, Row, Form, Col, Card, Navbar, Button} from 'react-bootstrap'; 
import config from '../../config';

const Registro = ()=>{
    const [razonSocial,setRazonSocial] = React.useState("")
    const [userName,setUserName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [pass,setPass] = React.useState("")
    const [rPass,setrPass] = React.useState("")
    const [rPassBorder,setrPassBorder] = React.useState({})
    const [rSocialBorder,setrSocialBorder] = React.useState({l:"Será necesario para acceder a tu cuenta", b:"", textColor:"text-muted"})
    const [registrado, setRegistrado] = useState(false)
    const [tipo, setTipo] = useState(1)
    
    const submitForm = e => {
        e.preventDefault();
        if(pass != rPass || pass.length < 6)
        {
            setrPassBorder({l:"Las contraseñas deben coincidir y tener un mínimo de 6 caracteres", c:"danger"})
        }
        else{
            setrSocialBorder({l:"", b:""})
            fetch(config.url+"/api/acount/registro",{
                method:"post",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    userName,
                    razonSocial,
                    email,
                    pass,
                    tipo
                })
            })
            .then(data => {
                if(data.status == 402)
                {
                    setrSocialBorder({l:"El nombre de usuario se encuentra en uso", b:"border border-danger",textColor:"text-danger"})
                }else
                if(data.status == 200)
                {
                    //alert("Tu cuenta se ha creado exitosamente, solo resta activarla revisando tu email")
                    setRegistrado(true);
                    //window.location = "/#login"
                }
            })
            .catch(err => console.log(err))
        }
    }

    return(
        <div>
            <Navbar bg="dark" expand="lg" variant="dark" className="mb-2">
                <Navbar.Brand href="#home">O</Navbar.Brand>                
            </Navbar> 
            <Container>
                <Row className="d-flex justify-content-center mt-3">
                    <Col md="6">
                        <Card className="rounded-0">
                            {!registrado ? 
                            <Card.Body >
                                <Card.Title>
                                    Registrar nueva cuenta
                                </Card.Title>
                                <form onSubmit={submitForm}>
                                    <Form.Group>
                                        <label htmlFor="rsocial">* Nombre de Usuario</label>
                                        <input minLength={4} maxLength={130} required value={userName} onChange={e => setUserName(e.target.value)}
                                            id="rsocial" type="text" className={"form form-control rounded-0 "+rSocialBorder.b} required/>
                                        {/* <small className="text-muted">Será necesario para acceder a tu cuenta</small> */}
                                        <small className={rSocialBorder.textColor}>{rSocialBorder.l}</small>
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <label htmlFor="rsocial">* Razón social</label>
                                                <input required value={razonSocial} onChange={e => setRazonSocial(e.target.value)}
                                                    id="rsocial" type="text" className={"form form-control rounded-0 "} placeholder="Persona S.R.L" required/>
                                                <small className="text-muted">Como querés que vean tu negocio</small>
                                            </Form.Group>                                        
                                        </Col> 
                                        <Col>
                                        <Form.Group>
                                        <label htmlFor="rsocial">* Tipo Organización</label>
                                        <select className='form form-control rounded-0' onChange={e =>{
                                            setTipo(e.target.value)
                                        }} value={tipo}>
                                            <option value='1'>Autónomo</option>
                                            <option value='2'>Empresa</option>
                                        </select>
                                        <small className="text-muted">Cómo autodefinís tu actividad?</small>
                                    </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group>
                                        <label htmlFor="email">* Email</label>
                                        <input value={email} onChange={e => setEmail(e.target.value)}
                                            required type="email" id="email" className={"form form-control rounded-0 "}
                                            placeholder="info@ejemplo.com"/>
                                        <small className='text-primary'>La necesitaremos para validar la cuenta</small>
                                        
                                    </Form.Group> 
                                    <Form.Group>
                                        <label htmlFor="pass">Contraseña</label>
                                        <input min={6} value={pass} onChange={e => setPass(e.target.value)}
                                            onKeyUp={
                                                ()=> {pass == rPass? setrPassBorder("success") : setrPassBorder("danger")}
                                            }
                                            required type='password' id="pass" className="form form-control rounded-0"/>
                                    </Form.Group>
                                    <Form.Group onKeyUp={
                                        ()=> {pass == rPass? setrPassBorder({l:"", c:"success"}) : setrPassBorder({l:"Las contraseñas deben coincidir y tener un mínimo de 6 caracteres", c:"danger"})}
                                    }>
                                        <label htmlFor="rpass">Repetir Contraseña</label>
                                        <input min={6} value={rPass} onChange={e => setrPass(e.target.value)}
                                             required type='password' id="rpass" className={`form form-control rounded-0 border border-${rPassBorder.c}`}/>
                                        <small className="text-danger">{rPassBorder.l}</small>
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Button type="submit" className="rounded-0">Enviar</Button>
                                        </Col> 
                                    </Row>
                                </form>                                
                            </Card.Body>
                            :
                            <Card.Body>
                                <Card.Subtitle>
                                    ¡Hemos creado tu cuenta correctamente!
                                </Card.Subtitle>
                                <hr></hr>
                                <Card.Title>
                                    Acabamos de enviar un email de validación a:
                                </Card.Title> 
                                <h2>{email}</h2>
                                <hr></hr>
                                <p className='text-danger'>En caso de no visualizar el email, revisá en la bandeja de no deseados</p>
                                <small>Por favor revisá tu cuenta de correo electrónico para validar.
                                    En caso de ser incorrecta la dirección ingresada, deberá recargar los datos para su registro en VALOR-AR
                                </small>
                            </Card.Body>
                            }
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Registro;