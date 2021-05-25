//Librería de react
import React from "react";

import { CButton, CRow, CTooltip } from "@coreui/react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { FaTrash, FaEdit } from "react-icons/fa";

import AlertDelete from "./AlertDelete";

export default function ModalActivity(props) {
  //Props recibidas
  const { show, data, closeModal, handleDeleteActivity, handleEditActivity } =
    props;

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const initialDate = moment(data?.initialDate).format("DD/MM/YYYY");
  const finalDate = moment(data?.finalDate).format("DD/MM/YYYY");

  const deleteActivity = (id) => {
    handleDeleteActivity(id);
    AlertDelete();
  };

  const editActivity = (id) => {
    handleEditActivity(id);
  };

  const isValidateTypeActivity =
    data?.activityType === "1"
      ? "Plan operativo"
      : data?.activityType === "2"
      ? "Actividad académica"
      : "Actividad Personal";
  return (
    <CRow>
      {/* ============================================================== */}
      {/*--- Modal detail actividad ---*/}
      {/* ============================================================== */}
      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="">
              <h4>{isValidateTypeActivity}</h4>
            </div>
            {user !== null && user._id === data.creatorActivity && (
              <div style={{ float: "right" }}>
                <CTooltip content={`Editar actividad`} placement="bottom">
                  <CButton
                    style={{ color: "black", margin: "3px" }}
                    className="btn btn-light"
                    onClick={() => editActivity(data._id)}
                  >
                    <FaEdit />
                  </CButton>
                </CTooltip>
                <CTooltip content={`Eliminar actividad`} placement="bottom">
                  <CButton
                    style={{ color: "black", margin: "3px" }}
                    className="btn btn-light"
                    onClick={() => deleteActivity(data._id)}
                  >
                    <FaTrash />
                  </CButton>
                </CTooltip>
              </div>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CRow>
            <div className="col-lg-12">
              <h5>{data?.title}</h5>
              <p>
                {initialDate} - {finalDate}
              </p>
              <p>{data?.description}</p>
              <hr />
              {data?.observation && user !== null && (
                <>
                  <h4>Observaciones</h4>
                  <p>{data?.observation}</p>
                </>
              )}
            </div>
          </CRow>
        </Modal.Body>
      </Modal>

      {/* ============================================================== */}
      {/*--- Fin Modal detail actividad ---*/}
      {/* ============================================================== */}
    </CRow>
  );
}
