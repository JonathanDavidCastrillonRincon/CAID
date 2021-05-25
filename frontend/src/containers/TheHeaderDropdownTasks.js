import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

import TimeLine from "../views/viewsUsers/calendar/TimeLine";

import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CTooltip,
} from "@coreui/react";
import { getAllActivities } from "src/api/activity";

const TheHeaderDropdownTasks = () => {
  const [activities, setActivities] = React.useState([]);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const getAllActivity = () => {
    getAllActivities().then((response) => {
      //se guarda para actualizar el estado local de activities
      if (response) {
        const data = response?.data?.data;

        const dataFilter = data.filter((el) => {
          if (el.creatorActivity === user._id) {
            return el;
          } else if (el.visibilityActivity === "1" && el.activityType === "1") {
            return el;
          } else if (
            el.participants?.includes(user._id) &&
            el.visibilityActivity === "1" &&
            el.activityType === "1"
          ) {
            return el;
          }
        });
        setActivities(dataFilter);
      }
    });
  };
  React.useEffect(() => {
    getAllActivity();
  }, []);
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CTooltip content={`Linea de Tiempo`} placement="bottom">
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <FaCalendarAlt />
          {/*<CBadge shape="pill" color="danger">{itemsCount}</CBadge>*/}
        </CDropdownToggle>
      </CTooltip>
      <CDropdownMenu
        placement="bottom-end"
        className="pt-0"
        style={{
          width: "780px",
          height: "600px",
          overflow: "auto",
          background: "#ebedef",
        }}
      >
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>Actividades pendientes</strong>
          <hr></hr>
        </CDropdownItem>
        <TimeLine data={activities} />
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownTasks;
