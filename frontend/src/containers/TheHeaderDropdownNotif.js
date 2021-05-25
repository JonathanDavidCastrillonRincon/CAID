import React from "react";
import { FaBell } from "react-icons/fa";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { getAllActivities } from "src/api/activity";
import { useHistory } from "react-router-dom";
import moment from "moment";

const TheHeaderDropdownNotif = () => {
  const history = useHistory();
  const [activities, setActivities] = React.useState([]);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  React.useEffect(() => {
    allActivities();
  }, []);

  const allActivities = () => {
    getAllActivities().then((response) => {
      if (response) {
        const data = response.data.data;
        const dataFilter = data?.filter((el) => {
          return (
            moment(el.initialDate).format("YYYY-MM-DD") ===
            moment().subtract(-1, "days").format("YYYY-MM-DD")
          );
        });

        console.log(dataFilter);
        const finallyData = dataFilter.filter((el) => {
          if (el.creatorActivity === user._id) {
            return el;
          } else if (
            el.participants?.includes(user._id) &&
            el.visibilityActivity === "1" &&
            el.activityType === "1"
          ) {
            return el;
          } else if (
            el.responsible?.includes(user._id) &&
            el.visibilityActivity === "1" &&
            el.activityType === "1"
          ) {
            return el;
          }
        });
        setActivities(finallyData);
      }
    });
  };
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CTooltip content={`Notificaciones`} placement="bottom">
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <FaBell />
          <CBadge shape="pill" color="danger">
            {activities.length}
          </CBadge>
        </CDropdownToggle>
      </CTooltip>
      <CDropdownMenu
        placement="bottom-end"
        className="pt-0"
        style={{ width: "370px", height: "600px", overflow: "auto" }}
      >
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>Tienes {activities.length} notificaciones</strong>
        </CDropdownItem>
        {activities.map((el, i) => {
          return (
            <CDropdownItem
              className="d-block"
              onClick={() => history.push("/calendar")}
              key={i}
            >
              <div className="text-uppercase mb-1">
                <small>
                  <b>Próxima actividad</b> <br />{" "}
                  {el.activityType === "1"
                    ? "Plan operativo"
                    : el.activityType === "2"
                    ? "Actvidad académica"
                    : "Actividad personal"}
                  <br />
                  {el.title}
                  <div style={{ float: "right" }}>
                    {moment(el.initialDate).format("DD-MM-YYYY")} -{" "}
                    {moment(el.finalDate).format("DD-MM-YYYY")}
                  </div>
                </small>
              </div>
            </CDropdownItem>
          );
        })}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownNotif;
