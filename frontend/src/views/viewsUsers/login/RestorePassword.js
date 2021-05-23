import React, { useState } from 'react';

//Librería de componentes bootstrap
import { Modal, Button, Form} from 'react-bootstrap';

import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow
} from '@coreui/react';

// Tell webpack that Button.js uses these styles

const RestorePassword = () => {

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

    //Variables para abrir y cerrar modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Fin variables para abrir y cerrar modal
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol className="col-md-5" md="4">
                        <CCard className="shadow p-4">
                            <CCardBody>
                                {/* ============================================================== */}
                                    {/*--- Formulario recuperar contraseña ---*/}
                                {/* ============================================================== */}
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <h4 style={{ color: '#162447' }}><center><b>¡Hola no te preocupes!</b></center></h4>
                                    <font size='3' className="text-muted"><center>Restaura tu contraseña sin nigún problema.</center></font><br/>
                                    <div xs="12" className="mb-3">
                                        <label style={{ color: '#3c4b64' }}><b>Correo electrónico</b></label>
                                        <input type="email" id="correo" name="correo" className="form-control" required/>
                                        <Form.Control.Feedback>¡Muy bien!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor digíte su correo.
                                        </Form.Control.Feedback>
                                    </div><br/> 
                                    <CRow>
                                        <div className="col-sm-12 pb-2 pb-lg-0">
                                            <div style={{ float: 'right' }}>
                                                <div className="btn-group">
                                                    <Button type="summit" className="btn btn-danger" onClick={handleShow} style={{ background: '#9a1f40', color: 'white',  width: '160px', margin: '3px' }}>
                                                        <b>Buscar</b>
                                                    </Button>
                                                    <Button variant="" onClick={(e) => {e.preventDefault(); window.location.href='http://localhost:3000/#/login';}} className="btn btn-ghost-light" style={{ color:'#9a1f40', width: '160px', margin: '3px' }}>
                                                        <b>Cancelar</b>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CRow>             
                                </Form>
                                {/* ============================================================== */}
                                    {/*--- Fin Formulario recuperar contraseña ---*/}
                                {/* ============================================================== */}
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <div>
                        {/* ============================================================== */}
                            {/*--- Modal alerta envío de contraseña ---*/}
                        {/* ============================================================== */}
                        <Modal show={show} onHide={handleClose} centered> 
                            <Modal.Header closeButton>
                                <Modal.Title>Contraseña enviada</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <font size='3'>Hemos enviado la contraseña al correo electrónico. 
                                Revisa la bandeja de entrada y la carpeta de spam.</font><br/><br/>
                                <div className="col-sm-12 pb-2 pb-lg-0 pr-0">
                                    <div style={{ float: 'right' }}>
                                        <div className="btn-group">
                                            <Button className="btn btn-danger" onClick={(e) => {e.preventDefault(); window.location.href='http://localhost:3000/#/login';}} 
                                            style={{ background: '#9a1f40', color: 'white',  width: '160px', margin: '3px' }}>
                                                <b>Vale</b>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                        {/* ============================================================== */}
                            {/*--- Fin Modal alerta envío de contraseña ---*/}
                        {/* ============================================================== */}
                    </div>
                </CRow>
            </CContainer>
        </div>
    );
}

export default RestorePassword;
