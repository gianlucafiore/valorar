import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Card, Button, Image, Form, ButtonGroup, Badge } from 'react-bootstrap';
import Jodit from 'jodit-react';

import config from '../config';

const Perfil = (props)=>{
    const [data,setData] = useState("");
    const [editar, toggleEditar] = useState(false)
    const [user, setUser] = useState({id:"",razonSocial:"",rol:""});

    useEffect(()=>{ 
        let id = window.location.hash.slice(1).split("/")[1]
        if(!user.id)
        fetch(config.url+'/api/acount/profile/'+id,{ 
            headers:{
                "raw":"json",
                Authorization:localStorage.session
            }
        })
        .then(data => {
            data.json()
            .then(d =>  setUser(d)) 
        })  
    })
    
    return(
        <React.Fragment>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <img style={{maxHeight:300}} width="100%" src={"https://image.shutterstock.com/image-photo/amazing-mountain-landscape-colorful-vivid-260nw-693715240.jpg"}></img>
                    </Col>
                </Row>
                {user.canEdit ? <Row className='py-3'>
                    <Col>
                        <Button className="mr-3 rounded-0" variant='outline-secondary' size='sm'>Editar Información general</Button>
                        <Button className="mr-3 rounded-0" variant='outline-secondary' size='sm'>Editar descripción</Button>
                    </Col>
                </Row> : null}
                <Row>
                    <Col md="5">
                        <Card className='rounded-0' style={{borderTop:"solid 3px #184ca1"}}>
                            {/* <Card.Header>Featured</Card.Header> */}
                            <Card.Body style={{textAlign:"center"}}>
                                <Image
                                    width="33%" 
                                     
                                    src="https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/5b755a235cafe886f57f0c61/golden-cachorro_0.jpg" />
                                <h5>NOMBRE DE EMPRESA</h5> 
                                    ⭐⭐⭐  💎💎💎                                
                                <hr/>
                                <Row>
                                    <Col>
                                        <h3>43</h3>Seguidores
                                    </Col>
                                    <Col>
                                        <h3>25</h3>Reputación
                                    </Col><Col>
                                        <h3>300</h3>Visitas
                                    </Col> 
                                </Row> 
                                <hr></hr>
                                <Row>
                                    <Col>
                                        📞 0341 15664566
                                    </Col>  
                                    <Col>
                                         info@empresa.com
                                    </Col>  
                                </Row> <br></br>
                                <Row> 
                                    <Col>
                                        <ButtonGroup>
                                        <Button variant='danger' size='sm'>CHAT</Button>
                                        <a className="btn btn-info btn-sm" href="">Sitio Web</a>
                                        </ButtonGroup>
                                    </Col>  
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Col>
                                        <Badge variant="secondary">metalurgica</Badge>
                                        {" "}<Badge variant="secondary">obra</Badge>
                                        {" "}<Badge variant="secondary">herrería</Badge>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="7">
                        <Card className='rounded-0' style={{borderTop:"solid 3px #184ca1"}}>
                            <Card.Body >
                            <Card.Title>Empresa de servicios industriales </Card.Title><hr></hr>
                            <Jodit 
                                value={data}
                                onChange={c => setData(c)}
                            />
                            <div dangerouslySetInnerHTML={{__html: data}} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Perfil;