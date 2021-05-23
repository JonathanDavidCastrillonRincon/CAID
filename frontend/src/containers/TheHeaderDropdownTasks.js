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

  const getAllActivity = () => {
    getAllActivities().then((response) => {
      if (response) {
        setActivities(response?.data.data);
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
