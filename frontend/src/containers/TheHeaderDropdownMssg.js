import React from "react";
import { FaInbox, FaEnvelope } from "react-icons/fa";
import {
  CBadge,
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CTooltip,
} from "@coreui/react";
import { getMessageByTo } from "src/api/message";
import { useHistory } from "react-router-dom";
import { getAllUser } from "src/api/user";
import moment from "moment";

const TheHeaderDropdownMssg = () => {
  const history = useHistory();

  const [dataMessagesReceived, setDataMessagesReceived] = React.useState([]);
  //Estado para guardar data del array usuarios
  const [users, setUsers] = React.useState([]);

  const userId = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))._id
    : "";

  React.useEffect(() => {
    getMessageRecived();
    getAllUsers();
  }, []);

  //Get data mensajes recibidos para el usuario
  const getMessageRecived = () => {
    //Se llama la funcion que hace conexion con la api
    getMessageByTo(userId).then((response) => {
      if (response) {
        const arrayMessagesRecived = response.data.data?.filter(
          (el) => el.status === "1"
        );
        //Se Guarda en el estado el array que se obtiene
        setDataMessagesReceived(arrayMessagesRecived);
      }
    });
  };
  //Data all de los usuarios
  const getAllUsers = () => {
    //Se llama la funcion que hace conexion con la api
    getAllUser()
      .then((response) => {
        if (response) {
          setUsers(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CDropdown inNav className="c-header-nav-item mx-2" direction="down">
      <CTooltip content={`Centro de Mensajes`} placement="bottom">
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <FaEnvelope />
          <CBadge shape="pill" color="danger">
            {dataMessagesReceived.length}
          </CBadge>
        </CDropdownToggle>
      </CTooltip>
      <CDropdownMenu
        className="pt-0"
        placement="bottom-end"
        style={{ width: "370px", height: "600px", overflow: "auto" }}
      >
        <CDropdownItem header tag="div" className="text-left" color="light">
          <div className="form-row">
            <div className="col-md-10 mb-3">
              <h5>Mensajes</h5>
            </div>
            <div className="col-md-2 mb-3">
              <div style={{ float: "right" }}>
                <CTooltip content={`Inbox`} placement="bottom">
                  <CButton onClick={() => history.push("/message")} size="sm">
                    <FaInbox style={{ width: "20px", height: "20px" }} />
                  </CButton>
                </CTooltip>
              </div>
            </div>
          </div>
        </CDropdownItem>
        {dataMessagesReceived.map((el, i) => {
          return (
            <CDropdownItem onClick={() => history.push("/message")} key={i}>
              <div className="col-sm-12">
                <div className="message">
                  <div>
                    <small className="text-muted">
                      {users.map((item) => {
                        return item._id === el.postedBy && `De: ${item.name}`;
                      })}
                    </small>
                    <small className="text-muted float-right mt-1">
                      {moment(el.createAt).format("DD/MM/YYYY")}
                    </small>
                  </div>
                  <div className="text-truncate font-weight-bold">
                    <span className="fa fa-exclamation text-danger"></span>{" "}
                    {el.title}
                  </div>
                  <div className="small text-muted text-truncate">
                    {el.description}
                  </div>
                </div>
              </div>
            </CDropdownItem>
          );
        })}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownMssg;
