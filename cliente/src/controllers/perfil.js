import React from 'react';
import { Container, Col, Row, Card, Button, Image, Form, ButtonGroup, Badge } from 'react-bootstrap';

const Perfil = (props)=>{
    return(
        <React.Fragment>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <img style={{maxHeight:300}} width="100%" src={"https://image.shutterstock.com/image-photo/amazing-mountain-landscape-colorful-vivid-260nw-693715240.jpg"}></img>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
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
                    <Col md="6">
                        <Card className='rounded-0' style={{borderTop:"solid 3px #184ca1"}}>
                            <Card.Body style={{textAlign:"center"}}>
                            <Card.Title>Empresa de servicios industriales</Card.Title><hr></hr>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas suscipit accumsan felis et lobortis. Donec vitae orci libero. Donec et dolor accumsan est dictum faucibus vel nec sapien. Pellentesque ut varius metus. Etiam maximus purus eget nunc facilisis, in efficitur leo placerat. Suspendisse eleifend, metus vel sollicitudin placerat, eros orci blandit sapien, vel vulputate turpis metus nec nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam commodo turpis ac tincidunt aliquet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce ullamcorper sem nec lectus euismod feugiat. Curabitur sed sem leo. Curabitur aliquet congue scelerisque. Donec pulvinar ante et massa fringilla, ut commodo turpis tristique. Sed eu purus tincidunt, accumsan lorem vitae, cursus urna. Vivamus rutrum sapien eget leo ultrices tincidunt.

                            Aenean eu pellentesque odio. Ut a erat a arcu tempor bibendum. Aenean rhoncus est a iaculis porttitor. Cras sit amet sagittis risus. Mauris nisl ante, semper ut tortor in, sollicitudin pellentesque justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. In et neque placerat, accumsan purus in, tristique nisi. Phasellus sollicitudin odio eu ipsum rutrum laoreet. Sed blandit pellentesque velit, sit amet porta metus convallis eget. Maecenas semper felis ut orci pretium blandit. Nullam eleifend nibh ut ligula tristique, non vehicula ante tempor. Integer ac nibh lorem. Mauris venenatis, elit eget euismod ultrices, massa nisl consequat mi, laoreet commodo libero diam ac magna.
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Perfil;