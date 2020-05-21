import React, { useState } from 'react';
import { Container, Row, Col, Card, Navbar, Button, Form, Badge, Modal } from 'react-bootstrap';
import config from '../config'
const CargaCv = () => {
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [tags, setTags] = useState("");
    const [archivo, setArchivo] = useState(null) 
    const [claveSeguridad, setClaveSeguridad] = useState("") 
    const [classBorder, setClassBorder] = useState("") 

    const enviar = e=>{
        e.preventDefault();
        let headers = new Headers();
        let fd = new FormData()
        headers.append('Accept', 'application/json')
        headers.append('Content-Type', 'application/json')
        fd.append("cv", archivo);
        fd.append("user", JSON.stringify({
            nombre,
            telefono,
            email,
            tags
        }))

        fetch(config.url+'/api/curriculum?key='+claveSeguridad,{
            method:"POST",
            //headers,
            body:fd
        })
        .then(data => {
            if(data.status == 201)
            {
                alert("Correcto: Te hemos enviado un email")
                window.location = "/#"
            }
            else if(data.status == 403)
            {
                setClassBorder("border-danger")
            }
        })
    }

    return(
        <React.Fragment>
            <Navbar bg="dark" expand="lg" variant="dark" className="mb-2">
                <Navbar.Brand href="#home">O</Navbar.Brand>                
            </Navbar>
            <Container>
                <Row className="d-flex justify-content-center mt-4">
                    <Col md='8'>
                        <Card>
                            <Card.Body>
                                <Card.Title>Adjuntanos tu Currículum</Card.Title> 
                                {classBorder ? <h6 className='text-danger'>El email está registrado y no se ingresó una clave de seguridad válida</h6>:null}        
                                <Form onSubmit={enviar}>
                                    <Form.Group>
                                        <label htmlFor='Nombre'>Nombre completo *</label>
                                        <Form.Control required autoComplete='off' value={nombre} onChange={e=>setNombre(e.target.value)} id='Nombre' size='sm' className='rounded-0' type='text' />
                                    </Form.Group>
                                    <Form.Group>
                                        <label htmlFor='Telefono'>Teléfono *</label>
                                        <Form.Control required autoComplete='off' value={telefono} onChange={e=>setTelefono(e.target.value)} id='Telefono' size='sm' className='rounded-0' type='tel' />
                                    </Form.Group>
                                    <Form.Group>
                                        <label htmlFor='Email'>Email *</label>
                                        <Form.Control required autoComplete='off' value={email} onChange={e=>setEmail(e.target.value)} id='Email' size='sm' className={'rounded-0 '+classBorder} type='email' />
                                    </Form.Group>
                                    <Form.Group>
                                        <label htmlFor='Tags'>Palabras claves sobre tu orientación vocacional, separado por comas, *</label>
                                        <Form.Control required autoComplete='off' value={tags} onChange={e=>setTags(e.target.value)} autoComplete='off' id='Tags' size='sm' className='rounded-0' type='text' />
                                        <label>{tags.split(",").map(t => <Badge key={t+"_"} className='mr-1' variant='info'>{t.trim()}</Badge>)}</label>
                                    </Form.Group>
                                    <Form.Group>
                                        <Row>
                                            <Col md="6">
                                                <label htmlFor='Archivo'>Cargar archivo: PDF, o tipo Word</label>
                                                <Form.Control onChange={e=>setArchivo(e.target.files[0])} required id='Archivo' size='sm' className='rounded-0' type='file' accept='.pdf, .doc, .docx, .odt, .doc' />
                                            </Col>
                                            <Col md="6">
                                                <label htmlFor='clave'>Clave de Seguridad (opcional)</label>
                                                <Form.Control onChange={e=>setClaveSeguridad(e.target.value)} value={claveSeguridad} id='clave' size='sm' className={'rounded-0 '+classBorder} />
                                                <small>(solo en caso de querer editar la información)</small>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button type="submit" variant='primary' className="rounded-0">Enviar</Button>
                                        <RecuperoClave></RecuperoClave>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

const RecuperoClave = ()=> {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const enviar = ()=>{
        fetch(config.url+"/api/curriculum/recuperoclave?email="+email,{
            method:"post"
        })
        .then(res=>{
            if(res.status == 200)
            {
                alert("Te enviamos un email con la nueva clave");
                handleClose();
            }
        })
    }
    
  
    return (
      <> 
        <Button type="submit" onClick={handleShow} variant='secondary' className="rounded-0 ml-2">Generar una nueva clave</Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Recuperar clave</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <label>Ingresar Email</label>
              <Form.Control className='rounded-0' value={email} onChange={e => setEmail(e.target.value)}></Form.Control></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className='rounded-0 ml-1' onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" className='rounded-0' onClick={enviar}>
              Enviar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default CargaCv;