import React, { useState, useEffect, forceUpdate } from 'react'; 
import {Button, Navbar, Nav, NavDropdown, Form, FormControl, Container, Row, Col} from 'react-bootstrap';
import Perfil from './controllers/acount/perfil';
import Home from './controllers/home';
import './generalStyle.css'
import {FaHandsHelping, FaRegBuilding, FaRegAddressCard, FaRegQuestionCircle, FaUserTie} from 'react-icons/fa';
import {IoMdNotificationsOutline, IoIosLogOut} from 'react-icons/io'
import logoSitio from './logos/Marca-03.png'
import config from './config';
import Login from './controllers/acount/login';
import Registro from './controllers/acount/registro'; 
import CargaCv from './controllers/curriculum/cargarCv';
import MailConfirmado from './controllers/acount/mailConfirmado';
import VerCvs from './controllers/curriculum/verCvs';
import CambiarPassRecupero from './controllers/acount/cambiarPassRecupero';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

export default ()=>{
    const [ruta,setRuta] = useState(window.location.hash.slice(1));
    const [user, setUser] = useState({id:"",razonSocial:"",rol:""});
    const [body, setBody] = useState(<div></div>)
    useEffect(()=>{ 
        fetch(config.url+'/api/acount',{ 
            headers:{
                "raw":"json",
                Authorization:localStorage.session
            }
        })
        .then(data => {
            data.json()
            .then(d =>  setUser({id:d.id,razonSocial:d.nombre, rol:d.rol})) 
        })
        let retBody= ()=>{ 

            let ruta = window.location.hash.slice(1);
            let rutaSliced = ruta.split("/");
            
            console.log("ruta", rutaSliced)
            if(!window.location.hash)
            {
                setBody(<Home></Home>)
            }
            else if(rutaSliced[0] == "login")
            {
                setBody(<Login/>)
            }
            else if(rutaSliced[0] == "rescuepass")
            {
                setBody(<CambiarPassRecupero userId={rutaSliced[1]} clave={rutaSliced[2]}/>)
            }
            else if(rutaSliced[0] == "registro")
            {
                setBody(<Registro/>)
            }
            else if(rutaSliced[0] == "validado")
            {
                setBody(<MailConfirmado/>)
            }
            else if(rutaSliced[0] == "cargarcv")
            {
                setBody(<CargaCv/>)
            }
            else if(rutaSliced[0] == "vercvs")
            {
                setBody(<VerCvs/>)
            }
            else if(rutaSliced[0] == "profile" && !isNaN(rutaSliced[1]))
            {
                setBody(<Perfil/>)
            } 
        }
        window.addEventListener("hashchange", retBody)
        window.addEventListener("load", retBody)
    },[]) 

    return(
    <React.Fragment> 
            <Navbar bg='light' expand="lg" variant="light" className="fixed-top">
                <Navbar.Brand href="#"><img width='120' src={logoSitio}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto ml-auto">
                        <Nav.Link href="#empresas"><FaRegBuilding/> Empresas</Nav.Link>
                        <Nav.Link href="#autonomos"><FaHandsHelping/> Autónomos</Nav.Link>
                        {user.rol > 0 ? <Nav.Link href="#cv"><FaRegAddressCard/> CV Postulantes</Nav.Link> : null}
                        <Nav.Link href="#info"><FaRegQuestionCircle/> Quienes somos</Nav.Link>
                    </Nav>
                    <Nav className="mr-0"> 
                    <Nav.Link href="#link"><IoMdNotificationsOutline/></Nav.Link>
                        <NavDropdown title={
                            user.id ? user.razonSocial : "Cuenta"
                        } id="basic-nav-dropdown" alignRight>
                            {user.id ?                                    
                                (<React.Fragment>
                                    <NavDropdown.Item  onClick={()=>{
                                        window.location = "#profile/"+user.id
                                        window.location.reload()
                                    }}><FaUserTie/> Mi perfil </NavDropdown.Item>
                                    <NavDropdown.Item onClick={()=>{
                                        localStorage.session = ""
                                        window.location.reload()
                                    }}><IoIosLogOut/> Logout </NavDropdown.Item>
                                </React.Fragment>)
                                :                               
                                
                                (<React.Fragment>
                                    <NavDropdown.Item href="#login">  Ingresar </NavDropdown.Item>
                                    <NavDropdown.Item href="#registro">  Registrarse </NavDropdown.Item>
                                </React.Fragment>)
                                
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>        
            {body} 
    </React.Fragment>
    )
} 
