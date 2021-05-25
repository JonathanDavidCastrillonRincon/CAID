import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//Librería de datePicker
import { es } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { useHistory } from "react-router-dom";
import {
  FaFilePdf,
  FaPlus,
  FaExclamationTriangle,
  FaCircle,
} from "react-icons/fa";
import { CSidebar, CSidebarBrand, CSidebarNav, CButton } from "@coreui/react";

// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);
  const [date, setDate] = useState();
  const role = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user")).role
    : [];
  const history = useHistory();

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
      style={{ background: "#162447", width: "264px" }}
    >
      <CSidebarBrand className="d-md-down-none" to="/calendar">
        <h3 className="text-center">CAID</h3>
      </CSidebarBrand>
      <br></br>
      <CSidebarNav>
        <DatePickerCalendar date={date} onDateChange={setDate} locale={es} />
        <ul
          style={{ listStyleType: "none", margin: "1em 0", padding: 0 }}
          className="ul-sidebar"
        >
          {navigation.map((el, i) => {
            let roleFilter = role.filter((element) =>
              el.permission?.includes(element)
            );
            return (
              <>
                <h6 style={{ opacity: 0.5, padding: "0 20px" }}>
                  {el._children}
                </h6>
                {roleFilter.length ? (
                  <>
                    <li
                      key={i}
                      style={{
                        padding: "10px 0 ",
                        cursor: "pointer",
                        padding: "10px 20px",
                      }}
                      onClick={() => history.push(el.to)}
                    >
                      {el.name}
                    </li>
                  </>
                ) : null}
              </>
            );
          })}
        </ul>
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
