import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import {Button, Navbar, Nav, NavDropdown, Form, FormControl, Container, Row, Col} from 'react-bootstrap';
import Perfil from './controllers/perfil';
import Home from './controllers/home';
import './generalStyle.css'
import {FaHandsHelping, FaRegBuilding, FaRegAddressCard, FaRegQuestionCircle, FaUserTie} from 'react-icons/fa';
import {IoMdNotificationsOutline, IoIosLogOut} from 'react-icons/io'
import logoSitio from './logos/Marca-03.png'
import config from './config';
import Login from './controllers/login';
import Registro from './controllers/registro';


export default ()=>{
    const [ruta,setRuta] = useState(window.location.hash.slice(1));
    const [user, setUser] = useState({});
    // fetch(config.url+'/auth/local',{
    //     method:"post",
    //     headers:{
    //         "raw":"json"
    //     },
    //     body:{
    //         identifier:"system",
    //         password:"123456"
    //     }
    // })
    // .then(data => data.json())
    // .then(data => console.log(data))

    useEffect(()=>{
        window.addEventListener("hashchange",()=>{
            setRuta(window.location.hash.slice(1))
        })
    })
    return(
        <React.Fragment>
            <Navbar bg='light' expand="lg" variant="light" className="fixed-top">
                <Navbar.Brand href="#home"><img width='120' src={logoSitio}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto ml-auto">
                        <Nav.Link href="#home"><FaRegBuilding/> Empresas</Nav.Link>
                        <Nav.Link href="#link"><FaHandsHelping/> Autónomos</Nav.Link>
                        <Nav.Link href="#link"><FaRegAddressCard/> CV Postulantes</Nav.Link>
                        <Nav.Link href="#link"><FaRegQuestionCircle/> Quienes somos</Nav.Link>
                    </Nav>
                    <Nav className="mr-0"> 
                    <Nav.Link href="#link"><IoMdNotificationsOutline/></Nav.Link>
                        <NavDropdown title={
                            user.id ? user.razonSocial : "Cuenta"
                        } id="basic-nav-dropdown" alignRight>
                            {(()=>{
                                console.log(user)
                                if(user.id)
                                {
                                    return (
                                    <React.Fragment>
                                        <NavDropdown.Item href="#action/3.2"><FaUserTie/> Mi perfil </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.1"><IoIosLogOut/> Logout </NavDropdown.Item>
                                    </React.Fragment>)
                                }
                                else{
                                    return (
                                        <React.Fragment>
                                            <NavDropdown.Item href="#action/3.2">  Ingresar </NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.1">  Registrarse </NavDropdown.Item>
                                        </React.Fragment>)
                                }                                
                            })()}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar> 
                {router(ruta)}
        </React.Fragment>
    )
}

function router(ruta)
{ 
    let rutaSliced = ruta.split("/"); 
    if(ruta == "")
    {
        return <Home/>
    }
    
    else if(rutaSliced[0] == "login")
    {
        return <Login/>
    }
    else if(rutaSliced[0] == "registro")
    {
        return <Registro id={rutaSliced[1]}/>
    }
    else if(rutaSliced[0] == "profile" && !isNaN(rutaSliced[1]))
    {
        return <Perfil id={rutaSliced[1]}/>
    }
    
}
