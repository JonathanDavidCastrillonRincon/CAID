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
import moment from "moment";

const TheHeaderDropdownNotif = () => {
  const [activities, setActivities] = React.useState([]);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  React.useEffect(() => {
    allActivities();
  }, []);

  const allActivities = () => {
    getAllActivities().then((response) => {
      const data = response.data.data;
      const dataFilter = data.filter((el) =>
        moment(el.initialDate).isAfter(new Date())
      );
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
        {activities.map((el) => {
          return (
            <CDropdownItem className="d-block">
              <div className="text-uppercase mb-1">
                <small>
                  <b>{el.title}</b>
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
