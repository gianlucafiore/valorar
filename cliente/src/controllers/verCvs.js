import React, { useEffect, useState } from 'react';
import {Container, Row, Card, Table, Col, Navbar, Form} from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const columnas = [
    {
        name:"Nombre Completo",
        selector: "nombre"
    },
    {
        name:"Teléfono",
        selector: "telefono"
    },
    {
        name:"Email",
        selector: "email"
    },
    {
        name:"Palabras clave",
        selector: "tags"
    },
    {
        name:"Fecha Alta",
        selector: "fechaAlta"
    },
    {
        name:"Archivo Cv",
        selector: "archivo"
    }    
]

const getData = ()=>{
    return [{
        nombre:"gian",
        telefono:"123123123", 
        email:"gian@gmail.com",
        tags:"perro",
        fechaAlta:"01/01/10",
        archivo:<a href='/#'>Ver CV</a>,
    }]
}

const VerCvs = ()=>{
    const [data,setData] = useState([])
    useEffect(()=>{
        setData(getData())
    },[])
    return(
        <React.Fragment>
            <Navbar bg="dark" expand="lg" variant="dark" className="mb-2">
                <Navbar.Brand href="#home">O</Navbar.Brand>                
            </Navbar> 
            <Container>
                <Row className="mt-3">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Currículums ingresados</Card.Title>
                                <hr></hr>
                                <label htmlFor='search'>Ingresar palabras clave para la búsqueda</label>
                                <Form.Control id='search' type='search'/>
                                <DataTable 
                                    columns={columnas}
                                    theme='solarized'
                                    data={data}
                                    pagination={true}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default VerCvs;