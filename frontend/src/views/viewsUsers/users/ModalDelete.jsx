//Librería de react
import React, { useState } from "react";

//Librería de íconos
import { FaUserSlash } from "react-icons/fa";

//Librería para los alerts
import Swal from "sweetalert2";

//Librería de componentes de la plantilla
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CTooltip,
  CButton,
  CRow,
} from "@coreui/react";

const ModalDelete = (props) => {
  //props
  const { show, onClose, deleteUser } = props;

  return (
    <CRow>
      {/* ============================================================== */}
      {/*--- Modal alerta desactivar usuario ---*/}
      {/* ============================================================== */}

      <CModal show={show} centered>
        <CModalHeader closeButton>
          <CModalTitle>Eliminar usuario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <font size="3">
            Estas a punto de eliminar un usuario ¿Desea continuar?
          </font>
          <br />
          <br />
          <br />
          <div className="col-sm-12 pb-2 pb-lg-0 pr-0">
            <div style={{ float: "right" }}>
              <div className="btn-group">
                <CButton
                  className="btn btn-danger"
                  type="summit"
                  onClick={deleteUser}
                  style={{
                    background: "#9a1f40",
                    color: "white",
                    width: "160px",
                    margin: "3px",
                  }}
                >
                  <b>Eliminar </b>
                </CButton>
                <CButton
                  variant=""
                  onClick={onClose}
                  className="btn btn-ghost-light"
                  style={{ color: "#9a1f40", width: "160px", margin: "3px" }}
                >
                  <b>Cancelar</b>
                </CButton>
              </div>
            </div>
          </div>
        </CModalBody>
      </CModal>
      {/* ============================================================== */}
      {/*--- Fin Modal alerta desactivar usuario ---*/}
      {/* ============================================================== */}
    </CRow>
  );
};

export default ModalDelete;
