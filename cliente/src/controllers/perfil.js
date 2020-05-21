import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Card, Button, Image, Form, ButtonGroup, Badge, Modal, Navbar } from 'react-bootstrap';
import Jodit from 'jodit-react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import config from '../config'; 

const Perfil = (props)=>{
    const [editar, toggleEditar] = useState(false)
    const [user, setUser] = useState({id:"",razonSocial:"",rol:""});
    const [descripcion,setDescripcion] = useState("");
    const [razonSocial, setRazonSocial] = useState("");
    const [estrellas, setEstrellas] = useState(0);
    const [seguidores, setSeguidores] = useState(0);
    const [reputacion, setReputacion] = useState(0);
    const [visitas, setVisitas] = useState(0);
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [tags, setTags] = useState(""); 
    const [titulo, setTitulo] = useState(""); 
    const [slogan, setSlogan] = useState(""); 
    const [sitioWeb, setSitioWeb] = useState(""); 


    useEffect(()=>{ 
        let id = window.location.hash.slice(1).split("/")[1]
        if(!user.id)
        fetch(config.url+'/api/acount/profile/'+id,{ 
            headers:{ 
                Authorization:localStorage.session
            }
        })
        .then(data => {
            data.json()
            .then(d =>  {
                setUser(d)
                setDescripcion(d.descripcion ? d.descripcion : "")
                setRazonSocial(d.razonSocial)
                setEstrellas(d.estrellas)
                setSeguidores(d.seguidores)
                setReputacion(d.reputacion)
                setVisitas(d.visitas)
                setTelefono(d.telefono)
                setEmail(d.email)
                setTags(d.tags ? d.tags : "")
                setTitulo(d.titulo ? d.titulo : "")
                setSlogan(d.slogan ? d.slogan : "")
                setSitioWeb(d.sitioWeb ? d.sitioWeb : "")
            }) 
        })  
    })

    const guardar = ()=>{
        if(window.confirm("¿Seguro que desea aplicar los cambios?"))
        fetch(config.url+"/api/acount/profile/"+user.id,{
            method:"put",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization:localStorage.session
            },
            body:JSON.stringify({
                razonSocial,
                slogan,
                titulo,
                telefono,
                email,
                sitioWeb,
                descripcion
            })
        })
        .then(data => {
            if(data.status == 200){
                toggleEditar(false) 
            }
            else
                console.log(data)
        })
    }
    
    return(
        <React.Fragment>
            <Navbar bg="dark" expand="lg" variant="dark" className="mb-2">
                <Navbar.Brand href="#home">O</Navbar.Brand>                
            </Navbar> 
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <img style={{maxHeight:300}} width="100%" src={config.url+user.imagenPortada}></img>
                    </Col>
                </Row>
                {user.canEdit ? <Row className='py-3'>
                    <Col>
                        {!editar? (
                            <React.Fragment>
                                <Button onClick={()=>toggleEditar(true)}
                                    className="mr-3 rounded-0" variant='outline-primary' size='sm'>Editar Información</Button>
                                {/* <Button className="mr-3 rounded-0" variant='outline-primary' size='sm'>Cambiar foto de portada</Button> */}
                                <ModalFotoPerfil idUser={user.id}></ModalFotoPerfil>
                                <ModalFotoPortada idUser={user.id}></ModalFotoPortada>
                            </React.Fragment>
                            )
                            : <Button onClick={guardar}
                            className="mr-3 rounded-0" variant='outline-warning' size='sm'>Guardar</Button>
                        }
                    </Col>
                </Row> : <div className="pb-4"></div>}
                <Row>
                    <Col md="5">
                        <Card className='rounded-0' style={{borderTop:"solid 3px #184ca1"}}> 
                            <Card.Body style={{textAlign:"center"}}>
                                <img
                                    width="33%" 
                                    src={config.url+user.imagenPerfil} />
                                {
                                    !editar ? 
                                    <h5>{razonSocial}</h5> : 
                                    <Form.Group>
                                        <label>Razón Social</label>
                                        <input className="form-control-sm form-control" value={razonSocial} onChange={e => setRazonSocial(e.target.value)}/>
                                    </Form.Group>
                                }
                                {(()=>{
                                    let estrellasHtml = "";
                                    for(let i = 0; i<estrellas; i++)
                                    {
                                        estrellasHtml+="⭐";
                                    }
                                    return <div>{estrellasHtml}</div>
                                })()}
                                <hr/>
                                <Row>
                                    <Col>
                                        <h3>{seguidores}</h3>Seguidores
                                    </Col>
                                    <Col>
                                        <h3>{reputacion}</h3>Reputación
                                    </Col><Col>
                                        <h3>{visitas}</h3>Visitas
                                    </Col> 
                                </Row> 
                                <hr></hr>
                                <Row className="pb-2">
                                    <Col>
                                        {!editar ? "📞"+ telefono : 
                                        <Form.Group>
                                            <label>Teléfono de contacto</label>
                                            <input className="form-control-sm form-control" value={telefono} onChange={e => setTelefono(e.target.value)}/>
                                        </Form.Group>}
                                    </Col>  
                                </Row>
                                <Row>
                                    <Col>
                                    {!editar ? email : 
                                    <Form.Group>
                                    <label>Email</label>
                                    <input className="form-control-sm form-control" value={email} onChange={e => setEmail(e.target.value)}/>
                                    </Form.Group>}
                                    </Col>  
                                </Row> <br></br>
                                <Row> 
                                    <Col>
                                        {!editar ? <a className="btn btn-info btn-sm rounded-0" href={sitioWeb}>Sitio Web oficial</a> : 
                                            <Form.Group>
                                                <label>Sitio Web</label>
                                                <input className="form-control-sm form-control" value={sitioWeb} onChange={e => setSitioWeb(e.target.value)}/>
                                            </Form.Group>
                                        }
                                    </Col>  
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Col>
                                        {
                                            tags.split(",").map(t => <Badge key={t} className="mr-2" variant="secondary">{t}</Badge>)
                                        } 
                                    </Col>
                                </Row>
                                
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="7">
                        <Card className='rounded-0' style={{borderTop:"solid 3px #184ca1"}}>
                            <Card.Body >
                            {!editar? <Card.Title>{titulo}</Card.Title> : 
                            <Form.Group>
                                <label>Título de tu rubro</label>
                                <input className='form-control-sm form-control' value={titulo} onChange={e=> setTitulo(e.target.value)}/>
                            </Form.Group>}
                            <hr></hr>
                            {editar ? 
                                <Form.Group>
                                    <label>Descripcion extensa de tu negocio</label>
                                    <Jodit 
                                            value={descripcion}
                                            onChange={c => setDescripcion(c)}
                                        /> 
                                    >
                                </Form.Group>
                                :
                                <div dangerouslySetInnerHTML={{__html: descripcion}} />
                            }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Perfil;

function ModalFotoPerfil(props) {
    const [show, setShow] = useState(false);
    const [crop, setCrop] = useState({ aspect: 16 / 16 });  
    const [pathTempFoto,setPathTempFoto] = useState("");
    const [originalName, setOriginalNAme] = useState("");
    const subirImagen = (imagen)=>{ 
        let formData = new FormData();
        let headers = new Headers();
        headers.append("Authorization", localStorage.session)
        formData.append("temp", imagen); 

        fetch(config.url+"/api/acount/profilephoto/"+props.idUser,{
            method:"post",
            headers,
            body: formData
        })
        .then(result => result.json())
        .then(result =>{
            console.log(result.originalName)
            setOriginalNAme(result.originalName)
            setPathTempFoto(config.url+result.path)
        })
    }
    const sendResizeImage = (name)=>{
        fetch(config.url+"/api/acount/resizephotoperfil/"+props.idUser,{
            method:"post",
            headers:{
                Authorization:localStorage.session,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                crop,
                originalName:name
            })
        })
        .then(result => {
            if(result.status == 200)
            {
                window.location.reload()
            }
        }) 
    }

    return (
        <>
        <Button onClick={() => setShow(true)} className="mr-3 rounded-0" variant='outline-primary' size='sm'>Cambiar foto de perfil</Button>

        <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>imagen</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                    <input type="file" onChange={e=>{ 
                        subirImagen(e.target.files[0])
                    }}/>
                
                <ReactCrop 
                    src={pathTempFoto} 
                    crop={crop} 
                    
                    // onImageLoaded={image => setFoto(image)}
                    onChange={(newCrop,percentCrop) => {
                        console.log(percentCrop)
                        setCrop(percentCrop)
                    }}
                />
                {pathTempFoto?<small>Clickear y arrastrar en la foto para redimensionar</small>:null}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShow(false)}>
                Cerrar
            </Button>
            <Button onClick={()=>sendResizeImage(originalName)} type="button" variant='success'>Subir</Button>

            </Modal.Footer>
        </Modal>
        </>
    );
}

function ModalFotoPortada(props) {
    const [show, setShow] = useState(false);
    const [crop, setCrop] = useState({ aspect: 16 / 4 });  
    const [pathTempFoto,setPathTempFoto] = useState("");
    const [originalName, setOriginalNAme] = useState("");
    const subirImagen = (imagen)=>{ 
        let formData = new FormData();
        let headers = new Headers();
        headers.append("Authorization", localStorage.session)
        formData.append("temp", imagen); 

        fetch(config.url+"/api/acount/portadaphoto/"+props.idUser,{
            method:"post",
            headers,
            body: formData
        })
        .then(result => result.json())
        .then(result =>{
            console.log(result.originalName)
            setOriginalNAme(result.originalName)
            setPathTempFoto(config.url+result.path)
        })
    }
    const sendResizeImage = (name)=>{
        fetch(config.url+"/api/acount/resizephotoportada/"+props.idUser,{
            method:"post",
            headers:{
                Authorization:localStorage.session,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                crop,
                originalName:name
            })
        })
        .then(result => {
            if(result.status == 200)
            {
                window.location.reload()
            }
        }) 
    }

    return (
        <>
        <Button onClick={() => setShow(true)} className="mr-3 rounded-0" variant='outline-primary' size='sm'>Cambiar foto de portada</Button>

        <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>imagen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="file" onChange={e=>{ 
                    subirImagen(e.target.files[0])
                }}/>
                <ReactCrop 
                    src={pathTempFoto} 
                    crop={crop}  
                    onChange={(newCrop,percentCrop) => {
                        console.log(percentCrop)
                        setCrop(percentCrop)
                    }}
                />
                {pathTempFoto?<small>Clickear y arrastrar en la foto para redimensionar</small>:null}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShow(false)}>
                Cerrar
            </Button>
            <Button onClick={()=>sendResizeImage(originalName)} type="button" variant='success'>Subir</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}