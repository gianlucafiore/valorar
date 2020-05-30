import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Navbar } from 'react-bootstrap';
import config from '../../config'

const Autonomos = ()=>{
    const [lista, setLista] = useState([])
    useEffect(()=>{
        fetch(config.url+'/api/acount/autonomos')
        .then(data => data.json())
        .then(data => {
            let items = [];
            for(let i =0; i<=Math.round(data.length /12); i++)
            {
                items.push(<Row key={i+"row"}>
                {
                    data.slice(i*12,i*12+12).map((item,indx)=>
                        <Col key={indx+"col"} xs='4' sm='3' lg="2" style={{textAlign:"center"}}>
                            <a href='/#'>
                                <img width='70px' className='rounded-circle' src={item.imagenPerfil} />
                                <br></br>
                                <small>{item.razonSocial}</small>
                                <br></br>
                                <small>{item.titulo}</small>
                            </a>
                        </Col>
                    )
                }</Row>)
            }
            console.log(items)
            setLista(items)
        })
    },[])

    return(
        <React.Fragment>
            <Navbar bg="dark" expand="lg" variant="dark" className="mb-2">
                <Navbar.Brand href="#home">O</Navbar.Brand>                
            </Navbar>
            <Container>
                <Row className='d-flex justify-content-center mt-5'>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Autónomos</Card.Title>
                                <hr></hr>
                                {
                                    lista
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Autonomos;