import React, { useEffect, useState } from 'react';
import {Container, Row, Card, Table, Col, Navbar, Form, FormControl, InputGroup, Button, Badge} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import config from '../../config'
import {FaSearch} from 'react-icons/fa'

const columnas = [
    {
        name:"Nombre Completo",
        selector: "nombre"
    },
    // {
    //     name:"Teléfono",
    //     selector: "telefono"
    // },
    {
        name:"Email",
        selector: "email"
    },
    {
        name:"Tags",
        selector: "tags"
    },
    {
        name:"Archivo Cv",
        selector: "archivo"
    }    
]
 
const VerCvs = ()=>{
    const [data,setData] = useState([])
    const [search,setSearch] = useState([])
    useEffect(()=>{
        fetch(config.url+"/api/curriculum",{
            headers:{
                Authorization:localStorage.session
            }
        })
        .then(data => data.json())
        .then(data => {
            data = data.map(d => {
                d.archivo = <a target='_blank' href={"/api/curriculum/"+d.archivo}>Ver CV</a>
                d.tags = d.tags.split(",").map(t => <Badge key={t} variant='primary' className='mr-1'>{t.trim()}</Badge>)
                return d;
            })
            setData(data)
        })
    },[])
    const buscar = e=>{
        e.preventDefault()
        fetch(config.url+"/api/curriculum/buscar?search="+search,{
            headers:{
                Authorization:localStorage.session
            }
        })
        .then(data => data.json())
        .then(data => {
            data = data.map(d => {
                d.archivo = <a target='_blank' href={"/api/curriculum/"+d.archivo}>Ver CV</a>
                d.tags = d.tags.split(",").map(t => <Badge key={t} variant='primary' className='mr-1'>{t.trim()}</Badge>)
                return d;
            })
            setData(data)
        })
    }

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
                                <form>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder='ingeniero, mecanico, desarrollador'
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