//Librería de react
import React from "react";

//Librería de componentes de la plantilla
import {
  CSwitch,
  CListGroupItem,
  CListGroup,
  CBadge,
  CRow,
} from "@coreui/react";

const AssistantList = ({ data }) => {
  return (
    <CListGroup>
      <CListGroupItem className="justify-content-between">
        <b>Lista de asistentes</b>{" "}
        <CBadge className="mr-1" color="success">
          {data.length}
        </CBadge>
        <CSwitch
          type="checkbox"
          id="all"
          onChange={() => SelectAll()}
          className={("mx-1", "float-right")}
          variant={"3d"}
          color={"success"}
          labelOn={"Si"}
          labelOff={"No"}
        />
      </CListGroupItem>
      {data.map((el) => {
        return (
          <CListGroupItem className="justify-content-between">
            {el.label}
            <CSwitch
              type="checkbox"
              name="settings"
              value={el.value}
              className={("mx-1", "float-right")}
              variant={"3d"}
              color={"success"}
              labelOn={"Si"}
              labelOff={"No"}
            />
          </CListGroupItem>
        );
      })}
    </CListGroup>
  );
};

//Función que selecciona todos los Swithces
function SelectAll() {
  var checkboxes = document.getElementsByName("settings");

  for (var i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = document.getElementById("all").checked;
  }
}

//FIn Función que selecciona todos los Swithces

//Seleccionar un check y crear un evento
var checkboxes = document.querySelectorAll(
  "input[type=checkbox][name=settings]"
);
let enabledSettings = [];

// Añadir evento para cada casilla check y lo mete en un array si se selecciona
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    enabledSettings = Array.from(checkboxes)
      .filter((i) => i.checked)
      .map((i) => i.value);

    console.log(enabledSettings);
  });
});
//FIn Seleccionar un check y crear un evento

export default AssistantList;
