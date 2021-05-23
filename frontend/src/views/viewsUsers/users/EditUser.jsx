//Librería de react
import React, { useState } from 'react';

//Librería de componentes bootstrap
import { Button, Form} from 'react-bootstrap';

//Librería de componentes reactstrap
import { Alert } from 'reactstrap';

//Importar componente alert
import AlertSave from './AlertSave';

//Importar componente lista de roles
import RolList from './RolList';

//Librería de componentes de la plantilla 
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSelect
} from '@coreui/react';


const CreateUser =()=> {

     //Variables para validar campos vacíos
     const [validated, setValidated] = useState(false);

     const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
 
         setValidated(true);
    };
     //Fin variables para validar campos vacíos

    //Mostrar y cerrar alerta
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    //Fin Mostrar y cerrar alerta
    
    return(
        <CRow>
            {/* ============================================================== */}
                {/*--- Componente de usuarios ---*/}
            {/* ============================================================== */}
            <CCol className="col-lg-12">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <CCard className="shadow">
                        <CCardHeader>
                            <h4>Editar usuario - Datos personales</h4> 
                        </CCardHeader>
                        <CCardBody>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label style={{ color: '#3c4b64' }}><b>Tipo documento</b></label><label style={{ color: 'blue' }}>*</label>
                                    <CSelect custom name="tipoDocumento" id="tipoDocumento" className="form-control" required>
                                        <option value="" disabled selected>Por favor selecciona</option>
                                        <option value="1">Cédula</option>
                                        <option value="2">Pasaporte</option>
                                        <option value="3">Tarjeta id</option>
                                    </CSelect>
                                    <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor seleccionar un tipo de documento.
                                    </Form.Control.Feedback>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label style={{ color: '#3c4b64' }}><b>Numero documento</b></label><label style={{ color: 'blue' }}>*</label>
                                    <input type="text" id="identificacion" name="identificacion" className="form-control" required/>
                                    <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor llenar el campo con el número de documento.
                                    </Form.Control.Feedback>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-8 mb-3">
                                    <label style={{ color: '#3c4b64' }}><b>Nombre completo</b></label><label style={{ color: 'blue' }}>*</label>
                                    <input type="text" id="nombre" name="nombre" className="form-control" required/>
                                    <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor llenar el campo con el nombre completo.
                                    </Form.Control.Feedback>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label style={{ color: '#3c4b64' }}><b>Fecha nacimiento</b></label><label style={{ color: 'blue' }}>*</label>
                                    <input type="date" id="fechaNacimiento" name="fechaNacimiento" className="form-control" required/>
                                    <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor seleccionar la fecha de nacimiento.
                                    </Form.Control.Feedback>
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                    <CCard className="shadow">
                        <CCardHeader>
                            <h4>Datos de contácto</h4> 
                        </CCardHeader>
                        <CCardBody>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label style={{ color: '#3c4b64' }}><b>Correo electrónico</b></label><label style={{ color: 'blue' }}>*</label>
                                    <input type="email" id="correo" name="correo" className="form-control" required/>
                                    <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor llenar el campo con el correo electrónico.
                                    </Form.Control.Feedback>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label style={{ color: '#3c4b64' }}><b>Teléfono</b></label><label style={{ color: 'blue' }}>*</label>
                                    <input type="text" id="telefono" name="telefono" className="form-control" required/>
                                    <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor introduce un número de teléfono.
                                    </Form.Control.Feedback>
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                    <CCard className="shadow">
                        <CCardHeader>
                            <h4>Asignación de roles</h4>
                        </CCardHeader>
                        <Alert color="warning" isOpen={visible} toggle={onDismiss}>
                            Por favor seleccione un rol para el usuario, de no seleccionar un rol se le asignará el de docente por defecto.
                        </Alert>
                        <CCardBody>
                            <div className="form-row">
                                <div className="col-md-12 mb-3">
                                    <RolList/>
                                </div>
                            </div><br/>
                            <div className="col-sm-12 pb-2 pb-lg-0 pr-0">
                                <div style={{ float: 'right' }}>
                                    <div className="btn-group">
                                        <Button type="summit" className="btn btn-danger" onClick={()=>AlertSave()} style={{ background: '#9a1f40', color: 'white',  width: '160px', margin: '3px' }}>
                                            <b>Guardar</b>
                                        </Button>
                                        <Button shape="pill" variant="" onClick={(e) => {e.preventDefault(); window.location.href='http://localhost:3000/#/users';}} className="btn btn-ghost-light" style={{ color:'#9a1f40', width: '160px', margin: '3px' }}>
                                            <b>Cancelar</b>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                </Form>
            </CCol>
        </CRow>  
    );
}


export default CreateUser;