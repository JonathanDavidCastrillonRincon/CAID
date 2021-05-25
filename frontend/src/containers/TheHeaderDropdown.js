import React from "react";
import { FaUserAlt, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";

import { useHistory } from "react-router-dom";
const TheHeaderDropdown = () => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTimeout(() => {
      history.push("/login");
    }, 1000);
  };
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <FaUserAlt />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Cuenta</strong>
        </CDropdownItem>
        <CDropdownItem
          onClick={() => {
            history.push("/profile");
          }}
        >
          <FaUserCog className="mfe-2" />
          Perfil
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={logout}>
          <FaSignOutAlt className="mfe-2" />
          Salir
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
