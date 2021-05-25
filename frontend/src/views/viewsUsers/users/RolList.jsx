//Librería de react
import React from "react";

//Librería de componentes de la plantilla
import { CSwitch, CListGroupItem, CListGroup } from "@coreui/react";

const RolList = (props) => {
  const { actionSelectAll, dataCompare, handleChangeSwitch, list } = props;

  return (
    <CListGroup>
      <CListGroupItem className="justify-content-between">
        <b>Lista de roles</b>
        <label style={{ color: "blue" }}>*</label>
        <CSwitch
          type="checkbox"
          name="all"
          onChange={actionSelectAll}
          className={("mx-1", "float-right")}
          variant={"3d"}
          color={"success"}
          labelOn={"Si"}
          labelOff={"No"}
          checked={list.find((el) => dataCompare.includes(el.value))}
          value={list.map((el) => el.value)}
        />
      </CListGroupItem>
      {list.map((item) => {
        return (
          <CListGroupItem className="justify-content-between">
            {item.name}
            <CSwitch
              type="checkbox"
              name="settings"
              value={item.value}
              checked={dataCompare.includes(item.value)}
              className={("mx-1", "float-right")}
              variant={"3d"}
              color={"success"}
              labelOn={"Si"}
              labelOff={"No"}
              onChange={handleChangeSwitch}
            />
          </CListGroupItem>
        );
      })}
    </CListGroup>
  );
};

export default RolList;
