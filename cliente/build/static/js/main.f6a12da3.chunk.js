(this.webpackJsonpcliente=this.webpackJsonpcliente||[]).push([[0],{59:function(e,a,t){e.exports=t.p+"static/media/Marca-03.c85b2189.png"},67:function(e,a,t){e.exports=t(84)},78:function(e,a,t){},84:function(e,a,t){"use strict";t.r(a);var n=t(1),l=t.n(n),r=t(19),c=t.n(r),o=(t(72),t(5)),u=t(95),m=t(96),s=t(94),i=t(89),d=t(90),E=t(55),p=t(56),b=t(97),f=t(93),g=t(91),h=t(92),v=t(53),j=t.n(v),O=t(47),N=t.n(O),y=(t(74),t(26)),C={url:""},S=function(e){var a=Object(n.useState)(!1),t=Object(o.a)(a,2),r=t[0],c=t[1],m=Object(n.useState)({id:"",razonSocial:"",rol:""}),s=Object(o.a)(m,2),h=s[0],v=s[1],O=Object(n.useState)(""),N=Object(o.a)(O,2),S=N[0],F=N[1],T=Object(n.useState)(""),z=Object(o.a)(T,2),B=z[0],A=z[1],G=Object(n.useState)(!1),q=Object(o.a)(G,2),L=q[0],I=q[1],H=Object(n.useState)(0),P=Object(o.a)(H,2),D=P[0],R=P[1],J=Object(n.useState)(0),U=Object(o.a)(J,2),W=U[0],V=U[1],M=Object(n.useState)(""),_=Object(o.a)(M,2),K=_[0],Q=_[1],$=Object(n.useState)(""),X=Object(o.a)($,2),Y=X[0],Z=X[1],ee=Object(n.useState)(""),ae=Object(o.a)(ee,2),te=ae[0],ne=ae[1],le=Object(n.useState)(""),re=Object(o.a)(le,2),ce=re[0],oe=re[1],ue=Object(n.useState)(""),me=Object(o.a)(ue,2),se=me[0],ie=me[1],de=Object(n.useState)(""),Ee=Object(o.a)(de,2),pe=Ee[0],be=Ee[1],fe=Object(n.useState)(""),ge=Object(o.a)(fe,2),he=ge[0],ve=ge[1],je=Object(n.useState)(!0),Oe=Object(o.a)(je,2),Ne=Oe[0],ye=Oe[1],Ce=Object(n.useState)(""),Se=Object(o.a)(Ce,2),we=Se[0],ke=Se[1],xe=Object(n.useState)(""),Fe=Object(o.a)(xe,2),Te=Fe[0],ze=Fe[1];Object(n.useEffect)((function(){var e=window.location.hash.slice(1).split("/")[1];h.id||fetch(C.url+"/api/acount/profile/"+e,{headers:{Authorization:localStorage.session}}).then((function(e){e.json().then((function(e){v(e),F(e.descripcion?e.descripcion:""),A(e.razonSocial),R(e.vinculos),ve(e.direccionLocalidad),V(e.visitas),Q(e.telefono),Z(e.email),ne(e.tags?e.tags:""),oe(e.titulo?e.titulo:""),ie(e.slogan?e.slogan:""),be(e.sitioWeb?e.sitioWeb:""),ye(e.seguido),ke(e.propietario),I(e.canFollow),ze(e.profesion)}))}))}));return l.a.createElement(l.a.Fragment,null,l.a.createElement(u.a,{bg:"dark",expand:"lg",variant:"dark",className:"mb-2"},l.a.createElement(u.a.Brand,{href:"#home"},"O")),l.a.createElement(i.a,null,l.a.createElement(d.a,null,l.a.createElement(E.a,{className:"d-flex justify-content-center"},l.a.createElement("img",{style:{maxHeight:300},width:"100%",src:C.url+h.imagenPortada}))),h.canEdit?l.a.createElement(d.a,{className:"py-3"},l.a.createElement(E.a,null,r?l.a.createElement(p.a,{onClick:function(){window.confirm("\xbfSeguro que desea aplicar los cambios?")&&fetch(C.url+"/api/acount/profile/"+h.id,{method:"put",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:localStorage.session},body:JSON.stringify({razonSocial:B,slogan:se,titulo:ce,telefono:K,email:Y,sitioWeb:pe,descripcion:S,tags:te,direccion:he})}).then((function(e){200==e.status?c(!1):console.log(e)}))},className:"mr-3 rounded-0",variant:"outline-warning",size:"sm"},"Guardar"):l.a.createElement(l.a.Fragment,null,l.a.createElement(p.a,{onClick:function(){return c(!0)},className:"mr-3 rounded-0",variant:"outline-primary",size:"sm"},"Editar Informaci\xf3n"),l.a.createElement(w,{idUser:h.id}),l.a.createElement(k,{idUser:h.id}),l.a.createElement(x,{userId:h.id})))):l.a.createElement("div",{className:"pb-4"}),l.a.createElement(d.a,null,l.a.createElement(E.a,{md:"5"},l.a.createElement(b.a,{className:"rounded-0",style:{borderTop:"solid 3px #184ca1"}},l.a.createElement(b.a.Body,{style:{textAlign:"center"}},l.a.createElement("img",{className:"rounded-circle",width:"33%",src:C.url+h.imagenPerfil}),r?l.a.createElement(f.a.Group,null,l.a.createElement("label",null,"Raz\xf3n Social"),l.a.createElement("input",{className:"form-control-sm form-control",value:B,onChange:function(e){return A(e.target.value)}})):l.a.createElement("h5",null,B),r?l.a.createElement(f.a.Group,null,Te?l.a.createElement("label",null,"Profesion"):null,l.a.createElement("input",{className:"form-control-sm form-control",value:Te,onChange:function(e){return ze(e.target.value)}})):l.a.createElement("small",null,Te),we||Ne||!L?!we&&Ne&&L?l.a.createElement(l.a.Fragment,null,l.a.createElement("br",null),l.a.createElement(p.a,{onClick:function(){fetch(C.url+"/api/acount/seguir/"+h.id,{method:"delete",headers:{Authorization:localStorage.session}}).then((function(e){200==e.status&&ye(!1)}))},className:"rounded-0",variant:"danger",size:"sm"},"Quitar de mis proveedores")):null:l.a.createElement(l.a.Fragment,null,l.a.createElement("br",null),l.a.createElement(p.a,{onClick:function(){fetch(C.url+"/api/acount/seguir/"+h.id,{method:"post",headers:{Authorization:localStorage.session}}).then((function(e){200==e.status&&ye(!0)}))},className:"rounded-0",variant:"success",size:"sm"},l.a.createElement(y.b,null)," Agregar a mis proveedores")),l.a.createElement("hr",null),l.a.createElement(d.a,null,l.a.createElement(E.a,null,l.a.createElement("h3",null,D),"V\xednculos Creados"),l.a.createElement(E.a,null,l.a.createElement("h3",null,W),"Visitas")),l.a.createElement("hr",null),l.a.createElement(d.a,{className:"pb-2"},l.a.createElement(E.a,null,r?l.a.createElement(f.a.Group,null,l.a.createElement("label",null,"Tel\xe9fono de contacto"),l.a.createElement("input",{className:"form-control-sm form-control",value:K,onChange:function(e){return Q(e.target.value)}})):"\ud83d\udcde"+K)),l.a.createElement(d.a,null,l.a.createElement(E.a,null,r?l.a.createElement(f.a.Group,null,l.a.createElement("label",null,"Email"),l.a.createElement("input",{className:"form-control-sm form-control",value:Y,onChange:function(e){return Z(e.target.value)}})):Y))," ",l.a.createElement("br",null),l.a.createElement(d.a,null,l.a.createElement(E.a,null,r?l.a.createElement(f.a.Group,null,l.a.createElement("label",null,"Direcci\xf3n y localidad"),l.a.createElement("input",{className:"form-control-sm form-control",value:he,onChange:function(e){return ve(e.target.value)}})):he))," ",l.a.createElement("br",null),l.a.createElement(d.a,null,l.a.createElement(E.a,null,r?l.a.createElement(f.a.Group,null,l.a.createElement("label",null,"Sitio Web"),l.a.createElement("input",{className:"form-control-sm form-control",value:pe,onChange:function(e){return be(e.target.value)}})):l.a.createElement("a",{className:"btn btn-info btn-sm rounded-0",target:"blank_",href:pe},"Sitio Web oficial"))),l.a.createElement("hr",null),l.a.createElement(d.a,null,l.a.createElement(E.a,null,r?l.a.createElement(f.a.Group,null,l.a.createElement("label",null,"Palabras clave separadas por comas ,"),l.a.createElement("input",{className:"form-control-sm form-control",value:te,onChange:function(e){return ne(e.target.value)}}),l.a.createElement("small",{className:"text-danger"},"Super importante para que te encuentren en las b\xfasquedas")):te.split(",").map((function(e){return l.a.createElement(g.a,{key:e,className:"mr-2",variant:"secondary"},e.trim())}))))))),l.a.createElement(E.a,{md:"7"},l.a.createElement(b.a,{className:"rounded-0",style:{borderTop:"solid 3px #184ca1"}},l.a.createElement(b.a.Body,null,r?l.a.createElement(f.a.Group,null,l.a.createElement("label",null,"T\xedtulo de tu rubro"),l.a.createElement("input",{className:"form-control-sm form-control",value:ce,onChange:function(e){return oe(e.target.value)}})):l.a.createElement(b.a.Title,null,ce),l.a.createElement("hr",null),r?l.a.createElement(f.a.Group,null,l.a.createElement("label",null,"Descripcion extensa de tu negocio"),l.a.createElement(j.a,{value:S,onChange:function(e){return F(e)}}),">"):l.a.createElement("div",{dangerouslySetInnerHTML:{__html:S}})))))))};function w(e){var a=Object(n.useState)(!1),t=Object(o.a)(a,2),r=t[0],c=t[1],u=Object(n.useState)({aspect:1}),m=Object(o.a)(u,2),s=m[0],i=m[1],d=Object(n.useState)(""),E=Object(o.a)(d,2),b=E[0],f=E[1],g=Object(n.useState)(""),v=Object(o.a)(g,2),j=v[0],O=v[1];return l.a.createElement(l.a.Fragment,null,l.a.createElement(p.a,{onClick:function(){return c(!0)},className:"mr-3 rounded-0",variant:"outline-primary",size:"sm"},"Cambiar foto de perfil"),l.a.createElement(h.a,{show:r,onHide:function(){return c(!1)}},l.a.createElement(h.a.Header,{closeButton:!0},l.a.createElement(h.a.Title,null,"imagen")),l.a.createElement(h.a.Body,null,l.a.createElement("input",{type:"file",onChange:function(a){!function(a){var t=new FormData,n=new Headers;n.append("Authorization",localStorage.session),t.append("temp",a),fetch(C.url+"/api/acount/profilephoto/"+e.idUser,{method:"post",headers:n,body:t}).then((function(e){return e.json()})).then((function(e){console.log(e.originalName),O(e.originalName),f(C.url+e.path)}))}(a.target.files[0])}}),l.a.createElement(N.a,{src:b,crop:s,onChange:function(e,a){console.log(a),i(a)}}),b?l.a.createElement("small",null,"Clickear y arrastrar en la foto para redimensionar"):null),l.a.createElement(h.a.Footer,null,l.a.createElement(p.a,{variant:"secondary",onClick:function(){return c(!1)}},"Cerrar"),l.a.createElement(p.a,{onClick:function(){return a=j,void fetch(C.url+"/api/acount/resizephotoperfil/"+e.idUser,{method:"post",headers:{Authorization:localStorage.session,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({crop:s,originalName:a})}).then((function(e){200==e.status&&window.location.reload()}));var a},type:"button",variant:"success"},"Subir"))))}function k(e){var a=Object(n.useState)(!1),t=Object(o.a)(a,2),r=t[0],c=t[1],u=Object(n.useState)({aspect:4}),m=Object(o.a)(u,2),s=m[0],i=m[1],d=Object(n.useState)(""),E=Object(o.a)(d,2),b=E[0],f=E[1],g=Object(n.useState)(""),v=Object(o.a)(g,2),j=v[0],O=v[1];return l.a.createElement(l.a.Fragment,null,l.a.createElement(p.a,{onClick:function(){return c(!0)},className:"mr-3 rounded-0",variant:"outline-primary",size:"sm"},"Cambiar foto de portada"),l.a.createElement(h.a,{show:r,onHide:function(){return c(!1)}},l.a.createElement(h.a.Header,{closeButton:!0},l.a.createElement(h.a.Title,null,"imagen")),l.a.createElement(h.a.Body,null,l.a.createElement("input",{type:"file",onChange:function(a){!function(a){var t=new FormData,n=new Headers;n.append("Authorization",localStorage.session),t.append("temp",a),fetch(C.url+"/api/acount/portadaphoto/"+e.idUser,{method:"post",headers:n,body:t}).then((function(e){return e.json()})).then((function(e){console.log(e.originalName),O(e.originalName),f(C.url+e.path)}))}(a.target.files[0])}}),l.a.createElement(N.a,{src:b,crop:s,onChange:function(e,a){console.log(a),i(a)}}),b?l.a.createElement("small",null,"Clickear y arrastrar en la foto para redimensionar"):null),l.a.createElement(h.a.Footer,null,l.a.createElement(p.a,{variant:"secondary",onClick:function(){return c(!1)}},"Cerrar"),l.a.createElement(p.a,{onClick:function(){return a=j,void fetch(C.url+"/api/acount/resizephotoportada/"+e.idUser,{method:"post",headers:{Authorization:localStorage.session,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({crop:s,originalName:a})}).then((function(e){200==e.status&&window.location.reload()}));var a},type:"button",variant:"success"},"Subir"))))}function x(e){var a=Object(n.useState)(!1),t=Object(o.a)(a,2),r=t[0],c=t[1],u=function(){return c(!1)},m=Object(n.useState)(""),s=Object(o.a)(m,2),i=s[0],d=s[1],E=Object(n.useState)(""),b=Object(o.a)(E,2),g=b[0],v=b[1],j=Object(n.useState)({b:"",m:""}),O=Object(o.a)(j,2),N=O[0],y=O[1],S=function(a){if(!i||!g||i.length<6||g.length<6||i!=g)return y({b:"border-danger",m:"Las contrase\xf1as deben contener un m\xednimo de 6 caracteres, y deben coincidir"});fetch(C.url+"/api/acount/cambiarclave/"+e.userId,{method:"post",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:localStorage.session},body:JSON.stringify({pass:i})}).then((function(e){200==e.status&&u()}))};return l.a.createElement(l.a.Fragment,null,l.a.createElement(p.a,{onClick:function(){return c(!0)},className:"mr-3 rounded-0",variant:"outline-primary",size:"sm"},"Cambiar contrase\xf1a"),l.a.createElement(f.a,{onSubmit:S},l.a.createElement(h.a,{show:r,onHide:u},l.a.createElement(h.a.Body,null,l.a.createElement(f.a.Group,null,l.a.createElement("label",null,"Nueva Contrase\xf1a"),l.a.createElement(f.a.Control,{type:"password",className:N.b,required:!0,onChange:function(e){return d(e.target.value)},value:i})),l.a.createElement(f.a.Group,null,l.a.createElement("label",null,"Repetir Contrase\xf1a"),l.a.createElement(f.a.Control,{type:"password",className:N.b,required:!0,onChange:function(e){return v(e.target.value)},value:g})),N.b?l.a.createElement("label",{className:"text-danger"},N.m):null),l.a.createElement(h.a.Footer,null,l.a.createElement(p.a,{className:"rounded-0",variant:"secondary",onClick:u},"Cerrar"),l.a.createElement(p.a,{className:"rounded-0",variant:"primary",onClick:S},"Guardar")))))}var F=t(57),T=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(u.a,{bg:"dark",expand:"lg",variant:"dark",className:"mb-2"},l.a.createElement(u.a.Brand,{href:"#home"},"O")),l.a.createElement(i.a,null,l.a.createElement(d.a,{className:"pt-3"},l.a.createElement(E.a,{md:"9"},l.a.createElement(d.a,{className:"pb-3"},l.a.createElement(E.a,{md:"12"},l.a.createElement(b.a,{style:{borderTop:"solid 3px #2461b2"},className:"rounded-0"},l.a.createElement(b.a.Body,null,l.a.createElement("h5",null,"Usuarios destacados"),l.a.createElement(b.a,null,"ffff"))))),l.a.createElement(d.a,{className:"pb-3"},l.a.createElement(E.a,null,l.a.createElement(b.a,{className:"rounded-0"},l.a.createElement(b.a.Body,null,l.a.createElement(f.a,null,l.a.createElement(F.a,null,l.a.createElement("label",null,"Busc\xe1 lo que necesites, encontr\xe1 los proveedores"),l.a.createElement("input",{className:"form form-control rounded-0",placeholder:"herrer\xeda, obra, metal"}),l.a.createElement("small",{className:"text-muted"},"Ingresa las palabras claves separadas por comas ,")))))))),l.a.createElement(E.a,{md:"3"},l.a.createElement(d.a,null,l.a.createElement(E.a,null,l.a.createElement(b.a,{style:{borderTop:"solid 3px #2461b2"},className:"rounded-0"},l.a.createElement(b.a.Header,null,l.a.createElement("h5",null," Busc\xe1s trabajo?")),l.a.createElement(b.a.Body,null,l.a.createElement("a",{href:"/#cargarcv",className:"btn btn-danger rounded-0"},"Public\xe1 tu CV ac\xe1!"),l.a.createElement("br",null),l.a.createElement("small",null,"Se lo haremos llegar directamente a las empresas que forman parte de nuestro equipo")))))))))},z=(t(78),t(49)),B=t(59),A=t.n(B),G=function(){var e=Object(n.useState)(!1),a=Object(o.a)(e,2),t=a[0],r=a[1],c=Object(n.useState)(""),u=Object(o.a)(c,2),m=u[0],s=u[1],i=function(){return r(!1)},d=Object(n.useState)(!1),E=Object(o.a)(d,2),b=E[0],g=E[1];return l.a.createElement(l.a.Fragment,null,l.a.createElement(p.a,{variant:"link",onClick:function(){return r(!0)},size:"sm"},"recuperar cuenta"),l.a.createElement(h.a,{show:t,onHide:i},l.a.createElement(h.a.Body,null,b?l.a.createElement(h.a.Title,null,"Hemos enviado un email a una direcci\xf3n similar a ",m):l.a.createElement(l.a.Fragment,null,l.a.createElement(h.a.Title,null,"Ingresar nombre de usuario"),l.a.createElement(f.a.Control,{onChange:function(e){return s(e.target.value)}}),l.a.createElement("small",null,"Te enviaremos un email para el recupero de contrase\xf1a a la direcci\xf3n asociada con este usuario"))),l.a.createElement(h.a.Footer,null,l.a.createElement(p.a,{variant:"secondary",onClick:i},"Cerrar"),l.a.createElement(p.a,{variant:"primary",onClick:function(e){e.preventDefault(),fetch(C.url+"/api/acount/solicitarrecupero?userName="+m,{method:"post"}).then((function(e){if(200==e.status)return g(!0),e.json()})).then((function(e){return s(e.email)}))}},"Enviar"))))},q=function(e){var a=Object(n.useState)(""),t=Object(o.a)(a,2),r=t[0],c=t[1],m=Object(n.useState)(""),s=Object(o.a)(m,2),g=s[0],h=s[1],v=Object(n.useState)(""),j=Object(o.a)(v,2),O=j[0],N=j[1];return l.a.createElement("div",null,l.a.createElement(u.a,{bg:"dark",expand:"lg",variant:"dark",className:"mb-2"},l.a.createElement(u.a.Brand,{href:"#home"},"O")),l.a.createElement(i.a,null,l.a.createElement(d.a,{className:"d-flex justify-content-center mt-5"},l.a.createElement(E.a,{md:"6"},l.a.createElement(b.a,{className:"rounded-0"},l.a.createElement(b.a.Body,null,l.a.createElement(b.a.Title,null,"Ingresar"),O,l.a.createElement("form",{onSubmit:function(e){e.preventDefault(),fetch(C.url+"/api/acount/login",{method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({userName:r,pass:g})}).then((function(e){403==e.status?N(l.a.createElement("h6",{className:"text-danger"},"Datos incorrectos")):200==e.status&&e.json().then((function(e){localStorage.session="Bearer ".concat(e.token),window.location="/"}))})).catch((function(e){return console.log(e)}))}},l.a.createElement(f.a.Group,null,l.a.createElement("small",null,"Nombre de usuario"),l.a.createElement("input",{onChange:function(e){return c(e.target.value)},value:r,required:!0,type:"text",className:"form form-control rounded-0"})),l.a.createElement(f.a.Group,null,l.a.createElement("small",null,"Contrase\xf1a"),l.a.createElement("input",{onChange:function(e){return h(e.target.value)},value:g,required:!0,type:"password",className:"form form-control rounded-0"})),l.a.createElement(d.a,null,l.a.createElement(E.a,null,l.a.createElement(p.a,{type:"submit",className:"rounded-0"},"Enviar")),l.a.createElement(E.a,null,l.a.createElement(G,null)),l.a.createElement(E.a,null,l.a.createElement(p.a,{href:"/#registro",variant:"link",size:"sm"},"registrarse"))))))))))},L=t(22),I=function(){var e=l.a.useState(""),a=Object(o.a)(e,2),t=a[0],r=a[1],c=l.a.useState(""),m=Object(o.a)(c,2),s=m[0],g=m[1],h=l.a.useState(""),v=Object(o.a)(h,2),j=v[0],O=v[1],N=l.a.useState(""),y=Object(o.a)(N,2),S=y[0],w=y[1],k=l.a.useState(""),x=Object(o.a)(k,2),F=x[0],T=x[1],z=l.a.useState({}),B=Object(o.a)(z,2),A=B[0],G=B[1],q=l.a.useState({l:"",b:""}),I=Object(o.a)(q,2),H=I[0],P=I[1],D=Object(n.useState)(!1),R=Object(o.a)(D,2),J=R[0],U=R[1];return l.a.createElement("div",null,l.a.createElement(u.a,{bg:"dark",expand:"lg",variant:"dark",className:"mb-2"},l.a.createElement(u.a.Brand,{href:"#home"},"O")),l.a.createElement(i.a,null,l.a.createElement(d.a,{className:"d-flex justify-content-center mt-3"},l.a.createElement(E.a,{md:"6"},l.a.createElement(b.a,{className:"rounded-0"},J?l.a.createElement(b.a.Body,null,l.a.createElement(b.a.Subtitle,null,"\xa1Hemos creado tu cuenta correctamente!"),l.a.createElement("hr",null),l.a.createElement(b.a.Title,null,"Acabamos de enviar un email a:"),l.a.createElement("h2",null,j),l.a.createElement("hr",null),l.a.createElement("small",null,"Por favor revis\xe1 tu cuenta de correo electr\xf3nico para validar. En caso de ser incorrecta la direcci\xf3n ingresada, deber\xe1 recargar los datos para su registro en VALOR-AR")):l.a.createElement(b.a.Body,null,l.a.createElement(b.a.Title,null,"Registrar nueva cuenta"),l.a.createElement("form",{onSubmit:function(e){e.preventDefault(),S!=F||S.length<6?G({l:"Las contrase\xf1as deben coincidir y tener un m\xednimo de 6 caracteres",c:"danger"}):(P({l:"",b:""}),fetch(C.url+"/api/acount/registro",{method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({userName:s,razonSocial:t,email:j,pass:S})}).then((function(e){402==e.status?P({l:"El nombre de usuario se encuentra en uso",b:"border border-danger"}):200==e.status&&U(!0)})).catch((function(e){return console.log(e)})))}},l.a.createElement(f.a.Group,null,l.a.createElement("label",{htmlFor:"rsocial"},"* Nombre de Usuario"),l.a.createElement("input",Object(L.a)({minLength:4,maxLength:130,required:!0,value:s,onChange:function(e){return g(e.target.value)},id:"rsocial",type:"text",className:"form form-control rounded-0 "},"required",!0)),l.a.createElement("small",{className:"text-muted"},"Ser\xe1 necesario para acceder a tu cuenta"),l.a.createElement("small",{className:"text-muted"},H.l)),l.a.createElement(f.a.Group,null,l.a.createElement("label",{htmlFor:"rsocial"},"* Raz\xf3n social"),l.a.createElement("input",Object(L.a)({required:!0,value:t,onChange:function(e){return r(e.target.value)},id:"rsocial",type:"text",className:"form form-control rounded-0 ",placeholder:"Persona S.R.L"},"required",!0)),l.a.createElement("small",{className:"text-muted"},"Como quer\xe9s que vean tu negocio")),l.a.createElement(f.a.Group,null,l.a.createElement("label",{htmlFor:"email"},"* Email"),l.a.createElement("input",{value:j,onChange:function(e){return O(e.target.value)},required:!0,type:"email",id:"email",className:"form form-control rounded-0 "+H.b,placeholder:"info@ejemplo.com"}),l.a.createElement("small",{className:"text-muted"},"La necesitaremos para validar la cuenta")),l.a.createElement(f.a.Group,null,l.a.createElement("label",{htmlFor:"pass"},"Contrase\xf1a"),l.a.createElement("input",{min:6,value:S,onChange:function(e){return w(e.target.value)},onKeyUp:function(){G(S==F?"success":"danger")},required:!0,type:"password",id:"pass",className:"form form-control rounded-0"})),l.a.createElement(f.a.Group,{onKeyUp:function(){G(S==F?{l:"",c:"success"}:{l:"Las contrase\xf1as deben coincidir y tener un m\xednimo de 6 caracteres",c:"danger"})}},l.a.createElement("label",{htmlFor:"rpass"},"Repetir Contrase\xf1a"),l.a.createElement("input",{min:6,value:F,onChange:function(e){return T(e.target.value)},required:!0,type:"password",id:"rpass",className:"form form-control rounded-0 border border-".concat(A.c)}),l.a.createElement("small",{className:"text-danger"},A.l)),l.a.createElement(d.a,null,l.a.createElement(E.a,null,l.a.createElement(p.a,{type:"submit",className:"rounded-0"},"Enviar"))))))))))},H=function(){var e=Object(n.useState)(!1),a=Object(o.a)(e,2),t=a[0],r=a[1],c=Object(n.useState)(""),u=Object(o.a)(c,2),m=u[0],s=u[1],i=function(){return r(!1)};return l.a.createElement(l.a.Fragment,null,l.a.createElement(p.a,{type:"submit",onClick:function(){return r(!0)},variant:"secondary",className:"rounded-0 ml-2"},"Generar una nueva clave"),l.a.createElement(h.a,{show:t,onHide:i},l.a.createElement(h.a.Header,{closeButton:!0},l.a.createElement(h.a.Title,null,"Recuperar clave")),l.a.createElement(h.a.Body,null,l.a.createElement("label",null,"Ingresar Email"),l.a.createElement(f.a.Control,{className:"rounded-0",value:m,onChange:function(e){return s(e.target.value)}})),l.a.createElement(h.a.Footer,null,l.a.createElement(p.a,{variant:"secondary",className:"rounded-0 ml-1",onClick:i},"Cerrar"),l.a.createElement(p.a,{variant:"primary",className:"rounded-0",onClick:function(){fetch(C.url+"/api/curriculum/recuperoclave?email="+m,{method:"post"}).then((function(e){200==e.status&&(alert("Te enviamos un email con la nueva clave"),i())}))}},"Enviar"))))},P=function(){var e,a=Object(n.useState)(""),t=Object(o.a)(a,2),r=t[0],c=t[1],m=Object(n.useState)(""),s=Object(o.a)(m,2),h=s[0],v=s[1],j=Object(n.useState)(""),O=Object(o.a)(j,2),N=O[0],y=O[1],S=Object(n.useState)(""),w=Object(o.a)(S,2),k=w[0],x=w[1],F=Object(n.useState)(null),T=Object(o.a)(F,2),z=T[0],B=T[1],A=Object(n.useState)(""),G=Object(o.a)(A,2),q=G[0],I=G[1],P=Object(n.useState)(""),D=Object(o.a)(P,2),R=D[0],J=D[1];return l.a.createElement(l.a.Fragment,null,l.a.createElement(u.a,{bg:"dark",expand:"lg",variant:"dark",className:"mb-2"},l.a.createElement(u.a.Brand,{href:"#home"},"O")),l.a.createElement(i.a,null,l.a.createElement(d.a,{className:"d-flex justify-content-center mt-4"},l.a.createElement(E.a,{md:"8"},l.a.createElement(b.a,null,l.a.createElement(b.a.Body,null,l.a.createElement(b.a.Title,null,"Adjuntanos tu Curr\xedculum"),R?l.a.createElement("h6",{className:"text-danger"},"El email est\xe1 registrado y no se ingres\xf3 una clave de seguridad v\xe1lida"):null,l.a.createElement(f.a,{onSubmit:function(e){e.preventDefault();var a=new Headers,t=new FormData;a.append("Accept","application/json"),a.append("Content-Type","application/json"),t.append("cv",z),t.append("user",JSON.stringify({nombre:r,telefono:h,email:N,tags:k})),fetch(C.url+"/api/curriculum?key="+q,{method:"POST",body:t}).then((function(e){201==e.status?(alert("Correcto: Te hemos enviado un email"),window.location="/#"):403==e.status&&J("border-danger")}))}},l.a.createElement(f.a.Group,null,l.a.createElement("label",{htmlFor:"Nombre"},"Nombre completo *"),l.a.createElement(f.a.Control,{required:!0,autoComplete:"off",value:r,onChange:function(e){return c(e.target.value)},id:"Nombre",size:"sm",className:"rounded-0",type:"text"})),l.a.createElement(f.a.Group,null,l.a.createElement("label",{htmlFor:"Telefono"},"Tel\xe9fono *"),l.a.createElement(f.a.Control,{required:!0,autoComplete:"off",value:h,onChange:function(e){return v(e.target.value)},id:"Telefono",size:"sm",className:"rounded-0",type:"tel"})),l.a.createElement(f.a.Group,null,l.a.createElement("label",{htmlFor:"Email"},"Email *"),l.a.createElement(f.a.Control,{required:!0,autoComplete:"off",value:N,onChange:function(e){return y(e.target.value)},id:"Email",size:"sm",className:"rounded-0 "+R,type:"email"})),l.a.createElement(f.a.Group,null,l.a.createElement("label",{htmlFor:"Tags"},"Palabras claves sobre tu orientaci\xf3n vocacional, separado por comas, *"),l.a.createElement(f.a.Control,(e={required:!0,autoComplete:"off",value:k,onChange:function(e){return x(e.target.value)}},Object(L.a)(e,"autoComplete","off"),Object(L.a)(e,"id","Tags"),Object(L.a)(e,"size","sm"),Object(L.a)(e,"className","rounded-0"),Object(L.a)(e,"type","text"),e)),l.a.createElement("label",null,k.split(",").map((function(e){return l.a.createElement(g.a,{key:e+"_",className:"mr-1",variant:"info"},e.trim())})))),l.a.createElement(f.a.Group,null,l.a.createElement(d.a,null,l.a.createElement(E.a,{md:"6"},l.a.createElement("label",{htmlFor:"Archivo"},"Cargar archivo: PDF, o tipo Word"),l.a.createElement(f.a.Control,{onChange:function(e){return B(e.target.files[0])},required:!0,id:"Archivo",size:"sm",className:"rounded-0",type:"file",accept:".pdf, .doc, .docx, .odt, .doc"})),l.a.createElement(E.a,{md:"6"},l.a.createElement("label",{htmlFor:"clave"},"Clave de Seguridad (opcional)"),l.a.createElement(f.a.Control,{onChange:function(e){return I(e.target.value)},value:q,id:"clave",size:"sm",className:"rounded-0 "+R}),l.a.createElement("small",null,"(solo en caso de querer editar la informaci\xf3n)")))),l.a.createElement(f.a.Group,null,l.a.createElement(p.a,{type:"submit",variant:"primary",className:"rounded-0"},"Enviar"),l.a.createElement(H,null)))))))))},D=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(u.a,{bg:"dark",expand:"lg",variant:"dark",className:"mb-2"},l.a.createElement(u.a.Brand,{href:"#home"},"O")),l.a.createElement(i.a,{className:"mt-5"},l.a.createElement(d.a,null,l.a.createElement(E.a,null,l.a.createElement(b.a,{className:"rounded-0"},l.a.createElement(b.a.Body,null,l.a.createElement(b.a.Title,null,"Hemos validado tu email correctamente."),l.a.createElement(b.a.Text,null,"Tu cuenta ya se encuentra activada para ingresar."),l.a.createElement("a",{className:"btn btn-primary rounded-0",href:"/#login"},"Ir al login")))))))},R=t(60),J=t.n(R),U=[{name:"Nombre Completo",selector:"nombre"},{name:"Tel\xe9fono",selector:"telefono"},{name:"Email",selector:"email"},{name:"Palabras clave",selector:"tags"},{name:"Fecha Alta",selector:"fechaAlta"},{name:"Archivo Cv",selector:"archivo"}],W=function(){var e=Object(n.useState)([]),a=Object(o.a)(e,2),t=a[0],r=a[1];return Object(n.useEffect)((function(){r([{nombre:"gian",telefono:"123123123",email:"gian@gmail.com",tags:"perro",fechaAlta:"01/01/10",archivo:l.a.createElement("a",{href:"/#"},"Ver CV")}])}),[]),l.a.createElement(l.a.Fragment,null,l.a.createElement(u.a,{bg:"dark",expand:"lg",variant:"dark",className:"mb-2"},l.a.createElement(u.a.Brand,{href:"#home"},"O")),l.a.createElement(i.a,null,l.a.createElement(d.a,{className:"mt-3"},l.a.createElement(E.a,null,l.a.createElement(b.a,null,l.a.createElement(b.a.Body,null,l.a.createElement(b.a.Title,null,"Curr\xedculums ingresados"),l.a.createElement("hr",null),l.a.createElement("label",{htmlFor:"search"},"Ingresar palabras clave para la b\xfasqueda"),l.a.createElement(f.a.Control,{id:"search",type:"search"}),l.a.createElement(J.a,{columns:U,theme:"solarized",data:t,pagination:!0})))))))},V=function(e){var a=Object(n.useState)(""),t=Object(o.a)(a,2),r=t[0],c=t[1],m=Object(n.useState)(""),s=Object(o.a)(m,2),g=s[0],h=s[1],v=Object(n.useState)(""),j=Object(o.a)(v,2),O=j[0],N=j[1];return l.a.createElement(l.a.Fragment,null,l.a.createElement(u.a,{bg:"dark",expand:"lg",variant:"dark",className:"mb-2"},l.a.createElement(u.a.Brand,{href:"#home"},"O")),l.a.createElement(i.a,null,l.a.createElement(d.a,{className:"d-flex justify-content-center mt-5"},l.a.createElement(E.a,{md:"6"},l.a.createElement(b.a,{className:"rounded-0"},l.a.createElement(b.a.Body,null,l.a.createElement(b.a.Title,{className:"text-success"},l.a.createElement("b",null,"Crear una nueva contrase\xf1a")),l.a.createElement(f.a,{onSubmit:function(a){a.preventDefault(),r==g?fetch(C.url+"/api/acount/cambiarclaverecupero?id=".concat(e.userId,"&clave=").concat(e.clave),{headers:{Accept:"application/json","Content-Type":"application/json"},method:"post",body:JSON.stringify({newPass:r})}).then((function(e){200==e.status&&(window.location="/#login")})):N("border-danger")}},l.a.createElement(f.a.Group,null,l.a.createElement("label",{htmlFor:"newPass"},"Contrase\xf1a"),l.a.createElement(f.a.Control,{minLength:"6",className:"rounded-0",onChange:function(e){c(e.target.value),N("")},value:r,type:"password"})),l.a.createElement(f.a.Group,null,l.a.createElement("label",{htmlFor:"newPass"},"Repetir Contrase\xf1a"),l.a.createElement(f.a.Control,{minLength:"6",className:"rounded-0 "+O,onChange:function(e){return h(e.target.value)},value:g,type:"password"}),O?l.a.createElement("small",{className:"text-danger"},"Las contrase\xf1as deben coincidir"):null),l.a.createElement(p.a,{type:"submit",className:"rounded-0"},"Enviar"))))))))};var M=function(){var e=Object(n.useState)(window.location.hash.slice(1)),a=Object(o.a)(e,2),t=(a[0],a[1],Object(n.useState)({id:"",razonSocial:"",rol:""})),r=Object(o.a)(t,2),c=r[0],i=r[1],d=Object(n.useState)(l.a.createElement("div",null)),E=Object(o.a)(d,2),p=E[0],b=E[1];return Object(n.useEffect)((function(){fetch(C.url+"/api/acount",{headers:{raw:"json",Authorization:localStorage.session}}).then((function(e){e.json().then((function(e){return i({id:e.id,razonSocial:e.nombre,rol:e.rol})}))}));var e=function(){var e=window.location.hash.slice(1).split("/");console.log("ruta",e),window.location.hash?"login"==e[0]?b(l.a.createElement(q,null)):"rescuepass"==e[0]?b(l.a.createElement(V,{userId:e[1],clave:e[2]})):"registro"==e[0]?b(l.a.createElement(I,null)):"validado"==e[0]?b(l.a.createElement(D,null)):"cargarcv"==e[0]?b(l.a.createElement(P,null)):"vercvs"==e[0]?b(l.a.createElement(W,null)):"profile"!=e[0]||isNaN(e[1])||b(l.a.createElement(S,null)):b(l.a.createElement(T,null))};window.addEventListener("hashchange",e),window.addEventListener("load",e)}),[]),l.a.createElement(l.a.Fragment,null,l.a.createElement(u.a,{bg:"light",expand:"lg",variant:"light",className:"fixed-top"},l.a.createElement(u.a.Brand,{href:"#"},l.a.createElement("img",{width:"120",src:A.a})),l.a.createElement(u.a.Toggle,{"aria-controls":"basic-navbar-nav"}),l.a.createElement(u.a.Collapse,{id:"basic-navbar-nav"},l.a.createElement(m.a,{className:"mr-auto ml-auto"},l.a.createElement(m.a.Link,{href:"#empresas"},l.a.createElement(y.d,null)," Empresas"),l.a.createElement(m.a.Link,{href:"#autonomos"},l.a.createElement(y.a,null)," Aut\xf3nomos"),c.rol>0?l.a.createElement(m.a.Link,{href:"#cv"},l.a.createElement(y.c,null)," CV Postulantes"):null,l.a.createElement(m.a.Link,{href:"#info"},l.a.createElement(y.e,null)," Quienes somos")),l.a.createElement(m.a,{className:"mr-0"},l.a.createElement(m.a.Link,{href:"#link"},l.a.createElement(z.b,null)),l.a.createElement(s.a,{title:c.id?c.razonSocial:"Cuenta",id:"basic-nav-dropdown",alignRight:!0},c.id?l.a.createElement(l.a.Fragment,null,l.a.createElement(s.a.Item,{onClick:function(){window.location="#profile/"+c.id,window.location.reload()}},l.a.createElement(y.f,null)," Mi perfil "),l.a.createElement(s.a.Item,{onClick:function(){localStorage.session="",window.location.reload()}},l.a.createElement(z.a,null)," Logout ")):l.a.createElement(l.a.Fragment,null,l.a.createElement(s.a.Item,{href:"#login"},"  Ingresar "),l.a.createElement(s.a.Item,{href:"#registro"},"  Registrarse ")))))),p)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[67,1,2]]]);
//# sourceMappingURL=main.f6a12da3.chunk.js.map