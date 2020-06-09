import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Card, Form, FormGroup, Button, InputGroup, FormControl, Badge, Overlay, OverlayTrigger, Tooltip } from 'react-bootstrap';
import config from '../config';
import {FaSearch} from 'react-icons/fa'

const Home = ()=>{
    const [search, setSearch] = useState("");
    const [data, setData] = useState("");
    const [recientes, setRecientes] = useState("");
    useEffect(()=>{
        fetch(config.url+"/api/acount/recientes")
        .then(d => d.json())
        .then(d => {
            let items = [];
            for(let i =0; i<=Math.round(d.length /12); i++)
            {
                items.push(<Row key={i+"row"}>
                {
                    d.slice(i*12,i*12+12).map((item,indx)=>{
                        const link = 
                            <a href={'/#profile/'+item.id}>
                                <img width='70px' className='rounded-circle' src={item.imagenPerfil} />
                                <br></br>
                                <small>{item.razonSocial}</small><br/>
                            </a>
                        return <Col key={indx+"col"} xs='4' sm='3' lg="2" style={{textAlign:"center"}}>
                                    {!item.profesion ? link : 
                                    <OverlayTrigger
                                        key={indx+"overlay"}
                                        placement='auto'
                                        overlay={
                                            <Tooltip>
                                                {item.profesion}
                                            </Tooltip>
                                        }                                
                                    >      
                                    {link}                      
                                    </OverlayTrigger>}
                                </Col>
                    })
                }</Row>)
            } 
            console.log(items)
            setRecientes(items)
        })
    },[])

    const buscar = e=>{
        e.preventDefault();

        fetch(config.url+"/api/buscador?search="+search)
        .then(data => data.json())
        .then(data => {
            let resultados = data.map(d => 
                <>
                <Row>
                    <Col sm='2' className='d-flex justify-content-center'>
                        {/* <img src={d.imagenPerfil}></img><br></br> */}
                        <img className='rounded-circle' width='45px' src={d.imagenPerfil}></img>
                        {/* <Badge variant='info'>Empresa</Badge> */}
                    </Col>
                    <Col sm='4' className='d-flex justify-content-start'>
                        {d.razonSocial}
                    </Col>
                    <Col sm='4' className='d-flex justify-content-start'>
                        {d.titulo}
                    </Col>
                    <Col sm='2' className='d-flex justify-content-end'>
                        <Button href={'/#profile/'+d.id} variant='outline-primary' size='sm' className='rounded-0'>Ver perfil</Button>
                    </Col>
                </Row> 
                <hr></hr>
                </>
            )
            setData(resultados)
        })
    }


    return(
        <React.Fragment>
            <Navbar bg="dark" expand="lg" variant="dark" className="mb-2">
                <Navbar.Brand href="#home">O</Navbar.Brand>                
            </Navbar> 
            <Container>
                <Row className="pt-3">
                    <Col md="9">
                        {/* <Row className="pb-3">
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
                        </Row> */}
                        <Row className="pb-3">
                            <Col>
                                {/* <Card className="rounded-0"> */}
                                <Card style={{borderTop:"solid 3px #2461b2"}} className="rounded-0">
                                    <Card.Body>
                                        {/* <Form>
                                            <FormGroup>
                                                <label>Buscá lo que necesites, encontrá los proveedores</label>
                                                <input className="form form-control rounded-0" placeholder='herrería, obra, metal' />
                                                <small className="text-muted">Ingresa las palabras claves separadas por comas ,</small>
                                            </FormGroup>
                                        </Form> */}
                                        <form>
                                            <label htmlFor='search'>Buscá lo que necesites, encontrá los proveedores</label>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder='metalurgica, limpieza, cargas'
                                                    type='search'
                                                    id='search' 
                                                    className='rounded-0'
                                                    value={search}
                                                    onChange={e => setSearch(e.target.value)}
                                                />
                                                <InputGroup.Append>
                                                    <Button onClick={buscar} onSubmit={buscar}
                                                    type='submit'
                                                    variant="outline-secondary" className='rounded-0'><FaSearch/> Buscar</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </form>
                                        <Row>
                                            <Col>
                                                {
                                                    data
                                                }
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card className='rounded-0'>
                                    <Card.Body>
                                        <Card.Title>Últimos Usuarios registrados</Card.Title>
                                        {
                                            recientes
                                        }
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