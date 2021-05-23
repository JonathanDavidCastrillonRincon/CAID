//Librería de react
import React, { useState } from "react";

//Librería de componentes de la plantilla
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCarousel,
  CCarouselIndicators,
  CCarouselInner,
  CCarouselItem,
  CCarouselControl,
} from "@coreui/react";
import { CChartLine, CChartPie } from "@coreui/react-chartjs";
import moment from "moment";

import { getAllActivities } from "src/api/activity";

const StatisticsActivities = () => {
  //For cumplidas
  const [activitiesStatusCumplidas, setActivitiesStatusCumplidas] = useState(
    []
  );
  //For incumplidas
  const [activitiesStatusInCumplidas, setActivitiesStatusInCumplidas] =
    useState([]);

  //Estados para actividades cumplidas
  const [januaryStatusCumplida, setJanuaryStatusCumplida] = useState([]);
  const [febStatusCumplida, setFebStatusCumplida] = useState([]);
  const [marchStatusCumplida, setMarchStatusCumplida] = useState([]);
  const [aprilStatusCumplida, setAprilStatusCumplida] = useState([]);
  const [mayStatusCumplida, setMayStatusCumplida] = useState([]);
  const [junStatusCumplida, setJunStatusCumplida] = useState([]);
  const [julStatusCumplida, setJulStatusCumplida] = useState([]);
  const [augustStatusCumplida, setAugustStatusCumplida] = useState([]);
  const [sepStatusCumplida, setSepStatusCumplida] = useState([]);
  const [octStatusCumplida, setOctStatusCumplida] = useState([]);
  const [novStatusCumplida, setNovStatusCumplida] = useState([]);
  const [dicStatusCumplida, setDicStatusCumplida] = useState([]);

  //Estados para actividades incumplidas
  const [januaryStatusInCumplida, setJanuaryStatusInCumplida] = useState([]);
  const [febStatusInCumplida, setFebStatusInCumplida] = useState([]);
  const [marchStatusInCumplida, setMarchStatusInCumplida] = useState([]);
  const [aprilStatusInCumplida, setAprilStatusInCumplida] = useState([]);
  const [mayStatusInCumplida, setMayStatusInCumplida] = useState([]);
  const [junStatusInCumplida, setJunStatusInCumplida] = useState([]);
  const [julStatusInCumplida, setJulStatusInCumplida] = useState([]);
  const [augustStatusInCumplida, setAugustStatusInCumplida] = useState([]);
  const [sepStatusInCumplida, setSepStatusInCumplida] = useState([]);
  const [octStatusInCumplida, setOctStatusInCumplida] = useState([]);
  const [novStatusInCumplida, setNovStatusInCumplida] = useState([]);
  const [dicStatusInCumplida, setDicStatusInCumplida] = useState([]);

  React.useEffect(() => {
    allActivities();
  }, []);

  const allActivities = () => {
    getAllActivities().then((response) => {
      let activitiesCumplida = [];
      let activitiesInCumplida = [];
      if (response) {
        const data = response?.data?.data;
        //Actividades cumplidas
        activitiesCumplida = data.filter(
          (el) => el.status === "2" && el.activityType === "1"
        );
        setActivitiesStatusCumplidas(activitiesCumplida);
        //Actividades incumplidas
        activitiesInCumplida = data.filter(
          (el) => el.status === "1" && el.activityType === "1"
        );
        setActivitiesStatusInCumplidas(activitiesInCumplida);

        //Actividades cumplidas by mes
        //Enero
        setJanuaryStatusCumplida(
          activitiesCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 0;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        setJanuaryStatusInCumplida(
          activitiesInCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 0;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        //Feb
        setFebStatusCumplida(
          activitiesCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 1;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        setFebStatusInCumplida(
          activitiesInCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 1;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        //Marzo
        setMarchStatusCumplida(
          activitiesCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 2;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        setMarchStatusInCumplida(
          activitiesInCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 2;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        // Abril
        setMarchStatusCumplida(
          activitiesCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 3;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        setMarchStatusInCumplida(
          activitiesInCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 3;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        //Mayo
        setMayStatusCumplida(
          activitiesCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 4;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        setMayStatusInCumplida(
          activitiesInCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 4;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        //Junio
        setJunStatusCumplida(
          activitiesCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 5;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        setJunStatusInCumplida(
          activitiesInCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 5;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        // Julio
        setJulStatusCumplida(
          activitiesCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 6;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        setJulStatusInCumplida(
          activitiesInCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 6;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        //Agosto
        setAugustStatusCumplida(
          activitiesCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 7;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        setAugustStatusInCumplida(
          activitiesInCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 7;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        //Sep
        setSepStatusCumplida(
          activitiesCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 8;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        setSepStatusInCumplida(
          activitiesInCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 8;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        //Oct
        setOctStatusCumplida(
          activitiesCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 9;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        setOctStatusInCumplida(
          activitiesInCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 9;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        //Nov
        setNovStatusCumplida(
          activitiesCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 10;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        setNovStatusInCumplida(
          activitiesInCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 10;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        //DIc
        setDicStatusCumplida(
          activitiesCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 11;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
        setDicStatusInCumplida(
          activitiesInCumplida.map((el) => {
            let x = moment(el.createdAt).month() === 11;
            if (x === true) {
              return el;
            } else {
              return 0;
            }
          })
        );
      }
    });
  };
  //Validaciones si existe fechas actividades cumplidas
  const validateJanuaryCumplida =
    !januaryStatusCumplida.includes(0) !== false &&
    januaryStatusCumplida.length;
  const validateFebCumplida =
    !febStatusCumplida.includes(0) !== false && febStatusCumplida.length;
  const validateMarchCumplida =
    !marchStatusCumplida.includes(0) !== false && marchStatusCumplida.length;
  const validateAprilCumplida =
    !aprilStatusCumplida.includes(0) !== false && aprilStatusCumplida.length;
  const validateMayCumplida =
    !mayStatusCumplida.includes(0) !== false && mayStatusCumplida.length;
  const validateJunCumplida =
    !junStatusCumplida.includes(0) !== false && junStatusCumplida.length;
  const validateJulCumplida =
    !julStatusCumplida.includes(0) !== false && julStatusCumplida.length;
  const validateAugustCumplida =
    !augustStatusCumplida.includes(0) !== false && augustStatusCumplida.length;
  const validateSepCumplida =
    !sepStatusCumplida.includes(0) !== false && sepStatusCumplida.length;
  const validateOctCumplida =
    !octStatusCumplida.includes(0) !== false && octStatusCumplida.length;
  const validateNovCumplida =
    !novStatusCumplida.includes(0) !== false && novStatusCumplida.length;
  const validateDicCumplida =
    !dicStatusCumplida.includes(0) !== false && dicStatusCumplida.length;

  //Validaciones si existe fechas actividades incumplidas
  const validateJanuaryInCumplida =
    !januaryStatusInCumplida.includes(0) !== false &&
    januaryStatusInCumplida.length;
  const validateFebInCumplida =
    !febStatusInCumplida.includes(0) !== false && febStatusInCumplida.length;
  const validateMarchInCumplida =
    !marchStatusInCumplida.includes(0) !== false &&
    marchStatusInCumplida.length;
  const validateAprilInCumplida =
    !aprilStatusInCumplida.includes(0) !== false &&
    aprilStatusInCumplida.length;
  const validateMayInCumplida =
    !mayStatusInCumplida.includes(0) !== false && mayStatusInCumplida.length;
  const validateJunInCumplida =
    !junStatusInCumplida.includes(0) !== false && junStatusInCumplida.length;
  const validateJulInCumplida =
    !julStatusInCumplida.includes(0) !== false && julStatusInCumplida.length;
  const validateAugustInCumplida =
    !augustStatusInCumplida.includes(0) !== false &&
    augustStatusInCumplida.length;
  const validateSepInCumplida =
    !sepStatusInCumplida.includes(0) !== false && sepStatusInCumplida.length;
  const validateOctInCumplida =
    !octStatusInCumplida.includes(0) !== false && octStatusInCumplida.length;
  const validateNovInCumplida =
    !novStatusInCumplida.includes(0) !== false && novStatusInCumplida.length;
  const validateDicInCumplida =
    !dicStatusInCumplida.includes(0) !== false && dicStatusInCumplida.length;
  return (
    <CRow>
      {/* ============================================================== */}
      {/*--- Componente de calendarios compartidos ---*/}
      {/* ============================================================== */}
      <CCol xs="12">
        <CCard className="shadow">
          <CCardHeader>
            <h4>Estadisticas de actividades</h4>
          </CCardHeader>
          <CCardBody style={{ background: "#ebedefd6" }}>
            <CCarousel animate>
              <CCarouselIndicators />
              <CCarouselInner>
                <CCarouselItem>
                  <center><h5>Actividades por mes</h5></center>
                  <CChartLine
                    datasets={[
                      {
                        label: "Actividades cumplidas",
                        backgroundColor: "rgb(88, 214, 141, 0.9)",
                        data: [
                          validateJanuaryCumplida,
                          validateFebCumplida,
                          validateMarchCumplida,
                          validateAprilCumplida,
                          validateMayCumplida,
                          validateJunCumplida,
                          validateJulCumplida,
                          validateAugustCumplida,
                          validateSepCumplida,
                          validateOctCumplida,
                          validateNovCumplida,
                          validateDicCumplida,
                        ],
                      },
                      {
                        label: "Actividades incumplidas",
                        backgroundColor: "rgb(236, 112, 99, 0.9)",
                        data: [
                          validateJanuaryInCumplida,
                          validateFebInCumplida,
                          validateMarchInCumplida,
                          validateAprilInCumplida,
                          validateMayInCumplida,
                          validateJunInCumplida,
                          validateJulInCumplida,
                          validateAugustInCumplida,
                          validateSepInCumplida,
                          validateOctInCumplida,
                          validateNovInCumplida,
                          validateDicInCumplida,
                        ],
                      },
                    ]}
                    options={{
                      tooltips: {
                        enabled: true,
                      },
                    }}
                    labels="months"
                  />
                </CCarouselItem>
                <CCarouselItem>
                  <center><h5>Total de actividades</h5></center>
                  <CChartPie
                    datasets={[
                      {
                        backgroundColor: [
                          "rgb(88, 214, 141, 0.9)",
                          "rgb(236, 112, 99, 0.9)",
                        ],
                        data: [
                          activitiesStatusCumplidas.length,
                          activitiesStatusInCumplidas.length,
                        ],
                      },
                    ]}
                    labels={[
                      "Actividades cumplidas",
                      "Actividades incumplidas",
                    ]}
                    options={{
                      tooltips: {
                        enabled: true,
                      },
                    }}
                  />
                </CCarouselItem>
              </CCarouselInner>
              <CCarouselControl direction="prev" />
              <CCarouselControl direction="next" />
            </CCarousel>
          </CCardBody>
        </CCard>
      </CCol>
      {/* ============================================================== */}
      {/*--- Fin Componente de calendarios compartidos ---*/}
      {/* ============================================================== */}
    </CRow>
  );
};

export default StatisticsActivities;
